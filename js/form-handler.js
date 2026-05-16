// Form submission handling to WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.whatsapp-form');
  const WA_NUMBER = '5546991130554'; // Number from PDF
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gather data
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const company = formData.get('company') || '';
      const subject = formData.get('subject') || 'Contato pelo site';
      const message = formData.get('message') || '';
      
      // Construct message
      let text = `*Nova Mensagem pelo Site - Ê-Bot*\n\n`;
      text += `*Assunto:* ${subject}\n`;
      text += `*Nome:* ${name}\n`;
      if(company) text += `*Empresa:* ${company}\n`;
      text += `*Telefone:* ${phone}\n`;
      text += `*Email:* ${email}\n\n`;
      text += `*Mensagem:* ${message}`;
      
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/${WA_NUMBER}?text=${encodedText}`;
      
      // Show success feedback
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Redirecionando...';
      btn.style.backgroundColor = '#2ecc71';
      
      setTimeout(() => {
        window.open(url, '_blank');
 
