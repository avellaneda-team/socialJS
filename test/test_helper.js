var loadBody = function (fixture) {
  return document.body.innerHTML = __html__[fixture];
};

var loadHead = function (fixture) {
  return document.head.innerHTML = __html__[fixture];
};

var context = describe;
