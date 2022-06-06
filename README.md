## Repo for CapRover One Click Apps

![Validate One Click Apps](https://github.com/awesomehubio/caprover-one-click-apps/actions/workflows/validate_apps.yml/badge.svg?event=push)
![Publish One Click Apps](https://github.com/awesomehubio/caprover-one-click-apps/actions/workflows/deploy.yml/badge.svg?event=push)

### How to add this repo:

-   Login to your CapRover dashboard
-   Go to **apps** and click on **One-Click Apps/Databases** and scrolldown to the bottom
-   Under **3rd party repositories:** copy `https://awesomehubio.github.io/caprover-one-click-apps` and paste it in to the text box
-   Click the **_Connect New Repository_** button

---------


## Test your One Click Apps
After creating your One-Click app json, like [this](https://github.com/caprover/one-click-apps/blob/master/public/v2/apps/adminer.json), you need to test it before creating a Pull Request. Here is how you test it:
- Login to your CapRover dashboard
- Go to **apps** and click on **One-Click Apps/Databases**
- Select **>> TEMPLATE <<** at the bottom of the dropdown list 
- Copy and paste your JSON into the text area, and click **NEXT**.
- Enter values and make sure it's working as expected.

---------


## Build your own one-click app repository
You may want to build your own private repository. CapRover supports having multiple repositories. You can add new repository URLs to the one click app page. The official one, this one, is available as `https://oneclickapps.caprover.com`.

To create your own repository:
- Fork this repository
- Delete all existing apps (to avoid duplicate apps), and add your own apps.
- Run `npm install -g pnpm` or `sudo npm install -g pnpm`
- Run `pnpm i`
- Run `pnpm run validate_apps` 
- Run `pnpm run build` 
- Now you can host the static content placed in `./dist` directory anywhere you want, the official repo uses github pages to publish the content. Make sure to update [CNAME](https://github.com/awesomehubio/caprover-one-click-apps/blob/master/public/CNAME) to your own URL if you decide to do so.
