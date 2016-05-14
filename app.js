var twitchViewer = (function IIFE () {
  var channels
  var $variables = {}
  var endpoint = 'https://api.twitch.tv/kraken/'

  function getStream (channel) {
    return $.getJSON(endpoint + 'streams/' + channel + '?callback=?')
  }

  function getChannel (channel) {
    return $.getJSON(endpoint + 'channels/' + channel + '?callback=?')
  }

  function generateOutput (stateClass, logo, name, url, description) {
    logo = logo || 'http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F'
    $variables.output.append('<tr class="' + stateClass + '"><td><img class="img-circle" src="' + logo + '"></td><td><a target="_blank" href="' + url + '">' + name + '</a></td><td>' + description + '</td></tr>')
  }

  function handleDocumentReady () {
    channels.forEach(function (channel) {
      getStream(channel).then(function (data) {
        if (!data.hasOwnProperty('stream')) {
          generateOutput('danger', undefined, channel, '#', 'Account Not found')
        } else if (data.stream === null) {
          getChannel(channel).then(function (data) {
            generateOutput('info', data.logo, data.display_name, data.url, 'Offline')
          })
        } else {
          generateOutput('success', data.stream.channel.logo, data.stream.channel.display_name, data.stream.channel.url, data.stream.channel.game + ' - ' + data.stream.channel.status)
        }
      })
    })
  }

  function init (options) {
    $variables.output = $(options.output)
    channels = options.channels
    $(document).bind('ready', handleDocumentReady)
  }

  return {
    init: init
  }
}())

$(document).ready(function () {
  twitchViewer.init({
    output: '#output',
    channels: [
      'OgamingSC2',
      'ESL_SC2',
      'milleniumtvcod',
      'freecodecamp',
      'storbeck',
      'terakilobyte',
      'habathcx',
      'RobotCaleb',
      'thomasballinger',
      'noobs2ninjas',
      'beohoff',
      'brunofin',
      'comster404'
    ]
  })
})
