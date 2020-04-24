import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async findAll(query = {}) {
    let notes = await dbContext.Notes.find(query).populate(
      "creator",
      "name picture"
    );
    return notes;
  }
  async findById(id) {
    let value = await dbContext.Notes.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  async getAll(query = {}){
    let note = await dbContext.Notes.find(query)
  }
  async getById(id){
      let note = await dbContext.Notes.findById(id)
      return note
  }
  async create(rawData){
      let data = await dbContext.Notes.create(rawData)
      return data
  }
  async deleteNote(id, userEmail){
      let note = await dbContext.Notes.findOneAndRemove({_id: id, creatorEmail: userEmail})
      return note
  }
//TODO: figure out how to change bug. Kanban is a weird reference.
//   async changeBug({_id: id, creatorEmail: email,  })
}

export const notesService = new NotesService();
