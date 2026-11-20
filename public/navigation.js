const drawer = document.querySelector("#drawer");
const panel = document.querySelector("#sidebar");
const slot = document.querySelector("#sidebar-slot");
const toggle = document.querySelector("#menu-toggle");
const narrow = matchMedia("(max-width: 760px)");
const preference = "pauta-sidebar-collapsed";

function syncLayout() {
  if (drawer.open) drawer.close();
  const mobile = narrow.matches;
  (mobile ? drawer : slot).append(panel);
  slot.hidden = mobile || localStorage.getItem(preference) === "true";
  toggle.setAttribute("aria-expanded", String(!slot.hidden));
  toggle.setAttribute("aria-controls", mobile ? "drawer" : "sidebar");
}

toggle.addEventListener("click", () => {
  if (narrow.matches) {
    drawer.showModal();
    drawer.querySelector('[aria-current="page"]')?.focus();
    toggle.setAttribute("aria-expanded", "true");
  } else {
    slot.hidden = !slot.hidden;
    localStorage.setItem(preference, String(slot.hidden));
    toggle.setAttribute("aria-expanded", String(!slot.hidden));
  }
});

function dismiss() {
  if (drawer.open) drawer.close();
}

document.querySelector("#drawer-close").addEventListener("click", dismiss);
drawer.addEventListener("click", (event) => {
  if (event.target === drawer) dismiss();
  if (event.target.closest("a[href]")) {
    dismiss();
    document.querySelector("#main").focus();
  }
});
drawer.addEventListener("close", () => {
  toggle.setAttribute("aria-expanded", String(drawer.open || !slot.hidden));
});
window.addEventListener("hashchange", dismiss);
narrow.addEventListener("change", syncLayout);
syncLayout();
