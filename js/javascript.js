//import { Precio } from './precio.js';

document.addEventListener("DOMContentLoaded", function() {
  
  cargarMarcas();
  document.getElementById("btn-guardar-precio").addEventListener("click", function(event) {
    event.preventDefault();
    guardarNuevoPrecio();
  });
  
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
    const autoPrecioCheck = document.getElementById("auto-precio");
    autoPrecioCheck.addEventListener("change", function() {
    mostrarCamposIncrementos();
  });
  }

  fetch(datafile)
    .then(response => response.text())
    .then(text => {
      const data = text.trim().split("\n").slice(1).map(line => line.split(","));

      cargarMarcasSelect(data);
      //cargarModelosSelect(data,"index");
      //cargarAniosSelect(data,"index");
    });
}

function cargarMarcasSelect(data) {
  const marcaSelect = document.getElementById("marca");
  const marcas = [...new Set(data.map(line => line[0]))];
  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    marcaSelect.appendChild(option);
  });
  marcaSelect.addEventListener("change", () => {
    const modeloSelect = document.getElementById("modelo");
    const anioSelect = document.getElementById("anio");
    modeloSelect.innerHTML = "<option value=''>-- Seleccione un modelo --</option>"; // Limpiar select
    anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select

    cargarModelosSelect(data);    
  });    
}

function cargarModelosSelect(data) {
  const marcaSelect = document.getElementById("marca");
  const modeloSelect = document.getElementById("modelo");
  
  const modelos = [...new Set(data.filter(line => line[0] === marcaSelect.value).map(line => line[1]))]; // Obtener modelos sin repetir
            modelos.forEach(modelo => {
              const option = document.createElement("option");
              option.value = modelo;
              option.textContent = modelo;
              modeloSelect.appendChild(option);
            });
  modeloSelect.addEventListener("change", () => {
    const anioSelect = document.getElementById("anio");
    anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select    
    cargarAniosSelect(data) 
  });
}

function cargarAniosSelect(data) {
  
  const marcaSelect = document.getElementById("marca");
  const modeloSelect = document.getElementById("modelo");
  const anioSelect = document.getElementById("anio");
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
      const aseguradoraSelect = document.getElementById("aseguradora");
      aseguradoraSelect.innerHTML = "<option value=''>-- Seleccione una aseguradora --</option>"; // Limpiar select    
      cargarAseguradoraSelect(data) 
    });
  }
}

function cargarAseguradoraSelect(data) {
  
  const marcaSelect = document.getElementById("marca");
  const modeloSelect = document.getElementById("modelo");
  const anioSelect = document.getElementById("anio");
  const aseguradoraSelect = document.getElementById("aseguradora");

  const aseguradoras = [...new Set(data.filter(line => line[0] === marcaSelect.value && line[1] === modeloSelect.value && line[2] === anioSelect.value).map(line => line[3]))];
  aseguradoras.forEach(aseguradora => {
    const option = document.createElement("option");
    option.value = aseguradora;
    option.textContent = aseguradora;
    aseguradoraSelect.appendChild(option);
  });
}



function reportPrices(data) {
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const anioSelect = document.getElementById("anio");
    
    
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
  const autoPrecioCheck = document.getElementById("auto-precio");
  const hiddendiv1 = document.getElementById("hdiv1");
  const hiddendiv2 = document.getElementById("hdiv2");
  const hiddendiv3 = document.getElementById("hdiv3");
  const hiddendiv4 = document.getElementById("hdiv4");

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



function guardarNuevoPrecio(){
  
  // Obtener los valores del formulario
  
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anio = document.getElementById('anio').value;
  const aseguradora = document.getElementById('aseguradora').value;
  const precio = document.getElementById('precio').value;
  const autoPrecio = document.getElementById('auto-precio').value;
  const anInicio = document.getElementById('anInicio');
  const anFin = document.getElementById('anFin');
  const anioDesde = document.getElementById('anioDesde').valueAsNumber;
  const anioHasta = document.getElementById('anioHasta').valueAsNumber;
  const xcent = document.getElementById('xcent').valueAsNumber;
  
  const nuevosPrecios=[];

  // Crear objeto 
//  const nuevoPrecio = new Precio(marca, modelo, anio, aseguradora, cobertura, precio);
//  console.log(nuevoPrecio);

  let contador = 1;
  let periodo =1

  if (autoPrecio === true){
    periodo= anioHasta - anioDesde;

    if (anFin.value==="on"){
      contador = -1;
      anio = anioHasta;
    }
    else{
      anio = anioDesde;
    }
    
  }
 

  for (let i = 1; i > periodo; i++) {
    if(xcent != 0){
      precio = precio + (precio * (xcent / 100));
    }
    const nuevoPrecio = new Precio(
      marca,
      modelo,
      anio,
      aseguradora,
      "amplia",
      precio
    );
  
    nuevosPrecios.push(nuevoPrecio);
  }
  
  console.log(nuevosPrecios);


}

class Precio {
  constructor(marca, modelo, anio, aseguradora, cobertura, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.aseguradora = aseguradora;
    this.cobertura = cobertura;
    this.precio = precio;
  }
  toJson() {
      return JSON.stringify(this);
  }
  toCsv() {
      return `${this.marca},${this.modelo},${this.anio},"${this.aseguradora}","${this.cobertura}",${this.precio}`;
    }
}
