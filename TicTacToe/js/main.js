$(function(){
	var $item=$(".ttt-item"),
		playerStyle="O",
		computerStyle="X",
		playerturn=true,
		gameover=false,
		winmsg="",
		i;

	// 绑定事件，表明玩家可以开始了
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
			winmsg=checkWinner();
			if(winmsg){
				gameOver(winmsg);
			}else{
				computerRound();
			}
		}
	}

	// AI开发中。。。
	function computerRound(){
		if(!gameover){
			var $emptyitem=$item.filter(function(index) {
				return $item.eq(index).text()==="";
			});
			if($emptyitem.length===0){
				$("h1").text("和局");
				setTimeout(function(){
					reset();
				}, 1000);
			}

			// 寻找电脑能赢的方法
			for(i=0;i<$emptyitem.length;i++){
				$emptyitem.eq(i).text(computerStyle).addClass('temp');
				winmsg=checkWinner();
				if(winmsg){
					$emptyitem.eq(i).addClass('ai').removeClass('temp');
					gameOver(winmsg);
					return;
				}else{
					$emptyitem.eq(i).text("").removeClass('temp');
				}
			}

			// 如果电脑无法赢，寻找不让玩家赢的方法
			for(i=0;i<$emptyitem.length;i++){
				$emptyitem.eq(i).text(playerStyle).addClass('temp');
				winmsg=checkWinner();
				if(winmsg){
					$emptyitem.eq(i).text(computerStyle).addClass('ai').removeClass('temp');
					playerturn=true;
					return;
				}else{
					$emptyitem.eq(i).text("").removeClass('temp');
				}
			}

			// 啥都没找到，瞎比下一个吧_(:з)∠)_
			if($item.eq(4).text()===""){
				$item.eq(4).text(computerStyle).addClass('ai');
			}else{
				var idx=Math.floor(Math.random()*$emptyitem.length);
				$emptyitem.eq(idx).text(computerStyle).addClass('ai');
			}
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
			return msg;
		}
		if(textarr[3]!==""&&textarr[3]===textarr[4]&&textarr[4]===textarr[5]){
			msg=textarr[3]+" is the winner!";
			return msg;
		}
		if(textarr[6]!==""&&textarr[6]===textarr[7]&&textarr[7]===textarr[8]){
			msg=textarr[6]+" is the winner!";
			return msg;
		}
		if(textarr[0]!==""&&textarr[0]===textarr[3]&&textarr[3]===textarr[6]){
			msg=textarr[0]+" is the winner!";
			return msg;
		}
		if(textarr[1]!==""&&textarr[1]===textarr[4]&&textarr[4]===textarr[7]){
			msg=textarr[1]+" is the winner!";
			return msg;
		}
		if(textarr[2]!==""&&textarr[2]===textarr[5]&&textarr[5]===textarr[8]){
			msg=textarr[2]+" is the winner!";
			return msg;
		}
		if(textarr[0]!==""&&textarr[0]===textarr[4]&&textarr[4]===textarr[8]){
			msg=textarr[0]+" is the winner!";
			return msg;
		}
		if(textarr[2]!==""&&textarr[2]===textarr[4]&&textarr[4]===textarr[6]){
			msg=textarr[2]+" is the winner!";
			return msg;
		}
		return msg;
	}

	function gameOver(msg){
		gameover=true;
		playerturn=false;
		$("h1").text(msg);
		setTimeout(function(){
			reset();
		}, 1000);
	}

	function reset(){
		$item.text("").removeClass('ai player temp');
		gameover=false;
		playerturn=true;
		$("h1").text("");
	}
});