const cheerio = require('cheerio');
const fs = require('fs');

fs.readFile('list.html', (err, data) => {
  if (err) throw err;
  const $ = cheerio.load(data)

  var list = [];
  $('tbody > tr > td:first-child')
    .each((i, el) => {
      let obj = {
        name: $(el).text().trim(),
        link: $(el).find('a').attr("href")
      }
      list.push(obj);
    });
  console.log(list)
});
