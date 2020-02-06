'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var NUMBER_WIZARDS = 4;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var getRandomNumber = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

var getRandomElement = function (array) {
  return array[getRandomNumber(array)];
};

var getAttributeWizard = function () {
  var wizard = {
    name: getRandomElement(WIZARD_NAMES),
    surname: getRandomElement(WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT_COLOR),
    eyesColor: getRandomElement(WIZARD_EYES_COLOR)
  };

  return wizard;
};

var makeWizardsArray = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_WIZARDS; i += 1) {
    wizards.push(getAttributeWizard());
  }
  return wizards;
};

var wizards = makeWizardsArray();

var createWizard = function (dataWizard) {
  var wizard = similarWizardTemplate.cloneNode(true);

  wizard.querySelector('.setup-similar-label').textContent = dataWizard.name + '  ' + dataWizard.surname;

  wizard.querySelector('.wizard-coat').style.fill = dataWizard.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = dataWizard.eyesColor;

  return wizard;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i += 1) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  return fragment;
};

similarListElement.appendChild(createFragment());

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
