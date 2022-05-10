import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <Link href="/counter">
        <a href="#">Counter Management</a>
      </Link>
      <Link href="/customer">
        <a href="#">Customer View</a>
      </Link>
    </header>
  );
};

export default Header;
