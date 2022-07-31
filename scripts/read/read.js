

//keeping track of what the user is currently reading, what mode they are reading in, and how fast they are reading
var passageToRead = /*`ZoomStudy is a unique way to create unique and efficient study sessions!

ZoomStudy was created by Ifedolapo Shiloh Olotu in 2022 for the Congressional App Challenge.
The web app allows users to read and then quiz themselves on passages using various reading and quizzing modes.
When reading a passage, the user can use the Free-Read mode, which allows the users to read at their own pace with a timer and WPM(Words-Per-Minute) tracker, or they can use the Speed-Read mode, where the user can read at a set WPM to put their skills to the test!
When quizzing themselves on a passage, the user has 4 modes for quizzing: Summarize, Fill-In-The-Blank, Imposter, and Timeline.
In the Summarize mode, the user can test their memory by trying their best to summarize the passage read.
In the Fill-In-The-Blank mode, the user is tested through unique algorithm-generated fill-in-the-blank questions.
In the Imposter mode, the user is presented with 2 versions of the same sentence and must discern which is the correct one.
And finally, in the Timeline mode, the user is presented with 3 sentences which they must rearrange into the correct order.

ZoomStudy aims to be a one-stop-shop for all your studying needs! It enhances your studying experiences with a variety of studying techniques and effective reading comprehension strategies. Happy reading!

`*/`
When I was younger I was taken from my family and sent to a cold gray building in Washington State in the United States. I was devastated and scared. I felt so alone without my parents and my brothers and sisters. At least I had one brother with me. Without him I would've felt even worse. The scientist wanted me for an experiment to see if they could make me talk. I was the smartest of the 15 of us that they took from our home in Asia. I did not know the other apes very well at the beginning. We lived far apart in the forest. Weeks later when I started to understand what they were saying to me I said, “hello I am an ape, and my name is Gerald.” I didn't actually use words, but my hands, the humans call it sign language.

Years went by and I became the head of the 15 original apes. I have a brother named Roy that helps me with my daily duties. Roy is smaller than I am so he can never be in charge. That's how it works with us, you have to be big to be in charge. Roys arms are smaller and his chest is less hairy than mine. My wife is named Lucy. Lucy is shy and timid around the humans but when we are alone she is a chatterbox. Lucy's hair is much longer than mine and has a red tinge in the fluorescent lights. The air inside never seems to circulate and is always too warm for us. The Institute smelled like the humans not like the forest where I am from. I missed the smell of earth and trees every day. There are 12 other apes who are my closest friends. We live at the Chimpanzee and Human Communication Institute in Ellensburg, Washington. The Institute is very close to Central Washington University. In 1924 there is a famous report of fighting between miners and the creature they later would name Bigfoot. I guess that was just us trying to escape the Institute.
`

var currentText = 0;
var currentReadMode = "";
var currentWPM = 0;


function displayText(text){
	//text = text.replace("\n","\r\n");
	if(currentReadMode == "speed"){
		document.getElementById("speedReadText").textContent = text;
	}
	

	if(currentReadMode == "free"){
		text = text.replaceAll("\n", "<br>")
		document.getElementById("freeReadText").innerHTML = text;
		console.log("FREEDOM")
	}
}












//users can use either the free read mode, where they read at their own pace, or the speed read mode, where text is displayed at a certain wpm
function read(mode){
	currentMode = mode;

	document.getElementById("body").style.backgroundColor = "rgb(244,245,247)";
	//when starting to read, fade out the "choose mode" section and fade in the read box
	

	//the user will read whatever was enetered into the prompt
	//passageToRead = passageToRead.replaceAll("\n", " ");
	
	currentReadMode = mode;
	if(mode == "speed"){
		openPage(["readPage","speedReadPage"]);
		$("#speedReadControls").show();
		var text = passageToRead.replaceAll("\n", " ");
		speedRead(text);
	}

	if(mode == "free"){
		openPage(["readPage", "freeReadPage"]);
		$("#speedReadControls").hide()
		freeRead(passageToRead);
	}
}


function clearReadVariables(){
	clearInterval(freeReadTimer);
	stopwatch = 0;

	//unbind controls from the buttons
    $("#fontSizeInp").unbind();
	$("#speedReadPause").unbind("mousedown");
	$("#speedReadSkipBackwards").unbind("mousedown");
	$("#speedReadSkipForward").unbind("mousedown");
}


function finishRead(){


	clearReadVariables();
	//user will choose how they would like to quiz themselves
	chooseQuizMode()

}

function chooseReadMode(){

	//user will choose how they would like read the next passage
	openPage(["chooseReadModePage"])
		

}



//skipping a section of the passage
function readNext(){

	currentText++;
	results.push(["Skipped"])
	chooseReadMode();

}


function cancelRead(){
	clearReadVariables();
	chooseReadMode();

}