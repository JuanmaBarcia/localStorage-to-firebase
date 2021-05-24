let arrUsrs = []
let contador = 0

if (JSON.parse(localStorage.getItem("usuarios"))) {
    arrUsrs = JSON.parse(localStorage.getItem("usuarios"))
    contador = arrUsrs[arrUsrs.length - 1].id + 1
    arrUsrs.map(usr => {
        pintarDatos(usr)
        borrarUsr(usr.id)
    })
}

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    var nombre = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var comentario = document.getElementById('comentario').value;

    const obj = {
        id: contador,
        keyNombre: nombre,
        keyEmail: email,
        keyComentario: comentario
    }

    arrUsrs.push(obj)
    localStorage.setItem(`usuarios`, JSON.stringify(arrUsrs))
    contador++

    pintarDatos(obj)
    borrarUsr(obj.id)
})

function pintarDatos(user) {
    let datos = JSON.parse(localStorage.getItem("usuarios"))
    let newDatos = datos.filter(usuario => usuario.id == user.id)[0]

    let divElement = document.createElement("div")
    divElement.setAttribute("id", `id_${user.id}`)
    document.getElementById("datos").appendChild(divElement)

    for (const clave in newDatos) {
        if (clave != "id") {
            let pElement = document.createElement("p")
            let contenido = document.createTextNode(newDatos[clave])
            pElement.appendChild(contenido)
            divElement.appendChild(pElement)
        }
    }

    let boton = document.createElement("button")
    let contenidoBtn = document.createTextNode(`Borrar Usuario ${user.id}`)
    boton.appendChild(contenidoBtn)
    boton.setAttribute("id", `erase_${user.id}`)
    divElement.appendChild(boton)
}

function borrarUsr(id) {
    document.getElementById(`erase_${id}`).addEventListener("click", () => {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"))
        contador = arrUsrs[arrUsrs.length - 1].id + 1
        document.getElementById(`id_${id}`).remove()
        arrUsrs = usuarios.filter(usuario => usuario.id != id)
        localStorage.setItem(`usuarios`, JSON.stringify(arrUsrs))
    })
}

document.getElementById("erase").addEventListener("click", () => {
    localStorage.clear()
    arrUsrs = []
    contador = 0
    document.getElementById("datos").innerHTML = ""
})