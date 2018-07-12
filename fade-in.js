function typeWriter(id,delay){
    var fade=document.getElementById(id);
    var text=fade.textContent;
    fade.textContent='';
    for(let i=0;i<text.length;i++){
        setTimeout(function timer(){
            if(text.charAt(i)!=='^'){
                fade.innerHTML+=text.charAt(i);
            }else{
                fade.innerHTML+='</br>';
            }
        },i*delay);
    }
}

function addTag(id,tagName,textInside){
    var ele=document.getElementById(id);
    ele.innerHTML+='<'+tagName+'>'+textInside+'</'+tagName+'>';
}