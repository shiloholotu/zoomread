var lastOpenedPages = [];
var settingsOpened = false;

function toggleSettings(){

	if(!settingsOpened){
		lastOpenedPages = currentPages;
        if(lastOpenedPages.includes("readPage")){
            if(!speedReadPaused){
                toggleSpeedReadPause();
            }
            if(!freeReadPaused){
                toggleFreeReadPause();
            }
        }
        
		openPage(["settingsPage"]);
		$("#settingsImg").attr("src", "res/svg/cancel.svg");
        
        $("#nameSetting").val(localStorage.getItem("name"));
        $("#wpmSetting").val(localStorage.getItem("wpm"));
        $("#fontSizeSetting").val(localStorage.getItem("fontSize"));
        $("#volumeSetting").val(localStorage.getItem("volume"));
        
        
	}else{
		openPage([...lastOpenedPages]);
		$("#settingsImg").attr("src", "res/svg/settings.svg");
	}
	settingsOpened = !settingsOpened;
}


function saveSettings(){
    
    if($("#nameSetting").val() != ""){
        localStorage.setItem("name", $("#nameSetting").val());
    }
    
    if($("#wpmSetting").val() != ""){
        localStorage.setItem("wpm", $("#wpmSetting").val());
    }
    
    if($("#fontSizeSetting").val() != ""){
        localStorage.setItem("fontSize", $("#fontSizeSetting").val());
    }
    
    if($("#volumeSetting").val() != ""){
        if(parseInt($("#volumeSetting").val()) > 100){$("#volumeSetting").val("100")}
        localStorage.setItem("volume", $("#volumeSetting").val());
    }
    
}