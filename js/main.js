const productos = [
	// Hombres
	{
	  id: "hombre01",
	  titulo: "Nike SB Force 58",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/597344-1000-1000?v=1775237072&width=1000&height=1000&aspect=true",
	  categoria: {
		nombre: "Hombre",
		id: "hombre",
	  },
	  precio: 2999,
	},
	{
	  id: "hombre02",
	  titulo: "NikeCourt Air Zoom",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/628469-1400-1400?v=1775232749&width=1400&height=1400&aspect=true",
	  categoria: {
		nombre: "Hombre",
		id: "hombre",
	  },
	  precio: 2999,
	},
	{
	  id: "hombre03",
	  titulo: "Nike SB Dunk High ",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/498430-1000-1000?v=1775173179&width=1000&height=1000&aspect=true",
	  categoria: {
		nombre: "Hombre",
		id: "hombre",
	  },
	  precio: 2999,
	},
	{
	  id: "hombre04",
	  titulo: "Nike Air Force 1 '07",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/498793-1000-1000?v=1775238334&width=1000&height=1000&aspect=true",
	  categoria: {
		nombre: "Hombre",
		id: "hombre",
	  },
	  precio: 2999,
	},
	// mujeres
	{
	  id: "mujer01",
	  titulo: "Nike Air Force 1 '07 ",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/498793-1400-1400?v=1775237504&width=1400&height=1400&aspect=true",
	  categoria: {
		nombre: "Mujer",
		id: "mujer",
	  },
	  precio: 2999,
	},
	{
	  id: "mujer02",
	  titulo: "Nike Air Force 1 ",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/329180-1000-1000?v=1775146527&width=1000&height=1000&aspect=true",
	  categoria: {
		nombre: "Mujer",
		id: "mujer",
	  },
	  precio: 2999,
	},
	{
	  id: "mujer03",
	  titulo: "Nike Waffle One full ",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/702698-1000-1000?v=1775172219&width=1000&height=1000&aspect=true",
	  categoria: {
		nombre: "Mujer",
		id: "mujer",
	  },
	  precio: 2999,
	},
	{
	  id: "mujer04",
	  titulo: "Nike Air Force",
	  imagen:
		"https://nikearprod.vtexassets.com/arquivos/ids/522651-1000-1000?v=1775214256&width=1000&height=1000&aspect=true",
	  categoria: {
		nombre: "Mujer",
		id: "mujer",
	  },
	  precio: 2999,
	},
  ];
  
  const contenedorProductos = document.querySelector("#contenedor-producto");
  const botonesCategorias = document.querySelectorAll(".boton-categoria");
  const tituloPrincipal = document.querySelector("#titulo-principal");
  let botonesAgregar = document.querySelectorAll(".producto-agregar");
  const numerito = document.querySelector("#numerito");
  
  function cargarProductos(productosElegidos) {
	contenedorProductos.innerHTML = "";
	productosElegidos.forEach((producto) => {
	  const div = document.createElement("div");
	  div.classList.add("producto");
	  div.innerHTML = `<img
	  class="producto-imagen"
	  src="${producto.imagen}
	  alt="${producto.titulo}"
	/>
	<div class="producto-detalles">
	  <h3 class="producto-titulo">${producto.titulo}</h3>
	  <p class="producto-precio">${producto.precio}</p>
	  <button class="producto-agregar"id="${producto.id}">Agregar +</button>
	</div>`;
	  contenedorProductos.append(div);
	});
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
	});
  });
  
  function actualizarBotonesAgregar() {
	botonesAgregar = document.querySelectorAll(".producto-agregar");
	botonesAgregar.forEach((boton) => {
	  boton.addEventListener("click", agregarAlCarrito);
	});
  }
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
	const productoAgregado = productos.find(
	  (producto) => producto.id === idBoton
	);
  
	if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
	  const index = productosEnCarrito.findIndex(
		(producto) => producto.id === idBoton
	  );
	  productosEnCarrito[index].cantidad++;
	} else {
	  productoAgregado.cantidad = 1;
	  productosEnCarrito.push(productoAgregado);
	}
  
	actualizarNumerito();
	localStorage.setItem(
	  "productos-en-carrito",
	  JSON.stringify(productosEnCarrito)
	);
  }
  
  function actualizarNumerito() {
	let nuevoNumerito = productosEnCarrito.reduce(
	  (acc, producto) => acc + producto.cantidad,
	  0
	);
	numerito.innerText = nuevoNumerito;
  }
  