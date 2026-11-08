# Discord

Discord as a NeoDex app: the real Discord web app, in its own tab, in your theme's colours, with the number of unread messages shown on the tab.

*Version française : [README.md](README.md)*

## How it works

- The app opens **discord.com/app**, the official web version: servers, channels, direct messages, voice and video calls, screen sharing, everything works as in the browser.
- **Sign-in**: you sign in once with your Discord account, as on any website. The session is kept in NeoDex's browser; NeoDex never reads anything from your account.
- **Unread messages**: the tab shows "Discord (3)" when you have unread mentions or direct messages, and "Discord •" when there is only something new in your channels.
- **Colours**: Discord's backgrounds, accents and scrollbar take on the NeoDex theme's colours, and follow when you change theme. To get the original colours back, untick **Discord in NeoDex colours** in Settings → Appearance, then reload Discord.
- **Notifications**: the first time, the NeoDex bar asks whether Discord may send you notifications; your answer is kept in the site permissions.

## Data and sync

Nothing is synced: the sign-in stays on each PC, and your messages stay with Discord. The plugin asks for full access because it shows an external site in an embedded view.

## Install

In NeoDex: **NeoStore → Discover → Discord → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
