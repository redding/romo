var RomoWordBoundaryFilter = function(filterString, setElems, getElemTextContentCallback) {
  this.boundaryCharsRegex = /[\s-_]+/;
  this.matchingNodes      = [];
  this.notMatchingNodes   = [];
  this.filters            = filterString
                              .trim()
                              .toLowerCase()
                              .split(this.boundaryCharsRegex);

  Romo.toArray(setElems).forEach($.proxy(function(node) {
    var contentStack = getElemTextContentCallback($(node))
                         .trim()
                         .toLowerCase()
                         .split(this.boundaryCharsRegex).reverse();

    var match = this.filters.reduce($.proxy(function(filterMatch, filter) {
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
      this.matchingNodes.push(node);
    } else {
      this.notMatchingNodes.push(node);
    }
  }, this));

  this.matchingElems    = $(this.matchingNodes);
  this.notMatchingElems = $(this.notMatchingNodes);
}
