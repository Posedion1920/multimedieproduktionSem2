//app.js indeholder vores main funktioner, som skal bruges i andre js filer

const baseUrl = "https://0x.mohafh.dk/wp-json/wp/v2/posts";


// Main funktioner som skal bruges i andre js filer:

// denne funktion fetcher posts som har et specifikt kategori id og returner et promise
function getCategory(categoryId){
    return fetch(baseUrl+`?categories=${categoryId}&per_page=100`)
    .then(res => {
        if(res.status === 404){
            console.log("Could not find it");
        }
        return res.json()
        //normal vil en arrow funktion selv retuner, men hvis der er flere linje, skal man selv sætte return keyword på respons
    })
    .then(data => data)
    .catch(err => console.log("Something went wrong: ",err))
    //hvis der går noget galt her i selve fetch request, vil det komme her.
}

// denne funktion fetcher et specifikt post og returner et promoise
function getPost(id){
    return fetch(baseUrl+`/${id}`)
    .then(res => {
        if(res.status === 404){
            console.log("Could not find it");
        }
        return res.json()
    })
    .then(data=> data)
    .catch(err => console.log("Something went wrong: ",err))
    //hvis der går noget galt her i selve fetch request, vil det komme her.
}

// denne funktion fanger en query paramter i url og returnere det.
function getQueryParameter(){
    let queryParamter = window.location.search;
    // query parameterne er gemt ved variabelen og vi bruger split funktionen til det dele stringen op i et rray. vi er dog kun interesseret i det efter = så vi indexer i array.
    let query = queryParamter.split("=")[1];
    return query;
}



function RenderCards(posts){
    const divEL = document.querySelector(".wrapper");
    // der fåes et array af objekter, som vi skal foreach igennem og derefter skabe html elementer med doom manipulation, som vi derefter skal spytte ud på siden. For hver iteration af vores foreach, bliver der skabt de html elementer der skal skabes.
    posts.forEach(function(post){
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

function RenderEvent(post){
    // en funktion som skal vise et arrangement. funktionen fåes et objekt som parameter og derfter skal skabe html elementer og bruge objektets værdier som indhold.
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

    // for in loop, som kører ind i gennem post.acf.brodtekster
    //overordnet skal den tjekke om nogle tekster er tomme.
    for(let text in post.acf.brodtekster){

        if(post.acf.brodtekster[text] === ""){
            // hvis post.acf.brodtekster[text] er tom, betyder det at den ikke har en tekst og vil skippe den her iteration
            continue
        }
        else{
            // her er det omvendt. hvis den ikke er tom, betyder det at vi har noget tekst og vi vil gerne skabe html elementer og putte dens værdi ind som indhold.
            let pEl = document.createElement("p");
            pEl.textContent = post.acf.brodtekster[text];
            articleEl.append(pEl)
        }
    }

    const divContainer = document.createElement("div");
    divContainer.classList.add("eventImage");
    secEl.append(divContainer);
    const imgEl = document.createElement("img");

    // kontrolstruktur som tjekker om brugerens width er mindre end 1000px. Hvis den er det, så vil vi bruge et mindre billede. Hvis ikke denne betingelse er sandt, vil vi bruge det originale billede fra vores objekt.
    // den tjekker kun en gang om ens windows width når siden starter op, så det ikke 100% responsiv. Nok bedre at bruge media query med javascript.
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
    //funktion som tager et objekt som parameter og udfra det objekt tager værdier og værdier fra keys fra det objekt og skaber html elementer.
    // overordnet skaber denne funktion vores hold side fra indhold fra wordpress med doom manipulation.
    // det er en lang funktion, som den kan godt være ulæseligt. Man kunne nok havde undladt at skabe alle elementer med javascript, da det ikke er alt som kommer fra wordpress, men man var allerede i gang.
    const mainEL = document.querySelector(".holdesideGrid");

    const articleEL= document.createElement("article");
    articleEL.classList.add("column1row1")
    mainEL.append(articleEL);

    const imgEL = document.createElement("img");
    imgEL.src = post.acf.image.url;
    articleEL.append(imgEL);

    const teamTitel = document.createElement("h3");
    teamTitel.textContent = post.acf.holdnavn;
    articleEL.append(teamTitel);

    const teamDesc = document.createElement("p");
    teamDesc.textContent = post.acf.holdbeskrivelse;
    articleEL.append(teamDesc);

    const moreTeamDesc = document.createElement("p");
    moreTeamDesc.textContent = "Vil du være en del af et fedt fællesskab og tage din håndbold til næste niveau? Hos Aalborg HK er vi på udkig efter nye unge talenter, der har lyst til at spille håndbold, have det sjovt og skabe nye venskaber.";
    articleEL.append(moreTeamDesc);

    const divEL = document.createElement("div");
    divEL.classList.add("tilbyder");
    articleEL.append(divEL);

    const communityHeading = document.createElement("p");
    communityHeading.classList.add("fremhæveTekst");
    communityHeading.textContent = "Fællesskab:";
    const communityText = document.createElement("p");
    communityText.textContent = "Vær en del af et stærkt hold, hvor vi støtter og inspirerer hinanden både på og uden for banen.";

    divEL.append(communityHeading);
    divEL.append(communityText);

    const personalDevHeading = document.createElement("p");
    personalDevHeading.classList.add("fremhæveTekst");
    personalDevHeading.textContent = "Selvudvikling:";
    const personalDevText = document.createElement("p");
    personalDevText.textContent = "Udvikle dine tekniske færdigheder og fysiske form gennem professionel træning og engagerende øvelser.";

    divEL.append(personalDevHeading);
    divEL.append(personalDevText);

    const activitiesHeading = document.createElement("p");
    activitiesHeading.classList.add("fremhæveTekst");
    activitiesHeading.textContent = "Sjove aktiviteter:";
    const activitiesText = document.createElement("p");
    activitiesText.textContent = "Udover træning og kampe arrangerer vi sociale arrangementer og ture, der styrker sammenholdet og skaber uforglemmelige oplevelser.";

    divEL.append(activitiesHeading);
    divEL.append(activitiesText);

    const trialTraining = document.createElement("p");
    trialTraining.textContent = "Hvis du har spørgsmål eller problemer med indmeldelse, eller vil meldes ud skal du skrive til Jørgen Østeraa på:";
    divEL.append(trialTraining);

    const articleEL2 = document.createElement("article");
    articleEL2.classList.add("tilmeldHold");
    mainEL.append(articleEL2);

    const registerTeam = document.createElement("h4");
    registerTeam.textContent = `Tilmeld ${post.acf.holdnavn}`;
    articleEL2.append(registerTeam);

    const subscription = document.createElement("h5");
    subscription.textContent = "Kontigent";
    articleEL2.append(subscription);

    const divEL2 = document.createElement("div");
    divEL2.classList.add("flexhold");
    articleEL2.append(divEL2);

    const teamName = document.createElement("p");
    teamName.textContent = post.acf.tilmelding.tilmeldholdnavn;
    divEL2.append(teamName);

    const teamYear = document.createElement("p");
    teamYear.textContent = post.acf.tilmelding.argang;
    divEL2.append(teamYear);

    const price = document.createElement("p");
    price.textContent = post.acf.tilmelding.pris;
    price.classList.add("fremhæveTekst");
    articleEL2.append(price);

    const subscriptionInfo = document.createElement("p");
    subscriptionInfo.textContent = "Der betales kontingent to gange om året.";
    articleEL2.append(subscriptionInfo);

    const subscriptionInfo2 = document.createElement("p");
    subscriptionInfo2.textContent = "Efter indmeldelse betales fremtidige kontingenter ved at tilmelde sig holdet igen hver halve år, hvor holdet får et nyt sæsonnavn";
    articleEL2.append(subscriptionInfo2);

    const divEL3 = document.createElement("div");
    divEL3.classList.add("btncontainer");
    articleEL2.append(divEL3);

    const subscribeBtn = document.createElement("button");
    subscribeBtn.classList.add("btn")
    subscribeBtn.textContent = post.acf.tilmelding.knapholdnavn;
    divEL3.append(subscribeBtn);

    const articleEL3 = document.createElement("article");
    mainEL.append(articleEL3);
    articleEL3.classList.add("mobilHold");

    const expectations = document.createElement("h4");
    expectations.textContent = "Forventninger til forældre";
    articleEL3.append(expectations);

    const expectationInfo = document.createElement("p");
    expectationInfo.textContent = "Her kan du læse om, hvilke forventninger klubben har til forældre.";
    articleEL3.append(expectationInfo);

    const readMoreLink = document.createElement("a");
    readMoreLink.textContent = "Læs om forældre-pjece, her";
    readMoreLink.href = "#"
    articleEL3.append(readMoreLink);

    const aside = document.createElement("aside");
    aside.classList.add("medlemansvarlig");
    mainEL.append(aside);

    const divEL4 = document.createElement("div");
    aside.append(divEL4);

    const contactPerson = document.createElement("h4");
    contactPerson.textContent = "Kontakt medlemansvarlig";
    divEL4.append(contactPerson);

    const questions = document.createElement("p");
    questions.textContent = "Hvis du har spørgsmål eller problemer med indmeldelse, eller vil meldes ud skal du skrive til Jørgen Østeraa på:";
    divEL4.append(questions);

    const mail = document.createElement("p");
    const MailText = document.createTextNode("kontingent@aalborg-hk.dk");
    const phoneNumber = document.createElement("p");
    const phoneText = document.createTextNode("61665966");

    
    const tlfIcon = document.createElement("i");
    tlfIcon.classList.add("fa-solid");
    tlfIcon.classList.add("fa-phone");
    phoneNumber.append(tlfIcon);
    phoneNumber.appendChild(phoneText);

    const emailIcon = document.createElement("i");
    emailIcon.classList.add("fa-solid");
    emailIcon.classList.add("fa-envelope");
    mail.append(emailIcon);
    mail.appendChild(MailText);


    divEL4.append(mail);
    divEL4.append(phoneNumber);

    const imgEL2 = document.createElement("img");
    imgEL2.src = "./assets/Billeder/medlemansvarlig/joergen.jpeg";
    imgEL2.alt = "Jørgen";
    aside.append(imgEL2);

    const articleEL4 = document.createElement("article");
    articleEL4.classList.add("tiderHold");
    mainEL.append(articleEL4);

    const upcomingActivites = document.createElement("h3");
    upcomingActivites.textContent = "Kommende aktiviteter";
    articleEL4.append(upcomingActivites);

    //Overordnet for in loop som tjekker hvor mange træningsdage der er.
    //Hvis der er foreksempel tre træningsdage, så vil alt indenfor dette for in loop ske tre gange.
    for(let tid in post.acf.fastetraeningsdage){
        const divEL5 = document.createElement("div");
        divEL5.classList.add("tid");
        articleEL4.append(divEL5);
    
        const divEL6 = document.createElement("div");
        divEL5.append(divEL6);
        divEL6.classList.add("traeningsdag")
    
        const day = document.createElement("p");
        day.textContent = post.acf.fastetraeningsdage[tid].dag
        divEL6.append(day);
        
        const trainingDay = document.createElement("div");
        divEL5.append(trainingDay);
    
        const teamHeaiding = document.createElement("p");
        teamHeaiding.classList.add("fremhæveTekst");
        teamHeaiding.textContent = `Træning ${post.acf.holdnavn}`;
        trainingDay.append(teamHeaiding);
    
        const timeIcon = document.createElement("i");
        const timeLocation = document.createElement("i");
        timeIcon.classList.add("fa-solid");
        timeIcon.classList.add("fa-clock");
        timeLocation.classList.add("fa-solid");
        timeLocation.classList.add("fa-location-pin"); 

        const time = document.createElement("p");
        const timeText = document.createTextNode(post.acf.fastetraeningsdage[tid].tidsrum);
        time.append(timeIcon);
        time.appendChild(timeText);
        trainingDay.append(time);

        const location = document.createElement("p");
        const locationText = document.createTextNode(post.acf.fastetraeningsdage[tid].lokation);

        trainingDay.append(location);
        location.append(timeLocation);
        location.appendChild(locationText);
    }
    

    const articleEL5 = document.createElement("article");
    mainEL.append(articleEL5);
    articleEL5.classList.add("trænereSektion");

    const trainers = document.createElement("h3");
    trainers.textContent = `Trænere for ${post.acf.holdnavn}`
    articleEL5.append(trainers);

    const divEL7 = document.createElement("div");
    articleEL5.append(divEL7);
    divEL7.classList.add("trænere");
      
    // for in loop som tjekker hvor mange trænere et hold har. Hvis den har for for eksepel to trænere, som vil alt indenfor dette for in loop ske to gange
    for (let trainPerson in post.acf.traenere)
    {
        // hvis der ikke er et navn på en træner, kan vi formode at den er tom og vi kan bare gå videre til næste iteration i vores for in.
        if(post.acf.traenere[trainPerson].fuldenavn === ""){
            continue
        }
    const trainer = document.createElement("div");
    trainer.classList.add("alignself");
    divEL7.append(trainer);

    const trainerPerson = document.createElement("p");
    trainerPerson.textContent = post.acf.traenere[trainPerson].rolle;
    trainerPerson.classList.add("fremhæveTekst");
    trainer.append(trainerPerson);

    const trainerName = document.createElement("p");
    trainerName.textContent = post.acf.traenere[trainPerson].fuldenavn;
    trainer.append(trainerName);

    const trainerPhone = document.createElement("p");
    const trainerPhoneText = document.createTextNode(post.acf.traenere[trainPerson].telefonnr);

    const trainerMail = document.createElement("p");
    const trainerMailText = document.createTextNode(post.acf.traenere[trainPerson].email);
    const mailIcon = document.createElement("i");
    mailIcon.classList.add("fa-solid");
    mailIcon.classList.add("fa-envelope");

    const iphoneIcon = document.createElement("i");
    iphoneIcon.classList.add("fa-solid");
    iphoneIcon.classList.add("fa-phone");
    trainerPhone.append(iphoneIcon);
    trainerPhone.appendChild(trainerPhoneText);
    trainerMail.append(mailIcon);
    trainerMail.appendChild(trainerMailText)
    trainer.append(trainerPhone);
    trainer.append(trainerMail);  
    }
    let counter = 0;
    // for in loop som tjekker hvor mange teen træner der er inde i dette objekt.
    // vi bruger en counter for at undgå at skabe bokse til hver træning. alle teen trænere skal være under en boks.
    // hvis post.acf.teentraener[teen] har en værdi så vil counter blive initialiseret med 1. 
    // vi har så en kontrolstruktur som tjekker om counter lig med en 1. Hvis der er mindst en træner i vores objekt, så vil counter være mindst 1 og vores betingelse vil være sandt en gang FØRSTE GANG, så den boks bliver kun skabt en gang og antallet af trænere vil blive sat på den samme boks.
    for(let teen in post.acf.teentraener){
        if(post.acf.teentraener[teen] !== ""){
            counter++;
            if(counter ==1){
                var trainer = document.createElement("div");
                trainer.classList.add("alignself");
                divEL7.append(trainer);  
            }
            const trainerName = document.createElement("p");
            trainerName.textContent = post.acf.teentraener[teen];
            trainer.append(trainerName);

        }
        else{
            //hvis der slet ikke er en træner i nuværende iteration, så skipper vi.
            continue
        }
    }
}

function renderEntryPoints(posts){
    const aside = document.querySelector(".kommendeArrange");
    // array af de arrangementers id, som vi vil bruge som entry points
    const entryPointsID = [211,226,216];
    // et foreach som tjekker alle arrangementer igennem.
    posts.forEach(function(post){
        const idTempHolder = post.id;
        // hvis idtempholder nuværende id matcher med en af dem i vores entrypointsid, har vi fat i det rigtige objekt, og ud fra det objekts værdier og keys:values skaber vi html elementer til at lave vores entrypoint.
        if(entryPointsID.includes(idTempHolder)){
            const aLinkEL = document.createElement("a");
            aLinkEL.href = `selvearrangement.html?id=${post.id}`;
            aside.append(aLinkEL);
            const divEl = document.createElement("div");
            aLinkEL.append(divEl);
            divEl.classList.add("arrangementStyle");
            const imgEL = document.createElement("img");
            imgEL.src = post.acf.cardimage.url;
            divEl.append(imgEL);

            const divEl2 = document.createElement("div");
            divEl2.classList.add("ArrangementIndhold");
            divEl.append(divEl2);
            const eventTitel = document.createElement("h2");
            eventTitel.textContent = post.acf.titel;
            divEl2.append(eventTitel);

            const date = document.createElement("p");
            date.classList.add("dato");
            date.textContent = post.acf.tidspunkt;
            divEl2.append(date);

            const text = document.createElement("p");
            text.textContent = post.acf.overskrift;
            divEl2.append(text);



        }
        else{
            // hvis idtempholder ikke er i vores entrypointsid array, er det ikke det rigtige arrangement vi vil bruge som entrypoints, og vi skipper nuværende iteration
            return
        }
    })
}



function makeLabelsMobile(posts){
    //funktionen som skal lave vores holdoversigt labels og dynamisk opdaterer dem

    const youthTeam = document.querySelector(".ungdomsholdListe");

    // laver en liste for ungdom drenge hold og tilføjer den til ungdomsholdliste.
    const boyTeamList = document.createElement("ul");
    youthTeam.append(boyTeamList);
    const boyParagraph = document.createElement("p");
    boyParagraph.textContent = "Ungdom Drenge";
    boyParagraph.style.fontWeight = "bold";
    boyTeamList.append(boyParagraph);
    
    // laver en liste for ungdom piger hold og tilføjer den til ungdomsholdliste.
    const girlTeamList = document.createElement("ul");
    youthTeam.append(girlTeamList);
    const girlPararaph = document.createElement("p");
    girlPararaph.textContent = "Ungdom Piger";
    girlPararaph.style.fontWeight = "bold";
    girlTeamList.append(girlPararaph);

    // laver en liste for ungdom de små hold og tilføjer den til ungdomsholdliste.
    const childrenTeamList = document.createElement("ul");
    youthTeam.append(childrenTeamList);
    const childrenPararaph = document.createElement("p");
    childrenPararaph.textContent = "De små hold";
    childrenPararaph.style.fontWeight = "bold";
    childrenTeamList.append(childrenPararaph);

    const seniorTeams = document.querySelector(".seniorholdListe");

    // laver en liste for herrer hold og tilføjer den til seniorholdliste.
    const menTeamList = document.createElement("ul");
    seniorTeams.append(menTeamList);
    const menPararaph = document.createElement("p");
    menPararaph.textContent = "Herrer hold";
    menPararaph.style.fontWeight = "bold";
    menTeamList.append(menPararaph);

    // laver en liste for kvinde hold og tilføjer den til seniorholdliste.
    const womenTeamList = document.createElement("ul");
    seniorTeams.append(womenTeamList);
    const womenPararaph = document.createElement("p");
    womenPararaph.textContent = "Kvinde hold";
    womenPararaph.style.fontWeight = "bold";
    womenTeamList.append(womenPararaph);

    const otherTeams = document.querySelector(".øvrigeHold");

    // laver en liste for øvrige hold og tilføjer den til øvrigeHold
    const otherTeamsList = document.createElement("ul");
    const otherPararaph = document.createElement("p");
    otherPararaph.textContent = "Øvrige hold";
    otherPararaph.style.fontWeight = "bold";
    otherTeams.append(otherTeamsList);
    otherTeamsList.append(otherPararaph);



    posts.forEach(function(post){
        //foreacher igennem et array af objekter.
        //post.categories består af et eller flere id, som et objekt har.

        //hvert hold har en kategori, som fortæller hvilket type af hold det er. For eksempel drenge hold har en kategori, som er id 14 og er et drenge hold. Pige hold har 15 osv osv.
        //vi har så en kontrolstruktur der foreksempel tjekker om et objekt id har id 14. Hvis den har det, så ved vi at det er et drenge hold, og vi kan tilføje det til drenge hold listen. Den vil tjekke ved hvert hold.

        if(post.categories.includes(14)){
            const boyTeamLink = document.createElement("a");
            boyTeamLink.href = `holdsiden.html?id=${post.id}`;
            boyTeamList.append(boyTeamLink);
            const boyTeamLabel = document.createElement("li")
            boyTeamLabel.textContent = post.acf.holdnavn;
            boyTeamLink.append(boyTeamLabel);
        }
        else if(post.categories.includes(15)){
            const girlTeamLink = document.createElement("a");
            girlTeamLink.href = `holdsiden.html?id=${post.id}`;
            girlTeamList.append(girlTeamLink);
            const girlTeamLabel = document.createElement("li")
            girlTeamLabel.textContent = post.acf.holdnavn;
            girlTeamLink.append(girlTeamLabel);
        }
        else if(post.categories.includes(17)){
            const childrenTeamLink = document.createElement("a");
            childrenTeamLink.href = `holdsiden.html?id=${post.id}`;
            childrenTeamList.append(childrenTeamLink);
            const childrenTeamLabel = document.createElement("li")
            childrenTeamLabel.textContent = post.acf.holdnavn;
            childrenTeamLink.append(childrenTeamLabel);
        }
        else if(post.categories.includes(18)){
            const menTeamLink = document.createElement("a");
            menTeamLink.href = `holdsiden.html?id=${post.id}`;
            menTeamList.append(menTeamLink);
            const menTeamLabel = document.createElement("li")
            menTeamLabel.textContent = post.acf.holdnavn;
            menTeamLink.append(menTeamLabel);
        }
        else if(post.categories.includes(19)){
            const womenTeamLink = document.createElement("a");
            womenTeamLink.href = `holdsiden.html?id=${post.id}`;
            womenTeamList.append(womenTeamLink);
            const womenTeamLabel = document.createElement("li")
            womenTeamLabel.textContent = post.acf.holdnavn;
            womenTeamLink.append(womenTeamLabel);
        }

        else if(post.categories.includes(21)){
            const otherTeamLink = document.createElement("a");
            otherTeamLink.href = `holdsiden.html?id=${post.id}`;
            otherTeamsList.append(otherTeamLink);
            const otherTeamLabel = document.createElement("li")
            otherTeamLabel.textContent = post.acf.holdnavn;
            otherTeamLink.append(otherTeamLabel);
        }
    })
}

function MakeLabelsDesc(posts){
    const megaMenu = document.createElement("#hideMegaMenu");

    const boyTeamList = document.createElement("ul");
    megaMenu.append(boyTeamList);
    const boyTeamParagraph = document.createElement("p");
    boyTeamParagraph.textContent = "Ungdom Drenge";

    const girlTeamList = document.createElement("ul");
    const girlTeamParagraph = document.createElement("p");
    girlTeamParagraph.textContent = "Ungdom Piger";
    megaMenu.append(girlTeamList);


    const menTeamList = document.createElement("ul");
    megaMenu.append(menTeamList);
    const menTeamParagraph = document.createElement("p");
    menTeamParagraph.textContent = "Senior Mænd";

    const womenTeamList = document.createElement("ul");
    megaMenu.append(womenTeamList);
    const womenTeamParagraph = document.createElement("p");
    womenTeamParagraph.textContent = "Senior Kvinder";

    const childrenTeamList = document.createElement("ul");
    megaMenu.append(childrenTeamList);
    const childrenTeamParagraph = document.createElement("p");
    childrenTeamParagraph.textContent = "De små";

    const othersTeamList = document.createElement("ul");
    megaMenu.append(othersTeamList);
    const otherTeamParagraph = document.createElement("p");
    otherTeamParagraph.textContent = "Øvrige hold";

    posts.forEach(function(post){
        if(post.categories.includes(14)){

        }   
        else if(post.categories.includes(15)){

        }
        else if(post.categories.includes(17)){

        }
        else if(post.categories.includes(18)){

        }
        else if(post.categories.includes(19)){

        }
        else if(post.categories.includes(21)){

        }
    })
}








const megaMenu2 = document.querySelector("#hideMegaMenu");

    const boyTeamList = document.createElement("ul");
    megaMenu2.append(boyTeamList);
    const boyTeamParagraph = document.createElement("p");
    boyTeamList.append(boyTeamParagraph);
    boyTeamParagraph.textContent = "Ungdom Drenge";

    const girlTeamList = document.createElement("ul");
    const girlTeamParagraph = document.createElement("p");
    girlTeamList.append(girlTeamParagraph);
    girlTeamParagraph.textContent = "Ungdom Piger";
    megaMenu2.append(girlTeamList);


    const menTeamList = document.createElement("ul");
    megaMenu2.append(menTeamList);
    const menTeamParagraph = document.createElement("p");
    menTeamParagraph.textContent = "Senior Mænd";

    const womenTeamList = document.createElement("ul");
    megaMenu2.append(womenTeamList);
    const womenTeamParagraph = document.createElement("p");
    womenTeamParagraph.textContent = "Senior Kvinder";

    const childrenTeamList = document.createElement("ul");
    megaMenu2.append(childrenTeamList);
    const childrenTeamParagraph = document.createElement("p");
    childrenTeamParagraph.textContent = "De små";

    const othersTeamList = document.createElement("ul");
    megaMenu2.append(othersTeamList);
    const otherTeamParagraph = document.createElement("p");
    otherTeamParagraph.textContent = "Øvrige hold";





















