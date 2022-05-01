
function editar(id){
  const name = document.getElementById('input-name').value
  const email = document.getElementById('input-email').value
  
  axios.put(`http://localhost:3000/users/${id}`, {name, email})
  .then(response => {
    console.log(response)
    location.reload()
  })
  .catch(error => {
    console.log(error)
  })

}

function deletar(id){
  axios.delete(`http://localhost:3000/users/${id}`)
    .then(response => {
      console.log(response)
      location.reload()
    })
    .catch(error => {
      console.log(error)
    })
  console.log(id)
}