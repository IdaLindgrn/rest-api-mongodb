const DanceClass = require("../models/DanceClass");
const { NotFoundError } = require ("../utils/errors");

exports.getAllActiveClasses = async (req, res, next) => {
    
    const activeClasses = await DanceClass.find({activeClass: true})
    const totalActiveClasses = await DanceClass.find({activeClass: true}).countDocuments();

    try {
    if(!activeClasses) { throw new NotFoundError("There are no active dance classes available for the moment 💔") }

    return res.json({
        data: activeClasses,
        meta: {
            count: activeClasses.length,
            total: totalActiveClasses
        },
        
    })
}   catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.getAllClasses = async (req, res, next) => {
   
    const classes = await DanceClass.find()
    const totalClasses = await DanceClass.countDocuments();

    try {
    if(!classes) { throw new NotFoundError("Could not find any dance classes 💔"); }
    
    return res.json({
        data: classes,
        meta: {
            count: classes.length,
            total: totalClasses
        }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: error.message,
    });
  }
}

