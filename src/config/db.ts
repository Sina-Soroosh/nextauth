const { default: mongoose } = require("mongoose");

export const connectToDB = async (): Promise<boolean> => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect(
      "mongodb://root:Q60NaAri6kKbdiNcbhobj5vS@hotaka.liara.cloud:34794/my-app?authSource=admin"
    );

    console.log("Connect To DB Successfully :))");

    return true;
  } catch (err) {
    console.log("DB Connection Has Error =>", err);

    return false;
  }
};
