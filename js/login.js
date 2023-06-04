
//function validate dinh dang cua email 
let valueEmail = document.getElementById("valueEmail").value;
function isEmail(valueEmail) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valueEmail);
}

function myFunction(param) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = param;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
function loginUser() {
    let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
    let valueEmail = document.getElementById("valueEmail").value;
    let valuePassword = document.getElementById("valuePassword").value;
    let checkEmail = isEmail(valueEmail);
    if (!checkEmail == false) {
        myFunction("Please check your Email !")

    }
    let UserInfor = {
        email: valueEmail,
        password: valuePassword
    }
    for (let i = 0; i < listUser.length; i++) {
        if (valueEmail == listUser[i].email && valuePassword == listUser[i].password) {
            myFunction("Logged in successfully!")
            localStorage.setItem("checkLogin", listUser[i].idUser)
            document.querySelector(".container-all").style.opacity = 0.5;
            function changePage() {
                window.location.href = "../index.html";
            }
            setTimeout(changePage, 1000)
            return;
        }

    }
    myFunction("Please check your Email or Password!")
}
function registerPage() {
    window.location.href = "../html/register.html"
}

