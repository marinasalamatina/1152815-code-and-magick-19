'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var setupWizard = userDialog.querySelector('.setup-wizard');

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('input[name=coat-color]');

  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');

  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input');

  var setColor = function (item, input, color) {
    item.style.fill = color;
    item.style.backgroundColor = color;
    input.value = color;
  };

  var onCoatClick = function () {
    var color = window.utils.getRandomElement(WIZARD_COAT_COLORS);
    setColor(wizardCoat, wizardCoatInput, color);

    window.debounce(window.setup.createWizards(window.similarWizards));
  };

  var onEyesClick = function () {
    var color = window.utils.getRandomElement(WIZARD_EYES_COLORS);
    setColor(wizardEyes, wizardEyesInput, color);

    window.debounce(window.setup.createWizards(window.similarWizards));
  };

  var onFireballClick = function () {
    var color = window.utils.getRandomElement(FIREBALL_COLORS);
    setColor(wizardFireball, wizardFireballInput, color);
  };

  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFireball.addEventListener('click', onFireballClick);
})();
