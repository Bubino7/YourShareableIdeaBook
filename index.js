import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const credentials = {
    Email : "adminBubo@ysib.com",
    Username : "BuboAdmin",
    Password : "aa"
}

let userAuthorised = true;

let thought = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded( {extended: true} ));
 
// home route
app.get("/", (req, res) => {
    res.render("main.ejs", {
        authorisationCheck: userAuthorised,
        Email: credentials.Email,
        Username: credentials.Username,
        Password: credentials.Password
    });
});

// logged in user home route
app.get("/home", (req, res) => {
    if (userAuthorised === true) {
        res.render("home.ejs", {
            authorisationCheck: userAuthorised,
            Email: credentials.Email,
            Username: credentials.Username,
            Password: credentials.Password,
            blogTitle: thought[0].title,
            blogText: thought[0].text
        });
    } else {
        res.render("main.ejs");
    }
});

// logged in user profile page route
app.get("/profile", (req, res) => {
    if (userAuthorised === true) {
        res.render("profile.ejs", {
            authorisationCheck: userAuthorised,
            Email: credentials.Email,
            Username: credentials.Username,
            Password: credentials.Password
        });
    } else {
        res.render("main.ejs");
    }
});

// unauthorised user acces to login page
app.get("/login", (req, res) => {
    res.render("login.ejs", {
        authorisationCheck: userAuthorised,
        Email: credentials.Email,
        Username: credentials.Username,
        Password: credentials.Password
    });
});

// blog view
app.get("/blogPost", (req, res) => {
    res.render("blog.ejs", {
        authorisationCheck: userAuthorised,
        Email: credentials.Email,
        Username: credentials.Username,
        Password: credentials.Password,
        blogTitle: thought[0].title,
        blogText: thought[0].text
    });
});

// login route
app.post("/submit", (req, res) => {
    if(req.body.email === credentials.Email && req.body.password === credentials.Password) {
        userAuthorised = true;
        res.render("home.ejs", {
            authorisationCheck: userAuthorised,
            Email: credentials.Email,
            Username: credentials.Username,
            Password: credentials.Password
        });
        console.log(req.body);
    } else {
        res.render("main.ejs", {
            authorisationCheck: userAuthorised,
            Email: credentials.Email,
            Username: credentials.Username,
            Password: credentials.Password
        });
    }
});

// register route
app.post("/register", (req, res, next) => {
    console.log(req.body);
    next();
});

// create a new blog route
app.post("/createBlog", (req, res, next) => {
    console.log(req.body);
    let myThought = {
        title: req.body.blogTitle,
        text: req.body.blogText
    };
    thought.push(myThought);

    res.render("profile.ejs", {
        authorisationCheck: userAuthorised,
        Email: credentials.Email,
        Username: credentials.Username,
        Password: credentials.Password,
        blogTitle: thought[0].title,
        blogText: thought[0].text
    });
    
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

