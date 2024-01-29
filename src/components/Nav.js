import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <NavContainer>
      <NavWrap>
        <SidebarBtn>Menu</SidebarBtn>
        <SearchBar>
          <input type="text" placeholder="Search" />
        </SearchBar>
        <Logout onClick={logout}>로그아웃</Logout>
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
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
`;

const SidebarBtn = styled.div`
  padding-left: 25px;
  cursor: pointer;
`;

const SearchBar = styled.div`
  width: 400px;

  input {
    width: 100%;
    height: 25px;
    padding: 7px;
    border: 1px solid rgba(218, 217, 217, 0.7);

    &::placeholder {
      padding-left: 3%;
    }
  }
`;

const Logout = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;
  cursor: pointer;
`;
