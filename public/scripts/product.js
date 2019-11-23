window.addEventListener("load", function() {
  var addBtnVP = document.querySelectorAll(".btnAddBuy__AddText");
  var btnAddBuyB = document.querySelector(".btnAddBuy__Buy");
  var priceData = document.querySelector("#priceData");
  var quantityslice = this.document.querySelector(".quantityslice");
  var containerCount = document.querySelector(".writeCount");
  var containerT = document.querySelector(".totalPiceM");

  addBtnVP.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      event.preventDefault();
      var id = btn.getAttribute("data-name");

      let index = quantityslice.value;

      console.log("clickA");
      for (let i = 0; i < index; i++) {
        store.addProducts(id);
      }
    });
  });

  var element = document.createElement("div");
  var element2 = document.createElement("div");
  containerCount.appendChild(element);
  containerT.appendChild(element2);

  if(btnAddBuyB){

    btnAddBuyB.addEventListener("click", event => {
      event.preventDefault();
      var id = btn.getAttribute("data-name");
  
      let index = quantityslice.value;
      console.log("click");
      element.classList.add("countContainer");
      element2.classList.add("tContainer");
  
      element.innerHTML = `
          <p class="count" style="z-index:999;">${index}</p>
          `;
  
      element2.innerHTML = `
          <p class="totalM" >TOTAL: $${index * parseInt(priceData.innerHTML.replace("$", ""))} </p>
          `;
    });
  }
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
