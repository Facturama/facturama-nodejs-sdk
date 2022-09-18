const fs = require("fs");
const Facturama = require("../../lib/facturama.api.multiemisor");

var newCfdi33 = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-MULTIEMISOR/cfdi33.json", "utf8")
);

function testCRUDCfdiMultiEmisor() {
  var cfdi;

  //creacion de un CFDI MULTIEMISOR
  Facturama.Cfdi.Create(
    newCfdi33,
    (result)=> {
      cfdi = result;
      console.log("Creacion multiemisor", result);
      console.log(cfdi);

      //descargar el XML del cfdi
       Facturama.Cfdi.Download("xml", "issuedLite", cfdi.Id,(result)=>{
        console.log("descarga multiemisor", result);
      }); 

      //obtener todos los cfdi con cierto rfc
       var rfc = "EKU9003173C9";
      Facturama.Cfdi.List("?rfc=" + rfc,(result)=> {
        clientUpdate = result;
        console.log("todos", result);
      });
 
      //cancelar el cfdi creado
       var _motive = "02"; //Valores Posibles (01|02|03|04)
      var _uuidReplacement = "null"; //(uuid | null)
      Facturama.Cfdi.Cancel(
        cfdi.Id + "?motive=" + _motive + "&uuidReplacement=" + _uuidReplacement,
        (result)=> {
          console.log("eliminado", result);
        }
      ); 
    },
    (error)=> {
      console.log(error);
    }
  );
}
testCRUDCfdiMultiEmisor();
