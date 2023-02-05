let contenedorCarrito = document.getElementById("carrito-contenedor");
let contenedorPrecioTotal = document.getElementById("precioTotal");

let carrito = [];
if (localStorage.getItem("carrito")) {
  let carritoJSON = localStorage.getItem("carrito");
  carrito = JSON.parse(carritoJSON);
}

renderizarCarrito(carrito);

function renderizarCarrito(bebidaEnCarrito) {
  contenedorCarrito.innerText = "";
  bebidaEnCarrito.forEach((bebida) => {
    let tarjetaBebida = document.createElement("div");
    tarjetaBebida.classList.add("itemCarrito");
    tarjetaBebida.innerHTML += `<p>${bebida.nombre}</p> <p>Cantidad: ${bebida.unidades}</p><p>$${bebida.subtotal}</p> 
    <div class="botones-carrito"><button onclick="sumarAlCarrito(${bebida.id})" class="boton-sumar"><img src="./assets/plus.png" alt="eliminar"></button>
    <button onclick="restarAlCarrito(${bebida.id})" class="boton-restar"><img src="./assets/menos.png" alt="eliminar"></button>
    <button onclick="eliminarDelCarrito(${bebida.id})" class="boton-eliminar"><img src="./assets/borrar.png" alt="eliminar"></button></div>`;
    contenedorCarrito.appendChild(tarjetaBebida);
    totalCarrito(carrito);
  });
}
/* Funcion para validar DNI */

function validarDni(dni) {
  let validacionDni = /^\d{8}(?:[-\s]\{4})?$/;
  return validacionDni.test(dni) ? true : false;
}
/* OPERACIONES CON EL CARRITO */

let botonComprar = document.getElementById("comprar-carrito");
botonComprar.addEventListener("click", () => {
  if (carrito.length > 0) {
    let dni;
    Swal.fire({
      title: "Ingresá tu dni",
      input: "text",
      background: "rgba(24, 24, 24)",
      color: "white",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (dni) => {
        if (!dni) {
          return "Por favor escribe tu dni";
        } else if (!validarDni(dni)) {
          return "Por favor escribe bien tu dni";
        } else {
          return undefined;
        }
      },
    }).then((resultado) => {
      if (resultado.value) {
        let total = calcularTotal(carrito);
        localStorage.removeItem("carrito");
        carrito = [];
        totalCarrito(carrito);
        renderizarCarrito(carrito);
        dni = resultado.value;
        Swal.fire({
          title: `DNI: ${dni} - Pedido confirmado: Total $${total}. Puedes retirarlo en el local.`,
          background: "rgb(24, 24, 24)",
          color: "white",
          timerProgressBar: true,
        }).showToast();
      }
    });
  } else {
    Swal.fire({
      toast: "true",
      title: "No hay un pedido para comprar",
      background: "rgba(24, 24, 24)",
      color: "white",
    }).showToast();
  }
});

let eliminarDelCarrito = (idBebida) => {
  let item = carrito.find((bebida) => bebida.id === idBebida);
  let indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  totalCarrito(carrito);
  renderizarCarrito(carrito);
  Toastify({
    text: "Producto eliminado",
    duration: 1300,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "rgb(214, 18, 18)",
    },
  }).showToast();
};

let sumarAlCarrito = (idBebida) => {
  let bebida = carrito.find((beb) => beb.id === idBebida);
  bebida.unidades++;
  bebida.subtotal += bebida.precio;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito(carrito);
};
let restarAlCarrito = (idBebida) => {
  let bebida = carrito.find((beb) => beb.id === idBebida);
  if (bebida.unidades > 1) {
    bebida.unidades--;
    bebida.subtotal -= bebida.precio;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(carrito);
  }
};

function totalCarrito(carrito) {
  let total = calcularTotal(carrito);
  contenedorPrecioTotal.innerHTML = `Total: $${total}`;
}
function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach((bebida) => {
    total += bebida.subtotal;
  });
  return total;
}
