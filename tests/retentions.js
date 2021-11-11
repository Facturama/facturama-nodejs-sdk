const fs = require("fs");
const Facturama = require("../lib/facturama.api");

var retentions = JSON.parse(fs.readFileSync("samples/retentions.json", "utf8"));

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
// Facturama.Cfdi(cfdi33PorPagar, response => {
//     console.log(response);
//     Facturama.Cfdi.Cancel(response.Id, response => {
//         console.log(response);
//     }, e => {
//         console.log(e);
//     });
// }, error => {
//     console.log(error);
// });
