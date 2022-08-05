import Link from "next/link";

const NavBar = () => {
  return(
    <nav className="nav-group">
      <h5 className="nav-group-title">Navigation</h5>
      <Link href="/">
        <a className="nav-group-item">
          <span className="icon icon-home"></span>
          Alarms
        </a>
      </Link>
      <Link href="/editor">
        <a className="nav-group-item">
          <span className="icon icon-pencil"></span>
          Editor
        </a>
      </Link>
    </nav>
  );
};

export default NavBar;