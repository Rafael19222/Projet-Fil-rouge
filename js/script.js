document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.movie-section');
  const articles = document.querySelectorAll('.movie-card');
  const searchInput = document.querySelector('#search');
  const modal = document.querySelector('#modal');
  const modalBody = document.querySelector('#modal-body');
  const closeButton = document.querySelector('.close');
  const themeButton = document.querySelector('#theme-toggle');

  // Exercice 1 : afficher ou masquer chaque section.
  sections.forEach(function (section) {
    const toggleButton = section.querySelector('.section-toggle');
    const content = section.querySelector('.row');

    toggleButton.addEventListener('click', function () {
      content.classList.toggle('hidden');
      const isVisible = !content.classList.contains('hidden');
      toggleButton.textContent = isVisible ? 'Masquer' : 'Afficher';
      toggleButton.setAttribute('aria-expanded', String(isVisible));
    });
  });

  // Exercice 2 : compter les films présents sur la page.
  const countElement = document.querySelector('#movie-count');
  countElement.textContent = `Catalogue : ${document.querySelectorAll('article').length} films disponibles`;

  // Exercice 3 : marquer un film comme vu et ouvrir sa fiche.
  articles.forEach(function (article) {
    article.addEventListener('click', function (event) {
      if (event.target.closest('button, a')) {
        return;
      }

      article.classList.toggle('watched');
      const title = article.querySelector('h3').textContent;
      openModal(title);
    });
  });

  // Exercice 4 : filtrer les films par titre.
  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    sections.forEach(function (section) {
      const sectionArticles = section.querySelectorAll('article');
      let visibleCount = 0;

      sectionArticles.forEach(function (article) {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const isMatch = title.includes(searchTerm);
        article.closest('.col-12').style.display = isMatch ? '' : 'none';
        visibleCount += isMatch ? 1 : 0;
      });

      section.querySelector('.no-results').classList.toggle('d-none', visibleCount > 0);
    });
  });

  // Exercice 5 : modal simple.
  function openModal(title) {
    modalBody.innerHTML = `<h2 id="modal-title">${title}</h2><p>Vous consultez la fiche de ce film.</p>`;
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  }

  function closeModal() {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // Exercice 6 : changer de thème.
  themeButton.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark-theme');
    themeButton.textContent = isDark ? 'Mode clair' : 'Mode sombre';
  });
});
