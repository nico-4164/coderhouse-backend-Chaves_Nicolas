import {ProductManager} from './ProductManager.js';
import { Server } from "socket.io";

const socket = io();

document.getElementById('btn').onclick = async () =>{

    console.log("log dentro del real time product js");
    socket.emit('pedido', 'mensaje enviado desde el front')

}



