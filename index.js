let name = document.getElementById('name');
let email = document.getElementById('email');
let contact = document.getElementById('contact');
let items = document.getElementById('items');
let form = document.getElementById('form');

form.addEventListener('submit',onSubmit);

items.addEventListener('click',clicked);

function onSubmit(e){
    e.preventDefault();
    const obj = {
        name : name.value,
        email : email.value,
        contact : contact.value
    }
    
    axios.post('https://crudcrud.com/api/96de2e95b63c430dafb05da385d50d6f/appointmentData',obj)
    .then(res => {
        showOutput(res.data);
    })
    .catch(err => console.log(err));
}

window.addEventListener("DOMContentLoaded",() => {
    axios.get('https://crudcrud.com/api/96de2e95b63c430dafb05da385d50d6f/appointmentData')
    .then( (res) => {
        for(let i=0;i<res.data.length;i++){
            showOutput(res.data[i]);
        }
    })
})

function showOutput(data){
    let li = document.createElement('li');
    li.innerText = `${data.name} - ${data.email} ${data.contact}`;
    li.className = "list-group-item mb-2";
    let button = document.createElement('button');
    button.className = "delete";
    button.setAttribute('data-id',data._id)
    button.style.float="right";
    button.innerText = "delete";
    li.appendChild(button);

    let edit = document.createElement('button');
    edit.className = "edit mr-2";
    edit.innerText = "edit";
    edit.style.float = "right"; 
    li.appendChild(edit);
    items.appendChild(li);
}


function clicked(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            const li = e.target.parentElement;
            const id =  li.querySelector('.delete').getAttribute('data-id');
            axios.delete(`https://crudcrud.com/api/96de2e95b63c430dafb05da385d50d6f/appointmentData/${id}`)
            .then( (res)=>console.log('success'))
            .catch( (err) => console.log(err));
            items.removeChild(li);
        }
    }
}