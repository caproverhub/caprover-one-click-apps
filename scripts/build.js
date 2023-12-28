const path = require('path');
const yaml = require('yaml');
const fs = require('fs-extra');

const publicFolder = path.join(__dirname, '..', 'public');
const distFolder = path.join(__dirname, '..', 'dist');
const v4Folder = path.join(distFolder, 'v4');

const sourceFolder = path.join(publicFolder, 'v4');
const appsFolder = path.join(sourceFolder, 'apps');
const logosFolder = path.join(sourceFolder, 'logos');

async function readYamlFile(filePath) {
  const contentString = await fs.readFile(filePath, 'utf-8');
  return yaml.parse(contentString);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function makeAppList(appFilenames) {
  const properAppFiles = appFilenames.filter((file) => file.endsWith('.yml'));

  if (properAppFiles.length !== appFilenames.length) {
    throw new Error('Hey! Everything in v4 needs that .yml extension.');
  }

  const appDetails = [];

  for (const filename of properAppFiles) {
    const content = await readYamlFile(path.join(appsFolder, filename));
    const captainVersion = `${content.captainVersion}`;

    const appName = filename.replace('.yml', '');
    const appData = content.caproverOneClickApp || {};

    if (captainVersion === '4') {
      appData.displayName = appData.displayName || capitalizeFirstLetter(appName);
      appData.description = appData.description || '';

      appDetails.push({
        name: appName,
        displayName: appData.displayName,
        description: appData.description,
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

async function buildDist() {
  try {
    const appFilenames = await fs.readdir(appsFolder);

    for (const filename of appFilenames) {
      const filePath = path.join(appsFolder, filename);
      const content = await readYamlFile(filePath);

      await fs.outputJson(
        path.join(v4Folder, 'apps', filename.replace('.yml', '')), content
      );
    }

    await fs.copy(logosFolder, path.join(v4Folder, 'logos'));

    const allAppsList = await makeAppList(appFilenames);
    const list = {
      oneClickApps: allAppsList.appDetails,
    };

    await fs.outputJson(path.join(v4Folder, 'list'), list);

    await fs.copy(path.join(publicFolder, 'CNAME'), path.join(distFolder, 'CNAME'));
  } catch (err) {
    console.error(err);
    process.exit(127);
  }
}

async function main() {
  try {
    await buildDist();
  } catch (err) {
    console.error(err);
    process.exit(127);
  }
}

main();