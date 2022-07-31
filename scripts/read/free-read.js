//keep track of time spent reading and words per minute
var freeReadTimer;
var stopwatch = 0;
var freeReadPaused = false;


function toggleFreeReadPause(){
    if(freeReadPaused){
        $("#freeReadPause").attr("src", "res/svg/pause.svg");
    }
    else{
        $("#freeReadPause").attr("src", "res/svg/play.svg");
    }
    
    freeReadPaused = !freeReadPaused;
}


function timeRead(text){
    
    freeReadPaused = false;
	clearInterval(freeReadTimer);
	stopwatch = 0;
    
    
    //drawing to footerHUD
    document.getElementById("readFooterHUD").innerHTML = `

    <h5 class='footerHUDAttr'><img align='center' src='res/svg/timer.svg'><b id="timeText"></b></h5>
    <h5 class='footerHUDAttr'><img align='center' src='res/svg/speed.svg'><b id="wpmText"></b></h5>

    <h5 class="footerHUDAttr">
        <img align="center" src="res/svg/fontsize.svg">
        <input id='fontSizeInp' type='number' class='footerHUDInp' value='`+localStorage.getItem("fontSize")+`'>
    </h5>
    `;
    
    $("#freeReadText").css("font-size",$("#fontSizeInp").val() + "px");
    
    //update whenever font size is changed
    $("#fontSizeInp").on("change", function(){
		if($("#fontSizeInp").val() != ""){
			$("#freeReadText").css("font-size",$("#fontSizeInp").val() + "px");
			localStorage.setItem("fontSize", $("#fontSizeInp").val());
		}
	});
    
    
	freeReadTimer = setInterval(function(){
        if(!freeReadPaused){
            stopwatch++;
            var mins = Math.floor(stopwatch/60);
            var secs = stopwatch%60


            if(mins.toString().length == 1){
                mins = "0" + mins;
            }

            if(secs.toString().length == 1){
                secs = "0" + secs;
            }

            //var hours = ("0" + Math.floor(parseInt(mins)/60)).slice(-2);
            var wpm = breakText(text,"word",1).length/(stopwatch/60)
            wpm = Math.floor(wpm);
            currentWPM = wpm;
            
            $("#timeText").text(" " + mins + ":" + secs);
            $("#wpmText").text(" " + wpm)
        }
	},1000);
    
}

function freeRead(text){
    currentMode == "free";
	timeRead(text);
	displayText(text);
    
    
    //CONTROLS
    
    document.body.onkeydown = function(e){
		if(e.keyCode == 32 && currentMode == "free"){
	    	toggleSpeedReadPause();
	    	e.preventDefault();
		}
	}
}


