const api = require('../api-variables').api;

// const templatesList = [
//   "Foot_and_Ankle_PROMs-v0","Foot_and_Ankle_PROMs-v0-copy","IDCR Allergies List.v0","IDCR - Laboratory Order.v0","IDCR - Laboratory Test Report.v0","IDCR Problem List.v1","IDCR Procedures List.v0","NWIS - Medication Dispensation","RESET - Assessment E.v1","Vital Signs Encounter (Composition)"
// ];
const templatesList = ["Foot_and_Ankle_PROMs-v0"];

const getLocalizedNameAndDescriptionIfExist = (object, language) => {
  let name = '';
  let description = '';
  if ("localizedNames" in object) {
    if (language in object.localizedNames) {
      name = object.localizedNames[language];
    }
  }
  if ("localizedDescriptions" in object) {
    if (language in object.localizedDescriptions) {
      description = object.localizedDescriptions[language];
    }
  }
  return {name, description};
}

function tabs(width) {
  let tabString = '';
  for (i = 0; i < width; i++) {
    tabString += '\t';
  }
  return tabString;
}

function treeTrawl(tree, language, depth) {
  let {name, description} = getLocalizedNameAndDescriptionIfExist(tree, language, depth);
  let id = 'id' in tree ? tree.id : '';
  console.log(tabs(depth) + id + ': ' + name + ', ' + description);
  if ('children' in tree) {
    tree.children.map((childTree) => {
      treeTrawl(childTree, language, depth + 1);
    });
  }
}

exports.tabs = tabs;
exports.templatesList = templatesList;
exports.getLocalizedNameAndDescriptionIfExist = getLocalizedNameAndDescriptionIfExist;
exports.api = api;
exports.treeTrawl = treeTrawl;