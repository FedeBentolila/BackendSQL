var knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "productos",
  },
  pool: { min: 0, max: 7 },
});

knex.schema.hasTable("productos").then((existe) => {
  if (!existe) {
    knex.schema
      .createTable("productos", (table) => {
        table.increments("id");
        table.string("title");
        table.string("thumbnail");
        table.integer("price");
      })
      .then(() => console.log("tabla creada"))
      .finally(() => {
        knex.destroy();
      });
  }
});

var knex2 = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./DB/mensajes.sqlite",
  },
  useNullAsDefault: true,
});

knex2.schema.hasTable("mensajes").then((existe) => {
  if (!existe) {
    knex2.schema
      .createTable("mensajes", (table) => {
        table.string("author");
        table.string("text");
        table.string("time");
      })
      .then(() => console.log("tabla creada"))
      .finally(() => {
        knex2.destroy();
      });
  }
});

let Arreglodeproductos = [];

const express = require("express");
const { Server: HttpServer } = require("http");

const { Server: IOServer } = require("socket.io");
const aplicacion = express();
const httpServer = new HttpServer(aplicacion);
const io = new IOServer(httpServer);

const PUERTO = 8080;

httpServer.listen(PUERTO, () => {
  console.log(`Aplicación escuchando en el puerto: ${PUERTO}`);
});

let messages = [];

const publicRoot = "./public";

aplicacion.use(express.static(publicRoot));

io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");

  getAllmensajessqlite()
    .then(() => {
      socket.emit("messages", messages);
    })
    .then(() => {
      messages = [];
    });

  getAllmysql()
    .then(() => {
      socket.emit("lineaproducto", Arreglodeproductos);
    })
    .then(() => {
      Arreglodeproductos = [];
    });

  socket.on("new message", (data) => {
    savemensajessqlite(data).then(() => {
      getAllmensajessqlite()
        .then(() => {
          io.sockets.emit("messages", messages);
        })
        .then(() => {
          messages = [];
        });
    });
  });

  socket.on("new lineaproducto", (data) => {
    savemysql(data).then(() => {
      getAllmysql()
        .then(() => {
          socket.emit("lineaproducto2", Arreglodeproductos);
        })
        .then(() => {
          Arreglodeproductos = [];
        });
    });
  });
});

// Lineas para usar Json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.get("/", (peticion, respuesta) => {
  respuesta.sendFile("index.html", { root: publicRoot });
});

aplicacion.get("/chat", (peticion, respuesta) => {
  respuesta.sendFile("chat.html", { root: publicRoot });
});

////Funciones para  mensajes

async function savemensajessqlite(objeto) {
  await knex2("mensajes")
    .insert(objeto)
    .then(() => console.log("mensaje insertado"))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

async function getAllmensajessqlite() {
  await knex2
    .from("mensajes")
    .select("*")
    .then((rows) => {
      for (row of rows) {
        let objeto = { author: row.author, text: row.text, time: row.time };

        messages.push(objeto);
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

/// Funciones para productos

async function savemysql(objeto) {
  await knex("productos")
    .insert(objeto)
    .then(() => console.log("producto insertado"))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

async function getAllmysql() {
  await knex
    .from("productos")
    .select("*")
    .then((rows) => {
      for (row of rows) {
        let objeto = {
          id: row.id,
          title: row.title,
          price: row.price,
          thumbnail: row.thumbnail,
        };

        Arreglodeproductos.push(objeto);
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
