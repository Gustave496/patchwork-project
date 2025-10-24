const modules = {
  'Bienvenue': () => `
    <section>
      <h2>Bienvenue !</h2>
      <p>Ceci est mon site patchwork. Ajoutez vos idées au fur et à mesure !</p>
    </section>
  `,
  // Exemple : ajout d'un module
  'Horloge': () => `
    <section>
      <h2>Horloge</h2>
      <div id="clock"></div>
    </section>
  `,
  // Deezer
  'Deezer': () => `
  <section>
    <h2>Mellon Collie</h2>
    <iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/album/6158273" width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>
  </section>
`,
  // Ya combien combien 
  'Ya_combien_combien': () => `
<section>
  <h2>Scores de foot en direct</h2>
  <iframe
    src="https://www.flashscore.fr/"
    width="100%"
    height="800"
    frameborder="0"
    style="border:0;overflow:hidden;"
    title="Scores en direct"
  ></iframe>
</section>
`,
  // Paris 12eme 
  'Paris 12eme': () => `
  <section>
  <h2>Découvrir le 12e arrondissement de Paris</h2>
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d21070.638868295357!2d2.3909418599577035!3d48.8450992382208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1e05b4d9c3%3A0x7621b8e33b35e018!2s12e%20Arrondissement%2C%20Paris!5e0!3m2!1sfr!2sfr!4v1573699556951!5m2!1sfr!2sfr" 
    width="100%" 
    height="450" 
    frameborder="0" 
    style="border:0;" 
    allowfullscreen="" 
    aria-hidden="false" 
    tabindex="0" 
    title="Carte du 12ème arrondissement - Paris">
  </iframe>
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













