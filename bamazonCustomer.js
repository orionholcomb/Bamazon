// ======= DEPENDENCIES =======
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// ======= ESTABLISHING THE CONNECTION =======
// stores the connection to the mysql database in a variable for later use
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

// if the connection to the database fails, it will be console logged. If it succeeds, the application will start.
connection.connect(function(err) {
    if (err) {
        console.log("There was an error connecting to the database");
    }
    pullData();
});

// ======= FUNCTIONS =======
// pulls all the information from the database and displays it, aftwards prompting the user
function pullData() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
            console.log("There was an error pulling information from the database");
        }
            console.table(res);
            userPrompt(res);
        });
    };

// the first function ran, which requests the user's desired product from Bamazon
// the user may choose to quit the application by pressing C, which is confirmed at the end
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
};

// prompts the user for how much of the requested product they would like to purchase
// also allows the user to prompt the userQuit function by pressing C, which is confirmed at the end
function userQuantity(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "Please type the desired amount or press 'C to exit",
            confirm = function(value) {
                return val > 0 || value.toLowerCase() === "c";
            }
        }
    ]).then( function (value) {
        userQuit(value.quantity);
        var quantity = parseInt(value.quantity);

        if (quantity > product.stock_quantity) {
            console.log("Oops! Your requested quanity exceeds our stock!");
            pullData();
        }
        else {
            userPurchase(product, quantity);
        }
    });
};

// once the user chooses which product they want and the quantity, this function will notify them of the purchase they just made
function userPurchase(product, quantity) {
    connection.query( "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id], function (err, res) {
        if (err) {
            console.log("There was an error confirming your purchase, please try again.");
        }
        console.log( "Purchased " + quantity + " of " + product.product_name + ".");
        pullData();
    });
};

// searches the database for the item that the user is trying to purchase
function searchDatabase(userChoice, inv) {
    for ( i = 0; i < inv.length; i++) {
        if (inv[i].item_id === userChoice) {
            return inv[i];
        }
        else {
            return null;
        }
    }
};

// determines if the user pressed 'C' and if they did, ends the current function
function userQuit(choice) {
    if (choice.toLowerCase() === "c") {
        console.log( "Please come again!" );
        process.exit(0);
    }
};