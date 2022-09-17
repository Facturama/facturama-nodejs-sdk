const fs = require("fs");
const Facturama = require("../../lib/facturama.api");

var cfdi33 = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-WEB/cfdi33.json", "utf8")
);
var payment = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-WEB/payment.json", "utf8")
);

function testPaymentComplement() {
  var cfdi;

  Facturama.Cfdi.Create(
    cfdi33,
    (response) => {
      //Creacion de un CFDI inicial
      console.log(response);
      cfdi = response;

      //Añadimos el UUID del CFDI al Complemento de pago
      payment.Complemento.Payments[0].RelatedDocuments[0].Uuid =
        cfdi.Complement.TaxStamp.Uuid;

      //Creamos el complemento de pago
      Facturama.Cfdi.Create(
        payment,
        (response) => {
          //Creacion del complemento de pago
          console.log(response);
        },
        (e) => {
          console.log(e);
        }
      );
    },
    (e) => {
      //Error
      console.log(e);
    }
  );
}

testPaymentComplement();
