window.addEventListener("load", function () {
  var addBtnVP = document.querySelectorAll(".btnAddBuy__AddText");
  var btnAddBuyB = document.querySelector(".btnAddBuy__Buy");
  var priceData = document.querySelector("#priceData");
  var quantityslice = this.document.querySelector(".quantityslice");
  var containerCount = document.querySelector(".writeCount");

  addBtnVP.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var id = btn.getAttribute("data-name");

      let index = quantityslice.value;
      
      console.log("clickA")
      for (let i = 0; i < index; i++) {
        store.addProducts(id);
      }
    });
  });

  var element = document.createElement("div");
  containerCount.appendChild(element);
  
  btnAddBuyB.addEventListener("click",  (event) => {
    event.preventDefault();
    var id = btn.getAttribute("data-name");

    let index = quantityslice.value;
    console.log("click")
    element.classList.add("countContainer");

    element.innerHTML = `
        <h1 class="count" style="z-index:999;">${index}</h1>
        <h1> $${index*parseInt(priceData.innerHTML.replace("$", ""))} <h1>
        `;


  });
});

//-----------------------------------------------------
/**
 * window.addEventListener('load', function(){

   // var addBtn = document.querySelectorAll('.btnaddg');
   // var countCart = document.querySelector('.carshop__lenght');
    var addBtnVP = document.querySelectorAll('.btnAddBuy__AddText');
  /*
    addBtn.forEach(function (btn) {



        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');

            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    countCart.innerText = data.cartLength;
                });

        });

    });*/
/*
    addBtnVP.forEach(function (btn) {

        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');

            store.addProducts(id);


          /*
            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    countCart.innerText = data.cartLength;
                });*/
/*
        });

    });





});
*/
