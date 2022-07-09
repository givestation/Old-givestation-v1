module.exports = (mongoose) => {
  const Campaign = mongoose.model(
    "Campaign",
    mongoose.Schema(
      {
        name: String,
        description: String,
        imageURL: String,
        creator: String,  //wallet address
        chainId: String,
        minimum: { type: Number, default: 0 },
        target: { type: Number, default: 0 },
        category: String,
      },
      { timestamps: true }
    )
  );

  return Campaign;
};
