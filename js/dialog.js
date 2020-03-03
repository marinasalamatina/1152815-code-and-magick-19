'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userName = userDialog.querySelector('.setup-user-name');
  var userDialogStartPosition = 'top: 80px; left: 50%;';
  var upload = userDialog.querySelector('.upload');

  var startCoordinates = {
    left: null,
    top: null
  };

  var dragged = false;

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

  var moveObject = function (evt, objectDraggable) {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var objectDraggableCoordinates = objectDraggable.getBoundingClientRect();
    var objectDraggableWidth = objectDraggableCoordinates.width;
    var objectDraggableHeight = objectDraggableCoordinates.height;
    var objectDraggableHalfWidth = objectDraggableWidth / 2;

    var objectDraggableMinShift = {
      x: objectDraggableHalfWidth,
      y: 0
    };

    var objectDraggableMaxShift = {
      x: screenWidth - objectDraggableHalfWidth,
      y: screenHeight - objectDraggableHeight
    };

    if (evt.clientX <= objectDraggableMinShift.x) {
      startCoordinates.left = objectDraggableHalfWidth;
    } else if (evt.clientX >= objectDraggableMaxShift.x) {
      startCoordinates.left = objectDraggableMaxShift.x;
    } else {
      startCoordinates.left = evt.clientX;
    }

    if (evt.clientY <= objectDraggableMinShift.y) {
      startCoordinates.top = 0;
    } else if (evt.clientY >= objectDraggableMaxShift.y) {
      startCoordinates.top = objectDraggableMaxShift.y;
    } else {
      startCoordinates.top = evt.clientY;
    }

    objectDraggable.style.left = startCoordinates.left + 'px';
    objectDraggable.style.top = startCoordinates.top + 'px';
  };

  var onDocumentMouseMove = function (evtMousemove) {
    evtMousemove.preventDefault();

    moveObject(evtMousemove, userDialog);
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

  var onUploadMousedown = function (evtMousedown) {
    evtMousedown.preventDefault();

    var userDialogCoordinates = userDialog.getBoundingClientRect();
    startCoordinates.left = evtMousedown.clientX - userDialogCoordinates.left;
    startCoordinates.top = evtMousedown.clientY - userDialogCoordinates.top;

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  upload.addEventListener('mousedown', onUploadMousedown);
})();
