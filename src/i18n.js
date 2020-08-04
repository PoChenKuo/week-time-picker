const sourceFile = ["city", "demo", "calendar"];
const messages = {
  "zh-tw": {},
  "us-en": {},
};
for (let ind = 0; ind < sourceFile.length; ind++) {
  const filename = sourceFile[ind];
  const translateWords = require(`./i18n/${filename}.json`);
  for (const lang in translateWords) {
    if (messages[lang]) {
      const classifyData = {};
      classifyData[filename] = translateWords[lang];

      messages[lang] = Object.assign(messages[lang], classifyData);
    }
  }
}
export default messages;
