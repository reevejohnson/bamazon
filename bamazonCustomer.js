var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ZAM3*joBK',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(`Welcome to Bamazon`)
    console.log(`----------`);
    for(i = 0; i < res.length; i++) {
      console.log(`Product: ${res[i].product_name}`);
      console.log(`Price: $${res[i].price}`);
      console.log(`Item ID: ${res[i].item_id}`);
      console.log('----------');
    }
    start();
  });
};

function start() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What is the ID of the item you would like to purchase?",
      },
      {
        name: "productAmount",
        type: "input",
        message: "How many units of the product would you like to purchase?",
      }
    ])
    .then(function(answer) {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(i = 0; i < res.length; i++) {
          if(parseInt(answer.productID) === parseInt(res[i].item_id)) {
            console.log(`You opted to purchase: ${res[i].product_name}`);
            if(parseInt(answer.productAmount) < parseInt(res[i].stock_quantity)) {
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: parseInt(res[i].stock_quantity) - parseInt(answer.productAmount)
                  },
                  {
                    item_id: answer.productID
                  }
                ],
                function(error) {
                  if (error) throw error;
                }
              );
              console.log(`You owe $${parseInt(answer.productAmount) * parseFloat(res[i].price)}`);
            } else {
              console.log(`There are not enough of those in stock!`)
            }
          }
        }
      connection.end();
    });
  });
}