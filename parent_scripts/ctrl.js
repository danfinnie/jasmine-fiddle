app.controller('ctrl', function($scope) {
  $scope.tests = 'describe("kitten", function() {\n' +
    '  it("returns kitten", function() {\n' +
    '    expect(kitten()).toEqual("kitten");\n' +
    '  });\n' +
    '});\n';

  $scope.code = 'var kitten = function() {\n' +
    '  return "kitten";\n' +
    '};\n';

  $scope.aceConfig = {
    mode: "javascript",
    workerPath: "./",
    advanced: {
        fontSize: '16px'
    }
  };
});
