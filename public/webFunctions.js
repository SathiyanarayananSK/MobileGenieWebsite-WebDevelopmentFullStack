function NavigationBar ()
{
    let outputHTML = `<div class="container-fluid">
                            <button class="btn btn-dark m-1 float-start"
                                onclick="window.location.href='http://localhost:3000/home.html';" type="button">Home</button>
                            <button class="btn btn-dark m-1 float-end"
                             onclick="window.location.href='http://localhost:3000/login.html';" type="button">Log Out</button>
                        </div>`

    document.getElementById("navbar").innerHTML = outputHTML;
}

function DefaultHeader ()
{
    outputHTML = `<form method="post" action="/search"><div class="row">
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
                </div></form>`

    document.getElementById("headerElement").innerHTML = outputHTML;
}

function CheckoutValidation()
{
    const _fname = document.getElementById("fname").value;
    const _lname = document.getElementById("lname").value;
    const _email = document.getElementById("user_email").value;
    const _cCode = document.getElementById("c_code").value;
    const _phoneNum = document.getElementById("phone_num").value;
    const _street = document.getElementById("street").value;
    const _city = document.getElementById("city").value;
    const _country = document.getElementById("country").value;
    const _suburb = document.getElementById("suburb").value;
    const _state = document.getElementById("state").value;
    const _pCode = document.getElementById("p_code").value;
    const _cnum = document.getElementById("cnum").value;
    const _cvv = document.getElementById("cvv").value;
    const _exp = document.getElementById("exp").value;

    const _namemsg = document.getElementById("namemsg");
    const _emailmsg = document.getElementById("emailmsg");
    const _phonemsg = document.getElementById("phonemsg");
    const _addmsg = document.getElementById("addmsg");
    const _crdmsg = document.getElementById("crdmsg");

    let cname, cemail, cphone, cadd, ccrd;


    if (_fname.length == 0 || _lname.length == 0)
    {
        _namemsg.innerHTML = "<em>Name cannot be empty</em>";
        _namemsg.classList.add("text-danger");
        cname = false;
    }
    else
    {
        _namemsg.innerHTML = "<em>Valid</em>";
        _namemsg.classList.add("text-success");
        cname = true;

    }

    if (_email.length == 0)
    {
        _emailmsg.innerHTML = "<em>Email cannot be empty</em>";
        _emailmsg.classList.add("text-danger");
        cemail = false;
    }
    else
    {
        _emailmsg.innerHTML = "<em>Valid</em>";
        _emailmsg.classList.add("text-success");
        cemail = true;

    }

    if (_cCode.length != 2 || _phoneNum.length != 10)
    {
        _phonemsg.innerHTML = "<em>Please enter a valid 10 digit phone number with 2 dight country code.</em>";
        _phonemsg.classList.add("text-danger");
        cphone = false;
    }
    else
    {
        _phonemsg.innerHTML = "<em>Valid</em>";
        _phonemsg.classList.add("text-success");
        cphone = true;
    }

    if (_street.length == 0 || _city.length == 0 || _country.length == 0 || _suburb.length == 0 || _state.length == 0 || _pCode.length == 0)
    {
        _addmsg.innerHTML = "<em>You cannot leave any of the address feilds empty!</em>";
        _addmsg.classList.add("text-danger");
        cadd = false;
    }
    else
    {
        _addmsg.innerHTML = "<em>Valid</em>";
        _addmsg.classList.add("text-success");
        cadd = true;
    }

    if (_cnum.length != 16 || _cvv.length != 3)
    {
        _crdmsg.innerHTML = "<em>Card number should be 16 digits long, cvv should be 3 digits long and date should not be empty</em>";
        _crdmsg.classList.add("text-danger");
        ccrd = false;
    }
    else
    {
        _crdmsg.innerHTML = "<em>Valid</em>";
        _crdmsg.classList.add("text-success");
        ccrd = true;
    }


    if (cname && cemail && cphone && cadd && ccrd)
    {
        return true;
    }
    else
    {
        return false;
    }
    

}







