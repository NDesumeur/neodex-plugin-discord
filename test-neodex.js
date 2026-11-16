// lancé par le test « local » de NeoDex : sans compte Discord, un titre « (3) Discord » comme celui du site doit mettre 3 sur l'icône de la barre de gauche
// et une notification, puis « Discord » (tout lu) remettre l'icône à zéro
module.exports = async ({ js, sleep }) => {
  let ok = false; for (let i = 0; i < 20 && !ok; i++) { await sleep(300); ok = await js(`!!document.querySelector('.dcView')`); }
  if (!ok) throw new Error("la vue Discord n'est pas créée au démarrage (autoload)");
  const title = t => js(`document.querySelector('.dcView').dispatchEvent(Object.assign(new Event('page-title-updated'), {title: ${JSON.stringify(t)}})), 0`);
  const count = () => js(`nfItems.filter(n => n.app === 'plugin:neodex.discord').length`), before = await count();  // a notification left by an earlier run does not count
  await title('(3) Discord'); await sleep(800);
  const a = await js(`dkBadges['plugin:neodex.discord'] || 0`) + ',' + (await count() - before);
  if (a !== '3,1') throw new Error('après « (3) Discord » : badge, notifications = ' + a);
  await title('Discord'); await sleep(500);
  const b = await js(`dkBadges['plugin:neodex.discord'] || 0`);
  if (b !== 0) throw new Error('après lecture, le badge reste à ' + b);
  return 'badge de la barre de gauche 3 puis 0, une notification pour les nouveaux messages';
};
