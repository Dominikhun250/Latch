# Latch

Latch is a lightweight API service for collecting and retrieving data based on Discord user information.

## Requirements

* [Node.js v18+]([https://link-url-here.org](https://nodejs.org/en/download))

## Endpoints

### Public Endpoints

* `[GET]` /api/v1/user/:discord_user_id - Retrieves data for the specified Discord user.
* `[GET]` /api/v1/user/avatar/:id/:format - Returns the avatar of the specified user in the given format (e.g., png, jpg).
* `[GET]` /api/v1/user/banner/:id/:format - Returns the banner of the specified user in the given format.

### Example Response

* Check the live site [here]( https://latch.dominikhun250.eu/api/v1/user/713087767629922404/)!

```json
{
  "custom": {
    "0": {
      "value": [
        {
          "comment": "Dominikhun250_The_Best"
        }
      ]
    }
  },
  "data": {
    "response": {
      "id": "713087767629922404",
      "username": "dominikhun250",
      "avatar": "c5cd80802d84a16017c9223b5baf5896",
      "discriminator": "0",
      "public_flags": 4194560,
      "flags": 4194560,
      "banner": "a_901242a8b7b5f26dfabf7543fc649f7b",
      "accent_color": 1776411,
      "global_name": "! Dominikhun250",
      "avatar_decoration_data": {
        "asset": "a_1005898c6acf56a9ac5010baf444f6fd",
        "sku_id": "1256321669467865088",
        "expires_at": null
      },
      "collectibles": null,
      "banner_color": "#1b1b1b",
      "clan": {
        "identity_guild_id": "1369772778970157092",
        "identity_enabled": true,
        "tag": "DEV",
        "badge": "cccffd10fd0ba231b7d6142f7dd8f46a"
      },
      "primary_guild": {
        "identity_guild_id": "1369772778970157092",
        "identity_enabled": true,
        "tag": "DEV",
        "badge": "cccffd10fd0ba231b7d6142f7dd8f46a"
      }
    },
    "status": "dnd",
    "activities": [
      {
        "name": "Custom Status",
        "type": 4,
        "state": "dominikhun250.dev",
        "emoji": {
          "name": "💎",
          "identifier": "%F0%9F%92%8E"
        }
      },
      {
        "name": "Minecraft",
        "type": 0,
        "applicationId": "356875570916753438",
        "timestamps": {
          "start": "2025-05-31T16:55:49.246Z"
        }
      },
      {
        "name": "Visual Studio Code",
        "type": 0,
        "details": "Editing config.json",
        "state": "Workspace: latch",
        "applicationId": "383226320970055681",
        "timestamps": {
          "start": "2025-05-31T11:47:16.389Z"
        },
        "assets": {
          "largeText": "Editing a JSON file",
          "smallText": "Visual Studio Code",
          "largeImage": "1359299015484768338",
          "smallImage": "1359299466493956258"
        }
      },
    ],
    "online_on_mobile": false,
    "online_on_web": false,
    "online_on_dektop": true,
    "devices": {
      "desktop": "dnd",
      "mobile": "offline",
      "web": "offline"
    },
  },
  "success": true,
  "powered_by": "Latch"
}
```

### Custom Data Endpoints

* `PUT /custom/users/:userId/`

  * Requires API key (passed in headers or as a query param `?apikey=...`).
  * Body must include:

    ```json
    {
      "name": "exampleName",
      "value": "exampleValue"
    }
    ```
* `DELETE /custom/users/:userId/:customId`

  * Requires API key.
* `GET /custom/users/:uuid` - Retrieves custom data for a user based on their UUID.

## Discord Bot Commands

The bot provides the following text commands (default prefix: `.`):

* `.set` - Adds a new custom field.
* `.get` - Check a user or your own custom fields
* `.remove` - Delete a custom field.

> The API key required for modifying data can be generated or obtained by using `.apikey` in a private message with the bot.

## Configuration (`config.json`)

```json
{
  "port": "3000",
  "status_style": "Watching",
  "status": "online",
  "status_message": "you <3",
  "status_stream_url": "https://www.twitch.tv/username",
  "TOKEN": "YOUR_DISCORD_BOT_TOKEN",
  "prefix": ".",
  "ratelimit": {
    "second": 5,
    "max_request": 10
  },
  "mysql": {
    "host": "DB_HOST",
    "port": 3306,
    "username": "DB_USER",
    "database_name": "DB_NAME",
    "password": "DB_PASSWORD"
  }
}
```

> ⚠️ Be sure to keep your `TOKEN` and database credentials private!

## Installation
  * Run `git clone https://github.com/Dominikhun250/Latch`
  * Run `npm install`
  * Edit the `config.json`
  * Run `node .`
  * Check the http://localhost:3000/

## License

MIT
