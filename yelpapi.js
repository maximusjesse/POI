
/////////////////////YELP API////////////////////////////
var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey : "SlHMvGCCQA2pNqo2dMb0gg",
    consumerSecret : "olzpivNywfuXqjZeqiEZGkye9nA",
    accessToken : "K7favsOUA1mHPaXL-mPWo5-XPPGBbUWO",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret : "jelWv6KGN-UAZlohQZntM6QOkOQ",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

function getSearchResults(parameters) {
  var accessor = {
      consumerSecret : auth.consumerSecret,
      tokenSecret : auth.accessTokenSecret
  };
  /*parameters.push(['term', 'food']);
  parameters.push(['limit', '20']);
  parameters.push(['location', 'Atlanta']); */
  parameters.push(['callback', 'cb']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
  var message = {
      'action' : 'http://api.yelp.com/v2/search',
          'method' : 'GET',
      'parameters' : parameters
  };
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
    
  return $.ajax({
      'url': message.action,
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'success': function(data, textStats, XMLHttpRequest) {
        //console.log(data);
        //$("body").append(data);
      }
    })

}
 
function getBusiness(businessID) {
var accessor = {
      consumerSecret : auth.consumerSecret,
      tokenSecret : auth.accessTokenSecret
  };
  /*parameters.push(['term', 'food']);
  parameters.push(['limit', '20']);
  parameters.push(['location', 'Atlanta']); */
  parameters = [businessID];
  parameters.push(['callback', 'cb']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
  var message = {
      'action' : 'http://api.yelp.com/v2/business/',
          'method' : 'GET',
      'parameters' : parameters
  };
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
    
  return $.ajax({
      'url': message.action,
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'success': function(data, textStats, XMLHttpRequest) {
        //console.log(data);
        //$("body").append(data);
      }
    })
}
