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
  