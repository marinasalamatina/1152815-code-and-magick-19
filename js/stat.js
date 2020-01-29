var CLOUD_WIDTH = 400;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.6)')
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.fillText('Вы', 155, 260);
  ctx.fillText('2725', 155, 130);
  ctx.fillStyle = 'red';
  ctx.fillRect(155, 140, 40, 100);

  ctx.fillStyle = '#000';
  ctx.fillText('Кекс', 240, 260);
  ctx.fillText('4025', 240, 90);
  ctx.fillStyle = 'blue';
  ctx.fillRect(240, 100, 40, 140);

  ctx.fillStyle = '#000';
  ctx.fillText('Катя', 325, 260);
  ctx.fillText('1244', 325, 190);
  ctx.fillStyle = 'grey';
  ctx.fillRect(325, 200, 40, 40);

  ctx.fillStyle = '#000';
  ctx.fillText('Игорь', 410, 260);
  ctx.fillText('1339', 410, 180);
  ctx.fillStyle = 'pink';
  ctx.fillRect(410, 190, 40, 50);
};
