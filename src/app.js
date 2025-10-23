const modules = {
  'Bienvenue ': () => `
    <section>
      <h2>Bienvenue !</h2>
      <p>Ceci est mon site patchwork. Ajoutez vos idées au fur et à mesure !</p>
    </section>
  `,
  // Exemple : ajout d'un module
  'Horloge ': () => `
    <section>
      <h2>Horloge</h2>
      <div id="clock"></div>
    </section>
  `,
  // Deezer
  'Deezer ': () => `
  <section>
    <h2>Mellon Collie</h2>
    <iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/album/6158273" width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
  </section>
`,
  // Ya combien combien 
  'Ya combien combien ': () => `
  <section>
    <h2>FoorMercato </h2>
  <iframe src="https://www.footmercato.net/widget/scores-direct" width="100%" height="500" frameborder="0" scrolling="no"></iframe>
  </section>
`,

};

const menu = document.getElementById('menu');
const content = document.getElementById('content');

function renderMenu() {
  menu.innerHTML = '';
  Object.keys(modules).forEach((mod, i) => {
    const link = document.createElement('a');
    link.textContent = mod;
    link.href = '#'+mod;
    link.className = window.location.hash.slice(1) === mod || (!window.location.hash && i === 0) ? 'active' : '';
    link.onclick = (e) => {
      e.preventDefault();
      window.location.hash = mod;
      renderContent();
      renderMenu();
    };
    menu.appendChild(link);
  });
}

function renderContent() {
  const mod = window.location.hash.slice(1) || Object.keys(modules)[0];
  content.innerHTML = modules[mod]();
  if (mod === 'Horloge') {
    const clock = document.getElementById('clock');
    function updateClock() {
      clock.textContent = new Date().toLocaleTimeString();
    }
    updateClock();
    setInterval(updateClock, 1000);
  }
}

window.addEventListener('hashchange', () => {
  renderContent();
  renderMenu();
});

renderMenu();

renderContent();




