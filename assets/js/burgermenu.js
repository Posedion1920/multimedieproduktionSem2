//burger menu
const dropDowns = document.querySelectorAll(".fa-arrow-down");
const dropDownElements1 = document.querySelector(".tilmeldDropdown");
const dropDownElements2 = document.querySelector(".praktiskDropdown");

const navBar = document.querySelector(".navBurger");

dropDowns[0].addEventListener("click",function(e){
    dropDownElements1.classList.toggle("show");
})

dropDowns[1].addEventListener("click",function(e){
    dropDownElements2.classList.toggle("show");
})


const burgerMenuIkon = document.querySelector(".fa-bars");
const nav = document.querySelector(".mobileNav");
burgerMenuIkon.addEventListener("click",function(e){
    navBar.classList.toggle("show")
})

getCategory(13)
.then(data=> makeLabelsNdUpdate(data))