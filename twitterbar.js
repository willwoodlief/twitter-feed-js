var twitter_screen_name = 'foxsports' //'gokabam'  //EuromaidanPR

var max_tweets = 6

var instagram_limit = 9;
var instagram_account = 'spacex'; //'teslamotors';//


var config_for_tweets = {
    // profile or
    // to do searches like most current for hashtag, you have to set a new widget in your twitter account
    //and comment out profile,and uncomment the id and put your widget id number, found in the url of the width


    // "id": '345170787868762112', number in url from https://twitter.com/settings/widgets/ , to do searches or other stuff
    "profile": {"screenName": twitter_screen_name},
    "customCallback": getData,
    "maxTweets": max_tweets,
    "enableLinks": true,
    "showUser": true,
    "showTime": true,
    "lang": 'en',
    "dataOnly" : true,
    "showInteraction": true  //set to true if want reply links

};



function getData(data) {
    if (!data) {return; }
    //make string of li elements from data and append to $('#webticker')
    /*

     $("#webticker-update-example").webTicker('update',
     '<li data-update="item1">Web Ticker v3.0.0 has just been released! And the documentation has become even better!</li>
     <li data-update="item2">The Web Ticker v3.0.0 commercial license no longer binds you to make your projects open source.</li>
     <li data-update="item3">An OEM License is also available if your would like to make the WebTicker part of your website builder</li>
     <li data-update="item4">Maze Digital will now be commercially supporting the Web Ticker</li>',
     'swap',
     true,
     false
     );
     */
    s = ''
    for(var i = 0; i < data.length; i++) {
      var thing = '<li class = "newslink" data-update="'+data[i].tid+'"><a href="' +data[i].permalinkURL + '" target="_BLANK">' + '[' + data[i].time + '] '+data[i].tweet+ '</a></li>'
      s += thing + "\n"
        //  console.log(data[i].tweet);
      //  console.log(data[i].permalinkURL);
      //  console.log(data[i].tid);
      //  console.log(data[i].time);
      //  console.log(data[i].author);
      //  console.log(data[i].rt);
      //  console.log(data[i].image);

    }

    $('#webticker').webTicker('update', s, 'swap', true, false);

}

function refreshTweetList(){
    //get the information
    twitterFetcher.fetch(config_for_tweets);
    $('#twitter-username').text('@'+twitter_screen_name)

}

$(function() {
  //  twitterFetcher.fetch(config1);



    $('#webticker').webTicker({
        right:false
    });
    refreshTweetList();
    setInterval(refreshTweetList, 60000)

});






function process_instagram(jsonp_data)
{
    var http_code = jsonp_data.status.http_code;
    if (http_code  > 299) { return ;}

    var data = jsonp_data.contents

    //alert(data.status);

    //go through each item
    for(var i = 0; i < data.items.length; i++){
        if (i >= instagram_limit) {break;}
        var item = data.items[i];
        var thumbnail = item.images.thumbnail.url;
        var image = item.images.standard_resolution.url;
        var caption = item.caption.text;
        $("#gallery").append('<img src="'+thumbnail+'" alt="'+caption+'" data-image="'+image+'" data-description="'+caption+'" />');
    }

        $("#gallery").unitegallery({gallery_theme: "tilesgrid",grid_num_rows:4,tile_width:150,grid_space_between_cols: 10,
        grid_space_between_rows: 10});
    //http://unitegallery.net/index.php?page=tilesgrid-options for more options



}


$(function () {

    var url = 'https://www.instagram.com/'+instagram_account+'/media/';
    url = encodeURIComponent(url);
    url = 'http://gokabam.com/twitterbar/ba-simple-proxy.php?callback=?&url=' + url;
    $.getJSON(url, process_instagram);



});

