const puppeteer = require('puppeteer');
var cheerio = require('cheerio');
// const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: true })
const url = 'https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=63';
 

// 目標：抓取氣象台明天的天氣

var getTaipeiWeather = async () => {
// 設定 puppeteer 參數  產生一個實例
  const browser = await puppeteer.launch();
// 開啟瀏覽器
  const page = await browser.newPage();
// 前往網站
  await page.goto("https://www.cwb.gov.tw/V8/C/W/County/County.html?CID=63");
//   await page.waitForSelector('.to-to li');
  await page.waitForSelector('#m_week')

  //  <法一> 直接在頁面擷取 (先在 chrome console 裡面試驗!!)
  //   在頁面裡面執行一些事情  最好返回json或字串 不能直接返回DOM元素
    // let body = await page.evaluate(() => {
      //   let result = [];
      //   let items = document.querySelectorAll('.to-to > li');
      //   for(var ele of items){
      //       result.push({
      //           time: ele.childNodes[0].textContent,
      //           weather: ele.childNodes[1].attributes[2].value,
      //           temporature: ele.childNodes[2].childNodes[0].textContent,
      //           rain: ele.childNodes[3].textContent,
      //           feel: ele.childNodes[4].textContent
      //       });
      //   }
  
      // 返回數據
      // return result;
    // });

    // console.log('body',body);




  // <法二> 
  //   在頁面裡面執行一些事情  最好返回json或字串 不能直接返回DOM元素
  let body = await page.evaluate(() => {
      return document.querySelector('.to-to').innerHTML;
  });
  
    // <法三> 把網頁的 body 抓出來
    // let body = await page.content();

    let $ = await cheerio.load(body);

    let Info = [];
    await $('li').each((i,el) => {
        let $2 = cheerio.load($(el).html());
        Info.push({
            time: $2('.title').text().trim(),
            weather: $2('img').attr('title'),
            temporature: $2('.tem-C').text().trim(),
            rain: $2('.rain').text().trim(),
            feel: $2('.text').text().trim()
        });
      })
      
    // 關閉瀏覽器 
    await browser.close();
    
    console.log('$2', Info);
    return Info;
};


module.exports = {
  getTaipeiWeather
};


// puppeteer 參考
// 範例 https://blog.fundebug.com/2017/11/01/guide-to-automating-scraping-the-web-with-js/
// 範例 https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial
// 範例 https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
// 語法 https://ithelp.ithome.com.tw/articles/10211916

// 加入 cheerio 的爬蟲應用 https://ithelp.ithome.com.tw/articles/10199966