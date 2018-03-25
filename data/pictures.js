const fs = require('fs');

const data = {};
const dir = __dirname + '/';

const values = process();

Object.keys(values).forEach(key => {
  fs.writeFileSync(`${__dirname}/pictures-sql/${key}.sql`, values[key]);
})

function process() {
  fs.readdirSync(dir).forEach((fileName, index) => {
    if (!fileName.endsWith('.json')) return;
    data[fileName.replace(/\.json$/, '')] = JSON.parse(fs.readFileSync(dir + fileName, 'utf-8'));
  });

  const insertQueryHeader =
    'INSERT INTO pictures (serie, diameter, sizeX, yearOfTrade, artistName, location, artistUrl, contentId, lastPrice, period, technique, width, title, artistContentId, material, style, completitionYear, sizeY, height, galleryName, description, tags, yearAsString, genre, image, dictionaries, auction, url) VALUES\n';

  const sqlValues = {};

  Object.keys(data).forEach(key => {
    sqlValues[key] = insertQueryHeader + data[key].map(p => '(' +
      getValue(p.serie) +
      getValue(p.diameter) +
      getValue(p.sizeX) +
      getValue(p.yearOfTrade) +
      getValue(p.artistName) +
      getValue(p.location) +
      getValue(p.artistUrl) +
      getValue(p.contentId) +
      getValue(p.lastPrice) +
      getValue(p.period) +
      getValue(p.technique) +
      getValue(p.width) +
      getValue(p.title) +
      getValue(p.artistContentId) +
      getValue(p.material) +
      getValue(p.style) +
      getValue(p.completitionYear) +
      getValue(p.sizeY) +
      getValue(p.height) +
      getValue(p.galleryName) +
      getValue(p.description) +
      getValue(p.tags) +
      getValue(p.yearAsString) +
      getValue(p.genre) +
      getValue(p.image) +
      getValue(p.dictionaries) +
      getValue(p.auction) +
      getValue(p.url, false)
    + ')').join(',\n') + ';';
  });

  return sqlValues;
}

function getValue(value, trailingComma = true) {
  if(!value) return 'null' + (trailingComma ? ', ' : '');
  if (Array.isArray(value)) return `'{${value.join(', ')}}'` + (trailingComma ? ', ' : '');
  if(typeof value === 'number') return value + (trailingComma ? ', ' : '');
  return `'${value.replace(/'/g, '\'\'')}'` + (trailingComma ? ', ' : '');
}

function getDate(date) {
  if(!date) return 'null';
  return `'${new Date(date).toLocaleDateString('en-EN')}'`
}


// TODO: править руками строки в " => ' и экранировать внутри строк ' => ''