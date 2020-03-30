/**
 * @file Provides functions for processing webTemplate
 * @author Charlie Cowan <charlie.g.cowan@gmail.com>
 */

/**
 * Get the value of an object property if it exists. Otherwise return empty string.
 *
 * @param {*} object
 * @param {*} propertyName
 */
const getObjectPropertyIfExists = (object, propertyName) => (propertyName in object
  ? object[propertyName]
  : '');

/**
 * Get the appropriate name for the given language for an object within the template tree, if
 * provided. Otherwise return empty string.
 *
 * @param {*} object
 * @param {*} language
 */
export function getLocalizedNameIfExists(object, language) {
  if ('localizedNames' in object) {
    return (getObjectPropertyIfExists(object.localizedNames, language));
  }
  return 'localizedName' in object
    ? getObjectPropertyIfExists(object, 'localizedName')
    : getObjectPropertyIfExists(object, 'name');
}

/**
 * Get the appropriate description for the given language for an object within the template tree,
 * if provided. Otherwise return empty string.
 *
 * @param {*} object
 * @param {*} language
 */
export function getLocalizedDescriptionIfExists(object, language) {
  if ('localizedDescriptions' in object) {
    return getObjectPropertyIfExists(object.localizedDescriptions, language);
  }
  return 'localizedDescription' in object
    ? getObjectPropertyIfExists(object, 'localizedDescriptions')
    : getObjectPropertyIfExists(object, 'description');
}

/**
 * Generate a string that is as many tabs as specified by width (>= 0)
 * @param {*} width Integer greater than or equal to 0
 */
export function padNTabsLeft(width) {
  let tabString = '';
  for (let i = 0; i < width; i += 1) {
    tabString += '\t';
  }
  return tabString;
}

/**
 * If the current subtree has an id attribute in the JSON, then return it. Otherwise return empty
 * string.
 * @param {*} tree
 */
export function getIdIfExists(tree) {
  return getObjectPropertyIfExists(tree, 'id');
}

/**
 * Get path to write composition to from parent list and object id
 * @param {*} parentTrace
 * @param {*} id
 */
export function getAqlPathFromParentTrace(parentTrace = [], id = '') {
  return parentTrace.concat([id])
    .filter((e) => e !== '')
    .join('/');
}

/**
 * Return true if an object has an 'inputs' attribute, false otherwise
 * @param {*} object
 */
export function objectHasInputs(object) {
  return 'inputs' in object;
}

// TODO: ordinals
// TODO: value descriptions
// TODO: mandatory fields (min multiplicity > 1)

/**
 * convert a tree (with inputs) from a webTemplate into an input, in a json representation
 * @param {*} totalTree
 * @param {*} language
 */
export function inputToJsonFormInput(totalTree, language) {
  const tree = totalTree.inputs;
  let returnObject = {};
  const modifiers = {}; // Modifiers aren't neccesary but can make interaction easier e.g. ordinals
  const validations = {};
  if (objectHasInputs(tree)) {
    tree.inputs.forEach((input) => {
      const typeFromInput = input.type;
      returnObject = {
        name: totalTree.aqlTrace,
        // key: tree.id,
        key: totalTree.aqlTrace,
        label: getLocalizedNameIfExists(tree, language),
        help: getLocalizedDescriptionIfExists(tree, language),
      };
      // TODO: look into this
      if ('inContext' in tree) {
        if (tree.inContext) {
          if (tree.name === undefined) {
            returnObject.label = tree.id === undefined ? '[no name found]' : tree.id;
          } else {
            returnObject.label = tree.name;
          }
          returnObject.help = 'Contextual value';
          returnObject.contextual = true;
        }
      }
      // TODO: for all, required field
      switch (typeFromInput) {
        case 'CODED_TEXT':
          returnObject.name += '|code';
          returnObject.type = 'options';
          if ('list' in input) {
            returnObject.inputOptions = input.list.map((inputFromList) => {
              const returnInputObject = {
                // TODO: make this language independent
                value: inputFromList.value,
                label: inputFromList.label,
              };
              if ('ordinal' in inputFromList) {
                returnInputObject.ordinal = inputFromList.ordinal;
              }
              return returnInputObject;
            });
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
            returnObject.inputOptions = input.list.map((subInput) => ({
              value: subInput.value,
              label: subInput.label,
            }));
          }
          returnObject.suggestions = 'list' in input;
          returnObject.type = 'text';
          if ('listOpen' in input) {
            returnObject.allowFreeText = input.listOpen;
          } else {
            returnObject.allowFreeText = true;
          }
          break;
        case 'INTEGER':
          returnObject.type = 'number';
          validations.numberType = 'integer';
          // if ('validation' in input) {
          //   if ('range' in input.validation) {
          //     validations.range = {input.validation.range}
          //   }
          // }
          // TODO: implement validation, max, min, step etc.
          break;
        case 'DECIMAL':
          returnObject.type = 'number';
          validations.numberType = 'decimal';
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
    if (tree.rmType === 'DV_ORDINAL') {
      modifiers.ordinal = true;
    }
    validations.required = tree.min !== 0;
    returnObject.modifiers = modifiers;
    returnObject.validations = validations;
    return returnObject;
  }
  return null;
}

/**
 * Returns whether a JSON tree has a 'children' element on its top level
 * @param {*} tree
 */
function hasChildren(tree) {
  return 'children' in tree;
}

/**
 * Helper function to crawl recursively through a JSON webTemplate by getting the top level element
 * and seeing whether it has a children element, then iterating through those with the same
 * function, getting flat list of inputs
 * @param tree
 * @param language
 * @param parentTrace
 * @param inputs
 * @returns {*}
 */
export function treeTrawlGettingFlatInputsAux(tree, language, parentTrace, inputs) {
  const id = getIdIfExists(tree);
  if (objectHasInputs(tree)) {
    inputs.push({
      inputs: tree,
      aqlTrace: getAqlPathFromParentTrace(parentTrace, id),
    });
  }
  if (hasChildren(tree)) {
    tree.children.forEach((childTree) => {
      inputs.concat(
        treeTrawlGettingFlatInputsAux(childTree, language, parentTrace.concat([id]), inputs),
      );
    });
  }
  return inputs;
}

/**
 * Crawl recursively through a JSON webTemplate by getting the top level element and seeing
 * whether it has a children element, then iterating through those with the same function, getting
 * flat list of inputs
 * @param tree
 * @param language
 * @param parentTraceParam
 * @returns {[]}
 */
export function treeTrawlGettingFlatInputs(tree, language, parentTraceParam) {
  const parentTrace = parentTraceParam || [];
  const result1 = [];
  treeTrawlGettingFlatInputsAux(tree, language, parentTrace, [])
    .forEach((input) => {
      result1.push({ aqlPath: input.inputs.aqlPath, ...inputToJsonFormInput(input, language) });
    });
  return result1;
}

/**
 * Trawl recursively through a JSON webTemplate by getting the top level element and seeing whether
 * it has a children element, then iterating through those with the same function, getting a
 * structured list of inputs
 * @param tree
 * @param language
 * @param parentTraceParam
 */
export function treeTrawlGettingStructuredInputs(tree, language, parentTraceParam) {
  const parentTrace = parentTraceParam || [];
  const resultTree = {};
  resultTree.id = tree.id;
  resultTree.name = getLocalizedNameIfExists(tree, language);
  resultTree.aqlPath = tree.aqlPath ? tree.aqlPath : '';
  if (objectHasInputs(tree)) {
    resultTree.inputs = inputToJsonFormInput({
      inputs: tree,
      aqlTrace: getAqlPathFromParentTrace(parentTrace, tree.id),
    }, 'en');
    resultTree.aqlTrace = getAqlPathFromParentTrace(parentTrace, tree.id);
  }
  if (hasChildren(tree)) {
    resultTree.children = tree.children.map(
      (childTree) => treeTrawlGettingStructuredInputs(
        childTree,
        language,
        parentTrace.concat([tree.id]),
      ),
    );
  }
  if (tree.inContext) {
    resultTree.contextual = true;
  }
  return resultTree;
}
