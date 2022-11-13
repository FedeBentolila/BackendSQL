const fs = require("fs");

let Arreglodeproductos = [];

let idproductos = 1;

const express = require("express");
const {Server: HttpServer}= require('http');

const {Server: IOServer}= require('socket.io');
const aplicacion = express();
const httpServer= new HttpServer(aplicacion);
const io= new IOServer(httpServer);

const PUERTO = 8080;

httpServer.listen(PUERTO, () => {
  console.log(
    `Aplicación escuchando en el puerto: ${PUERTO}`
  );
});

let messages = [
];


const publicRoot= "./public"

aplicacion.use(express.static(publicRoot));


io.on('connection', function(socket){
  console.log('Un cliente se ha conectado');
  getAllmensajes().then(()=>{
    socket.emit('messages', messages);
  })
  
  getAll().then(()=>{
    socket.emit('lineaproducto', Arreglodeproductos);
  })

  socket.on('new message', data=>{
      Savemensajes(data).then(()=>{
        io.sockets.emit('messages', messages)

      })
    
  });

  socket.on('new lineaproducto', data=>{

    Save(data).then(()=>{
      Objeto = {
        ...data,
        id: idproductos,
      };
    io.sockets.emit('lineaproducto2',Objeto )
  })
  });
});


// Lineas para usar Json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.get("/", (peticion, respuesta) => {
  respuesta.sendFile('index.html', {root: publicRoot});
});

aplicacion.get("/chat", (peticion, respuesta) => {
  respuesta.sendFile('chat.html', {root: publicRoot});
});


////Funciones para  mensajes


async function leerarchivodemensajes() {
  try {
    if ((contenido = await fs.promises.readFile("./mensajes.txt", "utf-8"))) {
      archivo = JSON.parse(contenido);
      messages = archivo;
    } else {
      messages = [];
    }
  } catch (error) {
    console.log("error de lectura del archivo", error);
  }
}

async function Savemensajes(Objeto) {
  try {
    await leerarchivodemensajes();

    messages.push(Objeto);

    await fs.promises.writeFile(
      "./mensajes.txt",
      JSON.stringify(messages, 1, "\n")
    );

  } catch (error) {
    console.log("hubo un error no se pudo guardar el mensaje");
  }
 
}

async function getAllmensajes() {
  await leerarchivodemensajes();

  return messages;
}

/// Funciones 

async function leerarchivo() {
  try {
    if ((contenido = await fs.promises.readFile("./productos.txt", "utf-8"))) {
      archivo = JSON.parse(contenido);
      Arreglodeproductos = archivo;
      idproductos = Arreglodeproductos.length + 1;
    } else {
      Arreglodeproductos = [];
    }
  } catch (error) {
    console.log("error de lectura del archivo", error);
  }
}

async function Save(Objeto) {
  try {
    await leerarchivo();

    Objeto = {
      ...Objeto,
      id: idproductos,
    };

    console.log("el ID del producto agregado es", idproductos);

    Arreglodeproductos.push(Objeto);

    await fs.promises.writeFile(
      "./productos.txt",
      JSON.stringify(Arreglodeproductos, 1, "\n")
    );

  } catch (error) {
    console.log("hubo un error no se pudo guardar el ojbeto");
  }
 
}

async function getByID(idabuscar) {
  try {
    await leerarchivo();

    if (
      (objetobuscado = Arreglodeproductos.find(({ id }) => id === idabuscar))
    ) {
      return objetobuscado;
      // console.log(objetobuscado)
    } else {
      console.log(null);
    }
  } catch (error) {
    console.log("error al buscar el id");
  }
}

async function getAll() {
  await leerarchivo();

  return Arreglodeproductos;

  console.log(Arreglodeproductos);
}

async function deleteByID(idabuscar) {
  try {
    await leerarchivo();

    if (
      (objetobuscado = Arreglodeproductos.find(({ id }) => id === idabuscar))
    ) {
      Arreglodeproductos.splice(
        Arreglodeproductos.findIndex((a) => a.id === idabuscar),
        1
      );

      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(Arreglodeproductos, 1, "\n")
      );

      return objetobuscado;
    } else {
      console.log("no existe ese archivo para borrar");
    }
  } catch (error) {
    console.log("error al buscar el id");
  }
}

async function deleteAll() {
  try {
    await leerarchivo();

    if (Arreglodeproductos) {
      Arreglodeproductos = [];

      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(Arreglodeproductos, 1, "\n")
      );
    } else {
      console.log("no existen archivos para borrar");
    }
  } catch (error) {
    console.log("error al buscar el id");
  }
}

class Contenedor {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}



