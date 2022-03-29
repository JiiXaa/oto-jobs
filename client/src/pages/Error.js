import { Link } from 'react-router-dom';
import StyledWrapper from '../assets/styledWrappers/ErrorPage';
import img from '../assets/img/404.gif';

const Error = () => {
  return (
    <StyledWrapper className='full-page'>
      <div>
        <img src={img} alt='page not found' />
        <h3>Page not found</h3>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to='/'>Home</Link>
      </div>
    </StyledWrapper>
  );
};

export default Error;
