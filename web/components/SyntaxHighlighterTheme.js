'use strict';

// Original: https://github.com/sdras/night-owl-vscode-theme
// Converted automatically using ./tools/themeFromVsCode
var theme = {
  plain: {
    color: "#c5cdd3",
    backgroundColor: "rgb(12, 13, 20)"
  },
  styles: [{
    types: ["changed"],
    style: {
      color: "rgb(162, 191, 252)",
      fontStyle: "italic"
    }
  }, {
    types: ["deleted"],
    style: {
      color: "rgba(239, 83, 80, 0.56)",
      fontStyle: "italic"
    }
  }, {
    types: ["inserted", "attr-name"],
    style: {
      color: "rgb(34, 211, 238)",
      fontStyle: "italic"
    }
  }, {
    types: ["comment"],
    style: {
      color: "rgb(99, 119, 119)",
      fontStyle: "italic"
    }
  }, {
    types: ["string", "url"],
    style: {
      color: "rgb(34, 211, 238)"
    }
  }, {
    types: ["variable"],
    style: {
      color: "rgb(179, 237, 237)"
    }
  }, {
    types: ["number"],
    style: {
      color: "rgb(247, 140, 108)"
    }
  }, {
    types: ["builtin", "char", "constant", "function"],
    style: {
      color: "rgb(251,220,149)"
    }
  }, {
    // This was manually added after the auto-generation
    // so that punctuations are not italicised
    types: ["punctuation"],
    style: {
      color: "rgb(199, 146, 234)"
    }
  }, {
    types: ["selector", "doctype"],
    style: {
      color: "rgb(251, 220, 149)",
      fontStyle: "italic"
    }
  }, {
    types: ["class-name"],
    style: {
      color: "rgb(251, 220, 149)"
    }
  }, {
    types: ["tag", "operator", "keyword"],
    style: {
      color: "rgb(134, 239, 172)"
    }
  }, {
    types: ["boolean"],
    style: {
      color: "rgb(255, 88, 116)"
    }
  }, {
    types: ["property"],
    style: {
      color: "rgb(134, 239, 172)"
    }
  }, {
    types: ["namespace"],
    style: {
      color: "rgb(178, 204, 214)"
    }
  }]
};

module.exports = theme;
