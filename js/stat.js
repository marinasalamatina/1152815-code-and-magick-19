window.renderStatistics = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(50, 250, 50, 650);
  ctx.moveTo(50, 650, 350, 650);
  ctx.moveTo(350, 650, 350, 250);
  ctx.moveTo(350, 250, 50, 250);
  ctx.moveTo(50, 650, 350, 650);
  ctx.clozePath();
  ctx.fill() = '#fff';
};
