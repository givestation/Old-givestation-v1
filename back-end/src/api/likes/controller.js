const db = require("../../db");

const Likes = db.Likes;

var ObjectId = require('mongodb').ObjectID;

exports.setLikes = (req, res) => {
    var campaign = req.body.campaign;
    var user = req.body.user;
    var value = req.body.value;
    var chainId = req.body.chainId;

    var newLikes = new Likes({
        campaign: new ObjectId(campaign),
        user,
        value,
        chainId
    });

    Likes.find({ 
        campaign, user, chainId
    }).then(async (docs) =>{
        // console.log("[Updating likes] 00 docs = ", docs);
        if(docs.length>0)
        {
            try {
                await Likes.updateOne(
                    {_id: docs[0]._id},
                    {
                        $set: {
                            value
                        },
                        $currentDate: {
                            ends: true,
                        }
                    },
                    { upsert: true }
                );
                return res.send({ code: 0, data:{}, message: "" });
            } catch (err) {
                return res.send({ code: -1, data:{}, message: "Internal server Error" });
            }
        }else{            
            newLikes.save().then((data) => {
                return res.send({ code: 0, data, message:"" });
            }).catch((err) => {
                return res.send({ code: -1, data:{}, message: "Internal server Error" });
            });
        }
    }).catch((err) => {
        return res.send({ code: -1, data:{}, message: "Internal server Error" });
    })

}

exports.getAll = (req, res) => {
    Likes.find({}, function (err, docs) {
        if (err) {
            console.log("Likes doesn't exisit" + err.message);
            return res.send({ code: -1, data:{}, message: "Internal server Error" });
        }
        else {
            return res.send({ code:0, data: docs, message: "" });
        }
    });
}

exports.deleteOne = (req, res) => {
    // console.log("Delete likes 0");
    Likes.deleteOne({ _id: req.body.id }, function (err) {
        if (!err)
            return res.send({ code:0, data:{}, message:"" });
        else
            return res.send({ code:-1, data:{}, message:"" });
    });
}

exports.getAllLikedCampaigns = (req, res) => {
    var user = req.body.user;
    var chainId = req.body.chainId;

    Likes.find({ user, chainId, value:true }, function (err, docs) {
        if (err) {
            console.log("Likes doesn't exisit" + err.message);
            return res.send({ code: -1, data:{}, message: "Internal server Error" });
        }
        else {
            return res.send({ code:0, data: docs, message: "" });
        }
    });
}
