const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;


/**
 * GET /admin/table
 * 获取所有的桌台信息
 * 返回数据
 * {tid:xxx,tname:'xxx',status:'',type:''}
 */
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM xfn_table ORDER BY tid',(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
/**
 * PUT /admin/setting
 * 请求数据
 * {appName：'xx',asminURL:'XX'}
 * 返回数据
 */
router.put('/',(req,res)=>{
    pool.query('UPDATE xfn_settings SET ?',req.body,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'settings updata seccess'})
    })
})