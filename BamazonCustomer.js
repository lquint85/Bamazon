var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");
// require("dotenv");

//define connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    // will connect to new Host
    password: "password",
    database: "bamazon_db"
});
//call and actually connect to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // once connection is successful then call getProducts function
    getProducts();

});

// now query connection to get a list of all products stored in db
function getProducts() {
    // console.log("Inserting a new product...\n");
    connection.query("SELECT * FROM items ", function (err, res) {
            if (err) throw err;
            //if response code is 200 then response is consoled
            console.table(res);
            // calling the prompForAtion function
            promptForAction(res);

        }

    );
}

//creates a list of questions from query
function promptForAction(products) {


    // Created a series of questions 
    inquirer.prompt([

            {
                type: "input",
                name: "user_Choice",
                message: "What item id would you like?",

            },
            {
                type: "input",
                name: "user_Quantity",
                message: "How many products would you like to buy?",
            },
            //once user has responded to ? the user response is passed into the .then method
        ])
        .then(function (response) {
            console.log(response.user_Choice, response.user_Quantity);
            checkUserResponse(products, response);


        })
}

function checkUserResponse(products, userResponse) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == userResponse.user_Choice) {
            if (products[i].stock_quantity >= userResponse.user_Quantity) {
                // console.log("transaction complete");
                var updatedStock = products[i].stock_quantity - userResponse.user_Quantity;
                //updating stock quantity decrease the stock from 100 to 99
               /* create function that takes 2 parameters (1 product id userRespnse.userChoice 2 update stock ) use those two variables to update the mysql database
               update or INSERT INTO */


                return
            } else {
                console.log("insufficient quantity");
                return
            }
        }
        // else {

        // }

    }
    console.log("product not found");

    
}
// process.exit();