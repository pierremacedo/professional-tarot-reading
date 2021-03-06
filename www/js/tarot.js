var reversals = "no";
var number = 7;
var data;
var spread = 3;
var UvsR3 = ["upright3", "reversed3"];
var UvsR5 = ["upright5", "reversed5"];
var controlback = false;

function spreadSetting(value) {
  spread = value;
}

function reversed(value) {
  reversals = value;
}

$(document).ready(function () {
  $("#menu").load("components/menu.html");
  $("#warning").load("components/warning.html");
}); 

// Reading starts here

function thirdScreen(arg) {
  screen.orientation.unlock();
  window.scrollTo(0, 0);
  number = 7;
  document.getElementById("div-content").innerHTML = '<div><img src="images/instructions.png" style="max-width:150px" /></div><div class="instruction-title" style="color:#447eac">Instructions</div><div class="first-instructions"><p class="item1" style="color:#ffffff">Think about what you want to ask and formulate a clear question. You can say it aloud or just in your mind.</p><p class="item2" style="color:#ffffff">While focusing on your question, press the "Shuffle Cards" button. You should keep your question in your mind till the shuffling is complete.</p><p class="item3" style="color:#ffffff">Three or five cards from the top of the shuffled deck will appear on the screen. The number of cards depends on which spread you are using.</p><button id="1" type="button" class="btn btn-lg" style="background-color: #f57700; color: white" onclick="start()">SHUFFLE CARDS</button></p></div>';
}

function start() {
  $('#second-screen').removeClass('second-screen-main'); //remove margin-top to keep shuffle.gif centralized 

  $('#content').css('min-height', '100vh');
  document.getElementById("div-content").innerHTML = '<div id="shuffle"><img class="shuffling" src="images/shuffle.gif" /></div>';
  getData();
}

function getData() {
  $.ajax({
    url: "js/cardsinfo.json",
    dataType: "json",
    cache: false,
    success: function success(json) {
      data = json;
      shuffleCards();
      setTimeout(function () {
        $('#second-screen').addClass('second-screen-main');
        $('#content').css('min-height', '');

        if (parseInt(spread, 10) === 3) {
          document.getElementById("div-content").innerHTML = '<div id="show-cards"><div class="instruction-title" style="color:#447eac">Results</div><div id="show-cards-top"><p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;color:#ffffff">This is your three-card spread. The cards from left to right represent the past, present, and future.</p><p class="item2" style="font-size:calc(15px + 0.5vw);color:#ffffff">Click on each card to know its meaning.</p></div><div id="cards"></div><div><button type="button" class="btn btn-lg" style="margin-top: 20px;color:#ffffff;background-color: #f57700;" id="newq" onclick="thirdScreen(this.id);">Ask another question</button></div></div>';
        } else {
          document.getElementById("div-content").innerHTML = '<div id="show-cards"><div class="instruction-title" style="color:#447eac">Results</div><div id="show-cards-top"><p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;color:#ffffff">This is your five-card spread. The cards from left to right represent the past, recent past, present, near future, and future.</p><p class="item2" style="font-size:calc(15px + 0.5vw);color:#ffffff">Click on each card to know its meaning.</p></div><div id="cards"></div><div><button type="button" class="btn btn-lg" style="margin-top: 10px;color:#ffffff;background-color: #f57700;" onclick="thirdScreen();">Ask another question</button></div></div>';
        }

        showCards();
      }, number + [100 + 10]);
    }
  });
}

function shuffleAlgorithm(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }

  return array;
}

function shuffleCards() {
  data = shuffleAlgorithm(data);

  if (number > number - [number - 1]) {
    number--;
    window.setTimeout(shuffleCards, 1000);
  }
} 

// Show reading results


function showCards() {
  if (spread == "5") {
    screen.orientation.lock('landscape');
  }

  if (reversals === "no") {
    for (var i = 0; i < spread; i++) {
      if (parseInt(spread, 10) === 3) {
        var images = '<img name="' + data[i]['name'] + ' tarot card meaning" class="upright3" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="googleSearch(this.name)"/>';
        $('#cards').append(images);
      } else {
        var _images = '<img name="' + data[i]['name'] + ' tarot card meaning" class="upright5" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="googleSearch(this.name)"/>';

        $('#cards').append(_images);
      }
    }
  } else {
    for (var _i = 0; _i < spread; _i++) {
      if (parseInt(spread, 10) === 3) {
        var position3 = UvsR3[Math.floor(Math.random() * UvsR3.length)];
        var UpvsRev3 = "";

        if (position3 == "reversed3") {
          UpvsRev3 = "reversed ";
        }

        var _images2 = '<img name="' + UpvsRev3 + data[_i]['name'] + ' tarot card meaning" class="' + position3 + '" src="' + data[_i]['img'] + '" id="' + data[_i]['id'] + '1" onclick="googleSearch(this.name)"/>';

        $('#cards').append(_images2);
      } else {
        var position5 = UvsR5[Math.floor(Math.random() * UvsR5.length)];
        var UpvsRev5 = "";

        if (position5 == "reversed5") {
          UpvsRev5 = "reversed ";
        }

        var _images3 = '<img name="' + UpvsRev5 + data[_i]['name'] + ' tarot card meaning" class="' + position5 + '" src="' + data[_i]['img'] + '" id="' + data[_i]['id'] + '1" onclick="googleSearch(this.name)"/>';

        $('#cards').append(_images3);
      }
    }
  }
} 

// Google search


function googleSearch(name) {
  var addPlus = name.replace(/ /g, "+");
  var googleUrl = 'https://www.google.com/search?q=' + addPlus + '+-inurl:pinterest';
  screen.orientation.unlock();
  cordova.InAppBrowser.open(googleUrl, '_blank', 'location=yes', 'fullscreen=no');
} 

// Help section


function showHelp(arg) {
  if (arg === 'help') {
    window.scrollTo(0, 0);
    controlback = true;
    $('#content').addClass('display');
    $('#help').addClass('display');
    $('#div-help').removeClass('display').load("components/help.html");
  }

  if (arg === "outhelp") {
    $('#content').removeClass('display');
    $('#help').removeClass('display');
    $('#div-help').addClass('display');
  }
} 

//Android back button handler methods


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  document.addEventListener("backbutton", backKeyDown, false);
}

function backKeyDown(answer) {
  if (controlback === false) {
    $('#warning').removeClass("display");
    $('#warningModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('body').addClass("no-scroll");
  }

  if (controlback === true) {
    window.scrollTo(0, 0);
    $('#content').removeClass('display');
    $('#help').removeClass('display');
    $('#div-help').addClass('display');
    controlback = false;
  }

  if (answer === "no") {
    $("#warningModal").modal("toggle");
    $('body').removeClass("no-scroll");
  }
}

function exitApp() {
  navigator.app.exitApp();
}