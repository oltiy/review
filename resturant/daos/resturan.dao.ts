import shortid from 'shortid';
import debug from 'debug';
import { CreateResturanDto } from '../dto/create.resturant.dto';
import { PatchRestrantrDto } from '../dto/patch.resturant.dto';
import { PutResturanDto } from '../dto/put.resturant.dto';
import mongooseService from '../../services/mongoose.service';

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * NEVER USER THIS CLASS IN REAL LIFE.
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class ResturantDao {
  Schema = mongooseService.getMongoose().Schema;

  resturanSchema = new this.Schema(
    {
      _id: String,
      resturantName: String,
      rank: Number,
      comment: Array,
      ownerName: String,
      permissionFlags: Number,
    },
    { id: false }
  );
  Resturant = mongooseService
    .getMongoose()
    .model('Resturant', this.resturanSchema);

  constructor() {
    log('Created new instance of ResturantDao');
  }

  async addResturant(resturantFields: CreateResturanDto) {
    const resturantId = shortid.generate();
    const resturant = new this.Resturant({
      _id: resturantId,
      ...resturantFields,
      permissionFlags: 1,
    });
    await resturant.save();
    return resturant;
  }
  //   async getResturantByEmail(email: string) {
  //     return this.Resturant.findOne({ email: email }).exec();
  //   }

  async getResturantByName(resturantName: string) {
    return this.Resturant.findOne({ resturantName: resturantName })
      .populate('Resturant')
      .exec();
  }

  async getResturantByOwner(ownerName: string) {
    return this.Resturant.findOne({ ownerName: ownerName })
      .populate('Resturant')
      .exec();
  }

  async getResturants(limit = 25, page = 0) {
    return this.Resturant.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
  async updateResturanByName(
    resturantName: string,
    resturantFields: PatchRestrantrDto | PutResturanDto
  ) {
    const existingResturany = await this.Resturant.findOneAndUpdate(
      { resturantName: resturantName },
      { $set: resturantFields },
      { new: true }
    ).exec();

    return existingResturany;
  }
  async removeResturantByName(resturantName: string) {
    return this.Resturant.deleteOne({ resturantName: resturantName }).exec();
  }
}

export default new ResturantDao();
