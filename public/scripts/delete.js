
var clear = document.querySelector('.buttonCartC');

clear.addEventListener('click', function(event){
    event.preventDefault();
    store.deleteAll();

});
