var channels = ['OgamingSC2', 'ESL_SC2', 'milleniumtvcod', 'freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'brunofin', 'comster404']

$(document).ready(function () {
  var target = $('table').children('tbody')
  var endpoint = 'https://api.twitch.tv/kraken/'

  channels.forEach(function (channel) {
    $.getJSON(endpoint + 'streams/' + channel + '?callback=?', function (data) {
      if (!data.hasOwnProperty('stream')) {
        addChannelToView(target, 'danger', null, channel, '#', 'Account Not found')
      } else if (data.stream === null) {
        $.getJSON(endpoint + 'channels/' + channel + '?callback=?', function (data) {
          addChannelToView(target, 'info', data.logo, data.display_name, data.url, 'Offline')
        })
      } else {
        addChannelToView(target, 'success', data.stream.channel.logo, data.stream.channel.display_name, data.stream.channel.url, data.stream.channel.game + ' - ' + data.stream.channel.status)
      }
    })
  })
})

function addChannelToView (selector, state, logo, name, url, description) {
  if (logo === null) {
    logo = 'http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F'
  }
  selector.append('<tr class="' + state + '"><td><img class="img-circle" src="' + logo + '"></td><td><a target="_blank" href="' + url + '">' + name + '</a></td><td>' + description + '</td></tr>')
}
