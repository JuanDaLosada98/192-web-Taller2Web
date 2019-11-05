window.addEventListener('load', function(){


    var modalBtn = document.querySelector('.btnAddBuy__buyFrame');
    var modal = document.querySelector('.modal');
    var wrapper = document.querySelector('.wrapperP');
    var carshop = document.querySelector('.carshop');
    function handleOpenModal(){
        wrapper.classList.add('wrapperP--active');
        carshop.classList.add('carshop--active');
        document.body.classList.add('noscroll');
        modal.classList.add('modal--active');
        setTimeout(function(){
            modal.classList.add('modal--show');
        }, 100);
    }
    modalBtn.addEventListener('click', handleOpenModal);

    function handleCloseModal(event){
        if(event.target == modal){
            wrapper.classList.remove('wrapperP--active');
            carshop.classList.remove('carshop--active');
            document.body.classList.remove('noscroll');
            modal.classList.remove('modal--show');
            setTimeout(function(){
                modal.classList.remove('modal--active');
            }, 200);
        }
    }
    modal.addEventListener('click', handleCloseModal);



});