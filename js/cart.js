
// hàm convert tiền tệ 
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

function getProductInfo(productId, optionId) {
    console.log("run");
    let productList = JSON.parse(localStorage.getItem('listProducts'));
    for (let i in productList) {
        if (productList[i].id == productId) {
            for (let j in productList[i].options) {
                if (optionId == productList[i].options[j].id) {
                    productList[i].imgOption = productList[i].options[j].icon;
                    console.log(productList[i]);
                    break;
                }
            }
            return productList[i];

        }
    }

}
function showCartUser() {

    let idLogin = localStorage.getItem("checkLogin");
    let listUsers = JSON.parse(localStorage.getItem("listUser"));
    if (idLogin == null) {
        window.location.href = "./html/login.html";
    } else {
        let user = listUsers.find((item) => {
            return item.idUser == idLogin;
        })

        let cartUser = user.cartUser;

        let result = "";
        if (cartUser.length == 0) {
            document.querySelector(".note").style.display = "block";
            document.querySelector(".container").style.display = "none";
        } else {
            document.querySelector(".note").style.display = "none";
            // showCartUser()
            for (let n = 0; n < cartUser.length; n++) {
                let getProductInfoValue = getProductInfo(cartUser[n].productId, cartUser[n].idOption);
                console.log(getProductInfoValue);
                result +=
                    `
                    <tr>
                        <td>${n + 1}</td>
                        <td>${getProductInfoValue.name}</td>
                        <td><img src="../${getProductInfoValue.imgOption}" alt=""></td>
                        <td>${USDollar.format(getProductInfoValue.price)}</td>
                        <td class="quantity">
                            <i onclick="decrease('${cartUser[n].productId}','${cartUser[n].idOption}' )" class="fa-solid fa-minus"></i>
                            ${cartUser[n].quantity}
                            <i onclick="increase('${cartUser[n].productId}','${cartUser[n].idOption}')"" class="fa-sharp fa-regular fa-plus"></i>
                        </td>
                        <td>${USDollar.format(getProductInfoValue.price * cartUser[n].quantity)}</td>
                        <td><i class="fa-solid fa-trash-can" onclick="deleteProduct('${cartUser[n].productId}','${cartUser[n].idOption}')"></i></td>
                    
                    </tr>
                    `


            }

            document.getElementById("renderProduct").innerHTML =
                `
                    <tr>
                        <th>No</th>
                        <th>Name Product</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Delete</th>
                    </tr>
                    
                ${result}
     
                    
                `
            result = "";
        }
    }
}
showCartUser();

//function tang so luong san pham
function increase(productId, idOption) {
    console.log("đã vào", productId, idOption)
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let idLogin = localStorage.getItem("checkLogin");
    for (let i = 0; i < listUser.length; i++) {
        if (idLogin == listUser[i].idUser) {
            for (let j = 0; j < listUser[i].cartUser.length; j++) {
                if (productId == listUser[i].cartUser[j].productId && idOption == listUser[i].cartUser[j].idOption) {
                    console.log("đã vào")
                    listUser[i].cartUser[j].quantity++;
                    localStorage.setItem("listUser", JSON.stringify(listUser)); // save to local
                    showCartUser();
                    showTotalCartProduct();
                    totalPrice();
                    return;
                }
            }
        }

    }


}
function decrease(productId, idOption) {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let idLogin = localStorage.getItem("checkLogin");
    for (let i = 0; i < listUser.length; i++) {
        if (idLogin == listUser[i].idUser) {
            for (let j = 0; j < listUser[i].cartUser.length; j++) {
                if (productId == listUser[i].cartUser[j].productId && idOption == listUser[i].cartUser[j].idOption) {


                    if (listUser[i].cartUser[j].quantity == 1) {
                        if (confirm("Bạn có muốn xóa không ?")) {
                            listUser[i].cartUser.splice(j, 1);
                        }
                    } else {
                        listUser[i].cartUser[j].quantity--;
                    }
                    localStorage.setItem("listUser", JSON.stringify(listUser)); // save to local
                    showCartUser();
                    showTotalCartProduct();
                    totalPrice();
                    return;
                }
            }
        }

    }

    // localStorage.setItem("cartTotal",JSON.stringify())
}

function backArrow() {
    window.location.href = "../index.html"
}

function deleteProduct(productId, idOption) {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let idLogin = localStorage.getItem("checkLogin");

    for (let i = 0; i < listUser.length; i++) {
        if (idLogin == listUser[i].idUser) {
            // lấy cart user ra để lọc những item khác nhau
            for (let j = 0; j < listUser[i].cartUser.length; j++) {
                if (productId == listUser[i].cartUser[j].productId && idOption == listUser[i].cartUser[j].idOption) {


                    listUser[i].cartUser.splice(j, 1);
                    localStorage.setItem("listUser", JSON.stringify(listUser)); // save to local
                    showCartUser();
                    showTotalCartProduct();
                    totalPrice();
                    return;
                }
            }
            return
        }
    }


}

function showTotalCartProduct() {

    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let checkIsLogin = localStorage.getItem("checkLogin");
    let user = listUser.find((item) => {
        return item.idUser == checkIsLogin
    })

    let cartUser = user.cartUser;

    let total = cartUser.reduce((total, curreValue) => {
        return total += curreValue.quantity;
    }, 0)

    // localStorage.setItem("cartTotal", user.cartUser.length);
    document.querySelector(".totalQuantity").innerHTML = `Total quantity: ${total} items`;
}
showTotalCartProduct()

// hàm tính total sản phẩm
function totalPrice() {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let checkIsLogin = localStorage.getItem("checkLogin");
    let user = listUser.find((item) => {
        return item.idUser == checkIsLogin
    })

    let cartUser = user.cartUser;

    let totalPrice = 0;
    for (let i in cartUser) {
        totalPrice += getProductInfo(cartUser[i].productId, cartUser[i].idOption).price * cartUser[i].quantity;
    }
    document.querySelector(".totalPrice").innerHTML = `Subtotal : ${USDollar.format(totalPrice)} `
    // showCartUser()


}
totalPrice()
function ShippingNow() {
    window.location.href = "../html/checkout.html"

}
