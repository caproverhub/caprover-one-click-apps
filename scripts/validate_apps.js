const path = require('path');
const yaml = require('yaml');
const fs = require('fs-extra');

// Let's get comfy with these paths
const publicFolder = path.join(__dirname, '..', 'public');
const versionFolder = path.join(publicFolder, 'v4'); // We're chill with just "v4" now

// Time to check out the apps in that folder
async function checkApps() {
  const appFiles = await fs.readdir(path.join(versionFolder, 'apps')); // Grab all file names
  const validApps = appFiles.filter(file => file.endsWith('.yml')); // Keep only the cool YAML ones

  if (validApps.length !== appFiles.length) { // Uh oh, some files are misfits!
    throw new Error('Hey! Everything in v4 needs that .yml extension.');
  }

  for (const appFile of validApps) { // Let's loop through these awesome apps
    const filePath = path.join(versionFolder, 'apps', appFile);
    const content = await yaml.parse(fs.readFileSync(filePath, 'utf-8')); // Read the app's story
    const captainVersion = `${content.captainVersion}`; // Check what version it's rocking

    if (captainVersion !== '4') { // Whoops, wrong version on the dance floor!
      throw new Error(`Whoa, an unknown captain version: ${captainVersion}`);
    }

    validateAppContent(appFile, content); // Make sure the app follows the rules

    const logoFile = appFile.replace('.yml', ''); // Extract the app name without YAML extension
    const logoPath = path.join(versionFolder, 'logos', `${logoFile}.png`); // Build the correct logo path

    if (!fs.existsSync(logoPath) || !fs.statSync(logoPath).isFile()) { // Uh oh, no matching pic!
      throw new Error(`Missing logo for ${appFile}: ${logoPath}`);
    }

    console.log(`App ${appFile} looking good! `); // Show some love for the validated app
  }
}

function validateAppContent(appName, content) { // Double-check the app's details
    if (!content.caproverOneClickApp) { // Missing some key info?
      throw new Error(`Missing caproverOneClickApp for ${appName}`);
    }
  
    if (!content.caproverOneClickApp.description) { // No description? Can't tell anyone what it does!
      throw new Error(`Missing description for ${appName}`);
    }
  
    if (content.caproverOneClickApp.description.length > 200) { // Keep it short and sweet!
      throw new Error(`Description too long for ${appName} - keep it under 200 characters`);
    }
  
    if (!content.caproverOneClickApp.instructions ||
        !content.caproverOneClickApp.instructions.start ||
        !content.caproverOneClickApp.instructions.end) { // Need guidance to get things going!
      throw new Error(`Missing instructions.start or instructions.end for ${appName}`);
    }
  
    if (!content.services) { // This app doesn't do anything? 
      throw new Error(`Missing services for ${appName}`);
    }

    return true;
}

Promise.resolve()
  .then(checkApps)
  .catch(err => {
    console.error(err);
    process.exit(127);
  });