var btn = document.querySelector(".carshop");
var list = document.querySelector(".listCartR");
var renderProductsCart = document.querySelector(".buttonCartB");
var productsBAdded = document.querySelector(".productsBAdded");

var products = [];

function handleClick() {
  list.classList.toggle("listCartR--active");
  btn.classList.toggle("carshop--active");
}

btn.addEventListener("click", handleClick);

products = store.products;

function handleDrawAddedP() {
  console.log(products);
  productsBAdded.innerHTML = "";
  products.forEach(p => {
    var element = document.createElement("div");
    element.classList.add("generalproductAdd");
    element.innerHTML = `
        <div class="btndeleteP"><a class="btndeleteP__link" data-name="${p.id}"><img class="imgbtndelete"
        src="/images/add.png" alt=""></a>
        </div>
        
        <img class="counterPcont" src="/images/number.png" alt="">
        <h1 class="count" style="z-index:999;">${p.cont}</h1>
        
        
        <a href="/product/${p.id}/${p.danger}"> <img class="imgProductAdd" src="${p.image}" alt=""></a>
        
        <a class="name" href="/product/${p.id}/${p.danger}">${p.name}</a>
        <p class="pricePadd">$${p.price}</p>`;

    productsBAdded.appendChild(element);

    var btn__delete = document.querySelector(".btndeleteP__link");
    btn__delete.addEventListener("click", () => {
      console.log("entro");  
      store.delete(store.getRef(p.id));
    });
  });
}

renderProductsCart.addEventListener("click", handleDrawAddedP);
