'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (array) {
      return Math.round(Math.random() * (array.length - 1));
    },
    getRandomElement: function (array) {
      return array[this.getRandomNumber(array)];
    }
  };
})();
