class Store {

    constructor() {
        this.renderStorage = document.querySelector('.productsAddedC');
        this.products = [];

        this.renderAddBtn = document.querySelectorAll('.btnaddg');
        this.renderCountCart = document.querySelector('.carshop__lenght');
    }

    addProducts(product) {
        this.addProductServer(product, () => {
            this.products.push(product);
            this.renderCountCart.innerHTML = this.products.length;
            this.update();
        });
    }

    delete(product) {
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.update();
    }

    update() {
        var duplicateProducts = [];
        this.renderStorage.innerHTML = "";
        this.products.forEach(product => {
            let found = false;
            duplicateProducts.forEach(duplicateProduct => {
                if (duplicateProduct.name == product.name) {
                    duplicateProduct.cont++;
                    found = true;
                }
            })
            if (!found) {
                duplicateProducts.push(product);
            }

        })
        duplicateProducts.forEach(duplicateProduct => {
            this.renderStorage.appendChild(duplicateProduct.render());

        })
    }

    addProductServer(product, load) {
        var promise = fetch('/api/cart/' + product.id, {
            method: 'POST'
        });

        promise
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.cartList);
                if (load) {
                    load();
                }
            });
    }

    removeProductServer(product, load) {
        var promise = fetch('/api/cart/' + product.id, {
            method: 'REMOVE'
        });

        promise
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.cartList);
                if (load) {
                    load();
                }
            });

    }

    updateServer() {

    }

    configStore() {
        this.renderAddBtn.forEach(function (btn) {

            btn.addEventListener('click', function (event) {
                event.preventDefault();
                var id = btn.getAttribute('data-name');


            });

        });
    }





}

class Product {
    constructor(id, image, name, price, store) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.element = document.createElement('div');
        this.store = store;
        this.element.classList.add('generalproductAdd');
        this.createView();
        this.cont = 1;
    }
    createView() {
        this.element.innerHTML = `
        <div class="btndeleteP"><a class="btndeleteP__link" data-name="${this.id}"><img class="imgbtndelete"
        src="/images/add.png" alt=""></a>
        </div>
        <img class="counterPcont" src="/images/number.png" alt="">
        <h1>${this.cont}</h1>
        
        
        <a href="/product/${this.id}"> <img class="imgProductAdd" src="${this.image}" alt=""></a>
        
        <a class="name" href="/product/${this.id}">${this.name}</a>
        <p class="pricePadd">$${this.price}</p>`;

        var btn__delete = this.element.querySelector(".btndeleteP__link");
        btn__delete.addEventListener("click", () => {
            this.delete();
        })

    }

    render() {
        return this.element;
    }

    delete() {
        this.store.delete(this);
    }
}