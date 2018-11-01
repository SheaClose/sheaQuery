function $(selectors) {
  if (typeof selectors === "string") {
    if (selectors.startsWith("#")) {
      let iddy = document.querySelector(selectors);
      return Object.assign(iddy, wrapper);
    } else if (selectors.startsWith(".")) {
      let classy = document.querySelectorAll(selectors);
      let newClass = new Arr(classy);
      return newClass;
    }
  }
  if (typeof selectors === "object") {
    if (selectors === document) {
      return Object.assign(document, { ready });
    }
    let taggy = document.querySelectorAll(selectors);
    return taggy;
  }
}

var wrapper = {
  css
};

function css(prop, val) {
  if (this.constructor.name === "Arr") {
    Object.values(this).map(node => {
      if (val) {
        styleWithTwoStrings.call(node, prop, val);
      } else {
        styleWithObject.call(node, prop);
      }
    });
    return this;
  } else {
    if (val) {
      return styleWithTwoStrings.call(this, prop, val);
    } else if (typeof prop === "object") {
      styleWithObject.call(this, prop);
      return this;
    } else {
      return this.style[prop];
    }
  }
}

function ready(cb) {
  var triggered = false;
  document.onreadystatechange = function() {
    if (!triggered) {
      cb();
    }
    triggered = true;
  };
}

class Arr {
  constructor(array) {
    Object.assign(this, array);
  }
  css(prop, val) {
    return css.call(this, prop, val);
  }
}

function styleWithTwoStrings(prop, val) {
  this.style[prop] = val;
  return this;
}

function styleWithObject(obj) {
  Object.entries(obj).map(cur => {
    return (this.style[cur[0]] = cur[1]);
  });
}
