import Seguro from "./seguro";

//import { Precio } from './precio.js';
const anioDesdeSelect = document.getElementById("anioDesde");
const anioHastaSelect = document.getElementById("anioHasta");
const modeloSelect = document.getElementById("modelo");
const anioSelect = document.getElementById("anio");
const autoPrecioCheck = document.getElementById("auto-precio");
const marcaSelect = document.getElementById("marca");
const aseguradoraSelect = document.getElementById("aseguradora");


const hiddendiv1 = document.getElementById("hdiv1");
const hiddendiv2 = document.getElementById("hdiv2");
const hiddendiv3 = document.getElementById("hdiv3");
const hiddendiv4 = document.getElementById("hdiv4");

const urlCatalogo ="https://64925933428c3d2035d00b1b.mockapi.io/seguros/catalogo";

anioHastaSelect.addEventListener ("change",() =>{
  if (parseInt(anioHastaSelect.value) < parseInt(anioDesdeSelect.value) ) {
    alert("El año hasta no puede ser menor que el año desde");
  }
});

//LLenar drop box al cargar el DOM
document.addEventListener("DOMContentLoaded", function() {
  cargarMarcas();
});



function cargarMarcas() {
  var nombrePagina  = document.URL.split('/').pop();
  var datafile ="";
  //console.log(nombrePagina);
  if(nombrePagina.includes( "index.html")){
    datafile = "./data.csv";
  }
  else if (nombrePagina.includes("agregar.html")){
    datafile = "../data.csv"
    
    autoPrecioCheck.addEventListener("change", function() {
    mostrarCamposIncrementos();
  });
  }

  fetch(datafile)
    .then(response => response.text())
    .then(text => {
      const data = text.trim().split("\n").slice(1).map(line => line.split(","));
      cargarMarcasSelect(data);
      //console.log(data);
      pruebaPOST(data);
    });
}

function pruebaPOST(data){
  data.forEach(element => {
    console.log(element);
    //const newItem = new Seguro (element[0],element[1],element[2],  element[3], element[4],element[5]);
    console.log(newItem);
    //crearPrecioAsync(newItem);
  });
}

async function crearPrecioAsync(precio){
  const resp = await fetch(urlCatalogo,{
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data1 = await resp.json();
  console.log(data1);
}

function cargarMarcasSelect(data) {
  
  const marcas = [...new Set(data.map(line => line[0]))];
  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    marcaSelect.appendChild(option);
  });
  marcaSelect.addEventListener("change", () => {
    modeloSelect.innerHTML = "<option value=''>-- Seleccione un modelo --</option>"; // Limpiar select
    anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select

    cargarModelosSelect(data);    
  });    
}

function cargarModelosSelect(data) {
  
  const modelos = [...new Set(data.filter(line => line[0] === marcaSelect.value).map(line => line[1]))]; // Obtener modelos sin repetir
            modelos.forEach(modelo => {
              const option = document.createElement("option");
              option.value = modelo;
              option.textContent = modelo;
              modeloSelect.appendChild(option);
            });
  modeloSelect.addEventListener("change", () => {
    
    anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select    
    cargarAniosSelect(data) 
  });
}

function cargarAniosSelect(data) {
  
  var nombrePagina  = document.URL.split('/').pop();

  const anios = [...new Set(data.filter(line => line[0] === marcaSelect.value && line[1] === modeloSelect.value).map(line => line[2]))]; // Obtener años sin repetir
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
      cargarAseguradoraSelect(data) 
    });
  }
}

function cargarAseguradoraSelect(data) {
  

  const aseguradoras = [...new Set(data.filter(line => line[0] === marcaSelect.value && line[1] === modeloSelect.value && line[2] === anioSelect.value).map(line => line[3]))];
  aseguradoras.forEach(aseguradora => {
    const option = document.createElement("option");
    option.value = aseguradora;
    option.textContent = aseguradora;
    aseguradoraSelect.appendChild(option);
  });
}



function reportPrices(data) {    
    
    const marcaValue = marcaSelect.value.trim();
    const modeloValue = modeloSelect.value.trim();
    const anioValue = anioSelect.value.trim();

    if (marcaValue === "" || marcaValue === "-- Seleccione una marca --") {
    // Si el valor es vacío o "default", se ejecuta este bloque de código
    console.log("Por favor seleccione una marca");
    } else {
    // Si el valor no es vacío ni "default", se ejecuta este bloque de código
    console.log(`La marca seleccionada es ${marcaValue}`);
    }

    imprimirData(data);

    document.getElementById("marca").value = marcaValue ;
    document.getElementById("modelo").value = modeloValue ;
    document.getElementById("anio").value = anioValue ;

}

function imprimirData(data) {
    console.log(data);
  }

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




