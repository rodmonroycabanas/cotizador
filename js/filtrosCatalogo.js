import Seguro from "./seguro.js";

let catalogo  = [];

//import { Precio } from './precio.js';
const anioDesdeSelect = document.getElementById("anioDesde");
const anioHastaSelect = document.getElementById("anioHasta");
const modeloSelect = document.getElementById("modelo");
const anioSelect = document.getElementById("anio");
const autoPrecioCheck = document.getElementById("auto-precio");
const marcaSelect = document.getElementById("marca");
const aseguradoraSelect = document.getElementById("aseguradora");



const urlCatalogo ="https://64925933428c3d2035d00b1b.mockapi.io/seguros/catalogo";



//LLenar drop box al cargar el DOM
 document.addEventListener("DOMContentLoaded", function() {
    cargarMarcas();
  });
   


function cargarMarcas() {
    var nombrePagina  = document.URL.split('/').pop();
    //var datafile ="";
    //console.log(nombrePagina);
    //if(nombrePagina.includes( "index.html")){
    //    datafile = "./data.csv";
    //  }
    //else 
    if (nombrePagina.includes("agregar.html")){
      //datafile = "../data.csv"
        const hiddendiv1 = document.getElementById("hdiv1");
        const hiddendiv2 = document.getElementById("hdiv2");
        const hiddendiv3 = document.getElementById("hdiv3");
        const hiddendiv4 = document.getElementById("hdiv4");
      autoPrecioCheck.addEventListener("change", function() {
      mostrarCamposIncrementos();
    });
    }
  
   //  fetch(datafile) ... 
    getCatalogo().then(() => {
      console.log("Catálogo listo");
      console.log(catalogo);
      cargarMarcasSelect();
    }).catch(error => {
      console.log("Error al obtener el catálogo:", error);
    });
     
  }

function getCatalogo() {
    return new Promise((resolve, reject) => {
      fetch(urlCatalogo)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            catalogo.push(item);
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  
function cargarMarcasSelect() {
  
    const marcas = [...new Set(catalogo.map(line => line.marca))];
    marcas.forEach(marca => {
      const option = document.createElement("option");
      option.value = marca;
      option.textContent = marca;
      marcaSelect.appendChild(option);
    });
    marcaSelect.addEventListener("change", () => {
      modeloSelect.innerHTML = "<option value=''>-- Seleccione un modelo --</option>"; // Limpiar select
      anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select
  
      cargarModelosSelect();    
    });    
  }
  
function cargarModelosSelect() {
    
    const modelos = [...new Set(catalogo.filter(line => line.marca  === marcaSelect.value).map(line => line.modelo))]; // Obtener modelos sin repetir
              modelos.forEach(modelo => {
                const option = document.createElement("option");
                option.value = modelo;
                option.textContent = modelo;
                modeloSelect.appendChild(option);
              });
    modeloSelect.addEventListener("change", () => {
      
      anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select    
      cargarAniosSelect() 
    });
  }
  
function cargarAniosSelect() {
    
    var nombrePagina  = document.URL.split('/').pop();
  
    const anios = [...new Set(catalogo.filter(line => line.marca === marcaSelect.value && line.modelo === modeloSelect.value).map(line => line.anio))]; // Obtener años sin repetir
    anios.forEach(anio => {
      const option = document.createElement("option");
      option.value = anio;
      option.textContent = anio;
      anioSelect.appendChild(option);
    });
    
    
    
    if (nombrePagina.includes("agregar.html")){
      //Si es para agregar nuevo
      anioSelect.addEventListener("change", () => {
        aseguradoraSelect.innerHTML = "<option value=''>-- Seleccione una aseguradora --</option>"; // Limpiar select    
        cargarAseguradoraSelect() 
      });
    }
  }
  
function cargarAseguradoraSelect() {
    const aseguradoras = [...new Set(catalogo.filter(line => line.marca === marcaSelect.value && line.modelo === modeloSelect.value && line.anio === parseInt(anioSelect.value)).map(line => line.aseguradora))];
    aseguradoras.forEach(aseguradora => {
      const option = document.createElement("option");
      option.value = aseguradora;
      option.textContent = aseguradora;
      aseguradoraSelect.appendChild(option);
    });
  }

// Validaciones
anioHastaSelect.addEventListener ("change",() =>{
    if (parseInt(anioHastaSelect.value) < parseInt(anioDesdeSelect.value) ) {
      alert("El año hasta no puede ser menor que el año desde");
    }
  });

function mostrarCamposIncrementos() {
    //const hiddenGroup = document.getElementsByClassName("hidden-group");
  
    if (autoPrecioCheck.checked) {
      hiddendiv1.classList.remove("hidden");
      hiddendiv2.classList.remove("hidden");
      hiddendiv3.classList.remove("hidden");
      hiddendiv4.classList.remove("hidden");
    } else {
      hiddendiv1.classList.add("hidden");
      hiddendiv2.classList.add("hidden");
      hiddendiv3.classList.add("hidden");
      hiddendiv4.classList.add("hidden");
      
    }
  }
  