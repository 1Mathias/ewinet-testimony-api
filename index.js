const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const hashTagRoute = require("./routes/HashTags");
const multer = require("multer");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
    );

    res.header(
        "Access-Control-Expose-Headers",
        "x-access-token, x-refresh-token"
    );
    next();
});



mongoose.connect('mongodb+srv://matthias:Matuks123.4567@atlascluster.pnal9p8.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to MongoDB")).catch((err) => console.log(err));

const storage = multer.diskStorage({
    //request, file, callback
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.get("/", function (req, res) {
    // We want to return an array of all the lists that belong to the authenticated user
    res.writeHead(200, { "Content-Type": "text/plain" });
    //res.end("Hello World")
    res.sendFile(__dirname + "public/index.html");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/hashtag", hashTagRoute);

app.listen(5000, () => {
    console.log("Backend is running.")
}) 