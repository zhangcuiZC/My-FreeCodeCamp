$(function(){
	var $item=$(".ttt-item"),
		playerturn=true,
		playerStyle="O",
		gameover=false;
		computerStyle="X";

	$item.click(function(event) {
		if(playerturn){
			playerRound(event);
		}
	});

	function playerRound(event){
		var $el=$(event.target);
		if($el.text()===""){
			playerturn=false;
			$el.text(playerStyle).addClass('player');
			checkWinner();
			computerRound();
		}
	}

	// AI开发中。。。
	function computerRound(){
		if(!gameover){
			var $emptyitem=$item.filter(function(index) {
				return $item.eq(index).text()==="";
			});
			if($emptyitem.length===0){
				return;
			}

			var idx=Math.floor(Math.random()*$emptyitem.length);
			$emptyitem.eq(idx).text(computerStyle).addClass('ai');
			checkWinner();
			playerturn=true;
		}
	}

	function checkWinner(){
		var msg="",textarr=[];
		for(var i=0;i<9;i++){
			textarr.push($item.eq(i).text());
		}
		if(textarr[0]!==""&&textarr[0]===textarr[1]&&textarr[1]===textarr[2]){
			msg=textarr[0]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[3]!==""&&textarr[3]===textarr[4]&&textarr[4]===textarr[5]){
			msg=textarr[3]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[6]!==""&&textarr[6]===textarr[7]&&textarr[7]===textarr[8]){
			msg=textarr[6]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[0]!==""&&textarr[0]===textarr[3]&&textarr[3]===textarr[6]){
			msg=textarr[0]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[1]!==""&&textarr[1]===textarr[4]&&textarr[4]===textarr[7]){
			msg=textarr[1]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[2]!==""&&textarr[2]===textarr[5]&&textarr[5]===textarr[8]){
			msg=textarr[2]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[0]!==""&&textarr[0]===textarr[4]&&textarr[4]===textarr[8]){
			msg=textarr[0]+" is the winner!";
			gameOver(msg);
		}
		if(textarr[2]!==""&&textarr[2]===textarr[4]&&textarr[4]===textarr[6]){
			msg=textarr[2]+" is the winner!";
			gameOver(msg);
		}
	}

	function gameOver(msg){
		gameover=true;
		playerturn=false;
		$("h1").text(msg);
	}
});