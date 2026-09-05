"use client";

import { useState, type ReactNode } from "react";

import WorldSidebar from "@/shared/components/WorldSidebar";
import styles from "@/shared/styles/world.module.css";

type WorldShellProps = {
  current: string;
  children: ReactNode;
};

export default function WorldShell({
  current,
  children,
}: WorldShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <div className={styles.workspaceShell}>
      <WorldSidebar
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() =>
          setMobileMenuOpen(false)
        }
      />

      <main className={styles.workspaceMain}>
        <header className={styles.workspaceTopbar}>
          <div className={styles.workspaceBreadcrumb}>
            <span>bitandink</span>
            <i>/</i>
            <span>workspace</span>
            <i>/</i>
            <strong>{current}</strong>
          </div>

          <div className={styles.workspaceStatus}>
            <span className={styles.statusDot} />
            <span>ACTIVE</span>
          </div>

          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            aria-label="Toggle workspace menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
          </button>
        </header>

        {children}
      </main>
    </div>
  );
}