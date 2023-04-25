function cargarMarcas() {
    const marcaSelect = document.getElementById("marca");
    const modeloSelect = document.getElementById("modelo");
    const anioSelect = document.getElementById("anio");

    fetch("./data.csv")
    .then(response => response.text()) 
    .then(text => {
        const data = text.trim().split("\n").slice(1).map(line => line.split(",")); 

        // Agregar marcas al select
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
            
            const modelos = [...new Set(data.filter(line => line[0] === marcaSelect.value).map(line => line[1]))]; // Obtener modelos sin repetir
            modelos.forEach(modelo => {
              const option = document.createElement("option");
              option.value = modelo;
              option.textContent = modelo;
              modeloSelect.appendChild(option);
            });
          });

        // Agregar años al select
        modeloSelect.addEventListener("change", () => {
        anioSelect.innerHTML = "<option value=''>-- Seleccione un año --</option>"; // Limpiar select
  
        const anios = [...new Set(data.filter(line => line[0] === marcaSelect.value && line[1] === modeloSelect.value).map(line => line[2]))]; // Obtener años sin repetir
        anios.forEach(anio => {
          const option = document.createElement("option");
          option.value = anio;
          option.textContent = anio;
          anioSelect.appendChild(option);
        });
        });

        const submitBtn = document.getElementById("cotiza");
        submitBtn.addEventListener("click", function(event) {
        // código que se ejecuta al hacer click en el botón
        event.preventDefault();
        reportPrices(data);
        });
    })
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