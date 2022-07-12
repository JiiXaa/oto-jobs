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
            {/* The <Outlet> element is used as a placeholder. In this case an <Outlet>enables the Users component to render its child routes. Thus the<Outlet> element will render either a <AllJobs> or <AddJobs> or <Profile> element depending on the current location. */}
            {/* In simple words <Outlet /> is where nested pages will be displayed */}
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
