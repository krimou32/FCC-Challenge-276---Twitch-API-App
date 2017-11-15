// Define usernames to fetch
let users = ["playoverwatch", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Select the div that will contain the streamers list
let streamContainer = $('#streamers');

// Loop through each streamer username and call the Twitch API to get their data (Logo, Game playing, etc.)
// Create <li> items linking to the streamer's channel and showing his/her status
// Append the element to the list if Offline, Prepend if Online
let displayStreamers = () => {

  for(let i = 0; i < users.length; i++) {
    // Fetch stream data
    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + users[i], function(streamResponse) {

      // Check if streamer is broadcasting live
      if(streamResponse.stream){
        // Fetch channel data
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + users[i], function(channelResponse) {
          // Check if streamer has a logo
          if (channelResponse.logo) {
            streamContainer.prepend(
              '<a target="_blank" href="https://go.twitch.tv/' + users[i] + '">' +
              '<li class="streamer online">' +
              '<img class="streamLogo" src="' + channelResponse.logo + '"/> ' +
              users[i] + ' is playing ' + streamResponse.stream.channel.game +
              ' <span class="status">ONLINE</span>' +
              '</li>' +
              '</a>'
            );
          } else {
            streamContainer.prepend(
              '<a target="_blank" href="https://go.twitch.tv/' + users[i] + '">' +
              '<li class="streamer online">' +
              '<img class="streamLogo" src="twitch-glitch.svg"/> ' +
              users[i] + ' is playing ' + channelResponse.stream.channel.game +
              ' <span class="status">ONLINE</span>' +
              '</li>' +
              '</a>'
            );
          }
        });
      } else {
        // Fetch channel data
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + users[i], function(channelResponse) {
          // Check if streamer has a logo
          if (channelResponse.logo){
            streamContainer.append(
              '<a target="_blank" href="https://go.twitch.tv/' + users[i] + '">' +
              '<li class="streamer offline">' +
              '<img class="streamLogo" src="' + channelResponse.logo + '"/> ' +
              users[i] +
              '<span class="status">OFFLINE<span>' +
              '</li>' +
              '</a>'
            );
          } else {
            streamContainer.append(
              '<a target="_blank" href="https://go.twitch.tv/' + users[i] + '">' +
              '<li class="streamer offline">' +
              '<img class="streamLogo" src="twitch-glitch.svg"/> ' +
              users[i] + ' <span class="status">OFFLINE<span>' +
              '</li>' +
              '</a>'
            );
          }
        });
      }
    });
  }
}

// Fire the function to display the streamers list in the DOM
displayStreamers();

$(document).ready(function() {

  // Listen for click events on the top right filters
  let createFilters = () => {
    $('.online-status').on('click', (event) => {

      // Declare assets to target
      let onlineStreamers = $('.online');
      let offlineStreamers = $('.offline');
      let allStreamers = $('.streamer');
      let targetId = event.target.id;

      // If "All" is clicked, display all streamers
      if(targetId === 'selectAll') {
        allStreamers.css('display', 'block');
        //console.log('selectAll has been clicked');
      }

      // If "Online" is clicked, only display online streamers
      else if(targetId == 'selectOnline') {
        offlineStreamers.css('display', 'none');
        onlineStreamers.css('display', 'block');
        //console.log('selectOnline has been clicked');
      }

      // If "Offline" is clicked, only display offline streamers
      else if(targetId == 'selectOffline') {
        onlineStreamers.css('display', 'none');
        offlineStreamers.css('display', 'block');
        //console.log('selectOffline has been clicked');
      }
    });
  }

  // Let's put those filters to work!
  createFilters();

});
