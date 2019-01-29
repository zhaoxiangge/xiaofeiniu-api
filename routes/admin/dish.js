/*
*菜品相关路由 
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;


/*
*API：  GET  /admin/dish  
*获取所有的菜品（按类别进行分类）
*返回数据：
* [
*   {cid: 1, cname:'肉类', dishList:[{},{},...]}
*   {cid: 2, cname:'菜类', dishList:[{},{},...]}
*   ....
* ]
*/
router.get('/',(req,res)=>{
    //为了获得所有菜品,必须先查询菜品类别
    pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid',(err,result)=>{
        if(err) throw err;
        //循环遍历每个菜品类别,查询该类别下有哪些菜品
        var categoryList=result;
        var finishCount=0;
        for(var c of categoryList){
            pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC',c.cid,(err,result)=>{
                if(err) throw err;
                c.disLish=result;
                finishCount++;
                //必须保证所有的类别下的菜品全部查询完成才能发送响应消息-这些查询都是异步进行的
                if(finishCount==categoryList.length){
                    res.send(categoryList)
                }
            })
        }


    })
})


/* POST /admin/dish/image
 *请求参数：
 * 接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
 */




/* POST /admin/dish
 * 添加新的菜品
 */