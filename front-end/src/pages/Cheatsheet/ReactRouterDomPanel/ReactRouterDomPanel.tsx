import Panel from '../../../components/Panel/Panel';
import NavItem from './NavItem';

function ReactRouterDomPanel() {
    return (
        <Panel>
            <h1 className="mb-5">React Router Dom</h1>
            <p>React Router enables "client side routing".</p>
            <p>
                Client side routing allows your app to update the URL from a link click without
                making another request for another document from the server. Instead, your app can
                immediately render some new UI and make data requests with fetch to update the page
                with new information.
            </p>
            <nav className="flex flex-wrap my-6 *:my-6 *:mx-8">
                <NavItem name="Lead" path="/lead" />
                <NavItem name="Account" path="/account" />
                <NavItem name="Contact" path="/contact" />
                <NavItem name="Opportunity" path="/opportunity" />
                <NavItem
                    name="Hướng dẫn"
                    path="https://viblo.asia/p/react-router-dom-v6-maGK7BQB5j2"
                    target="_blank"
                />
            </nav>
            <h1 className="mb-5">
                Các khái niệm sẽ sử dụng: (Xem hướng dẫn để biết chức năng và cách sử dụng)
            </h1>
            <p>React elements: Routes, Route, Link, NavLink, Navigate</p>
            <p>Hooks: useNavigate, useParams, useSearchParams</p>
            <p>
                React.lazy: Lazy loading của React (tránh tải toàn bộ cái file js trong import trong
                lần đầu load trang)
            </p>
        </Panel>
    );
}

export default ReactRouterDomPanel;
