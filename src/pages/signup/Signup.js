import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Signup() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { userName, email, password } = userInfo;
  const navigate = useNavigate();

  //유효성 검사
  const isValidEmail =
    email.length >= 5 && email.includes("@") && email.includes(".");
  const isValidPW = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(
    password,
  ); // 최소 8자, 최소 하나의 문자 그리고 하나의 숫자
  const isValidSignup = userName.length > 1 && isValidEmail && isValidPW;

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const enterKeyUp = (event) => {
    if (event.keyCode === 13 && isValidSignup) {
      signup();
    }
  };

  const signup = () => {
    if (isValidSignup) {
      // fetch("서버 API 주소", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      alert("회원가입 완료!");
      navigate("/");
    } else {
      alert("다시 입력해주세요.");
      // });
    }
  };
  const goToLogin = () => {
    navigate("/");
  };

  return (
    <SignupContainer>
      <div onKeyUp={enterKeyUp}>
        <form action="#none">
          <SignupTitle>회원가입</SignupTitle>
          <SignupName
            type="text"
            name="userName"
            placeholder="이름"
            onChange={handleInput}
          />
          <SignupId
            type="email"
            name="email"
            placeholder="5자 이상의 이메일"
            onChange={handleInput}
          />
          <SignupPw
            type="password"
            name="password"
            placeholder="영문/숫자 조합으로 8자 이상"
            onChange={handleInput}
          />
        </form>
        <ConfirmSignup>
          <CancelBtn onClick={goToLogin}>가입취소</CancelBtn>
          {isValidSignup ? (
            <ConfirmBtn onClick={signup}>가입하기</ConfirmBtn>
          ) : (
            <DisabledBtn>가입하기</DisabledBtn>
          )}
        </ConfirmSignup>
      </div>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
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

const SignupTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.boldColor};
  font-size: ${(props) => props.theme.l};
  font-weight: bold;
`;

const SignupName = styled.input`
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

const SignupId = styled(SignupName)``;
const SignupPw = styled(SignupName)``;

const ConfirmSignup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
`;

const CancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 30px;
  padding: 10px;
  border: 1px solid;
  border-radius: 3px;
  background-color: ${(props) => props.theme.boldColor};
  color: white;
  font-size: ${(props) => props.theme.s};
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
const ConfirmBtn = styled(CancelBtn)`
  background-color: ${(props) => props.theme.boldColor};
`;

const DisabledBtn = styled(CancelBtn)`
  background-color: ${(props) => props.theme.lightColor};
`;
