const fs = require("fs");
const Facturama = require("../../lib/facturama.api.multiemisor");

var newCsd = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-MULTIEMISOR/CSDS.json", "utf8")
);

function testCertificates() {
  // Listamos todos los CSDS cargados
  Facturama.Certificates.List((result) => {
    console.log("todos los CSD ", result);
  });

  //Buscar certificado por RFC
  var rfc = "EKU9003173C9";
  var certif;

  Facturama.Certificates.Get(rfc, (result) => {
    certif = result;
    console.log("Obtener CSD de un RFC ", result);
  });

  //eliminar los certificados del rfc especificado
  Facturama.Certificates.Remove(
    rfc,
    (result) => {
      console.log("se elimino", result);
    },
    (error) => {
      console.log(error);
    }
  );

  //Cargar Nuevo Certificado

  Facturama.Certificates.Create(
    newCsd,
    (result) => {
      certif = result;
      console.log("se agrega nuevo RFC y CSD,", result);
    },
    (error) => {
      console.log(error);
    }
  );

  //Actualizar certificado
  newCsd.PrivateKeyPassword = "12345678";
  Facturama.Certificates.Update(
    rfc,
    newCsd,
    (result) => {
      certif = result;
      console.log("actualizacion csd", result);
    },
    (error) => {
      console.log(error);
    }
  );
}
testCertificates();
