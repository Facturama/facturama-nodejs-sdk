const fs = require("fs");
const Facturama = require("../../lib/facturama.api");

var cfdi33 = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-WEB/cfdi33.json", "utf8")
);

function testCRUDCfdi() {
  Facturama.Cfdi.Create(
    cfdi33,
    (response) => {
      console.log(response);
      var Cfdi_Id = response.Id;

      // Enviar por correo

      var email = "ejemplo@ejemplo.com";
      var type = "issued";

      Facturama.Cfdi.Send(
        "?cfdiType=" + type + "&cfdiId=" + Cfdi_Id + "&email=" + email,
        (response) => {
          console.log("Enviado");
        }
      );

      // Descargar PDF
      Facturama.Cfdi.Download("pdf", "issued", Cfdi_Id, (response) => {
        console.log(response);
      });

      // Descargar XML
      Facturama.Cfdi.Download("xml", "issued", Cfdi_Id, (response) => {
        console.log(response);
      });

      // Cancelación
      Facturama.Cfdi.Cancel(
        response.Id,
        (response) => {
          console.log(response);
        },
        (e) => {
          console.log(e);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
}
testCRUDCfdi();
