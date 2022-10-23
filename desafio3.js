
const fs= require ("fs");

let Arreglodeproductos= []

let idproductos= 1


//// Express

const express = require('express');
const { response } = require("express");

const aplicacion= express();

const PUERTO= 8080;

aplicacion.get('/', (peticion, respuesta)=>{
    respuesta.send('Bienvenidos al servidor express');
})

aplicacion.get('/productos', (peticion, respuesta)=>{

    getAll().then(()=> {
      
        respuesta.send(

            Arreglodeproductos
            
        );

    }
    
    ) 
})

aplicacion.get('/productoRandom', (peticion, respuesta)=>{
    
    function getRandomInt(min, max){
        min= Math.ceil(min);
        max= Math.floor(max)
        return Math.floor(Math.random()* (max-min + 1) + min);
    }

    leerarchivo().then(()=>{

        getByID(getRandomInt(1, Arreglodeproductos.length)).then(()=> {

            respuesta.send(
    
            objetobuscado
                
            );
    
        }
        
        ) 


    }
    
    )

    
})

const conexionServidor= aplicacion.listen(PUERTO, ()=>{
    console.log(`Aplicación escuchando en el puerto: ${conexionServidor.address().port}`);
})

conexionServidor.on('error', error => console.log(`Ha ocurrido un error: ${error}`))


////Desafío previo

async function leerarchivo(){
    try {
       
       if (contenido= await fs.promises.readFile('./productos.txt', 'utf-8')) {
        archivo = (JSON.parse(contenido));
        Arreglodeproductos = archivo
        idproductos=  Arreglodeproductos.length + 1
       } else {
        Arreglodeproductos= []
       }
      
    }
    catch(error) {
        console.log("error de lectura del archivo", error)
    }

}

async function Save (Objeto){
        
    try {

        await leerarchivo()
        
        Objeto = {
            ...Objeto,
            id: idproductos,
        }

        console.log("el ID del producto agregado es", idproductos)
        
        Arreglodeproductos.push(Objeto)
        
        await fs.promises.writeFile("./productos.txt", JSON.stringify(Arreglodeproductos,1,"\n") )
       
    }
    catch(error){
        console.log("hubo un error no se pudo guardar el ojbeto")
    }
    
}


async function getByID (idabuscar){
        
    try {

        await leerarchivo()
        
        if (objetobuscado = Arreglodeproductos.find(({ id }) => id === idabuscar)) {
            return objetobuscado
            // console.log(objetobuscado)
        } else {
            console.log(null)
        }
        
    }
    catch(error){
        console.log("error al buscar el id")
    }
    
}

async function getAll(){
    await leerarchivo()

    return Arreglodeproductos

     console.log(Arreglodeproductos) 

}

async function deleteByID (idabuscar){
        
    try {

        await leerarchivo()
        
        if (objetobuscado = Arreglodeproductos.find(({ id }) => id === idabuscar)) {
            
            Arreglodeproductos.splice(Arreglodeproductos.findIndex(a => a.id === idabuscar) , 1)

            await fs.promises.writeFile("./productos.txt", JSON.stringify(Arreglodeproductos,1,"\n") )


        } else {
            console.log("no existe ese archivo para borrar")
        }
        
    }
    catch(error){
        console.log("error al buscar el id")
    }
    
}

async function deleteAll (){
        
    try {

        await leerarchivo()
        
        if (Arreglodeproductos) {
            
            Arreglodeproductos= []

            await fs.promises.writeFile("./productos.txt", JSON.stringify(Arreglodeproductos,1,"\n") )


        } else {
            console.log("no existen archivos para borrar")
        }
        
    }
    catch(error){
        console.log("error al buscar el id")
    }
    
}



class Contenedor {
    constructor(title,price, thumbnail){
        this.title=title
        this.price=price
        this.thumbnail=thumbnail

    }


}

const producto1= new Contenedor(
    "Escuadra",
    120,
    "./img/Squadra.jpg",
)

const producto2= new Contenedor(
    "Calculadora",
    120,
    "./img/calculadora.jpg",
    
)

const producto3= new Contenedor(
    "Globo terraqueo",
    120,
    "./img/globo.jpg",
 
)


//Ejemplos: quitar el comentario para ver el funcionamiento

//Save (producto3);

//getByID(5); 

//getAll();

//deleteByID(6)

//deleteAll()

