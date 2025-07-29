import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const mockServer = setupWorker(...handlers);