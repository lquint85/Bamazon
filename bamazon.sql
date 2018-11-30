DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL,
  price INTEGER, NOT NULL
  stock_quantity INTEGER, NOT NULL,
--   currentBid INT NULL,      
  PRIMARY KEY (id)
);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 1, 100);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 2, 99);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 3, 98);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 4, 97);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 5, 100);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 6, 100);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 7, 100);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 8, 100);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 9, 100);
INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi", "Food", 10, 100);
I
VALUES ("Pepsi", "Beverages", 1);

-- INSERT INTO items (name, category, currentBid)
-- VALUES ("Cherry Coke","Beverages", 2);
