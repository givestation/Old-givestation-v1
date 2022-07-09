const db = require("../../db");

const Donation = db.Donation;

var ObjectId = require('mongodb').ObjectID;

exports.createDonation = (req, res) => {
    var camapaignId = req.body.camapaignId;
    var amount = req.bod.amount;
    var donor = req.body.donor;

    var newDonation = new Donation({
        campaign: ObjectId(camapaignId),
        amount,
        donor
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
    // console.log("Delete likes 0");
    Donation.deleteOne({ _id: req.body.id }, function (err) {
        if (!err)
            return res.send({ code: 0, data:{}, message:"" });
        else
            return res.send({ code:-1, data:{}, message: "Internal server Error" });
    });
}
