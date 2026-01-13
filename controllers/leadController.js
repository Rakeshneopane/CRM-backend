const Lead = require("../models/lead.model");
const Comment = require("../models/comment.model");

const createLead = async(leadBody)=>{
    try {
        const newLead = await new Lead(leadBody).save();
        return newLead;
    } catch (error) {
        throw error;
    }
}

exports.postLead = async (req,res) =>{
    try {
        const { name, source, salesAgent, status, timeToClose, priority} = req.body;
        if(!salesAgent){
            return res.status(400).json({error: "Sales agent is required."});
        }
        
        if(!name || !source || !status || timeToClose == null || !priority){
            return res.status(400).json({error: "Invalid input: missing required fields"});
        }
        const savedLead = await createLead(req.body);
        res.status(201).json({message: "Lead created successfully", lead: savedLead});
    } catch (error) {
        res.status(500).json({ error:  `Failed to create the Lead: ${error.message}`});
    }
}

const getAllLeads = async(filter)=>{
    try {
        const leads = await Lead.find(filter);
        return leads;
    } catch (error) {
        throw error;
    }
}

exports.getLeads = async (req,res) =>{
    try {
        const filter = {};
        if(req.query.salesAgent) filter.salesAgent = req.query.salesAgent;
        if(req.query.status) filter.status = req.query.status;
        if(req.query.tags) filter.tags = req.query.tags.split(",");
        if(req.query.source) filter.source = req.query.source;
        
        const leads = await getAllLeads(filter);
        if(leads.length > 0)
            return res.status(200).json({leads: leads});
        return res.status(200).json({leads: []})
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the Leads"})
    }
}

const getLeadById = async(id)=>{
    try {
        const lead = await Lead.findById(id);
        return lead;
    } catch (error) {
        throw error;
    }
}

exports.getLeadById = async (req,res) =>{
    try {   
        const leadId = req.params.id;      
        const lead = await getLeadById(leadId);
        if(lead)
            return res.status(200).json({lead});
        return res.status(404).json({error: "Lead Not Found."})
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the Lead by ID"})
    }
}

const updateLeadById = async(leadId, dataToUpdate)=>{
    try {
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { $set: dataToUpdate }, {new: true, runValidators: true});
        return updatedLead;
    } catch (error) {
        throw error;
    }
}

exports.updateLead = async (req, res) => {
  try {
    const { name, source, status, priority, timeToClose } = req.body;

    if (!name || !source || !status || !priority || timeToClose == null) {
      return res.status(400).json({ error: "Invalid update data" });
    }

    const updatedLead = await updateLeadById(req.params.id, req.body);

    if (!updatedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
};

const deleteLeadById = async(leadId)=>{
    try {
        const deleteLead = await Lead.findByIdAndDelete(leadId);
        return deleteLead;
    } catch (error) {
        throw error;
    }
}

exports.deleteLead = async (req, res) => {
    try {
        const leadId = req.params.id;

        const deletedLead = await Lead.findByIdAndDelete(leadId);

        if (!deletedLead) {
            return res.status(404).json({
                error: "Lead with ID not found."
            });
        }

        // Cascade delete comments ONLY if lead existed
        await Comment.deleteMany({ lead: leadId });

        res.status(200).json({
            message: "Lead deleted successfully.",
            deleted: deletedLead
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to delete the lead."
        });
    }
};


const addComment = async(commentBody) => {
    try {
        const comments = await new Comment(commentBody).save();
        return comments;
    } catch (error) {
        throw error;
    }
}

exports.postComments = async( req, res)=>{
    try {
        const id = req.params.id;
        const {commentText, author} = req.body;
        if(!commentText || !author){
            return res.status(400).json({ error: "Missing required  fields."})
        }
        const leadFound = await Lead.findById(id);
        if(leadFound){
            const comment = await addComment({...req.body, lead: leadFound._id});
            if(comment){
                return res.status(201).json({message: "Comment created successfully", comment: comment });
            }
            return res.status(500).json({error: "Failed to create the comment."});
        }   
        return res.status(404).json({error: "Lead not found"});   
    } catch (error) {
        res.status(500).json({error: "Failed to add the comment."})
    }
}

const getAllComments = async(id)=>{
    try {
        const comments = await Comment.find({ lead: id })
                            .populate("author") 
                            .sort({ createdAt: -1 });
        return comments;
    } catch (error) {
        throw error;
    }
}

exports.getComments =  async( req, res)=>{
    try {
        const id = req.params.id;
        const lead = await Lead.findById(id);
        if(lead){
            const comment = await getAllComments(id);
            if(comment.length > 0){
                return res.status(200).json({message: "Comment found successfully.", comment: comment });
            }
            return res.status(200).json({message: "No comment added to the Lead.", comment: []})
        } 
        return res.status(404).json({error: "Lead not found."});       
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the comments"})
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { leadId, commentId } = req.params;

        // (Optional but recommended) check lead exists
        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: "Lead not found." });
        }

        const deletedComment = await Comment.findOneAndDelete({
            _id: commentId,
            lead: leadId
        });

        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        res.status(200).json({
            message: "Comment deleted successfully.",
            deletedComment
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment." });
    }
};
