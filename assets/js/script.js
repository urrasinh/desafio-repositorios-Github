const baseUrl = 'https://api.github.com/users';
const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}
const getUser = async (user) => {
    const url = `${baseUrl}/${user}`;
    return request(url);
}
const getRepos = async (user, page, perPage) => {
    const url = `${baseUrl}/${user}/repos?page=${page}&per_page=${perPage}`;
    return request(url);
}

const imprimirDatos = event => {
    event.preventDefault()
    const user = document.querySelector('#nombre').value
    const page = document.querySelector('#pagina').value
    const perPage = document.querySelector('#repoPagina').value
    const resultado = document.querySelector('#resultados')
    Promise.all([getUser(user), getRepos(user, page, perPage)])
        .then(resp => {
            console.log(resp)
            const usuario = resp[0];
            const nombre = usuario.login
            console.log('name', nombre)
            resultado.innerHTML = `<li> nombre de usuario: ${nombre}</li>`
            resultado.innerHTML = `<li> nombre de login: ${nombre}</li>`
        })
        .catch(err => console.log('err', err))
    // const datosUsuario = datosFormulario() // Ejecutamos la funcion para asignar el objeto a una nueva variable
}

// ----------------------- Funciones finalizadas -----------------------

const selectorAgregar = document.querySelector('#formulario')
selectorAgregar.addEventListener('submit', imprimirDatos)