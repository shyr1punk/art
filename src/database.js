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

    const picture = res.rows.find(
      row => Boolean(row) &&
        row.image.indexOf('https://uploads.wikiart.org/Content/images/FRAME') === -1
    );

    return {
      err: null,
      image: picture.image,
      artist: picture.artist
    };
  } catch (err) {
    return { err };
  }
}

async function getAllArtists() {
  try {
    const query = 'select artistname from pictures group by artistname';
    const res = await client.query(query);

    const artists = res.rows.map(row => row.artistname);

    return {
      err: null,
      artists
    }
  } catch(err) {
    return {
      err
    };
  }
}


module.exports = {
  getRandomPicture,
  getAllArtists
};