const refererCheckList = [
  'https://www.google.com/'
];

const refererCheck = function (req, res, next) {
  const referer = req.headers.referer ?? '';
  if(refererCheckList.indexOf(referer) > -1) {
    res.redirect("/noRedirect");
    return;
  }
  next();
}

module.exports = refererCheck;