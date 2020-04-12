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
    getItems: function (url) {
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
    addItem: function (itemName, url) {
        var self = this;
        console.log("MMM-Shoppinglist perform remote ADD");
        request({ url: encodeURI(url+"?newitem="+itemName), method: 'GET' }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Added item "+ itemName+" successfully");
                self.sendSocketNotification("MMM-ShoppingList_SHOPPINGLIST_CHANGED");
            }
        });
    },
    deleteItem: function (itemName, url) {
        var self = this;
        console.log("MMM-Shoppinglist perform remote ADD");
        request({ url: encodeURI(url+"?whereClause="+itemName), method: 'GET' }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Deleted item "+ itemName +" successfully");
                self.sendSocketNotification("MMM-ShoppingList_SHOPPINGLIST_CHANGED");
            }
        });
    },    
    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        const self = this;
        if (notification === "REFRESH_SHOPPINGLIST") {
            this.getItems(payload);
        } else if (notification === "SHOPPINGLIST_ADDITEM") {
            this.addItem(payload.itemName, payload.url);
        } else if (notification === "SHOPPINGLIST_DELETEITEM") {
            this.deleteItem(payload.itemName, payload.url);
        }
    }
});