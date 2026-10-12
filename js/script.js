const body = document.body;
const globalBtn = document.querySelector(".js-global-btn");
const globalMenu = document.querySelector(".js-gnav");
const dropdownToggles = document.querySelectorAll(".js-nav-toggle");
const dropdownPanels = document.querySelectorAll(".js-gnav-panel");

const resetDropdowns = () => {
    dropdownPanels.forEach((panel) => {
      panel.classList.remove("is-active");
      panel.setAttribute("aria-hidden", "true");
    });
    dropdownToggles.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
};

globalBtn.addEventListener("click", () => {
    const isOpen = body.classList.toggle("is-open");
    globalBtn.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
    globalBtn.setAttribute("aria-expanded", isOpen ? "true" : "false")

    if (isOpen) {
        const firstItem = globalMenu.querySelector(".gnav__item")
        const firstFocusable = firstItem?.querySelector(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
    }　
});

body.addEventListener("click", (e) => {
    const targetNavItem = e.target.closest(".gnav__item");

    if (!targetNavItem) {
        resetDropdowns();
    }
});

dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const panel = toggle.nextElementSibling;
        const isActive = panel.classList.contains("is-active");

       resetDropdowns();

        if(!isActive) {
            panel.classList.add("is-active");
            panel.setAttribute("aria-hidden", "false");
            toggle.setAttribute("aria-expanded", "true");
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("is-open")) {
        body.classList.remove("is-open");
        resetDropdowns();
    }
});

document.addEventListener("keydown", (e) => {
    if (!body.classList.contains("is-open")) return;
    if (e.key !== "Tab") return;

    const trapArea = document.querySelector(".header__inner");
    const focusableEls = trapArea.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus();
    }
    if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
});


























