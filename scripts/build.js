const path = require('path');
const yaml = require('yaml');
const fs = require('fs-extra');

const publicFolder = path.join(__dirname, '..', 'public');
const distFolder = path.join(__dirname, '..', 'dist');
const v4Folder = path.join(distFolder, 'v4');

const sourceFolder = path.join(publicFolder, 'v4');
const appsFolder = path.join(sourceFolder, 'apps');
const logosFolder = path.join(sourceFolder, 'logos');

function readYamlFile(filePath) {
    const contentString = fs.readFileSync(filePath, 'utf-8');
    return yaml.parse(contentString);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeAppList(appFilenames) {
    const properAppFiles = appFilenames.filter((file) => file.endsWith('.yml'));

    if (properAppFiles.length !== appFilenames.length) {
        throw new Error('Hey! Everything in v4 needs that .yml extension.');
    }

    const appDetails = [];

    for (const filename of properAppFiles) {
        const content = readYamlFile(path.join(appsFolder, filename));
        const captainVersion = `${content.captainVersion}`;

        const appName = filename.replace('.yml', '');
        const appData = content.caproverOneClickApp || {};

        if (captainVersion === '4') {
        appData.displayName = appData.displayName || appName;
        appData.displayName = capitalizeFirstLetter(appData.displayName);
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

function buildDist() {
  return fs
    .readdir(appsFolder)
    .then((appFilenames) => {
      for (const filename of appFilenames) {
        const filePath = path.join(appsFolder, filename);
        const content = readYamlFile(filePath);

        fs.outputJsonSync(
          path.join(v4Folder, 'apps', filename.replace('.yml', '')),
          content
        );
      }

      fs.copySync(logosFolder, path.join(v4Folder, 'logos'));

      const allAppsList = makeAppList(appFilenames);
      const list = {
        oneClickApps: allAppsList.appDetails,
      };

      fs.outputJsonSync(path.join(v4Folder, 'list'), list);

      return fs.copySync(path.join(publicFolder, 'CNAME'), path.join(distFolder, 'CNAME'));
    })
    .catch((err) => {
      console.error(err);
      process.exit(127);
    });
}

Promise.resolve()
  .then(() => buildDist())
  .catch((err) => {
    console.error(err);
    process.exit(127);
  });