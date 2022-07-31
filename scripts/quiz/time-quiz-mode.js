

function generateTimeQuestions(text){

	var quests = [];
	var sents = breakText(text, "sentence" , 3);

	for(var i of sents){
		if(breakText(i, "sentence", 1).length == 3){
			quests.push(breakText(i,"sentence", 1));
		}
	}

	return quests;

}




var timeQuestions = [];
var timeQuestNum = 0;
var correctTimeSentenceOrder = [];
var timeAlreadyChecked = false;
var selectedTimeSent = 0;


function writeTimeQuestion(){
	timeAlreadyChecked = false;
	selectedTimeSent = 0;
    
	changeColor("none","timeNum1");
    changeColor("none","timeNum2");
    changeColor("none","timeNum3");

	var timeQuestionsCopy = [...timeQuestions];


	correctTimeSentenceOrder = timeQuestions[timeQuestNum];
	randomTimeSentenceOrder = [...correctTimeSentenceOrder];

	randomTimeSentenceOrder = randomTimeSentenceOrder.sort(() => Math.random() - 0.5);


	$("#timeSent1").text(randomTimeSentenceOrder[0]);
	$("#timeSent2").text(randomTimeSentenceOrder[1]);
	$("#timeSent3").text(randomTimeSentenceOrder[2]);


	document.getElementById("quizFooterHUD").textContent = timeQuestNum + 1 + "/" + timeQuestions.length;

}



function selectTimeSent(sent){

	if(!timeAlreadyChecked){

		if(selectedTimeSent == 0){
			selectedTimeSent = sent;
            changeColor("yellow", "timeNum" + sent);
		}


		else{
			var temp = $("#timeSent" + selectedTimeSent).text();
			$("#timeSent" + selectedTimeSent).text($("#timeSent" + sent).text());
			$("#timeSent" + sent).text(temp);
            changeColor("none", "timeNum" + selectedTimeSent);
			selectedTimeSent = 0;
			
		}
	}


}


function checkTimeOrder(){

	var correct= true;
	if(!timeAlreadyChecked){

		if($("#timeSent1").text() == correctTimeSentenceOrder[0]){
			changeColor("green","timeNum1");
		}
		else{
			changeColor("red","timeNum1");
			correct = false;
		}



		if($("#timeSent2").text() == correctTimeSentenceOrder[1]){
			changeColor("green","timeNum2");
		}
		else{
			changeColor("red","timeNum2");
			correct = false;
		}



		if($("#timeSent3").text() == correctTimeSentenceOrder[2]){
			changeColor("green","timeNum3");
		}
		else{
			changeColor("red","timeNum3");
			correct = false;
		}

		timeAlreadyChecked = true;
		if(correct){
			play("res/sounds/correct.wav");
		}else{
			play("res/sounds/wrong.wav");
		}
	}

}




function changeTimeQuestion(direction){

	if(direction == "next"){

		timeQuestNum++;
		if(timeQuestNum == timeQuestions.length){
			timeQuestNum = 0;
		}

	}


	if(direction == "previous"){

		timeQuestNum--;
		if(timeQuestNum == -1){
			timeQuestNum = timeQuestions.length-1;
		}

	}

	document.getElementById("quizFooterHUD").textContent = timeQuestNum + 1 + "/" + timeQuestions.length;


	$("#timeSentContainer").fadeOut("fast", function(){
		writeTimeQuestion();
		$("#timeSentContainer").fadeIn("fast");
	})
	

}





function timeQuizMode(){

	//generate inversion questions and randomize them
	timeQuestions = generateTimeQuestions(passageToRead).sort(() => Math.random() - 0.5);
	timeQuestNum = 0;
	writeTimeQuestion();



	//CONTROLS
	document.body.onkeydown = function(e){


		if(currentMode == "timeline"){


			//previous question
			if(e.keyCode == 37){
				changeTimeQuestion("previous");
				e.preventDefault();
			}


			//next question
			else if(e.keyCode == 39 || (e.keyCode == 13 && timeAlreadyChecked)){
				changeTimeQuestion("next");
				e.preventDefault();
			}

			//check order
			else if(e.keyCode == 13){
				checkTimeOrder();
                e.preventDefault();
			}


			//select sentence 1
			else if(e.keyCode == 49){
				selectTimeSent(1);
				e.preventDefault();
			}


			//select sentence 2
			else if(e.keyCode == 50){
				selectTimeSent(2);
				e.preventDefault();
			}


			//select sentence 3
			else if(e.keyCode == 51){
				selectTimeSent(3);
				e.preventDefault();
			}




			else{
				return;
			}

		}

	}

}