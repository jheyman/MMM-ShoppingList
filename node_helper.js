"use strict";

/* Magic Mirror
 * Module: MMM-ShoppingList
 *
 * By jheyman
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start: function() {

	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		const self = this;
		if (notification === "ALL_MODULES_STARTED") {
		}
	}
});