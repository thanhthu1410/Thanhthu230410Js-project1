// validate check xem Email nhập vào có đúng định dạng hay chưa
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

function uuid() {
    return new Date().getMilliseconds() + Math.floor(Math.random() * 9999)
}
function registerUser() {
    let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
    let valueEmail = document.getElementById("valueEmail").value;
    let valuePassword = document.getElementById("valuePassword").value;
    let valueConfirmPassword = document.getElementById("confirm").value;
    let checkEmail = isEmail(valueEmail);
    if (checkEmail == false) {
        myFunction("Please check your Email!")
        return;
    }

    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].email == valueEmail) {
            　myFunction("This account already exists")
            return;
        }
    }
    let detailUser = {
        email: valueEmail,
        password: valuePassword,
        idUser: uuid(),
        cartUser: []
    }
    if (valueEmail == "" || valuePassword == "" || valueConfirmPassword == "") {
        myFunction("Please check your Information!")
        return;
    }
    if(valuePassword.length < 8){
        myFunction("Error: Password must be at least 8 characters long!")
        return;
    }

    if (valuePassword != valueConfirmPassword) {
        myFunction("Please check your password!");
        return;

    }
    listUser.push(detailUser);
    localStorage.setItem("listUser", JSON.stringify(listUser));
    window.location.href = "login.html"
}
document.querySelector(".buttonnext").addEventListener("click", () => {
    window.location.href = "login.html";
})
