import styled from 'styled-components';

const Wrapper = styled.main`
  text-align: center;
  img {
    max-width: 100%;
    display: block;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Wrapper;
