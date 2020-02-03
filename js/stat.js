'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_GUP = 5;

var CLOUD_PADDING_X = 20;
var CLOUD_PADDING_Y = 30;
var BAR_PADDING = 40;
var NAME_PADDING = 60;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;

var TEXT_COLOR = '#000000';
var YOU_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var FONT_FAMILY = '16px PT Mono';
var HUE = 240;
var LIGHTNESS = 50;

var shadowX = CLOUD_X + CLOUD_GUP;
var shadowY = CLOUD_Y + CLOUD_GUP;

var shadowWidth = CLOUD_WIDTH + CLOUD_GUP;
var shadowHeight = CLOUD_HEIGHT + CLOUD_GUP;

var headerX = CLOUD_X + CLOUD_PADDING_X;
var headerY = CLOUD_Y + CLOUD_PADDING_Y;

var stringPadding = headerY + TEXT_HEIGHT;
var marginBottom = BAR_PADDING + BAR_HEIGHT_MAX;
var barWidthMargin = BAR_WIDTH + BAR_GAP;


var renderCloud = function (ctx, x, y) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(shadowX, shadowY, shadowWidth, shadowHeight);
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


var renderHeader = function (ctx, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_FAMILY;
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', headerX, stringPadding);
};

var getHSL = function () {
  var saturation = Math.round(Math.random() * 100);

  return 'hsl(' + HUE + ', ' + saturation + '%, ' + LIGHTNESS + '%)';
};

var getMaxValue = function (array) {
  var maxValue = array[0];

  for (var i = 0; i < array.length; i += 1) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  return maxValue;
};

var renderBars = function (ctx, times, names) {
  var getBarColor = function () {
    var barColor = (names[i] === 'Вы') ? YOU_BAR_COLOR : getHSL();
    return barColor;
  };

  for (var i = 0; i < times.length; i += 1) {
    var maxTime = getMaxValue(times);
    var certainheight = BAR_HEIGHT_MAX * times[i] / maxTime;
    var barX = CLOUD_X + BAR_PADDING + barWidthMargin * i;
    var barY = CLOUD_Y + BAR_PADDING + marginBottom - certainheight;
    var nameY = CLOUD_Y + NAME_PADDING + marginBottom;
    var timeY = CLOUD_Y + CLOUD_PADDING_Y + marginBottom - certainheight;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), barX, timeY);
    ctx.fillText(names[i], barX, nameY);

    ctx.fillStyle = getBarColor();
    ctx.fillRect(barX, barY, BAR_WIDTH, certainheight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y);
  renderHeader(ctx, headerX, headerY);
  renderBars(ctx, times, names);
};
