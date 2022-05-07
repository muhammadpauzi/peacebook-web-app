const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");

dotenv.config();

// configs
const { initPassport } = require("./configs/passport.js");

// routes
const authRoutes = require("./routes/auth.js");
const homeRoutes = require("./routes/home.js");
const { connectToMongoDB } = require("./configs/mongodb.js");
const { getEnv } = require("./utils/index.js");

const app = express();
const PORT = getEnv("PORT", 5000);

// handlebars
app.engine(
    ".hbs",
    exphbs.create({
        defaultLayout: "main",
        extname: ".hbs",
        partialsDir: __dirname + "/views/partials/",
    }).engine
);
app.set("view engine", ".hbs");

// session
app.use(
    session({
        name: "peacebook-session-id",
        secret: getEnv("SECRET_SESSION", "xxx"),
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: getEnv("MONGO_URI") }),
    })
);

// flash
app.use(flash());

// static
app.use(express.static("public"));

// request body
app.use(express.urlencoded({ extended: true }));

// init passport (google strategy)
initPassport(app);

// connect to mongodb
(async () => await connectToMongoDB())();

// init routes
app.use("/", authRoutes);
app.use("/", homeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
