  
window.addEventListener('load', function(){

     var addBtnVP = document.querySelectorAll('.btnAddBuy__AddText');

     var quantityslice = this.document.querySelector(".quantityslice");
     
     addBtnVP.forEach(function (btn) {
         
         btn.addEventListener('click', function(event){
             event.preventDefault();
             var id = btn.getAttribute('data-name');
             
             let index = quantityslice.value;

             for (let i = 0; i < index; i++) {
                store.addProducts(id);
             }

           

         });
 
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