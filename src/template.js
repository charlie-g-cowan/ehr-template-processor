/**
* @file Provides functions for pulling webTemplate and processing it
* @author Charlie Cowan <charlie.g.cowan@gmail.com>
*/
const {environment} = require("../api-variables");

/**
* Get the value of an object property if it exists. Otherwsie return empty string.
*
* @param {*} object
* @param {*} propertyName
*/
const getObjectPropertyIfExists = (object, propertyName) => {
  return propertyName in object ? object[propertyName] : ''
}

/**
* Get the appropriate name for the given language for an object within the template tree, if provided. Otherwise return empty string.
*
* @param {*} object
* @param {*} language
*/
const getLocalizedNameIfExists = (object, language) => {
  return ("localizedNames" in object) ? (getObjectPropertyIfExists(object.localizedNames, language)) : ''
}

/**
* Get the appropriate description for the given language for an object within the template tree, if provided. Otherwise return empty string.
*
* @param {*} object
* @param {*} language
*/
const getLocalizedDescriptionIfExists = (object, language) => {
  return ("localizedDescriptions" in object) ? (getObjectPropertyIfExists(object.localizedDescriptions, language)) : ''

}

/**
* Generate a string that is as many tabs as specified by width (>= 0)
*
* @param {*} width Integer greater than or equal to 0
*/
function padNTabsLeft(width) {
  let tabString = '';
  for (let i = 0; i < width; i++) {
    tabString += '\t';
  }
  return tabString;
}

/**
* If the current subtree has an id attribute in the JSON, then return it. Otherwise return empty string.
* @param {*} tree
*/
function getIdIfExists(tree) {
  return getObjectPropertyIfExists(tree, 'id');
}

//TODO: Test this
/**
* Log to console the details of the part of the JSON tree currently being processed
* @param {*} depth
* @param {*} id
* @param {*} name
* @param {*} description
*/
function locationInTree(depth, id, name, description, parentTrace) {
  return padNTabsLeft(depth) + id + ': ' + name + ', ' + ', ' + description + ', ' + getAqlPathFromParentTrace(parentTrace, id);
}

/**
* Get path to write composition to from parent list and object id
* @param {*} parentTrace
* @param {*} id
*/
function getAqlPathFromParentTrace(parentTrace = [], id = '') {
  return parentTrace.concat([id]).filter((e) => { return e != '' }).join('/');
}

/**
* Return true if an object has an 'inputs' attribute, false otherwise
* @param {*} object
*/
function objectHasInputs(object) {
  return 'inputs' in object;
}

/**
* Trawl recursively through a JSON webTemplate by getitng the top level element and seeing whether it has a children element, then iterating through those with the same function, logging each time
* @param {*} tree
* @param {*} language
* @param {*} depth
* @param {*} parentTrace
*/
function debugTreeTrawlLogAll(tree, language, depth, parentTrace, inputs) {
  let name = getLocalizedNameIfExists(tree, language);
  let description = getLocalizedDescriptionIfExists(tree, language);
  let id = getIdIfExists(tree);
  console.log(locationInTree(depth, id, name, description, parentTrace));
  if ('children' in tree) {
    tree.children.map((childTree) => {
      debugTreeTrawlLogAll(childTree, language, depth + 1, parentTrace, inputs);
    });
  }
}

/**
* convert a tree (with inputs) from a webTemplate into an input, in a json representation
* @param {*} totalTree
* @param {*} language
*/
function inputToJsonFormInput(totalTree, language) {
  const tree = totalTree.inputs;
  let returnObject = {};
  if (objectHasInputs(tree)) {
    tree.inputs.map((input) => {
      const typeFromInput = input.type;
      returnObject = {
        name: totalTree.aqlTrace,
        // key: tree.id,
        key: totalTree.aqlTrace,
        label: getLocalizedNameIfExists(tree, language),
        help: getLocalizedDescriptionIfExists(tree, language),
      }
      //TODO: look into this
      if ('inContext' in tree) {
        if (tree.inContext) {
          returnObject.label = tree.name == undefined ? (tree.id == undefined ? '[no name found]' : tree.id) : tree.name;
          returnObject.help = "Contextual value";
        }
      }
      // TODO: for all, required field
      switch(typeFromInput) {
        case 'CODED_TEXT':
        returnObject.name = returnObject.name + "|code";
        returnObject.type = 'options';
        if ('list' in input) {
          returnObject.inputOptions = input.list.map((input) => ({
            value: input.value,
            label: input.label
          }));
        }
        break;
        case 'BOOLEAN':
        returnObject.type = 'boolean';
        returnObject.disabledValues = []; // e.g. true, false // TODO: implement this
        // TODO: default value
        break;
        case 'TEXT':
        // TODO: implement suffixes, suggested values, terminology,
        if ('list' in input) {
          returnObject.inputOptions = input.list.map((input) => ({
            value: input.value,
            label: input.label
          }));
        }
        returnObject.suggestions = 'list' in input;
        returnObject.type = 'text';
        if ("listOpen" in input) {
          returnObject.allowFreeText = input.listOpen;
        } else {
          returnObject.allowFreeText = true;
        }
        break;
        case 'INTEGER':
        returnObject.type = 'number';
        returnObject.numberType = 'integer';
        // TODO: implement validation, max, min, step etc.
        break;
        case 'DECIMAL':
        returnObject.type = 'number';
        returnObject.numberType = 'decimal';
        // TODO: implement validation, max, min, precision etc.
        break;
        case 'DATE':
        returnObject.type = 'date';
        // TODO: implement pattern validation
        break;
        case 'DATETIME':
        returnObject.type = 'datetime';
        break;
        case 'NONE':
        returnObject.type = 'text';
        break;
        default:
        returnObject.type = 'text';
        break;
      }
    });
    return returnObject;
  }
}

/**
* Returns whether a JSON tree has a 'children' element on its top level
* @param {*} tree
*/
function hasChildren(tree) {
  return 'children' in tree;
}

/**
* Trawl recursively through a JSON webTemplate by getting the top level element and seeing whether it has a children element, then iterating through those with the same function, getting flat list of inputs
* @param {*} tree
* @param {*} language
* @param {*} parentTrace
*/
function treeTrawlGettingFlatInputs(tree, language, parentTrace, inputs) {
  let id = getIdIfExists(tree);
  if (objectHasInputs(tree)) {
    inputs.push({inputs: tree, aqlTrace: getAqlPathFromParentTrace(parentTrace, id)});
  }
  if (hasChildren(tree)) {
    tree.children.map((childTree) => {
      inputs.concat(treeTrawlGettingFlatInputs(childTree, language, parentTrace.concat([id]), inputs));
    });
  }
  return inputs;
}

exports.padNTabsLeft = padNTabsLeft;
exports.environment = environment;
exports.treeTrawlGettingFlatInputs = treeTrawlGettingFlatInputs;
exports.getLocalizedNameIfExists = getLocalizedNameIfExists;
exports.getLocalizedDescriptionIfExists = getLocalizedDescriptionIfExists;
exports.getIdIfExists = getIdIfExists;
exports.objectHasInputs = objectHasInputs;
exports.inputToJsonFormInput = inputToJsonFormInput;
exports.getAqlPathFromParentTrace = getAqlPathFromParentTrace;
