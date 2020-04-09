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
        url: "http://192.168.0.13:8081/shoppinglist.php",
        
    },
    
    notificationReceived: function(notification, payload, sender) {
        console.log("MMM-ShoppingList received " + notification);
        if (notification === "ALL_MODULES_STARTED") {
            this.sendSocketNotification("REFRESH_SHOPPINGLIST", this.config.url);
        } else if (notification === "REFRESH_SHOPPINGLIST") {
            this.sendSocketNotification("REFRESH_SHOPPINGLIST", this.config.url);
        }
    },
    
    // Override socket notification handler.
    socketNotificationReceived: function(notification, payload) {
        console.log("MMM-ShoppingList (socket)received " + notification);
        if (notification === "MMM-ShoppingList_SHOPPINGLIST_ITEMS") {
            this.shoppingListItems = payload.items;
            this.updateDom();
        } 
    },
    
    start: function() {
        this.shoppingListItems = [];
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
        
        var shoppingListTitle = document.createElement("button");
        shoppingListTitle.className = "shoppingListTitle";
        shoppingListTitle.innerText = "COURSES";

        var addItem = document.createElement("button");
        addItem.className = "addItemButton";
        addItem.innerText = "+";
        addItem.setAttribute("name", "addItemButton");
        addItem.onclick = () => {
            this.log("MMM-ShoppingList addItem triggered");
            this.sendNotification("SHOPPINGLIST_ADDITEM_SHOWKB", { key: "addShoppingListItem", style: "default"});											
        }; 
        
        menubar.appendChild(shoppingListTitle);
        menubar.appendChild(addItem);
        
        var listContent = document.createElement("div");
        listContent.id = "shoppingListContent";
        listContent.style.display = "block";
        
        for (let i = 0; i < this.shoppingListItems.length; i++) {
            var listItem = document.createElement("li");
            listItem.className = "listItem";
            listItem.innerHTML = this.shoppingListItems[i].item;
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