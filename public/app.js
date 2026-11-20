import "./navigation.js";
const $ = (s) => document.querySelector(s);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const pages = {
  hoje: "Hoje",
  campanhas: "Campanhas",
  agenda: "Agenda",
  cadastros: "Cadastros",
  financeiro: "Financeiro",
};
const phases = ["Em avaliação", "Ativa", "Concluída", "Recusada", "Pausada"];
const stages = [
  "Planejada",
  "Em produção",
  "Em revisão",
  "Ajustes solicitados",
  "Pendente de publicar",
  "Concluída",
];
const networks = ["Instagram", "TikTok", "YouTube"];
const money = (cents) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function date(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function dayLabel(value) {
  if (!value) return "Sem prazo";
  if (value === date()) return "Hoje";
  if (value === date(1)) return "Amanhã";
  return new Date(value + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
const empty = () => ({
  accounts: [],
  platforms: [],
  campaigns: [],
  deliveries: [],
  payments: [],
});
function demo() {
  const data = empty();
  data.accounts = [
    { id: "a1", name: "@atelie.demo", network: "Instagram" },
    { id: "a2", name: "@atelie.demo", network: "TikTok" },
  ];
  data.platforms = [
    {
      id: "p1",
      name: "Squid",
      url: "https://squid.com.br",
      accounts: ["a1", "a2"],
    },
  ];
  data.campaigns = [
    {
      id: "c1",
      name: "Ritual de manhã",
      brand: "Casa Nativa",
      phase: "Ativa",
      account: "a1",
      platform: "p1",
      brief:
        "Mostrar a rotina em luz natural e enviar um primeiro corte para aprovação.",
      fee: 80000,
    },
    {
      id: "c2",
      name: "Um café, duas receitas",
      brand: "Café Aurora",
      phase: "Ativa",
      account: "a2",
      platform: "",
      fee: 45000,
    },
    {
      id: "c3",
      name: "Coleção de verão",
      brand: "Linha Solar",
      phase: "Em avaliação",
      fee: 0,
    },
  ];
  data.deliveries = [
    {
      id: "d1",
      campaign: "c1",
      name: "Enviar primeiro corte do Reel",
      due: date(),
      stage: "Em produção",
    },
    {
      id: "d2",
      campaign: "c2",
      name: "Publicar receita gelada",
      due: date(1),
      stage: "Pendente de publicar",
    },
    {
      id: "d3",
      campaign: "c1",
      name: "Entregar versão vertical para a marca",
      due: date(3),
      stage: "Planejada",
    },
  ];
  data.payments = [{ id: "r1", campaign: "c1", amount: 20000, day: date() }];
  return data;
}
const key = (space) => `pauta-creator-v1:${space}`;
let space =
  localStorage.getItem("pauta-space") === "personal" ? "personal" : "demo";
let data,
  raw,
  edit,
  filters = { account: "", platform: "" };
function load() {
  raw = localStorage.getItem(key(space));
  data = raw ? JSON.parse(raw) : space === "demo" ? demo() : empty();
  if (!raw) {
    raw = JSON.stringify(data);
    localStorage.setItem(key(space), raw);
  }
  $("#space").value = space;
}
const find = (group, id) => data[group].find((x) => x.id === id);
const account = (id) => {
  const a = find("accounts", id);
  return a ? `${a.network} · ${a.name}` : "UGC para a marca";
};
const origin = (id) => find("platforms", id)?.name || "Direto";
const paid = (id) =>
  data.payments
    .filter((x) => x.campaign === id)
    .reduce((a, b) => a + b.amount, 0);
const title = (name, kicker, action = "") =>
  `<div class="head"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(name)}</h1></div>${action}</div>`;
const button = (text, type, id = "") =>
  `<button data-edit="${type}" data-id="${esc(id)}">${esc(text)}</button>`;
const no = (text) => `<p class="empty">${esc(text)}</p>`;
const link = (c) =>
  `<a href="#campanha/${encodeURIComponent(c.id)}">${esc(c.name)}</a>`;
const options = (pairs, selected) =>
  pairs
    .map(
      ([value, label]) =>
        `<option value="${esc(value)}" ${value === selected ? "selected" : ""}>${esc(label)}</option>`,
    )
    .join("");
const matched = () =>
  data.campaigns.filter(
    (c) =>
      (!filters.account || c.account === filters.account) &&
      (!filters.platform || c.platform === filters.platform),
  );
function controls() {
  return `<div class="filters"><label>Conta<select data-filter="account">${options([["", "Todas as contas"], ...data.accounts.map((a) => [a.id, account(a.id)])], filters.account)}</select></label><label>Plataforma<select data-filter="platform">${options([["", "Todas as origens"], ...data.platforms.map((p) => [p.id, p.name])], filters.platform)}</select></label></div>`;
}
function queue(items) {
  return items.length
    ? items
        .map(
          (d) =>
            `<div class="row"><div><span class="pill ${d.due && d.due < date() && d.stage !== "Concluída" ? "late" : ""}">${dayLabel(d.due)}</span> <small>${esc(d.stage)}</small><h3>${esc(d.name)}</h3><p>${link(find("campaigns", d.campaign))} · ${esc(account(find("campaigns", d.campaign).account))}</p></div>${button("Atualizar", "delivery", d.id)}</div>`,
        )
        .join("")
    : no("Nenhuma entrega nesta seleção.");
}
function workspace(page) {
  const campaigns = matched();
  const visible = data.deliveries
    .filter((d) => campaigns.some((c) => c.id === d.campaign))
    .sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
  const open = visible.filter((d) => d.stage !== "Concluída");
  if (page === "hoje") {
    const d = open[0],
      c = d && find("campaigns", d.campaign);
    return (
      title(
        "Pauta do dia",
        new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
        button("+ Campanha", "campaign"),
      ) +
      (d
        ? `<section class="feature"><span class="micro">Próxima entrega · ${dayLabel(d.due)}</span><h2>${esc(d.name)}</h2><div>${link(c)} · ${esc(origin(c.platform))}</div></section>`
        : no(
            "Sua pauta está livre. Cadastre uma campanha e adicione a primeira entrega.",
          )) +
      `<div class="summary"><div class="metric">Campanhas ativas<strong>${campaigns.filter((c) => c.phase === "Ativa").length}</strong></div><div class="metric">Entregas abertas<strong>${open.length}</strong></div><div class="metric">A receber<strong>${money(campaigns.reduce((s, c) => s + c.fee - paid(c.id), 0))}</strong></div></div><div class="section"><h2>Fila de produção</h2><a href="#agenda">Abrir agenda →</a></div>` +
      controls() +
      queue(open)
    );
  }
  if (page === "agenda")
    return (
      title("Agenda de entregas", "Produção") + controls() + queue(visible)
    );
  if (page === "campanhas")
    return (
      title(
        "Campanhas",
        "Trabalhos do estúdio",
        button("+ Campanha", "campaign"),
      ) +
      controls() +
      `<div class="cards">${campaigns.map((c) => `<article class="card"><span class="pill">${esc(c.phase)}</span><h3>${link(c)}</h3><p>${esc(c.brand)} · ${esc(origin(c.platform))}</p><p>${esc(account(c.account))}</p></article>`).join("") || no("Ainda não há campanhas nesta seleção.")}</div>`
    );
  if (page === "cadastros")
    return (
      title("Cadastros", "Diretório do estúdio") +
      `<div class="section"><h2>Contas sociais</h2>${button("+ Conta", "account")}</div>` +
      (data.accounts
        .map(
          (a) =>
            `<div class="row"><strong>${esc(account(a.id))}</strong>${button("Editar", "account", a.id)}</div>`,
        )
        .join("") || no("Cadastre a primeira conta do estúdio.")) +
      `<div class="section"><h2>Plataformas de creators</h2>${button("+ Plataforma", "platform")}</div>` +
      (data.platforms
        .map(
          (p) =>
            `<div class="row"><div><strong>${esc(p.name)}</strong><p>${esc((p.accounts || []).map(account).join(", ") || "Sem contas vinculadas")}</p>${safeLink(p.url, "Abrir plataforma")}</div>${button("Editar", "platform", p.id)}</div>`,
        )
        .join("") || no("Cadastre as plataformas em que você participa."))
    );
  return (
    title("Financeiro", "Cachês e recebimentos") +
    controls() +
    `<div class="summary">${[
      ["Contratado", (c) => c.fee],
      ["Recebido", (c) => paid(c.id)],
      ["A receber", (c) => c.fee - paid(c.id)],
    ]
      .map(
        ([l, fn]) =>
          `<div class="metric">${l}<strong>${money(campaigns.reduce((s, c) => s + fn(c), 0))}</strong></div>`,
      )
      .join("")}</div>` +
    (campaigns
      .map(
        (c) =>
          `<div class="row"><div><h3>${link(c)}</h3><p>${money(paid(c.id))} recebido de ${money(c.fee)}</p></div><strong>${money(c.fee - paid(c.id))}</strong></div>`,
      )
      .join("") || no("Os cachês aparecem aqui após o cadastro das campanhas."))
  );
}
function safeLink(url, label) {
  if (!url) return "";
  try {
    if (!["http:", "https:"].includes(new URL(url).protocol)) return "";
  } catch {
    return "";
  }
  return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
}
function detail(c) {
  if (!c)
    return (
      no("Campanha não encontrada neste espaço.") +
      '<a href="#campanhas">Ver campanhas</a>'
    );
  return (
    `<a class="back" href="#campanhas">← Campanhas</a>` +
    title(
      c.name,
      c.brand || "Campanha",
      button("Editar campanha", "campaign", c.id),
    ) +
    `<section class="detail"><dl>${[
      ["Situação", c.phase],
      ["Conta", account(c.account)],
      ["Origem", origin(c.platform)],
      ["Briefing", c.brief || "—"],
      ["Ideias e notas", c.notes || "—"],
      [
        "Direitos de uso até",
        c.rightsUntil ? dayLabel(c.rightsUntil) : "A confirmar",
      ],
    ]
      .map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`)
      .join(
        "",
      )}</dl>${safeLink(c.contract, "Abrir contrato")}</section><div class="section"><h2>Entregas</h2>${button("+ Entrega", "delivery")}</div>` +
    queue(data.deliveries.filter((d) => d.campaign === c.id)) +
    `<div class="section"><h2>Recebimentos</h2>${c.fee > paid(c.id) ? button("+ Recebimento", "payment") : ""}</div><p>Contratado <strong>${money(c.fee)}</strong> · Em aberto <strong>${money(c.fee - paid(c.id))}</strong></p>` +
    data.payments
      .filter((p) => p.campaign === c.id)
      .map(
        (p) =>
          `<div class="row"><span>${dayLabel(p.day)}</span><strong>${money(p.amount)}</strong></div>`,
      )
      .join("")
  );
}
const route = () => location.hash.slice(1).split("/");
function render() {
  const [page = "hoje", id] = route();
  const active =
    page === "campanha" ? "campanhas" : pages[page] ? page : "hoje";
  for (const link of document.querySelectorAll("#sidebar nav a")) {
    if (link.hash === "#" + active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  $("#main").innerHTML =
    page === "campanha" ? detail(find("campaigns", id)) : workspace(active);
  document.title =
    (page === "campanha"
      ? find("campaigns", id)?.name || "Campanha"
      : pages[active]) + " · Pauta Creator";
}
const groups = {
  account: "accounts",
  platform: "platforms",
  campaign: "campaigns",
  delivery: "deliveries",
  payment: "payments",
};
const names = {
  account: "conta",
  platform: "plataforma",
  campaign: "campanha",
  delivery: "entrega",
  payment: "recebimento",
};
function form(type, id) {
  const x = find(groups[type], id) || {};
  edit = { type, id, space, revision: raw };
  function field(
    name,
    label,
    {
      kind = "text",
      required = false,
      choices,
      value = x[name] ?? "",
      attrs = "",
    } = {},
  ) {
    const props = `name="${name}" ${required ? "required" : ""} ${attrs}`;
    let input = choices
      ? `<select ${props}>${options(choices, String(value))}</select>`
      : kind === "textarea"
        ? `<textarea ${props}>${esc(value)}</textarea>`
        : `<input ${props} type="${kind}" value="${esc(value)}">`;
    return `<label class="field">${label}${input}</label>`;
  }
  const pick = (name, label, values) =>
    field(name, label, { choices: values.map((s) => [s, s]) });
  const name = field("name", "Nome", {
    required: true,
    attrs: 'maxlength="150"',
  });
  let fields = "";
  if (type === "account")
    fields =
      pick("network", "Rede", networks) +
      field("name", "Perfil ou canal", { required: true });
  if (type === "platform")
    fields =
      name +
      field("url", "Endereço do painel", { kind: "url" }) +
      "<fieldset><legend>Contas inscritas</legend>" +
      (data.accounts
        .map(
          (a) =>
            `<label><input type="checkbox" name="accounts" value="${esc(a.id)}" ${(x.accounts || []).includes(a.id) ? "checked" : ""}> ${esc(account(a.id))}</label><br>`,
        )
        .join("") || "Cadastre uma conta para vinculá-la.") +
      "</fieldset>";
  if (type === "campaign")
    fields =
      name +
      field("brand", "Marca") +
      pick("phase", "Situação", phases) +
      field("account", "Conta", {
        choices: [
          ["", "UGC para a marca"],
          ...data.accounts.map((a) => [a.id, account(a.id)]),
        ],
      }) +
      field("platform", "Origem", {
        choices: [
          ["", "Contato direto"],
          ...data.platforms.map((p) => [p.id, p.name]),
        ],
      }) +
      field("fee", "Cachê confirmado (R$)", {
        kind: "number",
        value: (x.fee || 0) / 100,
        required: true,
        attrs: 'min="0" max="999999999" step="0.01"',
      }) +
      field("brief", "Briefing", { kind: "textarea" }) +
      field("notes", "Ideias e observações", { kind: "textarea" }) +
      field("contract", "Link do contrato (acesso gerido na origem)", {
        kind: "url",
      }) +
      field("rightsUntil", "Fim dos direitos de uso", { kind: "date" });
  if (type === "delivery")
    fields =
      name +
      pick("stage", "Situação", stages) +
      field("due", "Prazo", { kind: "date" }) +
      field("url", "Link do vídeo ou arquivo", { kind: "url" }) +
      safeLink(x.url, "Abrir vídeo ou arquivo") +
      field("notes", "Feedback e próximos passos", { kind: "textarea" });
  if (type === "payment")
    fields =
      field("amount", "Valor recebido (R$)", {
        kind: "number",
        required: true,
        attrs: 'min="0.01" max="999999999" step="0.01"',
      }) +
      field("day", "Data do recebimento", {
        kind: "date",
        required: true,
        value: date(),
      });
  $("#dialog-title").textContent =
    (id ? "Editar " : "Adicionar ") + names[type];
  $("#fields").innerHTML = fields;
  $(".error").textContent = "";
  $("#edit-dialog").setAttribute("aria-labelledby", "dialog-title");
  $("#edit-dialog").showModal();
}
function save(event) {
  event.preventDefault();
  try {
    if (
      space !== edit.space ||
      localStorage.getItem(key(space)) !== edit.revision
    )
      throw Error(
        "Este espaço mudou em outra aba. Feche e reabra o formulário para continuar.",
      );
    const fd = new FormData(event.target);
    const values = Object.fromEntries(
      [...fd.entries()].map(([k, v]) => [k, String(v).trim()]),
    );
    if ("name" in values && !values.name) throw Error("Informe um nome.");
    if (
      [values.url, values.contract].some((url) => url && !safeLink(url, "link"))
    )
      throw Error("Use um endereço http ou https.");
    const { type, id } = edit,
      group = groups[type],
      existing = find(group, id);
    if (type === "platform") values.accounts = fd.getAll("accounts");
    if (type === "campaign") {
      values.fee = Math.round(Number(values.fee) * 100);
      if (values.fee < paid(id))
        throw Error("O cachê precisa cobrir os recebimentos registrados.");
    }
    if (type === "delivery" || type === "payment")
      values.campaign = existing?.campaign || route()[1];
    if (type === "payment") {
      values.amount = Math.round(Number(values.amount) * 100);
      if (
        values.amount >
        find("campaigns", values.campaign).fee - paid(values.campaign)
      )
        throw Error("O valor ultrapassa o saldo em aberto.");
    }
    const next = structuredClone(data);
    const item = { ...existing, ...values, id: id || crypto.randomUUID() };
    if (id) next[group][next[group].findIndex((x) => x.id === id)] = item;
    else next[group].push(item);
    const encoded = JSON.stringify(next);
    localStorage.setItem(key(space), encoded);
    data = next;
    raw = encoded;
    $("#edit-dialog").close();
    if (type === "campaign" && !id) location.hash = "campanha/" + item.id;
    render();
    $("#message").textContent = "Salvo neste navegador.";
    setTimeout(() => ($("#message").textContent = ""), 2400);
  } catch (e) {
    $(".error").textContent = e.message;
  }
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-edit]");
  if (b) form(b.dataset.edit, b.dataset.id);
});
document.addEventListener("change", (e) => {
  if (e.target.dataset.filter) {
    filters[e.target.dataset.filter] = e.target.value;
    render();
  }
});
$("#editor").addEventListener("submit", save);
$("#close").onclick = () => $("#edit-dialog").close();
$("#space").onchange = (e) => {
  space = e.target.value;
  localStorage.setItem("pauta-space", space);
  filters = { account: "", platform: "" };
  load();
  location.hash = "hoje";
  render();
};
window.addEventListener("hashchange", () => {
  render();
  $("#main").focus();
  window.scrollTo(0, 0);
});
window.addEventListener("storage", (e) => {
  if (e.key === key(space)) {
    load();
    render();
  }
});
load();
render();
