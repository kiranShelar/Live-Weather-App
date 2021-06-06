
const express = require("express");

const bodyParser = require("body-parser");

const fetch = require("node-fetch");

const path = require("path");

const hbs = require("hbs"); 
const { response } = require("express");
const { json } = require("body-parser");
const port = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// Define paths for express config..
const publicDir = path.join(__dirname,"/public");
const viewsDir = path.join(__dirname,"/templates/views");
const partialDir = path.join(__dirname,"/templates/partials")


// Setup Handlebars engine & views path
app.set("view engine","hbs");
app.set("views", viewsDir)
hbs.registerPartials(partialDir)


app.use(express.static(publicDir));

app.get("/",(req,res)=>{
    res.render("index")
})



app.post("/",async(req,res)=>{

    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=dfb8a8988af98a68379798600321e627"

    try {
        await fetch(url).then(res=> res.json())
        .then(data =>{
            // const weatherData = JSON.parse(data);
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const iconImgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
  
            res.render("weather",{weatherDesc:description,location:query,Locationtemp:temp, imgIcon:iconImgURL});
            
        })

    } catch (e) {
        if (!query || data.message ==="Nothing to geocode") {
            res.render("badreq",{errorTitle1:"Oops! Bad request.", errorTitle2:"Please enter valid location"});
        }
        console.log(e);
    }
})


app.listen(port,function () {
    console.log(`Server running on : ${port}`);
})