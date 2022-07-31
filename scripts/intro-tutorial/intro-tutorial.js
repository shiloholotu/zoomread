function finishIntro(){

	//save the name the user inputed
    if($("#nameInput").val() != ""){
        $("#stickyHeader").css("background-color", "transparent");
        localStorage.setItem("name", $("#nameInput").val());
        openPage(["tutorialPage"]);
        $("#yellowBackDrop").fadeIn("slow");
    }

}







var slides = [
	["res/slides/wave.png","zoomstudy is your one-stop-shop for all your studying needs!<br>lets take a dive into its features"],
	["res/slides/library.png", "in the library, you can create passages, delete passages,<br>edit passages, and decide what passages to study"],
	["res/slides/chooseread.png", "once you've chosen what passage you wish to study,<br> you can read it using either the speed-read or free-read mode"],
	["res/slides/choosequiz.png", "after reading the passage, you can use any of the 4 quiz modes to test yourself<br>(some might not be available for certain passages)"],
	["res/slides/thumbsup.png", "it's that simple! now you ready to zoom into studying!"]
	
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

	$("#yellowBackDrop").fadeOut("slow", function(){
        $("#stickyHeader").css("background-color", "");
    });
    
	openLibrary();

}