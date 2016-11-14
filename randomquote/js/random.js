//基本上都是freecodecamp上的，之后自己尝试重写。暂时不知道API如何获取。目前这部分看懂后倒是不难。

var currentQuote = '', currentAuthor = '';

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },

    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',

    success: function(response) {
      var r = JSON.parse(response);
      currentQuote = r.quote;
      currentAuthor = r.author;

      $('#tweeturl').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      $('#tumurl').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));


      $(".quotecontent").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#content').text(r.quote);//以动画渐进的形式改变文字内容
        });

      $(".quoteauthor").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').text("--"+r.author);
        });
    }
  });
}

$(document).ready(function() {
  getQuote();
  $('#newquote').on('click', getQuote);
});
