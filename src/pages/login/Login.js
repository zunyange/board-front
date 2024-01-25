import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginInfo;
  const navigate = useNavigate();

  const isValidEmail =
    email.length >= 5 && email.includes("@") && email.includes(".");
  const isValidPW = password.length >= 8;
  const isValidLogin = isValidEmail && isValidPW;

  const handleInput = (e) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const enterKeyUp = (event) => {
    if (event.keyCode === 13 && isValidLogin) {
      login();
    }
  };

  const login = () => {
    if (isValidLogin) {
      // fetch("서버 API 주소", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      alert("로그인 성공!");
      navigate("/boards");
    } else {
      alert("이메일과 비밀번호를 다시 확인해주세요.");
      // });
    }
  };
  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <LoginContainer>
      <div onKeyUp={enterKeyUp}>
        <div>
          <LoginTitle>게시판 로그인</LoginTitle>
          <LoginId
            type="text"
            name="email"
            placeholder="아이디 또는 이메일"
            onChange={handleInput}
          />
          <LoginPw
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInput}
          />
          {isValidLogin ? (
            <LoginBtn type="submit" onClick={login}>
              로그인
            </LoginBtn>
          ) : (
            <LoginDisabledBtn type="submit">로그인</LoginDisabledBtn>
          )}
        </div>
        <ToSignup>
          <a href="#" onClick={goToSignup}>
            회원가입
          </a>
        </ToSignup>
      </div>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 250px;
  height: 200px;
  padding: 60px;
  border: 1px solid #eaeaea;
  background-color: white;
`;

const LoginTitle = styled.legend`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.boldColor};
  font-size: ${(props) => props.theme.l};
  font-weight: bold;
`;

const LoginId = styled.input`
  display: flex;
  justify-content: center;
  width: 220px;
  height: 15px;
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  background-color: #fafafa;
  color: gray;
  font-size: 12px;
`;

const LoginPw = styled.input`
  display: flex;
  justify-content: center;
  width: 220px;
  height: 15px;
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  background-color: #fafafa;
  color: gray;
  font-size: 12px;
`;

const LoginBtn = styled.button`
  width: 243px;
  height: 38px;
  margin-top: 10px;
  margin-bottom: 50px;
  padding: 10px;
  border: 1px solid;
  border-radius: 3px;
  background-color: ${(props) => props.theme.boldColor};
  color: white;
  font-size: 15px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const LoginDisabledBtn = styled(LoginBtn)`
  background-color: ${(props) => props.theme.lightColor};
`;

const ToSignup = styled.div`
  text-align: center;
  a {
    color: ${(props) => props.theme.primaryColor};
    text-decoration: none;
  }
`;
