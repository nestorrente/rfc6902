/*jslint esnext: true */ /*globals describe, it */
import assert from 'assert';
import {applyPatch, createPatch} from '../index';

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

describe('issues/3', () => {
  var input = {arr: ['1', '2', '2']};
  var output = {arr: ['1']};
  var expected_patch = [
    {op: 'remove', path: '/arr/2'},
    {op: 'remove', path: '/arr/1'}
  ];
  var actual_patch = createPatch(input, output);
  it('should produce patch equal to expectation', () => {
    assert.deepEqual(actual_patch, expected_patch);
  });
  it('should apply patch to arrive at output', () => {
    var actual_output = clone(input);
    var patch_results = applyPatch(actual_output, actual_patch);
    assert.deepEqual(actual_output, output);
    assert.deepEqual(patch_results, [null, null]);
  });
});

describe('issues/4', () => {
  var input = ['A', 'B'];
  var output = ['B', 'A'];
  var expected_patch = [
    {op: 'remove', path: '/1'},
    {op: 'add', path: '/0', value: 'B'},
  ];
  var actual_patch = createPatch(input, output);
  it('should produce patch equal to expectation', () => {
    assert.deepEqual(actual_patch, expected_patch);
  });
  it('should apply patch to arrive at output', () => {
    var actual_output = clone(input);
    var patch_results = applyPatch(actual_output, actual_patch);
    assert.deepEqual(actual_output, output);
    assert.deepEqual(patch_results, [null, null]);
  });
});