const fs = require("fs");
const Facturama = require("../../lib/facturama.api");

var client = JSON.parse(
  fs.readFileSync("../../JSON_samples/API-WEB/clients.json"),
  "utf8"
);

function testCRUDClients() {
  //Cliente Nuevo

  Facturama.Clients.Create(
    client,
    (response) => {
      console.log(response);
    },
    (e) => {
      console.log("Error:" + e);
    }
  );

  //Editar Cliente usando Id.
  var Id_client = "YVoZroGx4koDU0W3TiOTCw2";

  // Mostramos datos del cliente antes de editar
  Facturama.Clients.Get(Id_client, (response) => {
    //Mostramos JSON con datos del cliente
    console.log(response);

    //Actualizamos correo
    response.Email = "1111@correo.com";
    var clienteUpdate = response;
    console.log(clienteUpdate);

    Facturama.Clients.Update(
      Id_client,
      clienteUpdate,
      (response) => {
        console.log("Completo");
      },
      (e) => {
        console.log("Error al actualzar " + e);
      }
    );
  });

  //Listamos todos los clientes

  Facturama.Clients.List((response) => {
    console.log(response);
  });

  //Eliminar cliente
  var Id_client = "y3q-RGcHopKpekP1z-zWZQ2";
  Facturama.Clients.Remove(
    Id_client,
    (response) => {
      console.log(response);
    },
    (e) => {
      console.log(e);
    }
  );
}

testCRUDClients();
