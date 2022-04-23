module.exports = function countdown(tick) {
  let cont = 3;
  let timer = setInterval(() => {
    tick(cont--);
    console.log(cont);
    if (cont == -1) {
      clearInterval(timer);
    }
  }, 1000);
};
