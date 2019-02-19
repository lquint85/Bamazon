var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");
// require("dotenv");

//define connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Luis2018",
    password: "Luis2018",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    startPurchase();
});

//* ///////////////////////////////////////////////////////////////////////////
//* start Purchase
//* ///////////////////////////////////////////////////////////////////////////
function startPurchase(answer) {
    inquirer
        .prompt([{
            name: "myStore",
            type: "confirm",
            message: "Welcome to My Taqueria. Would you like to order something?",
            default: false
        }])
        .then(function (answer) {
            // console.log(answer);
            if (answer.myStore === true) {
                findItem();
            } else {
                console.log("----------------------------------------------------------");
                console.log("---------------------See You Next Time--------------------");
                console.log("----------------------------------------------------------");
                connection.end();
            }
        });
}

//* ///////////////////////////////////////////////////////////////////////////
//* Ordering
//* ///////////////////////////////////////////////////////////////////////////

function findItem() {
    // console.log("Connected");
    connection.query("SELECT * FROM bamazon_db.items", function (err, results) {
        // console.log(results);
        console.log('\n');
        console.log("----------------------------------------------------------");
        console.log("---------------------YUMMY IN MY TUMMY--------------------");
        console.log("----------------------------------------------------------");
        console.log('\n');
        console.table(results);
        if (err) throw err;
        inquirer.prompt([{
                    name: "product",
                    type: "input",
                    message: "What is the ID of the item you would like to order",
                    validate: function (value) {
                      
                        if (
                            isNaN(value) === false &&
                            value <= results.length &&
                            value != 0
                        ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How many would you like?",
                    validate: function (value) {

                        if (isNaN(value) === false && value != 0) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            
            .then(function (answer) {
                // console.log(answer.productID);
                // console.log(answer.stock);
                var productID = parseInt(answer.product);

                // console.log(productID);
               
                var productName = results.productName;
                connection.query("SELECT * FROM bamazon_db.items WHERE id=" + productID, function (err, results) {
                    console.log("----------------------------------------------------------");
                        
                    if (err) throw err;
                        var product = results[0].product_name;
                        var productCost = results[0].price;
                        var quantity = (results[0].stock_quantity);
                        let requestedQuantity = (answer.stock);
                        //* ///////////////////////////////////////////////////////////////////////////
                        //* Confirm Order
                        //* ///////////////////////////////////////////////////////////////////////////
                        inquirer.prompt([{
                                name: "confirmation",
                                type: "confirm",
                                message: "You would like to purchase " +
                                    answer.stock +
                                    " " +
                                    product +
                                    " is this correct?",
                                default: false
                            }])
                            .then(function (answer) {
                                if (answer.confirmation === true) {
                                    // console.log(requestedQuantity);
                                    // console.log(quantity);
                                    if (requestedQuantity <= quantity) {
                                        // checkout();
                                        // console.log("quantity1: " + quantity);
                                        // console.log("answer_stock: (now quantity) ", (requestedQuantity + 1));
                                        let newQuantity = quantity - requestedQuantity;
                                        // console.log("----------------------------------------------------------");
                                        // console.log("" + " REMAINING QUANTITY: " + newQuantity);
                                        console.log("----------------------------------------------------------");
                                        // console.log("requestedQuantity" + requestedQuantity)
                                        // console.log(newQuantity);
                                        let totalCost = (requestedQuantity * productCost).toFixed(2);


                                        console.log('\n');
                                        console.log("----------------------------------------------------------");
                                        console.log("Total Cost:" +  " "  + requestedQuantity + " " + product + " = $ " + totalCost);
                                        console.log("----------------------------------------------------------");
                                        console.log('\n');

           
                                        updateInventory();
                                        //* ///////////////////////////////////////////////////////////////////////////
                                        //* Update Inventory 
                                        //* ///////////////////////////////////////////////////////////////////////////
                                        function updateInventory() {
                                            console.log("----------------------------------------------------------");
                                            console.log("Remaining " + product + ": " + newQuantity + " units");
                                            console.log("----------------------------------------------------------");
                                            connection.query(
                                                "UPDATE bamazon_db.items SET stock_quantity=" +
                                                //!!!!! use question marks
                                                newQuantity +
                                                " WHERE id=" +
                                                productID,
                                                function (err, results) {
                                                    if (err) throw err;
                                                    console.log('\n');
                                                    console.log("(Records updated - " + newQuantity + " units)");
                                                    console.log("----------------------------------------------------------");
                                                    console.log('\n');
                                                    console.log("//////////////////////////////////////////////////////////");
                                                    console.log("----------------------Thank You---------------------------");
                                                    console.log("-------------------For Your Business----------------------");
                                                    console.log("//////////////////////////////////////////////////////////");
                                                    console.log('\n');
                                                    connection.end();
                                                }
                                            );
                                        }

                                    } else {
                                        cconsole.log("----------------------------------------------------------");
                                        console.log("-------------------We have a limited supply----------------");
                                        console.log("-------------------try a smaller order---------------------");
                                        console.log("-----------------------------------------------------------");
                                        connection.end();
                                    }
                                } else {
                                    console.log("----------------------------------------------------------");
                                    console.log("-------------------Try A different Order------------------");
                                    console.log("----------------------------------------------------------");
                                    connection.end();
                                }
                            });

                        //* ///////////////////////////////////////////////////////////////////////////
                        //* Checkout (function)
                        //* ///////////////////////////////////////////////////////////////////////////

                    }
                );

                //?

                // connection.end();
            });
    });
}


// process.exit();