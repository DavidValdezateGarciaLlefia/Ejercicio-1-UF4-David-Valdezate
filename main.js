console.log('hola desde main')
let usersJson = ''
fetch('https://jsonplaceholder.typicode.com/users')

.then(resp => resp.json())
.then(usuariosJSON =>{
    usersJson = usuariosJSON
    console.log('usuarios: ', usuariosJSON)
    for(let x=0;x<5;x++){
        inyectarUsuario(usuariosJSON[x].name.split(' ')[0],usuariosJSON[x].name.split(' ')[1],usuariosJSON[x].email,usuariosJSON[x].id )
    }
})

function inyectarUsuario(nombre,apellido,email, id){

const tbodyUsers = document.querySelector('#tbodyUsers')

const tr = document.createElement("tr")

let thUsers = `<th scope="col">${id}</th>`
thUsers += `<td data-userid =${id} class="fichaUser" scope="col">${nombre}</th>`
thUsers += `<td scope="col">${apellido}</th>`
thUsers += `<td scope="col">${email}</th>`
tr.innerHTML = thUsers
tbodyUsers.appendChild(tr)
}

document.querySelector('body').addEventListener('click',(e)=>{
    if(e.target.classList.contains('fichaUser')){
        const trUser = e.target.closest('.fichaUser')
        console.log(trUser.dataset.userid)
        let userId = trUser.dataset.userid
        fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(resp => resp.json())
        .then(usuariosJSON =>{
           
            console.log('usuarios: ', usuariosJSON)
            document.querySelector('#nombreUser').innerHTML = usuariosJSON.name
            document.querySelector('#infor1').innerHTML = usuariosJSON.company.name 
            document.querySelector('#infor2').innerHTML = usuariosJSON.company.catchPhrase
        })
        fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(resp => resp.json())
        .then(usuariosJSON => {
            let arrayPost = []
            usuariosJSON.forEach(element => {
                if (element.userId == userId) { 
                   arrayPost.push(element)
                   
                }
            });
            let postHtml = ''
            for(let x=0; x<5 ; x++){
                postHtml += `<li  data-postid = ${arrayPost[x].id} class="list-group-item d-flex justify-content-between align-items-start postUser">
                <div class="ms-2 me-auto ">
                  <div class="fw-bold">${arrayPost[x].title}</div>
                  ${arrayPost[x].body}
                </div>
                <span class="badge bg-primary rounded-pill">${arrayPost.length}</span>
              </li>`
            }
            document.querySelector('#postPublicats').innerHTML = postHtml
            
        })
                }
    if(e.target.classList.contains('postUser')){
        const liPost = e.target.closest('.postUser')
        let commentId = liPost.dataset.postid
        
        fetch('https://jsonplaceholder.typicode.com/comments/')
        .then(resp => resp.json())
        .then(usuariosJSON => {
            let arrayComments = []
            usuariosJSON.forEach(element => {
                if (element.postId == commentId) { 
                   arrayComments.push(element)
                   
                }
            });
            let commentHtml = ''
            for(let x=0; x<arrayComments.length ; x++){
                commentHtml += `<div class="card mt-2">
                <div class="card-body">
                  <h5 class="card-title">${arrayComments[x].name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${arrayComments[x].email}</h6>
                  <p class="card-text">${arrayComments[x].body}</p> 
                </div>
              </div>`
            }
            document.querySelector('#comentarios').innerHTML = commentHtml
            
        })
    }
    //postPublicats





})


