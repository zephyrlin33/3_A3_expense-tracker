# A3: 老爸的私房錢

##功能
1. 註冊帳號
2. 註冊之後，可以登入/登出
   只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
   在首頁一次瀏覽所有支出的清單
3. 看到自己建立的資料
4. 在首頁看到所有支出清單的總金額
5. 新增一筆支出
6. 編輯支出
8. 刪除任何一筆支出
9. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

##安裝方法
1. clone專案到本地，並請自行建立.env
```
git clone https://github.com/zephyrlin33/expense-tracker_3_A3.git
```
2. 安裝npm 
```
npm install
```
3. 加載種子資料 
```
npm run seed
```
4. 開始執行app.js
```
npm run dev
```
5. 退出
Ctrl +C

# 使用工具
1. Express v4.17.1
2. Express-handlebars v4.0.2
3. Mongoose v5.13.15
4. Body-parser v1.20.1
5. Node.js v16.17.0
6. Front-awesome 
7. npm v8.15.0
8. bcryptjs v^2.4.3
9. connect-flash v0.1.1
10. dotenv v8.2.0
11. express-session v1.17.1
12. method-override v3.0.0
13. passport v0.4.1
14. passport-facebook v3.0.0
15. passport-local v1.0.0
