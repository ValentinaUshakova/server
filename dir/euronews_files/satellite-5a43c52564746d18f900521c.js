_satellite.pushBlockingScript(function(event, target, $variables){
  //As we have an async loading of DTM tag _satellite object does not exist at the end of the page
//so an option is to call it from here and it will trigger the analytics tool request 
//_satellite.notify("Call Page Bottom") ; 
//_satellite.pageBottom() ; 

});
