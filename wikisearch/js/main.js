$(function(){
	(function(){
		var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=';
		
		// search函数，通过AJAX/wikiAPI得到响应信息
		function search(url){
			$.ajax({
				url: url,
				success:function(response){
					// 获取响应信息中的pageid
					var x=[];
					for (var pageid in response.query.pages) {
						x.push(pageid);
					}

					// 得到每个pageid的信息，包括搜索标题，摘要，链接，图片等
					$(x).each(function(index, el) {
						var page=response.query.pages[x[index]];

						var title=page.title;
						var extract=page.extract;
						var imgsrc="";
						try{
							imgsrc=page.thumbnail.source;
						}catch(e){}
						var listcontent="";
						if(imgsrc){
							listcontent="<img src='"+imgsrc+"'>";
						}
						listcontent+=extract;
						var href="http://en.wikipedia.org/wiki/"+encodeURIComponent(title);
						var list=$(".searchresult ol li").eq(index);
						list.find('a').text(title).attr('href', href);
						list.find('p').html(listcontent);
					});
				}
			});
		}

		// 点击搜索按钮后触发
		$(".searchbtn").click(function() {
			var searchwhat=$(".inputbox").val();
			if(searchwhat&&searchwhat!=="please input something"){
				var searchurl=url+searchwhat;
				search(searchurl);
				// 动画效果
				$(".logo img").fadeOut();
				$(".searchbox").animate({marginTop:"5px"}, 400,function(){
					$(".searchresult").animate({height:"show"}, 600);
				});
			}else{
				$(".inputbox").val("please input something").trigger('focus');
			}
		});

		// 文本框获得焦点后触发
		$(".inputbox").focus(function() {
			$(this).select();
			$(".searchbox").animate({marginTop:"300px"}, 400 ,function(){
				$(".logo img").fadeIn();
			});
			$(".searchresult").stop(true,true).animate({height:"hide"}, 600);
		}).keyup(function(event) {
			// 按回车触发搜索
			if (event.keyCode==13) {
				$(".searchbtn").trigger('click');
			}
		});
	})();
});