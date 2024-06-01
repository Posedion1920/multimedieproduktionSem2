//app.js indeholder vores main funktioner, som skal bruges i andre js filer
// dne skal også udføre nogle funktioner der er at fange token

const baseUrl = "https://0x.mohafh.dk/wp-json/wp/v2/";
const tokenUrl = "https://0x.mohafh.dk/wp-json/jwt-auth/v1/token";
let apiToken = sessionStorage.getItem("apiToken")
const categoryIds = {
    Arrangementer:11
};



function GetApiToken(){
    //loginfo er et objekt af vores login information, som vi senere skal bruge til et post request
    const loginInfo = {
        username: "10461948@ucn.dk",
        password: "xvQm GZZm LmPH n3xa vOgM 5bav"
    }
    // returner promise, fordi dataen skal bruges i en anden funktion
    return fetch(tokenUrl,{
        //vi laver et post request. Det vil sige, at vi sender en http request, som indeholder noget data til serveren.
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // for at kunne sende data, som i dette filfælde er vores objekt "loginfo", skal det konveteres fra et objekt til en json format
        body: JSON.stringify(loginInfo)
    })
    .then(res => {
        if(res.status ===401){
            console.log("Du fik ikke token muligvis fordi dine login info ikke er rigtigt")
        }
        // vi bruger return her fordi vores arrow funktionen har flere linjer. Når en arrow funktionen har kun en linje, vil den by default return af sig
        return res.json();
    })
    // catch tjekker om hvis der er noget som går galt i selve requesten og fanger den og udskriver
    .catch(err => console.log("noget gik galt i anmodningen request:", err))
}


function storeToken(){
    GetApiToken()
    .then(data => {
        // gemmer token i en variable
        let apiToken = data.data.token;
        // gemmer værdien i en key value i sessionstorage, da den skal bruges senere.
        sessionStorage.setItem("apiToken",apiToken);
    })
}

storeToken()



// Main funktioner som skal bruges i andre js filer:

function getPostsByCategory(categoryId)
{
    fetch(baseUrl+`posts?status=private&categories=${categoryId}`,{
        headers:{
            Authorization: "Bearer"+apiToken
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    
}

















