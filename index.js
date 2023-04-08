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
    
    const id = form.getAttribute('data-id');

    if(id){
        axios.put(`https://crudcrud.com/api/ea69e79a300044ec9ee957aaf96aec50/appointmentData/${id}`,obj)
        .then ( (res) => {
            const li = items.querySelector(`[data-id="${id}"]`);
            li.innerText = `${obj.name} - ${obj.email} ${obj.contact} `;
            addFunctionality(li);
            
            form.removeAttribute('data-id');
        })
        .catch( (err) => console.log(err));
    }
    else{
        axios.post('https://crudcrud.com/api/ea69e79a300044ec9ee957aaf96aec50/appointmentData',obj)
        .then(res => {
            showOutput(res.data);
        })
        .catch(err => console.log(err));
    }
    
}

window.addEventListener("DOMContentLoaded",() => {
    axios.get('https://crudcrud.com/api/ea69e79a300044ec9ee957aaf96aec50/appointmentData')
    .then( (res) => {
        for(let i=0;i<res.data.length;i++){
            showOutput(res.data[i]);
        }
    })
    .catch( (err) => console.log(err));
})

function showOutput(data){
    let li = document.createElement('li');
    li.innerText = `${data.name} - ${data.email} ${data.contact} `;
    li.className = "list-group-item mb-2";
    li.setAttribute('data-id',data._id);
    addFunctionality(li);
    items.appendChild(li);
}


function clicked(e){
    if(e.target.classList.contains('delete')){
       deleteItem(e.target.parentElement);
    }

    if(e.target.classList.contains('edit')){
        editItem(e.target.parentElement);
    }
}



function deleteItem(li){
    if(confirm('Are you sure?')){
        const id =  li.getAttribute('data-id');
        axios.delete(`https://crudcrud.com/api/ea69e79a300044ec9ee957aaf96aec50/appointmentData/${id}`)
        .then( (res)=>console.log('success'))
        .catch( (err) => console.log(err));
        items.removeChild(li);
    }
}


function editItem(li){
    const arr = li.textContent.split(/[ ]+/);
    name.value = arr[0];
    email.value = arr[2];
    contact.value = arr[3];

    form.setAttribute('data-id',li.getAttribute('data-id'));
}

function addFunctionality(li){
    let button = document.createElement('button');
    button.className = "delete";
    button.style.float="right";
    button.innerText = "delete";
    li.appendChild(button);

    let edit = document.createElement('button');
    edit.className = "edit mr-2";
    edit.innerText = "edit";
    edit.style.float = "right"; 
    li.appendChild(edit);
}