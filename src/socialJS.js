SocialJS = (function () {
  "use strict";

  function SocialJS(options) {
    if ('object' === typeof options) { this.extends(this.options, options); }
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
      twitter: 'http://twitter.com/share?text={{text}}&url={{url}}',
      linkedin: 'http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{text}}&summary={{description}}&source={{source}}',
      pinterest: 'http://pinterest.com/pin/create/link/?url={{url}}&media={{media}}&description={{text}}',
      googleplus: 'https://plus.google.com/share?url={{url}}',
      blogger: 'https://www.blogger.com/blog-this.g?t&u={{url}}&n={{text}}',
      delicious: 'https://delicious.com/save?v=5&provider={{provider}}&noui&jump=close&url={{url}}&title={{text}}'
    },

    options: {
      url: window.location.href,
      text: window.document.title,
      provider: window.document.title,
      description: document.querySelector('meta[name=description]').getAttribute('content'),
      source: window.location.href,
      media: document.querySelector('link[rel=icon]').getAttribute('href'),
      popup: false,
      shareOn: ''
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
        var expression = new RegExp('{{' + attribute + '}}', 'g');
        var replace = ('function' === typeof data[attribute]) ?
          data[attribute]() : data[attribute];
        text = text.replace(expression, encodeURIComponent(replace) );
      }
      return text;
    },

    extends: function (baseObject, newObject) {
      var config = baseObject;
      for( var option in baseObject ) {
        config[option] = newObject[option] || config[option];
      }
      return config;
    },

    generateConfig: function (el) {
      el.config = this.extends(this.options, el.dataset);
    },

    generatePopupConfig: function (el) {
      el.popupConfig = this.extends( this.popupConfig, el.dataset );
    },

    changeHref: function (el) {
      var template = this.links[el.config.shareOn],
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
