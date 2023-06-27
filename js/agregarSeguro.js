

import Seguro from './seguro.js';


const urlCatalogo ="https://64925933428c3d2035d00b1b.mockapi.io/seguros/catalogo";
  
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


let datos = [];
let seguros = [];

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
    //alert
    Swal.fire({
        title: 'Seguro que quieres agregar este producto?',
        text: 'Marca: ' + nuevoSeguro.marca + '\nModelo: ' + nuevoSeguro.modelo + '\nAño: ' + nuevoSeguro.anio + '\nPrecio: ' + nuevoSeguro.precio,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Agregar'
      }).then((result) => {
        if (result.isConfirmed) {
            seguros.push(nuevoSeguro);
            nuevoSeguro.sendToLocalStorage();
            crearPrecioSync(nuevoSeguro)
            Swal.fire(
            'Precio agregado!',
            'Se ha guardado un nuevo precio',
            'success'
          )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'No hemos guardad el registro',
              'error'
            )
          }
      })
    
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

//document.addEventListener("DOMContentLoaded", async function() {
//  try {
//      datos = await leerCSV();
//      
//      if (datos.length > 0) {
//          console.log(datos.length);
//          console.log('Inicio POST');
//        //pruebaPOST();
//      }
//    } catch (error) {
//      console.error( error);
//    }
//  });
   


// Función para leer el archivo CSV
async function  leerCSV () {
  try {
    const respuesta = await fetch("../Data.csv");
    const texto = await respuesta.text();
    const filas = texto.split('\n');
    const datosTemp = [];
    
    filas.forEach((fila) => {
      const columnas = fila.split(',');
      datosTemp.push(columnas);
    });
    
    console.log(datosTemp);
    return datosTemp;
  } catch (error) {
    console.error('Error al leer el archivo CSV:', error);
  }
};

//Prueba para cargar datos a mockapi
function pruebaPOST(){
    datos.forEach(element => {
      //console.log(element);
      const newItem = new Seguro (element[0],element[1],parseInt(element[2]),  element[3], element[4],parseInt(element[5]));
      //console.log(newItem);
      //crearPrecioAsync(newItem);
      //RUN ONCE to load dumydata
      crearPrecioSync(newItem);
    });
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
    }).then((datos) => {
      // Esperar 5 segundos- Mockapi me rechaza
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(datos);
        }, 5000);
      });
    }).then((datos) => {
      console.log("Espera de 5 segundos completada");
      console.log(datos);
    }).catch((error) => {
      console.log("Error en la solicitud:", error);
    });
  }