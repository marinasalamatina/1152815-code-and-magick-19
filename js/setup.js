'use strict';

(function () {
  var NUMBER_WIZARDS = 4;

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('form');
  var setupSubmit = userDialog.querySelector('.setup-submit');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardsContainer = document.querySelector('.setup-similar-list');

  var fontSizeErrorMessage = '50px';
  var errorWindowPositionLeftAndRight = 0;

  var createWizard = function (wizardData) {
    var wizard = similarWizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;

    wizard.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizard;
  };

  var onError = function (errorMessage) {
    var errorWindow = document.createElement('div');

    errorWindow.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorWindow.style.position = 'absolute';
    errorWindow.style.left = errorWindowPositionLeftAndRight;
    errorWindow.style.right = errorWindowPositionLeftAndRight;
    errorWindow.style.fontSize = fontSizeErrorMessage;
    errorWindow.textContent = 'Операция не выполнена. ' + errorMessage;

    document.body.appendChild(errorWindow);
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_WIZARDS; i += 1) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    wizardsContainer.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  form.addEventListener('submit', function (evt) {
    setupSubmit.disabled = true;
    window.backend.save(new FormData(form), function () {
      window.dialog.closeUserDialog();
      setupSubmit.disabled = false;
    },
    onError);
    evt.preventDefault();
  });

  window.backend.load(onLoad, onError);
})();
