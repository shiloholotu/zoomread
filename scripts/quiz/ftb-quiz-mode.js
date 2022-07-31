//if the word is a noun(I know, its not perfect)
function isNoun(word){
	return (word.slice(-4) == "tion" || word.slice(-4) == "ness")
}

function isAdj(word){
	return (word.slice(-3) == 'ous')
}


//if the word is a verb(also not perfect)
function isVerb(word){
	return (word.slice(-3) == "ing" || word.slice(-2) == "ed")
}


//if the word contains
function hasNum(word){
	return /\d/.test(word);
}


function isUpper(str) {
    return /[A-Z]/.test(str[0]);
}

/*an important word can be 3 things:
- a word that is captialized, isn't "I", and isn't the first word of a sentence
- a word that ends with "tion" or "ness"
- a word that ends with "ing" or "ed"
*/
function isImportant(word){
	return ((isUpper(word) || isNoun(word) || isVerb(word) || isAdj(word)) && word != "I" && word != "I'm" && word != "I'll" && word != "I'd" && word != "I've" && word.length > 1) //
}






//returns a dictionary that contians all sentences that contain an "important" word and the important words inside those sentences
function getImportantWords(text){
	var impWords = [];
	var impSentences = {};

	//break the text into sentences
	text = breakText(text,"sentence",1);

	for(var i of text){

		//break sentence into words and remove empty spaces
		var splitSentence = removeItem(i.split(" "), "");

		for(var j in splitSentence){

			j = parseInt(j);
			//skip the first word
			if(j == 0){continue}

			//if the current word is 'important' then add it to the the dictionary of important words
			if(isImportant(splitSentence[j])){

				//remove unessecary characers
				var impWord = filterWord(splitSentence[j]);

				if(i in impSentences){
					impSentences[i].push(impWord);
				}else{
					impSentences[i] = [impWord];
				}

			}

		}

	}

	return impSentences

}




//using a dictionary of important sentences and an array of important words, generate fill in the blank fillQuestions
function generateFillQuestions(text){
	var sents = getImportantWords(text)
	var allFillQuesitons = [];
	//pick a random sentence and pick a random important word from that sentence
	var dictKeys = Object.keys(sents);

	for(var i of dictKeys){

		var questSent = i;
		for(var j of sents[questSent]){
			allFillQuesitons.push([questSent, j]);
		}

	}
	

	return allFillQuesitons;


}







//variables for fill mode
var fillQuestions = [];
var fillQuestNum = 0;
var fillCorrectWord = "";
var fillSentence = "";
var fillAlreadyChecked = false;



//show the word in the blank
function showFillAnswer(){

	$("#fillBlank").animate({ opacity: 0 }, "fast", function(){
		document.getElementById("fillBlank").style.color = "black";
		document.getElementById("fillBlank").style.backgroundColor = "transparent";
	});
	
	$("#fillBlank").animate({ opacity: 1 }, "fast");
}




//check the users answer
function checkFillAnswer(){

	if(!fillAlreadyChecked && $("#fillInput").val().length > 1){

		var fillAnswer = document.getElementById("fillInput").value;

		if(compareWords(fillAnswer, fillCorrectWord) >= 65){
			document.getElementById("fillInput").style.backgroundColor = "rgb(224,255,224)";
			play("res/sounds/correct.wav");
		}

		else{
			document.getElementById("fillInput").style.backgroundColor = "rgb(255,224,224)";
			play("res/sounds/wrong.wav");
		}


		showFillAnswer();
		fillAlreadyChecked = true;
	}

}




//display the question
function writeFillQuestion(){

	fillAlreadyChecked = false;
	fillSentence = fillQuestions[fillQuestNum][0];
	fillCorrectWord = fillQuestions[fillQuestNum][1]
	document.getElementById("fillQuestion").innerHTML = DOMPurify.sanitize(fillSentence.replace(fillCorrectWord, "<span id='fillBlank'>"+fillCorrectWord+"</span>"));
	document.getElementById("fillInput").style.backgroundColor = "transparent";
	document.getElementById("fillInput").value = "";

}


//go onto the next or previous question
function changeFillQuestion(direction){


	
	

	if(direction == "next"){
		if(fillQuestNum == fillQuestions.length-1){
			fillQuestNum = -1;
		}
		fillQuestNum+=1;
	}

	if(direction == "previous"){
		if(fillQuestNum == 0){
			fillQuestNum = fillQuestions.length;
		}
		fillQuestNum-=1;
	}

	document.getElementById("quizFooterHUD").textContent = fillQuestNum + 1 + "/" + fillQuestions.length;
	$("#fillQuestion").fadeOut("fast", function(){
		writeFillQuestion();
		$("#fillQuestion").fadeIn("fast");
	});


}





//the fill-in-the-blank mode
function fillQuizMode(){
	fillQuestions = generateFillQuestions(passageToRead).sort(() => Math.random() - 0.5);
	fillQuestNum = 0;
	fillCorrectWord = "";
	document.getElementById("quizFooterHUD").textContent = fillQuestNum + 1 + "/" + fillQuestions.length;



	//CONTROLS
	document.body.onkeydown = function(e){


		if(currentMode == "fill"){

			if(e.keyCode == 37){
				changeFillQuestion("previous");
				e.preventDefault();
			}

			else if(e.keyCode == 39 || (e.keyCode == 13 && fillAlreadyChecked)){
				changeFillQuestion("next");
				e.preventDefault();
			}
			else if(e.keyCode == 13){
				checkFillAnswer();
			}

			else{
				return;
			}

		}

	}


	writeFillQuestion();

}










