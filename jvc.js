/* ── DATA ── */
const PRODUCTS = [
  {
    id:1, brand:'NVIDIA', type:'GPU', name:'RTX 4090 SUPRIM LIQUID X',
    desc:'Elite-tier performance featuring closed-loop liquid cooling and a full custom PCB with unlocked power limits.',
    price:1999.00, statLabel:'CUDA Cores', statVal:'16384',
    cat:'gpu', brandKey:'nvidia',
    specs:{VRAM:'24GB GDDR6X', Boost:'2.61 GHz', TDP:'450W', Interface:'PCIe 4.0 x16'}
  },
  {
    id:2, brand:'INTEL', type:'CPU', name:'Core i9-14900KS',
    desc:'Special Edition unlocked desktop processor. Pushing the absolute boundaries of frequency and multi-thread performance.',
    price:689.00, statLabel:'Boost Clock', statVal:'6.2 GHz',
    cat:'cpu', brandKey:'intel',
    specs:{Cores:'24 (8P+16E)', Socket:'LGA1700', TDP:'253W', Cache:'36MB L3'}
  },
  {
    id:3, brand:'CORSAIR', type:'RAM', name:'Dominator Titanium 64GB DDR5',
    desc:'Precision-forged aluminum cooling meets unprecedented DDR5 speeds for extreme overclocking headroom.',
    price:349.99, statLabel:'Transfer Rate', statVal:'8000 MT/s',
    cat:'ram', brandKey:'corsair',
    specs:{Capacity:'64GB (2x32)', Speed:'DDR5-8000', Latency:'CL38', Voltage:'1.45V'}
  },
  {
    id:4, brand:'NOCTUA', type:'Cooling', name:'NH-D15 chromax.black',
    desc:'The legendary flagship air cooler, now in stealth black. Near-silent operation for demanding workloads.',
    price:119.95, statLabel:'TDP Rating', statVal:'300W+',
    cat:'cooling', brandKey:'noctua',
    specs:{Height:'165mm', Fans:'2x NF-A15', Noise:'19.2 dB(A)', Socket:'LGA1700/AM5'}
  },
  {
    id:5, brand:'AMD', type:'GPU', name:'RX 7900 XTX Nitro+',
    desc:'Sapphire-engineered flagship RDNA3 powerhouse with triple-fan Tri-X cooling for sustained peak performance.',
    price:879.00, statLabel:'Stream Proc.', statVal:'6144',
    cat:'gpu', brandKey:'amd',
    specs:{VRAM:'24GB GDDR6', Boost:'2.5 GHz', TDP:'355W', Interface:'PCIe 4.0 x16'}
  },
  {
    id:6, brand:'CORSAIR', type:'RAM', name:'Vengeance 32GB DDR5',
    desc:'Optimized for Intel and AMD platforms. Aggressive overclocking profiles with XMP 3.0 support built-in.',
    price:129.99, statLabel:'Transfer Rate', statVal:'6400 MT/s',
    cat:'ram', brandKey:'corsair',
    specs:{Capacity:'32GB (2x16)', Speed:'DDR5-6400', Latency:'CL36', Voltage:'1.35V'}
  },
];

const SYSTEMS = [
  {
    id:10, tier:'Flagship System', name:'SOVEREIGN MK.IV',
    price:4899.00,
    cpu:'Intel Core i9-14900K', gpu:'NVIDIA RTX 4090 24GB', ram:'64GB DDR5-6400', storage:'4TB NVMe Gen4',
    desc:'The apex of custom-loop liquid cooled tower builds. Reserved for those who accept nothing but absolute dominance.',
    specs:{Processor:'Intel Core i9-14900K', Graphics:'NVIDIA RTX 4090', Memory:'64GB DDR5-6400', Storage:'4TB NVMe Gen4'}
  },
  {
    id:11, tier:'Performance System', name:"KING'S CORE i9 EDITION",
    price:4299.00,
    cpu:'Intel Core i9-14900K', gpu:'NVIDIA RTX 4090', ram:'64GB DDR5-6000', storage:'4TB NVMe Gen4',
    desc:"Engineered for absolute dominance. The King's Core i9 Edition delivers unparalleled processing power and thermal efficiency for elite creators and professional gamers.",
    specs:{Processor:'Intel Core i9-14900K', Graphics:'NVIDIA RTX 4090', Memory:'64GB DDR5-6000', Storage:'4TB NVMe Gen4'}
  },
  {
    id:12, tier:'Mid-Range Titan', name:'AEGIS RTX 4080 SUPER',
    price:3199.00,
    cpu:'Intel Core i7-14700K', gpu:'NVIDIA RTX 4080 Super 16GB', ram:'32GB DDR5-5600', storage:'2TB NVMe Gen4',
    desc:'Precision-built for competitive gaming and content creation. Maximum frame rates without compromise.',
    specs:{Processor:'Intel Core i7-14700K', Graphics:'NVIDIA RTX 4080 Super', Memory:'32GB DDR5-5600', Storage:'2TB NVMe Gen4'}
  },
];

let cart = [];
let currentView = 'home';

function goView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('v-' + name);
  if (el) el.classList.add('active');
  currentView = name;

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (name === 'home') document.getElementById('nl-systems').classList.add('active');
  if (name === 'components') document.getElementById('nl-components').classList.add('active');

  if (name === 'components') renderProducts();
  if (name === 'cart') renderCart();

  window.scrollTo({top:0, behavior:'smooth'});
}

function scrollToSystems() {
  const el = document.getElementById('featured-systems');
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

function gpuSVG(color='#8b5cf6') {
  return `<svg width="120" height="120" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="22" width="150" height="55" rx="5" fill="${color}" fill-opacity=".1" stroke="${color}" stroke-width="1.5"/>
    <circle cx="55" cy="49" r="17" fill="none" stroke="${color}" stroke-width="1.4" stroke-opacity=".7"/>
    <circle cx="55" cy="49" r="10" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="55" cy="49" r="4" fill="${color}" fill-opacity=".4"/>
    <circle cx="105" cy="49" r="17" fill="none" stroke="${color}" stroke-width="1.4" stroke-opacity=".7"/>
    <circle cx="105" cy="49" r="10" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="105" cy="49" r="4" fill="${color}" fill-opacity=".4"/>
    <rect x="5" y="23" width="150" height="3" rx="1" fill="${color}" fill-opacity=".8"/>
    <rect x="5" y="72" width="14" height="9" rx="1" fill="${color}" fill-opacity=".3"/>
  </svg>`;
}

function cpuSVG(color='#7c3aed') {
  return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="22" width="56" height="56" rx="4" fill="${color}" fill-opacity=".12" stroke="${color}" stroke-width="1.5"/>
    <rect x="32" y="32" width="36" height="36" rx="2" fill="${color}" fill-opacity=".25"/>
    ${[28,40,52,64].map(y=>`<line x1="22" y1="${y}" x2="12" y2="${y}" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>
    <line x1="78" y1="${y}" x2="88" y2="${y}" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>`).join('')}
    ${[28,40,52,64].map(x=>`<line x1="${x}" y1="22" x2="${x}" y2="12" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>
    <line x1="${x}" y1="78" x2="${x}" y2="88" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>`).join('')}
  </svg>`;
}

function ramSVG(color='#a78bfa') {
  return `<svg width="110" height="80" viewBox="0 0 130 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${[18,42,66,90].map(x=>`
    <rect x="${x}" y="10" width="16" height="60" rx="2" fill="${color}" fill-opacity=".12" stroke="${color}" stroke-width="1.2"/>
    <rect x="${x+2}" y="10" width="12" height="4" rx="1" fill="${color}" fill-opacity=".6"/>
    ${[20,28,36,44,52].map(y=>`<rect x="${x+3}" y="${y}" width="10" height="2" rx="1" fill="${color}" fill-opacity=".25"/>`).join('')}
    `).join('')}
  </svg>`;
}

function fanSVG(color='#8b5cf6') {
  return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="${color}" fill-opacity=".06" stroke="${color}" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="32" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="50" cy="50" r="6" fill="${color}" fill-opacity=".6"/>
    ${[0,60,120,180,240,300].map(a=>{
      const r=a*Math.PI/180, x1=50+12*Math.cos(r), y1=50+12*Math.sin(r), x2=50+36*Math.cos(r+0.6), y2=50+36*Math.sin(r+0.6);
      return `<path d="M50 50 Q${x1} ${y1} ${x2} ${y2}" stroke="${color}" stroke-width="8" stroke-opacity=".18" fill="none" stroke-linecap="round"/>`;
    }).join('')}
  </svg>`;
}

function sysSVG(color='#8b5cf6') {
  return `<svg width="130" height="160" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="8" width="80" height="164" rx="6" fill="${color}" fill-opacity=".08" stroke="${color}" stroke-width="1.4"/>
    <rect x="30" y="20" width="60" height="38" rx="3" fill="${color}" fill-opacity=".18"/>
    <circle cx="60" cy="100" r="26" fill="none" stroke="${color}" stroke-width="1.4" stroke-opacity=".7"/>
    <circle cx="60" cy="100" r="16" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="60" cy="100" r="5" fill="${color}" fill-opacity=".6"/>
    <rect x="30" y="148" width="60" height="8" rx="2" fill="${color}" fill-opacity=".3"/>
    <rect x="30" y="162" width="28" height="6" rx="1" fill="${color}" fill-opacity=".5"/>
    <rect x="20" y="8" width="80" height="3" rx="1" fill="${color}" fill-opacity=".6"/>
  </svg>`;
}

function getProductSVG(p) {
  if (p.cat==='gpu') return gpuSVG(p.brandKey==='amd'?'#ef4444':'#8b5cf6');
  if (p.cat==='cpu') return cpuSVG('#7c3aed');
  if (p.cat==='ram') return ramSVG('#a78bfa');
  if (p.cat==='cooling') return fanSVG('#8b5cf6');
  return gpuSVG();
}

function renderSystems() {
  const grid = document.getElementById('sys-grid');
  grid.innerHTML = SYSTEMS.map(s => `
    <div class="sys-card" onclick="showSystem(${s.id})">
      <div class="sys-img">
        ${sysSVG()}
        <div class="svg-overlay"></div>
      </div>
      <div class="sys-info">
        <div class="sys-tier">${s.tier}</div>
        <div class="sys-name">${s.name}</div>
        <div class="sys-specs">
          <div class="sys-spec-row"><strong>CPU:</strong>${s.cpu}</div>
          <div class="sys-spec-row"><strong>GPU:</strong>${s.gpu}</div>
          <div class="sys-spec-row"><strong>RAM:</strong>${s.ram}</div>
        </div>
        <div class="sys-foot">
          <div class="sys-price">$${s.price.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${s.id},'system')">
            ADD
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderProducts() {
  const grid = document.getElementById('prod-grid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="prod-card" onclick="showProduct(${p.id})">
      <div class="prod-img">
        ${getProductSVG(p)}
        <div class="svg-overlay"></div>
      </div>
      <div class="prod-stat">
        <span class="stat-lbl">${p.statLabel}</span>
        <span class="stat-val">${p.statVal}</span>
      </div>
      <div class="prod-info">
        <div class="prod-brand">${p.brand} / ${p.type}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.desc}</div>
        <div class="prod-foot">
          <div class="prod-price">$${p.price.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id},'product')">
            ADD
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function showProduct(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;
  const el = document.getElementById('detail-inner');
  el.innerHTML = `
    <button class="back-btn" onclick="goView('components')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back to Components
    </button>
    <div class="detail-grid">
      <div class="detail-img">
        ${getProductSVG(p)}
      </div>
      <div>
        <div class="detail-brand">${p.brand} / ${p.type}</div>
        <h1 class="detail-name">${p.name}</h1>
        <p class="detail-desc">${p.desc}</p>
        <div class="detail-price">$${p.price.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
        <div class="detail-actions">
          <button class="btn-add-lg" onclick="addToCart(${p.id},'product');goView('cart')">Add to Cart</button>
          <button class="btn-wish" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="specs-grid">
          ${Object.entries(p.specs).map(([k,v])=>`
            <div class="spec-item">
              <div class="spec-lbl">${k}</div>
              <div class="spec-val">${v}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  goView('detail');
}

function showSystem(id) {
  const s = SYSTEMS.find(x=>x.id===id);
  if (!s) return;
  const el = document.getElementById('detail-inner');
  el.innerHTML = `
    <button class="back-btn" onclick="goView('home')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back to Systems
    </button>
    <div class="detail-grid">
      <div class="detail-img">
        ${sysSVG('#a78bfa')}
      </div>
      <div>
        <div class="detail-brand">${s.tier}</div>
        <h1 class="detail-name">${s.name}</h1>
        <p class="detail-desc">${s.desc}</p>
        <div class="detail-price">$${s.price.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
        <div class="detail-actions">
          <button class="btn-add-lg" onclick="addToCart(${s.id},'system');goView('cart')">Add to Cart</button>
          <button class="btn-wish" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="specs-grid">
          ${Object.entries(s.specs).map(([k,v])=>`
            <div class="spec-item">
              <div class="spec-lbl">${k}</div>
              <div class="spec-val">${v}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  goView('detail');
}

function addToCart(id, type) {
  const item = type==='product' ? PRODUCTS.find(x=>x.id===id) : SYSTEMS.find(x=>x.id===id);
  if (!item) return;
  const existing = cart.find(c=>c.id===id && c.type===type);
  if (existing) { existing.qty++; }
  else { cart.push({...item, type, qty:1}); }
  updateBadge();
  showToast(`${item.name.length>30?item.name.slice(0,30)+'…':item.name} added to cart`);
}

function removeFromCart(id, type) {
  cart = cart.filter(c=>!(c.id===id && c.type===type));
  updateBadge();
  renderCart();
}

function changeQty(id, type, delta) {
  const item = cart.find(c=>c.id===id && c.type===type);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c=>!(c.id===id && c.type===type));
  updateBadge();
  renderCart();
}

function updateBadge() {
  const total = cart.reduce((s,c)=>s+c.qty, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = total;
  badge.style.display = total>0 ? 'flex' : 'none';
}

function renderCart() {
  const el = document.getElementById('cart-items');
  if (cart.length === 0) {
    el.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your requisition is empty</h3>
        <p>Add systems or components to initialize.</p>
        <button class="btn-fill" onclick="goView('components')">Browse Components</button>
      </div>`;
  } else {
    el.innerHTML = cart.map(c => {
      const imgHTML = c.type==='system' ? sysSVG('#a78bfa') : getProductSVG(c);
      const specs = c.type==='system'
        ? `<div class="ci-spec"><strong>CPU:</strong>${c.cpu}<br><strong>GPU:</strong>${c.gpu}<br><strong>RAM:</strong>${c.ram}</div>`
        : `<div class="ci-spec">${Object.entries(c.specs).slice(0,2).map(([k,v])=>`<strong>${k}:</strong>${v}`).join('<br>')}</div>`;
      return `
        <div class="cart-item">
          <div class="ci-img">${imgHTML}</div>
          <div>
            <div class="ci-type">${c.type==='system'?'Pre-Configured System':'Component Upgrade'}</div>
            <div class="ci-name">${c.name}</div>
            ${specs}
          </div>
          <div class="ci-right">
            <button class="ci-rm" onclick="removeFromCart(${c.id},'${c.type}')">✕</button>
            <div class="ci-price">$${(c.price*c.qty).toLocaleString('en-US',{minimumFractionDigits:2})}</div>
            <div class="ci-qty">
              <button class="qty-btn" onclick="changeQty(${c.id},'${c.type}',-1)">−</button>
              <span class="qty-n">${c.qty}</span>
              <button class="qty-btn" onclick="changeQty(${c.id},'${c.type}',1)">+</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  const subtotal = cart.reduce((s,c)=>s+c.price*c.qty, 0);
  const count = cart.reduce((s,c)=>s+c.qty, 0);
  document.getElementById('cart-item-count').textContent = `Subtotal (${count} item${count!==1?'s':''})`;
  document.getElementById('cart-subtotal').textContent = '$'+subtotal.toLocaleString('en-US',{minimumFractionDigits:2});
  document.getElementById('cart-total').textContent = '$'+subtotal.toLocaleString('en-US',{minimumFractionDigits:2});
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2800);
}

function toggleMobNav() {
  document.getElementById('mob-nav').classList.toggle('open');
}

function setPriceFilter(key, btn) {
  btn.classList.toggle('on');
}

updateBadge();
renderSystems();
document.getElementById('cart-badge').style.display = 'none';
