const WA_NUMBER = "5555999712007";

const products = [
  // Papelaria
  {name:"Banner", price:"A partir de R$ 80,00", img:"img/produtos/banner.jpg", cat:"papelaria", desc:""},
  {name:"Foto Polaroid", price:"R$ 2,50", img:"img/produtos/polaroid.jpg", cat:"papelaria", desc:""},
  {name:"Fotos Plastificadas", price:"A partir de R$ 3,00", img:"img/produtos/foto-plastificada.jpg", cat:"papelaria", desc:"Fotos com acabamento plastificado para maior durabilidade."},
  {name:"Azulejo Personalizado", price:"R$ 30,00", img:"img/produtos/azulejo.jpg", cat:"papelaria", desc:""},
  {name:"Cartão de Visita", price:"1000 unidades por R$ 150,00", img:"img/produtos/cartao.jpg", cat:"papelaria", desc:""},
  {name:"Wind Banner", price:"R$ 290,00", img:"img/produtos/widerbanner.jpg", cat:"papelaria", desc:""},
  {name:"Mini Calendário", price:"R$ 3,50", img:"img/produtos/calendario.jpg", cat:"papelaria", desc:""},
  {name:"Etiqueta Escolar", price:"R$ 29,90", img:"img/produtos/etiqueta.jpg", cat:"papelaria", desc:""},
  // Personalizados
  {name:"Caneca Personalizada", price:"R$ 39,90", img:"img/produtos/caneca.jpg.jpg", cat:"personalizados", desc:"Ou duas por R$ 65,00."},
  {name:"Quadro de Vidro", price:"R$ 39,90", img:"img/produtos/quadro-personalizado.jpg.jpg", cat:"personalizados", desc:"Ou dois por R$ 65,00."},
  {name:"Álbum de Fotos + 18 Fotos", price:"R$ 89,00", img:"img/produtos/album.jpg", cat:"personalizados", desc:""},
  {name:"Kit Chaveiro", price:"R$ 9,90", img:"img/produtos/kit-chaveiro.jpg", cat:"personalizados", desc:""},
  {name:"Caixinhas Personalizadas", price:"R$ 6,00", img:"img/produtos/caixinhas-personalizadas.jpg", cat:"personalizados", desc:""},
  {name:"Caixa Personalizada Grande", price:"R$ 25,00", img:"img/produtos/caixa-personalizada.jpg", cat:"personalizados", desc:""},
  {name:"Chaveiro Individual", price:"R$ 4,00", img:"img/produtos/chaveiro.jpg", cat:"personalizados", desc:""},
  {name:"Topo de Bolo", price:"R$ 20,00", img:"img/produtos/topo-bolo.jpg.JPG", cat:"personalizados", desc:""},
  // Eventos
  {name:"Lembrancinhas Dia das Mães", price:"R$ 2,50", img:"img/produtos/dia-das-maes.jpg", cat:"eventos", desc:""},
  {name:"Centro de Mesa Plastificado", price:"R$ 7,00", img:"img/produtos/centro-de-mesa.jpg", cat:"eventos", desc:""},
  {name:"Buquê de Borboleta com LED", price:"R$ 80,00", img:"img/produtos/buque-led.jpg", cat:"eventos", desc:"Versão clássica sem LED por apenas R$ 70,00."},
  {name:"Banner de 15 Anos", price:"R$ 150,00", img:"img/produtos/15anos.jpg", cat:"eventos", desc:""},
];

const catLabels = {papelaria:"Papelaria",personalizados:"Personalizados",eventos:"Eventos"};

function waLink(name){
  const msg = `Olá! Tenho interesse no produto ${name} e gostaria de fazer um orçamento.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function renderProducts(){
  const grid = document.getElementById('productsGrid');
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const activeFilter = document.querySelector('.filter.active').dataset.filter;
  const filtered = products.filter(p=>{
    const matchCat = activeFilter==='all'||p.cat===activeFilter;
    const matchSearch = !search||p.name.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });
  grid.innerHTML = filtered.map(p=>`
    <article class="product" data-cat="${p.cat}">
      <div class="product-img">
        <span class="placeholder"><i class="fas fa-image"></i></span>
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'" />
      </div>
      <div class="product-body">
        <span class="product-cat">${catLabels[p.cat]}</span>
        <h3 class="product-name">${p.name}</h3>
        ${p.desc?`<p class="product-desc">${p.desc}</p>`:''}
        <div class="product-price">${p.price}</div>
        <a href="${waLink(p.name)}" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Pedir pelo WhatsApp</a>
      </div>
    </article>
  `).join('');
  document.getElementById('emptyState').hidden = filtered.length>0;
  // Stagger reveal
  requestAnimationFrame(()=>{
    document.querySelectorAll('#productsGrid .product').forEach((el,i)=>{
      setTimeout(()=>el.classList.add('visible'), i*40);
    });
  });
}

function renderGallery(){
  const items = products.slice(0,8);
  document.getElementById('gallery').innerHTML = items.map(p=>`
    <div class="gallery-item"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.opacity=0" /></div>
  `).join('');
}

// Filters + search
document.getElementById('filters').addEventListener('click', e=>{
  if(e.target.classList.contains('filter')){
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    renderProducts();
  }
});
document.getElementById('searchInput').addEventListener('input', renderProducts);

// Header scroll effect
window.addEventListener('scroll', ()=>{
  document.getElementById('header').classList.toggle('scrolled', window.scrollY>30);
});

// Mobile menu
const nav = document.getElementById('nav');
document.getElementById('menuToggle').addEventListener('click', ()=>nav.classList.toggle('open'));
nav.addEventListener('click', e=>{ if(e.target.tagName==='A') nav.classList.remove('open'); });

// Reveal on scroll
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); } });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Init
renderProducts();
renderGallery();
