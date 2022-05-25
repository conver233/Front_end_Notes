1,创建SSH Key
    $ ssh-keygen -t rsa -C "youremail@example.com"
    完成后在用户目录（windows: "C:\Users\xxx"）下回创建.ssh文件夹
2，登录git，添加ssh key 公钥
3,要走ssh协议
    git config --global http.sslverify true

重要提示：github上的东西都能看到，只是自己能修改