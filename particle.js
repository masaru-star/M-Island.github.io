(function () {
  const EFFECT_CLASS_MAP = {
    waste: 'tile-flash-waste',
    green: 'tile-flash-green',
    blue: 'tile-flash-blue',
    yellow: 'tile-flash-yellow'
  };

  function applyEffectToCell(effect) {
    const cell = document.querySelector(`#map td[data-x="${effect.x}"][data-y="${effect.y}"]`);
    if (!cell) return;

    const className = EFFECT_CLASS_MAP[effect.type];
    if (!className) return;

    cell.classList.remove(className);
    void cell.offsetWidth;
    cell.classList.add(className);

    const cleanup = () => {
      cell.classList.remove(className);
      cell.removeEventListener('animationend', cleanup);
    };
    cell.addEventListener('animationend', cleanup);
  }

  window.playTileEffects = function (effects) {
    if (!Array.isArray(effects) || effects.length === 0) return;
    effects.forEach(applyEffectToCell);
  };
})();
