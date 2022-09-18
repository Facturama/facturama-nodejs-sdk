
var request = require('request');
var _ = require('underscore');


var valuesFacturama = {
    token: "cHJ1ZWJhczpwcnVlYmFzMjAxMQ==", 
    url: "https://apisandbox.facturama.mx/",
    user: 'pruebas',
    pass: 'pruebas2011'
};


function facturama(baseData) {

    var settings = {
        url: valuesFacturama.url
    };

    function sendRequest(data) {
    	
		var baseUrl = settings.url;
		var baseRequestOptions = {
			url: baseUrl + data.apiUrl,
			method: 'GET',
			json: true,
			timeout: data.timeout,
			headers : {
	            "Authorization" : 'Basic ' + valuesFacturama.token,
	        }
		};

		request(_.extend(baseRequestOptions, data.requestData), function(err, res, body){
			 // console.log('error:', err); // Print the error if one occurred
			 // console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
			 // console.log('body:', body); // Print the HTML for the Google homepage.
			 
			if(res.statusCode == 401 && data.callbackError) {
                cconsole.log(res.statusCode);
				data.callbackError(err);
			}
			if(res.statusCode == 400 && data.callbackError) {
                console.log(res.statusCode);
				data.callbackError(body);
			}
			if((res.statusCode >= 200 && res.statusCode <= 204) && data.callback) {
				console.log(res.statusCode);
                data.callback(body);
                
			}
		});
	}

    function retrieve(path, id, callback) {

    	let urlPath =  path + '/' + id;
    	return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'GET' },
	      callback: callback
	    });
    }

    function list(path, callback) {
    	let urlPath =  path;
    	return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'GET' },
	      callback: callback
	    });
    }

    function listWithParam(path, param, callback) {
    	let urlPath =  path + param;
    	return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'GET' },
	      callback: callback
	    });
    }

    function postSyncWithParam(path, param, callback) {
        let urlPath =  path + param;
    	return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'POST', json: {}},
	      callback: callback
	    }); 
    }

    function postSyncWithData(path, data, callback, callbackError) {
        let urlPath =  path;
    	return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'POST', json: data },
	      callback: callback,
	      callbackError: callbackError
	    }); 
    }

    function putSyncWithData(path, data, callback, callbackError) {
        let urlPath = path;
    	return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'PUT', json: data },
	      callback: callback,
	      callbackError: callbackError
	    }); 
    }

    function deleteSyncWithParam(path, param, callback, callbackError) {
        let urlPath = path + '/' + param;
        return sendRequest({
	      apiUrl: urlPath, 
	      requestData: {method: 'DELETE' },
	      callback: callback,
	      callbackError: callbackError
	    }); 
    }

    var facturamaObject = {
       
        Cfdi: {
            Get: function (id, callback) {
                return retrieve('api-lite/cfdis', id, callback);
            },
            List: function (param, callback) {
                return listWithParam('api-lite/cfdis', param, callback);
            },
            Create: function (data, callback, callbackError) {
                postSyncWithData('api-lite/2/cfdis', data, callback, callbackError);
            },
            Create3: function (data, callback, callbackError) {
                postSyncWithData('api-lite/3/cfdis', data, callback, callbackError);
            },
            Send: function (param, callback) {
                postSyncWithParam('cfdi', param, callback);
            },
            Cancel: function (params, callback, callbackError) {
                deleteSyncWithParam('api-lite/cfdis', params, callback, callbackError);
            },
            Download: function (format, type, id, callback) {
                retrieve('cfdi/' + format + '/' + type, id, callback);
            },
            Acuse: function (format, type, id, callback) {
                retrieve('acuse/' + format + '/' + type, id, callback);
            }

        },
        Certificates: {
            Get: function (param, callback) {
                return listWithParam('api-lite/csds/', param, callback);
            },
            List: function (callback) {
                return list('api-lite/csds', callback);
            },
            Create: function (data, callback, callbackError) {
                postSyncWithData('api-lite/csds', data, callback, callbackError);
            },
            Update: function (param, data, callback, callbackError) {
                putSyncWithData('api-lite/csds/' + param, data, callback, callbackError);
            },
            Remove: function (params, callback, callbackError) {
                deleteSyncWithParam('api-lite/csds', params, callback, callbackError);
            }
        },
        Catalogs: {
            States: function (country, callback) {
                return list('catalogs/municipalities?countryCode' + country, callback);
            },
            Municipalities: function (state, callback) {
                return list('catalogs/municipalities?stateCode' + state, callback);
            },
            Localities: function (state, callback) {
                return list('catalogs/localities?stateCode' + state, callback);
            },
            Neighborhoods: function (postalCode, callback) {
                return list('catalogs/neighborhoods?postalCode' + postalCode, callback);
            },
            ProductsOrServices: function (callback) {
                return list('catalogs/ProductsOrServices', callback);
            },
            PostalCodes: function (keyword, callback) {
                return list('catalogs/PostalCodes?keyword=' + keyword, callback);
            },
            Units: function (callback) {
                return list('catalogs/Units', callback);
            },
            Currencies: function (callback) {
                return list('catalogs/Currencies', callback);
            },
            Countries: function (callback) {
                return list('catalogs/Countries', callback);
            },
            PaymentForms: function (callback) {
                return list('catalogs/PaymentForms', callback);
            },
            PaymentMethods: function (callback) {
                return list('catalogs/PaymentMethods', callback);
            },
            FederalTaxes: function (callback) {
                return list('catalogs/FederalTaxes', callback);
            },
            FiscalRegimens: function (callback) {
                return list('catalogs/FiscalRegimens', callback);
            },
            CfdiTypes: function (callback) {
                return list('catalogs/CfdiTypes', callback);
            },
            RelationTypes: function (callback) {
                return list('catalogs/RelationTypes', callback);
            },
            CfdiUses: function (keyword, callback) {
                return list('catalogs/CfdiUses?keyword=' + keyword, callback);
            }
        },
	
    };

    facturamaObject.getToken = function () {
        return "Basic " + valuesFacturama.token;
    };

    facturamaObject.getBaseUri = function () {
        return settings.url;
    };

    return facturamaObject;
}

module.exports = facturama();
