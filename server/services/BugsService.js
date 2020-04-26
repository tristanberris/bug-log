import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async getAll() {
    let bugs = await dbContext.Bugs.find().populate(
      "creator",
      "name picture"
    );
    return bugs;
  }
  async findById(id) {
    let value = await dbContext.Bugs.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  // async getAll(userEmail){
  //   return await dbContext.Bugs.find({creatorEmail: userEmail}).populate("creator")
  // }
  async getById(id){
      let bug = await dbContext.Bugs.findById(id)
      return bug
  }
  async create(rawData){
      let data = await dbContext.Bugs.create(rawData)
      return data
  }
  async deleteBug(id, userEmail){
      let bug = await dbContext.Bugs.findOneAndRemove({_id: id, creatorEmail: userEmail})
      return bug
  }
//TODO: figure out how to change bug. Kanban is a weird reference.
//   async changeBug({_id: id, creatorEmail: email,  })
}

export const bugsService = new BugsService();
