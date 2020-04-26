import express from "express";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import auth0Provider from "@bcwdev/auth0provider";

export class BugsController extends BaseController {
    constructor() {
        super("api/bugs");
        this.router
            .get("", this.getAll)
            .get("/:id", this.getById)
            .put("/:id", this.changeBug)
            .delete(":id", this.deleteBug)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .post("", this.create);
    }
    async getAll(req, res, next) {
        try {
            let data = await bugsService.getAll()
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await bugsService.create(req.body)
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            let data = await bugsService.getById(req.params.id)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async changeBug(req, res, next){
        try {
            let data  = await bugsService.changeBug(req.params.id, req.body, req.userInfo.email)
        } catch (error) {
            next(error)
        }
    }
    async deleteBug(req,res,next){
        try {
            await bugsService.deleteBug(req.params.id, req.userInfo.email)
        } catch (error) {
            next(error)
        }
    }
}
