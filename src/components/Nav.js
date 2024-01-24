import React from "react";
import styled from "styled-components";

function Nav() {
  return (
    <NavContainer>
      <NavWrap>
        <SidebarBtn>Menu</SidebarBtn>
        <SearchBar>
          <input type="text" placeholder="Search" />
        </SearchBar>
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
  grid-template-columns: 1fr 5fr;
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
