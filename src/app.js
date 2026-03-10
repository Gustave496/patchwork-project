const modules = {
  'Bienvenue': () => `
    <section>
      <h2>Bienvenue !</h2>
      <p>Ceci est mon site patchwork. Ajoutez vos idées au fur et à mesure !</p>
    </section>
  `,
  'Horloge': () => `
    <section>
      <h2>Horloge</h2>
      <div id="clock"></div>
    </section>
  `,
  'Deezer': () => `
    <section>
      <h2>Mellon Collie</h2>
      <div id="deezer"></div>
      <iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/album/6158273" width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
    </section>
  `,
  'Ya_combien_combien': () => `
    <section>
      <h2>Ya combien combien</h2>
      <div id="yacombiencombien"></div>
      <iframe src="https://www.footmercato.net/widget/scores-direct" width="100%" height="500" frameborder="0" scrolling="no"></iframe>
    </section>
  `,
};

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('menu');
  if (!nav) {
    console.error('Élément #menu introuvable dans le DOM.');
    return;
  }
  let menuList = nav.querySelector('.nav-list');
  if (!menuList) {
    menuList = document.createElement('ul');
    menuList.className = 'nav-list';
    nav.appendChild(menuList);
  }

  const content = document.getElementById('content');
  if (!content) {
    console.error('Élément #content introuvable dans le DOM.');
    return;
  }

  let clockInterval = null;

  function resolveModuleFromHash() {
    const hash = (window.location.hash.slice(1) || '').toLowerCase();
    const keys = Object.keys(modules);
    const byKey = keys.find(k => k.toLowerCase() === hash);
    if (byKey) return byKey;
    const aliasMap = {
      'clock': 'Horloge',
      'horloge': 'Horloge',
      'deezer': 'Deezer',
      'yacombiencombien': 'Ya_combien_combien',
      'ya_combien_combien': 'Ya_combien_combien'
    };
    if (aliasMap[hash]) return aliasMap[hash];
    return keys[0];
  }

  function renderMenu() {
    menuList.innerHTML = '';
    const current = resolveModuleFromHash();
    Object.keys(modules).forEach((mod) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = mod;
      link.href = '#' + mod;
      link.className = 'nav-link' + (current === mod ? ' active' : '');
      link.onclick = (e) => {
        e.preventDefault();
        window.location.hash = mod;
        renderContent();
        renderMenu();
      };
      li.appendChild(link);
      menuList.appendChild(li);
    });
  }

  function renderContent() {
    const mod = resolveModuleFromHash();
    content.innerHTML = modules[mod]();

    if (clockInterval !== null) {
      clearInterval(clockInterval);
      clockInterval = null;
    }

    if (mod === 'Horloge') {
      const clock = document.getElementById('clock');
      if (clock) {
        function updateClock() {
          clock.textContent = new Date().toLocaleTimeString();
        }
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
      }
    }
  }

  window.addEventListener('hashchange', () => {
    renderContent();
    renderMenu();
  });

  renderMenu();
  renderContent();
});
