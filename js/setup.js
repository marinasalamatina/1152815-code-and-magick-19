'use strict';

(function () {
  var NUMBER_WIZARDS = 4;

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('form');
  var setupSubmit = userDialog.querySelector('.setup-submit');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardsContainer = document.querySelector('.setup-similar-list');
  var errorWindow = document.createElement('div');

  var fontSizeErrorMessage = '22px';

  var createWizard = function (wizardData) {
    var wizard = similarWizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;

    wizard.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizard;
  };

  var onErrorWindowClick = function () {
    errorWindow.removeEventListener('click', onErrorWindowClick);
    document.body.removeChild(errorWindow);
  };

  var onErrorWindowKeydown = function (evt) {
    if (evt.key === 'Escape') {
      document.removeEventListener('keydown', onErrorWindowKeydown);
      onErrorWindowClick();
    }
  };

  var onError = function (errorMessage) {
    errorWindow.style = 'display: flex; z-index: 100; justify-content: center; align-items: center; background-color: black; opacity: 0.9; width: 100%; top: 35%; height: 30%;';
    errorWindow.style.position = 'absolute';
    errorWindow.style.fontSize = fontSizeErrorMessage;
    errorWindow.textContent = 'Операция не выполнена. ' + errorMessage;

    document.body.appendChild(errorWindow);

    errorWindow.addEventListener('click', onErrorWindowClick);
    document.addEventListener('keydown', onErrorWindowKeydown);
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
    setupSubmit.setAttribute('disabled', '');
    window.backend.save(new FormData(form), function () {
      window.dialog.closeUserDialog();
      setupSubmit.removeAttribute('disabled');
    },
    onError);
    evt.preventDefault();
  });

  window.backend.load(onLoad, onError);
})();
