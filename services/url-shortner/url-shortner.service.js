
const dns = require("dns")
const ShortUniqueId = require('short-unique-id')
const ShortUrlRepository = require('../../repositories/short-url.repository')

const shortenUrl = async(url) => {
    
    let isUrlValid = true;

    try {
        await verifyUrl(url);
    } catch (err) {
        isUrlValid = false;
    }

    if(!isUrlValid){
        throw new Error ('invalid url');
    }
    
    const shortId = new ShortUniqueId({ length: 4 })();

    let shortUrl = await ShortUrlRepository.create({shortId, url});

    return {original_url:shortUrl.url , short_url: shortUrl.shortId };

}

const verifyUrl = async(url) => {
    let pattern = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  
    if(!pattern.test(url)){
        throw new Error ('invalid url');
    }

    url = url.split('://')[1].replace('/', '');
    return new Promise((resolve, reject) => {
        dns.lookup(url, (err, address, family) => {
            if (err) reject(err);
            resolve(address);
        });
    });
}

const fetchOriginalUrl = async (shortId)=> {
    let shortUrl = await ShortUrlRepository.fetchOne({shortId});
   
    return shortUrl.url;
}

module.exports = {
    shortenUrl,
    fetchOriginalUrl
}
