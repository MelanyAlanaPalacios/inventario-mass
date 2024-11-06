import {
    onGetProductos,
    saveProducto,
    deleteProducto,
    getProducto,
    updateProducto,
} from "./firebase.js";

const productForm = document.getElementById("formProducto");
const productsContainer = document.getElementById("bodyProductos");

let editStatus = false;
let id = "";

// Load products on page load
window.addEventListener("DOMContentLoaded", async () => {
    onGetProductos((querySnapshot) => {
        productsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            productsContainer.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
                <td>${producto.marca}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>
                    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">✏️ Editar</button>
                    <button class="btn btn-danger btn-delete" data-id="${doc.id}">🗑 Eliminar</button>
                </td>
            </tr>`;
        });

        // Delete button event listeners
        const btnsDelete = productsContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({ target: { dataset } }) => {
                try {
                    await deleteProducto(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        // Edit button event listeners
        const btnsEdit = productsContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) =>
            btn.addEventListener("click", async ({ target: { dataset } }) => {
                try {
                    const doc = await getProducto(dataset.id);
                    const producto = doc.data();

                    productForm["nombre"].value = producto.nombre;
                    productForm["descripcion"].value = producto.descripcion;
                    productForm["imagen"].value = producto.imagen;
                    productForm["marca"].value = producto.marca;
                    productForm["cantidad"].value = producto.cantidad;
                    productForm["precio"].value = producto.precio;
                    productForm["categoria"].value = producto.categoria;

                    editStatus = true;
                    id = doc.id;
                } catch (error) {
                    console.log(error);
                }
            })
        );
    });
});

// Add or update product
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = productForm["nombre"].value;
    const descripcion = productForm["descripcion"].value;
    const imagen = productForm["imagen"].value;
    const marca = productForm["marca"].value;
    const cantidad = parseInt(productForm["cantidad"].value, 10);
    const precio = parseFloat(productForm["precio"].value);
    const categoria = productForm["categoria"].value;

    if (!nombre || !descripcion || !imagen || !marca || isNaN(cantidad) || isNaN(precio) || !categoria) {
        return alert("Por favor, completa todos los campos.");
    }

    try {
        if (editStatus) {
            await updateProducto(id, { nombre, descripcion, imagen, marca, cantidad, precio, categoria });
            editStatus = false;
            id = "";
        } else {
            await saveProducto(nombre, descripcion, imagen, marca, cantidad, precio, categoria);
        }

        productForm.reset();
    } catch (error) {
        console.log(error);
    }
});
