import * as assert from 'assert';
import { describe, it } from 'mocha';
import { treeTrawlGettingFlatInputs, treeTrawlGettingStructuredInputs } from '../src/template';
import { resultAfterRunningFlat, resultAfterRunningStructured, tree } from './exampleObjects';

describe('padNTabsLeft', () => {
  it('flat covid template should work', () => {
    const result1 = treeTrawlGettingFlatInputs(tree, 'en');
    assert.deepEqual(result1, resultAfterRunningFlat);
  });
  it('structured covid template should work', () => {
    const result1 = treeTrawlGettingStructuredInputs(tree, 'en');
    assert.deepEqual(result1, resultAfterRunningStructured);
  });
});
