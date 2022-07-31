//$("#chooseModePage").hide();
//hideAllPages();

//chooseReadMode();

if(localStorage.getItem("name") == null || localStorage.getItem("name") == ""){
	openPage(["introPage"]);
}else{
	openLibrary();
}
/*


console.log(getDataFromServer("/all"))
var testData = {
	text: "hi"
}
//sendDataToServer("/newsignup", testData)

//https://www.youtube.com/watch?v=uuT54JIpJzc&ab_channel=CodingShiksha
//I'm going to need this later

*/