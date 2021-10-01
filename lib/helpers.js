const cheerio = require("cheerio");

export async function getLunchData(){
    let data = await fetch("https://pulsenkonferens.se/dagens-lunch/").then(r => r.text())
    var d = new Date();
    var n = d.getDay();
    const $ = cheerio.load(data);
    const weekdays = $('.vc_row-fluid.margin-top .wpb_column ul').toArray().map(
        day => $(day).find('li').toArray().map(food => $(food).text())
        )
    return {today: weekdays[n-1], updatedAt: Date.now()}
  }
  