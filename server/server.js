// 开启服务器
const express = require('express');
const app = express();
//引入跨域插件
const cors = require('cors');
const bodyParser = require('body-parser');

const musiclist = require('./router/music');
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//设置跨域请求?
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use((req, res, next) => {
  res.header('access-control-allow-origin', 'http://localhost:8000')

  res.header('Access-Control-Allow-Credentials', true);//

  next();
})
//跨域访问数据cors设置 
app.use(cors({
  origin: ['http://localhost:8000'],//允许这个域的访问
  methods: ['GET', 'POST'],
  alloweHeaders: ['Conten-Type', 'Authorization']//只允许带这两种请求头的访问
}))

app.get('/test', function (req, res) {
  res.send("返回数据233");
})
app.get('/music', async function (req, res) {
  console.log("获取传递参数", req.query);
  if(req.query.id){
    // 如果存在id 则返回对应数据
    res.send(await musiclist.find().where({ id: req.query.id }));
  }
  if(req.query.all){
    // 不存在返回所有数据
    res.send(await musiclist.find());
  }
  
})
app.post('/test1', function (req, res) {
  console.log("获取参数", req.body);
  res.send(req.body);
})
// 监听服务端口
app.listen('2500', function () {
  console.log("server start!");
})