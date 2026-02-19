(function () {
  const RED_CLASS = 'tile-flash-waste';
  const GREEN_CLASS = 'tile-flash-build';

  function applyEffectToCell(effect) {
    const cell = document.querySelector(`#map td[data-x="${effect.x}"][data-y="${effect.y}"]`);
    if (!cell) return;

    const className = effect.type === 'waste' ? RED_CLASS : GREEN_CLASS;
    cell.classList.remove(className);
    // リフローでアニメーションを確実に再実行
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
