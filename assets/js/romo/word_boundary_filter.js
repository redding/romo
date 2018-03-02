var RomoWordBoundaryFilter = function(filterString, setItems, getItemTextContentCallback) {
  this.boundaryCharsRegex = /[\s-_]+/;
  this.matchingItems      = [];
  this.notMatchingItems   = [];
  this.filters            = filterString
                              .trim()
                              .toLowerCase()
                              .split(this.boundaryCharsRegex);

  Romo.array(setItems).forEach(Romo.proxy(function(item) {
    var contentStack = getItemTextContentCallback(item)
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
      this.matchingItems.push(item);
    } else {
      this.notMatchingItems.push(item);
    }
  }, this));

  // TODO: backwards compatible, remove later on
  this.matchingElems    = this.matchingItems;
  this.notMatchingElems = this.notMatchingItems;
}
