/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pluralize/pluralize.js":
/*!*********************************************!*\
  !*** ./node_modules/pluralize/pluralize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* global define */\n\n(function (root, pluralize) {\n  /* istanbul ignore else */\n  if (true) {\n    // Node.\n    module.exports = pluralize();\n  } else {}\n})(this, function () {\n  // Rule storage - pluralize and singularize need to be run sequentially,\n  // while other rules can be optimized using an object for instant lookups.\n  var pluralRules = [];\n  var singularRules = [];\n  var uncountables = {};\n  var irregularPlurals = {};\n  var irregularSingles = {};\n\n  /**\n   * Sanitize a pluralization rule to a usable regular expression.\n   *\n   * @param  {(RegExp|string)} rule\n   * @return {RegExp}\n   */\n  function sanitizeRule (rule) {\n    if (typeof rule === 'string') {\n      return new RegExp('^' + rule + '$', 'i');\n    }\n\n    return rule;\n  }\n\n  /**\n   * Pass in a word token to produce a function that can replicate the case on\n   * another word.\n   *\n   * @param  {string}   word\n   * @param  {string}   token\n   * @return {Function}\n   */\n  function restoreCase (word, token) {\n    // Tokens are an exact match.\n    if (word === token) return token;\n\n    // Upper cased words. E.g. \"HELLO\".\n    if (word === word.toUpperCase()) return token.toUpperCase();\n\n    // Title cased words. E.g. \"Title\".\n    if (word[0] === word[0].toUpperCase()) {\n      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();\n    }\n\n    // Lower cased words. E.g. \"test\".\n    return token.toLowerCase();\n  }\n\n  /**\n   * Interpolate a regexp string.\n   *\n   * @param  {string} str\n   * @param  {Array}  args\n   * @return {string}\n   */\n  function interpolate (str, args) {\n    return str.replace(/\\$(\\d{1,2})/g, function (match, index) {\n      return args[index] || '';\n    });\n  }\n\n  /**\n   * Replace a word using a rule.\n   *\n   * @param  {string} word\n   * @param  {Array}  rule\n   * @return {string}\n   */\n  function replace (word, rule) {\n    return word.replace(rule[0], function (match, index) {\n      var result = interpolate(rule[1], arguments);\n\n      if (match === '') {\n        return restoreCase(word[index - 1], result);\n      }\n\n      return restoreCase(match, result);\n    });\n  }\n\n  /**\n   * Sanitize a word by passing in the word and sanitization rules.\n   *\n   * @param  {string}   token\n   * @param  {string}   word\n   * @param  {Array}    rules\n   * @return {string}\n   */\n  function sanitizeWord (token, word, rules) {\n    // Empty string or doesn't need fixing.\n    if (!token.length || uncountables.hasOwnProperty(token)) {\n      return word;\n    }\n\n    var len = rules.length;\n\n    // Iterate over the sanitization rules and use the first one to match.\n    while (len--) {\n      var rule = rules[len];\n\n      if (rule[0].test(word)) return replace(word, rule);\n    }\n\n    return word;\n  }\n\n  /**\n   * Replace a word with the updated word.\n   *\n   * @param  {Object}   replaceMap\n   * @param  {Object}   keepMap\n   * @param  {Array}    rules\n   * @return {Function}\n   */\n  function replaceWord (replaceMap, keepMap, rules) {\n    return function (word) {\n      // Get the correct token and case restoration functions.\n      var token = word.toLowerCase();\n\n      // Check against the keep object map.\n      if (keepMap.hasOwnProperty(token)) {\n        return restoreCase(word, token);\n      }\n\n      // Check against the replacement map for a direct word replacement.\n      if (replaceMap.hasOwnProperty(token)) {\n        return restoreCase(word, replaceMap[token]);\n      }\n\n      // Run all the rules against the word.\n      return sanitizeWord(token, word, rules);\n    };\n  }\n\n  /**\n   * Check if a word is part of the map.\n   */\n  function checkWord (replaceMap, keepMap, rules, bool) {\n    return function (word) {\n      var token = word.toLowerCase();\n\n      if (keepMap.hasOwnProperty(token)) return true;\n      if (replaceMap.hasOwnProperty(token)) return false;\n\n      return sanitizeWord(token, token, rules) === token;\n    };\n  }\n\n  /**\n   * Pluralize or singularize a word based on the passed in count.\n   *\n   * @param  {string}  word\n   * @param  {number}  count\n   * @param  {boolean} inclusive\n   * @return {string}\n   */\n  function pluralize (word, count, inclusive) {\n    var pluralized = count === 1\n      ? pluralize.singular(word) : pluralize.plural(word);\n\n    return (inclusive ? count + ' ' : '') + pluralized;\n  }\n\n  /**\n   * Pluralize a word.\n   *\n   * @type {Function}\n   */\n  pluralize.plural = replaceWord(\n    irregularSingles, irregularPlurals, pluralRules\n  );\n\n  /**\n   * Check if a word is plural.\n   *\n   * @type {Function}\n   */\n  pluralize.isPlural = checkWord(\n    irregularSingles, irregularPlurals, pluralRules\n  );\n\n  /**\n   * Singularize a word.\n   *\n   * @type {Function}\n   */\n  pluralize.singular = replaceWord(\n    irregularPlurals, irregularSingles, singularRules\n  );\n\n  /**\n   * Check if a word is singular.\n   *\n   * @type {Function}\n   */\n  pluralize.isSingular = checkWord(\n    irregularPlurals, irregularSingles, singularRules\n  );\n\n  /**\n   * Add a pluralization rule to the collection.\n   *\n   * @param {(string|RegExp)} rule\n   * @param {string}          replacement\n   */\n  pluralize.addPluralRule = function (rule, replacement) {\n    pluralRules.push([sanitizeRule(rule), replacement]);\n  };\n\n  /**\n   * Add a singularization rule to the collection.\n   *\n   * @param {(string|RegExp)} rule\n   * @param {string}          replacement\n   */\n  pluralize.addSingularRule = function (rule, replacement) {\n    singularRules.push([sanitizeRule(rule), replacement]);\n  };\n\n  /**\n   * Add an uncountable word rule.\n   *\n   * @param {(string|RegExp)} word\n   */\n  pluralize.addUncountableRule = function (word) {\n    if (typeof word === 'string') {\n      uncountables[word.toLowerCase()] = true;\n      return;\n    }\n\n    // Set singular and plural references for the word.\n    pluralize.addPluralRule(word, '$0');\n    pluralize.addSingularRule(word, '$0');\n  };\n\n  /**\n   * Add an irregular word definition.\n   *\n   * @param {string} single\n   * @param {string} plural\n   */\n  pluralize.addIrregularRule = function (single, plural) {\n    plural = plural.toLowerCase();\n    single = single.toLowerCase();\n\n    irregularSingles[single] = plural;\n    irregularPlurals[plural] = single;\n  };\n\n  /**\n   * Irregular rules.\n   */\n  [\n    // Pronouns.\n    ['I', 'we'],\n    ['me', 'us'],\n    ['he', 'they'],\n    ['she', 'they'],\n    ['them', 'them'],\n    ['myself', 'ourselves'],\n    ['yourself', 'yourselves'],\n    ['itself', 'themselves'],\n    ['herself', 'themselves'],\n    ['himself', 'themselves'],\n    ['themself', 'themselves'],\n    ['is', 'are'],\n    ['was', 'were'],\n    ['has', 'have'],\n    ['this', 'these'],\n    ['that', 'those'],\n    // Words ending in with a consonant and `o`.\n    ['echo', 'echoes'],\n    ['dingo', 'dingoes'],\n    ['volcano', 'volcanoes'],\n    ['tornado', 'tornadoes'],\n    ['torpedo', 'torpedoes'],\n    // Ends with `us`.\n    ['genus', 'genera'],\n    ['viscus', 'viscera'],\n    // Ends with `ma`.\n    ['stigma', 'stigmata'],\n    ['stoma', 'stomata'],\n    ['dogma', 'dogmata'],\n    ['lemma', 'lemmata'],\n    ['schema', 'schemata'],\n    ['anathema', 'anathemata'],\n    // Other irregular rules.\n    ['ox', 'oxen'],\n    ['axe', 'axes'],\n    ['die', 'dice'],\n    ['yes', 'yeses'],\n    ['foot', 'feet'],\n    ['eave', 'eaves'],\n    ['goose', 'geese'],\n    ['tooth', 'teeth'],\n    ['quiz', 'quizzes'],\n    ['human', 'humans'],\n    ['proof', 'proofs'],\n    ['carve', 'carves'],\n    ['valve', 'valves'],\n    ['looey', 'looies'],\n    ['thief', 'thieves'],\n    ['groove', 'grooves'],\n    ['pickaxe', 'pickaxes'],\n    ['whiskey', 'whiskies']\n  ].forEach(function (rule) {\n    return pluralize.addIrregularRule(rule[0], rule[1]);\n  });\n\n  /**\n   * Pluralization rules.\n   */\n  [\n    [/s?$/i, 's'],\n    [/[^\\u0000-\\u007F]$/i, '$0'],\n    [/([^aeiou]ese)$/i, '$1'],\n    [/(ax|test)is$/i, '$1es'],\n    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],\n    [/(e[mn]u)s?$/i, '$1s'],\n    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],\n    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],\n    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],\n    [/(seraph|cherub)(?:im)?$/i, '$1im'],\n    [/(her|at|gr)o$/i, '$1oes'],\n    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],\n    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],\n    [/sis$/i, 'ses'],\n    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],\n    [/([^aeiouy]|qu)y$/i, '$1ies'],\n    [/([^ch][ieo][ln])ey$/i, '$1ies'],\n    [/(x|ch|ss|sh|zz)$/i, '$1es'],\n    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],\n    [/(m|l)(?:ice|ouse)$/i, '$1ice'],\n    [/(pe)(?:rson|ople)$/i, '$1ople'],\n    [/(child)(?:ren)?$/i, '$1ren'],\n    [/eaux$/i, '$0'],\n    [/m[ae]n$/i, 'men'],\n    ['thou', 'you']\n  ].forEach(function (rule) {\n    return pluralize.addPluralRule(rule[0], rule[1]);\n  });\n\n  /**\n   * Singularization rules.\n   */\n  [\n    [/s$/i, ''],\n    [/(ss)$/i, '$1'],\n    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\\w]|^)li)ves$/i, '$1fe'],\n    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],\n    [/ies$/i, 'y'],\n    [/\\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],\n    [/\\b(mon|smil)ies$/i, '$1ey'],\n    [/(m|l)ice$/i, '$1ouse'],\n    [/(seraph|cherub)im$/i, '$1'],\n    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],\n    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],\n    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],\n    [/(test)(?:is|es)$/i, '$1is'],\n    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],\n    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],\n    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],\n    [/(alumn|alg|vertebr)ae$/i, '$1a'],\n    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],\n    [/(matr|append)ices$/i, '$1ix'],\n    [/(pe)(rson|ople)$/i, '$1rson'],\n    [/(child)ren$/i, '$1'],\n    [/(eau)x?$/i, '$1'],\n    [/men$/i, 'man']\n  ].forEach(function (rule) {\n    return pluralize.addSingularRule(rule[0], rule[1]);\n  });\n\n  /**\n   * Uncountable rules.\n   */\n  [\n    // Singular words with no plurals.\n    'adulthood',\n    'advice',\n    'agenda',\n    'aid',\n    'alcohol',\n    'ammo',\n    'anime',\n    'athletics',\n    'audio',\n    'bison',\n    'blood',\n    'bream',\n    'buffalo',\n    'butter',\n    'carp',\n    'cash',\n    'chassis',\n    'chess',\n    'clothing',\n    'cod',\n    'commerce',\n    'cooperation',\n    'corps',\n    'debris',\n    'diabetes',\n    'digestion',\n    'elk',\n    'energy',\n    'equipment',\n    'excretion',\n    'expertise',\n    'flounder',\n    'fun',\n    'gallows',\n    'garbage',\n    'graffiti',\n    'headquarters',\n    'health',\n    'herpes',\n    'highjinks',\n    'homework',\n    'housework',\n    'information',\n    'jeans',\n    'justice',\n    'kudos',\n    'labour',\n    'literature',\n    'machinery',\n    'mackerel',\n    'mail',\n    'media',\n    'mews',\n    'moose',\n    'music',\n    'manga',\n    'news',\n    'pike',\n    'plankton',\n    'pliers',\n    'pollution',\n    'premises',\n    'rain',\n    'research',\n    'rice',\n    'salmon',\n    'scissors',\n    'series',\n    'sewage',\n    'shambles',\n    'shrimp',\n    'species',\n    'staff',\n    'swine',\n    'tennis',\n    'traffic',\n    'transporation',\n    'trout',\n    'tuna',\n    'wealth',\n    'welfare',\n    'whiting',\n    'wildebeest',\n    'wildlife',\n    'you',\n    // Regexes.\n    /[^aeiou]ese$/i, // \"chinese\", \"japanese\"\n    /deer$/i, // \"deer\", \"reindeer\"\n    /fish$/i, // \"fish\", \"blowfish\", \"angelfish\"\n    /measles$/i,\n    /o[iu]s$/i, // \"carnivorous\"\n    /pox$/i, // \"chickpox\", \"smallpox\"\n    /sheep$/i\n  ].forEach(pluralize.addUncountableRule);\n\n  return pluralize;\n});\n\n\n//# sourceURL=webpack:///./node_modules/pluralize/pluralize.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pluralize = __webpack_require__(/*! pluralize */ \"./node_modules/pluralize/pluralize.js\");\n\nvar name = 'John Doe';\nconsole.log(\"Hello \".concat(name, \", how are you?\"));\nconsole.log(\"I ate \".concat(pluralize('apple', 1)));\nconsole.log(\"I ate \".concat(pluralize('apple', 2)));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });