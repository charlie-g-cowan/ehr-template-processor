/**
 * @file Provides functions for pulling webTemplate and processing it
 * @author Charlie Cowan <charlie.g.cowan@gmail.com>
 */

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

// TODO: Test this
/** 
 * If a 'children' object exists then iterate through the children and then trawl each of them (two-step recursion)
 * 
 * @param {*} tree JSON tree of template section
 * @param {*} language Language two-letter identifier e.g. en
*/
function trawlChildrenIfExist(tree, language, depth, parentTrace) {
  if ('children' in tree) {
    tree.children.map((childTree) => {
      treeTrawl(childTree, language, depth + 1, parentTrace);
    });
  }
}

// TODO: Test this
/**
 * If the current subtree has an id attribute in the JSON, then return it. Otherwise return empty string.
 * @param {*} tree 
 */
function getIdIfExists(tree) {
  return 'id' in tree ? tree.id : '';
}

//TODO: Test this
/**
 * Log to console the details of the part of the JSON tree currently being processed
 * @param {*} depth 
 * @param {*} id 
 * @param {*} name 
 * @param {*} description 
 */
function logLocationInTree(depth, id, name, description) {
  console.log(tabs(depth) + id + ': ' + name + ', ' + description);
}

function treeTrawl(tree, language, depth, parentTrace) {
  let name = getLocalizedNameIfExists(tree, language);
  let description = getLocalizedDescriptionIfExists(tree, language);
  let id = getIdIfExists(tree);
  logLocationInTree(depth, id, name, parentTrace);
  trawlChildrenIfExist(tree, language, depth, parentTrace.concat([id]));
}



exports.tabs = tabs;
exports.api = api;
exports.treeTrawl = treeTrawl;
exports.getLocalizedNameIfExists = getLocalizedNameIfExists;
exports.getLocalizedDescriptionIfExists = getLocalizedDescriptionIfExists;

