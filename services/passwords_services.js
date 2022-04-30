async function generatePassCode() {
  let passCode = (Math.random() + 1).toString(36).substring(2);
  return passCode;
}
module.exports = {
  generatePassCode,
};
