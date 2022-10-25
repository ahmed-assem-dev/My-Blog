import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentails = JSON.parse(fs.readFileSync("./credentails.json"));
admin.initializeApp({ credential: admin.credential.cert(credentails) });

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

let dbUrl =
  "mongodb+srv://MyBlog-Ahmed:nY3oUSIBfRz6UiGt@myblogdb.sbuoepi.mongodb.net/?retryWrites=true&w=majority";
let Article = mongoose.model("Article", {
  name: String,
  upvotes: Number,
  comments: Array,
  upvoteIds: Array,
  canUpvote: Boolean,
});
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;
  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};
  next();
});

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await Article.findOne({ name });
  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = (await uid) && !upvoteIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await Article.findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);
    if (canUpvote) {
      await Article.updateOne(
        { name },
        {
          $inc: { upvotes: 1 },
          $push: { upvoteIds: uid },
        }
      );
    }

    const updatedArticle = await Article.findOne({ name });
    res.json(updatedArticle);
  } else {
    res.send("That article doesn't exist");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;

  await Article.updateOne(
    { name },
    {
      $push: { comments: { postedBy: email, text } },
    }
  );
  Article.findOne({ name }, (err, article) => {
    if (article) {
      res.json(article);
    } else {
      res.send(`No article with the name ${name} was found! / ${err}`);
    }
  });
});

app.post("/api/articles/newarticle", (req, res) => {
  let article = new Article(req.body);
  article.save((err) => {
    if (err) sendStatus(500);

    res.send("success");
  });
});
const PORT = process.env.PORT || 8000;

mongoose.connect(dbUrl, (err) => {
  console.log("Connected to database.", err);
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
