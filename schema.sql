DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oculus Rift + Touch", "Video Games", 399.99, 200),
    ("HTC Vive", "Video Games", 499.99, 200),
    ("Kill Bill Pt 1", "Films", 10.00, 100),
    ("Kill Bill Pt 2", "Films", 10.00, 100),
    ("High Quality Skinny Jeans", "Apparel", 60.00, 300),
    ("Gucci Beanie", "Apparel", 310.00, 50),
    ("Dungeons and Dragons Handbook", "Books", 20.00, 400),
    ("Hitchhiker's Guide to the Galaxy", "Books", 18.00, 200),
    ("Awolnation Poster", "Decorations", 24.50, 300),
    ("Pink Floyd Poster", "Decorations", 24.50, 250);
