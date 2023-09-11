import styled from '@emotion/styled';

export const StyledButton = styled.button<{
  width: number;
  height: number;
  dark?: boolean;
  bold?: boolean;
  borderRadius?: number;
  fontSize?: number;
}>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: ${({ theme, dark }) =>
    dark ? 0 : `0.5px solid ${theme.color.greyLight}`};
  background-color: ${({ theme, dark }) =>
    dark ? theme.color.purpleDark : theme.color.white};
  color: ${({ theme, dark }) => (dark ? theme.color.white : theme.color.black)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 10)}px;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 16)}px;
`;
