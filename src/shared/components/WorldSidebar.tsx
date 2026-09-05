"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/shared/styles/world.module.css";

type WorldSidebarProps = {
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
};

export default function WorldSidebar({
  mobileMenuOpen,
  onCloseMobileMenu,
}: WorldSidebarProps) {
  const pathname = usePathname();

  const isHome = pathname === "/bitandink/home";
  const isBeanlog = pathname === "/bitandink/beanlog";
  const isPlayground =
    pathname === "/bitandink/playground";

  return (
    <>
      {mobileMenuOpen ? (
        <button
          type="button"
          className={styles.mobileMenuOverlay}
          onClick={onCloseMobileMenu}
          aria-label="Close workspace menu"
        />
      ) : null}

      <aside
        id="bitandink-workspace-nav"
        className={[
          styles.workspaceSidebar,
          mobileMenuOpen
            ? styles.workspaceSidebarOpen
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.workspaceIdentity}>
          <span className={styles.workspaceMark}>
            b/
          </span>

          <div>
            <strong>bitandink</strong>
            <span>workspace</span>
          </div>
        </div>

        <nav className={styles.workspaceNav}>
  <div className={styles.navGroup}>
    <span className={styles.navGroupLabel}>
      SPACES
    </span>

    <Link
      href="/bitandink/home"
      className={[
        styles.navItem,
        pathname === "/bitandink/home"
          ? styles.navItemActive
          : "",
      ].join(" ")}
      onClick={onCloseMobileMenu}
    >
      <span className={styles.navIcon}>⌂</span>
      <span>Home</span>
    </Link>

    <Link
      href="/bitandink/beanlog"
      className={[
        styles.navItem,
        pathname === "/bitandink/beanlog"
          ? styles.navItemActive
          : "",
      ].join(" ")}
      onClick={onCloseMobileMenu}
    >
      <span className={styles.navIcon}>◈</span>
      <span>Beanlog</span>
    </Link>

    <a
      href="https://bitandink.vercel.app"
      className={styles.navItem}
    >
      <span className={styles.navIcon}>↗</span>
      <span>Webzine</span>
    </a>

    <a
      href="https://bitandink.github.io/portfolio-2026/"
      className={styles.navItem}
    >
      <span className={styles.navIcon}>↗</span>
      <span>Portfolio</span>
    </a>
  </div>

  <div className={styles.navGroup}>
    <span className={styles.navGroupLabel}>
      LAB
    </span>

    <Link
      href="/bitandink/playground"
      className={[
        styles.navItem,
        pathname === "/bitandink/playground"
          ? styles.navItemActive
          : "",
      ].join(" ")}
      onClick={onCloseMobileMenu}
    >
      <span className={styles.navIcon}>＋</span>
      <span>Playground</span>
    </Link>
  </div>
</nav>

        <div className={styles.sidebarFooter}>
          <span>local workspace</span>
          <i />
        </div>
      </aside>
    </>
  );
}