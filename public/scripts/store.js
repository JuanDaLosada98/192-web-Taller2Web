  
window.addEventListener('load', function(){

    var addBtn = document.querySelectorAll('.btnaddg');
    var countCart = document.querySelector('.carshop__lenght');
    var productBtn = document.querySelectorAll('.generalproduct');
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

    });

   

});