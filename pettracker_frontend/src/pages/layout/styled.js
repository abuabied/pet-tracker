import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  height: 100vh;
    `;

export const HeaderDiv = styled.div`
  z-index: 1;
  display: block;
  width: 100vw;
  position: inherit;
  @media (max-width: 899px) {
    position: fixed;
  }
`;

export const PageContent = styled.div`
  @media (max-width: 899px) {
    margin-top: 64px;
  }
  @media (max-width: 599px) {
    margin-top: 55px;
  }
`;

export const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem;
  align-items: center;
  gap: 1rem;
`;
