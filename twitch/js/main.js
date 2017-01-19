$(function(){
	(function(){
		function search(){
			$.ajax({
				url: 'https://api.twitch.tv/kraken/streams?game=dota%202&limit=16',
				headers:{
					Accept: 'application/vnd.twitchtv.v3+json',
					'Client-Id':'1gpgz9i8q62g3jqrpr3csg8e4sj7u9'
				},
				success:function(response){
					$(".content .item").each(function(index) {
						var info=response.streams[index];
						$(this).attr('href', info.channel.url);	
						$(this).find('img').attr('src', info.preview.medium);
						$(this).find('.status').text(info.channel.status);
						$(this).find('.name').text(info.channel.display_name);
						$(this).find('.num span').text(info.viewers);
					});

				}
			});

			$(".topbar").animate({marginTop:"10px"}, 400, function(){
				$(".content").animate({height:"show"}, 400);
			});
		}

		$(".btn").click(function(event) {
			search();
		});

		$(".item").hover(function() {
			$(this).find('.layer').stop().fadeIn(400).find('span').addClass('hovered');
		}, function() {
			$(this).find('.layer').stop().fadeOut(400).find('span').removeClass('hovered');
		});
	})();
});