var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

function pullData() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
            console.log("There was an error pulling information from the database");
        }
            console.table(res);
            userPrompt(res);
        });
    };

function searchDatabase(userChoice, inv) {
    for ( i = 0; i < inv.length; i++) {
        if (inv[i].item_id === userChoice) {
            return inv[i];
        }
        else {
            return null;
        }
    }
}

function userPrompt(inv) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "Please type the desired item ID or press 'C' to exit",
            confirm = function(value) {
                return !isNaN(value) || value.toLowerCase() === "c";
            }
        }
    ]).then( function (value) {
        userQuit(value.choice);
        var userChoice = parseInt(value.choice);
        var product = searchDatabase(userChoice, inv);

        if (product) {
            userQuantity(product);
        }
        else {
            console.log("There is no item in our stock that matches your input.");
            pullData();
        }
    });
}

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.log("There was an error connecting to the database");
    }
    pullData();
});