# Nodejs wrapper for Gate.io API2
#### Basic Usage
```javascript
var GateIo = require('gate.io');
var gateIoClient = new GateIo('<api-key>', '<api-sceret>');

gateIoClient.getBalances(function(res) {
    console.log(res);
});

```

#### Available Methods
- getPairs
    ```function(callback)```
- getMarketinfo
``` function (callback) ```
- getMarketlist
``` function (callback) ```
- getTickers
``` function (callback) ```
- getTicker
``` function (param, callback)  ```
- orderBooks
``` function (callback) ```
- orderBook
``` function (param, callback) ```
- tradeHistory
``` function (param, callback) ```
- getBalances
``` function (param, callback) ```
- depositAddress
``` function (currency, callback) ```
- depositsWithdrawals
``` function (start, end, callback) ```
- buy
``` function (currencyPair, rate, amount, callback) ```
- sell
``` function (currencyPair, rate, amount, callback) ```
- cancelOrder
``` function (orderNumber, currencyPair, callback) ```
- cancelAllOrders
``` function (type, currencyPair, callback) ```
- getOrder
``` function (orderNumber, currencyPair, callback)  ```
- openOrders
``` function (callback) ```
- myTradeHistory
``` function (currencyPair, orderNumber, callback) ```
- withdraw
``` function (currency, amount, address, callback)```

------------
###### For additional info Check [API DOCS](https://gate.io/api2)
