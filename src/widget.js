// Widgets.js
export const Widgets = {
  // Exemple : widget des scores de football en direct
  'Ya_combien_combien': () => `
    <section>
      <h2>Scores de foot en direct</h2>
      <iframe
        title="scorebird-widget"
        src="https://widget.scorebird.com/horizontal-game-widget.html?sport=soccer&live_final_only=true"
        width="100%"
        height="200"
        frameborder="0"
        style="border:0;overflow:hidden;"
        allowfullscreen
      ></iframe>
    </section>
  `,

