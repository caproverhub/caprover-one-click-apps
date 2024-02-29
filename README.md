## 🚀 Repo for CapRover One-Click Apps

![Banner](https://github.com/caproverhub/caprover-one-click-apps/assets/73314940/f24092a5-9239-475d-9337-3b3222a3686e)

<p align="center">
  <img src="https://github.com/caproverhub/caprover-one-click-apps/actions/workflows/validate_apps.yml/badge.svg?event=push" alt="Validate One Click Apps"></img>
  <img src="https://github.com/caproverhub/caprover-one-click-apps/actions/workflows/deploy.yml/badge.svg?event=push" alt="Publish One Click Apps"></img>
</p>

## How to add this repo

- 🖥️ Login to your CapRover dashboard
- 📲 Go to **apps** and click on **One-Click Apps/Databases**, then scroll down to the bottom
- 📋 Under **3rd party repositories:** copy `https://caproverhub.github.io/caprover-one-click-apps` and paste it into the text box
- 🔄 Click the **_Connect New Repository_** button


## To create your own repository:

- 🍴 Fork this repository
- 🗑️ Delete all existing apps (to avoid duplicate apps), and add your own apps.
- 🛠️ Run `npm install -g pnpm` or `sudo npm install -g pnpm`
- ⚙️ Run `pnpm i`
- 🧪 Run `pnpm run validate`
- 📝 Run `pnpm run format:write`
- 🏗️ Run `pnpm run build` 
- 🌐 Now you can host the static content placed in `./dist` directory anywhere you want; the official repo uses GitHub Pages to publish the content. Make sure to update [CNAME](https://github.com/caproverhub/caprover-one-click-apps/blob/master/public/CNAME) to your own URL if you decide to do so.

## 🚀 Apps

For a complete list of available one-click apps, please visit the [CaproverHub](https://caproverhub.github.io/caprover-one-click-apps/) repository homepage.

Feel free to explore, contribute, and enhance your CapRover experience with these one-click apps! 🚢✨
