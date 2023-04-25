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

    })
}

document.getElementById("cotiza").addEventListener("click", function() {
    // Lee los valores seleccionados de los select de marca, modelo y año
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const anio = document.getElementById("anio").value;
  
    // Busca la información correspondiente en el objeto "data"
    const info = data[marca + modelo + anio];
    fetch("./data.csv")
    .then(response => response.text()) 
    .then(text => {
        const data = text.trim().split("\n").slice(1).map(line => line.split(",")); 
        
        console.log(data);
    })
  
  });

