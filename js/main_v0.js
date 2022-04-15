let listaPlatillos = [
    {
        id: 1,
        nombre: "Crema de Verduras",
        descripcion: "Suave crema preparada con una variedad de verduras estacionales",
        precio: 12.0,
        stock: 10,
        imagen: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80z",
    },
    {
        id: 2,
        nombre: "Albondigas con salsa Barbeque",
        descripcion:
            "Albondigas de carne de res condimentandas con finas hierbas acompañadas con Salsa Bbq y espinacas",
        precio: 18.0,
        stock: 8,
        imagen: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80",
    },
    {
        id: 3,
        nombre: "Hamburguesa Royal",
        descripcion: "Carne, Queso, Huevo y tomate, todo envuelto con pan",
        precio: 11.0,
        stock: 14,
        imagen: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
        id: 4,
        nombre: "Pizza de la casa",
        descripcion: "Pizza con recetea original de la casa",
        precio: 14.0,
        stock: 7,
        imagen: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    },
    {
        id: 5,
        nombre: "Ceviche de la casa",
        descripcion: "Plato Bandera Peruano acompañado con bebida a elección",
        precio: 20.0,
        stock: 10,
        imagen: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
        id: 6,
        nombre: "Ramen Fusión",
        descripcion: "Ramen preparado con ingredientes Peruanos",
        precio: 19.0,
        stock: 6,
        imagen: "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
    },
];

/**REQUERIDA
 * 1. mostrar estos platillos de forma identica a como lo hace preview
 *
 * //ESTO ES OPCIONAL, aqui tendrías que investigar
 * 2. OPCIONAL (cuando de click en el boton agregar hacer que eso se sume al carrito)
 * 	-tips getElementsByClassName, y pueden agregar attributos adicionales
 * 3. OPCIONAL (mostrar el resumen del carrito en la parte derecha)
 * 4. OPCIONAL (guardar el resumen en el LocalStorage)
 */

// solución v0: se crea un segundo array que resume items del carrito (id, nombre, cantidad, precio...)
let divContenido = document.getElementById("contenido")

// agregar tarjetas de array[] al HTML
function agregarTarjetas() {
    let htmlTarjetas = ""

    listaPlatillos.forEach(function(plato){
        htmlTarjetas = htmlTarjetas + 

        `<div class="tarjeta">
            <div class="imagen">
                <img src="${plato.imagen}">
            </div>
            <div class="texto">
                <h4>${plato.nombre}</h4>
                <p>${plato.descripcion}</p>
                <div class="precio">
                    <span>S/ ${plato.precio}</span>
                    <button class="btn-agregar" data-id="${plato.id}">
                        Agregar
                    </button>
                </div>
            </div>
        </div>`
        
    })

    divContenido.innerHTML = htmlTarjetas
}
agregarTarjetas()

// agregar items al carrito[]
let carrito = []
let itemsList = []

function agregarAlCarrito() {
    let btnsAgregar = document.querySelectorAll(".btn-agregar")
    console.log(btnsAgregar)
    btnsAgregar.forEach(function(boton){
        boton.addEventListener("click", function(){
            let idObtenido = boton.getAttribute("data-id")
            let platoObtenido = buscarPlatoPorID(+idObtenido)
            // carrito.push(platoObtenido)
            agregarAlResumen(platoObtenido)
            guardarEnLS()
            console.table(carrito) 
        })
    })
}
agregarAlCarrito() 

// función encontrar plato en array[]
function buscarPlatoPorID(id) {
    let platoEncontrado = listaPlatillos.find(function(plato){
        return plato.id === id
    })
    console.log(platoEncontrado)
    return platoEncontrado
}

// función para agregar productos a tabla resumen
function agregarAlResumen(platillo) {
    carrito.push(platillo)

    carrito.forEach(function(item){
        let carritoPorPlato = carrito.filter(function(plato){
            return plato.id === item.id
        })
        let platoCantidad = carritoPorPlato.length

        let platoIndex = itemsList.findIndex(function(producto){
            return producto.nombre === item.nombre
        })
        if (platoIndex !== -1) {
            itemsList[platoIndex].cantidad = platoCantidad
            itemsList[platoIndex].subtotal = platoCantidad * item.precio
        } else {
            itemsList.push({id:item.id,nombre:item.nombre, cantidad: platoCantidad, precio: item.precio, subtotal: platoCantidad * item.precio} )
        }
    })
    mostrarSeleccion()
}

// mostrar carrito
let tbodyCarrito = document.getElementById("tbody-carrito")
function mostrarSeleccion() {
    let htmlCompras = ""
    itemsList.forEach(function(item){
        htmlCompras = htmlCompras + 
        `<tr>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.subtotal}</td>
        </tr>`
    })
    tbodyCarrito.innerHTML = htmlCompras
}

function guardarEnLS(){
    let carritoAString = JSON.stringify(carrito)
    localStorage.setItem("productosResumen", carritoAString)
}

function leerLS() {
    let carritoEnLS = localStorage.getItem("productosResumen")
    let carritoAArray = JSON.parse(carritoEnLS)
    carritoAArray.forEach(function(platillo) {
        agregarAlResumen(platillo)
    })
}
leerLS()




