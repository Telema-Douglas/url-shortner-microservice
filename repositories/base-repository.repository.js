class BaseRepository {

    constructor(model){
        this.model = model;
    }

    async create(data){
        return await this.model.create(data);
    }

    async fetchOne(filter){
        return await this.model.findOne(filter).exec();
    }

    async update(){
        return await this.model.findOneAndUpdate(filter, data, {new:true});
    }

    async delete(_id){
       return await this.model.findByIdAndDelete(_id);
    }
}

module.exports = BaseRepository;