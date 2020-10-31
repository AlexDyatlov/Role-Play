$(function(){

  if(window.matchMedia('(min-width: 1300px)').matches){
    $('#fullpage').fullpage({
      autoScrolling:true,
      scrollHorizontally: true,
      navigation: true,
      scrollBar: true,
      sectionSelector: '.page-section',
      anchors:['firstPage', 'secondPage', '3rdPage', '4rdPage']
    }); 
  }

  var burgerbtn = document.querySelector('.menu__btn');

  burgerbtn.addEventListener('click', function(){
    burgerbtn.classList.toggle('open');
    $('.menu__list').slideToggle();
  })


 if(window.matchMedia('(max-width: 1299px)').matches){
    $('#fullpage').fullpage({
      autoScrolling: false,
      scrollHorizontally: false,
      navigation: false,
      sectionSelector: '.page-section',
      anchors:['firstPage', 'secondPage', '3rdPage', '4rdPage']
    }); 
  }

  AOS.init({
    duration: 1500,
    delay: 400,
  });

  var audio = document.getElementById("myaudio");
  audio.volume = 0.2

  $('.filter-style').styler();
  
});

function findVideos() {
  let videos = document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();

 // start скрипт счетчика онлайна сервера
function ShowCounter() {
  $('#online').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
  
}

var updateInterval = 700;
_timer = setTimeout(updatePlayerCount, updateInterval);

function updatePlayerCount() {
  var ip = "rage2.grand-rp.su:22005";
  $.getJSON('https://cdn.rage.mp/master', function(masterlist) {
    if(masterlist[ip] != undefined){
      document.getElementById('online').innerHTML = masterlist[ip].players;
      ShowCounter();
      _timer = setTimeout(updatePlayerCount, updateInterval);
    }
  });
}
 // end скрипт счетчика онлайна сервера


