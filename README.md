# Restaurant List

運用 Node.js 建立本機伺服器，並透過 Express 與 Template Engine (Handlebars) 建立簡易的餐廳清單網頁。
- 於 Dev C4後端 M1 指標作業 中加入資料庫（MySQL）以及 CRUD 的應用。
- 於 Dev C4後端 M2 指標作業 中加入分頁功能，以及 middlewares 應用。
- 於 Dev C4後端 M3 指標作業 中加入註冊帳號與登入功能。

## Versions
- (2024.09.06)
  - 資料庫新增使用者資料，並建立使用者與餐廳資料之關聯。
  - 新增使用者註冊帳號與登入功能，以及透過 Oath2.0 進行 Facebook 登入。
  - 種子資料提供以下兩組帳號密碼可使用：
    - 帳號：user1@example.com / 密碼：12345678
    - 帳號：user2@example.com / 密碼：12345678
  - 重構路由並加入 middlewares 應用。
  - 新增分頁功能並優化資料庫處理。
  - 加入處理結果的提示訊息。
  - 增加「新增餐廳」、「刪除餐廳」、「編輯餐廳」功能
  - UI調整

## Features
- 可以註冊帳號、透過 Facebook Login直接登入
- 從 MySQL 資料庫中取得餐廳資料
- 使用者可進行以下功能操作：
- 檢視個別餐廳的詳細資訊頁面。
- 可自行新增餐廳，並將資料儲存於資料庫中。
- 可刪除餐廳資料。
- 可編輯餐廳資料。

## RTE
Node.js
MySQL 

## Tools

- 開發環境：Visual Studio Code
- 應用程式框架：Express v4.19.2
- 樣版引擎：Express-Handlebars v8.0.1
- 資料庫套件：mysql2 v3.2.0
- ORM：Sequelize v6.30.0 & Sequelize-CLI 6.6.0
- HTTP method套件：method-override v3.0.0
- 樣式框架：Bootstrap v5.3.3
- connect-flash v0.1.1
- express-session v1.18.0
- dotenv v16.4.5
- bcryptjs v2.4.3
- passport v0.7.0
- passport-local v1.0.0
- passport-facebook v3.0.0

## Contributor
Yuan WU
