const fs = require("fs");
const Facturama = require("../../lib/facturama.api");

var cfdi40 = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-WEB/cfdi40.json", "utf8")
);

function testCRUDCfdi() {
  Facturama.Cfdi.Create3(
    cfdi40,
    (response) => {
      console.log(response);
      var Cfdi_Id = response.Id;

      // Enviar por correo
/*
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
      */

      // Cancelación
      //eliminar el cfdi creado
		var _type="issued";			//Valores posibles (issued | payroll)
		var _motive="02"; 			//Valores Posibles (01|02|03|04)
		var _uuidReplacement="null";	//(uuid | null)
      Facturama.Cfdi.Cancel(
        response.Id + "?type=" + _type + "&motive=" + _motive + "&uuidReplacement=" +_uuidReplacement,
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
