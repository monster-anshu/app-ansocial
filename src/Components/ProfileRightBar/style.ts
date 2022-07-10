import styled, { css } from 'styled-components';
interface Styleprop {
  container: { maxHeight: number | undefined };
}
export const Container = styled.div<Styleprop['container']>`
  flex: 1;
  overflow-y: scroll;
  ${({ maxHeight }) => css`
    max-height: ${maxHeight ? maxHeight - 70 + 'px' : '100vh'};
  `}
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;
