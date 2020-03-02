'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userName = userDialog.querySelector('.setup-user-name');
  var userDialogStartPosition = 'top: 80px; left: 50%;';
  var upload = userDialog.querySelector('.upload');

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onUserDialogEscPress);
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    userDialog.style.cssText = userDialogStartPosition;
    document.addEventListener('keydown', onUserDialogEscPress);
  };

  var onUserDialogEscPress = function (evt) {
    if (userName === document.activeElement) {
      return;
    }
    if (evt.key === 'Escape') {
      closeUserDialog();
    }
  };

  setupClose.addEventListener('click', function () {
    closeUserDialog();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeUserDialog();
    }
  });

  setupOpen.addEventListener('click', function () {
    openUserDialog();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openUserDialog();
    }
  });

  var onUploadMousedown = function (evtMousedown) {
    evtMousedown.preventDefault();

    var startCoordinates = {
      x: evtMousedown.clientX - userDialog.offsetLeft,
      y: evtMousedown.clientY - userDialog.offsetTop
    };

    var dragged = false;

    var onDocumentMouseMove = function (evtMouseMove) {
      evtMouseMove.preventDefault();

      var userDialogWidth = userDialog.offsetWidth;
      var userDialogHeight = userDialog.offsetHeight;

      var screenWidth = window.screen.availWidth;
      var screenHeight = window.screen.availHeight;

      var userDialogMinShift = {
        x: evtMouseMove.clientX - startCoordinates.x,
        y: evtMouseMove.clientY - startCoordinates.y
      };

      var userDialogMaxShift = {
        x: evtMouseMove.clientX + userDialogWidth,
        y: evtMouseMove.clientY - startCoordinates.y + userDialogHeight
      };

      var coordinatesAfterMiddleShift = {
        x: evtMouseMove.clientX - startCoordinates.x,
        y: evtMouseMove.clientY - startCoordinates.y
      };

      var coordinatesAfterMaxShift = {
        x: screenWidth - startCoordinates.x - userDialogWidth,
        y: screenHeight - userDialogHeight
      };

      var shift = {
        x: 0,
        y: 0
      };

      if (userDialogMinShift.x < shift.x) {
        shift.x = shift.x;
      } else if (userDialogMaxShift.x > screenWidth) {
        shift.x = coordinatesAfterMaxShift.x;
      } else {
        shift.x = coordinatesAfterMiddleShift.x;
      }

      if (userDialogMinShift.y < shift.y) {
        shift.y = shift.y;
      } else if (userDialogMaxShift.y > screenHeight) {
        shift.y = coordinatesAfterMaxShift.y;
      } else {
        shift.y = coordinatesAfterMiddleShift.y;
      }

      userDialog.style.top = shift.y + 'px';
      userDialog.style.left = shift.x + 'px';
    };

    var onDocumentMouseUp = function (evtMouseup) {
      evtMouseup.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDragged) {
          evtDragged.preventDefault();
          upload.removeEventListener('click', onClickPreventDefault);
        };
        upload.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  upload.addEventListener('mousedown', onUploadMousedown);
})();
