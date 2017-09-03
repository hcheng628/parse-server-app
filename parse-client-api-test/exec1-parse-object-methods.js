Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parser-server-app.herokuapp.com/parse';
var Order = Parse.Object.extend("Order");
var myOrder = new Order();
var orderData = {
    "order_id": "OI_1234",
    "amount": 112.3,
    "date": new Date('2016-02-01')
};

myOrder.save(
    orderData,
    {
        success: function (obj) {
            console.log("SUCCESS Order ID: " + obj.id);

            var Item = Parse.Object.extend("Item");
            var itemList = [
                {
                    "item_id": 1,
                    "name": "hat",
                    "cost": 12.3,
                    "order": obj
                },
                {
                    "item_id": 2,
                    "name": "shoes",
                    "cost": 50.0,
                    "order": obj
                },
                {
                    "item_id": 3,
                    "name": "glove",
                    "cost": 50.0,
                    "order": obj
                }
            ];
            for (var i = 0; i < itemList.length; i++) {
                var eachItem = new Item();
                eachItem.save(itemList[i],
                    {
                        success: function (itemObj) {
                            console.log("SUCCESS Item ID: " + itemObj.id);
                        }
                    },
                    {
                        error: function (itemObj, itemErr) {
                            console.error("FAILED" + itemErr);

                        }
                    }
                );
            }
        }
    },
    {
        error: function (obj, err) {
            console.error("FAILED" + err);
        }
    });