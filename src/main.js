const { templatesList, api, treeTrawl, getLocalizedNameAndDescriptionIfExist } = require('./template.js')

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