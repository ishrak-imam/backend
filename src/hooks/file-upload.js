
const fs = require('fs');
const path = require('path');

const imgPaths = {
  profileImg: 'profile-images'
};

const move = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, function (err) {
      (err) ? reject(err) : resolve(err);
    });
  });
};

const moveFiles = (files, filePath) => {

  /**
   * @todo
   * try to make directory creation async.
   */

  const dir = path.resolve(__dirname, '../../public', filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const promises = files.map((file) => {
    let src = path.resolve(__dirname, '../uploads', file);
    let dest = path.resolve(__dirname, '../../public', filePath, file);
    return move(src, dest);
  });
  return Promise.all(promises);
};

module.exports = function (options = {}) {
  return function fileUpload(hook) {
    return new Promise((resolve, reject) => {
      const { type, filenames } = hook.data;
      let path = '';
      switch (type) {
        case 'profileImage':
          path = imgPaths.profileImg;
          break;
        default:
          throw new Error('Provide a type');
      }
      moveFiles(filenames, path).then(
        () => {
          const files = filenames.map(filename => `${path}/${filename}`);
          hook.data = {
            files: files
          }
          resolve(hook);
        },
        () => {
          throw new Error('File upload failed')
        }
      );
    });
  };
};
