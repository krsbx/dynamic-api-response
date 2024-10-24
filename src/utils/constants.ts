import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const APP_ROOT_PATH = path.resolve(__dirname, '../..');

export const APP_SRC_PATH = path.resolve(APP_ROOT_PATH, 'src');

export const APP_SERVICE_PATH = path.resolve(APP_SRC_PATH, 'services');
