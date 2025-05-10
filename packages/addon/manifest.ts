import { addonBuilder as StremioAddonBuilder } from 'stremio-addon-sdk';
import configManager from './lib/configManager';
import { version, description } from '../../package.json';
import { buildManifest, handleCatalogRequest, ADDON_ID } from '../shared/manifestBuilder';

// Create a new AddonBuilder for a specific user
export const createAddonBuilder = async (userId: string) => {
  try {
    // Load user configuration
    const userCatalogs = await configManager.getAllCatalogs(userId);
    console.log(
      `Creating AddonBuilder for user ${userId} with ${userCatalogs.length} catalog sources`
    );

    // Build the manifest using the shared function
    const manifest = buildManifest(userId, version, description, userCatalogs);

    // Create the builder with the manifest
    const builder = new StremioAddonBuilder(manifest);

    // Define only the catalog handler as we only support catalogs
    builder.defineCatalogHandler(async args => {
      console.log(`Catalog request for type ${args.type}, id ${args.id}`);
      return handleCatalogRequest(args, userCatalogs);
    });

    // Log manifest for debugging
    console.log(
      'Created addon builder with manifest:',
      JSON.stringify(manifest).substring(0, 200) + '...'
    );

    return builder;
  } catch (error) {
    console.error('Error creating addon builder:', error);
    // Create a fallback minimal builder to avoid errors
    const fallbackManifest = {
      id: `${ADDON_ID}.${userId}`,
      version,
      name: 'AIOCatalogs (Error)',
      description: 'Error loading catalogs',
      resources: ['catalog'],
      types: ['movie'],
      catalogs: [
        {
          type: 'movie',
          id: 'error',
          name: 'Error loading catalogs',
        },
      ],
    };

    const fallbackBuilder = new StremioAddonBuilder(fallbackManifest);

    // Define only the catalog handler
    fallbackBuilder.defineCatalogHandler(() => Promise.resolve({ metas: [] }));

    return fallbackBuilder;
  }
};
