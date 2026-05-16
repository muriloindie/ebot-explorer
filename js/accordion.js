// Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      // Close other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('active');
      const content = item.querySelector('.accordion-content');
      
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
});
