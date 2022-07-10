const db = require("../../db");

const Campaign = db.Campaign;

var ObjectId = require('mongodb').ObjectID;

exports.createCampaign = (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var imageURL = req.body.imageURL;
    var minimum = req.body.minimum;
    var target = req.body.target;
    var creator = req.body.creator;
    var category = req.body.category;
    var address = req.body.address;
    var chainId = req.body.chainId;

    var newCampaign = new Campaign({
        name, description, imageURL, minimum, target, creator, category, address, chainId
    });

    newCampaign.save().then((data) => {
        return res.send({ code: 0, data, message:"" });
    }).catch((err) => {
        console.log("create donation error : ", err);
        return res.send({ code: -1, data, message: "" });
    });
}

exports.getAll = (req, res) => {
    Campaign.find({}, function (err, docs) {
    if (err) {
        console.log("Campaign doesn't exisit" + err.message);
        return res.send({ code: -1, data:{}, message: "Internal server Error" });
    }
    else {
        return res.send({ code:0, data: docs, message: "" });
    }
});
}

exports.deleteOne = (req, res) => {
    // console.log("Delete likes 0");
    Campaign.deleteOne({ _id: req.body.id }, function (err) {
        if (!err)
            return res.send({ code: 0, data:{}, message:"" });
        else
            return res.send({ code: -1, data:{}, message:"Internal Server Error" });
    });
}

exports.getCampaignCountsOfUser = (req, res) => {
    var creator = req.body.user;
    var chainId = req.body.chainId;
    
    try{
        var total = Campaign.count({ creator, chainId});      
        return res.send({ code: 0, data:total, message:"" });
    }catch(err)
    {
        return res.send({ code:-1, data:{}, message: "Internal server Error" });
    }
}

exports.getCampaignsOfUser = (req, res) => {
    var creator = req.body.user;
    var chainId = req.body.chainId;

    Campaign.find({creator, chainId}, function (err, docs) {
        if (err) {
            console.log("Campaign doesn't exisit" + err.message);
            return res.send({ code: -1, data:{}, message: "Internal server Error" });
        }
        else {
            return res.send({ code:0, data: docs, message: "" });
        }
    });
}

exports.update = (req, res) => {    
    var _id = req.body._id;
    var incomeData = req.body;
    delete incomeData._id;
    Campaign.findByIdAndUpdate(
        _id,
        {
            ...incomeData
        },
        { useFindAndModify: false }
    )
        .then((data) => {
            if (!data) {
                return res.send({
                    code:0,
                    data,
                    message: `Cannot update Campaign with id = ${_id}. Maybe Campaign was not found.`,
                });
            } else return res.send({ message: "Campaign was updated successfully" });
        })
        .catch((err) => {
            return res.send({
                code:-1,
                data:{},
                message: "Error updating Campaign with id = " + _id,
            });
        });
}
