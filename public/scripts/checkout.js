window.addEventListener("load", function() {
  var modalBtn = document.querySelector(".btnAddBuy__buyFrame");
  var modal2Btn = document.querySelector(".buttonCartB");
  var modal = document.querySelector(".modal");
  var modal__frameRBA = document.querySelector(".modal__frameRBA");
  var modal__frameR = document.querySelector(".modal__frameR");
  var listCart = document.querySelector(".listCartR");
  var form = document.querySelector(".frameL__bottom");
  var form2 = document.querySelector(".frameL__bottomBuyall");
  var Hmenu = document.querySelector(".Hmenu");
  var nameInput = document.querySelector(".bottom__input");


  function HandleOpenMenu() {
    listCart.classList.remove("listCartR--active");
  }

  Hmenu.addEventListener("click", HandleOpenMenu);

  form2.addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(form2);
    var data = new URLSearchParams(formData);

    var promise = fetch("/ordersbuyall", { method: "POST", body: data });

    promise
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  });

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(form);
    var data = new URLSearchParams(formData);

    var promise = fetch("/ordersbuynow", { method: "POST", body: data });
    promise
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  });

  var wrapper = document.querySelector(".wrapperP");
  var carshop = document.querySelector(".carshop");
  function handleOpenModal() {
    wrapper.classList.add("wrapperP--active");
    carshop.classList.add("carshop--active");
    document.body.classList.add("noscroll");
    modal.classList.add("modal--active");

    setTimeout(function() {
      modal.classList.add("modal--show");
    }, 100);
  }
  modalBtn.addEventListener("click", handleOpenModal);
  modal2Btn.addEventListener("click", handleOpenModal);

  function handleChangeFrameR() {
    modal__frameRBA.classList.add("modal__frameRBA--active");
    modal__frameR.classList.add("modal__frameR--active");
    listCart.classList.add("listCartR--close");
    form.classList.add("frameL__bottom--close");
    form2.classList.add("frameL__bottomBuyall--active");
  }

  modal2Btn.addEventListener("click", handleChangeFrameR);

  function handleCloseModal(event) {
    if (event.target == modal) {
      wrapper.classList.remove("wrapperP--active");
      carshop.classList.remove("carshop--active");
      document.body.classList.remove("noscroll");
      modal.classList.remove("modal--show");
      listCart.classList.remove("listCartR--close");
      listCart.classList.remove("listCartR--active");

      setTimeout(function() {
        modal.classList.remove("modal--active");
        modal__frameRBA.classList.remove("modal__frameRBA--active");
        modal__frameR.classList.remove("modal__frameR--active");
        form.classList.remove("frameL__bottom--close");
        form2.classList.remove("frameL__bottomBuyall--active");
      }, 200);
    }
  }
  modal.addEventListener("click", handleCloseModal);
});
