const ShortUrlModel = require('../models/short-url.model');
const BaseRepository = require('./base-repository.repository');

class ShortUrlRepository extends BaseRepository {

    constructor(){
        super(ShortUrlModel);
    }

}

module.exports = new ShortUrlRepository();