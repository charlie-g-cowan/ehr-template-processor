const assert = require('assert');
const { padNTabsLeft, getLocalizedNameIfExists, getLocalizedDescriptionIfExists, getIdIfExists, objectHasInputs, getAqlPathFromParentTrace} = require('../src/template.js');

const testString = '{"meta":{"href":"https://cdr.code4health.org/rest/v1/template/Foot_and_Ankle_PROMs-v0"},"webTemplate":{"templateId":"Foot_and_Ankle_PROMs-v0","version":"2.3","defaultLanguage":"en","languages":["en"],"tree":{"id":"uclh_foot_and_ankle_proms","name":"UCLH Foot and ankle PROMs","localizedName":"UCLH Foot and ankle PROMs","rmType":"COMPOSITION","nodeId":"openEHR-EHR-COMPOSITION.report.v1","min":1,"max":1,"localizedNames":{"en":"UCLH Foot and ankle PROMs"},"localizedDescriptions":{"en":"Document to communicate information to others, commonly in response to a request from another party."},"aqlPath":"","children":[{"id":"context","rmType":"EVENT_CONTEXT","min":1,"max":1,"aqlPath":"/context","children":[{"id":"episode_details","name":"Episode details","localizedName":"Episode details","rmType":"CLUSTER","nodeId":"openEHR-EHR-CLUSTER.episode_details_northproms.v0","min":0,"max":1,"localizedNames":{"en":"Episode details"},"localizedDescriptions":{"en":"Local cluster to capture episode details for the Northumbria Orthopaedic PROMS registry."},"aqlPath":"/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.episode_details_northproms.v0,\'Episode details\']","children":[{"id":"episode_identifier","name":"Episode identifier","localizedName":"Episode identifier","rmType":"DV_TEXT","nodeId":"at0001","min":1,"max":1,"localizedNames":{"en":"Episode identifier"},"localizedDescriptions":{"en":"Unique identifier for the episode."},"aqlPath":"/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.episode_details_northproms.v0,\'Episode details\']/items[at0001]/value","inputs":[{"type":"TEXT","list":[{"value":"Pre-operative","label":"Pre-operative"},{"value":"1 week post-operative","label":"1 week post-operative"},{"value":"6 weeks post-operative","label":"6 weeks post-operative"}],"listOpen":false}]}]},{"id":"start_time","name":"Start_time","rmType":"DV_DATE_TIME","min":1,"max":1,"aqlPath":"/context/start_time","inputs":[{"type":"DATETIME"}],"inContext":true},{"id":"setting","name":"Setting","rmType":"DV_CODED_TEXT","min":1,"max":1,"aqlPath":"/context/setting","inputs":[{"suffix":"code","type":"TEXT"},{"suffix":"value","type":"TEXT"}],"inContext":true}]},{"id":"aofas_score","name":"AOFAS Score","localizedName":"AOFAS Score","rmType":"OBSERVATION","nodeId":"openEHR-EHR-OBSERVATION.aofas.v0","min":0,"max":1,"localizedNames":{"en":"AOFAS Score"},"localizedDescriptions":{"en":"American Orthopaedic Foot and Ankle Society Score."},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]","children":[{"id":"q1_pain","name":"Q1 Pain","localizedName":"Q1 Pain","rmType":"DV_ORDINAL","nodeId":"at0028","min":0,"max":1,"localizedNames":{"en":"Q1 Pain"},"localizedDescriptions":{"en":"Patient reported pain assessment."},"annotations":{"Notes.Authors Note":"AOFAS- P1"},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value","inputs":[{"type":"CODED_TEXT","list":[{"value":"at0032","label":"Severe pain","localizedLabels":{"en":"Severe pain"},"localizedDescriptions":{"en":"The patient reports severe pain."},"ordinal":0},{"value":"at0031","label":"Moderate or daily","localizedLabels":{"en":"Moderate or daily"},"localizedDescriptions":{"en":"The patient reports moderate or daily pain."},"ordinal":20},{"value":"at0030","label":"Mild or occasional","localizedLabels":{"en":"Mild or occasional"},"localizedDescriptions":{"en":"The patient reports mild or occasional pain."},"ordinal":30},{"value":"at0029","label":"No pain","localizedLabels":{"en":"No pain"},"localizedDescriptions":{"en":"The patient reports no pain."},"ordinal":40}]}]},{"id":"q2_activity_limitations_and_support_requirements","name":"Q2 Activity limitations and support requirements","localizedName":"Q2 Activity limitations and support requirements","rmType":"DV_ORDINAL","nodeId":"at0033","min":0,"max":1,"localizedNames":{"en":"Q2 Activity limitations and support requirements"},"localizedDescriptions":{"en":"Patient-reported activity limitations and support requirements."},"annotations":{"Notes.Authors Note":"AOFAS-F1"},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/data[at0003]/items[at0033]/value","inputs":[{"type":"CODED_TEXT","list":[{"value":"at0037","label":"Severe","localizedLabels":{"en":"Severe"},"localizedDescriptions":{"en":"The patient reports severe activity limitations and support requirements."},"ordinal":0},{"value":"at0036","label":"Moderate or daily","localizedLabels":{"en":"Moderate or daily"},"localizedDescriptions":{"en":"The patient reports moderate or daily activity limitations and support requirements."},"ordinal":4},{"value":"at0035","label":"Mild or occasional","localizedLabels":{"en":"Mild or occasional"},"localizedDescriptions":{"en":"The patient reports mild or occasional activity limitations and support requirements."},"ordinal":7},{"value":"at0034","label":"None","localizedLabels":{"en":"None"},"localizedDescriptions":{"en":"The patient reports no activity limitations and support requirements."},"ordinal":10}]}]},{"id":"q3_walking","name":"Q3 Walking","localizedName":"Q3 Walking","rmType":"DV_ORDINAL","nodeId":"at0038","min":0,"max":1,"localizedNames":{"en":"Q3 Walking"},"localizedDescriptions":{"en":"Patient-reported maximum walking distance in blocks (1 block = 100-200 yards)."},"annotations":{"Notes.Authors Note":"AOFAS-F2"},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/data[at0003]/items[at0038]/value","inputs":[{"type":"CODED_TEXT","list":[{"value":"at0042","label":"Less than 1","localizedLabels":{"en":"Less than 1"},"localizedDescriptions":{"en":"The patient reports a walking distance of less than 1 block."},"ordinal":0},{"value":"at0041","label":"1 to 3","localizedLabels":{"en":"1 to 3"},"localizedDescriptions":{"en":"The patient reports a maximum walking distance of 1 to 3 blocks."},"ordinal":2},{"value":"at0040","label":"4 to 6","localizedLabels":{"en":"4 to 6"},"localizedDescriptions":{"en":"The patient reports a maximum walking distance of 4 to 6 blocks."},"ordinal":4},{"value":"at0039","label":"Greater than 6","localizedLabels":{"en":"Greater than 6"},"localizedDescriptions":{"en":"The patient reports a maximum walking distance of greater than 6 blocks."},"ordinal":5}]}]},{"id":"q4_walking_surfaces","name":"Q4 Walking surfaces","localizedName":"Q4 Walking surfaces","rmType":"DV_ORDINAL","nodeId":"at0043","min":0,"max":1,"localizedNames":{"en":"Q4 Walking surfaces"},"localizedDescriptions":{"en":"Patient-reported assessment of difficulty of walking on various surfaces."},"annotations":{"Notes.Authors Note":"AOFAS-F3"},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/data[at0003]/items[at0043]/value","inputs":[{"type":"CODED_TEXT","list":[{"value":"at0046","label":"Severe difficulty on uneven surfaces","localizedLabels":{"en":"Severe difficulty on uneven surfaces"},"localizedDescriptions":{"en":"The patient reports severe difficulty walking on uneven terrains, stairs, inclines or ladders."},"ordinal":0},{"value":"at0045","label":"Some difficulty on uneven surfaces","localizedLabels":{"en":"Some difficulty on uneven surfaces"},"localizedDescriptions":{"en":"The patient reports some difficulty walking on uneven terrains, stairs, inclines or ladders."},"ordinal":3},{"value":"at0044","label":"No difficulty on any walking surface","localizedLabels":{"en":"No difficulty on any walking surface"},"localizedDescriptions":{"en":"The patient reports no difficulty walking on any surface."},"ordinal":5}]}]},{"id":"total_score","name":"Total score","localizedName":"Total score","rmType":"DV_COUNT","nodeId":"at0008","min":0,"max":1,"localizedNames":{"en":"Total score"},"localizedDescriptions":{"en":"The total score for the four questions."},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/data[at0003]/items[at0008]/value","inputs":[{"type":"INTEGER","validation":{"range":{"minOp":">=","min":0,"maxOp":"<=","max":60}}}]},{"id":"comment","name":"Comment","localizedName":"Comment","rmType":"DV_TEXT","nodeId":"at0027","min":0,"max":1,"localizedNames":{"en":"Comment"},"localizedDescriptions":{"en":"Narrative comment."},"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/data[at0003]/items[at0027]/value","inputs":[{"type":"TEXT"}]},{"id":"time","name":"Time","rmType":"DV_DATE_TIME","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/data[at0001]/events[at0002]/time","inputs":[{"type":"DATETIME"}],"inContext":true},{"id":"language","name":"Language","rmType":"CODE_PHRASE","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/language","inContext":true},{"id":"encoding","name":"Encoding","rmType":"CODE_PHRASE","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/encoding","inContext":true},{"id":"subject","name":"Subject","rmType":"PARTY_PROXY","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.aofas.v0]/subject","inContext":true}]},{"id":"pain_vas","name":"Pain VAS","localizedName":"Pain VAS","rmType":"OBSERVATION","nodeId":"openEHR-EHR-OBSERVATION.story.v1","min":0,"max":1,"localizedNames":{"en":"Pain VAS"},"localizedDescriptions":{"en":"The subjective clinical history of the subject of care as recorded directly by the subject, or reported to a clinician by the subject or a carer."},"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']","children":[{"id":"pain_vas","name":"Pain VAS","localizedName":"Pain VAS","rmType":"CLUSTER","nodeId":"openEHR-EHR-CLUSTER.pain_vas.v0","min":0,"max":1,"localizedNames":{"en":"Pain VAS"},"localizedDescriptions":{"en":"Pain Visual Analogue Scale."},"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.pain_vas.v0]","children":[{"id":"pain_scale","name":"Pain scale","localizedName":"Pain scale","rmType":"DV_COUNT","nodeId":"at0001","min":0,"max":1,"localizedNames":{"en":"Pain scale"},"localizedDescriptions":{"en":"Patient-reported estimation of extent of pain on a scale of 0 to 100, where 0 indicates no pain and 100 indicates severe pain."},"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.pain_vas.v0]/items[at0001]/value","inputs":[{"type":"INTEGER","validation":{"range":{"minOp":">=","min":0,"maxOp":"<=","max":10}}}]}]},{"id":"time","name":"Time","rmType":"DV_DATE_TIME","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']/data[at0001]/events[at0002]/time","inputs":[{"type":"DATETIME"}],"inContext":true},{"id":"language","name":"Language","rmType":"CODE_PHRASE","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']/language","inContext":true},{"id":"encoding","name":"Encoding","rmType":"CODE_PHRASE","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']/encoding","inContext":true},{"id":"subject","name":"Subject","rmType":"PARTY_PROXY","min":1,"max":1,"aqlPath":"/content[openEHR-EHR-OBSERVATION.story.v1,\'Pain VAS\']/subject","inContext":true}]},{"id":"category","rmType":"DV_CODED_TEXT","min":1,"max":1,"aqlPath":"/category","inputs":[{"suffix":"code","type":"CODED_TEXT","list":[{"value":"433","label":"event","localizedLabels":{"en":"event"}}],"terminology":"openehr"}],"inContext":true},{"id":"language","name":"Language","rmType":"CODE_PHRASE","min":1,"max":1,"aqlPath":"/language","inContext":true},{"id":"territory","name":"Territory","rmType":"CODE_PHRASE","min":1,"max":1,"aqlPath":"/territory","inContext":true},{"id":"composer","name":"Composer","rmType":"PARTY_PROXY","min":1,"max":1,"aqlPath":"/composer","inContext":true}]}}}';

describe('padNTabsLeft', function() {
    it('should return an empty string when argument is 0', function() {
        assert.equal(padNTabsLeft(0), '');
    });
    it('should return a single tab when argument is 1', function() {
        assert.equal(padNTabsLeft(1), '\t');
    });
    it('should return a two tab when argument is 2', function() {
        assert.equal(padNTabsLeft(2), '\t\t');
    });
    it('should return ten tabs when argument is 10', function() {
        assert.equal(padNTabsLeft(10), '\t\t\t\t\t\t\t\t\t\t');
    });
});

describe('getting names', function() {
    it('should return empty string if no localizedNames object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), '');
    });
    it('should return empty string if language does not exist within localizedNames', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedNames: {fr: "UCLH Foot and ankle PROMs"},
            localizedDescriptions: {fr: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), '');
    });
    it('should return the name if language does exist within localizedNames object', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedNames: {en: "UCLH Foot and ankle PROMs"},
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), "UCLH Foot and ankle PROMs");
    });
});


describe('getting descriptions', function() {
    it('should return empty string if no localizedDescriptions object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedNames: {en: "UCLH Foot and ankle PROMs"},
        };
        const language = 'en';
        assert.equal(getLocalizedDescriptionIfExists(object, language), '');
    });
    it('should return empty string if language does not exist within localizedDescriptions', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedNames: {fr: "UCLH Foot and ankle PROMs"},
            localizedDescriptions: {fr: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedDescriptionIfExists(object, language), '');
    });
    it('should return the name if language does exist within localizedDescriptions object', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedNames: {en: "UCLH Foot and ankle PROMs"},
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedDescriptionIfExists(object, language), "Document to communicate information to others, commonly in response to a request from another party.");
    });
});

describe('getting id', function() {
    it('should return id string value if id object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            id: "test-id-string"
        };
        assert.equal(getIdIfExists(object), 'test-id-string');
    });
    it('should return empty string if id object does not exist', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
        };
        assert.equal(getIdIfExists(object), '');
    });
    it('should return empty string if id object exists and is empty string', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            id: ""
        };
        assert.equal(getIdIfExists(object), '');
    });
});

describe('getting whether inputs exists', function() {
    it('should return false if no inputs object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            id: "test-id-string"
        };
        assert.equal(objectHasInputs(object), false);
    });
    it('should return true if an "inputs" object exists (even if empty)', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            inputs: [],
        };
        assert.equal(objectHasInputs(object), true);
    });
    it('should return true if a populated "inputs" object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            inputs: ['hi', true]
        };
        assert.equal(objectHasInputs(object), true);
    });
    it('should return false if an "inputs" object does not exist, even if an "input" one does', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            input: 'hi'
        };
        assert.equal(objectHasInputs(object), false);
    });
    it('should return false if an "inputs" object does not exist in the main part of the tree, even if a subobject does', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            test: {inputs: 'hi'}
        };
        assert.equal(objectHasInputs(object), false);
    });
});

describe('getting aql path', function() {
    it('should return an empty string when no trace or id is provided', function() {
        assert.equal(getAqlPathFromParentTrace(), '');
    });
    it('should return an empty string when empty strings are provided', function() {
        assert.equal(getAqlPathFromParentTrace([''], ''), '');
    });
    it('should return a slash seperated concatenation of the strings if parentTrace has one element and id is a string', function() {
        assert.equal(getAqlPathFromParentTrace(['hi'], 'bye'), 'hi/bye');
    });
    it('should return a slash seperated concatenation of the strings if parentTrace has multiple elements and id is a string', function() {
        assert.equal(getAqlPathFromParentTrace(['hi', 'there'], 'bye'), 'hi/there/bye');
    });
    it('should return parentTrace joined with slashes if id is empty', function() {
        assert.equal(getAqlPathFromParentTrace(['hi'], ''), 'hi');
    });
    it('should return parentTrace joined with slashes if id is not provided', function() {
        assert.equal(getAqlPathFromParentTrace(['hi']), 'hi');
    });
    it('should return id if parentTrace is empty', function() {
        assert.equal(getAqlPathFromParentTrace([], 'hi'), 'hi');
    });
})