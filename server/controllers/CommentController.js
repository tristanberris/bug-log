import express from "express";
import BaseController from "../utils/BaseController";
import { commentService } from "../services/CommentService";
import auth0Provider from "@bcwdev/auth0provider";

export class CommentController extends BaseController {
    constructor() {
        super("api/comments");
        this.router
            .get("", this.getAll)
            .delete("/:id", this.delete)
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
            req.body.creatorEmail = req.userInfo.email;
            await commentService.create(req.body)
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await commentService.delete(req.params.id)
            return res.send("Successfully deleted")
        } catch (error) {
            next(error)
        }
    }
}
