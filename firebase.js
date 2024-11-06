// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkNUj898I3Nr0iLByf3xJup2EIOw7Ipbs",
    authDomain: "mass-bd.firebaseapp.com",
    databaseURL: "https://mass-bd-default-rtdb.firebaseio.com",
    projectId: "mass-bd",
    storageBucket: "mass-bd.firebasestorage.app",
    messagingSenderId: "289893719458",
    appId: "1:289893719458:web:9f5c14280a4767818426fb",
    measurementId: "G-SDY3J01882"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Firestore functions for CRUD operations on "productos"

// Save a new product in Firestore
export const saveProducto = (nombre, descripcion, imagen, marca, cantidad, precio, categoria) =>
    addDoc(collection(db, "productos"), { nombre, descripcion, imagen, marca, cantidad, precio, categoria });

// Get real-time updates for products
export const onGetProductos = (callback) =>
    onSnapshot(collection(db, "productos"), callback);

// Delete a product by ID
export const deleteProducto = (id) => deleteDoc(doc(db, "productos", id));

// Get a product by ID
export const getProducto = (id) => getDoc(doc(db, "productos", id));

// Update a product by ID
export const updateProducto = (id, newFields) =>
    updateDoc(doc(db, "productos", id), newFields);
