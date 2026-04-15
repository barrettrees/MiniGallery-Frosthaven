/*
 * Javascript to construct the homepage 
 */

const checkboxlist = ['Coral','Kelp','Trap','Snowflake','Fist','Astral','Prism','Drill','Shackles','Shards','Meteor']
var skyboxsrc = ""



var icons = document.getElementsByClassName("icon");
function removeDraggable(imgs){
  for (element of imgs) {
  element.draggable = false;}}

if (!localStorage.getItem("spoilerList")) {
  populateStorage();
  setSpoilers();
} else {
  setSpoilers();
}

function makeModelCards() {
  models = shuffle(models)
  // For each model 
  for (let model of models) {

    if (model["name"] && !spoilerList.includes(model["name"])) {
      var bttn = $('<button commandfor="'+model["name"]+'-popover" command="toggle-popover"> </button>').addClass('model-card');
      bttn.append($('<img class="model-img" src="posters/' + model["poster"] + '">'));
      bttn.append($('<h4>' + model['class'] + '</h4>'));
      // bttn.append($('<img class="icon" src="icons/'+model["icon"]+'">'+'<h4>' + model['class'] + '</h4>'));
      // bttn.append($('<div class="byline">' + model['credit'].join(' / ') + '</div>'));
      $('#model-container').append(bttn);

      var popovercard = $('<div id="'+model["name"]+'-popover" class="popover-content" popover>\
      <div class="model-view">\
      <model-viewer id="mv-model" camera-controls  touch-action="pan-y" \
        camera-orbit="'+model["cameraorbit"]+'"\
         src="models/'+model["model"]+'" \
         skybox-image ="'+skyboxsrc+'"\
         skybox-height="12m" shadow-intensity="2" max-camera-orbit="auto 90deg auto"  > </model-viewer>\
      </div> </div>')
      
      $('#model-container').append(popovercard);


      
    }
  }
}

function clearModelCards() {
  const myNode = document.getElementById("model-container");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
}
function regenerateModelCards(){
  clearModelCards()
  makeModelCards()
}

/* 
 * When the document is fully loaded
 */
$(window).on("load", function () {
  console.log("Ran on page load.");
  makeModelCards();
  setSettingsfromStorage();
  DataWrangler.init();
  removeDraggable(icons);
  const selectDropdown = document.querySelector('select');
  selectDropdown.value="";
  selectDropdown.addEventListener('change', function (e) { 
    skyboxsrc = selectDropdown.value;
    regenerateModelCards()
   });
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};


function populateStorage(){
  console.log("Populating local storage.")
  localStorage.setItem("spoilerList",['Coral','Kelp','Trap','Snowflake','Fist','Astral','Prism','Drill','Shackles','Shards','Meteor']);
}

function setSpoilers(){
  console.log("Reading spoiler info from local storage.")
  spoilerList = localStorage.getItem("spoilerList").split(',')
}

function setSettingsfromStorage(){
  for (checkbox in checkboxlist){
    if(!spoilerList.includes(checkboxlist[checkbox])){
      document.getElementById(checkboxlist[checkbox]).checked = true;
    }
    else{
      document.getElementById(checkboxlist[checkbox]).checked = false;
    }
  }
  }

function toggleSpoiler(spoilername){
  if (spoilerList.includes(spoilername)){
    spoilerList.splice(spoilerList.indexOf(spoilername),1)  
  }
  else{
  spoilerList.push(spoilername)
  }
  localStorage.setItem("spoilerList",spoilerList)
  regenerateModelCards()
}

function toggleAllSpoilers(){
  if(document.getElementById("AllSpoilersCheckbox").checked==true){
    spoilerList = ['empty'];
    setSettingsfromStorage()
  }
  else{
    spoilerList = checkboxlist;
    setSettingsfromStorage()
  }
  localStorage.setItem("spoilerList",spoilerList)
  regenerateModelCards()
}

function iconbarButton(classname){
  if (spoilerList.includes(classname)){
    document.getElementById("settings").showPopover();
  }
  else{
    document.getElementById(classname+'-popover').togglePopover()

  }
}