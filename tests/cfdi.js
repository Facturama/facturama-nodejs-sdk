const fs = require('fs');
const Facturama = require('../lib/facturama.api');

var cfdi33PorPagar = JSON.parse(fs.readFileSync('samples/cfdi33_ppd.json', 'utf8'));

Facturama.Cfdi.Create(cfdi33PorPagar, response => {
    console.log(response);
    Facturama.Cfdi.Cancel(response.Id, response => {
        console.log(response);
    }, e => {
        console.log(e);
    });
}, error => {
    console.log(error);
});