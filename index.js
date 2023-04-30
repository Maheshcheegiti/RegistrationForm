// form Validation
const  email = document.getElementById("email");
email.addEventListener('input', () => validateEmail(email));

const password = document.getElementById("password");
password.addEventListener('input', () => validatePassword(password));

const submit = document.getElementById('submit');
submit.addEventListener('click', () => validateAll());

const dob = document.getElementById('dob');
dob.addEventListener('input', () => validateAge(dob));

const acceptTerms = document.getElementById('acceptTerms');

function validateEmail(element){
    if(element.validity.typeMismatch){
        element.setCustomValidity("The Email is not in the right format!!!");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

function validatePassword(element){
    if(element.value.length < 8){
        element.setCustomValidity("Password must be greater than 8 characters");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

function validateAge(element) {
    const dob = new Date(element.value);
    const today = new Date();
    const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (age >= 18 && age <= 55) {
        element.setCustomValidity('');
    } else {
        element.setCustomValidity("Invalid age. Please enter a date of birth between 18 and 55 years ago");
        element.reportValidity();
    }
}

function validateAcceptTerms(element){
    if(!element.checked){
        element.setCustomValidity("Please Check the box to accept Terms & Conditions");
        element.reportValidity();
    }else{
        element.setCustomValidity('');
    }
}

function validateAll(){
    validateEmail(email);
    validatePassword(password);
    validateAge(dob);
    validateAcceptTerms(acceptTerms);
}

// local Storage to display entries
let userform = document.getElementById("user-form")

const retrieveEntries = () =>{
    let entries = localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    }
    else{
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () =>{
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passCell = `<td>${entry.pass}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        let terms = "Not Accepted";
        if(entry.chkbtn){
            terms = "Accepted"
        }
        const chkbtnCell = `<td>${terms}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passCell} ${dobCell} ${chkbtnCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table id="table"><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>DOB</th>
    <th>Accepted Terms?</th>
    </tr>${tableEntries}</table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveUserForm = (event) =>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const chkbtn = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        pass,
        dob,
        chkbtn
    };
 
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();    
    formClear();
}
userform.addEventListener('submit',saveUserForm);
displayEntries();


function formClear(){
    document.getElementById('user-form').reset();
}

function localStorageClear(){
    if(confirm("Do you want to clear Local Storage..!")){
        localStorage.clear();
    }
}