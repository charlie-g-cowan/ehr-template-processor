const assert = require('assert');
const { tabs, getLocalizedNameIfExists, getLocalizedDescriptionIfExists } = require('../src/template.js');

describe('tabs', function() {
    it('should return an empty string when argument is 0', function() {
        assert.equal(tabs(0), '');
    });
    it('should return a single tab when argument is 1', function() {
        assert.equal(tabs(1), '\t');
    });
    it('should return a two tab when argument is 2', function() {
        assert.equal(tabs(2), '\t\t');
    });
    it('should return ten tabs when argument is 10', function() {
        assert.equal(tabs(10), '\t\t\t\t\t\t\t\t\t\t');
    });
});

describe('getting names', function() {
    it('should return nothing if no localizedNames object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
        };
        const language = 'en';
        assert.equal(getLocalizedNameIfExists(object, language), '');
    });
    it('should return nothing if language does not exist within localizedNames', function() {
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
    it('should return nothing if no localizedDescriptions object exists', function() {
        const object = {
            name: "UCLH Foot and ankle PROMs",
            localizedName: "UCLH Foot and ankle PROMs",
            localizedNames: {en: "UCLH Foot and ankle PROMs"},
        };
        const language = 'en';
        assert.equal(getLocalizedDescriptionIfExists(object, language), '');
    });
    it('should return nothing if language does not exist within localizedDescriptions', function() {
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

const object = {
    name: "UCLH Foot and ankle PROMs",
    localizedName: "UCLH Foot and ankle PROMs",
    localizedNames: {en: "UCLH Foot and ankle PROMs"},
    localizedDescriptions: {en: "Document to communicate information to others, commonly in response to a request from another party."},
};
const language = 'en';