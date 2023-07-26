let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const swalOptions = {
  position: 'top-end',
  icon: 'success',
  title: 'La compra se realizó sin ningún problema!',
  text: 'Gracias por tu compra :D.',
  showConfirmButton: false,
  timer: 3000
};

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `<img
      class="carrito-producto-imagen"
      src="${producto.imagen}"
      alt="${producto.titulo}"
      />
      <div class="carrito-producto-titulo">
      <small>Titulo</small>
      <h3>${producto.titulo}</h3>
      </div>
      <div class="carrito-producto-cantidad">
      <small> Cantidad </small>
      <p>${producto.cantidad}</p>
      </div>
      <div class="carrito-producto-precio">
      <small>Precio</small>
      <p>${producto.precio}</p>
      </div>
      <div class="carrito-producto-subtotal">
      <small>Subtotal</small>
      <p>${producto.precio * producto.cantidad}</p>
      </div>
      <button class="carrito-producto-eliminar" id="${producto.id}"> 
      <i class="bi bi-trash"></i>
      </button>`;
      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
  actualizarBotonesEliminar();
  actualizarTotal();
}
cargarProductosCarrito();

actualizarBotonesEliminar();
function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}
function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);
  
  if (index !== -1) {
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  
    Toastify({
      text: "Producto Eliminado -",
      duration: 1500,
      destination: "../pages/carrito.html",
      close: false,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #3b3b3b, #383838fd )",
        borderRadius: "10px",
        textTransform: "uppercase",
        fontSize: "0.85rem",
      },
      offset: {
        x: "2.5rem",
        y: "2.5rem",
      },
      onClick: function () {},
    }).showToast();
  }
}


botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  Swal.fire({
    title: '¿Estas seguro?',
    text: 'Se Van a borrar todos tus productos!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-outline-success ',
      cancelButton: 'btn btn-outline-danger'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      productosEnCarrito.length = 0;
      localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
      cargarProductosCarrito();
      Swal.fire(
        'Se borraron todos tus productos!',
        'Tus productos fueron borrados exitosamente :"(.',
        'success'
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Se Cancelo :) !!!',
        'Tus productos no fueron borrados :D',
        'error'
      );
    }
  });
}


function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = totalCalculado.toFixed(2);
}



function comprarCarrito() {
  Swal.fire(swalOptions).then(() => {
    limpiarCarritoYMostrarProductos();
  });

  document.addEventListener("click", limpiarCarritoYMostrarProductos, { once: true }); 
  setTimeout(limpiarCarritoYMostrarProductos, 3000);
}

function limpiarCarritoYMostrarProductos() {
  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  ocultarMostrarElementosCarrito();
}

function ocultarMostrarElementosCarrito() {
  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}

botonComprar.addEventListener("click", comprarCarrito);



