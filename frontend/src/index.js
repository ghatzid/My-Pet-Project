//https://thecatapi.com/v1/images?api_key=7484a4a4-4e74-42e4-ac05-62d8cb94406b

document.addEventListener('DOMContentLoaded', () => {
  const URL = 'http://localhost:3000/api/posts/'
  let addImage = false
  let editImg = false
  let commentFormShow = false
  const addBtn = document.querySelector('#new-gpsa-btn')
  const gpsaCollection = document.querySelector('#gpsa-collection')
  const addGpsaForm = document.querySelector('.add-gpsa-form')
  const editGpsaForm = document.querySelector('.edit-gpsa-form')
  const addCommentForm = document.querySelector('.add-comment-form')
  const commentList = document.querySelector('.comment-list')

  getPosts()

  function getPosts(){
    fetch(URL)
    .then(response => response.json())
    .then(gpsas => gpsas.forEach(gpsa => {renderPosts(gpsa)}))
  }

  function renderPosts(gpsa) {
    gpsaCollection.insertAdjacentHTML("beforeend",`
    <div class="card" data-card-id="${gpsa.id}"> 
      <span class="gpsa-text" data-text-id="${gpsa.id}">${gpsa.name}</span>
      <img class="gpsa-image" data-img-id="${gpsa.id}" src= ${gpsa.image}></img>
      
      <p>
        <button class="like-btn" data-like-id="${gpsa.id}">${gpsa.likes} Likes <3</button>
        <button class="comment-btn" data-comment-id="${gpsa.id}">Comment</button>
        <button class="delete-btn" data-delete-id="${gpsa.id}">Delete</button>
        <button class="edit-btn" data-edit-id="${gpsa.id}">Edit</button>
    </div>`)

    likeButton = document.querySelector(`.like-btn[data-like-id="${gpsa.id}"]`)
    deleteButton = document.querySelector(`.delete-btn[data-delete-id="${gpsa.id}"]`)
    editButton = document.querySelector(`.edit-btn[data-edit-id="${gpsa.id}"]`)
    commentButton = document.querySelector(`.comment-btn[data-comment-id="${gpsa.id}"]`)

    likeButton.addEventListener('click', e => {
      likeImage(gpsa,e)
    })

    deleteButton.addEventListener('click', e => {
      deleteImage(e)
    })

    editButton.addEventListener('click', e => {
      editGpsaForm.setAttribute("dataset-form-id", `${gpsa.id}`)
      editImg = !editImg
      gpsaId = document.querySelector(`[dataset-form-id="${gpsa.id}"]`).value = `${gpsa.id}`
      gpsaName = document.querySelector(`[placeholder="Enter a name..."]`).value = `${gpsa.name}`
      gpsaImage = document.querySelector(`[placeholder="Edit image URL..."]`).value = `${gpsa.image}`
      return (editImg) ?(editGpsaForm.style.display = 'block') : (editGpsaForm.style.display = 'none')
    })

    commentButton.addEventListener('click', e => {
      addCommentForm.setAttribute("dataset-comment-id", `${gpsa.id}`)
      postId = document.querySelector(`[dataset-comment-id="${gpsa.id}"]`).value = `${gpsa.id}`
      id = e.target.dataset.commentId
      showComments(gpsa,e)
      commentFormShow = !commentFormShow
      commentText = document.querySelector(`[placeholder="Enter a comment..."]`)
      return (commentFormShow) ?(addCommentForm.style.display = 'block') : (addCommentForm.style.display = 'none')
    })
  }

  function showComments(gpsa)
  {

    commentList.innerText = ""
    gpsa.comments.forEach(comment => {
      commentList.insertAdjacentHTML("beforeend",`
      <p>${comment.content}</p>`)
    });
  }

  function postImage(gpsa_data) 
  { // POST new gpsa object to JSON
    return fetch( 'http://localhost:3000/api/posts/', 
    {
      method: "POST",
      headers:{ "Content-Type": "application/json",
                "Accept": "application/json" },
      body: JSON.stringify({
        "name": gpsa_data.name.value,
        "image": gpsa_data.image.value,
        "likes": 0 })
    })
    .then(res => res.json())
    .then(function(obj_gpsa) {
      console.log("Data Posted")  
      renderPosts(obj_gpsa)
    })
    .catch(function(error) {
      document.body.innerHTML = error.message
    })
  }

  function likeImage(gpsa,e) {
    return fetch(`http://localhost:3000/api/posts/${e.target.dataset.likeId}`,  {
      method: "PATCH", 
      headers:{ "Content-Type": "application/json",
                "Accept": "application/json" },
      body: JSON.stringify( {
      "name": gpsa.name,
      "image": gpsa.image,
      "likes": gpsa.likes += 1
      })
    })
    .then(res => res.json()) 
    .then(e.target.innerText = `${gpsa.likes} Likes <3`
    )
  }

  function deleteImage(e){
    return fetch(`http://localhost:3000/api/posts/${e.target.dataset.deleteId}`, {
      method: "DELETE",
      headers:{ "Content-Type": "application/json",
                "Accept": "application/json" }
  })
  .then(res => res.json())
  .then(e.target.parentNode.parentNode.remove()) 
  }

  function editImage(gpsaId){
    return fetch(`http://localhost:3000/api/posts/${gpsaId}`, {
      method: "PATCH",
      headers:{ "Content-Type": "application/json",
                "Accept": "application/json" },
      body: JSON.stringify({
        "name": document.querySelector(`[placeholder="Enter a name..."]`).value,
        "image": document.querySelector(`[placeholder="Edit image URL..."]`).value,
        "likes": parseInt(likeButton.innerText)
      })
    })  
    .then(res => res.json())
    .then(gpsa => document.querySelector(`.gpsa-text[data-text-id="${gpsa.id}"]`).innerText=`"${gpsa.name}"`)
    .then(gpsa => document.querySelector(`.gpsa-image[data-img-id="${gpsa.id}"]`).innerHTML = `<img class="gpsa-image" data-img-id="${gpsa.id}" src="${gpsa.image}">`)  
  }

  function addComment(postId) {
    // debugger 
    return fetch('http://localhost:3000/api/comments/', {
      method: "POST",
      headers:{ "Content-Type": "application/json",
      "Accept": "application/json" },
      body: JSON.stringify({
        "content": document.querySelector(`[placeholder="Enter a comment..."]`).value,
        "post_id": postId
      })
    })
    .then(res => res.json())
    .then(res => document.querySelector('.comment-list').insertAdjacentHTML("beforeend",`<p>${res.content}</p>`))
}



  //Event Listeners/////////////////////////////////////


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addImage = !addImage
    return (addImage) ?
    (addGpsaForm.style.display = 'block') : 
    (addGpsaForm.style.display = 'none')
  })

  addGpsaForm.addEventListener('submit', event => {
    // send form data to POST
    event.preventDefault()
    postImage(event.target)
    console.log("Form Data Sent to POST")
  })

  editGpsaForm.addEventListener('submit', e => {
    e.preventDefault()
    editImage(gpsaId,e)
  })

  addCommentForm.addEventListener('submit', e=> {
    // debugger
    e.preventDefault()
    addComment(postId,e)
  })
  

})
    

