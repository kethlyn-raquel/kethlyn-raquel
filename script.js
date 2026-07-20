"use strict";

const WHATSAPP_NUMBER = "5555999712007";

const products = [
  {
    name: "Banner Personalizado",
    price: "A partir de R$ 80,00",
    image: "img/produtos/banner.jpg",
    category: "papelaria",
    description: "Comunicação visual personalizada para festas, marcas e ocasiões especiais."
  },
  {
    name: "Foto Polaroid",
    price: "R$ 2,50",
    image: "img/produtos/polaroid.jpg",
    category: "papelaria",
    description: "Memórias impressas com estilo delicado para presentear ou decorar."
  },
  {
    name: "Fotos Plastificadas",
    price: "A partir de R$ 3,00",
    image: "img/produtos/foto-plastificada.jpg",
    category: "papelaria",
    description: "Fotos protegidas com acabamento plastificado para maior durabilidade."
  },
  {
    name: "Azulejo Personalizado",
    price: "R$ 30,00",
    image: "img/produtos/azulejo.jpg",
    category: "papelaria",
    description: "Uma lembrança afetiva e elegante para decorar ambientes especiais."
  },
  {
    name: "Cartão de Visita",
    price: "1.000 unidades por R$ 150,00",
    image: "img/produtos/cartao-visita.jpg",
    category: "papelaria",
    description: "Apresente sua marca com identidade visual e acabamento profissional."
  },
  {
    name: "Wind Banner",
    price: "R$ 290,00",
    image: "img/produtos/wind-banner.jpg",
    category: "papelaria",
    description: "Destaque sua marca em fachadas, feiras, eventos e pontos de venda."
  },
  {
    name: "Mini Calendário",
    price: "R$ 3,50",
    image: "img/produtos/mini-calendario.jpg",
    category: "papelaria",
    description: "Uma opção útil e personalizada para brindes, lembranças e divulgação."
  },
  {
    name: "Etiqueta Escolar",
    price: "R$ 29,90",
    image: "img/produtos/etiqueta-escolar.jpg",
    category: "papelaria",
    description: "Identificação bonita e prática para materiais da rotina escolar."
  },
  {
  name: "Caneca Personalizada",
  price: "R$ 39,90",
  image: "img/produtos/caneca-personalizada.jpg",
  category: "personalizados",
  description: "Também disponível em promoção: duas unidades por R$ 65,00."
},
  {
  name: "Quadro de Vidro",
  price: "R$ 25,00",
  image: "img/produtos/quadro-vidro.jpg",
  category: "personalizados",
  description: ""
},
  {
  name: "Copo Personalizado",
  price: "R$ 6,50 a unidade",
  image: "img/produtos/copo-personalizado.jpeg",
  category: "personalizados",
  description: "Copos personalizados para festas, eventos e lembranças especiais."
},
  {
    name: "Álbum de Fotos + 18 Fotos",
    price: "R$ 89,00",
    image: "img/produtos/album-fotos.jpg",
    category: "personalizados",
    description: "Um presente completo para reunir histórias e momentos inesquecíveis."
  },
  {
    name: "Kit Chaveiro",
    price: "R$ 9,90",
    image: "img/produtos/kit-chaveiro.jpg",
    category: "personalizados",
    description: "Pequenos detalhes personalizados para presentear com carinho."
  },
  {
    name: "Caixinhas Personalizadas",
    price: "R$ 6,00",
    image: "img/produtos/caixinhas-personalizadas.jpg",
    category: "personalizados",
    description: "Mimos delicados para aniversários, festas, eventos e datas especiais."
  },
  {
    name: "Caixa Personalizada Grande",
    price: "R$ 25,00",
    image: "img/produtos/caixa-personalizada-grande.jpg",
    category: "personalizados",
    description: "Uma apresentação especial para presentes e kits personalizados."
  },
  {
    name: "Chaveiro Individual",
    price: "R$ 4,00",
    image: "img/produtos/chaveiro-individual.jpg",
    category: "personalizados",
    description: "Uma lembrança acessível e personalizada para acompanhar o dia a dia."
  },
  {
    name: "Topo de Bolo",
    price: "R$ 20,00",
    image: "img/produtos/topo-bolo.jpg",
    category: "personalizados",
    description: "O toque final que deixa a decoração do bolo ainda mais especial."
  },
  {
    name: "Lembrancinhas Dia das Mães",
    price: "R$ 2,50",
    image: "img/produtos/lembrancinhas-maes.jpg",
    category: "eventos",
    description: "Carinho em forma de presente para homenagens e ações especiais."
  },
  {
    name: "Centro de Mesa Plastificado",
    price: "R$ 7,00",
    image: "img/produtos/centro-mesa.jpg",
    category: "eventos",
    description: "Decoração personalizada, resistente e pronta para encantar os convidados."
  },
  {
    name: "Buquê de Borboleta com LED",
    price: "R$ 80,00",
    image: "img/produtos/buque-borboleta-led.jpg",
    category: "eventos",
    description: "Versão clássica sem LED disponível por R$ 70,00."
  },
  {
    name: "Banner de 15 Anos",
    price: "R$ 150,00",
    image: "img/produtos/banner-15-anos.jpg",
    category: "eventos",
    description: "Uma peça personalizada para tornar a celebração ainda mais marcante."
  }
];

const categoryLabels = {
  papelaria: "Papelaria",
  personalizados: "Personalizados",
  eventos: "Eventos"
};

const galleryProducts = [
  products[8],
  products[12],
  products[18],
  products[19]
];

const productsGrid = document.querySelector("#productsGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filters = document.querySelector("#filters");
const productInterest = document.querySelector("#productInterest");
const contactForm = document.querySelector("#contactForm");
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");
const siteHeader = document.querySelector("#siteHeader");
const galleryGrid = document.querySelector("#galleryGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxPrev = document.querySelector("#lightboxPrev");
const lightboxNext = document.querySelector("#lightboxNext");

let activeFilter = "todos";
let currentGalleryIndex = 0;

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function createWhatsAppLink(productName = "") {
  const message = productName
    ? `Olá! Tenho interesse no produto ${productName}. Gostaria de saber mais e fazer um orçamento.`
    : "Olá! Gostaria de fazer um orçamento com a Ketty Designer.";

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function whatsappIcon() {
  return `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"></path>
      <path d="M8.2 7.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.8c.1.3 0 .5-.1.7l-.6.7c-.2.2-.2.4 0 .7.7 1.2 1.7 2.2 2.9 2.8.3.2.5.1.7-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8c.3.1.5.3.5.5 0 .4-.2 1.4-.7 1.9-.5.5-1.3.8-2.1.8-1 0-3.3-.5-5.5-2.5-1.7-1.5-2.8-3.5-3.1-4.6-.3-1.1 0-1.8.4-2.2Z"></path>
    </svg>`;
}

function productCardTemplate(product) {
  return `
    <article class="product-card">
      <div class="product-card__media">
        <img src="${product.image}" alt="${product.name} da Ketty Designer" width="1200" height="900" loading="lazy" decoding="async">
        <span class="product-card__badge">${categoryLabels[product.category]}</span>
      </div>
      <div class="product-card__body">
        <h3>${product.name}</h3>
        <p class="product-card__description">${product.description}</p>
        <p class="product-card__price"><small>Valor</small>${product.price}</p>
        <a class="button button--whatsapp product-card__button" href="${createWhatsAppLink(product.name)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${product.name} pelo WhatsApp">
          ${whatsappIcon()} Pedir pelo WhatsApp
        </a>
      </div>
    </article>`;
}

function getFilteredProducts() {
  const query = normalizeText(searchInput.value);

  return products.filter((product) => {
    const categoryMatches = activeFilter === "todos" || product.category === activeFilter;
    const searchableText = normalizeText(`${product.name} ${product.description} ${categoryLabels[product.category]}`);
    const searchMatches = query === "" || searchableText.includes(query);
    return categoryMatches && searchMatches;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  productsGrid.innerHTML = filteredProducts.map(productCardTemplate).join("");
  emptyState.hidden = filteredProducts.length > 0;

  const cards = productsGrid.querySelectorAll(".product-card");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  cards.forEach((card, index) => {
    if (reduceMotion) {
      card.classList.add("is-visible");
      return;
    }

    window.setTimeout(() => {
      card.classList.add("is-visible");
    }, Math.min(index * 45, 500));
  });
}

function setActiveFilter(button) {
  const filterButtons = filters.querySelectorAll(".filter");
  filterButtons.forEach((item) => {
    const isSelected = item === button;
    item.classList.toggle("is-active", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });
  activeFilter = button.dataset.filter;
  renderProducts();
}

function populateProductSelect() {
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    fragment.appendChild(option);
  });

  productInterest.appendChild(fragment);
}

function renderGallery() {
  galleryGrid.innerHTML = galleryProducts
    .map((product, index) => `
      <button class="gallery-item reveal" type="button" data-index="${index}" data-title="${product.name}" aria-label="Ampliar ${product.name}">
        <img src="${product.image}" alt="${product.name}" width="1200" height="900" loading="lazy" decoding="async">
      </button>`)
    .join("");
}

function updateLightbox(index) {
  currentGalleryIndex = (index + galleryProducts.length) % galleryProducts.length;
  const product = galleryProducts[currentGalleryIndex];
  lightboxImage.src = product.image;
  lightboxImage.alt = product.name;
  lightboxCaption.textContent = product.name;
}

function openLightbox(index) {
  updateLightbox(index);
  document.body.classList.add("lightbox-open");

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    lightbox.setAttribute("open", "");
  }
}

function closeLightbox() {
  document.body.classList.remove("lightbox-open");

  if (typeof lightbox.close === "function") {
    lightbox.close();
  } else {
    lightbox.removeAttribute("open");
  }
}

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mainNav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -45px"
  });

  revealElements.forEach((element) => observer.observe(element));
}

function initSectionNavigation() {
  const navigationLinks = [...mainNav.querySelectorAll('a[href^="#"]')];
  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navigationLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${visibleEntry.target.id}`);
    });
  }, {
    rootMargin: "-35% 0px -55%",
    threshold: [0, 0.2, 0.6]
  });

  sections.forEach((section) => observer.observe(section));
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest(".filter");
  if (!button) return;
  setActiveFilter(button);
});

searchInput.addEventListener("input", renderProducts);

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("click", (event) => {
  const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (!menuIsOpen) return;
  if (mainNav.contains(event.target) || menuButton.contains(event.target)) return;
  setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
}, { passive: true });

galleryGrid.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery-item");
  if (!item) return;
  openLightbox(Number(item.dataset.index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => updateLightbox(currentGalleryIndex - 1));
lightboxNext.addEventListener("click", () => updateLightbox(currentGalleryIndex + 1));

lightbox.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const clickedBackdrop =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedBackdrop) closeLightbox();
});

lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    if (lightbox.hasAttribute("open")) closeLightbox();
  }

  if (!lightbox.hasAttribute("open")) return;
  if (event.key === "ArrowLeft") updateLightbox(currentGalleryIndex - 1);
  if (event.key === "ArrowRight") updateLightbox(currentGalleryIndex + 1);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const product = String(formData.get("product") || "um orçamento personalizado").trim();
  const message = String(formData.get("message") || "").trim();

  const textParts = [
    `Olá! Meu nome é ${name}.`,
    `Tenho interesse em ${product}.`
  ];

  if (message) textParts.push(`Minha ideia: ${message}`);
  textParts.push("Gostaria de receber mais informações e um orçamento.");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textParts.join(" "))}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

renderProducts();
renderGallery();
populateProductSelect();
initRevealAnimations();
initSectionNavigation();

document.querySelector("#currentYear").textContent = String(new Date().getFullYear());
siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
