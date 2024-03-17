import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// API website used: https://www.weatherapi.com
// API endpoint URL
const apiKey = "ce510a0cf5a54a9098f192802241403";
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Oshawa`;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data; // Extract the data from the response
        res.render("index.ejs", {
            city: data.location.name,
            weather: data.current.condition.text,
            temperature: `${data.current.temp_c}°C`,
            humidity: `${data.current.humidity}%`,
            wind: `${data.current.wind_mph} mph`
        });
        console.log( {
            city: data.location.name,
            weather: data.current.condition.text,
            temperature: `${data.current.temp_c}°C`,
            humidity: `${data.current.humidity}%`,
            wind: `${data.current.wind_mph} mph`
        })

    // Handle any errors
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

