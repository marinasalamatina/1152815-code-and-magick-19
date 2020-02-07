'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_GAP = 5;

var CLOUD_PADDING_X = 20;
var CLOUD_PADDING_Y = 30;
var BAR_PADDING = 40;
var NAME_PADDING = 60;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;

var TEXT_COLOR = '#000000';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var FONT_FAMILY = '16px PT Mono';
var HUE = 240;
var LIGHTNESS = 50;

var renderCloud = function (ctx, x, y) {
  var shadowX = CLOUD_X + CLOUD_GAP;
  var shadowY = CLOUD_Y + CLOUD_GAP;

  var shadowWidth = CLOUD_WIDTH + CLOUD_GAP;
  var shadowHeight = CLOUD_HEIGHT + CLOUD_GAP;

  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(shadowX, shadowY, shadowWidth, shadowHeight);
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


var renderHeader = function (ctx, x, y) {
  var headerX = x + CLOUD_PADDING_X;
  var headerY = y + CLOUD_PADDING_Y;
  var stringPadding = headerY + TEXT_HEIGHT;

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_FAMILY;
  ctx.fillText('Ура вы победили!', headerX, headerY);
  ctx.fillText('Список результатов:', headerX, stringPadding);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height, color);
};

var renderBars = function (ctx, times, names) {
  var marginBottom = BAR_PADDING + BAR_HEIGHT_MAX;
  var barWidthMargin = BAR_WIDTH + BAR_GAP;

  var getRandomColor = function () {
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

  for (var i = 0; i < times.length; i += 1) {
    var maxTime = getMaxValue(times);
    var certainHeight = BAR_HEIGHT_MAX * times[i] / maxTime;
    var barX = CLOUD_X + BAR_PADDING + barWidthMargin * i;
    var barY = CLOUD_Y + BAR_PADDING + marginBottom - certainHeight;
    var nameY = CLOUD_Y + NAME_PADDING + marginBottom;
    var timeY = CLOUD_Y + CLOUD_PADDING_Y + marginBottom - certainHeight;

    var barColor = (names[i] === 'Вы') ? PLAYER_BAR_COLOR : getRandomColor();

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), barX, timeY);
    ctx.fillText(names[i], barX, nameY);

    renderBar(ctx, barX, barY, BAR_WIDTH, certainHeight, barColor);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y);
  renderHeader(ctx, CLOUD_X, CLOUD_Y);
  renderBars(ctx, times, names);
};
