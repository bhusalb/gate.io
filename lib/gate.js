var request = require("request");
var crypto = require("crypto");
var querystring = require("querystring");

const API_URL = "https://data.Gate.io/";
const PAIRS_URL = "api2/1/pairs";
const MARKETINFO_URL = "api2/1/marketinfo";
const MARKETLIST_URL = "api2/1/marketlist";
const TICKERS_URL = "api2/1/tickers";
const TICKER_URL = "api2/1/ticker";
const ORDERBOOKS_URL = "api2/1/orderBooks";
const ORDERBOOK_URL = "api2/1/orderBook";
const TRADEHISTORY_URL = "api2/1/tradeHistory";

const BALANCE_URL = "api2/1/private/balances";
const DEPOSITADDRESS_URL = "api2/1/private/depositAddress";
const DEPOSITSWITHDRAWALS_URL = "api2/1/private/depositsWithdrawals";
const BUY_URL = "api2/1/private/buy";
const SELL_URL = "api2/1/private/sell";
const CANCELORDER_URL = "api2/1/private/cancelOrder";
const CANCELALLORDERS_URL = "api2/1/private/cancelAllOrders";
const GETORDER_URL = "api2/1/private/getOrder";
const OPENORDERS_URL = "api2/1/private/openOrders";
const MYTRADEHISTORY_URL = "api2/1/private/tradeHistory";
const WITHDRAW_URL = "api2/1/private/withdraw";

const USER_AGENT = "";

function Request(params, callback) {
    request(params, function (error, response, body) {
        callback(error, response, body);
    });
}

function Gate(key, secret) {
    this.key = key;
    this.secret = secret;
}

Gate.prototype.getSign = function (form) {
    return crypto
        .createHmac("sha512", this.secret)
        .update(form)
        .digest("hex")
        .toString();
};

Gate.prototype.getPairs = function (callback) {
    Request(
        {
            method: "GET",
            url: API_URL + PAIRS_URL,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.getMarketinfo = function (callback) {
    Request(
        {
            method: "GET",
            url: API_URL + MARKETINFO_URL,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.getMarketlist = function (callback) {
    Request(
        {
            method: "GET",
            url: API_URL + MARKETLIST_URL,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.getTickers = function (callback) {
    Request(
        {
            method: "GET",
            url: API_URL + TICKERS_URL,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.getTicker = function (param, callback) {
    Request(
        {
            method: "GET",
            url: API_URL + TICKER_URL + "/" + param,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.orderBooks = function (callback) {
    Request(
        {
            method: "GET",
            url: API_URL + ORDERBOOKS_URL,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.orderBook = function (param, callback) {
    Request(
        {
            method: "GET",
            url: API_URL + ORDERBOOK_URL + "/" + param,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.tradeHistory = function (param, callback) {
    Request(
        {
            method: "GET",
            url: API_URL + TRADEHISTORY_URL + "/" + param,
            headers: {"User-Agent": USER_AGENT}
        },
        callback
    );
};

Gate.prototype.getBalances = function (callback) {
    let form = {};
    let header = {};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {method: "POST", url: API_URL + BALANCE_URL, headers: header, form: form},
        callback
    );
};

Gate.prototype.depositAddress = function (currency, callback) {
    let form = {currency: currency};
    let header = {};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    console.log(header);
    console.log(querystring.stringify(form));
    console.log(API_URL + DEPOSITADDRESS_URL);
    Request(
        {
            method: "POST",
            url: API_URL + DEPOSITADDRESS_URL,
            headers: header,
            form: form
        },
        callback
    );
};
Gate.prototype.depositsWithdrawals = function (start, end, callback) {
    let form = {start: start, end: end};
    let header = {};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + DEPOSITSWITHDRAWALS_URL,
            headers: header,
            form: form
        },
        callback
    );
};

Gate.prototype.buy = function (currencyPair, rate, amount, callback) {
    let form = {currencyPair: currencyPair, rate: rate, amount: amount};
    let header = {};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {method: "POST", url: API_URL + BUY_URL, headers: header, form: form},
        callback
    );
};

Gate.prototype.sell = function (currencyPair, rate, amount, callback) {
    let form = {currencyPair: currencyPair, rate: rate, amount: amount};
    let header = {};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {method: "POST", url: API_URL + SELL_URL, headers: header, form: form},
        callback
    );
};

Gate.prototype.cancelOrder = function (orderNumber, currencyPair, callback) {
    let form = {currencyPair: currencyPair, orderNumber: orderNumber};
    let header = {"Content-Type": "application/x-www-form-urlencoded"};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + CANCELORDER_URL,
            headers: header,
            form: form
        },
        callback
    );
};

Gate.prototype.cancelAllOrders = function (type, currencyPair, callback) {
    let form = {currencyPair: currencyPair, orderNumber: type};
    let header = {"Content-Type": "application/x-www-form-urlencoded"};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + CANCELALLORDERS_URL,
            headers: header,
            form: form
        },
        callback
    );
};

Gate.prototype.getOrder = function (orderNumber, currencyPair, callback) {
    let form = {currencyPair: currencyPair, orderNumber: orderNumber};
    let header = {"Content-Type": "application/x-www-form-urlencoded"};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + GETORDER_URL,
            headers: header,
            form: form
        },
        callback
    );
};

Gate.prototype.openOrders = function (callback) {
    let form = {};
    let header = {"Content-Type": "application/x-www-form-urlencoded"};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + OPENORDERS_URL,
            headers: header,
            form: form
        },
        callback
    );
};

Gate.prototype.myTradeHistory = function (currencyPair, orderNumber, callback) {
    let form = {currencyPair: currencyPair, orderNumber: orderNumber};
    let header = {"Content-Type": "application/x-www-form-urlencoded"};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + MYTRADEHISTORY_URL,
            headers: header,
            form: form
        },
        callback
    );
};
Gate.prototype.withdraw = function (currency, amount, address, callback) {
    let form = {currency: currency, amount: amount, address: address};
    let header = {"Content-Type": "application/x-www-form-urlencoded"};
    header.KEY = this.key;
    header.SIGN = this.getSign(querystring.stringify(form));
    Request(
        {
            method: "POST",
            url: API_URL + WITHDRAW_URL,
            headers: header,
            form: form
        },
        callback
    );
};
module.exports = Gate;
