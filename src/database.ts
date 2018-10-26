import { Client } from 'pg';

const client = new Client();
client.connect();

interface Picture {
  serie: string;
  diameter: number;
  sizeX: number;
  yearOfTrade: number;
  artistName: string;
  location: string;
  artistUrl: string;
  contentId: number;
  lastPrice: number;
  period: string;
  technique: string;
  width: number;
  title: string;
  artistContentId: number;
  material: string;
  style: string;
  completitionYear: number;
  sizeY: number;
  height: number;
  galleryName: string;
  description: string;
  tags: string;
  yearAsString: string;
  genre: string;
  image: string;
  dictionaries: number[],
  auction: string;
  url: string
}

interface Artist {
  artistname: string,
  url: string,
  wikipediaUrl: string,
  deathDay: Date,
  contentId: number,
  deathDayAsString: string,
  birthDayAsString: string,
  birthDay: Date,
  lastNameFirst: string,
  image: string,
  dictonaries: number[]
}

async function getRandomPicture() {
  try {
    const query =
      `SELECT * FROM
        (SELECT * FROM pictures OFFSET floor(random() * (select COUNT(*) from pictures))) random
        WHERE image NOT LIKE 'https://uploads.wikiart.org/Content/images/FRAME-600x480.jpg'
        LIMIT 1`;
    const res = await client.query(query);

    const picture = res.rows[0].row;

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

    const artists = res.rows.map((row: Artist) => row.artistname);

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


export {
  getRandomPicture,
  getAllArtists
};