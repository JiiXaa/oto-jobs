import logo from '../assets/img/logo-search.svg';
import styled from 'styled-components';

// could pass different class name prop to this component and customize styles.
const Logo = () => {
  return <StyledImg src={logo} alt='OTOjobs' className='logo' />;
};

const StyledImg = styled.img`
  width: 60px;
`;

export default Logo;
