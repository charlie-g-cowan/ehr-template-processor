// /**
//  * @file Temporary file for running template functions
//  * @author Charlie Cowan <charlie.g.cowan@gmail.com>
//  */
//
// const { treeTrawlGettingStructuredInputs } = require("./template");
//
// const { environment, treeTrawlGettingFlatInputs, getLocalizedNameIfExists, getLocalizedDescriptionIfExists, inputToJsonFormInput, trawlChildrenIfExist } = require('./template.js');
//
// // const templatesList = [
// //   "Foot_and_Ankle_PROMs-v0","Foot_and_Ankle_PROMs-v0-copy","IDCR Allergies List.v0","IDCR - Laboratory
// // Order.v0","IDCR - Laboratory Test Report.v0","IDCR Problem List.v1","IDCR Procedures List.v0","NWIS - Medication
// // Dispensation","RESET - Assessment E.v1","Vital Signs Encounter (Composition)" ];
// // const templatesList = ["Foot_and_Ankle_PROMs-v0"];
//
// // const templatesList = ["WHO - Suspected Covid-19 assessment.v0"];
//
// function structuredTrawlTest(tree, language) {
//     const structuredResult = treeTrawlGettingStructuredInputs(tree, language, []);
//     console.log();
//     console.log(JSON.stringify(structuredResult, null, 2));
// }
//
// function flatTrawlTest(tree, language) {
//     const result1 = [];
//     // console.log(treeTrawlGettingFlatInputs(tree, language, [], []));
//     treeTrawlGettingFlatInputs(tree, language, [], []).map((input) => {
//         result1.push(inputToJsonFormInput(input, language));
//     });
//     console.log(JSON.stringify(result1));
//     // console.log(JSON.stringify(result1, null, 2));
// }
//
// templatesList.map((templateName) => {
//     const request = require('request');
//     const options = {
//         'method': 'GET',
//         'url': environment.api_url + '/rest/v1/template/' + templateName,
//         'headers': {
//             'Content-Type': 'application/json',
//             'Ehr-Session-disabled': '{{Ehr-Session}}',
//             'Authorization': environment.api_authorisation
//         }
//     };
//     request(options, function (error, response) {
//         if (error) throw new Error(error);
//         const result = JSON.parse(response.body);
//         //BEGIN PROCESSING TEST
//         // console.log(result);
//         let template = result.webTemplate;
//         let language = template.defaultLanguage;
//         let tree = template.tree;
//         // console.log(JSON.stringify(tree));
//         // console.log(JSON.stringify(tree, null, 2));
//         // console.log(tree);
//         // structuredTrawlTest(tree, language);
//         flatTrawlTest(tree, language);
//         //END PROCESSING TEST
//     });
// });
