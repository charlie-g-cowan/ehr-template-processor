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
  if ("localizedNames" in object) {
    if (language in object.localizedNames) {
      return object.localizedNames[language];
    }
  }
  return '';
}

/**
 * Get the appropriate description for the given language for an object within the template tree, if provided. Otherwise return empty string.
 * 
 * @param {*} object 
 * @param {*} language 
 */
const getLocalizedDescriptionIfExists = (object, language) => {
  if ("localizedDescriptions" in object) {
    if (language in object.localizedDescriptions) {
      return object.localizedDescriptions[language];
    }
  }
  return '';
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
function logLocationInTree(depth, id, name, description, parentTrace) {
  console.log(tabs(depth) + id + ': ' + name + ', ' + parentTrace.join('/') + '/' + id);
}

/**
 * Trawl recursively through a JSON webTemplate by getitng the top level element and seeing whether it has a children element, then iterating through those with the same function
 * @param {*} tree 
 * @param {*} language 
 * @param {*} depth 
 * @param {*} parentTrace 
 */
function treeTrawl(tree, language, depth, parentTrace) {
  let name = getLocalizedNameIfExists(tree, language);
  let description = getLocalizedDescriptionIfExists(tree, language);
  let id = getIdIfExists(tree);
  logLocationInTree(depth, id, name, description, parentTrace);
  trawlChildrenIfExist(tree, language, depth, parentTrace.concat([id]));
}



exports.tabs = tabs;
exports.api = api;
exports.treeTrawl = treeTrawl;
exports.getLocalizedNameIfExists = getLocalizedNameIfExists;
exports.getLocalizedDescriptionIfExists = getLocalizedDescriptionIfExists;
exports.getIdIfExists = getIdIfExists
