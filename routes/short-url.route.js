const express = require('express')
const router = express.Router()
const { shortenUrl } = require('../services/url-shortner/url-shortner.service')
const { fetchOriginalUrl } = require('../services/url-shortner/url-shortner.service')


router.post('/shorturl', async (req, res) => {
    const { url } = req.body;
    
    try{
        let shortUrl = await shortenUrl(url);
        res.status(200).json(shortUrl);
    }catch(err){
        res.status(400).json({ error: err.message || 'error occured during shortening process' });
    }

});

router.get('/shorturl/:shortUrl', async(req, res)=>{
    const { shortUrl } = req.params;
    
    try{
        let originalUrl = await fetchOriginalUrl(shortUrl);
        res.redirect(originalUrl);
    }catch(err){
        res.status(400).json({ error: err.message || 'An error occurred' });
    }

})

module.exports = router