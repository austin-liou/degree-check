
var path = require('path');
var srcDir = path.join(__dirname, '..', 'server/api');

require('blanket')({
  pattern: srcDir
});