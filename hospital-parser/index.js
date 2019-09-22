const cheerio = require('cheerio');
const fs = require('fs');
const rp = require('request-promise');

fs.readFile('list.html', (err, data) => {
  if (err) throw err;
  const $ = cheerio.load(data)

  // Get initial list of CA hospitals
  var list = [];
  $('tbody > tr > td:first-child')
    .each((i, el) => {
      let obj = $(el).text().trim();

      list.push(obj);
    });

  // Use URL to request and get data for each hospital
  /*const URL = "https://www.ahd.com";
  (async() => {
    for (let i in list) {
      let data = await rp(URL + list[i].link)
      const $ = cheerio.load(data);

      list[i].address = $("span[itemprop='streetAddress']").text();
      list[i].phone = $("span[itemprop='telephone']").text();
      list[i].website = $("table[class='nomargin']").find('a').attr('href');
      list[i].latitude = $("span[itemprop='geo'] > :nth-child(1)").attr('content');
      list[i].longitude = $("span[itemprop='geo'] > :nth-child(2)").attr('content');
    }
  })*/

  //Write list to file
  fs.writeFile('list.json', JSON.stringify(list), (err) => {
    if (err) throw err;
    console.log("success!");
  });

});
