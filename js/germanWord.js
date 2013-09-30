var bigNameViz = true;
var historicalData = "";

$("#theName").keyup(function changeThings() {
	if(bigNameViz == true){
    	document.getElementById("theBigName").innerHTML = this.value;
}
	document.getElementById("theOtherName").innerHTML = this.value;
});

$("#clear-history-button").hide();
function clearHistory() {
	historicalData = "";
	var theName = "";
	bigNameViz = true;		
  	document.getElementById("history-data").innerHTML=historicalData;
	$("#clear-history-button").hide();
	document.getElementById("start-button").innerHTML="Anfangen &raquo;";
	document.getElementById("main-word").innerHTML="Los geht's <span id='theBigName'>"+$("#theName").val()+"</span>!";
	document.getElementById("sentence").innerHTML="Brauchst du dein Satzverbindungen lernen?  Weiderdrückt einen Knopf!!!";
}

function getGermanWord() {
	var germanWords = "";
	bigNameViz = false;
	xmlhttp = new XMLHttpRequest();
	
	 xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			germanWords = xmlhttp.responseText;
			var obj = eval(germanWords);
			
			var newData = '<tr><td>'+obj[0].id+'</td><td>'+obj[0].word+'</td><td>'+obj[0].definition+'</td><td>'+obj[0].position+'</td><td>'+obj[0].sentence+'</td></tr>';

			historicalData = historicalData+" "+newData;
			$("#clear-history-button").show();
			document.getElementById("history-data").innerHTML=historicalData;
			document.getElementById("main-word").innerHTML=obj[0].word;
			$("#sentence").fadeOut("slow", function() {
				$('#sentence').html(obj[0].sentence);
				$('#sentence').fadeIn("slow");
			});		
		}
		else {
			document.getElementById("main-word").innerHTML="<img src='spinner.gif' />";
		}
		document.getElementById("start-button").innerHTML="Nächstes Wort &raquo;";
	}
	xmlhttp.open("GET","getWord.php", true);
	xmlhttp.send();

}