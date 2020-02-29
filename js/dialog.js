'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userName = userDialog.querySelector('.setup-user-name');

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
})();
