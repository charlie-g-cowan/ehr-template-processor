const api = require('../api-variables').api;

/**
 * Get the appropriate name for the given language for an object within the template tree, if provided. Otherwise return empty string.
 * 
 * @param {*} object 
 * @param {*} language 
 */
const getLocalizedNameIfExists = (object, language) => {
  let name = '';
  if ("localizedNames" in object) {
    if (language in object.localizedNames) {
      name = object.localizedNames[language];
    }
  }
  return name;
}

/**
 * Get the appropriate description for the given language for an object within the template tree, if provided. Otherwise return empty string.
 * 
 * @param {*} object 
 * @param {*} language 
 */
const getLocalizedDescriptionIfExists = (object, language) => {
  let description = '';
  if ("localizedDescriptions" in object) {
    if (language in object.localizedDescriptions) {
      description = object.localizedDescriptions[language];
    }
  }
  return description;
}

/**
 * Generate a string that is as many tabs as specified by width (>= 0)
 * 
 * @param {*} width Integer greater than or equal to 0
 */
function tabs(width) {
  let tabString = '';
  for (i = 0; i < width; i++) {
    tabString += '\t';
  }
  return tabString;
}

function treeTrawl(tree, language, depth) {
  let name = getLocalizedNameIfExists(tree, language);
  let description = getLocalizedDescriptionIfExists(tree, language);
  let id = 'id' in tree ? tree.id : '';
  console.log(tabs(depth) + id + ': ' + name + ', ' + description);
  if ('children' in tree) {
    tree.children.map((childTree) => {
      treeTrawl(childTree, language, depth + 1);
    });
  }
}

exports.tabs = tabs;
exports.api = api;
exports.treeTrawl = treeTrawl;
exports.getLocalizedNameIfExists = getLocalizedNameIfExists;
exports.getLocalizedDescriptionIfExists = getLocalizedDescriptionIfExists;