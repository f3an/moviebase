import styled from 'styled-components'

const link = styled.a

export const StyledLink = link`
  color: white;
  text-decoration: none;
  &:hover {
    color: grey;
  }
`
