function closeWarning(){
    
    $("#warningOkButton").unbind();
    $("#darkBackDrop").fadeOut("fast");
    $("#warning").fadeOut("fast");
    
}

//warning popup

function warn(header, subText, func){
    
    play("res/sounds/wrong.wav");
    
    $("#warningOkButton").click(function(){
        func();
        closeWarning();
    });
    
    $("#warningHeaderText").text(header);
    $("#warningSubText").text(subText);
    
    $("#darkBackDrop").fadeIn("fast");
    $("#warning").fadeIn("fast");
    
}

