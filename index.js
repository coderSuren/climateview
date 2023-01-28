const express= require("express")
const https= require("https");
const bodyParser= require("body-parser")
const app= express();

let icon="";
let desc="";

app.set('view engine','ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index", {displayProperty: "None", weatherImg: icon, weatherData: ["","",""]});   
})

app.post("/",function(req,res){
    const city= req.body.city;
   
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city +"&appid=db6c3300cf51f6d40274bfc691268991&units=metric";
    
    https.get(url,function(response){ 
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            icon= "https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+".png";
            weather= [city, weatherData.weather[0].description, weatherData.main.temp]
            res.render("index", {displayProperty: "block" ,weatherImg: icon, weatherData: weather});
        })
    });
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is runninng on port 3000");
})