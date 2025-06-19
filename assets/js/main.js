import './firebase.js';

"use strict";

// Page loading
var pageLoading = document.querySelector(".page-loading");

if (pageLoading) {
  window.addEventListener("load", () => {
    pageLoading.classList.add("hide");

    setTimeout(() => {
      pageLoading.style.display = "none";
    }, 1000);
  });
}

// Navbar
const navbar = document.querySelector(".ic-navbar");
if (navbar) {
  const navbarToggler = navbar.querySelector("[data-web-toggle=navbar-collapse]");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      const dataTarget = this.dataset.webTarget,
        targetElement = document.getElementById(dataTarget),
        isExpanded = this.ariaExpanded === "true";

      if (!targetElement) {
        return;
      }

      navbar.classList.toggle("menu-show");
      this.ariaExpanded = !isExpanded;
      navbarToggler.innerHTML = navbar.classList.contains("menu-show")
        ? '<i class="lni lni-close"></i>'
        : '<i class="lni lni-menu"></i>';
    });
  }

  // Sticky navbar
  window.addEventListener("scroll", function () {
    if (this.scrollY >= 72) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
}

// Web theme
const webTheme = document.querySelector("[data-web-trigger=web-theme]");
const html = document.querySelector("html");

if (webTheme && html) {
  window.addEventListener("load", function () {
    var theme = localStorage.getItem("Inazuma_WebTheme");

    if (theme == "light") {
      webTheme.innerHTML = '<i class="lni lni-sun"></i>';
    } else if (theme == "dark") {
      webTheme.innerHTML = '<i class="lni lni-night"></i>';
    } else {
      theme = "light";
      localStorage.setItem("Inazuma_WebTheme", theme);
      webTheme.innerHTML = '<i class="lni lni-night"></i>';
    }

    html.dataset.webTheme = theme;
  });

  webTheme.addEventListener("click", function () {
    var theme = localStorage.getItem("Inazuma_WebTheme");

    webTheme.innerHTML =
      theme == "dark"
        ? '<i class="lni lni-sun"></i>'
        : '<i class="lni lni-night"></i>';
    theme = theme == "dark" ? "light" : "dark";
    localStorage.setItem("Inazuma_WebTheme", theme);
    html.dataset.webTheme = theme;
  });
}

// Scrollspy
function scrollspy(event) {
  var links = document.querySelectorAll(".ic-page-scroll"),
    scrollpos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

  // Quitar 'active' de todos los links antes de asignar al actual
  links.forEach(link => link.classList.remove("active"));

  for (let i = 0; i < links.length; i++) {
    var currentLink = links[i],
      dataTarget = currentLink.getAttribute("href"),
      targetElement = document.querySelector(dataTarget),
      topminus = scrollpos + 74;

    if (targetElement) {
      if (
        targetElement.offsetTop <= topminus &&
        targetElement.offsetTop + targetElement.offsetHeight > topminus
      ) {
        currentLink.classList.add("active");
      }
    }
  }
}

window.document.addEventListener("scroll", scrollspy);

// Menu scroll
const pageLink = document.querySelectorAll(".ic-page-scroll");

pageLink.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(link.getAttribute("href"));

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 74,
      });
    }

    navbar.classList.remove("menu-show");
    navbarToggler.innerHTML = navbar.classList.contains("menu-show")
      ? '<i class="lni lni-close"></i>'
      : '<i class="lni lni-menu"></i>';
  });
});

// Tabs
const tabs = document.querySelectorAll(".tabs");

tabs.forEach((tab) => {
  const links = tab.querySelectorAll(".tabs-nav .tabs-link"),
    contents = tab.querySelectorAll(".tabs-content");

  if (!contents) {
    return;
  }

  window.addEventListener("load", function () {
    for (let i = 0; i < contents.length; i++) {
      contents[i].classList.add("hide");
    }

    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
      links[i].ariaSelected = false;
    }

    links[0].classList.add("active");
    links[0].ariaSelected = true;

    const dataTarget = links[0].dataset.webTarget,
      targetElement = this.document.getElementById(dataTarget);

    targetElement.classList.remove("hide");
  });

  links.forEach((link) => {
    const dataTarget = link.dataset.webTarget,
      targetElement = document.getElementById(dataTarget);

    if (targetElement) {
      link.addEventListener("click", function () {
        for (let i = 0; i < contents.length; i++) {
          contents[i].classList.add("hide");
        }

        for (let i = 0; i < links.length; i++) {
          links[i].classList.remove("active");
          links[i].ariaSelected = false;
        }

        link.classList.add("active");
        link.ariaSelected = true;
        targetElement.classList.remove("hide");
      });
    } else {
      link.disabled = true;
    }
  });
});

// Portfolio filter
const portfolioFilters = document.querySelectorAll(".portfolio-menu button");

portfolioFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    let btn = portfolioFilters[0];

    while (btn) {
      if (btn.tagName === "BUTTON") {
        btn.classList.remove("active");
      }

      btn = btn.nextSibling;
    }

    this.classList.add("active");

    let selected = filter.getAttribute("data-filter"),
      itemsToHide = document.querySelectorAll(
        '.portfolio-grid .portfolio :not([data-filter="' + selected + '"])'
      ),
      itemsToShow = document.querySelectorAll(
        '.portfolio-grid .portfolio [data-filter="' + selected + '"]'
      );

    if (selected == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(
        ".portfolio-grid .portfolio [data-filter]"
      );
    }

    itemsToHide.forEach((el) => {
      el.parentElement.classList.add("hide");
      el.parentElement.classList.remove("show");
    });

    itemsToShow.forEach((el) => {
      el.parentElement.classList.remove("hide");
      el.parentElement.classList.add("show");
    });
  });
});

// Scroll to top
var st = document.querySelector("[data-web-trigger=scroll-top]");

if (st) {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      st.classList.remove("is-hided");
    } else {
      st.classList.add("is-hided");
    }
  };

  st.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

import { db } from './firebase.js';
import { onValue, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const formContact = document.getElementById('form_contact');
if (formContact) {
  formContact.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact_name').value.trim();
    const email = document.getElementById('contact_email').value.trim();
    const school = document.getElementById('contact_school').value;
    const message = document.getElementById('contact_message').value.trim();

    try {
      await push(ref(db, 'contactos'), {
        nombre: name,
        correo: email,
        escuela: school,
        mensaje: message,
        fecha: new Date().toISOString()
      });
      document.getElementById('contact_result').textContent = "¡Gracias por contactarnos! Pronto te enviaremos información.";
      formContact.reset();
    } catch (error) {
      document.getElementById('contact_result').textContent = "Error al enviar: " + error.message;
    }
  });
}

//inscripciones
const schoolCountsList = document.getElementById('school_counts');
if (schoolCountsList) {
  const contactosRef = ref(db, 'contactos');
  onValue(contactosRef, (snapshot) => {
    const data = snapshot.val();
    const counts = {};

    if (data) {
      // Contar inscritos por escuela
      for (let key in data) {
        const escuela = data[key].escuela || "Sin escuela";
        counts[escuela] = (counts[escuela] || 0) + 1;
      }
    }

    // Mostrar resultados
    schoolCountsList.innerHTML = '';
    Object.entries(counts).forEach(([escuela, cantidad]) => {
      const nombreEscuela = nombresEscuelas[escuela] || escuela;
      const li = document.createElement('li');
      li.textContent = `${nombreEscuela}: ${cantidad} inscrito(s)`;
      schoolCountsList.appendChild(li);
    });

    // Si no hay datos
    if (Object.keys(counts).length === 0) {
      schoolCountsList.innerHTML = '<li>No hay inscritos aún.</li>';
    }
  });
}

const nombresEscuelas = {
  escuela1: "Ciencias Naturales",
  escuela2: "Idiomas",
  escuela3: "Ciencias Financieras",
  escuela4: "Tecnologías"
};