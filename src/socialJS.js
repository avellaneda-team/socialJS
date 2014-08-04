SocialJS = (function () {
  "use strict";

  function SocialJS() {
    var socialEls = this._socialEls;
    socialEls = document.querySelectorAll("[data-social-link=true], [social-link]");

    for (var i = 0; i < socialEls.length; i++) {
      var el = socialEls[i];
      this.generateConfig( el );
      this.changeHref( el );
      this.bindPopUp( el );
    }
  }

  SocialJS.prototype = {
    _socialEls: [],

    links: {
      facebook: 'https://www.facebook.com/sharer/sharer.php?u={{url}}',
      twitter: 'http://twitter.com/share?text={{text}}&url={{url}}'
    },

    options: {
      url: window.location.href,
      text: window.document.title,
      popup: false,
      height: 600,
      width: 600,
      left: function () {
        return (screen.width/2)-(this.width/2);
      },
      rigth: function () {
        return (screen.height/2)-(this.height/2);
      }
    },

    templateEngine: function (template, data) {
      var text = template;
      for (var attribute in data) {
        var expression = new RegExp('{{' + attribute + '}}', 'g');
        var replace = ('function' === typeof data[attribute]) ?
          data[attribute]() : data[attribute];
        text = text.replace(expression, encodeURIComponent(replace) );
      }
      return text;
    },

    generateConfig: function (el) {
      var config = this.options;
      for( var option in el.dataset ) {
        config[option] = el.dataset[option] || config[option];
      }
      console.log(config);
      el.config = config;
    },

    changeHref: function (el) {
      var template = this.links[el.config.shareOn],
          url      = this.templateEngine(template, el.config);
      el.setAttribute('href', url);
    },

    bindPopUp: function (el) {
      var that = this;
      if ( el.config.popup ) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          var properties = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height={{height}}px,width={{width}}px,left={{left}}px,top={{top}}px';
          window.open(this.href, '', that.templateEngine(properties, this.config) );
        });
      }
    }
  };

  return SocialJS;
})();
