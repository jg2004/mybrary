const express = require("express");
const Author = require("../models/author");
const router = express.Router();

//get all authors
router.get("/", async (req, res) => {
  const searchOptions = {};

  const { name = "" } = req.query;
  searchOptions.name = new RegExp(name, "i");
  const authors = await Author.find(searchOptions, "name");
  console.log(authors);

  res.render("authors/index", { authors: authors, search: req.query });
});

//New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

///Create author route

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    //  res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors/`);
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;
