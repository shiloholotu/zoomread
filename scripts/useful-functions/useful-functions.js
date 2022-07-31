//playing sounds
function play(sound){
    var audio = new Audio(sound);
    audio.volume = parseInt(localStorage.getItem("volume"))/100;
    audio.play();


}


//coloring stuff
//used for showing the correct ans
function changeColor(color, id){
        
    if(color == "green"){
        $("#" + id).css("background-color", "rgb(224,255,224)");
        //$("#" + id).css("border", "4px solid rgb(142,179,142)");
        $("#" + id).css("color", "rgb(73,126,73)");
    }
    
    if(color == "red"){
        $("#" + id).css("background-color", "rgb(255,224,224)");
        //$("#" + id).css("border", "4px solid rgb(179,142,142)");
        $("#" + id).css("color", "rgb(126,73,73)");
    }
    
    if(color == "yellow"){
        $("#" + id).css("background-color", "rgb(255,226,187)");
        $("#" + id).css("color", "rgb(126,73,73)");
    }
    
    if(color == "none"){
        $("#" + id).css("background-color", "");
        //$("#" + id).css("border", "");
        $("#" + id).css("color", "");
    }
    
}



//breaking the inputed text into chunks
//the mode method by which the text is broken up
//size is the size of each chunk of broken text
function breakText(text,mode,size){


  //straighten out those pesky quotation marks
  text = text.replaceAll("”", "\"").replaceAll("“", "\"").replaceAll("’", "'")

  text = text.replaceAll("Mr.", "Mr").replaceAll("Ms.", "Ms").replaceAll("Mrs.", "Mrs");

  //breaking up the text by sentences
  if(mode == "sentence"){

    //The 'text += "."' makes sure that every sentence ends with some sort of punctuation
    if(text[text.length-1] != "." && text[text.length-1] != "!" && text[text.length-1] != "?"){
      text+=".";
    }



    var chunks = [];
    var currChunk = "";
    var chunkSize = 0;
    var next;

    for(var i in text){

      i = parseInt(i);
      next = text[i+1];
      currChunk += text[i];

      //if the current character is a "!", "?", or "." and isn't followed by other puncutation, like ?? or ..., then that means we have reached the end of a sentence
      if((text[i] == "." || text[i] == "!" || text[i] == "?" || text[i] == "\n" || text[i] == "\"" || text[i] == "—") && (next == " " || (text[i] != "\n" && next == "\n"))){
        chunkSize++;
      }

      //if the size of the current chunk reaches the desired chunk size, or if we reach the end of the text, then add the current chunk to the array of all of the chunks
      if((chunkSize == size || next == null) && filterWord(currChunk) != ""){

        //remove any space that start the sentence
        if(currChunk.charAt(0) == " "){currChunk = currChunk.substring(1)}
        chunks.push(currChunk);
        currChunk = "";
        chunkSize = 0;

      }



    }

    //the pop is because of the "undefined" chunk at the end of the array
    //chunks.pop();
    return chunks;

  }

  //breaking up the text by words
  if (mode == "word"){

    var splitText = text.split(" ");
    var chunks = [];
    var currChunk = "";
    var chunkSize = 0;

    for (var i in splitText){

      i = parseInt(i);
      currChunk += " " + splitText[i];
      chunkSize++;

      if(chunkSize == size || splitText[i+1] == null){

        chunks.push(currChunk);
        currChunk = "";
        chunkSize = 0;

      }

    }

    return chunks;

  }

  //breaking text up by paragraph
  if (mode == "paragraph"){

    //chunks is all the chunks
    //curChunk is the current chunk, group of paragraphs, being parsed
    //chunkSize is the amount of paragraphs we want in a chunk
    var chunks = [];
    var currChunk = "";
    var chunkSize = 0;
    //go throught each character and add it to the current chunk
    for(var i in text){

      i = parseInt(i);
      next = text[i + 1]
      currChunk += text[i]
      
      /*if we hit a line break that isn't followed by another line break and isn't the first character of the input,
      then that means that we've hit the end of a paragrah

      */
      if(text[i] == "\n" && next != "\n" && i != 0){
        chunkSize++
      }

      //if we hit the desired chunk size, then add the current chunk to chunks and reset the current chunk and chunk size
      if(chunkSize == size){
        chunks.push(currChunk);
        currChunk = "";
        chunkSize = 0;
      }

    }

    //add any left over text, aslong as there's actually text there
    if(currChunk.replaceAll("\n") != ""){
      chunks.push(currChunk);
      currChunk = "";
      chunkSize = 0;
    }

    return chunks

  }




}
















function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}








//removes unessecary characters from words
function filterWord(word){

  var newWord = "";
  var chunkOfChars = "";
  for(var i = 0; i < word.length; i++){
    chunkOfChars += word[i];

    //if character is a letter
    if (word[i].toLowerCase() != word[i].toUpperCase()){
      newWord += chunkOfChars;
      chunkOfChars = "";
    }
  }








  //reverse the word and do it again
  word = newWord.split("").reverse().join("");
  newWord = "";
  chunkOfChars = "";

  for(var i = 0; i < word.length; i++){
    chunkOfChars += word[i];

    //if character is a letter
    if (word[i].toLowerCase() != word[i].toUpperCase()){
      newWord += chunkOfChars;
      chunkOfChars = "";
    }
  }

  return newWord.split("").reverse().join("");
}









//remove all instances of item from array
function removeItem(array, item) {
    var i = array.length;

    while (i--) {
        if (array[i] === item) {
            array.splice(array.indexOf(item), 1);
        }
    }

    return array;
}







function removeNonLetters(s){
  for (let i = 0; i < s.length; i++)
    {

        // Finding the character whose
        // ASCII value fall under this
        // range
        if (s[i] < 'A' || s[i] > 'Z' &&
                s[i] < 'a' || s[i] > 'z')
        {
               
            // erase function to erase
            // the character
            s = s.substring(0, i) + s.substring(i + 1);
            i--;
        }
    }


    return s
}









//average an array
const average = (array) => array.reduce((a, b) => a + b) / array.length;







//calculate how differnt words are
function compareWords(wordA, wordB){


    if(wordA.length > 1 && wordB.length > 1){

      wordA = removeNonLetters(wordA).toLowerCase();
      wordB = removeNonLetters(wordB).toLowerCase();

      //object of all the chunks in wordA
      var wordAChunks = {};
      for(var i = 0; i < wordA.length - 1; i++){

          var currChunk = wordA[i] + wordA[i + 1];
          if(currChunk in wordAChunks){
              wordAChunks[currChunk] += 1;
          }else{
              wordAChunks[currChunk] = 1;
          }

      }


      //object of all the chunks in wordB
      var wordBChunks = {};
      for(var i = 0; i < wordB.length - 1; i++){

          var currChunk = wordB[i] + wordB[i + 1];
          if(currChunk in wordBChunks){
              wordBChunks[currChunk] += 1;
          }else{
              wordBChunks[currChunk] = 1;
          }
          
      }




      //how well the chunks in wordA fit into wordB
      var wordAChunkScores = [];
      for(var i in wordAChunks){

          if(i in wordBChunks){
              wordAChunkScores.push(Math.min(...[wordBChunks[i], wordAChunks[i]]) / Math.max(...[wordBChunks[i], wordAChunks[i]]))
          }else{
              wordAChunkScores.push(0)
          }

      }
      
      var wordAChunkScore = average(wordAChunkScores)




      //how well the chunks in wordA fit into wordB
      var wordBChunkScores = [];
      for(var i in wordBChunks){

          if(i in wordAChunks){
              wordBChunkScores.push(Math.min(...[wordAChunks[i], wordBChunks[i]]) / Math.max(...[wordAChunks[i], wordBChunks[i]]))
          }else{
              wordBChunkScores.push(0)
          }

      }
      
      var wordBChunkScore = average(wordBChunkScores)








      //object of all characters in wordA
      var wordAChars = {};
      for(var i of wordA){
          if(i in wordAChars){
              wordAChars[i] += 1;
          }else{
              wordAChars[i] = 1;
          }
      }


      //object of all characters in wordB
      var wordBChars = {};
      for(var i of wordB){
          if(i in wordBChars){
              wordBChars[i] += 1;
          }else{
              wordBChars[i] = 1;
          }
      }




      //how well the chars in wordA fit into wordB
      var wordACharScores = [];
      for(var i in wordAChars){

          if(i in wordBChars){
              wordACharScores.push(Math.min(...[wordBChars[i], wordAChars[i]]) / Math.max(...[wordBChars[i], wordAChars[i]]))
          }else{
              wordACharScores.push(0)
          }

      }
      
      var wordACharScore = average(wordACharScores)



      //how well the chars in wordB fit into wordB
      var wordBCharScores = [];
      for(var i in wordBChars){

          if(i in wordAChars){
              wordBCharScores.push(Math.min(...[wordAChars[i], wordBChars[i]]) / Math.max(...[wordAChars[i], wordBChars[i]]))
          }else{
              wordBCharScores.push(0)
          }

      }
      
      var wordBCharScore = average(wordBCharScores);






      return parseInt(average([average([wordAChunkScore, wordBChunkScore]), average([wordACharScore, wordBCharScore])]) * 100);
    }


}










