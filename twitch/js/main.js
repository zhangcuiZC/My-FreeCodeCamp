$(function(){
	(function(){
		var width=$(".content").width();
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
						$(this).find('img').attr('src', info.preview.medium).css('height',0.5625*0.24*width);
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

		var timer=null;
		$(window).resize(function(event) {
			timer=setTimeout(function(){
				clearTimeout(timer);
				var width=$(".content").width();
				$(".item img").css('height',0.5625*0.24*width);
			},200);
		});

		$(".item").hover(function() {
			$(this).find('.layer').fadeIn(200);
		}, function() {
			$(this).find('.layer').fadeOut(200);
		});
	})();
});