import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

const links = [
  { to: '/', label: 'Dashboard', icon: '◈' },
  { to: '/leave', label: 'Leave', icon: '◷' },
  { to: '/employees', label: 'Employees', icon: '◎' },
  { to: '/policies', label: 'Policies', icon: '▤' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span className={styles.brandMark}>P</span><span>PeopleHub</span></div>
        <div className={styles.workspaceLabel}>WORKSPACE</div>
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}><span className={styles.navIcon}>{link.icon}</span>{link.label}</NavLink>)}
        </nav>
        <div className={styles.sidebarFooter}><div className={styles.helpDot}>?</div><div><strong>Need a hand?</strong><span>Ask the HR assistant</span></div></div>
      </aside>
      <main className={styles.main}><header className={styles.header}><h1>PeopleHub — HR Portal</h1><div className={styles.profile}><div className={styles.avatar}>MC</div><div><strong>Maya Chen</strong><span>Product · Employee</span></div><span className={styles.chevron}>⌄</span></div></header><div className={styles.content}>{children}</div></main>
    </div>
  );
}
