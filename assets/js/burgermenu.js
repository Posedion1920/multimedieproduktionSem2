getCategory(13)
.then(data=> makeLabelsMobile(data))

getCategory(13)
.then(data=> MakeLabelsDesc(data))

const dropDowns = document.querySelectorAll(".fa-angle-down");
for(let i = 0;  i< dropDowns.length;i++){
    dropDowns[i].style.color= "white";
}
const dropDownElements1 = document.querySelector(".tilmeldDropdown");
const dropDownElements2 = document.querySelector(".praktiskDropdown");
const megaMenu = document.querySelector("#hideMegaMenu");
const navBar = document.querySelector(".navBurger");
const dropDown = document.querySelector("#dropDownMenu");

dropDowns[0].addEventListener("click",function(e){
    dropDowns[0].classList.toggle("downArrow");
    dropDownElements1.classList.toggle("show");
})

dropDowns[1].addEventListener("click",function(e){
    dropDownElements2.classList.toggle("show");
    dropDowns[1].classList.toggle("downArrow");
})


const burgerMenuIkon = document.querySelector(".fa-bars");
const nav = document.querySelector(".mobileNav");
burgerMenuIkon.addEventListener("click",function(e){
    navBar.classList.toggle("show")
})


dropDowns[2].addEventListener("click",function(e){
    megaMenu.classList.toggle("megaMenu");
    dropDowns[2].classList.toggle("downArrow");
})


dropDowns[3].addEventListener("click",function(e){
    dropDown.classList.toggle("dropDownMenu");
    dropDowns[3].classList.toggle("downArrow");
})




