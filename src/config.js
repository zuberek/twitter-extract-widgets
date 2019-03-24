const BASE_URL = 'https://syndication.twitter.com/timeline/';
const BASE_PARAMS = '?callback=__twttrf.callback&dnt=false&suppress_response_codes=true&rnd=' + Math.random();

function setConfig(cfg){
    var config = {};
    config.showAuthor = (cfg.showAuthor) ? cfg.showAuthor : true;
    config.showRetwitts = (cfg.showRetwitts) ? cfg.showRetwitts : true;
    config.showMedia = (cfg.showMedia) ? cfg.showMedia : true;
    config.noOfTwitts = (cfg.noOfTwitts) ? cfg.noOfTwitts : 20;
    if(cfg.profile) config.url = profileUrl(cfg.profile);
    if(cfg.likes) config.url = likesUrl(cfg.profile);
    if(cfg.list) config.url = listUrl(cfg.list.profile, cfg.list.list);
    return config
}

function profileUrl(profile){
    return BASE_URL + 'profile' + BASE_PARAMS + '&screen_name=' + profile
} 
function likesUrl(profile){
    return BASE_URL + 'likes' + BASE_PARAMS + '&screen_name=' + profile
} 
function listUrl(profile, list){
    return BASE_URL + 'list' + BASE_PARAMS + '&screen_name=' + profile + '&list_slug=' + list
} 

module.exports = {
    setConfig,
}