import Seguro from './seguro.js';
import Catalogo from "./filtrosCatalogo.js";
//Buscar

const botonCotizar = document.getElementById('btn-cotiza');
const anioSelect = document.getElementById("anio");
const marcaSelect = document.getElementById("marca");
const modeloSelect = document.getElementById("modelo");


let marcaValue = marcaSelect.value.trim();
let modeloValue = modeloSelect.value.trim();
let anioValue = anioSelect.value.trim();


let resultados = [];


botonCotizar.addEventListener('click', function(e) {
  // Código a ejecutar cuando se haga clic en el botón "Cotizar!"
  e.preventDefault();
  //alert('Botón Cotizar! fue clickeado');
  reportPrices();
  
});

function reportPrices() {    
     marcaValue = marcaSelect.value.trim();
     modeloValue = modeloSelect.value.trim();
     anioValue = anioSelect.value.trim();

    if ( marcaValue === "" || modeloValue === "" || anioValue === "" ) {
    // Si el valor es vacío o "default", se ejecuta este bloque de código
    alert("Por favor seleccione una marca");
    } 
    //else {
    // Si el valor no es vacío ni "default", se ejecuta este bloque de código
    //alert('La marca seleccionada es ' + marcaValue + ' ' + modeloValue + ' ' + anioValue);
    //}
    //console.log('imprimir catalogo');
    //console.log(Catalogo);
  
    //imprimirData();
    mostrarResultados();

    const botonComprar = document.getElementById("btn-comprar"); 

    botonComprar.addEventListener('click', function(e) {
        e.preventDefault();
        transaccionCompra();
      });
}


function transaccionCompra(){
    const checkboxes = document.querySelectorAll('input[type="radio"]');
    let compra = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            //const valor = checkbox.value;
            compra = resultados.filter(res => res.id === checkbox.value)[0];
            //alert('felicidades' + compra)
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Gracias por tu compra',
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
}

//resultados
function mostrarResultados(){
    filtrarResultados();
    renderizarResultados();
}

function filtrarResultados(){
    resultados = [];
    resultados = Catalogo.filter(line => line.marca === marcaValue && line.modelo === modeloValue && line.anio === parseInt(anioValue))
    console.log(resultados);
    
    resultados.forEach(res => {
        console.log(  'año:' + res.anio +
            ' aseguradora: ' + res.aseguradora +
            ' cobertura: ' + res.cobertura +
            ' marca: ' + res.marca +
            ' modelo: ' + res.modelo +
            ' precio: ' + res.precio);
    });
    
}



function renderizarPrecio(seguro,id) {

    var htmlText =  '<input class="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios' + id +  '" value="' + id +'">\n' +
                    '  <label class="list-group-item rounded-3 py-3" for="listGroupCheckableRadios' + id +  '" >\n' +
                    '    <!-- Aseguradora Precio-->\n' +
                    '    ' + seguro.aseguradora + ' - ' + seguro.precio +
                    '    <!-- cobertura-->\n' +
                    '    <span class="d-block small opacity-50">' + seguro.cobertura + '</span>\n' +
                    '  </label>';
    return htmlText;
  }

function renderizarResultados(){
    let divRes = document.getElementById('contResultados');
    let htmlInner =  '   <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center"> \n' +
                    '       <div class="list-group list-group-checkable d-grid gap-2 border-0" id="lista-resultados"> \n' ;
    resultados.forEach(res => {
        htmlInner = htmlInner + ' ' + renderizarPrecio(res,res.id)
    });
    htmlInner = htmlInner + '       </div> \n' +
                            '  </div>\n \n' +
                            '<button  id="btn-comprar" class="btn btn-warning btn-lg btn-block" type="submit">Comprar</button> ';
    divRes.innerHTML = htmlInner;
}

