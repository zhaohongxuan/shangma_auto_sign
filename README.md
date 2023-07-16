## 上马自动签到 [![Run Auto Sign](https://github.com/zhaohongxuan/shangma_auto_sign/actions/workflows/auto-sign.yaml/badge.svg)](https://github.com/zhaohongxuan/shangma_auto_sign/actions/workflows/auto-sign.yaml)

### 基于 Node.js + GitHub Action 实现上海马拉松官网每日签到

作为上马9年没中签的受害者，我决定做一个`自动化脚本`来签到赚积分，虽然积分对于抽签的权重未可知，但是已知的是一定有用，至于作用多大？ 且看后续的上马抽签结果吧··
<img width="1341" alt="253779957-bb396d3c-a8ad-42a2-bada-7557c6f93eb8" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/e4435fe5-86c3-49e6-8741-c802512beeda">



### Use 使用

1. Fork本项目
2. 在Repo的Setting页面，添加名为`COOKIES`的Secret，Cookie的获取参考下面一节。
<img width="1286" alt="253779824-0e5fe704-1863-426b-83ca-7d40dcf24bab" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/fe4496d8-2e38-4c90-bafc-2b3d86ef187f">
3. 手动测试运行，在控制台应该能看到 `签到成功/请勿重复签到` 的提示
<img width="1444" alt="image" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/695683c9-fbc2-4cab-9ef8-41e2ddf59b78">



### 获取 Cookie

1. 打开Chrome控制台，macOS为`Command+option+I`
2. 登录上马官网：https://www.shang-ma.com， 如果已经登录了，直接刷新一下
3. 选择`网络(Network)`选项卡，类型过滤`Fetch/XHR`请求
<img width="1315" alt="253779619-28a9f62d-83d8-4d22-a01c-ccec831ccac8" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/92f2b9b5-9e48-4c0a-8575-a0bc337700fd">
4. 随便选一个请求，选择`标头Header`，找到Cookie字段，双击复制
<img width="1452" alt="253779699-56c62abb-d913-4eda-afa8-27b06b507bd3" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/d6aa51c0-1546-4d98-a017-b1c1d1382c75">

### TODO

- [x] Cookie登录
- [x] github action 支持
- [ ] 用户密码登录
### 申明

- 本项目仅做学习交流, 禁止用于各种非法途径
