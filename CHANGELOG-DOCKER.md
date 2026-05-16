# Changelog - Correções Docker/Coolify

## 🔧 Correções Aplicadas

### 1. Dockerfile
- ✅ Corrigido entrypoint script (estava impedindo nginx de iniciar)
- ✅ Mudado de bash para sh (Alpine Linux usa sh)
- ✅ Adicionado logs de debug no entrypoint
- ✅ Adicionado verificação se env-config.js existe
- ✅ Healthcheck nativo no Dockerfile

### 2. docker-compose.yml
- ✅ Mudado de `ports` para `expose` (Traefik faz o proxy)
- ✅ Removido `env_file: .env` (variáveis vêm do Coolify)
- ✅ Adicionado `container_name` para facilitar debug
- ✅ Adicionado label `coolify.managed=true`
- ✅ Healthcheck otimizado

### 3. .gitignore
- ✅ Removido `js/env-config.js` do ignore (precisa estar no repo)
- ✅ Arquivo deve ter os placeholders {{GROQ_API_KEY}} commitados

### 4. Documentação
- ✅ Criado DEPLOY.md completo com troubleshooting
- ✅ Criado test-docker.sh para testes locais
- ✅ Criado .dockerignore para otimizar build

## 📋 Arquivos Modificados

```
✏️  Dockerfile              - Corrigido entrypoint
✏️  docker-compose.yml      - Configurado para Coolify/Traefik
✏️  .gitignore              - Removido env-config.js
📄 DEPLOY.md               - Documentação completa
📄 test-docker.sh          - Script de teste
📄 .dockerignore           - Otimização de build
```

## 🚀 Como Usar

### 1. Commit das Mudanças
```bash
git add .
git commit -m "fix: corrigir configuração Docker para Coolify"
git push
```

### 2. No Coolify

1. Configure as variáveis de ambiente:
   - `GROQ_API_KEY` (obrigatório)
   - `WHATSAPP_NUMBER` (opcional)
   - `SITE_URL` (opcional)

2. Configure o domínio: `https://ebot.murilosilva.com`

3. Configure a porta: `80`

4. Clique em "Deploy"

### 3. Verificar

Após ~2-5 minutos:
- Container deve estar "healthy"
- Site acessível via domínio
- Logs devem mostrar "Starting nginx..."

## 🔍 Como Funciona

```
┌─────────────────────────────────────────────────────────┐
│ 1. Build da Imagem                                      │
│    - Copia arquivos para /usr/share/nginx/html          │
│    - Cria entrypoint script                             │
│    - Configura nginx                                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Container Inicia                                     │
│    - Executa /docker-entrypoint.sh                      │
│    - Substitui {{GROQ_API_KEY}} → valor real           │
│    - Substitui {{WHATSAPP_NUMBER}} → valor real        │
│    - Substitui {{SITE_URL}} → valor real               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Nginx Inicia                                         │
│    - Escuta na porta 80 (interna)                       │
│    - Serve arquivos de /usr/share/nginx/html            │
│    - Healthcheck: wget http://localhost/                │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Traefik (Coolify)                                    │
│    - Detecta container com expose: 80                   │
│    - Configura rota: ebot.murilosilva.com → :80         │
│    - Gerencia SSL/TLS automaticamente                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 5. Usuário Acessa                                       │
│    https://ebot.murilosilva.com                         │
│    ↓                                                    │
│    Traefik (443) → Container (80) → Nginx → Site       │
└─────────────────────────────────────────────────────────┘
```

## ✅ Checklist Pré-Deploy

- [ ] Arquivo `js/env-config.js` existe com placeholders
- [ ] Arquivo `index.html` existe
- [ ] Arquivo `nginx.conf` existe
- [ ] Dockerfile correto
- [ ] docker-compose.yml correto
- [ ] Variáveis configuradas no Coolify
- [ ] Domínio configurado
- [ ] Servidor selecionado

## 🧪 Testar Antes do Deploy

```bash
# Linux/Mac
chmod +x test-docker.sh
./test-docker.sh

# Windows (Git Bash)
bash test-docker.sh
```

Se o teste local funcionar, o deploy no Coolify também funcionará!
