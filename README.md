# bamazon

This Node application uses mySQL as a database to store product information, including the name of the product, the department of the product, the cost of the product, and the amount of the product in stock. The database also assigns the product a unique ID using the "AUTO_INCREMENT" feature.

If the user runs the bamazonCustomer application, they will receive a list of items for sale. They are then prompted to choose an item for sale based on the item's unique ID. After that, they input how many of the item they would like to purchase. If there is not enough of that item in stock, the app will prompt them to choose a different item. If there is enough in stock, the app will show the user how much they owe and deplete the stock quantity in the mySQL database.
Here is a video that demonstrates the bamazonCustomer application: https://drive.google.com/file/d/1gtoT68t9DghdqsuErUrLppDggMk7yket/view

If the user runs the bamazonManager application, they will be asked to choose 1 of 4 options.
(1) VIEW PRODUCTS FOR SALE - This option lists the products that are in the mySQL database, along with their price, stock amount, and ID numbers.
(2) VIEW LOW INVENTORY - This option lists all products that have less than 5 in their stock quantity.
(3) ADD TO INVENTORY - This option prompts the user to input the ID of the product they would like to add more of, followed by the amount of the product they would like to add. The bamazon products table is then updated with this amount.
(4) ADD NEW PRODUCT - This option prompts the user to input the name, department, price, and number of units of the product they would like to add. This information gets added to the MySQL bamazon products table.
This video demonstrates the bamazonManager application: https://drive.google.com/file/d/1pe2CzI8cW854aJk4kL69BYKTv_tAGimJ/view
