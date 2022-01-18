class FAQChatbot {
  constructor() {
    this.load();
  }

  load() {
    /*
      채널톡 설치 가이드를 토대로 작성된 코드입니다.
      https://developers.channel.io/docs/web-installation
    */
    var w = window;
    if (w.ChannelIO) {
      return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
    }
    var ch = function() {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function(args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  }

  boot() {
    window.ChannelIO("boot", {
      "pluginKey": "857074ce-adf4-4284-b3b0-9651ad31a24f"
    });
  }

  shutdown() {
    window.ChannelIO("shutdown");
  }
}

export default new FAQChatbot();
