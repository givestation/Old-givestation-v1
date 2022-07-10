module.exports = (mongoose) => {
    const Likes = mongoose.model(
        "Likes",
        mongoose.Schema(
            {
                campaign: String,
                user: String,   //wallet address
                value: Boolean, 
                chainId: String
            },
            { timestamps: true }
        )
    );
    return Likes;
};
