# Deploy no Coolify - Ê-BOT Site

## ✅ Status: FUNCIONANDO!

O deploy está funcionando corretamente com Caddy Server.

## 🏗️ Arquitetura

```
Internet → Traefik (Coolify) → Container (porta 80) → Caddy → Site Estático
```

## 🚀 Stack Tecnológica

- **Web Server**: Caddy 2 (Alpine Linux)
- **Proxy**: Traefik (gerenciado pelo Coolify)
- **Container**: Docker
- **Deploy**: Coolify (Docker Compose)

## 📋 Configuração no Coolify

### 1. Variáveis de Ambiente

Configure em "Environment Variables":

```env
GROQ_API_KEY=sua_chave_groq_aqui
WHATSAPP_NUMBER=5546999130505
SITE_URL=https://ebot.murilosilva.com
```

### 2. Configurações do Projeto

- **Name**: EBOT-SITE
- **Build Pack**: Docker Compose
- **Domain**: https://ebot.murilosilva.com
- **Port**: 80
- **Servidor**: localhost (ou seu servidor)

### 3. Deploy

1. Commit e push das alterações
2. No Coolify, clique em "Deploy"
3. Aguarde 2-5 minutos
4. Verifique os logs

## 🔍 Logs Esperados

Você deve ver nos logs:

```
Starting entrypoint script...
Replacing environment variables...
Environment variables replaced
Starting Caddy...
```

## ✅ Verificação

1. Container deve estar "running"
2. Health status deve ser "healthy" após ~40s
3. Site acessível via domínio configurado
4. SSL/HTTPS funcionando automaticamente

## 🎯 Por que Caddy?

Mudamos de Nginx para Caddy porque:

1. **Mais simples**: Configuração mais fácil e legível
2. **Melhor com Coolify**: Integração nativa com proxy reverso
3. **Logs melhores**: Output mais claro para debug
4. **Menos código**: Dockerfile mais enxuto
5. **Performance**: Compressão automática (gzip + zstd)

## 🐛 Troubleshooting

### Container não inicia

Verifique os logs no Coolify. Procure por erros no entrypoint.

### 503 Service Unavailable

Aguarde 40 segundos (healthcheck start period). Se persistir, verifique:
- Container está rodando?
- Porta 80 está exposta?
- Caddy iniciou corretamente?

### Variáveis não aplicadas

Verifique dentro do container:
```bash
docker exec <container_id> cat /usr/share/caddy/js/env-config.js
```

Deve mostrar valores reais, não `{{GROQ_API_KEY}}`.

### Build falhando

Confirme que estes arquivos existem no repositório:
- Dockerfile
- docker-compose.yml
- Caddyfile
- index.html
- js/env-config.js

## 📝 Arquivos Importantes

```
.
├── Dockerfile              # Imagem Caddy + entrypoint
├── docker-compose.yml      # Configuração do serviço
├── Caddyfile              # Configuração do Caddy
├── index.html             # Página principal
├── js/
│   └── env-config.js      # Variáveis de ambiente (com placeholders)
└── assets/                # Imagens, fontes, etc.
```

## 🔄 Atualizar o Site

1. Faça suas alterações
2. Commit e push
3. No Coolify: "Redeploy"
4. Aguarde o novo build

## 🎉 Sucesso!

Se você vê "Container Started" nos logs do Coolify, está tudo funcionando!

Acesse: https://ebot.murilosilva.com
