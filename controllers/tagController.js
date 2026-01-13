const Joi = require("joi");
const Tags = require("../models/tag.model");

const createTagSchema = Joi.object({
    name: Joi.string().required()
});

exports.postTags = async( req, res) =>{
    try {
        const {value, error} = createTagSchema.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message});
        } 
        const existing = await Tags.findOne({ name: value.name });
        if (existing) {
            return res.status(409).json({
                error: `Tag '${value.name}' already exists.`
            });
        }
        const newTag = await new Tags(value).save();
        return res.status(201).json({message: "Tag created successfully.",tag: newTag});
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch the Database to create Tag."});
    }
}

exports.getTags = async(req,res)=>{
    try {
        const allTags = await Tags.find();
        if(allTags.length>0){
            return res.status(200).json({allTags});
        }
        return res.status(200).json({message: "NO tag exist yet."})
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the tags from Database."})
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const tagId = req.params.id;

        const deletedTag = await Tags.findByIdAndDelete(tagId);

        if (!deletedTag) {
            return res.status(404).json({ error: "Tag not found." });
        }

        res.status(200).json({
            message: "Tag deleted successfully.",
            deletedTag
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete tag." });
    }
};
