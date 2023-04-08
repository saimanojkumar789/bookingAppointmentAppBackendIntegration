let name = document.getElementById('name');
let email = document.getElementById('email');
let contact = document.getElementById('contact');
let items = document.getElementById('items');
let form = document.getElementById('form');

form.addEventListener('submit',onSubmit);


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