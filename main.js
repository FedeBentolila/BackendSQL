class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=libros
        this.mascotas=mascotas

    }

    getFullName (){
        return (`Nombre completo ${this.nombre} ${this.apellido}`)
    }

    addMascota(nuevamasacota){
        this.mascotas.push(nuevamasacota)
    }

    countMascotas(){
       return (this.mascotas.length)
    }

    addBook(autorlibro, nombrelibro){
        this.libros.push({ autor: autorlibro, titulo: nombrelibro})
    }

    getBookNames(){
        const booknames = this.libros.map(function (item){
                return item.titulo
        }
        
        )
        return booknames
    } 

}

const NuevoUsuario= new Usuario(
    "Federico",
    "Bentolila",
    [
        {autor:"Lovecraft", titulo: "La llamada de Cthulhu"},
        {autor:"Borges", titulo:"el Aleph"},
    ],
    [
        "perro",
        "gato",
    ],
)


console.log(NuevoUsuario.getFullName())
NuevoUsuario.addMascota("canario")
console.log(NuevoUsuario.mascotas)
console.log(NuevoUsuario.countMascotas())
NuevoUsuario.addBook("Ray Bradbury", "Crónicas Marcianas")
console.log(NuevoUsuario.libros)
console.log(NuevoUsuario.getBookNames())



