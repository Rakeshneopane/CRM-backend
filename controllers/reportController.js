const Lead = require("../models/lead.model");

exports.getReportLastWeek = async( req, res )=>{
    try {
        const sevenDaysAgo = new Date(Date.now() - (7*24*60*60*1000));
        const reportLastWeek = await Lead.find({updatedAt: {$gte: sevenDaysAgo}, status: "Closed"});
        if(reportLastWeek.length > 0){
            return res.status(200).json({reportLastWeek});
        }
        return res.status(200).json({message: "No report were found to have been closed by last week."});      
    } catch (error) {
        res.status(500).json({error: "Could not fetch the report."})
    }
}
exports.getReportPipeline = async( req,res ) =>{
    try {
        const reportPipeline = await Lead.find({status :{$ne: "Closed"}});
        if(reportPipeline.length > 0){
            return res.status(200).json({"totalLeadsInPipeline" : reportPipeline.length});
        }
        return res.status(200).json({message: "No Pipeline exist."})        
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch the pipeline."})
    }
}
exports.getReportClosedByAgent = async(req,res)=>{
    try {
        const allReport = await Lead.find();
        const closedReport = allReport.filter(r=> r.status ==="Closed");
        const reportClosedByAgent = closedReport.reduce((acc,curr)=>{
            const agent = curr.salesAgent;
            if(!acc[agent]) acc[agent]= [];
            acc[agent].push(curr);
            return acc;
        }, {}) ;
        if(Object.keys(reportClosedByAgent).length > 0){
            return res.status(200).json({reportClosedByAgent});
        }
        return res.status(200).json({message: "Couldn't find the reports"})
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch the report closed by Agent."})
    }
}