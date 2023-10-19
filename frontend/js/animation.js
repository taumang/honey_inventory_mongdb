function toggleLoading(loaderId, isLoading) {
    const loader = document.getElementById(loaderId);
    loader.style.display = isLoading ? 'block' : 'none';
  }

  toggleLoading('loader-1', true);
  toggleLoading('loader-2', true);

 
  setTimeout(() => {
    toggleLoading('loader-1', false);
    toggleLoading('loader-2', false);
  }, 3000);

  const overlay = document.getElementById('overlay');
  const toggleButton = document.getElementById('create-button');

  toggleButton.addEventListener('click', () => {
    overlay.classList.toggle('show');
  });

  function hideOverlay() {
    overlay.classList.remove('show');
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }});