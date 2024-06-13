let animateInFadeParent = document.querySelector(".animateInFade");
let animateInFadeText = document.querySelector(".animateInFadeText");

window.onscroll = function() {scrollCheck()};
function scrollCheck() {
    if(window.pageYOffset >= animateInFadeParent.offsetTop){
animateInFadeText.classList.remove("fadeIn");
    }
    else{
        animateInFadeText.classList.add("fadeIn")
    }
}