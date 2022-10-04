# MyCom-Market

## Tech Stack

<div>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
    <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
    <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
</div>

<br/>
<br/>

## 프로젝트 목표

<br/>

CRUD 기능 구현 및 배포

<br/>
<br/>

## 실행

<br/>

#### 데모 링크

[데모링크 바로가기](https://mycom-market.herokuapp.com/)

<br/>

#### 실행 방법

```sh
cd server

npm install

npm start

cd ../client

npm install

npm start
```

<br/>
<br/>

## 실행 화면

### 1. 회원가입 / 로그인

![mycom-market-login](https://user-images.githubusercontent.com/73879034/193766804-bdd51988-2bdd-4764-9843-ad04589a6af4.gif)

- 닉네임 중복검사
- 비밀번호 8자리 이상

<br/>

---

<br/>

### 2. 게시글 작성 / 불러오기 / 수정 / 삭제

![mycom-market-product_crud](https://user-images.githubusercontent.com/73879034/193766974-fd43a03c-07d2-4fbc-989e-ca81a415e7bc.gif)

- 로그인 안 한 사용자는 게시글 작성 불가 / 로그인 페이지로 보냄
- 본인이 작성한 게시글에만 수정 / 삭제 기능 보임

<br/>

---

<br/>

### 3. 댓글 작성/ 불러오기 /수정 / 삭제

![mycom-market-reple](https://user-images.githubusercontent.com/73879034/193769418-8228af94-7097-45f7-b0da-d5c146cd7c6d.gif)

- 로그인 한 사용자만 댓글 작성 가능
- 본인이 작성한 댓글만 수정 / 삭제 가능
- ... 클릭 시 수정/ 삭제 기능 활성화

<br/>

---

<br/>

### 4. 게시글 더 불러오기 / 정렬 / 검색

![mycom-market_filter](https://user-images.githubusercontent.com/73879034/193770230-01f695fc-f29a-4bbb-a37a-6dcb506ab343.gif)

- 게시글 9개까지만 불러오고 게시글이 더 있을 시 불러오기 버튼 눌러서 더 불러오기
- 검색 단어가 제목 또는 내용에 포함된 게시글 필터링
  <br/>

---

<br/>

### 5. 프로필 이미지 변경

![mycom-market-image](https://user-images.githubusercontent.com/73879034/193768500-02274f7b-f1af-4748-b2cb-9ee0ab0bb117.gif)

<br/>
<br/>

## 폴더구조

```
MyComMarket
├─ App
│  └─ src
│     ├─ App.js
│     ├─ components
│     │  ├─ Heading.js
│     │  ├─ product
│     │  │  ├─ ImageUpload.js
│     │  │  ├─ List.js
│     │  │  └─ ProductDetail.js
│     │  └─ reple
│     │     ├─ Reple.js
│     │     ├─ RepleContent.js
│     │     ├─ RepleList.js
│     │     └─ RepleUpload.js
│     ├─ firebase.js
│     ├─ index.js
│     ├─ pages
│     │  ├─ MainPage.js
│     │  ├─ product
│     │  │  ├─ Edit.js
│     │  │  ├─ Product.js
│     │  │  └─ Upload.js
│     │  └─ user
│     │     ├─ Login.js
│     │     ├─ MyPage.js
│     │     └─ Signup.js
│     ├─ reducer
│     │  ├─ store.js
│     │  └─ userSlice.js
│     └─ setupProxy.js
│  ├─ index.js
│  ├─ package.json
│  ├─ Procfile
│  └─ server
│     ├─ config
│     │  ├─ key.js
│     │  └─ production.js
│     ├─ model
│     │  ├─ Counter.js
│     │  ├─ Product.js
│     │  ├─ Reple.js
│     │  └─ User.js
│     ├─ router
│     │  ├─ product.js
│     │  ├─ reple.js
│     │  └─ user.js
│     └─ util
│        └─ upload.js
└─ README.md
```
