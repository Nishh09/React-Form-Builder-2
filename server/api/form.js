const fs = require('fs');
const path = require('path');
const multer = require('multer');
const formData = require('./formData');

const extensions = ['.png', '.gif', '.jpg', '.jpeg'];
const handleError = (err, res) => {
  console.log(err);
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};
const tempPath = path.join(__dirname, '../../public/temp');
const upload = multer({ dest: tempPath }).any();

const dataFilePath = path.join(__dirname, 'dummyFormData.json');

const saveFormData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

const handleUpload = (req, res) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      console.log('multer.MulterError', error);
    } else if (error) {
      console.log('multer.MulterError', error);
    } else {
      const updatedFormData = { 
        task_data: req.body.task_data ? JSON.parse(req.body.task_data) : formData.data.task_data, 
        answers: formData.answers 
      };
      const file = req.files[0];
      if (!file) {
        saveFormData(updatedFormData);
        res.redirect('/api/form');
        return;
      }

      const tempFilePath = file.path;
      const fieldname = file.fieldname;
      const targetPath = path.join(__dirname, '../../public/uploads');
      const extn = path.extname(file.originalname).toLowerCase();
      if (extensions.indexOf(extn) > -1) {
        const targetFilePath = path.join(targetPath, `${fieldname}${extn}`);
        fs.rename(tempFilePath, targetFilePath, err => {
          if (err) return handleError(err, res);
          updatedFormData.answers[fieldname] = `/uploads/${fieldname}${extn}`;
          saveFormData(updatedFormData);
          res.redirect('/api/form');
        });
      } else {
        console.log('File type is not allowed!');
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .contentType('text/plain')
            .end('File type is not allowed!');
        });
      }
    }
  });
};

module.exports = handleUpload;
