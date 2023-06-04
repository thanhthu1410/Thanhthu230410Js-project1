
function getProductInfo(productId, optionId) {
    let productList = JSON.parse(localStorage.getItem('listProducts'));
    for (let i in productList) {
        if (productList[i].id == productId) {
            for (let j in productList[i].options) {
                if (optionId == productList[i].options[j].id) {
                    productList[i].imgOption = productList[i].options[j].icon;
                    break;
                }
            }
            return productList[i]
        }
    }
}
function renderListProduct(params) {

    let result = "";
    for (let i = 0; i < params.length; i++) {
        for (let j in params[i].options) {
            result += `
            <div class="renderProduct">
            <div class="item-img">
                <img src=".${params[i].options[j].icon}" alt="">
            </div>
            <div class="item-detail">
                <h5>${params[i].name}</h5>
                <p>Price: ${params[i].price}</p> <br>
                <p class="quantity-edit">
                    <span onclick="increase(${params[i].options[j].id})" class="material-symbols-outlined">
                        add
                    </span> 
                        ${params[i].options[j].stock}
                    <span onclick = "decrease(${params[i].options[j].id})" class="material-symbols-outlined">
                        remove
                    </span>
                </p>
            </div>
        </div>
            `
        }
    }
    document.querySelector(".renderListProduct").innerHTML = result;
}
renderListProduct(JSON.parse(localStorage.getItem("listProducts")))


function increase(idoption) {
    console.log(idoption);
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    for (let i in listProducts) {
        for (let j in listProducts[i].options) {
            if (listProducts[i].options[j].id == idoption) {
                listProducts[i].options[j].stock++
            }
        }
    }
    localStorage.setItem("listProducts", JSON.stringify(listProducts));
    renderListProduct(JSON.parse(localStorage.getItem("listProducts")))
}

function decrease(idoption) {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    for (let i in listProducts) {
        for (let j in listProducts[i].options) {
            if (listProducts[i].options[j].id == idoption) {
                if (listProducts[i].options[j].stock == 0) {
                    listProducts[i].options[j].stock == 0;
                } else {
                    listProducts[i].options[j].stock--
                }
            }
        }

    }
    localStorage.setItem("listProducts", JSON.stringify(listProducts));
    renderListProduct(JSON.parse(localStorage.getItem("listProducts")))
}
// mã hóa img tải lên 

function changeImage(element) {
    console.log("11111", element);
    var file = element.files[0];
    console.log("file", file.size);
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT', reader.result);
        localStorage.setItem("image", reader.result);
        readerImage()
    }
    reader.readAsDataURL(file);
}
function readerImage() {
    let result = localStorage.getItem("image");
    // console.log("22222", result);
    document.getElementById("changeImg12").src = result;
}
readerImage();

// function tai anh len cua options color
function uuid() {
    return new Date().getMilliseconds() + Math.floor(Math.random() * 65865945475675);

}
let images = [];
function changeImage1(element) {

    console.log("11111", element);
    var file = element.files;

    for (let i = 0; i < file.length; i++) {
        let reader = new FileReader();
        reader.onload = function () {

            localStorage.setItem(`image${i}`, reader.result);
            images.push(reader.result);
            readerImage1()
        }

        reader.readAsDataURL(file[i]);
    }
    setTimeout(() => {
        saveImage();
    }, 2000);

}
function saveImage() {

    localStorage.setItem("listImages", JSON.stringify(images))
}
function readerImage1() {
    console.log(5555);
    let result = localStorage.getItem("image1");

    document.getElementById("option1").src = result;
}
readerImage1();

function addProduct() {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let valueImage = localStorage.getItem("image");
    let valueName = document.querySelector(".nameProduct").value;
    let valuePrice = document.querySelector(".priceProduct").value;
    let valueNameList = document.querySelector(".nameList").value;
    // options color
    let listImages = JSON.parse(localStorage.getItem("listImages"))
    let inforNewProduct = {
        name: valueName,
        img: valueImage,
        id: uuid(),
        nameList: valueNameList,
        price: Number(valuePrice),
        options: [...listImages]

    }

    for (let i = 0; i < inforNewProduct.options.length; i++) {
        inforNewProduct.options[i] = {
            icon: inforNewProduct.options[i],
            id: uuid(),
            stock: 5
        }

    }
    console.log(inforNewProduct);

    listProducts.push(inforNewProduct)

    localStorage.setItem("listProducts", JSON.stringify(listProducts))

}

//function search product
function searchProduct() {
    console.log("search");
    let listProducts = JSON.parse(localStorage.getItem("listProducts"))
    console.log(listProducts);
    let valueSearch = document.getElementById("valueSearch").value;
    let userSearch = listProducts.filter(item => {
        return item.name.toUpperCase().includes(valueSearch.toUpperCase())
    })
    renderListProduct(userSearch);
};

//function hien thi ra phan updateProduct trong stock
function showAddProduct() {
    let addNewProduct = document.querySelector(".addProduct")
    addNewProduct.classList.toggle("newClassAddProduct")
}

function showListCustomers() {
    let showListHistory = document.querySelector(".renderListCustomers")
    showListHistory.classList.toggle("newClassShowHistory")

    showTest();

}

function showTest() {
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    const targetElement = document.querySelector(".listProduct");
    let targetElementContent = ``;

    for (let i in listUser) {
        let itemProduct = ``;
        if (listUser[i].puschaseHistory == null) {

            itemProduct += `<p > Chua tung mua hang</p>`
            continue;
        } else {
            for (let j in listUser[i].puschaseHistory) {

                itemProduct +=
                    `
                    <div class="container-detail-product">
                        <p class = "img"> <img src=".${listUser[i].puschaseHistory[j].src}" alt=""> </p>
                        <div class="detail-product-puschase">
                        <p>${listUser[i].puschaseHistory[j].name}  </p> <br>
                        <p>Quantity:  ${listUser[i].puschaseHistory[j].quantity}</p>
                        </div>
                     </div>            
             
                 `
            }
        }

        // tao ra khung render list cho tung nguoi
        targetElementContent +=
            `   <div class="renderList" >
                <p class = "nameUser">Name : ${listUser[i].inforCustomer.valueName} </p>
                <p>Address: ${listUser[i].inforCustomer.valueAddress}</p>
                <div class="itemProduct">
                    ${itemProduct}
                </div>
            </div>
        `
    }
    targetElement.innerHTML = targetElementContent;
}

function backToHomePage() {
    window.location.href = "http://127.0.0.1:5500/"
}