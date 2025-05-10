import { CatalogManifest } from '../types';
import { BaseCatalogAggregator } from '../shared/catalogAggregator';

class CloudflareCatalogAggregator extends BaseCatalogAggregator {
  // Add Cloudflare-specific functionality here if needed
}

// Singleton instance
export const catalogAggregator = new CloudflareCatalogAggregator();
