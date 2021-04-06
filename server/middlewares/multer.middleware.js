const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    const validExts = ['png', 'jpg', 'jpeg'];
    if (validExts.indexOf(ext) < 0) {
      return callback(new Error('Invalid extension'));
    }

    return callback(null, new Date().getTime() + 1 + '.' + ext);
  },
});

const image = (req, res, next) => {
  const upload = multer({ storage, limits: { fileSize: 1024 * 1024 } }).single('primaryImage');

  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Invalid image',
        data: {
          code: 505,
        },
      });
    }

    next();
  });
};

const images = (req, res, next) => {
  const upload = multer({ storage, limits: { fileSize: 1024 * 1024 } }).array('optionalImages', 5);

  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Invalid images',
        data: {
          code: 505,
        },
      });
    }

    next();
  });
};

module.exports = {
  image,
  images,
};
