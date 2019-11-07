var btn = document.querySelector('.carshop');
var list = document.querySelector('.listCartR');


function handleClick(){
    list.classList.toggle('listCartR--active');
    btn.classList.toggle('carshop--active');
  
   
}

btn.addEventListener('click', handleClick);


