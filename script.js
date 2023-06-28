const s = (selector) => document.querySelector(selector);
const sa = (selector) => Array.from(document.querySelectorAll(selector));

const searchInput = s('#searchInput');
const themeSelect = s('#themeSelect');
const classes = sa('.classes a');
const navLinks = sa('nav a');
const sections = sa('section');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute('data-section');

    sections.forEach((section) => {
      const sectionClasses = section.getAttribute('class').split(' ');
      section.classList.toggle('hidden', !sectionClasses.includes(sectionId));
    });

    navLinks.forEach((navLink) => {
      navLink.classList.toggle('selected', navLink === link);
    });
  });
});

searchInput.addEventListener('input', filterClasses);
themeSelect.addEventListener('change', filterClasses);

function filterClasses() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTheme = themeSelect.value.toLowerCase();

  classes.forEach((classLink) => {
    const className = classLink.textContent.toLowerCase();
    const classThemes = classLink.dataset.themes.toLowerCase();

    const matchSearch = className.includes(searchTerm);
    const matchTheme =
      selectedTheme === '' || classThemes.includes(selectedTheme);

    classLink.style.display = matchSearch && matchTheme ? 'block' : 'none';
  });
}
