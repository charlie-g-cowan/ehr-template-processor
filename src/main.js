/**
 * @file Temporary file for running template functions
 * @author Charlie Cowan <charlie.g.cowan@gmail.com>
 */

const { environment, treeTrawlGettingFlatInputs, getLocalizedNameIfExists, getLocalizedDescriptionIfExists, inputToJsonFormInput, trawlChildrenIfExist } = require('./template.js');

// const templatesList = [
//   "Foot_and_Ankle_PROMs-v0","Foot_and_Ankle_PROMs-v0-copy","IDCR Allergies List.v0","IDCR - Laboratory Order.v0","IDCR - Laboratory Test Report.v0","IDCR Problem List.v1","IDCR Procedures List.v0","NWIS - Medication Dispensation","RESET - Assessment E.v1","Vital Signs Encounter (Composition)"
// ];
// const templatesList = ["Foot_and_Ankle_PROMs-v0"];
const templatesList = ["WHO - Suspected Covid-19 assessment.v0"];

templatesList.map((templateName) => {
    const request = require('request');
    const options = {
      'method': 'GET',
      'url': environment.api_url + '/rest/v1/template/' + templateName,
      'headers': {
        'Content-Type': 'application/json',
        'Ehr-Session-disabled': '{{Ehr-Session}}',
        'Authorization': environment.api_authorisation
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
      const result1 = [];
      // console.log(treeTrawlGettingFlatInputs(tree, language, [], []));
      treeTrawlGettingFlatInputs(tree, language, [], []).map((input) => {
        // console.log(inputToJsonFormInput(input, language));
        result1.push(inputToJsonFormInput(input, language));
      });
      console.log();
      console.log(JSON.stringify(result1));
      //END PROCESSING TEST
    });
  });
