import ResturantDao from '../daos/resturan.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateResturanDto } from '../dto/create.resturant.dto';
import { PutResturanDto } from '../dto/put.resturant.dto';
import { PatchRestrantrDto } from '../dto/patch.resturant.dto';

class ResturantsService {
  async create(resource: CreateResturanDto) {
    return ResturantDao.addResturant(resource);
  }
  async deleteByResturantName(name: string) {
    return ResturantDao.removeResturantByName(name);
  }

  async list(limit: number, page: number) {
    return ResturantDao.getResturants(limit, page);
  }

  async putByResturantName(
    resturantName: string,
    resource: PatchRestrantrDto
  ): Promise<any> {
    return ResturantDao.updateResturanByName(resturantName, resource);
  }
  async getResturantByName(resturantName: string) {
    return ResturantDao.getResturantByName(resturantName);
  }
}
export default new ResturantsService();
