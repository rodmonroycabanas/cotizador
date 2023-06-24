import Seguro from './seguro.js';


let seguros = [];

//Buscar

const botonCotizar = document.getElementById('btn-cotiza');

botonCotizar.addEventListener('click', function(e) {
  // Código a ejecutar cuando se haga clic en el botón "Cotizar!"
  e.preventDefault();
  alert('Botón Cotizar! fue clickeado');
});

function reportPrices() {    
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

    imprimirData();

    document.getElementById("marca").value = marcaValue ;
    document.getElementById("modelo").value = modeloValue ;
    document.getElementById("anio").value = anioValue ;

}

function imprimirData() {
    console.log(catalogo);
  }

//resultados
function renderizarPrecio(seguro) {

    var htmlText =  '<input class="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios1" value="">\n' +
                    '  <label class="list-group-item rounded-3 py-3" for="listGroupCheckableRadios1">\n' +
                    '    <!-- Aseguradora Precio-->\n' +
                    '    ' + seguro.aseguradora + ' - ' + seguro.precio +
                    '    <!-- cobertura-->\n' +
                    '    <span class="d-block small opacity-50">' + seguro.cobertura + '</span>\n' +
                    '  </label>';
    return htmlText;
  }

function renderizarResultados(){
    let div = document.getElementById('contResultados');
    let htmInner =  '   <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center"> \n' +
                    '       <div class="list-group list-group-checkable d-grid gap-2 border-0" id="lista-resultados"> \n' ;
    array.forEach(element => {
        
    });
                    '       </div> \n' +
                    '  </div>\n';
}

function pruebaPOST(data){
    data.forEach(element => {
      //console.log(element);
      const newItem = new Seguro (element[0],element[1],parseInt(element[2]),  element[3], element[4],parseInt(element[5]));
      //console.log(newItem);
      //crearPrecioAsync(newItem);
      //RUN ONCE to load dumydata
      crearPrecioSync(newItem);
    });
  }