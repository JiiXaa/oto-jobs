import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Wrapper from '../assets/styledWrappers/BigSidebar';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          {/* You can load toggleSidebar from useAppContext() and add it to props to the NavLinks component, it will close navbar after clicking one, same behavior as smallSidebar has if you like. */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
