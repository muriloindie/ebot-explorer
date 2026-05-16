// Orbital animation for integration icons
document.addEventListener('DOMContentLoaded', () => {
  const orbitContainer = document.querySelector('.orbit-container');
  if (!orbitContainer) return;

  const icons = document.querySelectorAll('.orbit-icon');
  const totalIcons = icons.length;
  const radius = 250;

  icons.forEach((icon, index) => {
    const angle = (index / totalIcons) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Set initial position
    icon.style.left = `calc(50% + ${x}px - 24px)`;
    icon.style.top = `calc(50% + ${y}px - 24px)`;

    // Simple continuous rotation
    icon.animate([
      { transform: `rotate(0deg) translate(${x}px, ${y}px) rotate(0deg)` },
      { transform: `rotate(360deg) translate(${x}px, ${y}px) rotate(-360deg)` }
    ], {
      duration: 40000,
      iterations: Infinity,
      direction: 'normal',
      easing: 'linear'
    });
    
    // Remove original positioning to let animation handle it
    icon.style.left = 'calc(50% - 24px)';
    icon.style.top = 'calc(50% - 24px)';
  });
});
