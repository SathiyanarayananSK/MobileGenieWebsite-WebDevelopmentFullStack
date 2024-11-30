let express = require('express');
let app = express();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('myDB');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

db.run("CREATE TABLE IF NOT EXISTS User (UserId INTEGER PRIMARY KEY AUTOINCREMENT, UserName TEXT UNIQUE, password TEXT, fullname TEXT)");
db.run("CREATE TABLE IF NOT EXISTS Product (p_id INTEGER PRIMARY KEY AUTOINCREMENT, p_name TEXT, p_desc TEXT, p_company TEXT, p_type TEXT, p_price INTEGER, p_img_path)");
db.run("CREATE TABLE IF NOT EXISTS Orders (o_id INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT, lname TEXT, user_email TEXT, phone_num INTEGER, street TEXT, city TEXT, country TEXT, suburb TEXT, state TEXT, p_code INTEGER, cnum INTEGER, cvv INTEGER, total INTEGER, exp TEXT)");


let stmt = db.run(`INSERT INTO User (UserName, password, fullName) VALUES ("sathya@mobilegenie.com", "sathyapwd", "Sathiyanarayanan")`);
stmt = db.run(`INSERT INTO User (UserName, password, fullName) VALUES ("senthil@mobilegenie.com", "senthilpwd", "Senthil")`);
stmt = db.run(`INSERT INTO User (UserName, password, fullName) VALUES ("kumar@mobilegenie.com", "kumarpwd", "Kumar")`);
stmt = db.run(`INSERT INTO User (UserName, password, fullName) VALUES ("test", "test", "Test User")`);

stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Google - Pixel 7", "The Google Pixel 7 is a smartphone featuring advanced camera capabilities, a custom Google Tensor SoC, and an emphasis on AI-driven features.", "Google", "New", 500, "/images/g_pixel7.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Google - Pixel Fold", "The Google Pixel fold is a smartphone featuring advanced camera capabilities, a custom Google Tensor SoC, and an emphasis on AI-driven features.", "Google", "New", 700, "/images/g_pixelfold.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Samsung Galaxy M30S", "The Samsung Galaxy M30s is a mid-range smartphone known for its large battery capacity and AMOLED display, offering a good balance of performance and affordability.", "Samsung", "Used", 200, "/images/m30s.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Samsung Galaxy S23Ultra", "The Samsung Galaxy S23 Ultra is a flagship smartphone known for its powerful performance, high-quality camera system, and sleek design.", "Samsung", "New", 700, "/images/s23ultra.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Apple Iphone 12", "The Apple iPhone 12 is a flagship smartphone featuring 5G connectivity, a powerful A14 Bionic chip, and a Super Retina XDR display.", "Apple", "Used", 300, "/images/i12.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Apple iphone 15", "The Apple iPhone 15 is a flagship smartphone known for its improved camera capabilities, powerful A15 Bionic chip, and enhanced battery life.", "Apple", "New", 900, "/images/i15.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Motorolla Z4", "The Moto Z4 is a mid-range smartphone by Motorola, featuring a sleek design, a good display, and compatibility with Moto Mods for added functionality.", "Motorolla", "New", 349, "/images/motoz4.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("OnePlus Nord 2T", "The OnePlus Nord 2T is a mid-range smartphone known for its strong performance, clean OxygenOS experience, and a competitive price point.", "OnePlus", "New", 659, "/images/nord2t.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("OnePlus Nord 10T", "The OnePlus Nord 10T is a mid-range smartphone known for its strong performance, clean OxygenOS experience, and a competitive price point.", "OnePlus", "New", 554, "/images/one10T.png")`);
stmt = db.run(`INSERT INTO Product (p_name, p_desc, p_company, p_type, p_price, p_img_path) VALUES ("Sony Experia Z", "Sony Xperia smartphones are recognized for their premium design, high-quality displays, and advanced camera technology.", "Sony", "Used", 321, "/images/sony.png")`);

