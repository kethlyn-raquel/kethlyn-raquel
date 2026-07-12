const BUSINESS_CONFIG = {
  whatsapp: "5555996554308",
  email: "rafaeldornellesgoncalves@gmail.com",
  instagram: "rfcheff_",
  tiktok: "dornellescruel",
};

document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const tabs = document.querySelector("[data-tabs]");
const robotToggle = document.querySelector("[data-robot-toggle]");
const robotPanel = document.querySelector("[data-robot-panel]");
const robotClose = document.querySelector("[data-robot-close]");
const robotMessages = document.querySelector("[data-robot-messages]");
const robotForm = document.querySelector("[data-robot-form]");
const contactForm = document.querySelector("[data-contact-form]");
const emailLink = document.querySelector("[data-email-link]");
const floatingWhatsApp = document.querySelector("[data-floating-whatsapp]");
const configWarning = document.querySelector("[data-config-warning]");

const botState = {
  step: 0,
  answers: {},
};

const botSteps = [
  { key: "product", question: "Qual quantidade você precisa?" },
  { key: "quantity", question: "Para qual data você precisa do pedido?" },
  { key: "date", question: "Você já possui uma arte pronta?" },
  { key: "hasArt", question: "Qual é sua cidade ou CEP?" },
  { key: "city", question: "Deseja continuar pelo WhatsApp? Responda sim para abrir a mensagem." },
  { key: "confirm", question: "" },
];

const quickReplies = {
  orcamento:
    "Para solicitar orçamento, informe produto, quantidade, prazo, cidade/CEP e se já possui arte. Posso montar essa mensagem com você agora.",
  prazo:
    "O prazo é informado após a análise do pedido. A produção só começa depois da aprovação da prova digital e da confirmação do orçamento.",
  arte:
    "Você pode enviar sua própria arte ou referências. Quando a criação for necessária, as condições são confirmadas no orçamento.",
  frete:
    "O envio depende da cidade e do tipo de produto. Também pode existir retirada a combinar, conforme disponibilidade da empresa.",
  pagamento:
    "As formas e condições de pagamento são confirmadas no orçamento, conforme produto, quantidade e prazo.",
};

function isConfigured(value) {
  return Boolean(value && !value.startsWith("INSIRA_"));
}

function encodeMessage(text) {
  return encodeURIComponent(text);
}

function getWhatsAppUrl(message) {
  if (!isConfigured(BUSINESS_CONFIG.whatsapp)) return "#contato";
  return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeMessage(message)}`;
}

function buildInitialMessage(context = "") {
  return [
    "Olá, Studio Prisma! Gostaria de solicitar um orçamento.",
    context ? `Interesse: ${context}` : "Interesse: produtos personalizados",
    "",
    "Podem me orientar sobre valores, prazo e próximos passos?",
  ].join("\n");
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function closeMenu() {
  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function configureContactLinks() {
  const socialLinks = document.querySelectorAll("[data-social-link]");
  const hasWhatsApp = isConfigured(BUSINESS_CONFIG.whatsapp);
  const hasEmail = isConfigured(BUSINESS_CONFIG.email);
  const hasInstagram = isConfigured(BUSINESS_CONFIG.instagram);
  const hasTiktok = isConfigured(BUSINESS_CONFIG.tiktok);
  const allConfigured = hasWhatsApp && hasEmail && hasInstagram && hasTiktok;

  socialLinks.forEach((link) => {
    const type = link.dataset.socialLink;
    let href = "#contato";
    let label = `${link.textContent.replace(" pendente", "")} pendente`;
    let configured = false;

    if (type === "whatsapp" && hasWhatsApp) {
      href = getWhatsAppUrl(buildInitialMessage());
      label = "WhatsApp";
      configured = true;
    }

    if (type === "email" && hasEmail) {
      href = `mailto:${BUSINESS_CONFIG.email}`;
      label = "E-mail";
      configured = true;
    }

    if (type === "instagram" && hasInstagram) {
      href = `https://www.instagram.com/${BUSINESS_CONFIG.instagram.replace("@", "")}`;
      label = "Instagram";
      configured = true;
    }

    if (type === "tiktok" && hasTiktok) {
      href = `https://www.tiktok.com/@${BUSINESS_CONFIG.tiktok.replace("@", "")}`;
      label = "TikTok";
      configured = true;
    }

    link.href = href;
    link.textContent = label;
    link.toggleAttribute("aria-disabled", !configured);
    link.classList.toggle("is-pending", !configured);
    link.target = configured && type !== "email" ? "_blank" : "";
    link.rel = configured && type !== "email" ? "noreferrer" : "";
  });

  if (floatingWhatsApp) {
    floatingWhatsApp.href = getWhatsAppUrl(buildInitialMessage());
    floatingWhatsApp.classList.toggle("is-pending", !hasWhatsApp);
    floatingWhatsApp.textContent = hasWhatsApp ? "WhatsApp" : "Configurar WhatsApp";
  }

  if (configWarning) {
    configWarning.hidden = allConfigured;
  }
}

function syncEmailLink() {
  if (!emailLink) return;

  if (!isConfigured(BUSINESS_CONFIG.email)) {
    emailLink.href = "#contato";
    emailLink.setAttribute("aria-disabled", "true");
    emailLink.classList.add("is-disabled");
    return;
  }

  const subject = encodeURIComponent("Pedido de orçamento - Studio Prisma");
  const body = encodeMessage(buildContactMessage(contactForm));
  emailLink.href = `mailto:${BUSINESS_CONFIG.email}?subject=${subject}&body=${body}`;
  emailLink.removeAttribute("aria-disabled");
  emailLink.classList.remove("is-disabled");
}

function buildContactMessage(form) {
  const data = new FormData(form);

  return [
    "Olá, Studio Prisma! Gostaria de solicitar um orçamento.",
    "",
    `Nome: ${data.get("name") || ""}`,
    `WhatsApp/telefone: ${data.get("phone") || ""}`,
    `E-mail: ${data.get("email") || ""}`,
    `Produto: ${data.get("product") || ""}`,
    `Quantidade: ${data.get("quantity") || ""}`,
    `Data: ${data.get("date") || ""}`,
    `Cidade/CEP: ${data.get("city") || ""}`,
    `Já possui arte: ${data.get("hasArt") || ""}`,
    `Contato preferido: ${data.get("contactPreference") || ""}`,
    `Detalhes: ${data.get("details") || ""}`,
    `Referências: ${data.get("references") || ""}`,
  ].join("\n");
}

function selectProduct(value, details = "") {
  const product = contactForm.elements.product;
  const detailsField = contactForm.elements.details;

  if ([...product.options].some((option) => option.value === value || option.textContent === value)) {
    product.value = value;
  } else {
    product.value = "Outro produto";
  }

  if (details) {
    detailsField.value = details;
  } else if (!detailsField.value.trim()) {
    detailsField.value = `Tenho interesse em ${value}.`;
  }

  syncEmailLink();
  document.querySelector("#contato").scrollIntoView({ behavior: "smooth", block: "start" });
  product.focus({ preventScroll: true });
}

function addRobotMessage(text, author = "bot") {
  const message = document.createElement("p");
  message.className = author === "user" ? "user-message" : "bot-message";
  message.textContent = text;
  robotMessages.append(message);
  robotMessages.scrollTop = robotMessages.scrollHeight;
}

function buildBotMessage() {
  return [
    "Olá, Studio Prisma! Gostaria de solicitar um orçamento.",
    "",
    `Produto: ${botState.answers.product || ""}`,
    `Quantidade: ${botState.answers.quantity || ""}`,
    `Data: ${botState.answers.date || ""}`,
    `Já possui arte: ${botState.answers.hasArt || ""}`,
    `Cidade/CEP: ${botState.answers.city || ""}`,
  ].join("\n");
}

function resetBot() {
  botState.step = 0;
  botState.answers = {};
}

function handleBotAnswer(answer) {
  const trimmed = answer.trim();
  if (!trimmed) return;

  addRobotMessage(trimmed, "user");
  const current = botSteps[botState.step];
  botState.answers[current.key] = trimmed;

  if (current.key === "confirm") {
    if (trimmed.toLowerCase().startsWith("s")) {
      window.open(getWhatsAppUrl(buildBotMessage()), "_blank", "noopener,noreferrer");
      addRobotMessage("Perfeito. Se o WhatsApp estiver configurado, a mensagem será aberta para envio.");
    } else {
      addRobotMessage("Sem problema. Quando quiser, posso montar uma nova mensagem.");
    }
    resetBot();
    addRobotMessage("Qual produto você deseja?");
    return;
  }

  addRobotMessage(current.question);

  botState.step += 1;

  if (botSteps[botState.step].key === "confirm") {
    addRobotMessage(buildBotMessage());
  }
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
configureContactLinks();
syncEmailLink();

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMenu();
});

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;

  const tabName = button.dataset.tab;
  const buttons = tabs.querySelectorAll("[data-tab]");
  const panels = tabs.querySelectorAll("[data-panel]");

  buttons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tabName);
  });
});

tabs.addEventListener("keydown", (event) => {
  const current = event.target.closest("[data-tab]");
  if (!current || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

  const buttons = [...tabs.querySelectorAll("[data-tab]")];
  const index = buttons.indexOf(current);
  let nextIndex = index;

  if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
  if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = buttons.length - 1;

  event.preventDefault();
  buttons[nextIndex].focus();
  buttons[nextIndex].click();
});

document.querySelectorAll("[data-product-request]").forEach((button) => {
  button.addEventListener("click", () => {
    selectProduct(button.dataset.productRequest);
  });
});

document.querySelectorAll("[data-project-request]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = button.dataset.projectRequest;
    selectProduct("Outro produto", `Gostaria de algo parecido com o projeto: ${project}.`);
  });
});

document.querySelectorAll("[data-whatsapp-intent]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!isConfigured(BUSINESS_CONFIG.whatsapp)) return;
    event.preventDefault();
    window.open(getWhatsAppUrl(buildInitialMessage()), "_blank", "noopener,noreferrer");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

function openRobot() {
  robotPanel.hidden = false;
  robotToggle.setAttribute("aria-expanded", "true");
  robotForm.elements.question.focus();
}

function closeRobot() {
  robotPanel.hidden = true;
  robotToggle.setAttribute("aria-expanded", "false");
  robotToggle.focus();
}

robotToggle.addEventListener("click", () => {
  if (robotPanel.hidden) {
    openRobot();
  } else {
    closeRobot();
  }
});

robotClose.addEventListener("click", closeRobot);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !robotPanel.hidden) closeRobot();
});

document.querySelectorAll("[data-reply]").forEach((button) => {
  button.addEventListener("click", () => {
    const replyKey = button.dataset.reply;
    addRobotMessage(button.textContent, "user");
    addRobotMessage(quickReplies[replyKey]);
  });
});

robotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = robotForm.elements.question;
  handleBotAnswer(input.value);
  input.value = "";
});

contactForm.addEventListener("input", syncEmailLink);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const message = buildContactMessage(contactForm);

  if (!isConfigured(BUSINESS_CONFIG.whatsapp)) {
    alert("Configure o número do WhatsApp em BUSINESS_CONFIG no arquivo scripts.js antes de publicar.");
    return;
  }

  window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
});
