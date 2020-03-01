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
      x: evtMousedown.clientX,
      y: evtMousedown.clientY
    };

    var dragged = false;

    var onDocumentMouseMove = function (evtMouseMove) {
      evtMouseMove.preventDefault();
      dragged = true;

      var shift = {
        x: startCoordinates.x - evtMouseMove.clientX,
        y: startCoordinates.y - evtMouseMove.clientY
      };

      startCoordinates = {
        x: evtMouseMove.clientX,
        y: evtMouseMove.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

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
