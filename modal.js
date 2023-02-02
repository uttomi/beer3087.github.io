const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("botonCarrito");
const botonCerrar = document.getElementById("cerrar-carrito");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];
const comprarCarrito = document.getElementById("comprar-carrito");

botonAbrir.addEventListener("click", () => {
  if (carrito.length == 0) {
    Swal.fire({
      icon: "info",
      title: "El carrito está vacío",
      background: "rgba(24, 24, 24)",
      color: "white",
      backdrop: true,
      timer: 1300,
      timerProgressBar: true,
      toast: true,
      position: "top-right",
      width: 300,
    }).showToast();
  } else {
    contenedorModal.classList.toggle("modal-active");
  }
});
botonCerrar.addEventListener("click", () => {
  contenedorModal.classList.toggle("modal-active");
});

contenedorModal.addEventListener("click", (event) => {
  contenedorModal.classList.toggle("modal-active");
});
modalCarrito.addEventListener("click", (event) => {
  event.stopPropagation();
});
comprarCarrito.addEventListener("click", () => {
  contenedorModal.classList.toggle("modal-active");
});
