class Seguro {
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

  sendToLocalStorage() {
    const seguroJson = this.toJson();
    const existingData = localStorage.getItem("seguros");

    if (existingData) {
      const combinedData = `${existingData},${seguroJson}`;
      localStorage.setItem("seguros", combinedData);
    } else {
      localStorage.setItem("seguros", seguroJson);
    }
  }

  static fromJson(json) {
    const { marca, modelo, anio, aseguradora, cobertura, precio } = JSON.parse(json);
    return new Seguro(marca, modelo, anio, aseguradora, cobertura, precio);
  }

  static fromLocalStorage(key) {
    const seguroJson = localStorage.getItem(key);

    if (!seguroJson) {
      return []; // Evita error si no hay datos
    }

    const seguroArray = seguroJson.split(",");
    const seguros = seguroArray.map((json) => Seguro.fromJson(json));

    return seguros;
  }
}

export default Seguro;