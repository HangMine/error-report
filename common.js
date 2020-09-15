const multer = require('multer');
const { spawn } = require('child_process');

// 获取请求参数(获取不到formData，需要先通过multer中间件)
const getParams = (req, options) => {
  const params = Object.keys(req.query).length ? req.query : req.body;
  const unHandleParamsKeys = options && options.unHandleParams;

  // 处理额外参数
  if (unHandleParamsKeys && unHandleParamsKeys.length) {
    // 有额外参数的情况
    let needHandleParams = {};
    let unHandleParams = {};
    for (const [key, value] of Object.entries(params)) {
      unHandleParamsKeys.includes(key) ? (unHandleParams[key] = value) : (needHandleParams[key] = value);
    }

    return [needHandleParams, unHandleParams];
  } else {
    // 正常情况
    return params;
  }
};

// 请求参数验证
const check = (params, options) => {
  for (const [key, itemOptions] of Object.entries(options)) {
    const value = params[key];
    let errData;
    for (const option of itemOptions) {
      const required = option.required;
      const type = option.type;
      const validator = option.validator;
      const msg = option.msg;
      // 判断是否为空
      if (required) {
        if (!value)
          errData = {
            code: `check_fail: ${key}_is_null`,
            msg: msg || `${key}字段为空`
          };
      }

      // 判断最大最小值
      if (type) {
        const min = option.min || 0;
        const max = option.max || Infinity;
        switch (type) {
          case 'number':
            if (value < min || value > max)
              errData = {
                code: `check_fail: ${key}_must_in_range[${min},${max}]`,
                msg: msg || `数字必须大于${min}且小于${max}`
              };
            break;
          case 'string':
            if (value.length < min || value.length > max)
              errData = {
                code: `check_fail: ${key}_must_in_range[${min},${max}]`,
                msg: msg || `字符串位数必须大于${min}且小于${max}`
              };
            break;
          case 'array':
            if (value.length < min || value.length > max)
              errData = {
                code: `check_fail: ${key}_must_in_range[${min},${max}]`,
                msg: msg || `数组长度必须大于${min}且小于${max}`
              };
            break;
          default:
            break;
        }
      }

      // 判断自定义验证
      if (validator) {
        validator(value, errMsg => {
          if (errMsg || errMsg === 0) {
            errData = {
              code: `check_fail: ${key}_validator_fail`,
              msg: msg || errMsg
            };
          }
        });
      }
      if (errData) return errData;
    }
  }
};

// 上传封装，返回一个{fn,middle}的结构
const uploader = ({ path = '', fn = () => { }, type = 'single' } = {}) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage });
  return {
    fn,
    middle: upload[type]('file')
  };
};



// 根据捕获错误返回提示信息
const getCatchMsg = err => {
  console.log(err);
  if (err.sql) {
    return '数据库请求错误';
  } else {
    return '请求异常';
  }
};

const spawnPromise = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const subProcess = spawn(command, args, options);
    subProcess.on('exit', (code) => {
      const { exitMsg = '' } = options
      console.log(exitMsg)
      resolve(code)
    })
    subProcess.on('error', (error) => {
      console.error(error)
      reject(error);
    })
  })
}

module.exports = {
  getParams,
  check,
  uploader,
  getCatchMsg,
  spawnPromise
};
