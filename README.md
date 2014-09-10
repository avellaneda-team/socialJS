SocialJS
========

Social Links generators, without dependencies.

How much time do you expend adding social share links?
Well it's time to change that.

Shared social links supported
=============================
+ Facebook
+ Twitter
+ Linkedin
+ Pinterest
+ Google Plus
+ Google Bookmarks
+ Blogger
+ Delicious

Getting started
===============

Add the library at body bottom, and it html dependencies at head tag.

```
<html>
  <head>
    <title>Social JS</title>
    <meta name="description" content="Social links generator, without dependencies">
    <link rel="icon" href="favicon.ico">
  </head>
  <body>
    <script src="socialjs.js"></script>
  </body>
</html>
```

Intance it following the next code:

```
var socialJS = new SocialJS();
socialJS.init();
```

Create a tag following the next template:

```
<a href="#" data-social-link="true" data-share-on="facebook"></a>
<a href="#" social-link data-share-on="facebook"></a>
```

You can add the following data attributes for override the default config, the
``` code block ``` represents the default value:
+ data-url ``` [window.location.href] ```
+ data-text ``` [window.document.title] ```
+ data-provider ``` [window.document.title] ```
+ data-description ``` [meta tag description] ```
+ data-source ``` [window.location.href] ```
+ data-media ``` [favicon image link] ```
+ data-popup ``` [false] ```
+ data-share-on ``` [''] ```

Or you can pass an object with the default config when you initialize the library
like:
```
var socialJS = new SocialJS({
  url: 'some-url',
  text: 'some-text'
})
```

