'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['Да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#848d5', '#e6e848'];
var NUMBER_WIZARDS = 4;

var userDialog = document.querySelector('.setup');

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userName = userDialog.querySelector('.setup-user-name');

var setupWizard = userDialog.querySelector('.setup-wizard');

var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = document.querySelector('input[name=coat-color]');

var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = document.querySelector('input[name=eyes-color]');

var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = wizardFireball.querySelector('input');

var wizardsContainer = document.querySelector('.setup-similar-list');
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
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
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

var createWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizardsData = getWizardsData();

  for (var i = 0; i < wizardsData.length; i += 1) {
    fragment.appendChild(createWizard(wizardsData[i]));
  }
  return fragment;
};

var setWizards = function () {
  var wizards = createWizards();

  wizardsContainer.appendChild(wizards);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

setWizards();

var onUserDialogEscPress = function (evt) {
  if (userName === document.activeElement) {
    return;
  }
  if (evt.key === 'Escape') {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onUserDialogEscPress);
};

setupOpen.addEventListener('click', function () {
  openUserDialog();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openUserDialog();
  }
});

setupClose.addEventListener('click', function () {
  closeUserDialog();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeUserDialog();
  }
});

var setColor = function (item, input, color) {
  item.style.fill = color;
  item.style.backgroundColor = color;
  input.value = color;
};

wizardCoat.addEventListener('click', function () {
  var color = getRandomElement(WIZARD_COAT_COLORS);
  setColor(wizardCoat, wizardCoatInput, color);
});

wizardEyes.addEventListener('click', function () {
  var color = getRandomElement(WIZARD_EYES_COLORS);
  setColor(wizardEyes, wizardEyesInput, color);
});

wizardFireball.addEventListener('click', function () {
  var color = getRandomElement(FIREBALL_COLORS);
  setColor(wizardFireball, wizardFireballInput, color);
});
