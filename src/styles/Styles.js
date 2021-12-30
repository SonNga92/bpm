import styled from 'styled-components';

export const GlobalWrapper = styled.div`
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing(1)}px;

  @media only screen and (max-width: 1324px) {
    width: 960px;
  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width: 1325px) {
    width: 1280px;
  }
`;
