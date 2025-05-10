import { UserConfig, CatalogManifest } from '../types';

/**
 * Abstract configuration manager that defines the common interface
 * to be implemented by both Cloudflare and Node.js versions
 */
export abstract class BaseConfigManager {
  protected cache: Map<string, UserConfig>;

  constructor() {
    this.cache = new Map();
  }

  /**
   * Generate a new unique user ID
   */
  abstract generateUserId(): Promise<string> | string;

  /**
   * Load the configuration for a user
   */
  abstract loadConfig(userId: string): Promise<UserConfig> | UserConfig;

  /**
   * Save the configuration for a user
   */
  abstract saveConfig(userId: string, config?: UserConfig): Promise<boolean> | boolean;

  /**
   * Get the current configuration for a user
   */
  async getConfig(userId: string): Promise<UserConfig> {
    return this.loadConfig(userId);
  }

  /**
   * Add a catalog manifest to a user's configuration
   */
  async addCatalog(userId: string, manifest: CatalogManifest): Promise<boolean> {
    console.log(`Adding catalog ${manifest.id} to user ${userId}`);
    const config = await this.loadConfig(userId);

    // Check if a catalog with the same ID already exists
    const existingIndex = config.catalogs.findIndex(c => c.id === manifest.id);

    if (existingIndex >= 0) {
      console.log(`Updating existing catalog at index ${existingIndex}`);
      config.catalogs[existingIndex] = manifest;
    } else {
      console.log(`Adding new catalog to list`);
      config.catalogs.push(manifest);
    }

    const success = await this.saveConfig(userId, config);
    if (success) {
      console.log(`Successfully saved config with ${config.catalogs.length} catalogs`);
    } else {
      console.error(`Failed to save config`);
    }

    return success;
  }

  /**
   * Remove a catalog from a user's configuration
   */
  async removeCatalog(userId: string, id: string): Promise<boolean> {
    console.log(`Removing catalog ${id} from user ${userId}`);
    const config = await this.loadConfig(userId);
    const initialLength = config.catalogs.length;

    config.catalogs = config.catalogs.filter(c => c.id !== id);
    console.log(`After removal: ${config.catalogs.length} catalogs (was ${initialLength})`);

    if (initialLength !== config.catalogs.length) {
      return this.saveConfig(userId, config);
    }

    return false;
  }

  /**
   * Move a catalog up in the list
   */
  async moveCatalogUp(userId: string, id: string): Promise<boolean> {
    console.log(`Moving catalog ${id} up for user ${userId}`);
    const config = await this.loadConfig(userId);

    // Find the index of the catalog
    const index = config.catalogs.findIndex(c => c.id === id);

    // If catalog not found or already at the top, do nothing
    if (index <= 0) {
      console.log(`Catalog ${id} not found or already at the top`);
      return false;
    }

    // Swap the catalog with the one above it
    const temp = config.catalogs[index];
    config.catalogs[index] = config.catalogs[index - 1];
    config.catalogs[index - 1] = temp;

    console.log(`Moved catalog ${id} from position ${index} to ${index - 1}`);
    return this.saveConfig(userId, config);
  }

  /**
   * Move a catalog down in the list
   */
  async moveCatalogDown(userId: string, id: string): Promise<boolean> {
    console.log(`Moving catalog ${id} down for user ${userId}`);
    const config = await this.loadConfig(userId);

    // Find the index of the catalog
    const index = config.catalogs.findIndex(c => c.id === id);

    // If catalog not found or already at the bottom, do nothing
    if (index === -1 || index >= config.catalogs.length - 1) {
      console.log(`Catalog ${id} not found or already at the bottom`);
      return false;
    }

    // Swap the catalog with the one below it
    const temp = config.catalogs[index];
    config.catalogs[index] = config.catalogs[index + 1];
    config.catalogs[index + 1] = temp;

    console.log(`Moved catalog ${id} from position ${index} to ${index + 1}`);
    return this.saveConfig(userId, config);
  }

  /**
   * Get a specific catalog for a user
   */
  async getCatalog(userId: string, id: string): Promise<CatalogManifest | undefined> {
    const config = await this.loadConfig(userId);
    return config.catalogs.find(c => c.id === id);
  }

  /**
   * Get all catalogs for a user
   */
  async getAllCatalogs(userId: string): Promise<CatalogManifest[]> {
    const config = await this.loadConfig(userId);
    console.log(`Getting all catalogs for user ${userId}: found ${config.catalogs.length}`);
    return config.catalogs;
  }

  /**
   * Check if a user exists
   */
  abstract userExists(userId: string): Promise<boolean> | boolean;

  /**
   * Clear the cache for a specific user
   */
  clearCache(userId: string): void {
    if (this.cache.has(userId)) {
      console.log(`Clearing cache for user ${userId}`);
      this.cache.delete(userId);
    }
  }

  /**
   * Clear the entire cache
   */
  clearAllCache(): void {
    console.log('Clearing entire cache');
    this.cache.clear();
  }
}
