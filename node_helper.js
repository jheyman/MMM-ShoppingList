"use strict";

/* Magic Mirror
* Module: MMM-ShoppingList
*
* By jheyman
* MIT Licensed.
*/

var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        
    },
    
    getJson: function (url) {
        var self = this;
        console.log("MMM-Shoppinglist GET fresh JSON data");
        request({ url: url, method: 'GET' }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                // Send the json data back with the url to distinguish it on the receiving part
                self.sendSocketNotification("MMM-ShoppingList_SHOPPINGLIST_ITEMS", json);
            }
        });
    },
    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, url) {
        const self = this;
        if (notification === "REFRESH_SHOPPINGLIST") {
            this.getJson(url);
        }
    }
});