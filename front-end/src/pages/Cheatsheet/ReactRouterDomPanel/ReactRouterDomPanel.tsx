import Panel from 'ui/Panel/Panel';
import NavItem from './NavItem';

function ReactRouterDomPanel() {
  return (
    <Panel>
      <h1 className='mb-5'>React Router Dom</h1>
      <h2 className='mb-5'>Allow Client side routing.</h2>
      <p>
        Client side routing allows your app to update the URL from a link click without making another request for
        another document from the server. Instead, your app can immediately render some new UI and make data requests
        with fetch to update the page with new information.
      </p>
      <nav className='my-6 flex flex-wrap *:mx-8 *:my-6'>
        <NavItem name='Lead' path='/lead' />
        <NavItem name='Account' path='/account' />
        <NavItem name='Contact' path='/contact' />
        <NavItem name='Opportunity' path='/opportunity' />
        <NavItem name='Hướng dẫn' path='https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2' target='_blank' />
      </nav>
      <div className='mb-5 space-y-2'>
        <h2>Các khái niệm sẽ sử dụng:</h2>
        <p>(Xem hướng dẫn để biết chức năng và cách sử dụng)</p>
      </div>
      <h3>React elements:</h3>
      <p> Routes, Route, Link, NavLink, Navigate</p>
      <h3>React hooks:</h3>
      <p>useNavigate, useParams, useSearchParams</p>
      <h3>React.lazy: </h3>
      <p>Lazy loading của React (tránh tải toàn bộ cái file js trong import trong lần đầu load trang)</p>
    </Panel>
  );
}

export default ReactRouterDomPanel;
