const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.allsvenskan.se/matcher";

export default async function handler(req, res) {
  const { data } = await axios.get(url);
  // Load HTML we fetched in the previous line
  const $ = cheerio.load(data);
  // Select all the list items in plainlist class
  const listItems = $(".matchesRounds a.item");
  // Stores data for all countries
  const countries = [];
  // Use .each method to loop through the li we selected
  listItems.each((idx, el) => {
    // Object holding data for each country/jurisdiction
    const country = { teams: "", date: "",round:"" };
    // Select the text content of a and span elements
    // Store the textcontent in the above object
    country.teams = $(el).find("div.teams").text();
    country.date = $(el).find("div.date").last().text();
    country.round = $(el).prevAll('h3.title').first().text();
    if(req.query['filter']){
      if(country.teams.toLowerCase().indexOf(req.query['filter']) > -1){
        countries.push(country);
      }
    }else{
      countries.push(country);
    }

  });
  res.status(200).json({ matches: countries})
}
