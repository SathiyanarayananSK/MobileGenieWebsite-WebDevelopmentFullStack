// index.s file

let express = require('express');
let app = express();
var port = normalizePort(process.env.PORT || '3000');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('myDB');
const { defhead, nbar, pgheader, deffoot, pgscripts, } = require('./elements');
app.set('port', port);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}


app.post('/homepage', function (req, res, next) {
    let username = req.body.uname;
    let password = req.body.pwd;
    let html = ``;

    console.log("Just received POST data for users endpoint!");

    db.serialize(function () {
        db.get(
            'SELECT * FROM User WHERE UserName = ? AND password = ?',
            [username, password],
            function (err, row) {
                if (err) {
                    throw err;
                }

                if (row) {
                    res.sendFile(__dirname + '/public/home.html');
                }
                else {
                    html += `<h1>Login Failed</h1><p>The <em>Username</em> and <em>Password</em> provided doesn't match our records.`
                    res.send(html);
                }
            }
        );
    });

});

app.post('/search', (req, res) => {
    const keyword = req.body.keyword;
    let results = []
    let individualResult = `<br>`;
    let html = ``;
    let servicekey = "Empty";

    if (keyword == "all") {
        db.all('SELECT * FROM Product', (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            results = rows;
            Result(results); 
        });
    }
    else {
        db.all('SELECT * FROM Product WHERE p_company LIKE ?', [`%${keyword}%`], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            results = rows;
            Result(results); 
            
        });
    }



        function Result(results)
        {
            individualResult += `<br><main class="container" id="results">`;

        for (let i = 0; i < results.length; i++) {
            individualResult += `<div class="row p-2">
                                <div class="col-sm-4">
                                    <img src=${results[i].p_img_path} alt="Phone logo" class="img-fluid rounded">
                                </div>  
                                <div class="col-sm-4 p-2">
                                    <h4>${results[i].p_name}</h4>
                                    <p>${results[i].p_desc}</p>
                                    <p>${results[i].p_company}</p>
                                    <p>Type: ${results[i].p_type}</p>
                                </div>
                                <div class="col-sm-4 pt-5 text-center">
                                    <h5>Price: $${results[i].p_price}</h5>
                                    <button type="button" class="btn btn-dark" id="${results[i].p_id}" value="${results[i].p_id}" onclick="addToCart(this.id)">Add to cart</button>
                                </div>
                            </div><hr>`
        }


        individualResult += `<script>
        let cart = '';
        function addToCart(id) {
            console.log("new id added to cart");
            cart += id;
            cart += ','
            document.getElementById("cart_form").value = cart;
        }</script>`;

        individualResult += ` <form method="post" action="/cartpage">
        <input type="hidden" name="cart_form" id="cart_form">
        <button type="submit" class="btn btn-dark float-center" id="toCart">Go to cart</button>
        </form>`;

        individualResult += "<br></main>";

        html = defhead + nbar + pgheader + individualResult + deffoot;
        res.send(html);

        }

});





app.post('/cartpage', (req, res) => {
    let c_individualResult = `<br>`;
    let html = ``;
    const cart_str = req.body.cart_form;
    console.log(cart_str);
    const cart = cart_str.split(',').map(Number);

    const placeholders = cart.map(() => '?').join(',');
    const query = `SELECT * FROM Product WHERE p_id IN (${placeholders})`;


    db.all(query, cart, (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }

        c_items = rows;

        individualCart = "<br>";

        for (let j = 0; j < c_items.length; j++) {
            individualCart += `<div class="row p-2">
                        <div class="col-sm-3">
                            <img src=${c_items[j].p_img_path} alt="Phone Logo" class="img-fluid rounded">
                        </div>
                        <div class="col-sm-3">
                            <h5>${c_items[j].p_name}</h5>
                            <p>${c_items[j].p_company}</p>
                        </div>

                        <div class="col-sm-2 p-2 text-center">
                            <h6>Unit Price: $${c_items[j].p_price}</h6>
                        </div>

                        <div class="col-sm-2">
                            <form name="qty" id="qty">
                                <div class="input-group">
                                    <span class="input-group-text">Qty</span>
                                    <input type="number" id="quantity" class="form-control" value="1">
                                </div>
                            </form>
                        </div>

                        <div class="col-sm-2 p-2 text-center">
                            <h6>Extended Price: ${c_items[j].p_price * 1}</h6>
                        </div>
                    </div>
                    <hr>`

        }

        let total = 0;
        for (i = 0; i < c_items.length; i++) {
            total += c_items[i].p_price
        }

        individualCart += "<br>";
        individualCart += `<div class="row p-2" id="totalAmount">
        <div class="col-sm-3"></div>
                        <div class="col-sm-3"></div>
                        <div class="col-sm-2 "></div>
                        <div class="col-sm-2 p-2 text-center">
                            <h4>Total</h4>
                        </div>
        <div class="col-sm-2 p-2 text-center" >
                        <h4>$${total}</h4>
                     </div>
        </div>`

        individualCart += ` <form method="post" action="/checkoutpage">
        <input type="hidden" name="total_price" id="total_price" value = "${total}">
        <button type="submit" class="btn btn-dark float-center" id="toCart">Go to checkout</button>
        </form>`;

        individualCart += "<br></main>";


        html = defhead + nbar + pgheader + individualCart + deffoot;
        res.send(html);

    });
});

let totalPrice = 0;

app.post('/checkoutpage', (req, res) => {
    totalPrice = req.body.total_price;
        res.sendFile(__dirname + '/public/checkout.html');
});

app.post('/updatedb', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const user_email = req.body.user_email;
    const phone_num = req.body.phone_num;
    const street = req.body.street;
    const city = req.body.city;
    const country = req.body.country;
    const suburb = req.body.suburb;
    const state = req.body.state;
    const p_code = req.body.p_code;
    const cnum = req.body.cnum;
    const cvv = req.body.cvv;
    total = totalPrice;
    const exp = req.body.exp;

    const sql = `
    INSERT INTO Orders (fname, lname, user_email, phone_num, street, city, country, suburb, state, p_code, cnum, cvv, total, exp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  db.run(sql, [fname, lname, user_email, phone_num, street, city, country, suburb, state, p_code, cnum, cvv, total, exp], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('New data inserted');

    res.send('Order placed successfully.');
  });
});



app.listen(port, function () {
    console.log(`Web server running at: http://localhost:${port}`)
    console.log("Type Ctrl+C to shut down the web server")
});





// elements.js containing some default HTML code for all pages

let defhead = `<!DOCTYPE html>
<html lang="en">
<head>
<title>Phone Genie</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>`

let nbar = `<nav class="navbar bg-dark navbar-dark" id="navbar"><div class="container-fluid">
<button class="btn btn-dark m-1 float-start"
    onclick="window.location.href='http://localhost:3000/home.html';" type="button">Home</button>
<button class="btn btn-dark m-1 float-end"
 onclick="window.location.href='http://localhost:3000/';" type="button">Log Out</button>
</div></nav>`

let pgheader = `<header class="container-fluid text-bg-dark p-4" id="headerElement"><form method="post" action="/search"><div class="row">
<div class="col-sm-1 col-12">
    <img src="/images/logo.png" alt="Avatar Logo" class="img-fluid rounded-circle">
</div>
<div class="col-md-2">
    <h2>Phone Genie</h2>
    <p>The online mobile shop</p>
</div>

<div class="col-md-5 pt-4">
    <input type="text" class="form-control" name="keyword" id="keyword" placeholder="What do you have in mind?">
        
    
</div>
<div class="col-md-2 pt-4">
            <button type="submit" class="btn btn-light">Search</button>
</div>
<div class="col-md-2 pt-4">
    <form name="services" id="services">
        <select class="form-select" id="servicesdropdown" onchange="ServicesSelection()">
            <option disabled selected>Services</option>
            <option value="all">All Phones</option>
            <option value="new">New Phones</option>
            <option value="used">Used Phones</option>
            <option value="service">Service your phone</option>
        </select>
    </form>
</div>
</div></form></header>`

let deffoot = `<footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2023 Mobile Genie</p>
        </footer><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script></body></html>`



module.exports = {
    defhead,
    nbar,
    pgheader,
    deffoot,
};