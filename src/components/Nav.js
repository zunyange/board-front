import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Nav({ email, onLogout, currentPath }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    if (location.pathname.startsWith("/chat/rooms")) {
      navigate("/boards");
    } else {
      navigate("/chat/rooms");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    onLogout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <NavContainer>
      <NavWrap>
        <SidebarBtn>Menu</SidebarBtn>
        {/*<SearchBar>*/}
        {/*  <input type="text" placeholder="Search" />*/}
        {/*</SearchBar>*/}
        <GoToChat onClick={handleButtonClick}>
          {location.pathname.startsWith("/chat/rooms")
            ? "📋게시판 가기📋"
            : "🚀채팅방 가기🚀"}
        </GoToChat>
        <Setting>
          {email && <UserName>{email}</UserName>}
          <Logout onClick={logout}>로그아웃</Logout>
        </Setting>
      </NavWrap>
    </NavContainer>
  );
}

export default Nav;

const NavContainer = styled.div`
  height: 70px;
  display: grid;
  align-items: center;
  background-color: ${(props) => props.theme.lightColor};
`;

const NavWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
`;

const SidebarBtn = styled.div`
  padding-left: 25px;
  cursor: pointer;
`;

// const SearchBar = styled.div`
//   width: 400px;
//
//   input {
//     width: 100%;
//     height: 25px;
//     padding: 7px;
//     border: 1px solid rgba(218, 217, 217, 0.7);
//
//     &::placeholder {
//       padding-left: 3%;
//     }
//   }
// `;

const GoToChat = styled.div`
  cursor: pointer;
  font-weight: bold;
`;

const Setting = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
`;
const UserName = styled.div`
  padding-right: 25px;
`;

const Logout = styled.div`
  cursor: pointer;
`;
