"use strict";

import async from "async";
import request from "request";
import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import connect from "./dal";


export let getAllRecipes = async (req: Request, res: Response) => {
  try {
    const db = await connect();
    const recipes = await db.collection("recipes").find({}).toArray();
    if (recipes) {
      res.send(recipes);
    }
    else {
      res.status(500).send(`Failed to retrieve recipes from DB`);
    }
  }
  catch (error) {
    res.status(500).send(`Oops! Unexpected error has occured: ${error.message}`);
  }
};

export let getObjectByKey = async (req: Request, res: Response) => {
  try {
    const db = await connect();
    const recipe = await db.collection(req.params.collection).findOne({ "key": req.params.key });
    if (recipe) {
      res.send(recipe);
    }
    else {
      res.status(500).send(`Couldn't find ${req.params.key} in collection: ${req.params.collection}`);
    }
  }
  catch (error) {
    res.status(500).send(`Oops! Unexpected error has occured: ${error.message}`);
  }

};



/* FROM HERE TEMPLATE CODE */



/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples"
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
export let getFacebook = (req: Request, res: Response, next: NextFunction) => {
  const token = req.user.tokens.find((token: any) => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
    if (err) { return next(err); }
    res.render("api/facebook", {
      title: "Facebook API",
      profile: results
    });
  });
};
