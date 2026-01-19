// =======================
// POPUP CONFIG
// =======================
const POPUP_KEY = 'last_popup_accept';
const POPUP_DELAY = 30 * 60 * 1000;

// =======================
function shouldShowPopup() {
    const last = localStorage.getItem(POPUP_KEY);
    if (!last) return true;
    return (Date.now() - Number(last)) > POPUP_DELAY;
}

function showPopup() {
    const p = document.getElementById('sys-notification');
    if (p) p.classList.add('active');
}

function hidePopup() {
    const p = document.getElementById('sys-notification');
    if (p) p.classList.remove('active');
}

function confirmEntry() {
    localStorage.setItem(POPUP_KEY, Date.now());
    hidePopup();
}

// =======================
// UI
// =======================
const titleStr = "NEO-TOKYO_DATABASE_v2.0";
let i = 0;

function typeWriter() {
    const el = document.getElementById("typing-title");
    if (el && i < titleStr.length) {
        el.innerHTML += titleStr.charAt(i++);
        setTimeout(typeWriter, 100);
    }
}

function fakeCounter() {
    const el = document.getElementById('user-count');
    if (!el) return;
    let count = 1337;
    setInterval(() => {
        count += Math.floor(Math.random() * 5) - 2;
        el.innerText = count;
    }, 3000);
}

// =======================
// CARDS
// =======================
function renderCards(data) {
    const grid = document.getElementById('contentGrid');
    if (!grid) return;

    grid.innerHTML = data.map(item => `
        <div class="card">
            <div class="poster-wrapper">
                <img src="${item.image}" class="poster">
            </div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <a class="btn-stream" href="watch.html?id=${item.id}">
                    ACESSAR_DATABASE.sh
                </a>
            </div>
        </div>
    `).join('');
}

function filter() {
    const q = searchBar.value.toLowerCase();
    renderCards(database.filter(i => i.title.toLowerCase().includes(q)));
}

// =======================
// INIT
// =======================
document.addEventListener('DOMContentLoaded', () => {

    if (shouldShowPopup()) showPopup();

    if (typeof database !== 'undefined') {
        renderCards(database);
    }

    typeWriter();
    fakeCounter();
});

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

function showCredits() {
    alert("CRÉDITOS:\nImagens: TMDB / Wallhaven\nFontes: AnimeFire, AnimesOnline, RedeCanais\nSistema: Neo-Tokyo v1.0");
}
// Função para detectar AdBlock
async function checkAdBlock() {
  let adBlockEnabled = false;
  const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  
  try {
    const response = await fetch(new Request(googleAdUrl, { method: 'HEAD', mode: 'no-cors' }));
    adBlockEnabled = false; // Se conseguiu baixar o script do Google, tá sem Adblock
  } catch (e) {
    adBlockEnabled = true; // Se deu erro, o Adblock bloqueou o domínio do Google Ads
  }

  if (adBlockEnabled) {
    showAdBlockWarning();
  }
}

function showAdBlockWarning() {
  const warning = document.createElement('div');
  warning.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; background: #bc13fe; color: #fff; padding: 15px; border-radius: 10px; z-index: 10000; box-shadow: 0 0 15px rgba(0,0,0,0.5); font-family: sans-serif; max-width: 250px; border: 2px solid #fff;">
      <strong>EI, EXPLORADOR! 🤖</strong><br>
      Detectamos que você usa AdBlock. O <b>Neo-Tokyo</b> é mantido por esses links. Considere desativar para apoiar o projeto e liberar os servidores!
      <button onclick="this.parentElement.remove()" style="margin-top: 10px; background: #fff; color: #bc13fe; border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px; font-weight: bold;">ENTENDI</button>
    </div>
  `;
  document.body.appendChild(warning);
}

// Executa a checagem após 3 segundos
setTimeout(checkAdBlock, 3000);
