'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвмнг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var wizards = [
  {
    name: WIZARD_NAMES[getRandomNumber(0, 7)],
    surname: WIZARD_SURNAMES[getRandomNumber(0, 7)],
    coatColor: WIZARD_COAT_COLOR[getRandomNumber(0, 5)],
    eyesColor: WIZARD_EYES_COLOR[getRandomNumber(0, 5)],
  },
  {
    name: WIZARD_NAMES[getRandomNumber(0, 7)],
    surname: WIZARD_SURNAMES[getRandomNumber(0, 7)],
    coatColor: WIZARD_COAT_COLOR[getRandomNumber(0, 5)],
    eyesColor: WIZARD_EYES_COLOR[getRandomNumber(0, 5)],
  },
  {
    name: WIZARD_NAMES[getRandomNumber(0, 7)],
    surname: WIZARD_SURNAMES[getRandomNumber(0, 7)],
    coatColor: WIZARD_COAT_COLOR[getRandomNumber(0, 5)],
    eyesColor: WIZARD_EYES_COLOR[getRandomNumber(0, 5)],
  },
  {
    name: WIZARD_NAMES[getRandomNumber(0, 7)],
    surname: WIZARD_SURNAMES[getRandomNumber(0, 7)],
    coatColor: WIZARD_COAT_COLOR[getRandomNumber(0, 5)],
    eyesColor: WIZARD_EYES_COLOR[getRandomNumber(0, 5)],
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + '\n' + wizard.surname;


  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

function addWizardsToList(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
}

addWizardsToList(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
