import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: 'var(--bg-color)', color: 'var(--text-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-primary)' }}>

      {/* ── Top nav ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.5rem 5vw',
        zIndex: 30,
        /* Scroll-reactive frosted glass */
        background: scrolled ? 'rgba(0,0,0,0.78)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        {/* Brand */}
        <div style={{
          fontFamily: 'var(--font-accent)',
          fontSize: '0.85rem',
          letterSpacing: '0.25em',
          textTransform: 'lowercase',
          color: 'var(--text-muted)',
        }}>
          codecell <span style={{ color: '#C1121F' }}>admin</span>
        </div>

        {/* Pill nav */}
        <nav style={{
          display: 'inline-flex',
          gap: '0.75rem',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '999px',
          padding: '0.45rem 0.55rem',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}>
          {[
            { to: '/admin', label: '.overview', end: true },
            { to: '/admin/requests', label: '.requests', end: false },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                color: isActive ? 'var(--text-color)' : 'var(--text-muted)',
                background: isActive ? 'rgba(193,18,31,0.18)' : 'transparent',
                padding: '0.6rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-primary)',
                transition: 'color 0.25s, background 0.25s',
                textDecoration: 'none',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Page content */}
      <main style={{ flex: 1, paddingTop: '5rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
