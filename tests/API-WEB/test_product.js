const fs = require("fs");
const Facturama = require("../../lib/facturama.api");

var newProduct= JSON.parse(
  fs.readFileSync("../../JSON_samples/API-WEB/products.json"),
  "utf8"
);

function testCRUDProducts()
{
    var product;
	//creacion de un producto
	Facturama.Products.Create(newProduct, function(result){ 
		product = result;
		console.log("creacion",result);
    
	    //editar el producto
	    product.Description = "CONCEPTO EDITADO";
	    Facturama.Products.Update(product.Id, product, function(result){ 
			console.log("edicion", result);

			//obtener el producto editado
			Facturama.Products.Get(product.Id, function(result){
				product = result;
				console.log("obtener",result);

				//eliminar el producto creado
				Facturama.Products.Remove(product.Id, function(result){ 
					console.log("eliminado",result);
				});
			});

			//obtener todos los productos
			Facturama.Products.List(function(result){ 
				productUpdate = result;
				console.log("todos",result);
			});
		});

	});

}
testCRUDProducts();