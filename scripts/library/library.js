
//variables for creating new passage
var writePurpose = "";
var writeId = 0;



//timestamping passages
function timeStampPassage(id){

	var d = new Date();
	var time = d.getTime();
	var oldPassage = JSON.parse(localStorage.getItem("passage" + id));
	oldPassage.timeStamp = time;

	localStorage.setItem("passage" + id, JSON.stringify(oldPassage));


}






function makeNewPassage(title, text){


	var newPassage = {
		id: localStorage.getItem("numOfPass"),
		title: title,
		text: text

	};

	localStorage.setItem("passage" + localStorage.getItem("numOfPass"), JSON.stringify(newPassage));
	timeStampPassage(localStorage.getItem("numOfPass"));

	localStorage.setItem("numOfPass", parseInt(localStorage.getItem("numOfPass")) + 1);




}

//creating introduction passage if new user
if((localStorage.getItem("name") == null || localStorage.getItem("name") == "") && (localStorage.getItem("numOfPass") == 0 ) || localStorage.getItem("numOfPass") == null){
    makeNewPassage("What is ZoomStudy?", `ZoomStudy is a unique way to create unique and efficient study sessions!

ZoomStudy was created by Ifedolapo Shiloh Olotu in 2022 for the Congressional App Challenge.
The web app allows users to read and then quiz themselves on passages using various reading and quizzing modes.
When reading a passage, the user can use the Free-Read mode, which allows the users to read at their own pace with a timer and WPM(Words-Per-Minute) tracker, or they can use the Speed-Read mode, where the user can read at a set WPM to put their skills to the test!
When quizzing themselves on a passage, the user has 4 modes for quizzing: Summarize, Fill-In-The-Blank, Imposter, and Timeline.
In the Summarize mode, the user can test their memory by trying their best to summarize the passage read.
In the Fill-In-The-Blank mode, the user is tested through unique algorithm-generated fill-in-the-blank questions.
In the Imposter mode, the user is presented with 2 versions of the same sentence and must discern which is the correct one.
And finally, in the Timeline mode, the user is presented with 3 sentences which they must rearrange into the correct order.

ZoomStudy aims to be a one-stop-shop for all your studying needs! It enhances your studying experiences with a variety of studying techniques and effective reading comprehension strategies. Happy studying!`);
}




//checking the sorting of the passages
function checkPassageSorting(passages){

	var sorted = true;
	for(var i = 0; i<passages.length-1; i++){
		if(passages[i].timeStamp < passages[i+1].timeStamp){sorted = false}
	}

	return sorted;


}


//sorting the passages by thier timestamp using a bubble sort
function sortPassages(passages){

	for(var i = 0; i < passages.length-1; i++){
		if(passages[i].timeStamp < passages[i+1].timeStamp){
			var tempPassage = passages[i];
			passages[i] = passages[i+1];
			passages[i+1] = tempPassage;
		}
	}

	return passages;

}




function displayPassages(){


	document.getElementById("passages").innerHTML = "";


	var numOfPass = parseInt(localStorage.getItem("numOfPass"));
	var allPassages = [];
	for(var i = 0; i < numOfPass; i++){

		var currentPassage = JSON.parse(localStorage.getItem("passage" + i));
		if(currentPassage == null){continue}
		if(currentPassage.timeStamp == null){
			timeStampPassage(currentPassage.id);
		}
		allPassages.push(currentPassage);

	}

	//sorting the passages by recency
	while(checkPassageSorting(allPassages) == false){
		allPassages = sortPassages(allPassages);
	}


	for(var i = 0; i < allPassages.length; i++){


		//render each passage
		var currentPassage = JSON.parse(localStorage.getItem("passage" + allPassages[i].id));


		//cut off text preview
		var textCutoff = currentPassage.text;
		if(textCutoff.length > 200){
			textCutoff = textCutoff.substring(0,200) + "...";
		}

		document.getElementById("passages").innerHTML += `

		<div class="passageOption" id="passageOption`+currentPassage.id+`">
				
			<h3 class="bigTitle">`+currentPassage.title+`</h3>
			<h5 class="subText">`+textCutoff+`</h5> 


			<br><br>


			<div style='display:flex; justify-content:center'>

				<button class="passageOptionButton" onclick="openWritePage('edit', id=`+currentPassage.id+`)"><img src="res/svg/pencil.svg" align="middle"></button>
				<button class="passageOptionButton" onclick="confirmRemove(`+currentPassage.id+`)"><img src="res/svg/trash.svg" align="middle"></button>
				<button class='studyButton' onclick='chosePassage(`+ currentPassage.id +`)'><h3>study</h3></button>

			</div>

		</div>


		`;

	}
    
    if(allPassages.length == 0){
        document.getElementById("passages").innerHTML = `
            
            <div class="passageOption" style="opacity:0.5">
                <img style="display:block; margin:auto; width:50px" src="res/svg/really.svg">
                <h4 class="subText"><b style="font-weight:600">looks like you don't have any passages</b>
                <br>click the plus button to get started</h4>
            </div>

        `;
    }


}




function editPassage(id, title, text){

	var oldPassage = JSON.parse(localStorage.getItem("passage" + id));
	oldPassage.title = title;
	oldPassage.text = text;

	localStorage.setItem("passage" + id, JSON.stringify(oldPassage));

	timeStampPassage(id);

}







function openWritePage(purpose, id = -1){

	writePurpose = purpose;
	if(id != -1){writeId = id}
	openPage(["writePage"]);

	if(purpose == "edit"){

		var openedPassage = JSON.parse(localStorage.getItem("passage" + id));
		$("#writeTitleInput").val(openedPassage.title);
		$("#writeInput").val(openedPassage.text);

	}
	if(purpose == "new"){

		$("#writeTitleInput").val("Untitled");
		$("#writeInput").val("");

	}

}


function removePassage(id){
    
	$("#passageOption" + id).fadeOut("slow", function(){
		localStorage.removeItem("passage" + id);
		displayPassages();
	});

}

function confirmRemove(id){
    warn("are you sure you want to delete this passage?", "once it's deleted it can't be recovered", function(){removePassage(id)});
}




function finishWrite(){
	if(writePurpose == "edit"){

		editPassage(writeId, $("#writeTitleInput").val(), $("#writeInput").val());


	}
	if(writePurpose == "new"){
		makeNewPassage($("#writeTitleInput").val(), $("#writeInput").val());
	}

	displayPassages();
	openPage(["libraryPage"]);

}


function openLibrary(){

	$("#welcomeTitle").text("welcome back, " + localStorage.getItem("name").toLowerCase());

	displayPassages();
	openPage(["libraryPage"]);
}


function chosePassage(id){

	timeStampPassage(id);
	var chosePassage = JSON.parse(localStorage.getItem("passage" + id));
	passageToRead = chosePassage.text;
	chooseReadMode();


}



displayPassages();