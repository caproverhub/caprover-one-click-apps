const path = require('path');
const yaml = require('yaml');
const fs = require('fs-extra');

// Define paths.
const PUBLIC_FOLDER = path.join(__dirname, '..', 'public');
const VERSION_FOLDER = path.join(PUBLIC_FOLDER, 'v4');

/**
 * Check apps in the folder.
 */
async function checkApps() {
  try {
    const appFiles = await fs.readdir(path.join(VERSION_FOLDER, 'apps'));
    const validApps = appFiles.filter((file) => file.endsWith('.yml'));

    if (validApps.length !== appFiles.length) {
      throw new Error('Hey! Everything in v4 needs that .yml extension.');
    }

    for (const appFile of validApps) {
      await checkAppFile(appFile);
      console.log(`App ${appFile} looking good!`);
    }
  } catch (err) {
    console.error(err);
    process.exit(127);
  }
}

/**
 * Check a single application file.
 * @param {string} appFile The application file name to check.
 */
async function checkAppFile(appFile) {
  const filePath = path.join(VERSION_FOLDER, 'apps', appFile);
  const content = yaml.parse(await fs.readFile(filePath, 'utf-8'));
  validateAppContent(appFile, content);
  await checkLogo(appFile);
}

/**
 * Validate the contents of an application configuration.
 * @param {string} appName The application's name.
 * @param {Object} content The application configuration content.
 */
function validateAppContent(appName, content) {
  if (!content.caproverOneClickApp) {
    throw new Error(`Missing caproverOneClickApp for ${appName}`);
  }

  const { description, instructions } = content.caproverOneClickApp;

  if (!description) {
    throw new Error(`Missing description for ${appName}`);
  }

  if (description.length > 200) {
    throw new Error(
      `Description too long for ${appName} - keep it under 200 characters`
    );
  }

  if (!instructions || !instructions.start || !instructions.end) {
    throw new Error(
      `Missing instructions.start or instructions.end for ${appName}`
    );
  }

  if (!content.services) {
    throw new Error(`Missing services for ${appName}`);
  }
}

/**
 * Check for the existence of the logo associated with an app.
 * @param {string} appFile The application file name.
 */
async function checkLogo(appFile) {
  const logoFile = appFile.replace('.yml', '');
  const logoPath = path.join(VERSION_FOLDER, 'logos', `${logoFile}.png`);

  if (!(await fs.pathExists(logoPath)) || !(await fs.stat(logoPath)).isFile()) {
    throw new Error(`Missing logo for ${appFile}: ${logoPath}`);
  }
}

// Start the checking process.
checkApps();
