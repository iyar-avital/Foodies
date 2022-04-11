let mongo = require("mongoose");
(async () => {
  try {
      let db = await mongo.createConnection('mongodb://localhost/Flowers-shopping');
      await db.dropDatabase();
      logandexit('DB cleared');
  } catch (err) {
      logandexit("Failed: " + err);
  }
})();
function logandexit(str) {
    console.log(str);
    process.exit(0);
}
