

var currentMode = "fill";


function showResults(){
	play("res/sounds/finish.wav");
	$("#resultsPage").fadeIn("slow");
	$("#darkBackDrop").fadeIn("slow");
}

function hideResults(){
	$("#resultsPage").fadeOut("slow");
	$("#darkBackDrop").fadeOut("slow");
}