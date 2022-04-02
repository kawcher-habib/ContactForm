//contact constructor
function Contact(name, email, phone){
    this.name = name
    this.email = email
    this.phone = phone
    console.log(name, email, phone)
}
//contact UI constructor
function UI(){}

//display contact Value
UI.prototype.displayContactValue = function(contact) {
    const list = document.getElementById('contactList')
    const newTr = document.createElement('tr')
    newTr.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <button class="btn btn-danger text-success delete">x</button>
    `
    list.appendChild(newTr)
}
//delete contact value
UI.prototype.deleteContactValue = function(target){
   if(target.classList.contains('delete')){
       if(confirm("Ara You sure!!")){
       target.parentElement.remove()
       
       }

   }
}
//validation contact value
UI.prototype.clearField = function(){
    document.getElementById('nameInput').value = ''
    document.getElementById("emailInput").value = ''
    document.getElementById('numberInput').value = ''
}

//search value
UI.prototype.searchBar = function(value){
    const rows = document.querySelectorAll('#contactList tr');
    rows.forEach(row =>{
       if(row.children[0].textContent.indexOf(value) != -1){
        row.style.display = 'table-row'
       }else{
           row.style.display = 'none'
       }
    })
    

}
//local store
function LS(){
}
// getStor
LS.prototype.getStore = function(){
    let contact ;

    if(localStorage.getItem('contacts') === null){
            contact = []
    }else{
        contact = JSON.parse(localStorage.getItem('contacts'))
    }

    return contact;
   
}
//display Store
LS.prototype.displayStore = function(){
    const ls = new LS()
    const contacts = ls.getStore()
    contacts.forEach(contact =>{
        const ui = new UI()
        ui.displayContactValue(contact)
    })
   
}
//add Stor
LS.prototype.addStore = function(contact){
    console.log('i get this value', contact)
    const ls = new LS()
    const contacts = ls.getStore()
    contacts.push(contact)
    console.log('this is addstor push value',contacts)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}
//remove store
LS.prototype.removeStore = function (phone){
    const ls = new LS()
    const contacts = ls.getStore()
    contacts.forEach((contact, index) =>{
            if(contact.phone === phone){
                contacts.splice(index, 1)
            }
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

/*** 
Event Area start
***/
document.getElementById('submitBtn').addEventListener("click", function(e){
    e.preventDefault()
    let name = document.getElementById("nameInput").value;
        email = document.getElementById('emailInput').value;
        phone = document.getElementById('numberInput').value;
        
        //
    const contact = new Contact(name, email, phone)
    //
    const ui = new UI()
    const ls = new LS()
    
    if(name === '' || email === '' || phone === ''){
        alert("Please Enter Your Input")
    }else{
        ui.displayContactValue(contact)
        ls.addStore(contact)
        ui.clearField() 
    }
})

//delete event
document.getElementById("contactList").addEventListener("click", function(e){
        const ui = new UI()
        const ls = new LS()
        ui.deleteContactValue(e.target)
        ls.removeStore(e.target.parentElement.children[2].textContent)
})
//search bar
document.getElementById('searchBar').addEventListener('keyup', function(e){
    const ui = new UI()
    ui.searchBar(e.target.value)
})

//DOM
document.addEventListener("DOMContentLoaded", function(){
        const ls = new LS()
        ls.displayStore()
})