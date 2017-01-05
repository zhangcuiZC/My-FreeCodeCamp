$(function(){
	(function(){
		$.ajax({
			url: 'https://api.twitch.tv/kraken/streams/summary',
			headers:{
				Accept: 'application/javascript',
				'Client-Id':'1gpgz9i8q62g3jqrpr3csg8e4sj7u9'
			},
			success:function(response){
				console.log(response);
			}
		});
		





	})();
});