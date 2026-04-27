import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, X, ArrowLeft } from 'lucide-react';

/* ── Design tokens ── */
const T = {
  fontMono: 'var(--font-accent)',
  fontDisplay: 'var(--font-heading)',
  fontBody: 'var(--font-primary)',
  muted: 'var(--text-muted)',
  text: 'var(--text-color)',
  bg: 'var(--bg-color)',
  red: '#C1121F',
  border: 'rgba(255,255,255,0.08)',
  slabBg: 'rgba(255,255,255,0.03)',
};

/* ── Slab container ── */
function Slab({ children, style = {}, noPad = false }) {
  return (
    <section style={{
      border: `1px solid ${T.border}`,
      background: T.slabBg,
      padding: noPad ? 0 : '2rem',
      ...style,
    }}>
      {children}
    </section>
  );
}

/* ── Slab header label bar ── */
function SlabLabel({ children, extra }) {
  return (
    <div style={{ padding: '1.25rem 2rem', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ fontFamily: T.fontMono, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: T.muted, margin: 0 }}>
        {children}
      </p>
      {extra && <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: T.muted }}>{extra}</span>}
    </div>
  );
}

/* ── Pill action button ── */
function PillBtn({ onClick, red = false, children, icon }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
        padding: '0.75rem 1.75rem 0.75rem 1.1rem',
        border: `1px solid ${red ? (hovered ? T.red : 'rgba(193,18,31,0.45)') : (hovered ? 'rgba(255,255,255,0.3)' : T.border)}`,
        borderRadius: '999px',
        background: 'transparent',
        color: hovered ? T.text : T.muted,
        fontFamily: T.fontBody,
        fontSize: '0.82rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <div style={{ width: '1.9rem', height: '1.9rem', borderRadius: '999px', background: red ? 'rgba(193,18,31,0.14)' : 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center' }}>
        {icon}
      </div>
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════
   PREVIEW PANEL — full-screen slide-in overlay
   ═══════════════════════════════════════════ */
const BODY_LOREM = `The concept of emptiness has fascinated designers for centuries — from the negative space in Japanese ink painting to the radical white pages of modernist publishing.

In digital interfaces, we call it "white space," but the name misleads. It is not a void. It is an active force — a rhythm that lets the eye rest, lets meaning breathe.

The best interfaces I've studied share a quality: restraint. Every element present is necessary. Every margin is deliberate. The designer's job is not to fill the screen, but to resist filling it.

When we design for nothingness — for the pause, the gap, the margin — we are designing for the reader's mind. We are leaving room for thought to arrive.

This is the architecture of nothingness: not absence, but intentional space.`;

function BlogPreview({ request, onClose, onAccept, onDecline }) {
  // Prevent body scroll while preview is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const patterns = [
    'radial-gradient(circle at 30% 40%, #1a1a1a 0%, #000 100%)',
    'linear-gradient(135deg, #111 25%, #000 25%, #000 50%, #111 50%, #111 75%, #000 75%)',
    'repeating-linear-gradient(90deg, #000, #000 12px, #111 12px, #111 24px)',
  ];
  const patternIdx = request.id % 3;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'fadein 0.25s ease',
        }}
      />

      {/* Panel — slides in from right */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(780px, 100vw)',
        zIndex: 50,
        background: 'var(--bg-color)',
        borderLeft: `1px solid ${T.border}`,
        display: 'flex', flexDirection: 'column',
        animation: 'slidein 0.35s cubic-bezier(0.25,1,0.5,1)',
        overflow: 'hidden',
      }}>

        {/* ── Panel top bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 2rem',
          borderBottom: `1px solid ${T.border}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: T.muted, fontFamily: T.fontMono, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = T.text}
              onMouseLeave={e => e.currentTarget.style.color = T.muted}
            >
              <ArrowLeft size={13} /> Close
            </button>
            <span style={{ width: '1px', height: '14px', background: T.border }} />
            <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.muted }}>
              Preview · Published view
            </span>
          </div>
          <span style={{
            fontFamily: T.fontMono, fontSize: '0.62rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: T.red,
            border: `1px solid rgba(193,18,31,0.4)`,
            borderRadius: '999px', padding: '0.25rem 0.8rem',
          }}>
            Pending Review
          </span>
        </div>

        {/* ── Scrollable blog content ── */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '6rem' }}>

          {/* Cover image */}
          <div style={{
            width: '100%', aspectRatio: '16/7',
            background: patterns[patternIdx],
            flexShrink: 0,
          }} />

          {/* Article body */}
          <article style={{ padding: '3rem 2.5rem' }}>
            {/* Meta */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: T.fontMono, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.red }}>
                {request.category}
              </span>
              <span style={{ fontFamily: T.fontMono, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.muted }}>
                {request.date}
              </span>
              <span style={{ fontFamily: T.fontMono, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: T.muted }}>
                by {request.author}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: T.fontDisplay,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem',
              color: T.text,
            }}>
              {request.title}
            </h1>

            {/* Excerpt lead */}
            <p style={{
              fontFamily: T.fontDisplay,
              fontSize: '1.15rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.7)',
              borderLeft: `2px solid ${T.red}`,
              paddingLeft: '1.25rem',
              marginBottom: '2rem',
              fontStyle: 'italic',
            }}>
              {request.excerpt}
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: T.border, margin: '2rem 0' }} />

            {/* Body text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {BODY_LOREM.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: T.fontBody,
                  fontSize: '1rem',
                  lineHeight: 1.85,
                  color: 'rgba(255,255,255,0.65)',
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {['Design', 'Editorial', 'Interfaces'].map(tag => (
                <span key={tag} style={{
                  fontFamily: T.fontMono, fontSize: '0.62rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: T.muted,
                  border: `1px solid ${T.border}`,
                  borderRadius: '999px', padding: '0.3rem 0.85rem',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>

        {/* ── Sticky action bar ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 2rem',
          background: 'rgba(0,0,0,0.85)',
          borderTop: `1px solid ${T.border}`,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}>
          <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.muted }}>
            Decision required
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <PillBtn onClick={onDecline} icon={<X size={12} />}>Decline</PillBtn>
            <PillBtn red onClick={onAccept} icon={<Check size={12} />}>Publish</PillBtn>
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadein  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slidein { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════
   REQUESTS PAGE
   ═══════════════════════════════════════════ */
const INITIAL_REQUESTS = [
  { id: 1, title: 'The Architecture of Nothingness', author: 'Ayesha R.', category: 'Design', date: 'Apr 25, 2026', excerpt: 'A meditation on empty space, white margins, and why the best interfaces say less — and mean more.', status: 'pending' },
  { id: 2, title: 'Memory Leaks & Mental Models', author: 'Bilal K.', category: 'Engineering', date: 'Apr 24, 2026', excerpt: 'How our conceptual models of memory management fail us in production and what to do about it.', status: 'pending' },
  { id: 3, title: 'Grid Systems for the Post-Screen Era', author: 'Sara M.', category: 'Design', date: 'Apr 23, 2026', excerpt: 'Thinking beyond pixels — layout systems built for ambient, spatial, and wearable surfaces.', status: 'pending' },
  { id: 4, title: 'Abstract Syntax Trees as Art', author: 'Hamza T.', category: 'Creative Coding', date: 'Apr 21, 2026', excerpt: 'When you parse code as a tree, you see the poem hiding inside every program.', status: 'pending' },
];

export default function Requests() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [preview, setPreview] = useState(null); // request being previewed

  const handle = (id, action) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    setPreview(null);
  };

  const pending = requests.filter(r => r.status === 'pending');
  const done    = requests.filter(r => r.status !== 'pending');

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 5rem)', padding: '4rem 5vw 6rem', maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* ── Header ── */}
        <header style={{ marginBottom: '1rem' }}>
          <p style={{ fontFamily: T.fontMono, fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: T.muted, marginBottom: '0.75rem' }}>
            Admin · Requests
          </p>
          <h1 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(3.5rem, 6vw, 8rem)', lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0, color: T.text }}>
            Incoming
          </h1>
        </header>

        {/* ── Counter slab ── */}
        <Slab noPad>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '1.5rem 2rem', borderRight: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.muted }}>Awaiting Review</span>
              <span style={{ fontFamily: T.fontDisplay, fontSize: '2.5rem', lineHeight: 1, color: T.red }}>{pending.length}</span>
            </div>
            <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: T.muted }}>Resolved</span>
              <span style={{ fontFamily: T.fontDisplay, fontSize: '2.5rem', lineHeight: 1, color: T.text }}>{done.length}</span>
            </div>
          </div>
        </Slab>

        {/* ── Pending slab ── */}
        {pending.length > 0 && (
          <Slab noPad>
            <SlabLabel extra={`${pending.length} pending`}>Pending Review</SlabLabel>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {pending.map((req, i) => (
                <div key={req.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '1.75rem 2rem',
                  borderBottom: i < pending.length - 1 ? `1px solid ${T.border}` : 'none',
                  transition: 'background 0.2s',
                }}>
                  {/* Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.red }}>{req.category}</span>
                      <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.muted }}>{req.date}</span>
                    </div>
                    <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)', lineHeight: 1.15, margin: 0, color: T.text }}>
                      {req.title}
                    </h2>
                    <span style={{ fontFamily: T.fontMono, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>
                      by {req.author}
                    </span>
                  </div>

                  {/* "Preview" button */}
                  <button
                    onClick={() => setPreview(req)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.65rem 1.3rem 0.65rem 1rem',
                      border: `1px solid ${T.border}`,
                      borderRadius: '999px',
                      background: 'transparent',
                      color: T.muted,
                      fontFamily: T.fontBody,
                      fontSize: '0.8rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = T.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
                  >
                    <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center' }}>
                      <ArrowUpRight size={12} />
                    </div>
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </Slab>
        )}

        {/* ── Resolved slab ── */}
        {done.length > 0 && (
          <Slab noPad>
            <SlabLabel extra={`${done.length} resolved`}>Resolved</SlabLabel>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {done.map((req, i) => (
                <div key={req.id} style={{
                  padding: '1.25rem 2rem',
                  borderBottom: i < done.length - 1 ? `1px solid ${T.border}` : 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontFamily: T.fontDisplay, fontSize: '1.05rem', lineHeight: 1.2, color: T.text }}>{req.title}</span>
                    <span style={{ fontFamily: T.fontMono, fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>by {req.author}</span>
                  </div>
                  <span style={{
                    fontFamily: T.fontMono, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: req.status === 'published' ? T.red : T.muted,
                    border: `1px solid ${req.status === 'published' ? 'rgba(193,18,31,0.4)' : T.border}`,
                    borderRadius: '999px', padding: '0.3rem 0.9rem', flexShrink: 0,
                  }}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </Slab>
        )}

        {pending.length === 0 && done.length === 0 && (
          <Slab>
            <p style={{ fontFamily: T.fontMono, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.muted }}>
              No requests at this time.
            </p>
          </Slab>
        )}

      </div>

      {/* ── Preview panel (portal-like, rendered at end of tree) ── */}
      {preview && (
        <BlogPreview
          request={preview}
          onClose={() => setPreview(null)}
          onAccept={() => handle(preview.id, 'published')}
          onDecline={() => handle(preview.id, 'rejected')}
        />
      )}
    </>
  );
}
