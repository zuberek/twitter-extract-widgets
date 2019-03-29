const Fetcher = require('./tools/fetchers/scriptTag');

// var config = {
//     url: 'https://syndication.twitter.com/timeline/profile?callback=__twttrf.callback&dnt=false&screen_name=BarackObama&suppress_response_codes=true&rnd=' + Math.random(),
//     noOfTwitts: 20,
//     showAuthor: true,
//     showRetwitts: true,
//     showMedia: true,
// }

// var fetcher = new Fetcher(config);

// fetcher.fetch();
function extract(userConfig){    
    var fetcher = new Fetcher(userConfig);
    
    var extracted =  fetcher.fetch();  
    console.log(extracted);
    return extracted;  
}

window.extract = extract;