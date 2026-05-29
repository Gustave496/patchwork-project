const modules = {
  'Accueil': () => `
    <h2>Bienvenue !</h2>
    <p>Ceci est le début de votre site patchwork. Ajoutez vos idées au fur et à mesure !</p>
  `,
  'Horloge': () => `
    <h2>Horloge</h2>
    <p id="clock" style="font-size: 2em; text-align: center; font-weight: bold;"></p>
  `,
  'YaCombienCombien.com': () => `
    <h2>Ya combien combien.com</h2>
    <p>
      <a href="https://www.footmercato.net" target="_blank" rel="noopener noreferrer">Foot Mercato</a>
    </p>
    <a class="tvsports-widget" href="https://tv-sports.fr" data-sport-id="133" data-direct-only="1" data-width="100%" data-height="650px">Programme TV Foot</a>
    <script async type="text/javascript" src="https://tv-sports.fr/widget.js"></script>
    <div id="fs-standings"></div> <script> (function (w,d,s,o,f,js,fjs) { w['fsStandingsEmbed']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) }; js = d.createElement(s), fjs = d.getElementsByTagName(s)[0]; js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs); }(window, document, 'script', 'mw', 'https://cdn.footystats.org/embeds/standings-loc.js')); mw('params', { leagueID: 2392, lang: 'fr' }); </script>

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
