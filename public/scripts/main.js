var btn = document.querySelector(".nav-responsive__logo");
var nav = document.querySelector(".mainnav");
var content = document.querySelector(".wrapcontent");
var content2 = document.querySelector(".wrapcontent2");
var layer = document.querySelector(".layer");
var overflow = document.querySelector(".bodyOverflow");

var btnWhere = document.querySelector(".wherewe");
var img = document.querySelector('.spacecenter__img');

var range = document.querySelector('.input');
var specifi = document.querySelector(".gunspecifi__descriptionimg");
var specifibg = document.querySelector(".gunspecifi__bgimg")


var btnright = document.querySelector(".conteiner__nextimg");
var imgpics = document.querySelector(".pic__img");
var counter2 = 0;

function handleRange(){
  specifi.style.opacity = range.value / 100;
  if(range.value==0){
    specifibg.style.opacity  = 1;
  }
  if(range.value>=30 && range.value<=100){
    specifibg.style.opacity=0;
  }
}
range.value = 0;
range.addEventListener('input', handleRange);

var counter = 0;

function handleClick() {
  nav.classList.toggle("mainnav--active");
  btn.classList.toggle("nav-responsive__logo--active");
  content.classList.toggle("wrapcontent--active");
  content2.classList.toggle("wrapcontent2--active");
  layer.classList.toggle("layer--active");
  overflow.classList.toggle("bodyOverflow--active");
}



btn.addEventListener("click", handleClick);

function handleClickOnWherewe(event){
  counter++;
  if(counter==1){
    img.setAttribute('src',"/images/shlimy.png");
    
  }
  if(counter==2){
    img.setAttribute('src', "/images/spacecenter.png");
    counter=0;
  }
  
  
}

btnWhere.addEventListener("click", handleClickOnWherewe);

function handleClicknext(){
  counter2++;
  if(counter2==0){
    imgpics.setAttribute('src', "/images/scruffy.png");
  }
  if(counter2==1){
    imgpics.setAttribute('src', "/images/puppyhere.png");
  }
  if(counter2==2){
    imgpics.setAttribute('src', "/images/eyesspecimen.png");
  }
  if(counter2==3){
    imgpics.setAttribute('src', "/images/planetform.png");
    counter2=-1;
  }



}

btnright.addEventListener("click", handleClicknext);