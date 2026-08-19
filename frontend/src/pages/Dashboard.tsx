import announcements from '../data/announcements.json';
import styles from './Pages.module.css';

export function Dashboard() {
  return <div className={styles.page}>
    <div className={styles.pageIntro}><div><p className={styles.eyebrow}>Tuesday, September 22, 2026</p><h2>Good morning, Maya <span className={styles.wave}>✦</span></h2><p className={styles.subtitle}>Here&apos;s what&apos;s happening across your PeopleHub workspace.</p></div><button className={styles.outlineButton}>View profile <span>↗</span></button></div>
    <section className={styles.stats} aria-label="HR summary">
      <div className={`${styles.statTile} ${styles.tealTile}`}><div className={styles.statIcon}>◷</div><span className={styles.statLabel}>Leave balance</span><strong>14 <small>days</small></strong><span className={styles.statMeta}>+2 days accrued this month</span></div>
      <div className={`${styles.statTile} ${styles.blueTile}`}><div className={styles.statIcon}>⌁</div><span className={styles.statLabel}>Pending requests</span><strong>2 <small>open</small></strong><span className={styles.statMeta}>Both awaiting manager review</span></div>
      <div className={`${styles.statTile} ${styles.orangeTile}`}><div className={styles.statIcon}>$</div><span className={styles.statLabel}>Next payday</span><strong>Sep 30</strong><span className={styles.statMeta}>8 days from today</span></div>
    </section>
    <section className={styles.section}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Stay in the loop</p><h3>Recent announcements</h3></div><button className={styles.textButton}>See all <span>→</span></button></div><div className={styles.announcementList}>{announcements.map((item) => <article className={styles.announcement} key={item.title}><div className={styles.announcementIcon}>{item.type === 'Benefits' ? '✦' : item.type === 'Policy' ? '▤' : '◌'}</div><div><strong>{item.title}</strong><p>{item.type} <span>·</span> {item.date}</p></div><span className={styles.arrow}>↗</span></article>)}</div></section>
  </div>;
}
