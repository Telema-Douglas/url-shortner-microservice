
const dns = require("dns")
const ShortUniqueId = require('short-unique-id')
const ShortUrlRepository = require('../../repositories/short-url.repository')

const shortenUrl = async (url) => {

    let isUrlValid = true;

    try {
        await verifyUrl(url);
    } catch (err) {
        isUrlValid = false;
    }

    if (!isUrlValid) {
        throw new Error('invalid url');
    }

    const shortId = new ShortUniqueId({ length: 4 })();

    let shortUrl = await ShortUrlRepository.create({ shortId, url });

    return { original_url: shortUrl.url, short_url: shortUrl.shortId };

}

const verifyUrl = async (url) => {
    let pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    if (!pattern.test(url)) {
        throw new Error('invalid url');
    }

    return new Promise((resolve, reject) => {
        dns.lookup(new URL(url).host, (err, address, family) => {
            if (err) reject(err);
            resolve(address);
        });
    });
}

const fetchOriginalUrl = async (shortId) => {
    let shortUrl = await ShortUrlRepository.fetchOne({ shortId });

    return shortUrl.url;
}

module.exports = {
    shortenUrl,
    fetchOriginalUrl
}
