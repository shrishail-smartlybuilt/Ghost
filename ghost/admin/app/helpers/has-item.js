import { helper } from '@ember/component/helper';

export default helper(function isExpanded([expandedSet, index]) {
    return expandedSet.has(index);
  });
