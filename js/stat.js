'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var shadowX = CLOUD_X + GAP;
var shadowY = CLOUD_Y + GAP;

var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;


var youBarColor = 'rgba(255, 0, 0, 1)';
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var cloudColor = '#ffffff';
var textColor = '#000000';

var hue = 240;
var saturation = Math.round(Math.random() * 100);
var lightness = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getHSL = function () {
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
};

var getMaxValue = function (array) {
  var maxValue = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  return maxValue;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, shadowX, shadowY, shadowColor);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, cloudColor);

  var getBarColor = function () {
    var barColor = (names[i] === 'Вы') ? youBarColor : getHSL();
    return barColor;
  };

  var headerX = CLOUD_X + GAP * 2;
  var headerY = CLOUD_Y + GAP * 3;

  ctx.fillStyle = textColor;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', headerX, headerY);
  ctx.fillText('Список результатов:', headerX, headerY + TEXT_HEIGHT);

  var maxTime = getMaxValue(times);

  for (var i = 0; i < times.length; i++) {
    var certainheight = BAR_HEIGHT_MAX * times[i] / maxTime;
    var marginBottom = TEXT_HEIGHT * 2 + BAR_HEIGHT_MAX;
    var barWidthMargin = BAR_WIDTH + BAR_GAP;

    var barX = CLOUD_X + GAP * 4 + barWidthMargin * i;
    var barY = CLOUD_Y + GAP * 4 + marginBottom;
    var nameY = CLOUD_Y + GAP * 6 + marginBottom;
    var timeY = CLOUD_Y + GAP * 3 + marginBottom;

    ctx.fillStyle = textColor;
    ctx.fillText(Math.round(times[i]), barX, timeY - certainheight);
    ctx.fillText(names[i], barX, nameY);

    ctx.fillStyle = getBarColor();
    ctx.fillRect(barX, barY - certainheight, BAR_WIDTH, certainheight);
  }
};
