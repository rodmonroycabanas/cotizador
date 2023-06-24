


  
const formulario = document.querySelector("#formulario");
const marca = document.querySelector('#marca');
const modelo = document.querySelector('#modelo');
const anio = document.querySelector('#anio');
const aseguradora = document.querySelector('#aseguradora');
const precio = document.querySelector('#precio');
const autoPrecio = document.querySelector('#auto-precio');
const cobertura = document.querySelector('#cobertura');
const anInicio = document.querySelector('#anInicio');
const anFin = document.querySelector('#anFin');
const anioDesde = document.querySelector('#anioDesde');
const anioHasta = document.querySelector('#anioHasta');
const xcent = document.querySelector('#xcent');

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(autoPrecio.checked){
        cargarMultipleSeguro();
    }
    else{
        cargarSeguro();
    }
});

function cargarSeguro(){
    var nuevoSeguro = new Seguro()
    nuevoSeguro.marca = marca.value;
    nuevoSeguro.modelo = modelo.value;
    nuevoSeguro.anio = anio.value;
    nuevoSeguro.aseguradora = aseguradora.value;
    nuevoSeguro.cobertura = cobertura.value;
    nuevoSeguro.precio = precio.value;
    
    seguros.push(nuevoSeguro);
    nuevoSeguro.sendToLocalStorage();
};

// for those auto calculated
function cargarSeguroConDatos(nuevoAnio, nuevoPrecio){
    var nuevoSeguro = new Seguro()
    nuevoSeguro.marca = marca.value;
    nuevoSeguro.modelo = modelo.value;
    nuevoSeguro.anio = nuevoAnio;
    nuevoSeguro.aseguradora = aseguradora.value;
    nuevoSeguro.cobertura = cobertura.value;
    nuevoSeguro.precio = nuevoPrecio;
    
    seguros.push(nuevoSeguro);
    nuevoSeguro.sendToLocalStorage();
};

function cargarMultipleSeguro (){
    var aInicio = anioDesde.value;
    var aFin = anioHasta.value;
    var xCentInc  = xcent.value;
    var increment = 1;
    var anio = aInicio;
    var anioTar = aFin;
    var nuevoPrecio = precio.value;

    //calculo de la fecha final a la inicial
    if( anFin.checked){
        increment = -1;
        anio = aFin;
        anioTar = aInicio;
    }
    //Incrementando el target para incluirse en el loop
    anioTar= (parseInt(anioTar) + increment).toString();

    do{
        cargarSeguroConDatos(anio, nuevoPrecio)
        anio= (parseInt(anio) + increment).toString();
        nuevoPrecio =  (parseInt(nuevoPrecio)+ parseInt(nuevoPrecio)*(parseInt(xCentInc)/100)).toString();
    }while(anio!=anioTar)


};



async function crearPrecioAsync(precio){
    const resp = await fetch(urlCatalogo,{
      method: "POST",
      body: JSON.stringify(precio),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data1 = await resp.json();
    console.log(data1);
  }
  
  function crearPrecioSync(precio) {
    return new Promise((resolve) => {
      fetch(urlCatalogo, {
        method: "POST",
        body: JSON.stringify(precio),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        resolve(resp);
      });
    }).then((data) => {
      // Esperar 3 segundos- Mockapi me rechaza
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 5000);
      });
    }).then((data) => {
      console.log("Espera de 4 segundos completada");
      console.log(data);
    }).catch((error) => {
      console.log("Error en la solicitud:", error);
    });
  }