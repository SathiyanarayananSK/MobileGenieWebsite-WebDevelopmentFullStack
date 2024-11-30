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