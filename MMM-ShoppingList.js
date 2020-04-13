"use strict";
/* global Module */

/* Magic Mirror
* Module: MMM-ShoppingList
*
* By jheyman
* MIT Licensed.
*/
const keyboardInputID = "addShoppingListItem";

Module.register("MMM-ShoppingList", {
    defaults: {
        getItems_url: "http://192.168.0.13:8081/shoppinglist.php",
        additem_url: "http://192.168.0.13:8081/shoppinglist_insert.php",
        deleteitem_url: "http://192.168.0.13:8081/shoppinglist_delete.php"  
    },
    
    notificationReceived: function(notification, payload, sender) {
        console.log("MMM-ShoppingList received " + notification);
        if (notification === "ALL_MODULES_STARTED") {
            this.sendSocketNotification("REFRESH_SHOPPINGLIST", this.config.getItems_url);
        } else if (notification === "REFRESH_SHOPPINGLIST") {
            this.sendSocketNotification("REFRESH_SHOPPINGLIST", this.config.getItems_url);
        } else if  (notification === "KEYBOARD_INPUT" && payload.key === keyboardInputID) {
            console.log("MMM-ShoppingList keyboard returned " + payload.message);
            this.sendSocketNotification("SHOPPINGLIST_ADDITEM", {itemName: payload.message, url: this.config.additem_url});
        } else if  (notification === "DELETE_ITEM") {
            console.log("MMM-ShoppingList deleting " + payload);
            this.deleteItem(payload);
        }
    },
    
    // Override socket notification handler.
    socketNotificationReceived: function(notification, payload) {
        console.log("MMM-ShoppingList (socket)received " + notification);
        if (notification === "MMM-ShoppingList_SHOPPINGLIST_ITEMS") {
            this.shoppingListItems = payload.items;
            this.updateDom();
        } else if (notification === "MMM-ShoppingList_SHOPPINGLIST_CHANGED") {
            this.sendSocketNotification("REFRESH_SHOPPINGLIST", this.config.getItems_url);
        }
    },
    
    start: function() {
        this.shoppingListItems = [];
        Log.info("Starting module: " + this.name + this.identifier);
    },
    
    getStyles: function() {
        return ["shoppinglist.css"];
    },
    deleteItem: function(item) {
        console.log("DELETE ITEM "+ item);
        this.sendSocketNotification("SHOPPINGLIST_DELETEITEM", {itemName: item, url: this.config.deleteitem_url});
    },
   
    getDom: function() {
        var self = this;
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
            this.sendNotification("KEYBOARD", { key: keyboardInputID, style: "default"});											
        }; 
        
        menubar.appendChild(shoppingListTitle);
        menubar.appendChild(addItem);
        
        var listContent = document.createElement("div");
        listContent.id = "shoppingListContent";
        listContent.className = "shoppingListContent";
        listContent.style.display = "block";
        
        function makeOnClickHandler(item) {
            return function() {
                self.sendNotification("PROMPT_YESNO", {text:"Delete "+ item +"?", yesNotification: {event: "DELETE_ITEM", payload: item}, noNotification: {event: '', payload: ''}});
            };
        };

        for (let i = 0; i < this.shoppingListItems.length; i++) {
            var listItem = document.createElement("li");
            listItem.className = "listItem";
            listItem.id = "listItem"+i+"_"+this.shoppingListItems[i].item;
            listItem.innerHTML = this.shoppingListItems[i].item;
            listItem.onclick = makeOnClickHandler(this.shoppingListItems[i].item);
            listContent.appendChild(listItem);
        }
        
        this.shoppingListContainer.appendChild(menubar); 
        this.shoppingListContainer.appendChild(listContent);     
        
        container.appendChild(this.shoppingListContainer);
        
        return container;  
    },
    log: function (msg) {
        console.log(this.name + ":", JSON.stringify(msg));
    }
});