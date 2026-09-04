import { Link } from 'react-router-dom';
export default function NotFound(){return <main className="not-found"><span>404</span><h1>This page does not exist.</h1><p>The link may be outdated or the page may have moved.</p><Link className="btn" to="/">Return home</Link></main>}
