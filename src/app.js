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
    <h2>Deezer</h2>
    <p>Voici votre intégration Deezer.</p>
  `,
  'Ya combien combien': () => `
    <h2>Ya combien combien</h2>
    <p>Module Ya combien combien - À compléter</p>
  `,
  'Projets': () => `
    <h2>Projets</h2>
    <p>Découvrez mes projets ici.</p>
  `,
  'À propos': () => `
    <h2>À propos</h2>
    <p>En savoir plus sur moi.</p>
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
      
      // Update clock if Horloge tab is active
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
