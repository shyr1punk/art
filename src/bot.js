const token = process.env.TELEGRAM_BOT_TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

const { getRandomPicture } = require('./database');

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.BOT_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', async (msg) => {
  const { err, image } = await getRandomPicture();

  if (err || !image) {
    bot.sendMessage(msg.chat.id, 'Что-то пошло не так :(').then(() => {
      console.error('Random image no found', err)
    });
  } else {
    bot.sendPhoto(msg.chat.id, image).then(() => {
      console.log(`Sent image `, image)
    });
  }
});

module.exports = bot;
