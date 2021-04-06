const errorHandler = require('../core/handlers/error.handler');
const auth = require('../middlewares/auth.middleware');
const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();

router.get(
  '/:name',
  auth.authorization,
  errorHandler.handleRequest(async (req, res) => {
    const name = req.params.name;
    const pathImage = path.resolve(__dirname, `../../uploads/${name}`);

    fs.access(pathImage, (err) => {
      if (err) {
        const pathImageNotFound = path.resolve(__dirname, '../core/utils/images/not-found.png');
        return res.sendFile(pathImageNotFound);
      }

      return res.sendFile(pathImage);
    });
  })
);

module.exports = router;
