document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wa-message-wrapper");
  const chatBody = document.querySelector(".wa-chat-body");
  
  if (!wrapper || !chatBody) {
    console.log("Chat animation: wrapper or chatBody not found");
    return;
  }

  const rawNodes = Array.from(wrapper.children).filter(node => node.nodeType === 1);
  
  if (rawNodes.length === 0) {
    console.log("Chat animation: no children found in wrapper");
    return;
  }
  
  const templateNodes = rawNodes.map(node => node.cloneNode(true));
  
  wrapper.innerHTML = '';
  wrapper.style.opacity = '1';
  
  const TYPING_DELAY = 500;
  const TYPING_DUR = 1500;
  const BUBBLE_READ_BASE = 1200;
  const BUBBLE_READ_CHAR = 20;
  
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const scrollDown = () => {
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  async function playSequence() {
    wrapper.innerHTML = '';
    wrapper.style.opacity = '1';
    
    await sleep(600);
    
    for (let i = 0; i < templateNodes.length; i++) {
      const node = templateNodes[i].cloneNode(true);
      
      if (node.classList.contains('typing-indicator')) {
        await sleep(TYPING_DELAY);
        
        node.style.display = 'flex';
        node.style.opacity = '0';
        node.style.transform = 'translateY(10px)';
        wrapper.appendChild(node);
        
        void node.offsetWidth;
        
        node.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        node.style.opacity = '1';
        node.style.transform = 'translateY(0)';
        
        scrollDown();
        
        await sleep(TYPING_DUR);
        
        node.style.opacity = '0';
        node.style.transform = 'translateY(10px)';
        
        await sleep(300);
        node.remove();
        
      } else if (node.classList.contains('wa-bubble')) {
        node.style.display = 'block';
        node.style.opacity = '0';
        node.style.transform = 'translateY(15px) scale(0.95)';
        
        wrapper.appendChild(node);
        
        void node.offsetWidth;
        
        node.style.transition = 'opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        node.style.opacity = '1';
        node.style.transform = 'translateY(0) scale(1)';
        
        scrollDown();
        
        await sleep(400);
        
        if (node.classList.contains('chat-msg-7')) {
          await sleep(1800);
          
          const btn = node.querySelector('.auto-click');
          if (btn) {
            btn.style.transition = 'all 0.15s ease';
            btn.style.background = 'rgba(48, 163, 164, 0.2)';
            btn.style.transform = 'scale(0.95)';
            await sleep(150);
            btn.style.background = 'transparent';
            btn.style.transform = 'scale(1)';
            await sleep(400);
          }
        } else {
          let textLen = (node.innerText || "").length;
          let dynamicDelay = BUBBLE_READ_BASE + (textLen * BUBBLE_READ_CHAR);
          dynamicDelay = Math.min(dynamicDelay, 3000);
          
          if (node.querySelector('img') || node.querySelector('.wa-pdf-doc')) {
            dynamicDelay = 2500;
          }
          
          await sleep(dynamicDelay);
        }
      }
    }
    
    await sleep(3000);
    
    wrapper.style.transition = 'opacity 0.5s ease';
    wrapper.style.opacity = '0';
    await sleep(500);
    
    playSequence();
  }
  
  setTimeout(() => {
    playSequence();
  }, 300);

});
