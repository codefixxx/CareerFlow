export const scrollToSection = (e, id) => {
  e.preventDefault();

  if (id === 'top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    // Calculate offset for fixed navbar
    const navbarHeight = 64; // h-16 = 4rem = 64px
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};