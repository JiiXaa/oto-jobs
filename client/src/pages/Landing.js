import hero from '../assets/img/hero-landing.svg';
import Wrapper from '../assets/styledWrappers/LandingPage';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            jobs look<span>UP</span>
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            voluptate, ducimus iure fuga, laborum repellat reiciendis nesciunt
            quasi nam recusandae dolore exercitationem quos. Nulla porro
            necessitatibus praesentium commodi impedit dicta!
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={hero} alt='jobs lookup' className='img hero-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
