const shopContent = document.getElementById("contProducto");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("contenedor-carrito");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const respuesta = await fetch("../json/productos.json");
  const productos = await respuesta.json();

  productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "tarjeta_prod";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="precio_prod">${product.precio} $</p>
    `;
  
    contProducto.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "btn_comprar";
  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
  
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        almacenamientoLocal();
      }
    });
  });
}
getProducts();


//alamcenar INFORMACION CON LOCALSTORAGE
const almacenamientoLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};