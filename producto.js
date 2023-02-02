let productos = [
  {
    id: 01,
    nombre: "LAGER",
    precio: 400,
    descripcion:
      "Es una cerveza de baja fermentación. Presenta un sabor limpio y altos niveles de carbonatación. Es la más común de todas las cervezas.",
    imagen: "./assets/lager.png",
  },
  {
    id: 02,
    nombre: "IPA",
    precio: 500,
    descripcion:
      "Cerveza caracterizada por tener una alta graduación alcohólica y un amargor intenso debido a que tiene una mayor cantidad de lúpulo.",
    imagen: "./assets/ipa.png",
  },
  {
    id: 03,
    nombre: "STOUT",
    precio: 450,
    descripcion:
      "Se caracteriza por tener una alta fermentación. Es elaborada con malta de cebada tostada. Se puede notar un sabor a chocolate negro y café.",
    imagen: "./assets/stout.png",
  },
  {
    id: 04,
    nombre: "AMBER-LAGER",
    precio: 500,
    descripcion:
      "Cerveza con caracter maltoso, de bajo amargor, con notas a caramelo que no llegan a ser invasivos por lo que no empalaga.",
    imagen: "./assets/amberLager.png",
  },
];

let contenedorProductos = document.getElementById("contenedorProductos");

renderizarProductos(productos);
function renderizarProductos(arrayProductos) {
  contenedorProductos.innerHTML = "";
  arrayProductos.forEach((producto) => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("producto");
    tarjetaProducto.id = `producto${producto.id}`;
    tarjetaProducto.innerHTML = `<h2>${producto.nombre}</h3>
    <img src=${producto.imagen}>
    <p>${producto.descripcion}</p>
    <h4>$${producto.precio}</h4>
    <div><button id=${producto.id}>Agregar al carrito</button>
    `;
    contenedorProductos.append(tarjetaProducto);
    let boton = document.getElementById(producto.id);
    boton.onclick = agregarAlCarrito;
  });
}
function agregarAlCarrito(bebida) {
  Swal.fire({
    icon: "question",
    background: "rgba(24, 24, 24)",
    color: "white",
    title: "Desea agregar este producto al carrito?",
    showDenyButton: true,
    confirmButtonText: "Agregar",
    denyButtonText: `No agregar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Producto agregado",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "green",
        },
      }).showToast();

      let id = bebida.target.id;
      let bebidaBuscada = productos.find((bebida) => bebida.id == id);
      let bebidaEnCarrito = carrito.find(
        (bebida) => bebida.id == bebidaBuscada.id
      );
      if (bebidaEnCarrito) {
        let posicionBebida = carrito.findIndex(
          (bebida) => bebida == bebidaEnCarrito
        );
        carrito[posicionBebida].unidades++;
        carrito[posicionBebida].subtotal =
          carrito[posicionBebida].precio * carrito[posicionBebida].unidades;
      } else {
        bebidaBuscada.unidades = 1;
        bebidaBuscada.subtotal = bebidaBuscada.precio;
        carrito.push(bebidaBuscada);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito(carrito);
    } else if (result.isDenied) {
      Toastify({
        text: "Producto no agregado",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: " rgb(214, 18, 18)",
        },
      }).showToast();
    }
  });
}
