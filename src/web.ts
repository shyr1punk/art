import express from 'express';
import bodyParser from 'body-parser';
import packageInfo from '../package.json';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

var server = app.listen(Number(process.env.PORT) || 3000, "0.0.0.0", () => {
  const address = server.address();
  if (typeof address === 'object') {
    const host = address.address;
    const port = address.port;
    console.log('Web server started at http://%s:%s', host, port);
  }
});

module.exports = (bot: TelegramBot) => {
  // @ts-ignore
  app.post('/' + bot.token, (req, res) => {
    console.log(bot)
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
