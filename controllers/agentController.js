const Joi = require("joi");
const SalesAgent = require("../models/salesAgent.model");

const createAgentSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({tlds : {allow: false}}).required()
})

const createAgent = async(agent) =>{
    try {
        const newAgent = await new SalesAgent(agent).save();
        return newAgent;        
    } catch (error) {
        throw error;        
    }
}

exports.postAgents = async(req, res)=>{
    try {
        const { error, value } = createAgentSchema.validate(req.body);
        if(error){
            return res.status(400).json({error: error.details[0].message});
        }
        const {name, email} = value;
        const alreadyExist = await SalesAgent.findOne({email});
        if(alreadyExist){
            return res.status(409).json({error: `Sales agent with email ${email} already exists.`});        
        }
        const newAgent = await createAgent(value);
        return res.status(201).json({message: "Agent created sucessfully", agent: newAgent});
    } catch (error) {
        res.status(500).json({error: "Failed to create the agent."})
    }
}

const getAllAgents = async()=>{
    try {
        const allAgents = await SalesAgent.find();
        return allAgents;
    } catch (error) {
        throw error;
    }
}

exports.getAgents = async(req,res)=>{
    try {
        const allAgents = await getAllAgents();
        if(allAgents.length > 0){
            return res.status(200).json({allAgents});
        }        
        res.status(200).json({message: "No agents are created yet."});
    } catch (error) {
        res.status (500).json({error: "Could not fetch the agents."});
    }
}

exports.deleteAgent = async (req, res) => {
    try {
        const agentId = req.params.id;

        const deletedAgent = await SalesAgent.findByIdAndDelete(agentId);

        if (!deletedAgent) {
            return res.status(404).json({ error: "Sales agent not found." });
        }

        res.status(200).json({
            message: "Sales agent deleted successfully.",
            deletedAgent
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete sales agent." });
    }
};
