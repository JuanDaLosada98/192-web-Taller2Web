  
window.addEventListener('load', function(){

    var addBtn = document.querySelectorAll('.btnaddg');
    var countCart = document.querySelector('.carshop__lenght');
    var productsContainer = document.querySelector('.productsAddedC');

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
                    console.log(data.cartList);

                    var element = document.createElement('div');

                    element.innerHTML ="";

                    data.cartList.forEach(product => {


                        

                        element.classList.add('generalproductAdd');
                        element.innerHTML = `
                            <div class="btndeleteP"><a class="btndeleteP__link" data-name="${product._id}"><img class="imgbtndelete"
                                        src="/images/add.png" alt=""></a>
                            </div>
                            <img class="counterPcont" src="/images/number.png" alt="">
                            
                            
                            <a href="/product/${product._id}/${product.danger}"> <img class="imgProductAdd" src="${product.image}" alt=""></a>
                            
                            <a class="name" href="/product/${product._id}">${product.name}</a>
                            <p class="pricePadd">$${product.price}</p>`;

                        productsContainer.appendChild(element);
                        
                        var previous = element.previousSibling;
                        
                        /*

                        while(previous && previous.nodeType !== 1) {
                            previous = previous.previousSibling;
                        }
                        console.log("este es previous "+previous);
                        if(previous) {
                            productsContainer.removeChild(previous);
                        }

                       */
                    });
                }); 

        });

    });

   

});