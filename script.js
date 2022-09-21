  var trackArray = [];
$(function () {
  const audio = $("#audio")[0];
  const playBtn = $("#play-btn");
  const pauseBtn = $("#pause-btn");
  const forwardBtn = $("#forward-btn");
  const backwardBtn = $("#backward-btn");

  playBtn.on({
    click: function () {
      audio.play();
      playBtn.hide();
      pauseBtn.show();
    },
  });

  pauseBtn.on({
    click: function () {
      audio.pause();
      playBtn.show();
      pauseBtn.hide();
    },
  });

  getTracklist();



});

const url = "http://5dd1894f15bbc2001448d28e.mockapi.io/playlist";

function getTracklist() {
  $.get(`${url}`, function (data) {
   
    if (data && data.length) {
      trackArray = data;
      createList(data);
      plugTrack(data[0]);
      
    } else {
      console.log("No track Available");
    }
  }).fail(function (e) {
    console.log(e);
  });
}

function createList(trackList) {
  const container = $(".right");

 

  trackList.forEach((item) => {
    
    const listItem = createListItem(item);
    container.append(listItem);
  });
}

function createListItem(trackDetails) {
 

  const trackTemplate = createTrackTemplate(trackDetails);
  console.log(trackTemplate)
  const listItem = $(trackTemplate);
  console.log($(trackTemplate));
  console.log(listItem)
  
  $('.right-container').on({
    click : function () {
        console.log("click");

        const id = $(this).attr("data-id");
        const track = trackArray.find((i) => i.id === id);
        plugTrack(track);
    },
  });



  


  return `${trackTemplate}`;
}

function createTrackTemplate(trackDetails,index ) {
  

  const { id, track, artist, albumCover } = trackDetails;

  

  return `
  
  <div class="right-container" data-id=${id}>
  <div class="right-img-con">
      <img src=${albumCover} alt=${track}>
  </div>
  <div class="right-text-con">
      <h3>${track}</h3>
      <span>${artist}</span>
  </div>
</div>



  `;
}


function plugTrack(trackDetails) {
  const { file, artist, albumCover, track } = trackDetails;



  const trackImage = $(".left-img-con img");
  const audio = $("#audio");
  const title = $(".title");
  const Artist = $(".artist");
  const playBtn = $("#play-btn");
  const pauseBtn = $("#pause-btn");

  trackImage.attr("src", albumCover);
  audio.attr("src", file);
  title.html(track);
  Artist.html(artist);
  pauseBtn.hide();
  playBtn.show();

  console.log(trackDetails);
  
}