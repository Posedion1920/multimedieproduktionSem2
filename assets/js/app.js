//app.js indeholder vores main funktioner, som skal bruges i andre js filer

const baseUrl = "https://0x.mohafh.dk/wp-json/wp/v2/posts";


// Main funktioner som skal bruges i andre js filer:


// denne funktion fetcher posts som har et specifikt kategori id
export function getCategory(categoryId){
    return fetch(baseUrl+`?categories=${categoryId}&per_page=100`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("Something went wrong:",err))
}

// denne funktion fetcher et specifikt post
export function getPost(id){
    return fetch(baseUrl+`/${id}`)
    .then(res => res.json())
    .then(data=> data)
    .catch(err => console.log("Something went wrong",err))
}

// denne funktion fanger en query paramter i url og returnere det.
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

export function RenderEvent(post){
    const titleEL = document.querySelector("title");
    titleEL.textContent = post.acf.titel;
    const secEl = document.querySelector(".eventsection");
    const articleEl = document.createElement("article");
    secEl.append(articleEl);
    const heading = document.createElement("h1");
    heading.textContent = post.acf.titel;
    articleEl.append(heading)

    const heading3 = document.createElement("h3");
    heading3.textContent = post.acf.overskrift;
    articleEl.append(heading3)

    for(let text in post.acf.brodtekster){

        if(post.acf.brodtekster[text] === ""){
            continue
        }
        else{
            let pEl = document.createElement("p");
            pEl.textContent = post.acf.brodtekster[text];
            articleEl.append(pEl)
        }
    }

    const divContainer = document.createElement("div");
    divContainer.classList.add("eventImage");
    secEl.append(divContainer);
    const imgEl = document.createElement("img");
    if(window.innerWidth<1000){
        imgEl.src = post.acf.arrangementbillede.sizes.medium;
    }
    else{
        imgEl.src = post.acf.arrangementbillede.url;
    }
    divContainer.append(imgEl);


    const lokationEl = document.createElement("p");
    lokationEl.textContent = post.acf.lokation;
    articleEl.append(lokationEl);

    const tidspunkt = document.createElement("p");
    tidspunkt.textContent = post.acf.tidspunkt;
    articleEl.append(tidspunkt);

    const pris = document.createElement("p");
    pris.textContent = post.acf.pris+",- kr";

    const divSalg = document.createElement("div");
    articleEl.append(divSalg);

    const btnEL = document.createElement("button");
    btnEL.classList.add("btn")
    btnEL.textContent = "KØB BILLET TIL "+ post.acf.titel;
    
    const linkSalg = document.createElement("a");
    linkSalg.href = post.acf.linksalg;
    linkSalg.setAttribute("target","_blank");
    linkSalg.append(btnEL);

    divSalg.classList.add("salg");
    divSalg.append(pris)
    divSalg.append(linkSalg);
}

function RenderTeam(post){
    
}





















