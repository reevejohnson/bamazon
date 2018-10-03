var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  inquirer
    .prompt(
      {
        name: "manager",
        type: "rawlist",
        message: "Would you like to [VIEW PRODUCTS FOR SALE], [VIEW LOW INVENTORY], [ADD TO INVENTORY], or [ADD NEW PRODUCT]?",
        choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
      }
    )
    .then(function(answer) {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        if (answer.manager.toUpperCase() === "VIEW PRODUCTS FOR SALE") {
            readProducts();
        } if (answer.manager.toUpperCase() === "VIEW LOW INVENTORY") {
            lowInventory();
        } if (answer.manager.toUpperCase() === "ADD TO INVENTORY") {
            addInventory();
        } if (answer.manager.toUpperCase() === "ADD NEW PRODUCT") {
            addProduct();
        }
      });
  });
}

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log('----------');
    for(i = 0; i < res.length; i++) {
      console.log(`Product: ${res[i].product_name}`);
      console.log(`Price: $${res[i].price}`);
      console.log(`Amount in stock: ${res[i].stock_quantity}`);
      console.log(`Item ID: ${res[i].item_id}`);
      console.log('----------');
    }
    connection.end();
  });
};

function lowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log('----------');
    for(i = 0; i < res.length; i++) {
      if(res[i].stock_quantity < 5) {
        console.log(`Product: ${res[i].product_name}`);
        console.log(`Price: $${res[i].price}`);
        console.log(`Amount in stock: ${res[i].stock_quantity}`);
        console.log(`Item ID: ${res[i].item_id}`);
        console.log('----------');
      }
    }
    connection.end();
  });
}

function addInventory() {
  inquirer
   .prompt([
    {
      name: "productID",
      type: "input",
      message: "What is the ID of the item you would like to add more of?",
    },
    {
      name: "productAmount",
      type: "input",
      message: "How many units of the product would you like to add?",
    }
  ])
   .then(function(answer) {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for(i = 0; i < res.length; i++) {
        if(parseInt(answer.productID) === parseInt(res[i].item_id)) {
          console.log(`You are adding more: ${res[i].product_name}`);
          connection.query(
            "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: parseInt(res[i].stock_quantity) + parseInt(answer.productAmount)
                },
                {
                  item_id: answer.productID
                }
              ],
            function(error) {
                if (error) throw error;
            }
          );
        }
      }
    connection.end();
   })
  });
}

function addProduct() {
  inquirer
   .prompt([
    {
      name: "productName",
      type: "input",
      message: "What is the name of the product you would like to add?",
    },
    {
      name: "productDepartment",
      type: "input",
      message: "Which department does this product belong in?"
    },
    {
      name: "productPrice",
      type: "input",
      message: "What is the price of one of these products?"
    },
    {
      name: "productAmount",
      type: "input",
      message: "How many units of the product would you like to add?",
    }
  ])
   .then(function(answer) {
    connection.query(
      "INSERT INTO products SET ?",
       [
         {
           product_name: answer.productName,
           department_name: answer.productDepartment,
           price: answer.productPrice,
           stock_quantity: answer.productAmount
         }
       ],
      function(err) {
        if (err) throw err;
      });
    connection.end();
  });
}
