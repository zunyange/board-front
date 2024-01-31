import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function Login({ setUserEmail }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginInfo;
  const navigate = useNavigate();

  // 로그인 버튼 활성화
  const isValidEmail =
    email.length >= 5 && email.includes("@") && email.includes(".");
  const isValidPW = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(
    password,
  );
  const isValidLogin = isValidEmail && isValidPW;

  const handleInput = (e) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const enterKeyUp = (event) => {
    if (event.keyCode === 13) {
      login();
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.76:8080/security/login-proc",
        {
          username: email,
          password: password,
        },
      );

      if (response.data && response.data.code === 200) {
        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userEmail", email);
        // axios의 기본 헤더에 인증 토큰 설정
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;

        setUserEmail(email);
        navigate("/boards");
        alert("로그인 성공!");
      } else {
        console.error("Login failed: ", response.data);
        alert("로그인 실패! " + response.data.errorMessage);
      }
    } catch (error) {
      console.error("Error during login request: ", error);
      alert("An error occurred during login. Please try again.");
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
            <LoginBtn type="submit" onClick={() => login()}>
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
