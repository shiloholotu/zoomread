//keeping track of amount of saved passages
if(localStorage.getItem('numOfPass') == null){
	localStorage.setItem("numOfPass", 0);
}


//saving wpm to local storage
if(localStorage.getItem("wpm") == null){
	localStorage.setItem("wpm", 300);
}


//saving font size to localstorage
if(localStorage.getItem("fontSize") == null){
    localStorage.setItem("fontSize",16);
}


//volume
if(localStorage.getItem("volume") == null){
    localStorage.setItem("volume",100);
}