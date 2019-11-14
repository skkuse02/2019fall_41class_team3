<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title> Login Page </title>
        
    </head>
    <body>
        <form method="post" id="loginForm" name="loginForm" action=>
            <div>
                <label for="uid">아이디</label>
                <input type="text" id="uid" name="uid" placeholder="ID" pattern="^([a-zA-Z0-9_]){8,20}$" >
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" placeholder="Password" >
            </div>
            <button type="submit">로그인</button>
            <button>ID 찾기</button>
            <button>PW 찾기</button>
            <div>
                <input type="checkbox" id="loginSustain" name="loginSustain">
                <label for="loginSustain"><span>로그인 상태 유지</span></label>
            </div>
            
        </form>
    </body>
    
</html>