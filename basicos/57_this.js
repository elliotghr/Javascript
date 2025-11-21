console.log(this);

// Dentro de un objeto
const obj = {
  nombre: "Objeto",
  mostrarThis: function () {
    console.log(this.nombre);
  },
};

obj.mostrarThis();

// Dentro de una función
function mostrarThisGlobal(nombre) {
  this.nombre = nombre;
  console.log(this.nombre);
}
mostrarThisGlobal("Función Global");

// Usando 'this' en un constructor
function Persona(nombre) {
  this.nombre = nombre;
  this.saludar = function () {
    console.log("Hola, mi nombre es " + this.nombre);
  };
}
const persona1 = new Persona("Alice");
persona1.saludar();

// Usando 'arrow functions'
nombre = "Elliot";
this.nombre = nombre;

const objArrow = {
  nombre: "Objeto Arrow",
  mostrarThis: () => console.log(this.nombre),
};

const res = objArrow.mostrarThis(); // 'this' no se refiere a 'objArrow'

