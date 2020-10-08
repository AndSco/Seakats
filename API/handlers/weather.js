const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");

const airportMarinersUrl =
  "https://www.maltairport.com/weather/3-day-forecast-for-mariners/";
const iconsUrls = "https://www.maltairport.com/weather/7-day-forecast/";
const mainWeatherPage = "https://www.maltairport.com/weather/";

async function getHtml(url) {
  try {
    // Create new axios instace ignoring SSL issues
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    // Fire the axios instance request and store it in a const (it is located in res.data, hence destructuring)
    const { data } = await instance.get(url);
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const readyForScraping = async url => {
  try {
    const html = await getHtml(url);
    // Load up cheerio
    const cheerioSetup = cheerio.load(html, {
      xml: {
        normalizeWhitespace: true
      }
    });

    return cheerioSetup;
  } catch (err) {
    console.log(err);
  }
};

exports.getTodayWeather = async () => {
  try {
    const $ = await readyForScraping(airportMarinersUrl);
    const htmlElements = await $(`#wgt-dayone .jdash-body ul li p`);

    // console.log(htmlElements);
    const headersArr = [
      "warnings",
      "situation",
      "weather",
      "wind",
      "visibility",
      "sea",
      "swell",
      "seaTemperature"
    ];

    // Initialise empty object
    const weatherInfoObject = {};

    // For each cheerio element, build up the object
    await htmlElements.each(function(index) {
      const header = headersArr[index];
      // Dynamically set key value in object!!!
      weatherInfoObject[header] = $(this).text();
    });

    // Add icon url to object, derived from email below
    weatherInfoObject.weatherIconUrl = await scrapeIcon(mainWeatherPage);
    weatherInfoObject.shortWind = await getShortWindForecast();

    console.log("OBJ", weatherInfoObject);
    // Return the whole object
    return weatherInfoObject;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

exports.getFollowingWeather = async dayNumber => {
  try {
    if (dayNumber !== "two" && dayNumber !== "three") {
      console.log("only 3 days of forecast!");
      return;
    }
    const $ = await readyForScraping(airportMarinersUrl);
    const htmlElements = await $(`#wgt-day${dayNumber} .jdash-body ul li`);

    const weatherInfoObject = {};

    htmlElements.each(function(index) {
      const allTextArray = $(this)
        .text()
        .split(" ");
      const header = allTextArray[1].toLowerCase();
      const text = allTextArray.slice(2, allTextArray.length).join(" ");
      weatherInfoObject[header] = text;
    });

    const dayInDigit = dayNumber === "two" ? 2 : 3;
    weatherInfoObject.weatherIconUrl = await scrapeOtherIcons(dayInDigit);

    return weatherInfoObject;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const scrapeIcon = async url => {
  const $ = await readyForScraping(url);

  // FIND NESTED IMAGE SRC!!!
  const iconUrl = await $(".7-day-forecast-2")
    .find("div")
    .find("img")
    .attr("src");

  return iconUrl;
};

const scrapeOtherIcons = async dayNumber => {
  try {
    const $ = await readyForScraping(iconsUrls);

    // aria-describedby="slick-slide00"
    const iconElements = await $(`.carosel`)
      .find("div")
      .find("img");

    const urlArray = [];

    iconElements.each(function() {
      urlArray.push($(this).attr("src"));
    });

    // console.log(urlArray);

    return urlArray[dayNumber - 1];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getShortWindForecast = async () => {
  try {
    const $ = await readyForScraping(mainWeatherPage);

    const shortWind = await $(".7-day-forecast-2")
      .find(".wind")
      .first()
      .text();

    console.log("wind", shortWind);
    return shortWind;
  } catch (err) {
    throw err;
  }
};
