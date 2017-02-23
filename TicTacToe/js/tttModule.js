var tttModule = (function(){
	// ----------------------------------以下：声明变量----------------------------------
	var ttt_html = ""
		+ '<div class="tttbox">'
			+ '<div class="ttt-item ttt-item1"></div>'
			+ '<div class="ttt-item ttt-item2"></div>'
			+ '<div class="ttt-item ttt-item3"></div>'
			+ '<div class="ttt-item ttt-item4"></div>'
			+ '<div class="ttt-item ttt-item5"></div>'
			+ '<div class="ttt-item ttt-item6"></div>'
			+ '<div class="ttt-item ttt-item7"></div>'
			+ '<div class="ttt-item ttt-item8"></div>'
			+ '<div class="ttt-item ttt-item9"></div>'
		+ '</div>'
		+ '<h1 class="ttt-info"></h1>',

		player_style = "O",
		computer_style = "X",
		player_turn = true,
		game_over = false,
		win_msg = "",
		i,
		jqueryMap = {},

		setJqueryMap, playRound, computerRound, checkWinner, gameOver, resetGame, initModule;
	// ----------------------------------以上：声明变量----------------------------------
	// ----------------------------------以下：私有方法----------------------------------
	setJqueryMap = function($container){
		jqueryMap.$item = $container.find('.ttt-item');
		jqueryMap.$info = $container.find('.ttt-info');
	};

	playerRound = function(event){
		var $el = $(event.target);
		if($el.text() === ""){
			player_turn = false;
			$el.text(player_style).addClass('player');
			winmsg = checkWinner();
			if(winmsg){
				gameOver(winmsg);
			}else{
				computerRound();
			}
		}
	};

	// AI开发中。。。
	computerRound = function(){
		if(!game_over){
			var $empty_item = jqueryMap.$item.filter(function(index) {
				return jqueryMap.$item.eq(index).text() === "";
			});
			if($empty_item.length === 0){
				jqueryMap.$info.text("和局");
				setTimeout(function(){
					resetGame();
				}, 1000);
			}

			// 寻找电脑能赢的方法
			for(i=0; i<$empty_item.length; i++){
				$empty_item.eq(i).text(computer_style).addClass('temp');
				winmsg = checkWinner();
				if(winmsg){
					$empty_item.eq(i).addClass('ai').removeClass('temp');
					gameOver(winmsg);
					return;
				}else{
					$empty_item.eq(i).text("").removeClass('temp');
				}
			}

			// 如果电脑无法赢，寻找不让玩家赢的方法
			for(i=0; i<$empty_item.length; i++){
				$empty_item.eq(i).text(player_style).addClass('temp');
				winmsg = checkWinner();
				if(winmsg){
					$empty_item.eq(i).text(computer_style).addClass('ai').removeClass('temp');
					player_turn = true;
					return;
				}else{
					$empty_item.eq(i).text("").removeClass('temp');
				}
			}

			// 啥都没找到，瞎比下一个吧_(:з)∠)_
			if(jqueryMap.$item.eq(4).text()===""){
				jqueryMap.$item.eq(4).text(computer_style).addClass('ai');
			}else{
				var idx = Math.floor(Math.random()*$empty_item.length);
				$empty_item.eq(idx).text(computer_style).addClass('ai');
			}
			player_turn = true;
		}
	};

	checkWinner = function(){
		var msg="",text_arr=[];
		for(var i=0; i<9; i++){
			text_arr.push(jqueryMap.$item.eq(i).text());
		}
		if(text_arr[0] !== "" && text_arr[0] === text_arr[1] && text_arr[1] === text_arr[2]){
			msg = text_arr[0] + " is the winner!";
			return msg;
		}
		if(text_arr[3] !== "" && text_arr[3] === text_arr[4] && text_arr[4] === text_arr[5]){
			msg = text_arr[3]+" is the winner!";
			return msg;
		}
		if(text_arr[6] !== "" && text_arr[6] === text_arr[7] && text_arr[7] === text_arr[8]){
			msg = text_arr[6]+" is the winner!";
			return msg;
		}
		if(text_arr[0] !== "" && text_arr[0] === text_arr[3] && text_arr[3] === text_arr[6]){
			msg = text_arr[0]+" is the winner!";
			return msg;
		}
		if(text_arr[1] !== "" && text_arr[1] === text_arr[4] && text_arr[4] === text_arr[7]){
			msg = text_arr[1]+" is the winner!";
			return msg;
		}
		if(text_arr[2] !== "" && text_arr[2] === text_arr[5] && text_arr[5] === text_arr[8]){
			msg = text_arr[2]+" is the winner!";
			return msg;
		}
		if(text_arr[0] !== "" && text_arr[0] === text_arr[4] && text_arr[4] === text_arr[8]){
			msg = text_arr[0]+" is the winner!";
			return msg;
		}
		if(text_arr[2] !== "" && text_arr[2] === text_arr[4] && text_arr[4] === text_arr[6]){
			msg = text_arr[2]+" is the winner!";
			return msg;
		}
		return msg;
	};

	gameOver = function(msg){
		game_over = true;
		player_turn = false;
		jqueryMap.$info.text(msg);
		setTimeout(function(){
			resetGame();
		}, 1000);
	};

	resetGame = function(){
		jqueryMap.$item.text("").removeClass('ai player temp');
		game_over = false;
		player_turn = true;
		jqueryMap.$info.text("");
	};
	// ----------------------------------以上：私有方法----------------------------------
	// ----------------------------------以下：公有方法----------------------------------
	initModule = function($container){
		$container.append(ttt_html);
		setJqueryMap($container);

		jqueryMap.$item.click(function(event) {
			if(player_turn){
				playerRound(event);
			}
		});
	};
	// ----------------------------------以上：公有方法----------------------------------
	return {
		initModule : initModule
	};
}());
