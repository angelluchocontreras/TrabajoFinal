
let productos = [];
fetch("./js/productos.json")
.then(Response => Response.json())
.then(data => {
	productos = data;
	cargarProductos(productos)
})


  const productosMostrados = productos.slice();
  const contenedorProductos = document.querySelector("#contenedor-producto");
  const botonesCategorias = document.querySelectorAll(".boton-categoria");
  const tituloPrincipal = document.querySelector("#titulo-principal");
  let botonesAgregar = document.querySelectorAll(".producto-agregar");
  const numerito = document.querySelector("#numerito");

  


  function cargarProductos(productosElegidos) {
	contenedorProductos.innerHTML = productosElegidos
	  .map((producto) => `
		<div class="producto">
		  <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
		  <div class="producto-detalles">
			<h3 class="producto-titulo">${producto.titulo}</h3>
			<p class="producto-precio">${producto.precio}</p>
			<button class="producto-agregar" id="${producto.id}">Agregar +</button>
		  </div>
		</div>
	  `)
	  .join("");
  
	actualizarBotonesAgregar();
  }
  
  
  botonesCategorias.forEach((boton) => {
	boton.addEventListener("click", (e) => {
	  botonesCategorias.forEach((boton) => boton.classList.remove("active"));
  
	  e.currentTarget.classList.add("active");
	  if (e.currentTarget.id != "todos") {
		const productoCategoria = productos.find(
		  (producto) => producto.categoria.id === e.currentTarget.id
		);
		tituloPrincipal.innerText = productoCategoria.categoria.nombre;
		const productosBoton = productos.filter(
		  (producto) => producto.categoria.id === e.currentTarget.id
		);
  
		cargarProductos(productosBoton);
	  } else {
		tituloPrincipal.innerHTML = "Todos los productos";
		cargarProductos(productos);
	  }
	  const mensajeError = document.getElementById("mensajeError");
    mensajeError.style.display = "none";
	});
  });
  

  
  const actualizarBotonesAgregar = () => {
	document.querySelectorAll(".producto-agregar").forEach((boton) => boton.addEventListener("click", agregarAlCarrito));
  };
  let productosEnCarrito;
  
  let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
  
  if (productosEnCarritoLS) {
	productosEnCarrito = JSON.parse(productosEnCarritoLS);
	actualizarNumerito();
  } else {
	productosEnCarrito = [];
  }
  
  function agregarAlCarrito(e) {
	const idBoton = e.currentTarget.id;
	const productoAgregado = productos.find((producto) => producto.id === idBoton);
  
	if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
	  productosEnCarrito.find((producto) => producto.id === idBoton).cantidad++;
	} else {
	  productoAgregado.cantidad = 1;
	  productosEnCarrito.push(productoAgregado);
	}
  
	Toastify({
	  text: "Producto agregado +",
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
  
	actualizarNumerito();
	localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  }
  
  
  function actualizarNumerito() {
	const nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	numerito.innerText = nuevoNumerito;
  }
  
  
  const btnBusqueda = document.getElementById("btnBusqueda");
btnBusqueda.addEventListener("click", buscarPorMarca);



function buscarPorMarca() {
	const textoBusqueda = document.getElementById("textoBusqueda").value.trim().toLowerCase();
  
	if (textoBusqueda === "") {
	  tituloPrincipal.innerText = "Todos los productos";
	  cargarProductos(productos);
	  return;
	}
  
	const productosFiltrados = productos.filter((producto) => {
	  const marcaProducto = producto.categoria.marca.toLowerCase();
	  return marcaProducto.includes(textoBusqueda);
	});
  
	if (productosFiltrados.length === 0) {
	  const mensajeError = document.getElementById("mensajeError");
	  mensajeError.style.display = "block";
	  mensajeError.innerText = `No se encontraron productos de la marca "${textoBusqueda}".`;
	} else {
	  const mensajeError = document.getElementById("mensajeError");
	  mensajeError.style.display = "none";
  
	  tituloPrincipal.innerText = `Productos de la marca "${textoBusqueda}":`;
  
	  cargarProductos(productosFiltrados);
	}}

 



  










  