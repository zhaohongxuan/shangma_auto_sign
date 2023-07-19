## 上马自动签到 [![Run Auto Sign](https://github.com/zhaohongxuan/shangma_auto_sign/actions/workflows/auto-sign.yaml/badge.svg)](https://github.com/zhaohongxuan/shangma_auto_sign/actions/workflows/auto-sign.yaml)

### 基于 Node.js + GitHub Action 实现上海马拉松官网每日签到
![254017014-2ea91157-452f-4113-887b-a6de8e14cf08-2](https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/702b57e1-eb15-4acb-b0ab-8cab448c6003)

作为上马9年没中签的受害者，我决定做一个`自动化脚本`来签到赚积分，虽然积分对于抽签的权重未可知，但是已知的是一定有用，至于作用多大？ 且看后续的上马抽签结果吧··

### 关于Job执行时间
签到Job执行时间是**UTC时间0点**，也就是**北京时间8点**执行，**不过由于GitHub的负载比较重**，真正签到时间可能延后一段时间，一般是几十分钟，这个延迟时间取决于GitHub Action的负载。

### Use 使用

1. Fork本项目
2. 在Repo的Setting页面，添加名为上马官网的用户名：`SM_USERNAME`和密码：`SM_PASSWORD`的Secret <img width="1194" alt="image" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/d54c5260-3471-4b61-8d5f-18fccd53d9b6">
3. 手动测试运行
<img width="1444" alt="image" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/695683c9-fbc2-4cab-9ef8-41e2ddf59b78">
在控制台应该能看到 `签到成功/请勿重复签到` 的提示
<img width="990" alt="image" src="https://github.com/zhaohongxuan/shangma_auto_sign/assets/8613196/399e89f7-2ad6-486e-9e67-8953564ec528">



### 申明
- 本项目仅做学习交流, 禁止用于各种非法途径
