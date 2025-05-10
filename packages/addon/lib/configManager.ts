import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { UserConfig, CatalogManifest } from '../../types';
import { BaseConfigManager } from '../../shared/configManager';

class NodeConfigManager extends BaseConfigManager {
  private configsPath: string;

  constructor(configsPath: string = path.join(process.cwd(), 'userConfigs')) {
    super();
    this.configsPath = configsPath;

    // Ensure the configuration directory exists
    if (!fs.existsSync(this.configsPath)) {
      fs.mkdirSync(this.configsPath, { recursive: true });
    }
  }

  // Generate a new user ID
  generateUserId(): string {
    const userId = crypto.randomUUID();
    console.log(`Generated new user ID: ${userId}`);
    return userId;
  }

  // Load the configuration for a specific user
  loadConfig(userId: string): UserConfig {
    if (this.cache.has(userId)) {
      console.log(`Using cached config for user ${userId}`);
      return this.cache.get(userId)!;
    }

    const configPath = path.join(this.configsPath, `${userId}.json`);
    console.log(`Loading config from ${configPath}`);

    try {
      if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configData);
        console.log(
          `Loaded config for user ${userId} with ${config.catalogs?.length || 0} catalogs`
        );

        this.cache.set(userId, config);
        return config;
      }
    } catch (error) {
      console.error(`Error loading config for user ${userId}:`, error);
    }

    // Default empty configuration
    console.log(`Creating new empty config for user ${userId}`);
    const defaultConfig = { catalogs: [] };
    this.cache.set(userId, defaultConfig);
    return defaultConfig;
  }

  // Save the configuration for a specific user
  saveConfig(userId: string, config?: UserConfig): boolean {
    // If no configuration is provided but exists in cache, use that
    if (!config && this.cache.has(userId)) {
      config = this.cache.get(userId)!;
    } else if (!config) {
      console.error(
        `Cannot save config for user ${userId}: config not provided and not found in cache`
      );
      return false;
    }

    const configPath = path.join(this.configsPath, `${userId}.json`);

    try {
      console.log(
        `Saving config for user ${userId} with ${config.catalogs.length} catalogs to ${configPath}`
      );
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

      // Update cache
      this.cache.set(userId, config);
      return true;
    } catch (error) {
      console.error(`Error saving config for user ${userId}:`, error);
      return false;
    }
  }

  // Check if a user exists
  userExists(userId: string): boolean {
    const configPath = path.join(this.configsPath, `${userId}.json`);
    const exists = fs.existsSync(configPath);
    console.log(`Checking if user ${userId} exists: ${exists}`);
    return exists;
  }

  // Get all users
  getAllUsers(): string[] {
    try {
      const files = fs.readdirSync(this.configsPath);
      const users = files
        .filter(file => file.endsWith('.json'))
        .map(file => path.basename(file, '.json'));

      console.log(`Found ${users.length} users in directory ${this.configsPath}`);
      return users;
    } catch (error) {
      console.error(`Error getting all users: ${error}`);
      return [];
    }
  }
}

// Export a singleton instance
const configManager = new NodeConfigManager();
export default configManager;
