var btn = document.querySelector(".carshop");
var list = document.querySelector(".listCartR");
var renderProductsCart = document.querySelector(".buttonCartB");
var productsBAdded = document.querySelector(".productsBAdded");
var btnAddBuy__buyFrame = document.querySelector("#areProducts");



var products = [];

function handleAreProducts() {
  
  if (products.length == 0) {
    console.log("Hay productos?");
    alert("You don't have any product to buy");
  }
}
btnAddBuy__buyFrame.addEventListener("click", handleAreProducts);

var clear = document.querySelector(".buttonCartC");

clear.addEventListener("click", function(event) {
  event.preventDefault();
  store.deleteAll();
  products = [];
});

function handleClick() {
  list.classList.toggle("listCartR--active");
  btn.classList.toggle("carshop--active");
}

btn.addEventListener("click", handleClick);

function handleDrawAddedP() {
  console.log(products.length);
  console.log(products);
  products = store.products;
  var duplicateProducts = [];

  productsBAdded.innerHTML = "";

  products.forEach(p => {
    let found = false;
    duplicateProducts.forEach(duplicateProduct => {
      if (duplicateProduct.name == p.name) {
        found = true;
      }
    });
    if (!found) {
      duplicateProducts.push(p);
      var element = document.createElement("div");
      element.classList.add("generalproductAdd");
      productsBAdded.appendChild(element);
      element.innerHTML = `
          <div class="btndeleteP"><a class="btndeleteP__btn" data-name="${p.id}"><img class="imgbtndelete"
          src="/images/add.png" alt=""></a>
          </div>
          
          <img class="counterPcont" src="/images/number.png" alt="">
          <p class="count" style="z-index:999;">${p.cont}</p>
          
          
          <a href="/product/${p.id}/${p.danger}"> <img class="imgProductAdd" src="${p.image}" alt=""></a>
          
          <a class="name" href="/product/${p.id}/${p.danger}">${p.name}</a>
          <p class="pricePadd">$${p.price}</p>`;

      var deleteBtn = element.querySelector(".btndeleteP__btn");
      deleteBtn.addEventListener("click", () => {
        console.log("entro");

        store.delete(p);
        productsBAdded.removeChild(element);
        console.log(products.length);  
       
        /*
          store.delete(p);
          productsBAdded.removeChild(element);
          console.log(products.length);  
        */
      
      });
    }

    
  });
}

renderProductsCart.addEventListener("click", handleDrawAddedP);
