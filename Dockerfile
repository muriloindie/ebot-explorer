FROM caddy:2-alpine

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Copy static files
COPY . /usr/share/caddy

# Create entrypoint script
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'set -e' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo 'echo "Starting entrypoint script..."' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo '# Replace environment variables in env-config.js' >> /docker-entrypoint.sh && \
    echo 'if [ -f /usr/share/caddy/js/env-config.js ]; then' >> /docker-entrypoint.sh && \
    echo '  echo "Replacing environment variables..."' >> /docker-entrypoint.sh && \
    echo '  sed -i "s|{{GROQ_API_KEY}}|${GROQ_API_KEY:-}|g" /usr/share/caddy/js/env-config.js' >> /docker-entrypoint.sh && \
    echo '  sed -i "s|{{WHATSAPP_NUMBER}}|${WHATSAPP_NUMBER:-5546999130505}|g" /usr/share/caddy/js/env-config.js' >> /docker-entrypoint.sh && \
    echo '  sed -i "s|{{SITE_URL}}|${SITE_URL:-https://ebot.murilosilva.com}|g" /usr/share/caddy/js/env-config.js' >> /docker-entrypoint.sh && \
    echo '  echo "Environment variables replaced"' >> /docker-entrypoint.sh && \
    echo 'fi' >> /docker-entrypoint.sh && \
    echo '' >> /docker-entrypoint.sh && \
    echo 'echo "Starting Caddy..."' >> /docker-entrypoint.sh && \
    echo 'exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
