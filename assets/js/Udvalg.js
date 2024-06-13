const acc = document.querySelectorAll(".accordion");
// fanger alle elementer med klassen accordion og gemmer dem i acc
let i;


// vi laver et forloop over acc og det kører indtil i er større end acc length
// vi toggler vores class .active som aktivere eller deaktivere vores panel element
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function(e) {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display == "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}