import { padNTabsLeft, getLocalizedNameIfExists, getLocalizedDescriptionIfExists, getIdIfExists, objectHasInputs, getAqlPathFromParentTrace } from '../src/template.js';
import * as assert from 'assert';
import { describe, it } from "mocha";

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
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), '');
    });
    it('should use localizedName as fallback for localizedNames', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs1",
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), 'UCLH Foot and ankle PROMs1');
    });
    it('should use name as fallback for localizedNames/localizedName', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs2",
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), 'UCLH Foot and ankle PROMs2');
    });
    // TODO: fix this so returns alternative if language not found (maybe, consider whether a better option than
    //  nothing)
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
});
