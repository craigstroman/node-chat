function main(req, res) {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.description,
    javascript: req.app.locals.javascript,
    path: req.path,
  });
}

module.exports = {
  main,
};
