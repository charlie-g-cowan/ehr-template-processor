# EHR Template Processor

This module takes a [webTemplate in Think!EHR[(https://gitlab.better.care/better-docs/tools-docs/blob/master/form-specification/form-specification.adoc)] style of a template based on the openEHR standard, and converts it into simplified JSON that represents the key data needed to represent that template as inputs (e.g. in HTML, in an app).

## Installation
Simply clone (or add as submodule), and run `npm install`.

## Tests
Run `npm test` to run tests, run `npm run-script coverage` to run coverage

## API
#### <a id="treeTrawlGettingStructuredInputs">treeTrawlGettingStructuredInputs(tree, language[, parentTrace])</a>
#####Arguments:
1. `tree`: a JSON tree that is the webTemplate property of a response from a get request for a template from a CDR.
2. `language`:  an ISO language that is supported by that webTemplate e.g. 'en', 'fr'
3. `aqlTrace` \[optional, rarely used, not reccomended\]: list of the node names that as you go down the tree, so the aql location can be given (e.g. for committing a composition). Defaults to [], only change if you need something prepended before each aql location.
#####Returns:
A simplified, structured JSON structure for use in generating HTML/React/other input interfaces.
#####Example:
Let `result` be the body/data of a successful call to `[cdr url]/rest/v1/template/[template name]`:
```js
    let template = result.webTemplate;
    const result = treeTrawlGettingStructuredInputs(template.tree, template.defaultLanguage);
```

#### <a id="treeTrawlGettingFlatInputs">treeTrawlGettingFlatInputs(tree, language[, parentTrace])</a>
#####Arguments:
1. `tree`: a JSON tree that is the webTemplate property of a response from a get request for a template from a CDR
2. `language`:  an ISO language that is supported by that webTemplate e.g. 'en', 'fr'
3. `aqlTrace` \[optional, rarely used, not reccomended\]: list of the node names that as you go down the tree, so the aql location can be given (e.g. for committing a composition). Defaults to [], only change if you need something prepended before each aql location
#####Returns:
A simplified, flat JSON structure for use in generating HTML/React/other input interfaces.
#####Example:
Let `result` be the body/data of a successful call to `[cdr url]/rest/v1/template/[template name]`:
```js
    let template = result.webTemplate;
    const result = treeTrawlGettingFlatInputs(template.tree, template.defaultLanguage);
```

#### <a id="inputToJsonFormInput">inputToJsonFormInput(tree, language)</a>
#####Arguments:
1. `tree`: a JSON tree that represents a node in a webTemplate, anywhere in the tree
2. `language`:  an ISO language that is supported by that webTemplate e.g. 'en', 'fr'
#####Returns:
A JSON object that represent the input associated with the JSON tree that is passed in (e.g. based on the **inputs** property). Ignores any children of the tree, they must be processed seperately
#####Example:
Let `result` be the body/data of a successful call to `[cdr url]/rest/v1/template/[template name]`:
```js
    let template = result.webTemplate;
    const result = inputToJsonFormInput(template.tree, template.defaultLanguage); // returns the inputs associated with the top of the tree
```


/**
 * convert a tree (with inputs) from a webTemplate into an input, in a json representation
 * @param {*} totalTree
 * @param {*} language
 */
function inputToJsonFormInput(totalTree, language)
