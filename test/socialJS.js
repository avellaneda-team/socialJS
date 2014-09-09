'use strict';

describe('SocialJS', function () {
  var socialJS,
      templateEngine = new SocialJS().templateEngine
  ;

  context('Options', function (){
    describe('#constructor', function () {
      it('set new options', function(){
        socialJS = new SocialJS({
          url: 'some url',
          text: 'some title',
          provider: 'some title',
          description: 'some description',
          source: 'some url',
          media: 'some media',
          popup: true,
          shareOn: 'facebook'
        });

        expect( socialJS.getOptions() ).toEqual({
          url: 'some url',
          text: 'some title',
          provider: 'some title',
          description: 'some description',
          source: 'some url',
          media: 'some media',
          popup: true,
          shareOn: 'facebook'
        });
      });

      it('expand options', function () {
        socialJS = null;
        socialJS = new SocialJS({
          url: 'any url'
        });

        expect(socialJS.getOptions().url).toEqual('any url');
        expect(socialJS.getOptions().shareOn).toEqual('');
      });

      it('fetch some options from dom', function () {
        loadHead('test/fixtures/head/defaultHead.html');
        socialJS = new SocialJS();

        expect(socialJS.getOptions().description).toEqual('A little description');
        expect(socialJS.getOptions().media).toEqual('http://placehold.it/6x6');
      });
    });

    describe('#setOptions', function () {
      socialJS = new SocialJS();

      it('should expand the options', function () {
        socialJS.setOptions({
          url: 'some url'
        });

        expect(socialJS.getOptions().url).toEqual('some url');
      })
    });
  });

  context('Elements', function () {
    describe('#fetchSocialEls', function () {
      beforeEach(function () {
        loadBody('test/fixtures/social_links.html');
        socialJS = new SocialJS();
      })

      it('should fetch elements', function () {
        expect(socialJS.countSocialEls()).toEqual(13);
      });
    });

    describe('#generateConfig', function () {
      it('should put config inside it', function () {
        var el = document.createElement('a'),
            socialJS = new SocialJS();
        el.setAttribute('data-share-on', 'facebook');
        socialJS.generateConfig(el);
        expect(el.config.shareOn).toEqual('facebook');
      });
    });

    describe('#changeHref', function () {
      it('should change href from anchor tag', function () {
        var el = document.createElement('a'),
            socialJS = new SocialJS({
              url: 'localhost'
            });
        el.setAttribute('data-share-on', 'facebook');
        el.setAttribute('href', '#');
        socialJS.generateConfig(el);
        socialJS.changeHref(el);
        expect(el.href).toEqual('https://www.facebook.com/sharer/sharer.php?u=localhost');
      });
    })
  });

  context('Helper Methods', function () {
    describe('#extends', function () {
      it('should extend objects', function () {
        var baseObject = {},
            newObject  = { greeting: 'Hello World!' },
            socialJS = new SocialJS();
        ;
        expect( socialJS.extends(baseObject, newObject) ).toEqual(newObject);
      });

      it('should override objects', function () {
        var baseObject = { greeting: 'Hello World' },
            newObject  = { greeting: 'Hello World!' },
            socialJS = new SocialJS();
        ;
        expect( socialJS.extends(baseObject, newObject) ).toEqual(newObject);
      });

      it('should not change if the new property is not defined', function () {
        var baseObject = { greeting: 'Hello World' },
            newObject  = { },
            socialJS = new SocialJS();
        ;
        expect( socialJS.extends(baseObject, newObject) ).toEqual(baseObject);
      })
    });

    describe('#templateEngine', function () {
      it('should generate a template', function () {
        var template = templateEngine('Hello {{data}}', { data: 'World!' })
        expect(template).toEqual('Hello World!');
      });

      it('should remplace each data match', function () {
        var template = templateEngine('{{data}} {{data}}', { data: 'World!' })
        expect(template).toEqual('World! World!');
      });

      it('should remplace data by function return', function () {
        var template = templateEngine('{{data}} {{data}}', { data: function () {
          return 'World!';
        }})
        expect(template).toEqual('World! World!');
      });
    });
  });
});
