$(function(){
	(function(){
		$.ajax({
			url: 'https://api.twitch.tv/kraken/streams/summary',
			// headers:{
				Accept: 'application/javascript',
			// },
			dataType:'jsonp',
			type:'get',
			success:function(response){
				console.log(response);
			}
		});
		





	})();
});