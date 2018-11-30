var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptForAction();
    connection.end();
});


function createItem() {
    // console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO items SET ?", [{
            name: "Mountain Dew",
            category: "Beverage",
            currentBid: 1
        }],
        function (err, res) {
            // console.log(res.affectedRows + " item inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            promptForAction();

        }

    );
}


function promptForAction() {


    // Created a series of questions
    inquirer.prompt([

        {
            type: "list",
            name: "action",
            message: "What item would you like to purchase?",
            choices: ["Food", "Clothes", "Shoes"]
        }
    ]);
    
    inquirer.prompt([

        {
            type: "list",
            name: "action",
            message: "How may unites would you like to purchase?",
            choices: ["1", "2","3"]
        }




    ]).then(function (response) {
        console.log(response.action);

        if (response.action === "Post") {
            console.log("Post");
            createItem();
        } else {
            console.log("Bid");


        }
    });
}


// function login() {
//     inquirer.prompt([{

//             message: "User Name:",
//             name: "password"
//         },  
//         {
//             message: "Password:",
//             name: "password",
//             type: "password"
//         } 
//     ])
//     // connection.end();
// };