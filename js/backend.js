'use strict';

(function () {
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var MAX_TYPE = 1;
  var SUCCESS_CODE = 200;

  var createXhr = function (xhr, url, type, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Проверьте подключение к сети');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс. Попробуйте ещё раз.');
    });

    xhr.timeout = MAX_TYPE;
    xhr.open(type, url);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      createXhr(xhr, LOAD_URL, 'GET', onLoad, onError);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      createXhr(xhr, SAVE_URL, 'POST', onLoad, onError);
      xhr.send(data);
    }
  };
})();
