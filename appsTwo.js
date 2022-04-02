//class constructor
class Contact{
    constructor(name, email, phone){
            this.name = name
            this.email = email
            this.phone = phone
            console.log(name, email, phone)
    }
}

//display Contact
class UiContact{
        //display Contact
        displayContact(contact){
            const list =  document.getElementById('contactList')
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <button class='btn btn-success delete'>x</button>
            `
            list.appendChild(tr)
        }
        //clear filed
        clearFiled(){
            document.getElementById('nameInput').value = ''
            document.getElementById('emailInput').value = ''
            document.getElementById('numberInput').value = ''
        }
        //delete contact
        deleteContact(target){
            if(target.classList.contains('delete')){
                target.parentElement.remove()
            }else{}
        }
        //search Bar
        searchBar(value){
         const rows = document.querySelectorAll('#contactList tr')
         rows.forEach( row =>{
             if(row.children[0].textContent.indexOf(value) != -1){
                    row.style.display = 'table-row'
             }else{
                 row.style.display = 'none'
             }
         })
        }
}
//local store
class LS{
    //getLSstore
   static getStore(){
        let contact;
        if(localStorage.getItem('contacts')=== null){
            contact = []
        }else{
            contact = JSON.parse(localStorage.getItem('contacts'))
        }
         return contact
        
    }
    //displayLSstore
   static displayStore(){
       const contact = LS.getStore()
       console.log(contact)
        contact.forEach(contact =>{
        const ui = new UiContact()
        ui.displayContact(contact)
    })
    }
    //addLSstore
   static addStore(contact){
       console.log(contact)
        const contacts = LS.getStore()
        contacts.push(contact)
        console.log(contacts)
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }
    //remove store
    static removeStore(phone){
        const contact = LS.getStore()
        if(contact.phone === phone){
            
        }
    }
}

//event area 
document.getElementById('submitBtn').addEventListener('click', (e) =>{
    e.preventDefault()
    let name = document.getElementById('nameInput').value
        email = document.getElementById('emailInput').value
        phone = document.getElementById('numberInput').value
    
    const contact = new Contact(name, email, phone)
    const ui = new UiContact()
   
    if(name === '' || email === '' || phone === ''){
        alert("Enter Your Input Filed")
    }else{
        ui.displayContact(contact)
        LS.addStore(contact)
        ui.clearFiled()
    }
})
//delete event
document.getElementById('contactList').addEventListener('click', (e) =>{
   const ui = new UiContact()
   ui.deleteContact(e.target)
   LS.removeStore(e.target.parentElement.children[2].textContent)

})
//search bar
document.getElementById('searchBar').addEventListener('keyup', (e) =>{
    const ui = new UiContact()
    ui.searchBar(e.target.value)
})
//dom 
document.addEventListener('DOMContentLoaded', ()=>{
    LS.displayStore()
})