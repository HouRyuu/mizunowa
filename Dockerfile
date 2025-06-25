FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules

# 安全性更高的用户
RUN adduser -D appuser
USER appuser

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]