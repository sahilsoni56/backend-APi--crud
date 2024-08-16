require("dotenv").config();
const express = require("express");
const app = express();
const expressSession = require("express-session");
const flash = require("connect-flash")
 
const indRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const db = require("./config/mongoose-connection");

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}));

app.use(flash());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use("/", indRouter);
app.use("/owner", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



// Server listening
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
