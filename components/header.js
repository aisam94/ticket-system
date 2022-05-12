import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <Link href="/counter">
        <a>Counter Management</a>
      </Link>
      <Link href="/customer">
        <a>Customer View</a>
      </Link>
    </header>
  );
};

export default Header;
