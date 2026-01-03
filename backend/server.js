import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());



app.get("/api/weather", async (req, res) => {
  const city = req.query.city; 
  console.log("İstek geldi! Aranan şehir:", city);
  if(!city) return res.status(400).json({message : "Şehir bulunamadı."})
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
        res.json(response.data);
    }
    catch (error) {
    if (error.response) {
        
        console.log("API Yanıt Hatası:", error.response.data);
    } else if (error.request) {
        
        console.log("Sunucuya Ulaşılamadı:", error.request);
    } else {
        
        console.log("Hata:", error.message);
    }
    res.status(error.response ? error.response.status : 500).json({ message: "Hava durumu bilgisi alınamadı." });
}
    

});


app.listen(port,()=>{
    console.log(`Port is on ${port}`)
    
})