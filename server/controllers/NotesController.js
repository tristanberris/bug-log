import express from "express";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class NotesController extends BaseController {
    constructor() {
        super("api/notes");
        this.router
            .get("", this.getAll)
            .get("/:id", this.getById)
            // .put("/:id", this.changeNote)
            .delete(":id", this.deleteNote)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .post("", this.create);
    }
    async getAll(req, res, next) {
        try {
            return res.send(["value1", "value2"]);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creator = req.user.email;
            let data = await notesService.create(req.body)
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            let data = await notesService.getById(req.params.id)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async deleteNote(req,res,next){
        try {
            await notesService.deleteNote(req.params.id, req.userInfo.email)
        } catch (error) {
            next(error)
        }
    }
}
