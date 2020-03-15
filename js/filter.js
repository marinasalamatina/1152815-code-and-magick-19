'use strict';


(function () {
  var wizardCoatColor = document.querySelector('input[name="coat-color"]');
  var wizardEyesColor = document.querySelector('input[name="eyes-color"]');

  var highLevel = 2;
  var middleLevel = 1;
  var lowLevel = 0;

  var levelHeightenInOrder = 1;
  var levelLoweringInOrder = -1;


  var noDifference = 0;

  var calculateLevel = function (wizard) {
    var level = lowLevel;

    if (wizard.colorCoat === wizardCoatColor.value) {
      level += highLevel;
    }

    if (wizard.colorEyes === wizardEyesColor.value) {
      level += middleLevel;
    }
    return level;
  };

  var sortNames = function (left, right) {
    if (left > right) {
      return levelHeightenInOrder;
    } else if (left < right) {
      return levelLoweringInOrder;
    } else {
      return noDifference;
    }
  };

  var sortWizards = function (left, right) {
    var difference = calculateLevel(right) - calculateLevel(left);

    if (difference === noDifference) {
      difference = sortNames(left.name, right.name);
    }
    return difference;
  };

  window.backend.load(window.setup.createWizards, window.setup.displayErrorWindow);

  window.filter = {
    sortWizards: sortWizards
  };
})();
