import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/styledWrappers/SharedLayout';
import { Navbar, BigSidebar, SmallSidebar } from '../../components';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* displaying of a Small or Big Sidebar depends on CSS media queries as we only want to display one component at the time (not both). */}
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            {/* TODO: explain Outlet */}
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
