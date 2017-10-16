var RomoWordBoundaryFilter = function(filterString, setElems, getElemTextContentCallback) {
  this.boundaryCharsRegex = /[\s-_]+/;
  this.matchingElems      = [];
  this.notMatchingElems   = [];
  this.filters            = filterString
                              .trim()
                              .toLowerCase()
                              .split(this.boundaryCharsRegex);

  Romo.array(setElems).forEach(Romo.proxy(function(elem) {
    var contentStack = getElemTextContentCallback(elem)
                         .trim()
                         .toLowerCase()
                         .split(this.boundaryCharsRegex).reverse();

    var match = this.filters.reduce(Romo.proxy(function(filterMatch, filter) {
      if (filterMatch === false) {
        // short-circuit the reduce
        return false;
      } else {
        var contentMatch = false;
        do {
          var content = contentStack.pop();
          if (content !== undefined && content.indexOf(filter) === 0) {
            contentMatch = true;
            // we found a match for this filter so we need to
            // break out of this do...while and go to next filter
            content = undefined;
          }
        } while(content !== undefined);
        return contentMatch;
      }
    }, this), true);

    if (match === true) {
      this.matchingElems.push(elem);
    } else {
      this.notMatchingElems.push(elems);
    }
  }, this));
}
