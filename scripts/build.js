const path = require('path');
const yaml = require('yaml');
const fs = require('fs-extra');

// Define folder paths.
const PUBLIC_FOLDER = path.join(__dirname, '..', 'public');
const DIST_FOLDER = path.join(__dirname, '..', 'dist');
const V4_FOLDER = path.join(DIST_FOLDER, 'v4');
const SOURCE_FOLDER = path.join(PUBLIC_FOLDER, 'v4');
const APPS_FOLDER = path.join(SOURCE_FOLDER, 'apps');
const LOGOS_FOLDER = path.join(SOURCE_FOLDER, 'logos');

/**
 * Read and parse a YAML file.
 * @param {string} filePath - The path to the YAML file.
 * @returns {Promise<Object>} Parsed content of the YAML file.
 */
async function readYamlFile(filePath) {
  const contentString = await fs.readFile(filePath, 'utf-8');
  return yaml.parse(contentString);
}

/**
 * Capitalize the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} Capitalized string.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Create an app list from the filenames of apps.
 * @param {Array<string>} appFilenames - An array of application filenames.
 * @returns {Promise<Object>} Object containing the proper app files list and details.
 */
async function makeAppList(appFilenames) {
  const properAppFiles = appFilenames.filter((file) => file.endsWith('.yml'));

  if (properAppFiles.length !== appFilenames.length) {
    throw new Error('Hey! Everything in v4 needs that .yml extension.');
  }

  const appDetails = [];

  for (const filename of properAppFiles) {
    const content = await readYamlFile(path.join(APPS_FOLDER, filename));
    const captainVersion = `${content.captainVersion}`;

    const appName = filename.replace('.yml', '');
    const appData = content.caproverOneClickApp || {};

    if (captainVersion === '4') {
      const displayName = appData.displayName || capitalizeFirstLetter(appName);
      const description = appData.description || '';

      appDetails.push({
        name: appName,
        displayName: displayName,
        description: description,
        isOfficial: appData.isOfficial === 'true',
        logoUrl: `${appName}.png`,
      });
    } else {
      throw new Error(`Whoa, an unknown captain version: ${captainVersion}`);
    }
  }

  return {
    appList: properAppFiles,
    appDetails,
  };
}

/**
 * Build distribution folder.
 */
async function buildDist() {
  try {
    const appFilenames = await fs.readdir(APPS_FOLDER);

    for (const filename of appFilenames) {
      const filePath = path.join(APPS_FOLDER, filename);
      const content = await readYamlFile(filePath);

      await fs.outputJson(
        path.join(V4_FOLDER, 'apps', filename.replace('.yml', '')), content
      );
    }

    await fs.copy(LOGOS_FOLDER, path.join(V4_FOLDER, 'logos'));

    const allAppsList = await makeAppList(appFilenames);
    const list = {
      oneClickApps: allAppsList.appDetails,
    };

    await fs.outputJson(path.join(V4_FOLDER, 'list'), list);
    await fs.copy(path.join(PUBLIC_FOLDER, 'CNAME'), path.join(DIST_FOLDER, 'CNAME'));
  } catch (err) {
    console.error(err);
    process.exit(127);
  }
}

/**
 * Main function to build distribution data.
 */
async function main() {
  try {
    await buildDist();
  } catch (err) {
    console.error(err);
    process.exit(127);
  }
}

main();
