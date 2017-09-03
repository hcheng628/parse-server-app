Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parser-server-app.herokuapp.com/parse';

var Order = Parse.Object.extend("Order");
var order = new Order();
order.set("order_id", "OI_1234");
order.set("amount", 112.3);
order.set("date", new Date('2016-02-01'));
order.save(null).then(orderObj =>{
    console.log("Order created with id " + orderObj.id);
    var Item = Parse.Object.extend("Item");
    var items = [
        {"item_id": 1, "name": "hat", "cost": 12.3, "order": orderObj},
        {"item_id": 2, "name": "shoes", "cost": 50, "order": orderObj},
        {"item_id": 3, "name": "gloves", "cost": 50, "order": orderObj}
    ];
    for (var i = 0; i < items.length; i++) {
        var item = new Item();
        item.save(items[i]).then(itemObj => {
            console.log("Item created with id " + itemObj.id);
        });
    }
});