const urlRegEx = new RegExp("^[a-z-]+:", "i");
const isRelative = (url: string) => !urlRegEx.test(url);

export default (req, res) => {
  const { as: redirectTo, ps: previewSecret } = req.query;

  if (previewSecret != process.env.previewSecret) {
    return res.status(404).json({ message: "Malformed request url" });
  }

  if (!isRelative(redirectTo)) {
    return res.status(404).json({ message: "Malformed request url" });
  }

  if (!process.env.previewApiKey || !redirectTo) {
    return res.status(404).json({ message: "Preview not available" });
  }

  return res.setPreviewData({}).redirect(redirectTo);
};
