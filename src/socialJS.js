SocialJS = (function () {
  "use strict";

  function SocialJS(options) {
    var _options = {
      url: window.location.href,
      text: window.document.title,
      provider: window.document.title,
      description: document.querySelector('meta[name=description]') && document.querySelector('meta[name=description]').content,
      source: window.location.href,
      media: document.querySelector('link[rel=icon]') && document.querySelector('link[rel=icon]').href,
      popup: false,
      shareOn: ''
    },
    _socialEls = [];

    this.setOptions = function (options) {
      if ('object' === typeof options) {
        this.extends(_options, options);
      }
      return this;
    };

    this.getOptions = function () { return _options; };

    this.fetchSocialEls = function () {
      _socialEls = document.querySelectorAll("[data-social-link=true], [social-link]");
      return this;
    };

    this.getSocialEls = function () {
      return _socialEls;
    };

    this.countSocialEls = function () {
      return _socialEls.length;
    };

    this.init = function () {
      console.log('Initialize SocialJS');
      var el,
          els = this.getSocialEls()
      ;
      for (var i = 0; i < this.countSocialEls(); i++) {
        el = els[i];
        this.generateConfig( el );
        this.changeHref( el );
        this.bindPopUp( el );
      }

      return this;
    };

    this.setOptions(options)
        .fetchSocialEls();

  }

  SocialJS.prototype = {
    social: {
      facebook: {
        url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}',
      },
      twitter: {
        url: 'http://twitter.com/share?text={{text}}&url={{url}}',
      },
      linkedin: {
        url: 'http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{text}}&summary={{description}}&source={{source}}',
      },
      pinterest: {
        url: 'http://pinterest.com/pin/create/link/?url={{url}}&media={{media}}&description={{text}}',
      },
      googleplus: {
        url: 'https://plus.google.com/share?url={{url}}',
      },
      blogger: {
        url: 'https://www.blogger.com/blog-this.g?t&u={{url}}&n={{text}}',
      },
      delicious: {
        url: 'https://delicious.com/save?v=5&provider={{provider}}&noui&jump=close&url={{url}}&title={{text}}',
      },
      googlebookmark: {
        url: 'https://www.google.com/bookmarks/mark?op=add&bkmk={{url}}&title={{text}}&annotation='
      }
    },

    popupConfig: {
      height: 600,
      width: 600,
      menubar: 'no',
      toolbar: 'no',
      resizable: 'yes',
      scrollbars: 'yes',
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
        if (data.hasOwnProperty(attribute)) {
          var expression = new RegExp('{{' + attribute + '}}', 'g');
          var replace = ('function' === typeof data[attribute]) ?
            data[attribute]() : data[attribute];
          text = text.replace(expression, encodeURIComponent(replace) );
        }
      }
      return text;
    },

    extends: function (baseObject, newObject) {
      var config = baseObject;
      for( var option in newObject ) {
        if (newObject.hasOwnProperty(option)) {
          config[option] = newObject[option];
        }
      }
      return config;
    },

    generateConfig: function (el) {
      el.config = this.extends(this.getOptions(), el.dataset);
    },

    generatePopupConfig: function (el) {
      el.popupConfig = this.extends( this.popupConfig, el.dataset );
    },

    changeHref: function (el) {
      var template = this.social[el.config.shareOn].url,
          url      = this.templateEngine(template, el.config);
      el.setAttribute('href', url);
    },

    bindPopUp: function (el) {
      var that = this;
      if ( el.config.popup ) {
        this.generatePopupConfig( el );
        el.addEventListener('click', function(e) {
          e.preventDefault();
          var properties = 'menubar={{menubar}},toolbar={{toolbar}},resizable={{resizable}},scrollbars={{scrollbars}},height={{height}}px,width={{width}}px,left={{left}}px,top={{top}}px';
          window.open(this.href, '', that.templateEngine(properties, this.popupConfig) );
        });
      }
    }
  };

  return SocialJS;
})();
