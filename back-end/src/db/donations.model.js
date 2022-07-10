module.exports = (mongoose) => {
    const Donation = mongoose.model(
        "Donation",
        mongoose.Schema(
            {
                campaign: String,
                donor: String,  //wallet address
                amount: Number, 
                chainId: String
            },
            { timestamps: true }
        )
    );
    return Donation;
};
