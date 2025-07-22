import React from "react";

function Footer() {
  return (
    <footer className="w-full text-center text-sm py-3 mt-auto text-muted-foreground">
      &copy; {new Date().getFullYear()}{" "}
      <a
        href="https://github.com/lutfir2019"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary transition-colors"
      >
        @lutfir2019
      </a>
      . All rights reserved.
    </footer>
  );
}

export default Footer;
