# Ê-BOT / Ê-SISTEMAS - Site Institucional

Site institucional da Ê-BOT e Ê-SISTEMAS com integração de chat IA.

## 🚀 Deploy no Coolify

O site está configurado para deploy automático no Coolify usando Docker Compose + Caddy.

### Configuração Rápida

1. **Variáveis de Ambiente** (obrigatórias):
   ```env
   GROQ_API_KEY=sua_chave_aqui
   WHATSAPP_NUMBER=5546999130505
   SITE_URL=https://ebot.murilosilva.com
   ```

2. **Configurações do Coolify**:
   - Build Pack: Docker Compose
   - Port: 80
   - Domain: https://ebot.murilosilva.com

3. **Deploy**: Clique em "Deploy" e aguarde

📖 Documentação completa: [DEPLOY.md](DEPLOY.md)

## 🛠️ Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Web Server**: Caddy 2
- **Container**: Docker (Alpine Linux)
- **Deploy**: Coolify + Traefik
- **IA**: Groq API

## 📁 Estrutura

```
.
├── index.html              # Página principal
├── produtos.html           # Produtos
├── nossa_historia.html     # Sobre
├── contato.html           # Contato
├── css/                   # Estilos
├── js/                    # Scripts
├── assets/                # Imagens, fontes
├── Dockerfile             # Imagem Docker
├── docker-compose.yml     # Orquestração
└── Caddyfile             # Config Caddy
```

## 🔧 Desenvolvimento Local

```bash
# Servir com qualquer servidor HTTP
python -m http.server 8000
# ou
npx serve
```

Acesse: http://localhost:8000

## 📝 Licença

© 2024 Ê-SISTEMAS. Todos os direitos reservados.
