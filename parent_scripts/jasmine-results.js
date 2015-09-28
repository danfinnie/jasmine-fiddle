app.directive('jasmineResults', function($interval) {
  var POLL_INTERVAL_MS = 50;

  function iframeLoaded(element) {
    return typeof(element[0].contentWindow.jasminify) === "function";
  }

  function updateIframe(element, js) {
    element[0].contentWindow.jasminify(js);
  }

  return {
    template: '<iframe src="jasmine.html"></iframe>',
    scope: {
      js: '@'
    },
    replace: true,
    link: function(scope, element, attrs) {
      scope.$watch('js', function(js) {
        if(iframeLoaded(element)) {
          updateIframe(element, js);
        } else {
          var promise = $interval(function() {
            console.log("Polling iframe");
            if(iframeLoaded(element)) {
              updateIframe(element, js);
              $interval.cancel(promise);
              promise = undefined;
            }
          }, POLL_INTERVAL_MS);
        }
      });
    }
  };
});
