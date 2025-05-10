// Datentypen für Cloudflare D1
import { D1Database as CloudflareD1Database } from '@cloudflare/workers-types';

export type D1Database = CloudflareD1Database;

// Import gemeinsamer Typen aus dem types-Paket
import {
  UserConfig,
  CatalogManifest,
  MetaPreviewItem,
  CatalogRequest,
  CatalogResponse,
  MetaItem,
} from '../types';

// Re-Export der gemeinsamen Typen
export { UserConfig, CatalogManifest, MetaPreviewItem, CatalogRequest, CatalogResponse, MetaItem };

// Cloudflare Worker Environment
export interface Env {
  DB: D1Database;
  // Hinzufügen eines Index-Signatures, um den Env-Typ zu erfüllen
  [key: string]: any;
}
