









function chooseQuizMode(){
	openPage(["chooseQuizModePage"])

	//checking if each mode has enough questions to work
	var genQuestions = generateFillQuestions(passageToRead);
	if(genQuestions.length > 0){
		if(genQuestions.length  == 1){
            $("#fillQuestNum").html("<b>" + genQuestions.length	+ " Question</b>");
        }
        else{
            $("#fillQuestNum").html("<b>" + genQuestions.length	+ " Questions</b>");
        }
	}else{
		$("#fillModeOption").css("opacity", "0.5");
		$("#fillModeOption").css("cursor","default");
		$("#fillModeOption").prop("onclick", null);
		$("#fillQuestNum").html("<b>This mode is not compatible with the passage</b>");
	}


	genQuestions = generateImpQuestions(passageToRead);
	if(genQuestions.length > 0){
        if(genQuestions.length  == 1){
            $("#impQuestNum").html("<b>" + genQuestions.length	+ " Question</b>");
        }
        else{
            $("#impQuestNum").html("<b>" + genQuestions.length	+ " Questions</b>");
        }
	}else{
		$("#impModeOption").css("opacity", "0.5");
		$("#impModeOption").css("cursor","default");
		$("#impModeOption").prop("onclick", null);
		$("#impQuestNum").html("<b>This mode is not compatible with the passage</b>");
	}

	genQuestions = generateTimeQuestions(passageToRead);
	if(genQuestions.length > 0){
		if(genQuestions.length  == 1){
            $("#timeQuestNum").html("<b>" + genQuestions.length	+ " Question</b>");
        }
        else{
            $("#timeQuestNum").html("<b>" + genQuestions.length	+ " Questions</b>");
        }
	}else{
		$("#timeModeOption").css("opacity", "0.5");
		$("#timeModeOption").css("cursor","default");
		$("#timeModeOption").prop("onclick", null);
		$("#timeQuestNum").html("<b>This mode is not compatible with the passage</b>");
	}



}







function quiz(mode){

	currentMode = mode;
	if(mode == "summarize"){


		
		//open quiz page and the summary textarea
		$("#quizFooterHUD").hide();
		openPage(["quizPage","summaryInputPage"])

	}
	if(mode == "fill"){

		//open quiz page and the fill-in-the-blank section
		$("#quizFooterHUD").show();
		openPage(["quizPage", "ftbQuestionPage"])
		fillQuizMode();
	}

	if(mode == "imposter"){
		$("#quizFooterHUD").show();
		openPage(["quizPage", "imposterPage"])
		impQuizMode();
	}

	if(mode == "timeline"){
		$("#quizFooterHUD").show();
		openPage(["quizPage", "timelinePage"]);
		timeQuizMode();
	}

}


function finishQuiz(){
	//show results move on to choosing another quiz
	play("res/sounds/finish.wav");
	chooseQuizMode();
	
}