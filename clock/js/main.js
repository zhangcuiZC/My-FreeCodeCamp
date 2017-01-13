$(function(){
	var $box=$(".clockbox"),

		$breakminus=$(".break-minus"),
		$breakplus=$(".break-plus"),
		$breaknum=$(".break-num"),

		$sessionminus=$(".session-minus"),
		$sessionplus=$(".session-plus"),
		$sessionnum=$(".session-num"),

		$clockname=$(".clock-name"),
		$clocknum=$(".clock-num");

	$box.on('click', '.click', function(event) {
		var $e=$(event.target);
		if($e.hasClass('break-minus')){
			if($breaknum.text()-0>1){
				$breaknum.text($breaknum.text()-1);
			}
		}

		if($e.hasClass('break-plus')){
			if($breaknum.text()-0<99){
				$breaknum.text($breaknum.text()-0+1);
			}
		}

		if($e.hasClass('session-minus')){
			if($sessionnum.text()-0>1){
				$sessionnum.text($sessionnum.text()-1);
				$clocknum.text($sessionnum.text());
			}
		}

		if($e.hasClass('session-plus')){
			if($sessionnum.text()-0<99){
				$sessionnum.text($sessionnum.text()-0+1);
				$clocknum.text($sessionnum.text());
			}
		}

		if($e.hasClass('clock')){
			alert("5");
		}

	});
});