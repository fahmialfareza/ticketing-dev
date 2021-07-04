import Link from 'next/link';

interface User {
  currentUser: {
    id: string;
    email: string;
  };
}

export default function Header({ currentUser }: User) {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }: any) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <Link href="/">
        <a className="mx-2 navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-context-end">
        <ul className="nav d-flex align-items-center text-white">{links}</ul>
      </div>
    </nav>
  );
}
