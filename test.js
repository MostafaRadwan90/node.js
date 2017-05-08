function CreateMessageboard(BoardMessages){
  var htmlMessageboardString = "ffffff";

  

  for(var i = 0; i < BoardMessages.length;i++){
        (function(){
            var j = i;
            console.log("Loading message %d".green, j);
            htmlMessageboardString += MessageToHTMLString(BoardMessages[j]);
          })();
  }
}
