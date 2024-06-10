//app.js indeholder vores main funktioner, som skal bruges i andre js filer

const baseUrl = "https://0x.mohafh.dk/wp-json/wp/v2/posts";


// Main funktioner som skal bruges i andre js filer:


// denne funktion fetcher posts som har et specifikt kategori id
function getCategory(categoryId){
    return fetch(baseUrl+`?categories=${categoryId}&per_page=100`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log("Something went wrong: ",err))
}

// denne funktion fetcher et specifikt post
function getPost(id){
    return fetch(baseUrl+`/${id}`)
    .then(res => res.json())
    .then(data=> data)
    .catch(err => console.log("Something went wrong: ",err))
}

// denne funktion fanger en query paramter i url og returnere det.
function getQueryParameter(){
    let queryParamter = window.location.search;
    let query = queryParamter.split("=")[1];
    return query;
}



function RenderCards(posts, checker){
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

function RenderEvent(post){
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
      
    
    for (let trainPerson in post.acf.traenere)
    {
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
            continue
        }
    }

    
}


























