const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="eliminar-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

  //SELECCIONO BOTON RESTAR CANTIDAD(SPAN)
    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }

      //ACTUALIZAMOS EL LOCALSTOREGE
      almacenamientoLocal();

      //ACTUALIZAMOS CARRITO
      pintarCarrito();
    });

  //SELECCIONO BOTON SUMAR CANTIDAD (SPAN)
    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;

      //ACTUALIZAMOS EL LOCALSTOREGE
      almacenamientoLocal();

      //ACTUALIZAMOS CARRITO
      pintarCarrito();
    });

  //ELIMINAR PRODUCTO DEL CARRITO
    let eliminar = carritoContent.querySelector(".eliminar-product");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  //CALCULAR TOTAL
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total} $`;
  modalContainer.append(totalBuying);
};

//VER CARRITO
verCarrito.addEventListener("click", pintarCarrito);

//ELIMINAR PRODUCTO
const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  almacenamientoLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();