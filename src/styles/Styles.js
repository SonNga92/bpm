import styled from 'styled-components';

export const GlobalWrapper = styled.div`
  margin: 0 auto;
  ${'' /* padding: ${(props) => props.theme.spacing(1)}px; */}

  @media only screen and (max-width: 1550px) {
    width: 960px;
  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width: 1551px) {
    width: 1280px;
  }

  @media only screen and (min-width: 1565px) {
    width: 1280px;
  }

  @media only screen and (min-width: 1690px) {
    width: 1400px;
  }

  @media only screen and (min-width: 1875px) {
    width: 100%;
  }
`;
