// Discord : ton appli d'origine (HTML et code inchangés), livrée en plugin.
// Ses données sont dans le dossier du plugin, que NeoDex sauvegarde (synchro cloud et sauvegardes) ; à la première ouverture elle reprend ce que tu avais dans NeoDex.
// Elle demande l'accès complet pour utiliser les outils d'interface de NeoDex. NeoDex ne l'ouvre que si elle est signée.
const HTML = "";
/*CSS-MOVED*/ const CSS = `.dcApp{overflow:hidden}
.dcView{width:100%;height:100%;display:flex}
`;  // le style de ce plugin (il utilise les variables du thème de NeoDex)
export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const { el, toast, sfx, ask, newTab, pixIcon, PIX, WX } = ctx.host;
  const host = ctx.host;
  const folder = ctx.folder, legacy = ctx.legacy || {};
  ctx.host.addStyle(CSS);
  view.innerHTML = HTML;
  view.classList.add("dcApp");
  const $ = id => id === "discordApp" ? view : view.querySelector('#' + id);  // les identifiants de ta vue, sans toucher à ceux du reste de NeoDex
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  // ---- ton code d'origine ----
  /* ---------- Discord, as an app of NeoDex: the real Discord web app (discord.com/app) inside the app's view, in the session of the
     browser (you log in there once, like on any site; NeoDex never reads anything of the account). Unread messages show in the tab's
     title; Discord's colours can be NeoDex's (Paramètres, like Gmail: main.js injects the style). Its notifications go through the
     permissions of sites (the bar asks once). ---------- */
  let dcView = null;
  function dcOpen() {
    if (dcView) return;
    dcView = document.createElement('webview');
    dcView.setAttribute('partition', 'persist:web'); dcView.setAttribute('allowpopups', '');
    dcView.className = 'dcView'; dcView.src = 'https://discord.com/app';
    // "(3) Discord", "• Discord | #salon": the count of unread private messages and mentions goes on the tab and on the icon of the
    // left bar; a new one is also a NeoDex notification (without a Windows bubble: Discord shows its own)
    dcView.addEventListener('page-title-updated', e => dcUnread(e.title));
    $('discordApp').append(dcView);
  }
  let dcLast = 0;
  function dcUnread(title) {
    const n = +(/^\((\d+)\)/.exec(title)?.[1] || 0), dot = /^•/.test(title);
    host.tabLabel('Discord' + (n ? ' (' + n + ')' : dot ? ' •' : ''), title);
    host.dockBadge?.(n);
    if (n > dcLast) Promise.resolve(ctx.notifications?.send({ title: n - dcLast > 1 ? (n - dcLast) + ' nouveaux messages' : 'Nouveau message', body: n + ' message' + (n > 1 ? 's' : '') + ' non lu' + (n > 1 ? 's' : '') + ' (messages privés et mentions)', open: 'plugin:neodex.discord', type: 'mp', silent: true })).catch(() => {});
    dcLast = n;
  }

  // Discord's colours = the theme's (Paramètres > apparence), set again whenever the theme changes
  let dcCssKey = null;
  function dcSkinCss() {
    const cs = getComputedStyle(document.documentElement), v = k => cs.getPropertyValue(k).trim(), m = (a, p, b) => `color-mix(in srgb,${a} ${p}%,${b})`;
    const bg = v('--bg0'), line = v('--line'), line2 = v('--line2'), acc = v('--magenta'), pink = v('--pink');
    const prim = m(line, 32, bg), sec = m(line, 20, bg), alt = m(line, 12, bg), hi = m(line2, 30, bg), hi2 = m(line2, 40, bg), hi3 = m(line2, 50, bg);
    return `:root,.theme-dark,.theme-darker,.theme-midnight,.visual-refresh{
  --background-primary:${prim}!important;--background-secondary:${sec}!important;--background-secondary-alt:${alt}!important;--background-tertiary:${bg}!important;--background-floating:${bg}!important;
  --background-base-lowest:${bg}!important;--background-base-lower:${sec}!important;--background-base-low:${prim}!important;--background-surface-high:${hi}!important;--background-surface-higher:${hi2}!important;--background-surface-highest:${hi3}!important;
  --chat-background-default:${prim}!important;--channeltextarea-background:${hi}!important;--modal-background:${prim}!important;--background-modifier-hover:${m(pink, 8, 'transparent')}!important;--background-modifier-selected:${m(pink, 16, 'transparent')}!important;
  --brand-500:${acc}!important;--brand-560:${m(acc, 85, '#000')}!important;--brand-experiment:${acc}!important;--text-link:#7fe0ee!important}
  ::-webkit-scrollbar-thumb{background:${line2}!important}`;
  }
  async function dcSkin() {
    if (!dcView || !dcView.isConnected || !/discord\.com/.test(dcView.getURL?.() || '')) return;
    if (dcCssKey) { dcView.removeInsertedCSS(dcCssKey).catch(() => {}); dcCssKey = null; }
    if ((await host.settings()).discordSkin !== false) dcCssKey = await dcView.insertCSS(dcSkinCss()).catch(() => null);
  }
  { const real = dcOpen; dcOpen = function () { const had = dcView; real.apply(this, arguments); if (!had && dcView) dcView.addEventListener('dom-ready', () => { dcCssKey = null; dcSkin(); }); }; }
  const dcObs = new MutationObserver(() => { clearTimeout(dcSkin.t); dcSkin.t = setTimeout(dcSkin, 200); }).observe(document.documentElement, {attributes: true, attributeFilter: ['style']});
  // ---- fin ----
  dcOpen();  // started with NeoDex (autoload): the unread messages show on the left bar even before the tab is opened
  ctx.onOpen(() => { dcOpen(); });  ctx.onClose(() => { dcObs.disconnect(); });
}
