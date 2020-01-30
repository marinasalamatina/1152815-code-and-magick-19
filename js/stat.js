'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var WIDTH_COLUMN = 40;
var BEETWEN_COLUMN = 50;

var leftMargin = CLOUD_X + BEETWEN_COLUMN;
var bottomMargin = CLOUD_HEIGHT - GAP;
var columnPaddingBottom = 30;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PTMono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var players = ['Вы', 'Кекс', 'Катя', 'Игорь'];

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], leftMargin + (WIDTH_COLUMN + BEETWEN_COLUMN) * i, bottomMargin);
  }

  var results = ['2725', '4025', '1244', '1339'];

  for (var r = 0; r < results.length; r++) {
    ctx.fillText(results[r], leftMargin + (WIDTH_COLUMN + BEETWEN_COLUMN) * r, CLOUD_HEIGHT - columnPaddingBottom - results[r] * 0.037 - GAP);
    ctx.fillRect(leftMargin + (WIDTH_COLUMN + BEETWEN_COLUMN) * r, CLOUD_HEIGHT - columnPaddingBottom - results[r] * 0.037, WIDTH_COLUMN, results[r] * 0.037);
  }
};

