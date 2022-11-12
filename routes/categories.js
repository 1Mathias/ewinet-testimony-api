const router = require("express").Router();
const Category = require("../models/Category");
const Post = require("../models/Post");
const User = require("../models/User")

//create category
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);

    }
});

//update
router.put("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        console.log(category._id);
        if (category._id == req.params.id) {
            try {
                const updateCategory = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json(updateCategory);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Category not Found");
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

//delete category

router.delete("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);
    try {
        if (category._id == req.params.id) {
            try {
                await category.delete();
                res.status(200).json("Category has been Deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("Category not Found");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

//get category

router.get("/", async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router