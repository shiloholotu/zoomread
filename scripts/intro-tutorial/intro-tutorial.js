function finishIntro(){

	//save the name the user inputed
    if($("#nameInput").val() != ""){
        $("#stickyHeader").css("background-color", "transparent");
        localStorage.setItem("name", $("#nameInput").val());
        $("#fadeCover").css("background-color", "rgb(255, 188, 119)");
        openPage(["tutorialPage"]);
        $("#yellowBackDrop").fadeIn("slow");
    }

}







var slides = [
	["res/slides/wave.png","zoomread is your one-stop-shop for reading speed improvement!<br>lets take a dive into its features"],
	["res/slides/library.png", "in the library, you can create passages, delete passages,<br>edit passages, and decide what passages to read"],
	["res/slides/chooseread.png", "once you've chosen what passage you wish to read,<br> you can read it using either the speed-read or free-read mode"],
	["res/slides/choosequiz.png", "after reading the passage, you can use any of the 4 quiz modes to test your memory and <br> comprehension(some modes might not be available for certain passages)"],
	["res/slides/thumbsup.png", "it's that simple! now you ready to zoom into reading!"]
	
];




function displaySlide(index){    
    
	$("#slide").fadeOut("fast");
	$("#slideCaption").fadeOut("fast", function(){

		$("#slide").attr("src", slides[index][0]);
		$("#slideCaption").html(slides[index][1]);


		$("#slide").fadeIn("fast");
		$("#slideCaption").fadeIn("fast");

	});

	document.getElementById("slidecircles").innerHTML = "";

	for(var i = 0; i < slides.length; i++){
		if(i == index){
			document.getElementById("slidecircles").innerHTML += "<img onclick='displaySlide("+i+")' src='res/svg/circlefill.png'>";
		}else{
			document.getElementById("slidecircles").innerHTML += "<img onclick='displaySlide("+i+")' src='res/svg/circleemp.png'>";
		}
	}

}

displaySlide(0);


function finishTutorial(){
    $("#fadeCover").css("background-color", "rgb(244, 245, 247)");
	$("#yellowBackDrop").fadeOut("slow", function(){
        $("#stickyHeader").css("background-color", "");
    });
    
    
	openLibrary();

}