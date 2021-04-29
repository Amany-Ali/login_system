// inputs
let signInEmail = document.getElementById("signinEmail");
let signInPassword = document.getElementById("signinPassword");
let signUpName = document.getElementById("signupName");
let signUpEmail = document.getElementById("signupEmail");
let signUpPassword =document.getElementById("signupPassword");
let signUpRepassword =document.getElementById("signupRepassword");

let alertMessage = document.getElementById("alert");

let userContainer;
if(localStorage.getItem("userList") == null){
    userContainer= [];
    }
 else {
     userContainer = JSON.parse(localStorage.getItem("userList"));
     }


     ///........................................sign up........................... //
function signUp() {
    if(checkInputs() == true){
        if(validEmail()== true && validName()== true && validPassword()== true && confirmPass()== true){
            if(isEmailExist()==false) {
                document.getElementById('alert').innerHTML = '<span class="text-danger m-3">email is already exist</span>';
                    document.getElementById("hint").innerHTML = '';
                }
                else {
                    let user ={
                        name: signUpName.value,
                        email : signUpEmail.value,
                        password : signUpPassword.value 
                    }
                    userContainer.push(user);
                    localStorage.setItem("userList",JSON.stringify(userContainer));
                    document.getElementById('alert').innerHTML = '<span class="m-3">Success</span>';
                    alertMessage.style.color ="green";
                    document.getElementById("hint").innerHTML = "";
                
                }
        
    }
        else {
            
            if(validEmail()== false && validName()==true && validPassword()==true ){
                document.getElementById('alert').innerHTML = '<span class="text-danger m-3">Email is not valid</span>';
                document.getElementById("hint").innerHTML = '<span class="text-white m-3">Hint : </span> example43@yahoo.com ';
            }
            else if(validName()==false && validEmail()== true && validPassword()==true){
                document.getElementById('alert').innerHTML = '<span class="text-danger m-3">Name is not valid</span>';
                document.getElementById("hint").innerHTML = '<span class="text-white m-3">Hint : </span> harry-potter';
            }
            else if (validEmail()== true && validName()==true && validPassword()==false){
                document.getElementById('alert').innerHTML = '<span class="text-danger m-3">Password is not valid</span>';
                document.getElementById("hint").innerHTML = '<span class="text-white m-3">Hint : </span> hArry-787@ ';
            }
            else if (confirmPass()== false){
                document.getElementById('alert').innerHTML = '<span class="text-danger m-3">re-write pass again</span>';
                document.getElementById("hint").innerHTML = '';
            }
            else {
                document.getElementById('alert').innerHTML = '<span class="text-danger m-3">All inputs are not valid</span>';
                document.getElementById("hint").innerHTML = '';
            }
        }
    }
    else {
       showAlert();
    }

}

function showAlert(){
    document.getElementById('alert').innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
    
}
// check if user forget full any input
function checkInputs(){
    if(signUpPassword.value != "" && signUpName.value != "" && signUpEmail.value != "" && signUpRepassword.value != ""){
        return true;
    }
    else {
        return false;
    }
}

// email validation
function validEmail(){
    var emailregex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(emailregex.test(signUpEmail.value)== true){
        return true;
    }
    else {
        return false;
    }
}

// name validation

function validName(){
    var nameregex = /^[a-zA-Z\-\’]+$/;
    if(nameregex.test(signUpName.value)== true){
        return true;
    }
    else {
        return false;
    }
}

//pasword validation 
function validPassword(){
    var passregex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if(passregex.test(signUpPassword.value)== true){
        return true;
    }
    else {
        return false;
    }
}

//confirm password 
function confirmPass(){
    if(signUpPassword.value == signUpRepassword.value){
        return true;
    }
    else {
        return false;
    }
}

// // check if email is exist
function isEmailExist() {
    for (var i = 0; i < userContainer.length; i++) {
                if (userContainer[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
                    return false;
                }
                else{
                    return true;
                }
    }
    return true;
}





// // ..................................... for login.....................................
// //for check inputs is empty or not
function isLoginEmpty() {
    if (signInPassword.value == "" && signInEmail.value == "") {
        return false;
    } else {
        return true;
    }
}

let pathparts = location.pathname.split('/');
let baseURL = '';
for (let i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i];
}
console.log(baseURL);

// to say welcome in home page
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML =  "Welcome " +username;
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false;
    }
    var password = signInPassword.value
    var email = signInEmail.value
    for (var i = 0; i < userContainer.length; i++) {
        if (userContainer[i].email.toLowerCase() == email.toLowerCase() && userContainer[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', userContainer[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html');
               

            } else {
                location.replace(baseURL + '/home.html');
                document.getElementById('username').innerHTML = userContainer[i].name;
            }
            return;
        }
         else if(userContainer[i].email.toLowerCase() != email.toLowerCase() || userContainer[i].password.toLowerCase() != password.toLowerCase()) {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>';
        }
    }

}

// for logout
function logout() {
    localStorage.removeItem('sessionUsername');
}



// // all inputs
// // var signupName = document.getElementById('signupName')
// // var signupEmail = document.getElementById('signupEmail')
// // var signupPassword = document.getElementById('signupPassword')
// // var signinEmail = document.getElementById('signinEmail')
// // var signinPassword = document.getElementById('signinPassword')
// //     // to get base url (localhost)
// // var pathparts = location.pathname.split('/');
// // var baseURL = ''
// // for (var i = 0; i < pathparts.length - 1; i++) {
// //     baseURL += '/' + pathparts[i]
// // }
// // console.log(baseURL);

// // // to say welcome in home page
// // var username = localStorage.getItem('sessionUsername')
// // if (username) {
// //     document.getElementById('username').innerHTML = "Welcome " + username
// // }









// // // for check email is exist
// // function isEmailExist() {
// //     for (var i = 0; i < signUpArray.length; i++) {
// //         if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
// //             return false
// //         }
// //     }
// // }





// // function signUp() {
// //     if (isEmpty() == false) {
// //         document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
// //         return false
// //     }
// //     // to store all value as object
// //     var signUp = {
// //         name: signupName.value,
// //         email: signupEmail.value,
// //         password: signupPassword.value,
// //     }
// //     if (signUpArray.length == 0) {
// //         signUpArray.push(signUp)
// //         localStorage.setItem('users', JSON.stringify(signUpArray))
// //         document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
// //         return true
// //     }
// //     if (isEmailExist() == false) {
// //         document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

// //     } else {
// //         signUpArray.push(signUp)
// //         localStorage.setItem('users', JSON.stringify(signUpArray))
// //         document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

// //     }


// // }




// // // ============= for login================
// // //for check inputs is empty or not
// // function isLoginEmpty() {

// //     if (signinPassword.value == "" || signinEmail.value == "") {
// //         return false
// //     } else {
// //         return true
// //     }
// // }

// // function login() {
// //     if (isLoginEmpty() == false) {
// //         document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
// //         return false
// //     }
// //     var password = signinPassword.value
// //     var email = signinEmail.value
// //     for (var i = 0; i < signUpArray.length; i++) {
// //         if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
// //             localStorage.setItem('sessionUsername', signUpArray[i].name)
// //             if (baseURL == '/') {
// //                 location.replace('https://' + location.hostname + '/home.html')

// //             } else {
// //                 location.replace(baseURL + '/home.html')

// //             }
// //         } else {
// //             document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
// //         }
// //     }

// // }




// // // for logout
// // function logout() {
// //     localStorage.removeItem('sessionUsername')
// }