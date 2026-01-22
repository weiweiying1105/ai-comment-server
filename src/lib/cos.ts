import COS from 'cos-nodejs-sdk-v5';
// 初始化 COS 实例
const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
});


export default cos;
