import logo from '../assets/img/logo-search.svg';
import hero from '../assets/img/hero-landing.svg';

const Landing = () => {
  return (
    <main>
      <nav>
        <img src={logo} alt='OTOjobs' className='logo' />
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
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={hero} alt='jobs lookup' className='img hero-img' />
      </div>
    </main>
  );
};

export default Landing;
