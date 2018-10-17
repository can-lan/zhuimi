const express=require("express");
const bodyParser=require("body-parser");
const index=require("./routes/index");
const api=require("./routes/api");

const app=express();
app.listen(7000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use("/index",index);
app.use("/api",api);