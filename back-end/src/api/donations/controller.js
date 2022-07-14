const db = require("../../db");

const Donation = db.Donation;

var ObjectId = require('mongodb').ObjectID;

exports.createDonation = (req, res) => {
    var campaign = req.body.campaign;
    var amount = req.body.amount;
    var donor = req.body.donor;
    var chainId = req.body.chainId;

    var newDonation = new Donation({
        campaign: new ObjectId(campaign),
        amount,
        donor,
        chainId
    });

    newDonation.save().then((data) => {
        return res.send({ code: 0, data, message:"" });
    }).catch((err) => {
        console.log("create donation error : ", err);
        return res.send({ code: -1, data, message: "" });
    });
}

exports.getAll = (req, res) => {
    Donation.find({}, function (err, docs) {
        if (err) {
            console.log("Donations doesn't exisit" + err.message);
            return res.send({ code: -1, data:{}, message: "Internal server Error" });
        }
        else {
            return res.send({ code:0, data: docs, message: "" });
        }
    });
}

exports.deleteOne = (req, res) => {
    Donation.deleteOne({ _id: req.body.id }, function (err) {
        if (!err)
            return res.send({ code: 0, data:{}, message:"" });
        else
            return res.send({ code:-1, data:{}, message: "Internal server Error" });
    });
}

exports.getDonationCountsOfUser = (req, res) => {
    var donor = req.body.user;
    var chainId = req.body.chainId;

    Donation.find({ donor, chainId}).count().then((data) => { 
        console.log('[getDonationCountsOfUser] count = ', data);
        return res.send({ code: 0, data, message:"" });
    }).catch((err) => {
        return res.send({ code:-1, data:0, message: "Internal server Error" });
    });
}

exports.getTotalDonatedAmountsOfUser = (req, res) => {
    var donor = req.body.user;
    var chainId = req.body.chainId;

    Donation.find({donor, chainId}, function (err, docs) {
        if (err) {
            console.log("Donations doesn't exisit" + err.message);
            return res.send({ code: -1, data:{}, message: "Internal server Error" });
        }
        else {
            if(docs.length >0)
            {
                let sum = 0;
                for(let idx = 0; idx < docs.length; idx++)
                {
                    sum += Number(docs[idx].amount);
                }
                return res.send({ code:0, data: sum, message: "" });
            }
            else {
                return res.send({ code:0, data: 0, message: "" });
            }
        }
    });
}

exports.getDonationsOfUser = (req, res) => {
    var donor = req.body.user;
    var chainId = req.body.chainId;

    Donation.find({donor, chainId}, function (err, docs) {
        if (err) {
            console.log("Donations doesn't exisit" + err.message);
            return res.send({ code: -1, data:[], message: "Internal server Error" });
        }
        else {
            if(docs.length >0)
            {
                return res.send({ code:0, data: docs, message: "" });
            }
            else {
                return res.send({ code:0, data: [], message: "" });
            }
        }
    });
}
