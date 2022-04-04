//contact constructor
function Contact(name, email, phone) {
    this.name = name
    this.email = email
    this.phone = phone
}
//contact UI constructor
function UI() { }

//display contact Value
UI.prototype.displayContactValue = function (contact) {
    const list = document.getElementById('contactList')
    const newTr = document.createElement('tr')
    newTr.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td class="btn text-danger text-success delete">x</td>
    `
    list.appendChild(newTr)

}
//delete contact value
UI.prototype.deleteContactValue = function (target) {
    let deleteTostMeg = document.getElementById("ItemDeleTostMeg")
    let removeDeleteTost = () => deleteTostMeg.classList.remove("deleteItemsTostMeg")
    if (target.classList.contains('delete')) {
        if (confirm("Ara You sure!!")) {
            target.parentElement.remove()
            deleteTostMeg.classList.add("deleteItemsTostMeg")
            deleteTostMeg.classList.remove("tost-MegDesp-None")
            setTimeout(removeDeleteTost, 1000)
            deleteTostMeg.classList.add("tost-MegDesp-None")

        }


    }
}
//validation contact value
UI.prototype.clearField = function () {
    document.getElementById('nameInput').value = ''
    document.getElementById("emailInput").value = ''
    document.getElementById('numberInput').value = ''
}

//search value
UI.prototype.searchBar = function (value) {
    const rows = document.querySelectorAll('#contactList tr');
    rows.forEach(row => {
        if (row.children[0].textContent.indexOf(value) != -1) {
            row.style.display = 'table-row'
        } else {
            row.style.display = 'none'
        }
    })


}
//local store
function LS() {
}
// getStor
LS.prototype.getStore = function () {
    let contact;

    if (localStorage.getItem('contacts') === null) {
        contact = []
    } else {
        contact = JSON.parse(localStorage.getItem('contacts'))
    }

    return contact;

}
//display Store
LS.prototype.displayStore = function () {
    const ls = new LS()
    const contacts = ls.getStore()
    contacts.forEach(contact => {
        const ui = new UI()
        ui.displayContactValue(contact)
    })

}
//add Stor
LS.prototype.addStore = function (contact) {
    const ls = new LS()
    const contacts = ls.getStore()
    contacts.push(contact)
    localStorage.setItem('contacts', JSON.stringify(contacts))
}
//remove store
LS.prototype.removeStore = function (phone) {
    const ls = new LS()
    const contacts = ls.getStore()
    contacts.forEach((contact, index) => {
        if (contact.phone === phone) {
            contacts.splice(index, 1)
        }
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
}

/***
Event Area start
***/
document.getElementById('submitBtn').addEventListener("click", function (e) {
    e.preventDefault()
    let name = document.getElementById("nameInput").value;
    email = document.getElementById('emailInput').value;
    phone = document.getElementById('numberInput').value;
    let tostMeg = document.getElementById("tostMeg")
    let removingClass = () => tostMeg.classList.remove("tostMeg");

    //
    const contact = new Contact(name, email, phone)

    const ui = new UI()
    const ls = new LS()

    if (name === '' || email === '' || phone === '') {
        tostMeg.innerText = "FillUp Input"
        tostMeg.classList.add("tostMeg")
        tostMeg.classList.add("text-danger")
        setTimeout(
            removingClass, 1000
        )

    } else {
        ui.displayContactValue(contact)
        ls.addStore(contact)
        ui.clearField()
        tostMeg.classList.add("tostMeg")

        setTimeout(
            removingClass, 1000
        )

    }

})

//delete event
document.getElementById("contactList").addEventListener("click", function (e) {
    const ui = new UI()
    const ls = new LS()
    ui.deleteContactValue(e.target)
    ls.removeStore(e.target.parentElement.children[2].textContent)
})
//search bar
document.getElementById('searchBar').addEventListener('keyup', function (e) {
    const ui = new UI()
    ui.searchBar(e.target.value)
})

//DOM
document.addEventListener("DOMContentLoaded", function () {
    const ls = new LS()
    ls.displayStore()
})
