getCategory(13)
.then(data=> {
    makeLabelsMobile(data)
    MakeLabelsDesc(data)
})

//vi fanger alle elementer med .klassen .navdropdown
//derefter laver et vi et forloop som giver hvert elementer med klassen .navdropdown farven hvid
const dropDowns = document.querySelectorAll(".navDropDown");
for(let i = 0;  i< dropDowns.length;i++){
    dropDowns[i].style.color= "white";
}

const dropDownElements1 = document.querySelector(".tilmeldDropdown");
const dropDownElements2 = document.querySelector(".praktiskDropdown");
const megaMenu = document.querySelector("#hideMegaMenu");
const navBar = document.querySelector(".navBurger");
const dropDown = document.querySelector("#dropDownMenu");

const arrow = document.querySelectorAll(".fa-angle-down");




//event listners der lytter efter klik. når der trykkes toggles der klasser. bruges til burger menuen og arrow animationen
dropDowns[0].addEventListener("click",function(e){
    dropDownElements1.classList.toggle("show");
    arrow[0].classList.toggle("downArrow");
})

dropDowns[1].addEventListener("click",function(e){
    arrow[1].classList.toggle("downArrow");
    dropDownElements2.classList.toggle("show");
})

dropDowns[2].addEventListener("click",function(e){
    megaMenu.classList.toggle("megaMenu");
    arrow[2].classList.toggle("downArrow");
})

dropDowns[3].addEventListener("click",function(e){
    dropDown.classList.toggle("dropDownMenu");
    arrow[3].classList.toggle("downArrow");
})


const burgerMenuIkon = document.querySelector(".fa-bars");
const nav = document.querySelector(".mobileNav");
burgerMenuIkon.addEventListener("click",function(e){
    navBar.classList.toggle("show")
})








