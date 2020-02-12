const api = require('./api-variables').api;

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
  console.log(tabs(depth) + name + ', ' + description);
  if ('children' in tree) {
    tree.children.map((childTree) => {
      treeTrawl(childTree, language, depth + 1);
    });
  }
}

templatesList.map((templateName) => {
  const request = require('request');
  const options = {
    'method': 'GET',
    'url': api.urlBase + '/rest/v1/template/' + templateName,
    'headers': {
      'Content-Type': 'application/json',
      'Ehr-Session-disabled': '{{Ehr-Session}}',
      'Authorization': api.authorisation
    }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    const result = JSON.parse(response.body);
    
    //BEGIN PROCESSING TEST
    // console.log(result);
    let template = result.webTemplate;
    let language = template.defaultLanguage;
    let tree = template.tree;
    let {name, description} = getLocalizedNameAndDescriptionIfExist(tree, language);
    let questions = tree.children;
    // console.log(name);
    // console.log(description);
    // console.log(questions);
    treeTrawl(tree, language, 0);
    //END PROCESSING TEST
    console.log();
  });
});