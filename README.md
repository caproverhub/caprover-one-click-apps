## Repo for CapRover One Click Apps

![Validate One Click Apps](https://github.com/Awes0meHub/caprover-one-click-apps/actions/workflows/validate_apps.yml/badge.svg?event=push)
![Publish One Click Apps](https://github.com/Awes0meHub/caprover-one-click-apps/actions/workflows/deploy.yml/badge.svg?event=push)

### How to add this repo:

-   Login to your CapRover dashboard
-   Go to **apps** and click on **One-Click Apps/Databases** and scrolldown to the bottom
-   Under **3rd party repositories:** copy `https://Awes0meHub.github.io/caprover-one-click-apps` and paste it in to the text box
-   Click the **_Connect New Repository_** button

---------

To create your own repository:
- Fork this repository
- Delete all existing apps (to avoid duplicate apps), and add your own apps.
- Run `npm install -g pnpm` or `sudo npm install -g pnpm`
- Run `pnpm i`
- Run `pnpm run validate_apps`
- Run `pnpm run formatter-write`
- Run `pnpm run build` 
- Now you can host the static content placed in `./dist` directory anywhere you want, the official repo uses github pages to publish the content. Make sure to update [CNAME](https://github.com/Awes0meHub/caprover-one-click-apps/blob/master/public/CNAME) to your own URL if you decide to do so.
