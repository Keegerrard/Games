(function () {
  "use strict";

  const gameName = document.body.getAttribute("data-game-name") || "Game";
  const topbar = document.createElement("div");
  topbar.className = "game-shell-topbar";
  topbar.innerHTML =
    '<span class="game-shell-badge">' +
    gameName +
    '</span>' +
    '<a class="game-shell-link" href="../index.html">Back to Hub</a>';

  document.body.appendChild(topbar);
})();
