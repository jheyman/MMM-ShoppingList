# MMM-ShoppingList

A module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) that displays a shopping list retrieved from a remote server, and lets one add items to the list using an onscreen button (intended for touchscreen magicmirrors) that invokes an onscreen virtual keyboard (derived from [MMM-Keyboard](https://github.com/lavolp3/MMM-Keyboard)

It's very custom to my setup, so it may not be useful to you.

![Example image](example.png)

## Installing

### Step 1 - Install the module
```javascript
cd ~/MagicMirror/modules
git clone https://github.com/jheyman/MMM-ShoppingList.git
```

### Step 2 - Add module to `config.js`
Add this configuration into your `config.js` file
```javascript
{
    module: "MMM-ShoppingList",
    position: <some MM area where you want to prompt to show up, I chose "bottom_left">,
}
```

## Dependencies

None

## Configuration

| Option          | type   | default        | Description
|-----------------|------  |--------------- |-----------
| `getItems_url`        | string | <the url of my server>           | url to the remote php script returning a JSON list of items
| `additem_url`         | string| <the url of my server>          | url to the remote php script to add an item
| `deleteitem_url`    | string| <the url of my server>          | url to the remote php script to delete an item


