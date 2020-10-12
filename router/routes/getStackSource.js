
const { getParams, check, uploader } = require('../../common');
const { getSourceInfos } = require('../../utils/source');
const getStackSource = async (req, res) => {

  try {
    const { serverLog = {}, project = 'demon-home' } = getParams(req);
    const { stack } = serverLog;
    const sourceInfos = await getSourceInfos({ stack, project });
    res.send(sourceInfos)
  } catch (error) {
    console.error(error)
    res.send({
      code: '-1',
      error: error.stack,
      msg: '错误解析失败'
    })
  }
}


module.exports = {
  '/getStackSource': getStackSource,
};