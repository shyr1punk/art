const token = process.env.TELEGRAM_BOT_TOKEN;

import TelegramBot from 'node-telegram-bot-api';
let bot: TelegramBot | undefined;

import { getRandomPicture, getAllArtists } from './database';

let currentArtist;

async function getCurrentArtist() {
  const { err, artists } = await getAllArtists();

  if (err) {
    console.error('Error artist fetch', err);
  } else {
    console.log('Artist fetch successful', JSON.stringify(artists));
    currentArtist = artists;
  }
}

function init(token: string) {
  if(process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    // @ts-ignore
    bot.setWebHook(process.env.BOT_URL + bot.token);
  }
  else {
    bot = new TelegramBot(token, { polling: true });
  }

  console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

  listeners(bot);
  getCurrentArtist();
}

if (token) {
  init(token);
} else {
  console.error('TOKEN is empty')
}

function listeners(bot: TelegramBot) {
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
}

export default bot;
