# Latch

Latch is a lightweight API service for collecting and retrieving data based on Discord user information.

## Requirements

* Node.js v18+

## Endpoints

### Public Endpoints

* `GET /user/:discord_user_id` - Retrieves data for the specified Discord user.
* `GET /user/avatar/:id/:format` - Returns the avatar of the specified user in the given format (e.g., png, jpg).
* `GET /user/banner/:id/:format` - Returns the banner of the specified user in the given format.

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
* `.delete` - Deletes a specific custom field.
* `.remove` - Alias for `.delete`.

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
  "Guild": "YOUR_GUILD_ID",
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

## License

MIT
