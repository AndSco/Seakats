import { currentIP } from "./ipAdrresses";

const developmentUrl = `http://${currentIP}:8081`;
const productionUrl = "https://seakats-api.herokuapp.com";

const apiURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? developmentUrl
    : productionUrl;

export default apiURL;
