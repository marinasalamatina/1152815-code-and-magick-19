'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var getRandomNumber = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

var getRandomElement = function (array) {
  return array[getRandomNumber(array)];
};

var getWizardsData = function () {
  var wizardsData = [];
  for (var i = 0; i < NUMBER_WIZARDS; i += 1) {
    var wizardData = {
      name: getRandomElement(WIZARD_NAMES),
      surname: getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLOR),
      eyesColor: getRandomElement(WIZARD_EYES_COLOR)
    };
    wizardsData.push(wizardData);
  }
  return wizardsData;
};

var createWizard = function (wizardData) {
  var wizard = similarWizardTemplate.cloneNode(true);

  wizard.querySelector('.setup-similar-label').textContent = wizardData.name + '  ' + wizardData.surname;

  wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizard;
};

var addWizardsData = function () {
  var fragment = document.createDocumentFragment();
  var wizardsData = getWizardsData();

  for (var i = 0; i < wizardsData.length; i += 1) {
    fragment.appendChild(createWizard(wizardsData[i]));
  }
  return fragment;
};

similarListElement.appendChild(addWizardsData());

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
