



/*
is -> isn't
was -> wasn't
will -> wont
can -> can't
could -> couldn't
should -> shouldn't
are -> aren't
were -> weren't
would -> would't
do -> don't
did -> didn't
has -> hasn't
have -> haven't



always -> never
love -> hate
none of -> all of
almost -> barely
with -> without
everything -> nothing
except -> including
rarely -> often
best -> worst
correct -> wrong
*/

//reverse the meaning of a piece of text
function reverseMeaning(text){
	text = text.split(" ");
    text = text.reverse();

	for (var i = 1; i < text.length-1; i++){

		var prevWord = filterWord(text[i - 1])
		var currWord = filterWord(text[i]);
		var nextWord = filterWord(text[i + 1]);


		//turning "is" into "isn't" and "isn't" into "is"
		if(currWord == "is" && nextWord != "not"){
			text[i] = text[i].replace("is", "isn't")
		}

		if(currWord == "is" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "isn't"){
			text[i] = text[i].replace("isn't", "is")
		}

		
		//turning "was" into "wasn't" and "wasn't" into "was"
		if(currWord == "was" && nextWord != "not"){
			text[i] = text[i].replace("was", "wasn't")
		}

		if(currWord == "was" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "wasn't"){
			text[i] = text[i].replace("wasn't", "was")
		}


		//turning "will" into "won't" and "won't" into "will"
		if(currWord == "will" && nextWord != "not"){
			text[i] = text[i].replace("will", "won't")
		}

		if(currWord == "will" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "won't"){
			text[i] = text[i].replace("won't", "will")
		}


		//turning "can" into "can't" and "can't" into "can"
		if(currWord == "can" && nextWord != "not"){
			text[i] = text[i].replace("can", "can't")
		}

		if(currWord == "can" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "can't"){
			text[i] = text[i].replace("can't", "can")
		}


		//turning "could" into "couldn't" and "couldn't" into "could"
		if(currWord == "could" && nextWord != "not"){
			text[i] = text[i].replace("could", "couldn't")
		}

		if(currWord == "could" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "couldn't"){
			text[i] = text[i].replace("couldn't", "could")
		}


		//turning "should" into "shouldn't" and "shouldn't" into "should"
		if(currWord == "should" && nextWord != "not"){
			text[i] = text[i].replace("should", "shouldn't")
		}

		if(currWord == "should" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "shouldn't"){
			text[i] = text[i].replace("shouldn't", "should")
		}


		//turning "are" into "aren't" and "aren't" into "are"
		if(currWord == "are" && nextWord != "not"){
			text[i] = text[i].replace("are", "aren't")
		}

		if(currWord == "are" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "aren't"){
			text[i] = text[i].replace("aren't", "are")
		}


		//turning "were" into "weren't" and "weren't" into "were"
		if(currWord == "were" && nextWord != "not"){
			text[i] = text[i].replace("were", "weren't")
		}

		if(currWord == "were" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "weren't"){
			text[i] = text[i].replace("weren't", "were")
		}


		//turning "would" into "wouldn't" and "wouldn't" into "would"
		if(currWord == "would" && nextWord != "not"){
			text[i] = text[i].replace("would", "wouldn't")
		}

		if(currWord == "would" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "wouldn't"){
			text[i] = text[i].replace("wouldn't", "would")
		}


		//turning "do" into "don't" and "don't" into "do"
		if(currWord == "do" && nextWord != "not"){
			text[i] = text[i].replace("do", "don't")
		}

		if(currWord == "do" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "don't"){
			text[i] = text[i].replace("don't", "do")
		}

		//turning "did" into "didn't" and "didn't" into "did"
		if(currWord == "did" && nextWord != "not"){
			text[i] = text[i].replace("did", "didn't")
		}

		if(currWord == "did" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "didn't"){
			text[i] = text[i].replace("didn't", "did")
		}


		//swapping "has" and "hasn't"
		if(currWord == "has" && nextWord != "not"){
			text[i] = text[i].replace("has", "hasn't")
		}

		if(currWord == "has" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "hasn't"){
			text[i] = text[i].replace("hasn't", "has")
		}

		//swapping "have" and "haven't"
		if(currWord == "have" && nextWord != "not" && prevWord.slice(-3) != "n't" && prevWord.slice(-3) != "uld"){
			text[i] = text[i].replace("have", "haven't")
		}

		if(currWord == "have" && nextWord == "not"){
			text[i + 1] = text[i+1].replace("not", "")
		}

		if(currWord == "haven't"){
			text[i] = text[i].replace("haven't", "have")
		}









		//swapping "always" and "never"
		if(currWord == "always"){
			text[i] = text[i].replace("always", "never")
		}
		if(currWord == "never"){
			text[i] = text[i].replace("never", "always")
		}


		//swapping "love" and "hate"
		if(currWord == "love"){
			text[i] = text[i].replace("love", "hate")
		}
		if(currWord == "hate"){
			text[i] = text[i].replace("hate", "love")
		}

		//swapping "almost" and "barely"
		if(currWord == "almost"){
			text[i] = text[i].replace("almost", "barely")
		}
		if(currWord == "barely"){
			text[i] = text[i].replace("barely", "almost")
		}


		//swapping "all of" and "none of"
		if(currWord == "none" && nextWord == "of"){
			text[i] = text[i].replace("none", "all")
		}
		if(currWord == "all" && nextWord == "of"){
			text[i] = text[i].replace("all", "none")
		}


		//swapping "with" and "withput"
		if(currWord == "with"){
			text[i] = text[i].replace("with", "without")
		}
		if(currWord == "without"){
			text[i] = text[i].replace("without", "with")
		}

		//swapping "everything" and "nothing"
		if(currWord == "everything"){
			text[i] = text[i].replace("everything", "nothing")
		}
		if(currWord == "nothing"){
			text[i] = text[i].replace("nothing", "everything")
		}

		//swapping "except" and "including"
		if(currWord == "except"){
			text[i] = text[i].replace("except", "including")
		}
		if(currWord == "including"){
			text[i] = text[i].replace("including", "except")
		}


		//swapping "rarely" and "often"
		if(currWord == "rarely"){
			text[i] = text[i].replace("rarely", "often")
		}
		if(currWord == "often"){
			text[i] = text[i].replace("often", "rarely")
		}
        
        //swapping "best" and "worst"
		if(currWord == "best"){
			text[i] = text[i].replace("best", "worst")
		}
		if(currWord == "worst"){
			text[i] = text[i].replace("worst", "best")
		}
        
        //swapping "correct" and "wrong"
		if(currWord == "correct"){
			text[i] = text[i].replace("correct", "wrong");
		}
		if(currWord == "wrong"){
			text[i] = text[i].replace("wrong", "correct");
		}



		if(prevWord != filterWord(text[i - 1]) || currWord != filterWord(text[i]) || nextWord != filterWord(text[i + 1])){
			break;
		}




	}

    text = text.reverse();

	return text.join(" ")
}




function generateImpQuestions(text){

	var inversions = [];
	var sents = breakText(text, "sentence", 1);

	for(var i of sents){
		if(i != reverseMeaning(i)){
			inversions.push([i, reverseMeaning(i)])

		}
	}

	return inversions

}




var impQuestions = [];
var impQuestNum = 0;
var correctImpSentence ="";
var wrongImpSentence = "";
var impAlreadyChecked = false;


function writeImpQuestion(){


	changeColor("none","impNum1");
    changeColor("none","impNum2");
	impAlreadyChecked = false;

	correctImpSentence = impQuestions[impQuestNum][0];
	wrongImpSentence = impQuestions[impQuestNum][1];
	var randomImpSentences = [correctImpSentence, wrongImpSentence].sort(() => Math.random() - 0.5);
	$("#impSent1").text(randomImpSentences[0]);
	$("#impSent2").text(randomImpSentences[1]);
	document.getElementById("quizFooterHUD").textContent = impQuestNum + 1 + "/" + impQuestions.length;


}





function checkImpAnswer(chosenImpSentence){

	if(!impAlreadyChecked){

		if(chosenImpSentence == 1){
			if($("#impSent1").text() == correctImpSentence){
				play("res/sounds/correct.wav");
                changeColor("green","impNum1");
			}

			else{
				play("res/sounds/wrong.wav");
				changeColor("red","impNum1");
			}

		}

		if(chosenImpSentence == 2){
			if($("#impSent2").text() == correctImpSentence){
				play("res/sounds/correct.wav");
				changeColor("green","impNum2");
			}

			else{
				play("res/sounds/wrong.wav");
				changeColor("red","impNum2");
				//document.getElementById("impSent1").style.backgroundColor = "rgb(224,255,224)";
			}

		}
		impAlreadyChecked = true;
	}

}


function changeImpQuestion(direction){

	if(direction == "next"){

		impQuestNum++;
		if(impQuestNum == impQuestions.length){
			impQuestNum = 0;
		}

	}


	if(direction == "previous"){

		impQuestNum--;
		if(impQuestNum == -1){
			impQuestNum = impQuestions.length-1;
		}

	}


	$("#impSentContainer").fadeOut("fast", function(){
		writeImpQuestion();
		$("#impSentContainer").fadeIn("fast");
	})
	

}






function impQuizMode(){

	//generate inversion questions and randomize them
	impQuestions = generateImpQuestions(passageToRead).sort(() => Math.random() - 0.5);
	impQuestNum = 0;
	writeImpQuestion();



	//CONTROLS
	document.body.onkeydown = function(e){


		if(currentMode == "imposter"){

			//previous question
			if(e.keyCode == 37){
				changeImpQuestion("previous");
				e.preventDefault();
			}

			//next question
			else if(e.keyCode == 39 || (e.keyCode == 13 && impAlreadyChecked)){
				changeImpQuestion("next");
				e.preventDefault();
			}


			//check sentence 1
			else if(e.keyCode == 49){
				checkImpAnswer(1);
				e.preventDefault();
			}


			//check sentence 2
			else if(e.keyCode == 50){
				checkImpAnswer(2);
				e.preventDefault();
			}



			else{
				return;
			}

		}

	}


}