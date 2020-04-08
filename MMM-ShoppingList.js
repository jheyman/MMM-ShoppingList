"use strict";
/* global Module */

/* Magic Mirror
 * Module: MMM-ShoppingList
 *
 * By jheyman
 * MIT Licensed.
 */

Module.register("MMM-ShoppingList", {
	defaults: {
		xxx: 10,

	},

	notificationReceived: function(notification, payload, sender) {
		if (notification === "ALL_MODULES_STARTED") {
			this.sendSocketNotification("ALL_MODULES_STARTED");
		}
	},

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "XXXXX") {

		} 
	},

	start: function() {

		Log.info("Starting module: " + this.name + this.identifier);
	},

	getStyles: function() {
		return ["shoppinglist.css"];
	},

	getDom: function() {

        var container = document.createElement("div");
        container.className = "ShoppingListWrapper";
            
            this.shoppingListContainer = document.createElement("div");
            this.shoppingListContainer.className = "slContainer";

                var menubar = document.createElement("div");
                menubar.id = "shoppingListMenuBar";
                menubar.style.display = "block";
             
                var addItem = document.createElement("button");
                addItem.className = "addItemButton";
                addItem.innerText = "+";
                addItem.setAttribute("name", "addItemButton");
                addItem.onclick = () => {
                    this.log("MMM-ShoppingList addItem triggered");
                    this.sendNotification("SHOPPINGLIST_ADDITEM_SHOWKB", { key: "addShoppingListItem", style: "default"});											
                }; 
                menubar.appendChild(addItem);

                var listContent = document.createElement("div");
                listContent.id = "shoppingListContent";
                listContent.style.display = "block";


                for (let i = 0; i < 5; i++) {
                    var listItem = document.createElement("li");
                    listItem.className = "listItem";
                    listItem.innerHTML = "listItem"+i;
                    listContent.appendChild(listItem);
                }




            this.shoppingListContainer.appendChild(menubar); 
            this.shoppingListContainer.appendChild(listContent);     

        container.appendChild(this.shoppingListContainer);
        
        return container;

    },
    log: function (msg) {
        if (this.config && this.config.debug) {
          console.log(this.name + ":", JSON.stringify(msg));
        }
    }
});