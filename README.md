## Repo for CapRover One Click Apps

![Validate One Click Apps](https://github.com/Awes0meHub/caprover-one-click-apps/actions/workflows/validate_apps.yml/badge.svg?event=push)
![Publish One Click Apps](https://github.com/Awes0meHub/caprover-one-click-apps/actions/workflows/deploy.yml/badge.svg?event=push)

## How to add this repo

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

## Apps

| Name | Description |
| ---- | ------------ |
| [Ackee](https://ackee.electerious.com) | Node.js based analytics tool for those who care about privacy. |
| [Arma3Server](https://github.com/BrettMayson/Arma3Server) | Arma 3 Dedicated Server. |
| [Chevereto](https://github.com/tanmng/docker-chevereto) | Ultimate image sharing software 🦄. |
| [Duplicati](https://docs.linuxserver.io/images/docker-duplicati/) | Store securely encrypted backups in the cloud! |
| [Emby](https://docs.linuxserver.io/images/docker-emby/) | Your personal media on any device. |
| [Ganymede](https://github.com/Zibbp/ganymede) | Twitch VOD and Stream archiving platform with a rendered chat. |
| [Heimdall](https://docs.linuxserver.io/images/docker-heimdall) | An Application dashboard and launcher. |
| [Homepage](https://github.com/benphelps/homepage) | A modern, secure, highly customizable application dashboard. |
| [Jackett](https://docs.linuxserver.io/images/docker-jackett) | API Support for your favorite torrent trackers. |
| [Jellyseerr](https://github.com/Fallenbagel/jellyseerr) | Fork of overseerr for jellyfin support. |
| [JoyBox](https://github.com/joyboxxx/joyBox) | Chaturbate Webcam Recorder. |
| [Librespeed](https://github.com/librespeed/speedtest) | Librespeed is a very lightweight Speedtest. |
| [Linkwarden](https://linkwarden.app/) | Bookmark manager to collect, organize, and preserve webpages. |
| [Lychee](https://github.com/lycheeorg/lychee) | A great looking and easy-to-use photo-management-system. |
| [Metube](https://github.com/alexta69/metube) | Web GUI for youtube-dl with playlist support. |
| [Mixpost](https://mixpost.app) | Self-Hosted Social Media Management Software. |
| [Porn Vault](https://gitlab.com/porn-vault/porn-vault) | Organizer for adult videos and imagery. |
| [pgAdmin4](https://www.pgadmin.org/) | pgAdmin 4 is a rewrite of the popular pgAdmin3 management tool for the PostgreSQL. |
| [Photoview](https://github.com/viktorstrate/photoview) | Photo gallery for self-hosted personal servers. |
| [pyLoad](https://pyload.net/) | The free and open-source Download Manager written in pure Python. |
| [qBittorrent](https://docs.linuxserver.io/images/docker-qbittorrent) | qBittorrent BitTorrent client |
| [Tandoor Recipes](https://tandoor.dev) | Manage your ever growing recipe collection online. |
| [SABnzbd](https://sabnzbd.org) | SABnzbd - The automated Usenet download tool. |
| [SearXNG](https://docs.searxng.org) | Privacy-respecting, hackable metasearch engine |
| [Serge](https://github.com/nsarrazin/serge) | A web interface for chatting with Alpaca through llama.cpp. |
| [Shynet](https://github.com/milesmcc/shynet) | Modern, privacy-friendly, and cookie-free web analytics. |
| [Slash](https://github.com/boojack/slash) | Bookmarks and link sharing platform. Save and share your links very easily. |
| [Sonarr](https://sonarr.tv) | Smart PVR for newsgroup and bittorrent users. |
| [Stash](https://github.com/stashapp/stash) | An organizer for your porn, written in Go |
| [Szurubooru](https://github.com/rr-/szurubooru) | Image board engine, Danbooru-style. |
| [Trilium](https://github.com/zadam/trilium) | Build your personal knowledge base with Trilium Notes |
| [Troddit](https://github.com/burhan-syed/troddit) | A web client for Reddit. |
| [Uptime Kuma](https://github.com/louislam/uptime-kuma) | A fancy self-hosted monitoring tool |
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) | Unofficial Bitwarden compatible server written in Rust. |
| [Vikunja](https://vikunja.io) | The open-source, self-hostable to-do app. Organize everything, on all platforms. |
| [Webtop](https://github.com/linuxserver/docker-webtop) | Ubuntu and Alpine based Webtop images, Linux in a web browser. |
| [XBackBone](https://xbackbone.app) | A lightweight file manager with full ShareX, Screencloud support and more. |
| [Yagpdb](https://yagpdb.xyz) | Yet another general purpose discord bot |
| [YT-dlp-web](https://github.com/sooros5132/yt-dlp-web) | Self-hosted yt-dlp with the Web UI. |
