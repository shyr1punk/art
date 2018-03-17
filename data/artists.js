const fs = require('fs');

const artists = JSON.parse(fs.readFileSync('./artists.json', 'utf-8'));

const insertQueryHeader =
  'INSERT INTO painters (artistName, url, wikipediaUrl, deathDay, contentId, deathDayAsString, birthDayAsString, birthDay, lastNameFirst, image, dictonaries) VALUES\n';


/**
 * artistName
 * url
 * wikipediaUrl
 * deathDay
 * contentId
 * deathDayAsString
 * birthDayAsString
 * birthDay
 * lastNameFirst
 * image
 * dictonaries
 */
const values = artists.map(a => {
  return `(${getValue(a.artistName)}, ${getValue(a.url)}, ${getValue(a.wikipediaUrl)}, ${getDate(a.deathDayAsString)}, ${a.contentId}, ${getValue(a.deathDayAsString)}, ${getValue(a.birthDayAsString)}, ${getDate(a.birthDayAsString)}, ${getValue(a.lastNameFirst)}, ${getValue(a.image)}, ${a.dictonaries.length ? '\'{' + a.dictonaries + '}\'' : null})`;
});

function getValue(value) {
  if(!value) return 'null';
  return JSON.stringify(value);
}

function getDate(date) {
  if(!date) return 'null';
  return `'${new Date(date).toLocaleDateString('en-EN')}'`
}

fs.writeFileSync('artists.sql', insertQueryHeader + values.join(',\n') + ';')

// TODO: править руками строки в " => ' и экранировать внутри строк ' => ''