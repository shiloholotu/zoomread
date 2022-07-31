
/*display words at a certain wpm
users can specificy the words per minute they need to read and how many words they want to be displayed at a time
*/

var speedReadPaused = true;
var speedReadTimer;
var chunkSize = 1;
var displayedText = "";
var remainingText = "";
var pastText = "";
var newText = "";


//pausing and unpausing speed read
function toggleSpeedReadPause(){

    speedReadPaused = !speedReadPaused;
    if(speedReadPaused == false){
        $("#speedReadPauseImg").attr("src", "res/svg/pause.svg");
    }

    else{
        $("#speedReadPauseImg").attr("src", "res/svg/play.svg");

    }

}



function speedRead(text){

	//making sure everything is paused
	speedReadPaused = true;
	$("#speedReadPauseImg").attr("src", "res/svg/play.svg");

    
    //getting variables from local storage
	wordsPerMinute = parseInt(localStorage.getItem("wpm"));
    $("#speedReadText").css("font-size", localStorage.getItem("fontSize") + "px");
    


	//clear out the text
	$("#speedReadText").html("<span style='color:rgb(110,110,110);'>Press play to start reading...</span>");
	currentWPM = wordsPerMinute;
	var millsPerChunk = 1/wordsPerMinute*60*1000*chunkSize;
	displayedText = "";
	pastText = "";
	remainingText = text;
	newText = "";
	var words = text.split(" ");
	var numOfWords = 0;


	//drawing the footer HUD
	document.getElementById("readFooterHUD").innerHTML = `

	<h5 class='footerHUDAttr'>
        <img align="center" src="res/svg/speed.svg">
		<input id='wpmInp' type='number' class='footerHUDInp' value='` + wordsPerMinute + `'>
	</h5>
    
    <h5 class="footerHUDAttr">
        <img align="center" src="res/svg/fontsize.svg">
        <input id='fontSizeInp' type='number' class='footerHUDInp' value='`+localStorage.getItem("fontSize")+`'>
    </h5>

    `;

	/*
	//update whenever chunk size is changed
	$("#chunkSizeInp").on("change", function(){
		if($("#chunkSizeInp").val() != ""){
			chunkSize = $("#chunkSizeInp").val();
			millsPerChunk = 1/wordsPerMinute*60*1000*chunkSize;
		}
	});*/


	//update whenever wpm is changed
	$("#wpmInp").on("change", function(){
		if($("#wpmInp").val() != ""){
			wordsPerMinute = $("#wpmInp").val();
			millsPerChunk = 1/wordsPerMinute*60*1000*chunkSize;
			localStorage.setItem("wpm", wordsPerMinute);
		}
	});
    
    //update whenever font size is changed
    $("#fontSizeInp").on("change", function(){
		if($("#fontSizeInp").val() != ""){
			$("#speedReadText").css("font-size",$("#fontSizeInp").val() + "px");
			localStorage.setItem("fontSize", $("#fontSizeInp").val());
		}
	});
    
    


	//add the specified amount of words at the specified speed
	function updateText(updateOnce = false, updateBackwards = false){

		if(!speedReadPaused){
			//the new text that will be displayed is taken from the remaining text;


			if(!updateBackwards){

				newText = remainingText.split(" ").slice(0, chunkSize).join(" ") + " ";
				remainingText = remainingText.split(" ").slice(chunkSize).join(" ");
				pastText += newText;

			}else{


				//use text from the past
				remainingText  = newText + remainingText;
				pastText = pastText.split(" ");
				newText = pastText.splice(pastText.length-chunkSize-1,chunkSize);
				newText = pastText.slice(pastText.length - chunkSize-1, pastText.length).join(" ");
				pastText = pastText.join(" ");



			}
			


			//adjust speed based on how many words are actually displayed(because some might be cut off from the previous if statement)
			millsPerChunk = 1/wordsPerMinute*60*1000*(newText.split(" ").length);

			displayText(newText);

			if(removeNonLetters(remainingText) != ""){
				speedReadTimer = setTimeout(updateText, millsPerChunk);
			}

			if(updateOnce){
				speedReadPaused	= true;
			}
		}else{

			clearTimeout(speedReadTimer);
			speedReadTimer = setTimeout(updateText, millsPerChunk);

		}

	}

	speedReadTimer = setTimeout(updateText, millsPerChunk*2);






	//CONTROLS


	function speedReadSkipForward(){


			//pause if not already
			speedReadPaused	= false;
			$("#speedReadPauseImg").attr("src", "res/svg/play.svg");
			updateText(updateOnce = true);
	}

	function speedReadSkipBackwards(){
			
			//unpause if not already
			speedReadPaused = false;
			$("#speedReadPauseImg").attr("src", "res/svg/play.svg");
			updateText(updateOnce = true, updateBackwards = true);

			
	}


	//spacebar pauses and unpauses

	document.body.onkeydown = function(e){
		if(e.keyCode == 32 && currentMode == "speed"){
	    	toggleSpeedReadPause();
	    	e.preventDefault();
		}
		else if(e.keyCode == 37 && currentMode === "speed"){
			speedReadSkipBackwards();
			e.preventDefault();
		}

		else if(e.keyCode == 39 && currentMode === "speed"){
			speedReadSkipForward();
			e.preventDefault();
		}

		else{
			return;
		}

	}


	//bind functions to buttons in footer HUD

	$("#speedReadPause").mousedown(toggleSpeedReadPause);
	$("#speedReadSkipBackwards").mousedown(speedReadSkipBackwards);
	$("#speedReadSkipForward").mousedown(speedReadSkipForward);


}
