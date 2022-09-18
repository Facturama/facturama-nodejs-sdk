const fs = require("fs");
const Facturama = require("../../lib/facturama.api");

var retentions = JSON.parse(fs.readFileSync("../../JSON_samples/API-WEB/retentions.json", "utf8"));

Facturama.Retentions.Create(
  retentions,
  (response) => {
    console.log("success");
    console.log(response);
  },
  (error) => {
    console.error(error);
  }
);

