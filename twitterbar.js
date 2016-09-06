var twitter_screen_name = 'cnn' //'gokabam'  //EuromaidanPR

var max_tweets = 6

var config1 = {
     // profile or
    // "id": '345170787868762112', number in url from https://twitter.com/settings/widgets/ , to do searches or other stuff
    "profile": {"screenName": 'gokabam'},
    "domId": 'example1',
    "maxTweets": 6,
    "enableLinks": true,
    "showUser": true,
    "showTime": true,
    "lang": 'en'
};

var config_for_tweets = {
    // profile or
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
      var thing = '<li data-update="'+data[i].tid+'"><a href="' +data[i].permalinkURL + '" target="_BLANK">' + '[' + data[i].time + '] '+data[i].tweet+ '</a></li>'
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

}

$(function() {
  //  twitterFetcher.fetch(config1);



    $('#webticker').webTicker();
    refreshTweetList();
    setInterval(refreshTweetList, 60000)

});

