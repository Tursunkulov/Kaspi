import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEBHOOKS_FILE = path.join(__dirname, '..', 'webhooks.json');

/**
 * Читает webhooks.json и возвращает массив вебхуков.
 * При ошибке чтения/парсинга возвращает [].
 */
export const loadWebhooks = () => {
  if (process.env.SEZGIR_WEBHOOK_URL && process.env.SEZGIR_WEBHOOK_SECRET)
    return [{ url: process.env.SEZGIR_WEBHOOK_URL, secret: process.env.SEZGIR_WEBHOOK_SECRET,
      events: ['payment.success', 'payment.failed', 'payment.expired', 'payment.lost'] }];
  try {
    const raw = fs.readFileSync(WEBHOOKS_FILE, 'utf8');
    const hooks = JSON.parse(raw);
    if (!Array.isArray(hooks)) return [];
    return hooks;
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('[WEBHOOK STORE] Error reading webhooks.json:', err.message);
    }
    return [];
  }
};

/**
 * Возвращает вебхуки, подписанные на указанное событие.
 */
export const getWebhooksByEvent = (event) => {
  return loadWebhooks().filter((hook) => hook.url && Array.isArray(hook.events) && hook.events.includes(event));
};
