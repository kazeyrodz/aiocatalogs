import express from 'express';
import configManager from '../lib/configManager';
import catalogAggregator from '../lib/catalogAggregator';
import { getConfigPageHTML } from '../../shared/templates/configPage';
import { clearBuilderCache } from '../server';
import packageJson from '../../../package.json';
import {
  handleAddCatalog,
  handleRemoveCatalog,
  handleMoveCatalogUp,
  handleMoveCatalogDown,
  convertStremioUrl,
} from '../../shared/routes/configPageHandlers';

// Router for the configuration page
const router = express.Router();

// Read package version from package.json
const getPackageVersion = (): string => {
  return packageJson.version || 'unknown';
};

// Display configuration page
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Check if user exists
  if (!configManager.userExists(userId)) {
    return res.redirect('/configure?error=User with ID ' + userId + ' not found');
  }

  try {
    // Load configuration
    const catalogs = await configManager.getAllCatalogs(userId);

    // Host URL for Stremio links
    // Set protocol and host correctly for local development
    const host = req.headers.host || 'localhost:7000';
    // const baseUrl = `${req.protocol === 'https' ? 'https' : 'http'}://${host}`;
    const baseUrl = `${req.protocol}://${host}`;

    // Optional messages
    const message = (req.query.message as string) || '';
    const error = (req.query.error as string) || '';

    // Read version from package.json
    const packageVersion = getPackageVersion();

    // Render HTML
    res.send(getConfigPageHTML(userId, catalogs, baseUrl, message, error, false, packageVersion));
  } catch (error) {
    console.error('Error displaying config page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add catalog
router.post('/:userId/add', async (req, res) => {
  const userId = req.params.userId;
  const catalogUrl = req.body.catalogUrl;

  if (!catalogUrl) {
    return res.redirect(`/configure/${userId}?error=Catalog URL is required`);
  }

  // Convert stremio:// URL to https:// if necessary
  const normalizedUrl = convertStremioUrl(catalogUrl);

  const result = await handleAddCatalog(
    userId,
    normalizedUrl,
    url => catalogAggregator.fetchCatalogManifest(url),
    (userId, manifest) => Promise.resolve(configManager.addCatalog(userId, manifest)),
    userId => clearBuilderCache(userId)
  );

  if (result.success) {
    return res.redirect(`/configure/${userId}?message=${result.message}`);
  } else {
    return res.redirect(`/configure/${userId}?error=${result.error}`);
  }
});

// Remove catalog
router.post('/:userId/remove', async (req, res) => {
  const userId = req.params.userId;
  const catalogId = req.body.catalogId;

  if (!catalogId) {
    return res.redirect(`/configure/${userId}?error=Catalog ID is required`);
  }

  const result = await handleRemoveCatalog(
    userId,
    catalogId,
    (userId, catalogId) => Promise.resolve(configManager.removeCatalog(userId, catalogId)),
    userId => clearBuilderCache(userId)
  );

  if (result.success) {
    return res.redirect(`/configure/${userId}?message=${result.message}`);
  } else {
    return res.redirect(`/configure/${userId}?error=${result.error}`);
  }
});

// Move catalog up
router.post('/:userId/moveUp', async (req, res) => {
  const userId = req.params.userId;
  const catalogId = req.body.catalogId;

  if (!catalogId) {
    return res.redirect(`/configure/${userId}?error=Catalog ID is required`);
  }

  const result = await handleMoveCatalogUp(
    userId,
    catalogId,
    (userId, catalogId) => Promise.resolve(configManager.moveCatalogUp(userId, catalogId)),
    userId => clearBuilderCache(userId)
  );

  if (result.success) {
    return res.redirect(`/configure/${userId}?message=${result.message}`);
  } else {
    return res.redirect(`/configure/${userId}?error=${result.error}`);
  }
});

// Move catalog down
router.post('/:userId/moveDown', async (req, res) => {
  const userId = req.params.userId;
  const catalogId = req.body.catalogId;

  if (!catalogId) {
    return res.redirect(`/configure/${userId}?error=Catalog ID is required`);
  }

  const result = await handleMoveCatalogDown(
    userId,
    catalogId,
    (userId, catalogId) => Promise.resolve(configManager.moveCatalogDown(userId, catalogId)),
    userId => clearBuilderCache(userId)
  );

  if (result.success) {
    return res.redirect(`/configure/${userId}?message=${result.message}`);
  } else {
    return res.redirect(`/configure/${userId}?error=${result.error}`);
  }
});

export default router;
