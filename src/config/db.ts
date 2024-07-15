const { default: mongoose } = require("mongoose");

export const connectToDB = async (): Promise<boolean> => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect("mongodb://localhost:27017/nextauth");

    console.log("Connect To DB Successfully :))");

    return true;
  } catch (err) {
    console.log("DB Connection Has Error =>", err);

    return false;
  }
};
