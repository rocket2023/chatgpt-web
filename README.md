# ChatGPT Web

![cover](./docs/c1.png)
![cover2](./docs/c2.png)
![cover3](./docs/c3.png)
![cover4](./docs/c4.png)
![cover5](./docs/c5.png)
![cover6](./docs/c6.png)

## 安装部署

> 为了简便 `后端开发人员` 的了解负担，所以并没有采用前端 `workspace` 模式，而是分文件夹存放。如果只需要前端页面做二次开发，删除 `service` 文件夹即可。

### 前端
根目录下运行以下命令
```shell
pnpm install

// 开发环境调试
pnpm dev

// 生产环境打包
pnpm build
```

### 后端

进入文件夹 `/service` 运行以下命令

```shell
pnpm install
pnpm start
```

### API接口

1、/sendEmail

请求方式：post

请求参数：

```shell
{"email":"xxx@qq.com", "token":"xxxx"}
```

响应参数:
```shell
{"status":"Success", "message":"发送成功，请到邮箱里查看", "data":""}
```

> 邮件验证码发送成功后，将邮箱作为键，验证码最为值存到缓存里，伪代码如下
```shell
Cache::set("xxx@qq.com", "123456", 10*60)
```
2、/login

请求方式：post

请求参数：

```shell
{"email":"xxx@qq.com", "code":"123456"}
```

响应参数:
```shell
{"status":"Success", "message":"登录成功", "data": {"token": "xxxxx"}}
```
> 登录时通过传递过来的 email 作为键，从缓存里获取 code ，与前端传递过来的 code 对比，如果一致则验证成功。验证成功后通过 email 到用户表查询用户，如果查到就是登录，没有查到就是注册，将用户信息存到数据库。

3、/user

请求方式：get

请求参数：无

响应参数:
```shell
{"status":"Success", "message":"登录成功", "data": {"name": "xxxxx", "email": "xxxxx", "avatar": "xxxxx", "status": 1}}
```
> 通过 `header` 里携带的 `Authorization` 如
> `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwIiwic3ViIjoidXNlciIsImV4cCI6MTY3ODU5MjQyMiwiaWF0IjoxNjc4NTg4ODIyfQ.W77JOgruwJc4E3VvZpnZ6MYCFRJmP7e3u3kFMTO9msc` 获取当前登录用户信息

## 赞助

如果你觉得这个项目对你有帮助，并且情况允许的话，可以给我一点点支持，总之非常感谢支持～

<div style="display: flex; gap: 20px;">
	<div style="text-align: center">
		<img style="width: 200px" src="./docs/wechat.png" alt="微信" />
		<p>WeChat Pay</p>
	</div>
	<div style="text-align: center">
		<img style="width: 200px" src="./docs/alipay.png" alt="支付宝" />
		<p>Alipay</p>
	</div>
</div>

## License
MIT © [gouguoyin](./license)
