import React from 'react'

function Footer() {
  return (
    <footer className="w-full text-center text-sm py-3 mt-auto text-muted-foreground">
      &copy; {new Date().getFullYear()} Lutfir R. All rights reserved.
    </footer>
  );
}

export default Footer