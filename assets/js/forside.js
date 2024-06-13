getCategory(11)
.then(data => renderEntryPoints(data))




function play(){
    if(video.paused){
        video.play()
    }
    else{
        video.pause()
    }
    
}


const video = document.querySelector(".herovideo");
video.addEventListener("click",function(e){
    play()
})