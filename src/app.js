const modules = {
  'Accueil': () => `
    <h2>Bienvenue !</h2>
    <p>Ceci est le début de votre site patchwork. Ajoutez vos idées au fur et à mesure !</p>
  `,
  'Horloge': () => `
    <h2>Horloge</h2>
    <p id="clock" style="font-size: 2em; text-align: center; font-weight: bold;"></p>
  `,
  'Deezer': () => `
    <h2>Ma playlist Deezer</h2>
    <iframe
      scrolling="no"
      frameborder="0"
      allowTransparency="true"
      src="https://widget.deezer.com/widget/dark/album/6158273"
      width="100%"
      height="300"
      style="border: none;"
    ></iframe>
  `,
  'YaCombienCombien.com': () => `
    <h2>Ya combien combien.com</h2>
    <a href="www.footmercato.net">footmercato.net target="_blank" rel="noopener noreferrer"</a>
  `,
  'Projets': () => `
    <h2>Projets</h2>
    <p>Découvrez mes projets ici.</p>
  `,
  'Contact': () => `
    <h2>Contact</h2>
    <p>Vous pouvez me contacter à travers cette page.</p>
  `
};

document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('menu');
  const content = document.getElementById('content');

  function renderMenu() {
    menu.innerHTML = '';
    Object.keys(modules).forEach((mod, i) => {
      const link = document.createElement('a');
      link.textContent = mod;
      link.href = '#' + mod;
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
    if (modules[mod]) {
      content.innerHTML = modules[mod]();
      
      if (mod === 'Horloge') {
        const clock = document.getElementById('clock');
        function updateClock() {
          clock.textContent = new Date().toLocaleTimeString('fr-FR');
        }
        updateClock();
        setInterval(updateClock, 1000);
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
