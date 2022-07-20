import {shuffleArray} from '../../util/array.utils';
import {expect} from '@loopback/testlab';

describe('Array Util', () => {
  const arrayInSameOrder = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  it('should shuffle array order', function () {
    let r = [...Array(52)].map(_ => (Math.random() * 40) | 0);
    const copyR = Object.assign([], r);

    r = shuffleArray(r);

    expect(arrayInSameOrder(r, copyR)).to.eql(false);
  });
});
