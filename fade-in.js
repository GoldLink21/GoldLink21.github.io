function typeWriter(id,delay){
    var fade=document.getElementById(id);
    var text=fade.textContent;
    fade.innerHTML='';
    for (let i=0; i<text.length;i++) {
        setTimeout( function timer(){
                fade.innerHTML+=text.charAt(i);
        }, i*delay );
    }
}