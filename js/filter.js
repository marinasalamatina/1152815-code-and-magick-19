'use strict';


(function () {
  var wizardCoatColor = document.querySelector('input[name="coat-color"]');
  var wizardEyesColor = document.querySelector('input[name="eyes-color"]');

  var calculateLevel = function (wizard) {
    var level = 0;

    if (wizard.colorCoat === wizardCoatColor.value) {
      level += 2;
    }

    if (wizard.colorEyes === wizardEyesColor.value) {
      level += 1;
    }
    return level;
  };


  var sortWizards = function (left, right) {
    var difference = calculateLevel(right) - calculateLevel(left);

    return difference;
  };

  window.backend.load(window.setup.createWizards, window.setup.displayErrorWindow);

  window.filter = {
    sortWizards: sortWizards
  };
})();
