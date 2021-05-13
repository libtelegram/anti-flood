# anti-flood [![Coverage Status](https://img.shields.io/static/v1?label=chat&message=on%20Telegram&logo=telegram&color=blue)](https://t.me/libtelegram_chat)

LibTelegram AntiFlood middleware

[Learn about the hitting limits in Telegram Bots API](https://core.telegram.org/bots/faq#broadcasting-to-users).

## Installation
You can install this package by the following command.

```
npm install @libtelegram/anti-flood
```

## API
```js
const antiFlood = require('@libtelegram/anti-flood');
```

The `antiFlood` object exposes various factories to create middlewares 

### antiFlood.omission(options[, callback])
The `omission` function skips the message if the time elapsed since the previous message is less than a `delay` 

```js
function callback(usr, msg) {
  usr.reply('Too many messages');
}

bot.use(antiFlood.omission({ delay: 1 / 2 }, callback));
```
#### options
The `omission` function takes an `options` object that may contain any of the following keys:

##### delay
The minimum time interval between messages in seconds

Defaults to `0.5`.
#### callback
Callback to be called after too many messages are detected

`callback` has a signature of `(usr, msg)`.

### antiFlood.penalty(options[, callback])
```js
function callback(usr, msg) {
  usr.reply('You won\'t be able to use the bot for 2 minutes');
}

bot.use(antiFlood.penalty({
  maxAttempts: 3,
  timeLimit: 2,
  timeBlocked: 2 * 60,
}, callback));
```

#### options
The `penalty` function takes an `options` object that may contain any of the following keys:

##### maxAttempts
The maximum number of requests from a user for a given time limit. After exceeding the number of attempts, the bot will not respond to user messages 

Defaults to `5`.
##### timeLimit
The time in seconds during which the counter of attempts is added. 

Defaults to `2`.
##### timeBlocked
The time in seconds for which the user will be blocked 

Defaults to `60`.
#### callback
Callback to be called after user is blocked

`callback` has a signature of `(usr, msg)`.

## License

[MIT](http://opensource.org/licenses/MIT)

