
 <h1 class="curproject-name"> CC_project </h1> 
 


# 新增

# 根据领域获取会议

## 根据领域搜索会议
<a id=根据领域搜索会议> </a>
### 基本信息

**Path：** /api/search/subject

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "id":1, //领域ID
    "index":1,
    "size":5
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        "result":[
            {
                "id":1,
                "title": "IEEE",
                "introduction": "AIworks",
                "start_date": "IEEE",
                "convening_place": "IEEE",
                "paper_ddl": "IEEE",
                "contact": "IEEE",
            },
        ],
        "page_num":15,//页面数
        "total_num":123//搜出的结果数量
    }
}
```
## 获取每个领域的会议数量统计结果
<a id=获取每个领域的会议数量统计结果> </a>
### 基本信息

**Path：** /api/search/all/subject

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": ""
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":[
        {
            "tag_id":1,
            "name":"自然语言处理",
            "num":10//表示目前有10场会议和自然语言相关
        },
         {
            "tag_id":1,
            "name":"自然语言处理",
            "num":10//表示目前有10场会议和自然语言相关
        }
        ]
}
```
# 首页展示信息

## 获取top5活跃学者
<a id=获取top5活跃学者> </a>
### 基本信息

**Path：** /api/home/activeScholars

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": ""
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":[
        {
            "name":"Guoliang Li",
            "avator":"",
            "agency":"Tsinghua University",
            "introduction":"A big boss"
        },
        /*
        {
            
        },
        {
            
        }
        */
    ]
}
```
## 获取了六项近期事项
<a id=获取了六项近期事项> </a>
### 基本信息

**Path：** /api/home/recentlyItem

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    //把token都代上，虽然我这边不用
    "token":""
}
```
### 返回数据

```javascript
{
    "state":"succ",
    "info":"",
    "data":[{
        "id":10,
        "date":"2018-10-28",
        "name":"CVPR",
        "instruction":"开始投稿"
    },
    {
        
    },
    {
        
    }//...
    ]//数组大小为6
}
```
## 获取最新发布的三个会议
<a id=获取最新发布的三个会议> </a>
### 基本信息

**Path：** /api/home/newest

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "qhkjwhke"
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":[
        {
            "conference_id":1,
            "title":"人工智能大会",
            "start_date":"",
            "convening_place":"北京",
            "state":35//状态字段，具体含义见文档
        }
        ]
}
```
# 修改

# 公共分类

# 用户

## [修改]查看用户已注册的会议
<a id=[修改]查看用户已注册的会议> </a>
### 基本信息

**Path：** /api/user/getRegisterConference

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
  "token": "rIfeXAlB/GsSxDiwFnjovHioFtN2ZaPJ+ngPj1iilrPsOtzGi4yVv04iLQ5Ll8aR",
  "type":"notOpen"//"notOpen"未开幕；"opened"：已开幕；"enden"：已结束；
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        //根据不同的type返回不同的会议信息。按时间逆序。
        "total_num":[1,2,3],//分别为notOpen,opened,end结果数量
        "result":[
            {
                "id":1,
                "title": "IEEE",
                "introduction": "AIworks",
                "start_date": "IEEE",
                "convening_place": "IEEE",
                "paper_ddl": "IEEE",
                "contact": "IEEE",
                "state":3,
                "institution_name":"beihang"
            },
        ],
    }
}
```
## [修改]获取注册作者信息(预加载用，就是用户注册会议时可自动填表单，提高用户体验)
<a id=[修改]获取注册作者信息(预加载用，就是用户注册会议时可自动填表单，提高用户体验)> </a>
### 基本信息

**Path：** /api/user/getRegister

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"",
    
    "conference_id":1//会议ID
}
```
### 返回数据

```javascript
{
    "status": "succ",
    "info": "",
    "data": {
        "type":0,//0代表作者；1代表聆听者
        
        "papers":[
            {
                "title":"论文1",//题目
                "paper_number":"00001111",//编号
                "authors": [
                    {
                        "name": "作者1",
                        "institution": "机构1", //注册会议时不需要提供机构，至少表字段中没有
                        "email": "11@11.com",
                    },
                    {
                        "name": "作者2",
                        "institution": "机构2",
                        "email": "22@22.com"
                    },
                    {
                        "name": "作者3",
                        "institution": "机构3",
                        "email": "22@22.com"
                    }
                ]
            },
            {
                "title":"论文2",//题目
                "paper_number":"00022222",//编号
                "authors": [
                    {
                        "name": "作者5",
                        "institution": "机构5", //注册会议时不需要提供机构，至少表字段中没有
                        "email": "11@11.com",
                    },
                    {
                        "name": "作者6",
                        "institution": "机构6",
                        "email": "22@22.com"
                    }
                ]
            }
         ]
    }
}
```
## [新增]获取所有收藏的会议
<a id=[新增]获取所有收藏的会议> </a>
### 基本信息

**Path：** /api/user/getCollectConference

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
  "token": "rIfeXAlB/GsSxDiwFnjovHioFtN2ZaPJ+ngPj1iilrPsOtzGi4yVv04iLQ5Ll8aR",
  "type":"notOpen"//"notOpen"未开幕；"opened"：已开幕；"enden"：已结束；
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        //根据不同的type返回不同的会议信息。按时间逆序。
        "total_num":[1,2,3],//分别为notOpen,opened,end结果数量
        "result":[
            {
                "id":1,
                "title": "IEEE",
                "introduction": "AIworks",
                "start_date": "IEEE",
                "convening_place": "IEEE",
                "paper_ddl": "IEEE",
                "contact": "IEEE",
                "state":3,
                "institution_name":"beihang"
            },
        ],
    }
}
```
## 判断当前会议是否被登录用户收藏
<a id=判断当前会议是否被登录用户收藏> </a>
### 基本信息

**Path：** /api/conference/iscollect/:id

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |  会议ID |
**Body**

```javascript
{
   "token": "rIfeXAlB/GsSxDiwFnjovAw7kws5+fmWJl1cWwDvzU4wRHWLZcZ2zZ2U/0Qzuadk"
}
```
### 返回数据

```javascript
{
  "status": "succ",
  "info": "",
  "data": 1,
}
```
## 判断用户是否注册过会议
<a id=判断用户是否注册过会议> </a>
### 基本信息

**Path：** /api/conference/isregister/:id

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |   |
**Body**

```javascript
{
   "token": ""
}
```
### 返回数据

```javascript
{
    "status": "succ",
    "info": "",
    "data": 1,//1代表已注册，0代表未注册，-1代表出错
}
```
## 取消收藏会议
<a id=取消收藏会议> </a>
### 基本信息

**Path：** /api/conference/cancel/collect/:id

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |  会议ID |
**Body**

```javascript
{
   "token": "rIfeXAlB/GsSxDiwFnjovAw7kws5+fmWJl1cWwDvzU4wRHWLZcZ2zZ2U/0Qzuadk"
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
## 收藏会议
<a id=收藏会议> </a>
### 基本信息

**Path：** /api/user/collect

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "rIfeXAlB/GsSxDiwFnjovAw7kws5+fmWJl1cWwDvzU4wRHWLZcZ2zZ2U/0Qzuadk",
   "conference_id": 1
}
```
### 返回数据

```javascript
{
  "status":"succ",//fail
  "info":"",
  "data":null
}
```
## 未确定[新增]用户提交注册信息
<a id=未确定[新增]用户提交注册信息> </a>
### 基本信息

**Path：** /api/user/register

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"rIfeXAlB/GsSxDiwFnjovHioFtN2ZaPJ+ngPj1iilrPsOtzGi4yVv04iLQ5Ll8aR",
    
    //conference_register注册相关
    "conference_id":1,
    //"user_id":1,//可从token中取得
    "payment":"ERM-WebIO-1.0/uploads/106490656815308452015221415330262.txt",//缴费凭证，文件url
    "type":1,//0：作者注册；1：聆听者
    "paper_number":"ak5JSp41",//json.string
    
    //投稿人可带多个作者参会，聆听者只有一个数据
    "participants":[
        {
            //"register_id":1,//注册id，后端取得
            "name":"222",
            "sex":"女",
            "job":"2222",
            "contract":"22222",
            "is_book":0,//0代表不预定，1代表预定
            "note":"22222"//备注
        },
        {
            "contract":"111",
            "is_book":1,
            "job":"111231232",
            "name":"AlvinZH",
            "note":"1111",
            "sex":"男"
        }//作者二
    ]
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
## 查看用户消息
<a id=查看用户消息> </a>
### 基本信息

**Path：** /api/user/messages

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
  "token": "rIfeXAlB/GsSxDiwFnjovAw7kws5+fmWJl1cWwDvzU4wRHWLZcZ2zZ2U/0Qzuadk",
  "index": 1,
  "size": 5,
  "state":0//0为未读,1为已读
}
```
### 返回数据

```javascript
{
    "status": "succ",
    "info": "",
    "data": {
        "total_num":10,//消息总数
        "page_num":5,//消息页数
        "messages":[
            {
                "id":1,
                "content":"一条消息",
                "sent_time":"",
                "state":0 //0：未读；1：已读
            },
            {
                "id":1,
                "content":"一条消息",
                "sent_time":"",
                "state":0 //0：未读；1：已读
            },
        ]
    }
}
```
## 消息已读
<a id=消息已读> </a>
### 基本信息

**Path：** /api/user/message/:id

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |   |
**Body**

```javascript
{
   "token": "rIfeXAlB/GsSxDiwFnjovAw7kws5+fmWJl1cWwDvzU4wRHWLZcZ2zZ2U/0Qzuadk"
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
# 用户投稿相关

## 【新增】修改投稿（修改录用）
<a id=【新增】修改投稿（修改录用）> </a>
### 基本信息

**Path：** /api/user/updateContribution

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"",
    
    "contribution_id":1,
    "title":"",
    "author":[],
    "abstract_":"",
    
    "description":"",//描述
    "attachment":"",//附件
}
```
## 【新增】查看某投稿具体情况
<a id=【新增】查看某投稿具体情况> </a>
### 基本信息

**Path：** /api/getContributionDetail

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"",
    
    "contribution_id":1//投稿ID
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        "contribution":{
            //"id":1,
            "conference_id":1,
            "user_id":1,
            "title":"",
            "uploader":"",
            "author": [
                {
                "name": "",
                "institution": "",
                "email": ""
                },
                {
                "name": "",
                "institution": "",
                "email": ""
                }
            ],
            "abstract_": "",
            "total_submit": "",//最新提交时间
            "total_result": 0,//总结果
            "paper_number": "",
            "state": 0,
        },
        
        //按提交时间顺序
        "reviews":[
            {
                "id":1,
                //"contribution_id":1,
                "description":"",
                "attachment":"",
                "submit_time":"",
                "result":0,
                "suggestion":"",
                "review_time":"",
                "state":0//扩展字段
            },
            {
                //第二条
            }
        ]
    }
}
```
## 投稿
<a id=投稿> </a>
### 基本信息

**Path：** /api/contribute

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "EgM/S/VXp4X/jnPrByxxQB4jaKpOqNubGvHxF5HzBzzin/26ztkRn9H8l5ELMRJU",
   "conference_id": 1,
   "title": "论文标题",
   "authors": [],
   "uploader": "",
   "abstract": "摘要",
   "file_url": "文件url"
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": {
      "contribution_id": 34
   }
}
```
## 用户查看投稿情况
<a id=用户查看投稿情况> </a>
### 基本信息

**Path：** /api/user/getContribution

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
  "token": "rIfeXAlB/GsSxDiwFnjovHioFtN2ZaPJ+ngPj1iilrPsOtzGi4yVv04iLQ5Ll8aR",
  "type": "pending"//pending：未审核；passed：通过；fixing：修改；rejected：拒绝
}
```
### 返回数据

```javascript
{
  "status": "succ",
  "info": "",
  "data": {
    "total": [
      1,
      2,
      3,
      4
    ],//四类的数量
    //对应类别的投稿信息
    "contributions": [
      {
          "conference_title":"",//新增，会议标题
          
        "id": 1,
        "conference_id": 1,
        "user_id": 1,
        "title": "一篇论文",
        "uploader": "",
        "author": [
          {
            "name": "",
            "institution": "",
            "email": ""
          },
          {
            "name": "",
            "institution": "",
            "email": ""
          }
        ],
        "abstract_": "",
        "total_result": 0,
        "paper_number": "",
        "state": 0,
        "total_submit": ""
      },
      {
          
      }
    ]
  },
}
```
# 用户登录服务

## 前端发送token获取相关的用户ID
<a id=前端发送token获取相关的用户ID> </a>
### 基本信息

**Path：** /api/user/token

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "EgM/S/VXp4X/jnPrByxxQB4jaKpOqNubGvHxF5HzBzzin/26ztkRn9H8l5ELMRJU"
}
```
### 返回数据

```javascript
{
    "user_id":12,
    "name":"sjnjs",
    "type":"manager"//或者user,principal
}
```
## 普通用户注册
<a id=普通用户注册> </a>
### 基本信息

**Path：** /user/register

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    'global replacement',//邮箱
    "password":"000",//密码
    "name":"观洲"//名字
}
```
### 返回数据

```javascript
{
    "code":"200",//200-成功,400-失败
    "msg":"",//成功或失败附带的消息
    "data":{
        "token":"241jhadu3j41kl2j4lk312j4kl23j"
    }//内容负载
}
```
## 普通用户登录
<a id=普通用户登录> </a>
### 基本信息

**Path：** /user/login

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "email":"1521@123.com",//用户邮箱
    "password":"1521"//用户密码
}
```
### 返回数据

```javascript
{
    "code":"200",//200-成功,400-失败
    "msg":"",//成功或失败附带的消息
    "data":{

        "token":"1234asdad3243432"
    }//内容负载
}
```
## 注册一个机构
<a id=注册一个机构> </a>
### 基本信息

**Path：** /ins/register

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "name": "苏联科学院",
   "location": "圣彼得堡",
   "phone": "110",
   "backimg": "noPic",
   "introduction": "我们的爷爷都进过太空",
   "evidence": 'global replacement',
   "principal": {
      'global replacement',
      "name": "观洲",
      "password": "000",
      "phone": "17801016258"
   }
}
```
### 返回数据

```javascript
{
   "code": "200",
   "msg": "注册成功",
   "data": {}
}
```
## 注销登录
<a id=注销登录> </a>
### 基本信息

**Path：** /api/user/logout

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |

### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
## 管理员登录
<a id=管理员登录> </a>
### 基本信息

**Path：** /manager/login

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
"email":"21312@fasd.com",//管理员的邮箱
"password":"密码"//管理员密码
}
```
### 返回数据

```javascript
{
    "code":"200",//200-成功,400-失败
    "msg":"",//成功或失败附带的消息
    "data":{
        "token":"21312adeasEweqwcasdqweqw"//复合了用户type,id和name的json的加密码
    }//内容负载
}
```
## 负责人登录
<a id=负责人登录> </a>
### 基本信息

**Path：** /pp/login

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   'global replacement',
   "password": "000"
}
```
### 返回数据

```javascript
{
    "code":"200",//200-成功,400-失败
    "msg":"",//成功或失败附带的消息
    "data":{
        "token":"21312adeasEweqwcasdqweqw"//复合了用户type,id和name的json的加密码
    }//内容负载
}
```
## 超级负责人添加负责人
<a id=超级负责人添加负责人> </a>
### 基本信息

**Path：** /pp/add

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"31432asdsda"//这个token的定义请参考
}
```
### 返回数据

```javascript
{
    "id":"2131"//新增的负责人的id
}
```
# 会议

## 修改会议信息
<a id=修改会议信息> </a>
### 基本信息

**Path：** /api/conference/modify/:id

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |   |   |
**Body**

```javascript
{
    "token":"CqLWSoVndAV7cI4KiPvJzTN2ElgkHCOI+OLWGJ/DZkbaELGHGma9Lv+qOQDtVZNj",
    //修改会议时，需要将所有字段都传回来
    //"conference_id": 1,
    
    "title":"探讨人工智能",
    "field": 1, //领域编号
    "introduction":"一起来学习吧！",
    "start_date":"Jan 18 2018 00:00:00",//开始时间
    "end_date":"Jan 18 2018 00:00:00",//结束时间
    "convening_place":"北京",//地点
    "essay_information":"人工智能领域",//征文信息（主题，内容要求）
    "essay_instructions":"英文，不少于三万字",//投稿要求（格式、语言、页数要求）
    "paper_ddl":"Jan 18 2018 00:00:00",//截稿日期
    "employ_date":"Jan 18 2018 00:00:00",//录用日期
    "register_ddl":"Jan 18 2018 00:00:00",//注册截止日期
    "schedule":"第一天：主会场；第二天：分会场",//日程安排
    "paper_template":"xxx/xxx.docx",//论文模板
    "register_information":"1.投稿人可带至多三人参会；\n2.普通与会人员：300/人次。",//会议注册信息（注册费用等）
    "ATinformation":"北航招待\n地铁十三号线知春路站",//住宿交通
    "contact":"谭老师\n电话：123456789",//联系方式
    "conference_template":0,//会议模板（页面风格）
    "backimg":"xxx/xxx.jpg",//背景图片
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": {}
}
```
## 发布会议
<a id=发布会议> </a>
### 基本信息

**Path：** /api/postConference

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token": "EgM/S/VXp4X/jnPrByxxQB4jaKpOqNubGvHxF5HzBzzin/26ztkRn9H8l5ELMRJU",

    "institution_id":1,
    "title":"探讨人工智能",
    "field": 1, //领域编号
    "introduction":"一起来学习吧！",
    "start_date":"Jan 18 2018 00:00:00",//开始时间
    "end_date":"Jan 18 2018 00:00:00",//结束时间
    "convening_place":"北京",//地点
    "essay_information":"人工智能领域",//征文信息（主题，内容要求）
    "essay_instructions":"英文，不少于三万字",//投稿要求（格式、语言、页数要求）
    "paper_ddl":"Jan 18 2018 00:00:00",//截稿日期
    "employ_date":"Jan 18 2018 00:00:00",//录用日期
    "register_ddl":"Jan 18 2018 00:00:00",//注册截止日期
    "schedule":"第一天：主会场；第二天：分会场",//日程安排
    "paper_template":"xxx/xxx.docx",//论文模板
    "register_information":"1.投稿人可带至多三人参会；\n2.普通与会人员：300/人次。",//会议注册信息（注册费用等）
    "ATinformation":"北航招待\n地铁十三号线知春路站",//住宿交通
    "contact":"谭老师\n电话：123456789",//联系方式
    "conference_template":0,//会议模板（页面风格）
    "backimg":"xxx/xxx.jpg",//背景图片
}
```
### 返回数据

```javascript
{
    "status":"succ",//fail
    "info":"",
    "data":null
}
```
## 搜索会议
<a id=搜索会议> </a>
### 基本信息

**Path：** /api/SearchConferences

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
  "keyword": "",//如果没有关键词，就传""
  "index": 1,
  "size": 10,
  "date_type":"end",
  //paper表示搜索投稿截止日期在date之后的会议，register表示搜索注册截止日期在date之后的会议
  //start表示搜索会议开始日期，end表示搜索会议结束日期，none表示不按照时间搜索。
  "date":"Jan 18 2018 00:00:00",
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        "result":[
            {
                "id":1,
                "title": "IEEE",
                "introduction": "AIworks",
                "start_date": "IEEE",
                "convening_place": "IEEE",
                "paper_ddl": "IEEE",
                "contact": "IEEE",
            },
        ],
        "page_num":15,//页面数
        "total_num":123//搜出的结果数量
    }
}
```
## 用户查看会议详细信息
<a id=用户查看会议详细信息> </a>
### 基本信息

**Path：** /api/conference/:id

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |  会议id |

### 返回数据

```javascript
{
  "status": "succ",
  "info": "",
  "data": {
    "id":1,
    "institution_id": 1,
    "title": "IEEE",
    "introduction": "AIworks",
    "start_date": "IEEE",
    "end_date": "IEEE",
    "convening_place": "IEEE",
    "essay_information": "IEEE",
    "essay_instructions": "IEEE",
    "paper_ddl": "IEEE",
    "employ_date": "IEEE",
    "register_ddl": "IEEE",
    "schedule": "IEEE",
    "paper_template": "IEEE",
    "register_information": "IEEE",
    "ATinformation": "IEEE",
    "contact": "IEEE",
    "conference_template": "IEEE",
    "release_time":"",//发布时间，新增
    "backimg": "IEEE",
    "state": "2",
    
    "field":1,//领域ID
  }
}
```
## 获取所有领域
<a id=获取所有领域> </a>
### 基本信息

**Path：** /api/subjects

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |

### 返回数据

```javascript
{
   "data": [
      {
         "name": "人工智能",
         "tag_id": 1
      },
      {
         "name": "机器学习",
         "tag_id": 2
      },
      {
         "name": "自然语言处理",
         "tag_id": 3
      }
   ],
   "status": "succ",
   "info": ""
}
```
# 主办方及工作人员

## [新增]boss增加工作人员
<a id=[新增]boss增加工作人员> </a>
### 基本信息

**Path：** /api/manage/addPrincipal

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"CqLWSoVndAV7cI4KiPvJzTN2ElgkHCOI+OLWGJ/DZkbaELGHGma9Lv+qOQDtVZNj",
    
    "email":"123@qq.com",
    "password":"123456",
    "name":"123",
    // "avator":"头像路径",
    "location":"地点",
    "phone":"手机号",
    // "power":"all",//"all"表示具有添加人员资格，"general"表示普通会议管理员
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
## [新增]boss查看工作人员
<a id=[新增]boss查看工作人员> </a>
### 基本信息

**Path：** /api/manage/principals

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": ""
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        //前端自行选择展示那些字段
        "principal":[
            {
                "id":1,
                "email":"123@qq.com",
                "name":"123",
                "avator":"头像路径",
                "location":"地点",
                "phone":"手机号",
                "power":"all",//"all"表示具有添加人员资格，"general"表示普通会议管理员
            },
            {
                //工作人员2
            }
        ]
    }
}
```
## [新增]主办方查看注册名单
<a id=[新增]主办方查看注册名单> </a>
### 基本信息

**Path：** /api/manage/registry

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "",
   "conference_id": 1,
   "index": 1,
   "size": 10
}
```
### 返回数据

```javascript
{
    "status": "succ",
    "info": "",
    "data": {
        "registries": [
            {
            "user_name": "", // 注册用户
            "user_id": "", // 注册用户id
            "type": 0,
            "paper_number": "", // 论文编号
            "payment": "", // 缴费凭证
            "state": 0,
            "participant": [
                {
                    "name": "",
                    "id": 1,
                    "sex": "男",
                    "job": "",
                    "contract": "", // 将错就错
                    "is_book": "",
                    "note": "",
                    "state": 0
                }
            ]
            }
        ],
        "page_num": 23, // 新增 总页数
    }
}
```
## [新增]审核稿件
<a id=[新增]审核稿件> </a>
### 基本信息

**Path：** /api/manage/review

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token": "",
    "user_id":1,//投稿里面的user_id
    "id": 13, // review id
    "action": 1, // 1 approve, 2 need to fix, 3 reject
    "suggestion": ""
}
```
### 返回数据

```javascript
{
    "status": "succ",
    "info": "",
}
```
## 查看主办的所有会议
<a id=查看主办的所有会议> </a>
### 基本信息

**Path：** /api/manage/conferences

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "EgM/S/VXp4X/jnPrByxxQB4jaKpOqNubGvHxF5HzBzzin/26ztkRn9H8l5ELMRJU"
}
```
### 返回数据

```javascript
{
    "status": "succ",
    "info": "",
    "data": [
        {
            "title": "",
            "id": 1,
            "start_date": "",
            "end_date": "",
            "papers": 123, // 所有稿件数量
            "registers": 43, // 注册人数
            "backimg": ""
        }
    ]
}
```
## 查看单个投稿
<a id=查看单个投稿> </a>
### 基本信息

**Path：** /api/manage/contribution

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "CqLWSoVndAV7cI4KiPvJzTN2ElgkHCOI+OLWGJ/DZkbaELGHGma9Lv+qOQDtVZNj",
   "id": 1
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": {
      "id": 1,
      "conference_id": 1,
      "user_id": 1,
      "title": "一篇论文",
      "uploader": "",
      "author": [
         {
            "name": "",
            "institution": "",
            "email": ""
         },
         {
            "name": "",
            "institution": "",
            "email": ""
         }
      ],
      "abstract_": "",
      "total_result": 0,
      "paper_number": "",
      "state": 0,
      "total_submit": "",
      "review": [
         {
            "id": 1,
            "description": "这是我第一次投稿",
            "attachment": "xxx/xxx.pdf",
            "submit_time": "",
            "result": 0,
            "suggestion": "",
            "review_time": "",
            "state": 0
         },
         {}
      ]
   }
}
```
## 查看投稿列表
<a id=查看投稿列表> </a>
### 基本信息

**Path：** /api/manage/conference/:id/contributions

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |   |   |
**Body**

```javascript
{
  "token": "CqLWSoVndAV7cI4KiPvJzTN2ElgkHCOI+OLWGJ/DZkbaELGHGma9Lv+qOQDtVZNj",
  "index": 1,
  "size": 5,
  "type": "all"//pending；passed；fixing；rejected
}
```
### 返回数据

```javascript
{
  "status": "succ",
  "info": "",
  "data": {
    "total_num": [
      10,
      1,
      2,
      3,
      4
    ],
    "page_num": 5,
    "contributions": [
      {
        "id": 1,
        "conference_id": 1,
        "user_id": 1,
        "title": "一篇论文",
        "uploader": "",
        "author": [
          {
            "name": "",
            "institution": "",
            "email": ""
          },
          {
            "name": "",
            "institution": "",
            "email": ""
          }
        ],
        "abstract_": "",
        "total_result": 0,
        "paper_number": "",
        "state": 0,
        "total_submit": ""
      },
      {}
    ]
  },
}
```
# 系统后台管理员

## 修改机构审查状态
<a id=修改机构审查状态> </a>
### 基本信息

**Path：** /api/setInstitutionStatus/:id/:status

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |   |
| status |  1 |   |
**Body**

```javascript
{
   "token": "EgM/S/VXp4X/jnPrByxxQB4jaKpOqNubGvHxF5HzBzzin/26ztkRn9H8l5ELMRJU"
}
```
### 返回数据

```javascript
{
   "state": "succ",
   "info": ""
}
```
## 得到需要审核的机构信息
<a id=得到需要审核的机构信息> </a>
### 基本信息

**Path：** /api/getInstitutionToCheck

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "xKGq3Q6zyKfN1gM5I7nOje4JuYuAuRdtDAum3LoukIxeBQudUZJiDYtl+WAMCfRvdua8/+3n0SY/PPDodcHONg=="
}
```
### 返回数据

```javascript
{
  "data": [
    {
      "backimg": "null",
      "evidence": "The evidence",
      "phone": "123456",
      "name": "BUAA",
      "location": "Beijing",
      "id": 1,
      "state": 0,
      "introduction": "a university"
    },
    {
      "backimg": "noPic",
      "evidence": 'global replacement',
      "phone": "110",
      "name": "苏联科学院",
      "location": "圣彼得堡",
      "id": 2,
      "state": 0,
      "introduction": "我们的爷爷都进过太空"
    }
  ],
  "status": "succ",
  "info": "",
}
```
# 文件服务

## [可用版]上传文件
<a id=[可用版]上传文件> </a>
### 基本信息

**Path：** /file/upload.do

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  Content-Type: multipart/form-data; | 是  |   |   |

### 返回数据

```javascript
{
   "link": "ERM-WebIO-1.0/uploads/19733378201530777956185531804295.png"
}
```
## [可用版]验证服务器存活
<a id=[可用版]验证服务器存活> </a>
### 基本信息

**Path：** /file/alive.do

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |

## 上传文件
<a id=上传文件> </a>
### 基本信息

**Path：** /

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  multipart/form-data | 是  |   |   |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| file | file  |  是 |    |   |



## 获取文件
<a id=获取文件> </a>
### 基本信息

**Path：** /uploads/filename

**Method：** GET

**接口描述：**
undefined

### 请求参数

# excel以及邮件服务

## 导出某会议的投稿情况
<a id=导出某会议的投稿情况> </a>
### 基本信息

**Path：** /api/conference/:id/contributions/export

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |  1 |  会议ID |

### 返回数据

```javascript
{
    "status":"succ",//fail
    "info":"",
    "data":'global replacement'//下载路径,fail时为null
}
```
## 导出某会议的注册人员情况
<a id=导出某会议的注册人员情况> </a>
### 基本信息

**Path：** /api/conference/:id/registers/export

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id |   |   |

### 返回数据

```javascript
{
    "status":"succ",//fail
    "info":"",
    "data":'global replacement'//下载路径,fail时为null
}
```
## 邮件服务
<a id=邮件服务> </a>
### 基本信息

**Path：** /api/email/send

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "to": "15",
   "subject": "这是邮件测试",
   "text": "这真的是一个邮件测试"
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
# 用户基本信息相关

## Principal修改机构以及他自己的信息
<a id=Principal修改机构以及他自己的信息> </a>
### 基本信息

**Path：** /api/principal/modify

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"12334453",
    "principal":{
        // "id":1,
        // "email":"123@qq.com",
        // "name":"123",
        "avator":"头像路径",
        // "location":"地点",
        "phone":"手机号",
        // "power":"all",//"all"表示具有添加人员资格，"general"表示普通会议管理员
    },
    //只有具有all资格的负责人才可以修改机构信息
    "institution":{
        // "id":1,
        // "name":"北航",
        // "location":"机构所在位置",
        "phone":"联系人手机号",
        "backing":"背景大图路径",
        "introduction":"机构简介",
        // "evidence":"法人信息文件路径"
    }
}
```
### 返回数据

```javascript
{
   "status": "succ",
   "info": "",
   "data": null
}
```
## Principal获得机构以及他自己的信息
<a id=Principal获得机构以及他自己的信息> </a>
### 基本信息

**Path：** /api/principal/info

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "asdasd"
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        "principal":{
            "id":1,
            "email":"123@qq.com",
            "name":"123",
            "avator":"头像路径",
            "location":"地点",
            "phone":"手机号",
            "power":"all",//"all"表示具有添加人员资格，"general"表示普通会议管理员
        },
        "institution":{
            "id":1,
            "name":"北航",
            "location":"机构所在位置",
            "phone":"联系人手机号",
            "backing":"背景大图路径",
            "introduction":"机构简介",
            "evidence":"法人信息文件路径"
        }
    }
}
```
## 修改普通用户信息
<a id=修改普通用户信息> </a>
### 基本信息

**Path：** /api/user/modify

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token": "asd",
  //注意，即使下面没有改变，也要把数据传回来
    "name":"李某某",
    // "email":"li@qq.com",
    "avator":"sjk/xx.jpg",
    "profile":"简介",
    "phone":"123",//新增
    "agency":"清华大学"//新增
}
```
### 返回数据

```javascript
{
    "status":"succ",
    "info":"",
    "data":{
        //返回修改后的数据
        "name": "李某某",
        "email": "li@qq.com",
        "avator": "sjk/xx.jpg",
        "profile": "简介",
        "phone": "123",//电话
        "agency": "清华大学"//机构
    }
}
```
## 工作人员修改密码
<a id=工作人员修改密码> </a>
### 基本信息

**Path：** /api/principal/password

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"",
    
    "origin_pass":"123456",//原来的密码
    "new_pass":"123456"//新的密码
}
```
### 返回数据

```javascript
{
    "status":"succ",//succ or fail
    "info":"原密码输入错误",
    "data":{}
}
```
## 用户修改密码
<a id=用户修改密码> </a>
### 基本信息

**Path：** /api/user/password

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
    "token":"rIfeXAlB/GsSxDiwFnjovHioFtN2ZaPJ+ngPj1iilrPsOtzGi4yVv04iLQ5Ll8aR",
    
    "origin_pass":"123456",//原来的密码
    "new_pass":"123456"//新的密码
}
```
### 返回数据

```javascript
{
    "status":"succ",//succ or fail
    "info":"原旧密码输入错误",
    "data":{}
}
```
## 获得普通用户的信息
<a id=获得普通用户的信息> </a>
### 基本信息

**Path：** /api/user/info

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

```javascript
{
   "token": "sda"
}
```
### 返回数据

```javascript
{
  "status": "succ",
  "info": "",
  "data": {
    "name": "李某某",
    "email": "li@qq.com",
    "avator": "sjk/xx.jpg",
    "profile": "简介",
    "phone": "123",//电话
    "agency": "清华大学"//机构
  }
}
```
