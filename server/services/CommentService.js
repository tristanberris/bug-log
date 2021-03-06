import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentService {
  async findAll(query = {}) {
    let comments = await dbContext.Comments.find(query).populate(
      "creator",
      "name picture"
    );
    return comments;
  }
  async findById(id) {
    let comment = await dbContext.Comments.findById(id);
    if (!comment) {
      throw new BadRequest("Invalid Id");
    }
    return comment;
  }
  async getComments(id){
    let comments = await dbContext.Comments.find({bug : id})
    return comments
  }
  async find(id){
    let comments = await dbContext.Comments.find({bugId : id})
    if(!comments){
      throw new BadRequest("No Comments Found")
    }
  }
  async delete(id){
      let data = await dbContext.Comments.findOneAndRemove({ _id : id})
      return data
  }
  async create(rawData){
      let data = await dbContext.Comments.create(rawData)
      return data
  }
}

export const commentService = new CommentService();
