
const fs= require ("fs");

let Arreglodeproductos= []

let idproductos= 1

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
            console.log(objetobuscado)
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

