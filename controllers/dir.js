const models = require('../db/models');
const Directory = models.dir;

/**
 * @param req
 * @param res
 * @param next
 * @dir
 */
exports.dir = (req, res, next) => {
  Directory.dir((template) => {
    res.send(template);
  });
}
