//app.js indeholder vores main funktioner, som skal bruges i andre js filer
// dne skal også udføre nogle funktioner der er at fange token

const baseUrl = "https://0x.mohafh.dk/wp-json/wp/v2/";
const tokenUrl = "https://0x.mohafh.dk/wp-json/jwt-auth/v1/token";


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
        // tjekker om login info er sandt. vi vd at 401 betyder at ens login info ikke er sandt, så vi kan tjekke om det og give et svar tilbage i kode
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
        // console.log(apiToken);
        // gemmer værdien i en key value i sessionstorage, da den skal bruges senere.
        sessionStorage.setItem("apiToken",apiToken);
        
    })
}
storeToken()



// Main funktioner som skal bruges i andre js filer:

// denne funktion fetcher posts som har et specifikt kategori id
export function getPostsByCategory(categoryId)
{
    // console.log(sessionStorage.getItem("apiToken"))
    return fetch(baseUrl+`posts?status=private&categories=${categoryId}`,{
        headers:{
            Authorization: "Bearer"+sessionStorage.getItem("apiToken")
        }
    })
    .then(res => {
        // tjekker for status og melder tilbage om koden. vi ved 404 betyder er urlen ikke findes så der vil være noget galt i urlen
        if(res.status === 404){
            console.log("Siden blev ikke fundet. Tjek urlen og query parameter igennem")
        }
        return res.json();
    })
    .then(data => data)
    .catch(err => console.log("Noget gik galt:",err))
}

export function GetSinglePost(id){
    return fetch(baseUrl+`posts/${id}?status=private`,{
        headers:{
            Authorization: "Bearer "+sessionStorage.getItem("apiToken")
        }   
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => err)
}

export function getQueryParameter(){
    let queryParamter = window.location.search;
    let query = queryParamter.split("=")[1];
    return query;
}





export function RenderCards(posts, checker){
    const divEL = document.querySelector(".wrapper");
    posts.forEach(function(post){
        // kontrolstruktur hvor vi tjekker om en checker er true eller false. hvis den er true vil vi kun have tre cards i stedet for fire, og omvendt hvis den er false vil have fire. Grunden til at vi gør det, er fordi vi kan genbruge funktionen. I forsiden skal der vises tre cards udover øl messe, og ved fx arrangementer siden skal alle cards vises.
        if(checker){
            if(post.acf.titel === "Øl messe"){
                return;
            }
        }
        const aLink = document.createElement("a");
        aLink.href = `selvearrangement.html?id=${post.id}`
        divEL.append(aLink);
        const articleEL = document.createElement("article");
        aLink.append(articleEL);
        articleEL.classList.add("arrangementCard");


        const imgEl = document.createElement("img");
        imgEl.src = post.acf.cardimage.url;
        articleEL.append(imgEl);

        const h4El = document.createElement("h4");
        h4El.textContent = post.acf.titel;
        articleEL.append(h4El)

        const pEl = document.createElement("p");
        pEl.textContent = post.acf.tidspunkt;
        articleEL.append(pEl);

        const pEl2 = document.createElement("p");
        pEl2.textContent = post.acf.disclouretekst;
        articleEL.append(pEl2);
    })
}

export function RenderEvent(posts){
    posts.forEach(function(post){
        
    })
}
























