import { CatalogManifest } from '../../types';

/**
 * Handle add catalog request
 * @param userId User ID
 * @param catalogUrl URL to the catalog manifest
 * @param fetchCatalogManifest Function to fetch a catalog manifest
 * @param addCatalog Function to add a catalog to user config
 * @param clearCache Function to clear the cache
 * @returns Result object with success status and message/error
 */
export async function handleAddCatalog(
  userId: string,
  catalogUrl: string,
  fetchCatalogManifest: (url: string) => Promise<CatalogManifest | null>,
  addCatalog: (userId: string, manifest: CatalogManifest) => Promise<boolean>,
  clearCache?: (userId: string) => void
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!catalogUrl) {
    return { success: false, error: 'Catalog URL is required' };
  }

  try {
    console.log(`Fetching catalog manifest from ${catalogUrl}`);
    const manifest = await fetchCatalogManifest(catalogUrl);

    if (manifest) {
      const success = await addCatalog(userId, manifest);

      if (success) {
        // Clear cache if function provided
        if (clearCache) {
          clearCache(userId);
        }
        return { success: true, message: 'Catalog added successfully' };
      } else {
        return { success: false, error: 'Failed to add catalog to configuration' };
      }
    } else {
      return { success: false, error: 'Failed to fetch catalog manifest' };
    }
  } catch (error) {
    console.error('Error adding catalog:', error);
    return { success: false, error: 'Failed to add catalog' };
  }
}

/**
 * Handle remove catalog request
 * @param userId User ID
 * @param catalogId Catalog ID to remove
 * @param removeCatalog Function to remove a catalog
 * @param clearCache Function to clear the cache
 * @returns Result object with success status and message/error
 */
export async function handleRemoveCatalog(
  userId: string,
  catalogId: string,
  removeCatalog: (userId: string, catalogId: string) => Promise<boolean>,
  clearCache?: (userId: string) => void
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!catalogId) {
    return { success: false, error: 'Catalog ID is required' };
  }

  try {
    const success = await removeCatalog(userId, catalogId);

    if (success) {
      // Clear cache if function provided
      if (clearCache) {
        clearCache(userId);
      }
      return { success: true, message: 'Catalog removed successfully' };
    } else {
      return { success: false, error: 'Failed to remove catalog' };
    }
  } catch (error) {
    console.error('Error removing catalog:', error);
    return { success: false, error: 'Failed to remove catalog' };
  }
}

/**
 * Handle move catalog up request
 * @param userId User ID
 * @param catalogId Catalog ID to move up
 * @param moveCatalogUp Function to move a catalog up
 * @param clearCache Function to clear the cache
 * @returns Result object with success status and message/error
 */
export async function handleMoveCatalogUp(
  userId: string,
  catalogId: string,
  moveCatalogUp: (userId: string, catalogId: string) => Promise<boolean>,
  clearCache?: (userId: string) => void
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!catalogId) {
    return { success: false, error: 'Catalog ID is required' };
  }

  try {
    const success = await moveCatalogUp(userId, catalogId);

    if (success) {
      // Clear cache if function provided
      if (clearCache) {
        clearCache(userId);
      }
      return { success: true, message: 'Catalog moved up successfully' };
    } else {
      return { success: false, error: 'Failed to move catalog up' };
    }
  } catch (error) {
    console.error('Error moving catalog up:', error);
    return { success: false, error: 'Failed to move catalog up' };
  }
}

/**
 * Handle move catalog down request
 * @param userId User ID
 * @param catalogId Catalog ID to move down
 * @param moveCatalogDown Function to move a catalog down
 * @param clearCache Function to clear the cache
 * @returns Result object with success status and message/error
 */
export async function handleMoveCatalogDown(
  userId: string,
  catalogId: string,
  moveCatalogDown: (userId: string, catalogId: string) => Promise<boolean>,
  clearCache?: (userId: string) => void
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!catalogId) {
    return { success: false, error: 'Catalog ID is required' };
  }

  try {
    const success = await moveCatalogDown(userId, catalogId);

    if (success) {
      // Clear cache if function provided
      if (clearCache) {
        clearCache(userId);
      }
      return { success: true, message: 'Catalog moved down successfully' };
    } else {
      return { success: false, error: 'Failed to move catalog down' };
    }
  } catch (error) {
    console.error('Error moving catalog down:', error);
    return { success: false, error: 'Failed to move catalog down' };
  }
}

/**
 * Convert a stremio:// URL to https:// URL
 * @param url Original URL
 * @returns Converted URL
 */
export function convertStremioUrl(url: string): string {
  // If the URL starts with stremio://, convert it to https://
  if (url.startsWith('stremio://')) {
    return url.replace('stremio://', 'https://');
  }
  return url;
}
