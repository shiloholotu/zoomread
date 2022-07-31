var currentPages = [];

function openPage(pagesToOpen){

	var pages = document.getElementsByClassName("page");
	currentPages = pagesToOpen;

    $("#fadeCover").fadeIn("slow", function(){
        
        for(var i = 0; i < pages.length; i++) {
            $("#" + pages[i].id).hide();
        }
        
        for(var i = 0; i < pagesToOpen.length; i++){
			$("#" + pagesToOpen[i]).show();
		}
        
        $("#fadeCover").fadeOut("slow");
        
    });

}



function hideAllPages(){

	var pages = document.getElementsByClassName("page");

	for(var i = 0; i < pages.length; i++){
		$("#" + pages[i].id).hide();
	}
}


function fancyReload(){
	var pages = document.getElementsByClassName("page");


	for(var i = 0; i < pages.length; i++) {
		$("#" + pages[i].id).fadeOut("slow")

	}

	setTimeout(function(){
		location.reload();
	}, 600);
}