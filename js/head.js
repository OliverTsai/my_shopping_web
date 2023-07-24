// JavaScript檔案（navbar.js）

// 檢查是否有使用者資料
var userID = localStorage.getItem('user_ID');
var userName = localStorage.getItem('user_Name');

var navbarStyle = `
    <style>
        #navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f1f1f1;
            padding: 10px;
        }
    </style>
`;

if (userID && userName) {
    // 顯示使用者名稱
    var navbarContent = `
        <div id="navbar">
            <a href="index.html">首頁</a>
            <div id="userField">歡迎 ${userName} <button onclick="logout()">賣家登出</button><input type="button" value="新增產品" onclick="location.href='image.html'"></div>
        </div>
    `;
} else {
    // 顯示登入按鈕
    var navbarContent = `
        <div id="navbar">
            <a href="index.html">首頁</a>
            <div id="userField">
                <a href="login.html">登入｜<a href="register.html">註冊</a></a>
            </div>
        </div>
    `;
}

// 插入CSS樣式
document.write(navbarStyle);

// 插入動態生成的HTML片段
document.write(navbarContent);

// 登出功能
function logout() {
    // 清除本地端紀錄
    localStorage.removeItem('user_ID');
    localStorage.removeItem('user_Name');
    
    // 重新導向到登入頁面或其他目標頁面
    window.location.href = 'index.html'; // 替換為您的目標頁面
}