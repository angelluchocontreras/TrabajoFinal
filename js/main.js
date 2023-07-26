const tiendaProductos = {
	productos: [],
	contenedorProductos: document.querySelector("#contenedor-producto"),
	botonesCategorias: document.querySelectorAll(".boton-categoria"),
	tituloPrincipal: document.querySelector("#titulo-principal"),
	botonesAgregar: document.querySelectorAll(".producto-agregar"),
	numerito: document.querySelector("#numerito"),
	productosEnCarrito: [], 
  
	cargarProductos: function (productosElegidos) {
	  this.contenedorProductos.innerHTML = productosElegidos
		.map(
		  (producto) => `
		  <div class="producto">
			<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
			<div class="producto-detalles">
			  <h3 class="producto-titulo">${producto.titulo}</h3>
			  <p class="producto-precio">${producto.precio}</p>
			  <button class="producto-agregar" id="${producto.id}">Agregar +</button>
			</div>
		  </div>
		`
		)
		.join("");
  
	  this.actualizarBotonesAgregar();
	},
  
	actualizarBotonesAgregar: function () {
	  this.botonesAgregar = document.querySelectorAll(".producto-agregar");
	  this.botonesAgregar.forEach((boton) => {
		boton.addEventListener("click", this.agregarAlCarrito.bind(this));
	  });
	},
  
	agregarAlCarrito: function (e) {
	  const idBoton = e.currentTarget.id;
	  const productoAgregado = this.productos.find((producto) => producto.id === idBoton);
  
	  if (this.productosEnCarrito.some((producto) => producto.id === idBoton)) {
		this.productosEnCarrito.find((producto) => producto.id === idBoton).cantidad++;
	  } else {
		productoAgregado.cantidad = 1;
		this.productosEnCarrito.push(productoAgregado);
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
  
	  this.actualizarNumerito();
	  localStorage.setItem("productos-en-carrito", JSON.stringify(this.productosEnCarrito));
	},
  
	actualizarNumerito: function () {
	  const nuevoNumerito = this.productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	  this.numerito.innerText = nuevoNumerito;
	},
  
	obtenerProductosEnCarrito: function () {
	  const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
	  if (productosEnCarritoLS) {
		this.productosEnCarrito = JSON.parse(productosEnCarritoLS);
		this.actualizarNumerito();
	  }
	},
  
	guardarProductosEnCarrito: function () {
	  localStorage.setItem("productos-en-carrito", JSON.stringify(this.productosEnCarrito));
	},
  };
  
 
  fetch("./js/productos.json")
	.then((Response) => Response.json())
	.then((data) => {
	  tiendaProductos.productos = data;
	  tiendaProductos.cargarProductos(tiendaProductos.productos);
	});
  

  tiendaProductos.botonesCategorias.forEach((boton) => {
	boton.addEventListener("click", (e) => {
	  tiendaProductos.botonesCategorias.forEach((boton) => boton.classList.remove("active"));
	  e.currentTarget.classList.add("active");
	  if (e.currentTarget.id != "todos") {
		const productoCategoria = tiendaProductos.productos.find((producto) => producto.categoria.id === e.currentTarget.id);
		tiendaProductos.tituloPrincipal.innerText = productoCategoria.categoria.nombre;
		const productosBoton = tiendaProductos.productos.filter((producto) => producto.categoria.id === e.currentTarget.id);
		tiendaProductos.cargarProductos(productosBoton);
	  } else {
		tiendaProductos.tituloPrincipal.innerHTML = "Todos los productos";
		tiendaProductos.cargarProductos(tiendaProductos.productos);
	  }
	  const mensajeError = document.getElementById("mensajeError");
	  mensajeError.style.display = "none";
	});
  });
  
 
  tiendaProductos.obtenerProductosEnCarrito();
  tiendaProductos.actualizarNumerito();
  
  
  

  
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
	  tiendaProductos.tituloPrincipal.innerText = "Todos los productos"; 
	  tiendaProductos.cargarProductos(tiendaProductos.productos);
	  return;
	}
  
	const productosFiltrados = tiendaProductos.productos.filter((producto) => {
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
  
	  tiendaProductos.tituloPrincipal.innerText = `Productos de la marca "${textoBusqueda}":`; 
  
	  tiendaProductos.cargarProductos(productosFiltrados);
	}
  }
  
  


  










  