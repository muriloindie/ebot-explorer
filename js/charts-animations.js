// Counter animations
document.addEventListener('DOMContentLoaded', () => {
  const animateValue = (obj, start, end, duration, prefix='', suffix='') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      obj.innerHTML = prefix + Math.floor(easeProgress * (end - start) + start) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        const counters = target.classList.contains('counter-value') ? [target] : target.querySelectorAll('.counter-value');
        counters.forEach(counter => {
          if (!counter.dataset.animated) {
            const end = parseInt(counter.dataset.end || 0);
            const prefix = counter.dataset.prefix || '';
            const suffix = counter.dataset.suffix || '';
            animateValue(counter, 0, end, 2000, prefix, suffix);
            counter.dataset.animated = 'true';
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.chart-container, .counter-value').forEach(el => observer.observe(el));
});
