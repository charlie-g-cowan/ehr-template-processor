const assert = require('assert');
const { tabs } = require('../src/template.js');

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