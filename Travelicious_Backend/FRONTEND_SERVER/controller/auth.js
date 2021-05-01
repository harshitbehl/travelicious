const request = require('request');



const apiOptions = {
    server : "http://localhost:3000"
}

module.exports.login = function(req, res){
    res.render("login");
}


module.exports.AddNewlogin = function(req, res){
    const path = "/auth/signup"

    const postdata = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phonenumber : req.body.phonenumber,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        
    }

    const requestOptions = {
        url : apiOptions.server + path,
        method : 'POST',
        json: postdata
    }

    request(requestOptions, (err, response, body) => {
        if(response.statusCode == 200){
            console.log("sucess");
            res.redirect('/');
           // alert("Sign Up Succesfull")
        }
        else{
            res.redirect("/login");
         //   alert("Sign up fail");
        }
    });
}




module.exports.login_cred = function(req, res){
    
    const path = `/auth/login/?username=${req.body.username}&password=${req.body.password}`;
    const requesOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
    }

    request(requesOptions,(err, response, body) => {
        if(response.statusCode == 200){
            res.redirect("/");
         
        }
        else{
            res.redirect("/login");
          
        }
        
    });
    
}


