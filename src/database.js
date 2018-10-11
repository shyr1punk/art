const { Client } = require('pg');

const client = new Client();
client.connect();

async function getRandomPicture() {
  try {
    const query =
      `SELECT * FROM pictures
      OFFSET floor(random() * (select COUNT(*) from pictures))
      LIMIT 5;`;
    const res = await client.query(query);

    const image = res.rows.find(
      row => Boolean(row) &&
        row.image.indexOf('https://uploads.wikiart.org/Content/images/FRAME') === -1
    ).image;

    return { err: null, image};
  } catch (err) {
    return { err };
  }
}


module.exports = {
  getRandomPicture
};