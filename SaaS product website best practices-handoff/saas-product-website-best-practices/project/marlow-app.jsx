// Marlow beta — full interactive app flow.
// Consolidated from the design system's marlow-app UI kit (shared + 3 screens + root).
// Mounted by "Marlow App.dc.html" via <x-import component-from-global-scope="MarlowApp">.
// Exposes window.MarlowApp (root). Built on window.MarlowDesignSystem_437815 primitives.

/* ---------------------------------------------------------------- helpers */

const MIcon = ({ name, size = 20, stroke = 1.75, color = 'currentColor', style }) => {
  const data = window.lucide && window.lucide.icons && window.lucide.icons[name];
  const children = Array.isArray(data)
    ? data.map((node, i) => {
        const [tag, attrs] = node;
        return React.createElement(tag, { key: i, ...attrs });
      })
    : null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flex: 'none', ...style }}
    >
      {children}
    </svg>
  );
};

const DEMO = {
  brand: {
    name: 'Northbound Co',
    url: 'northbound.co',
    tagline: 'Quiet goods for a slow home',
    accent: '#1F3A2E',
    accent2: '#C19A53',
    paper: '#F4EFE4',
    ink: '#22201C',
    palette: ['#1F3A2E', '#C19A53', '#F4EFE4', '#B5452F', '#22201C'],
    fonts: ['Canela', 'Söhne'],
  },
  products: [
    { title: 'Cedar + Moss candle', price: '$28', bg: 'linear-gradient(150deg,#3a4a3a,#1f3a2e)' },
    { title: 'Heavyweight linen throw', price: '$96', bg: 'linear-gradient(150deg,#cdbfa3,#a98f63)' },
    { title: 'Stoneware mug, set of 2', price: '$34', bg: 'linear-gradient(150deg,#9a8e7d,#6c6256)' },
    { title: 'Hand-knotted wool runner', price: '$180', bg: 'linear-gradient(150deg,#b5452f,#7e2f20)' },
  ],
  email: {
    subject: 'A little warmth for the long nights',
    preview: 'Our winter candles are back — and 20% off through Sunday.',
    feature: 0,
  },
};

const AppHeader = ({ right }) => {
  const NS = window.MarlowDesignSystem_437815;
  const { Avatar } = NS;
  return (
    <header style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <img src="assets/logo-mark.svg" width="28" height="28" alt="" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Marlow</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {right}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, borderLeft: '1px solid var(--border-subtle)' }}>
          <span style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: DEMO.brand.accent, color: DEMO.brand.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500 }}>N</span>
          <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-body)' }}>{DEMO.brand.name}</span>
        </div>
        <Avatar name="Ava Reyes" size="sm" />
      </div>
    </header>
  );
};

/* --------------------------------------------------------------- Connect */

const ConnectScreen = ({ onDone }) => {
  const NS = window.MarlowDesignSystem_437815;
  const { Button, Input, Badge, Card } = NS;
  const b = DEMO.brand;

  const [url, setUrl] = React.useState('northbound.co');
  const [phase, setPhase] = React.useState('input'); // input | loading | pulled
  const [source, setSource] = React.useState('url');  // url | upload
  const [palette, setPalette] = React.useState(b.palette);
  const [fonts, setFonts] = React.useState(b.fonts);
  const [prods, setProds] = React.useState(DEMO.products);

  const connect = (src) => {
    setSource(src);
    setPhase('loading');
    setTimeout(() => setPhase('pulled'), 1400);
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: phase === 'pulled' ? 620 : 460 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
          <img src="assets/logo-mark.svg" width="34" height="34" alt="" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>Marlow</span>
        </div>

        {phase !== 'pulled' ? (
          <Card padding="lg" style={{ boxShadow: 'var(--shadow-md)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--text-strong)', margin: '0 0 8px' }}>Set up your brand</h1>
            <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 22px' }}>
              Paste your store URL. Marlow pulls your logo, colors, fonts, and a few products — automatically.
            </p>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="lg"
              disabled={phase === 'loading'}
              prefix={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-subtle)' }}>https://</span>}
            />
            <div style={{ height: 16 }} />
            {phase === 'loading' && source === 'url' ? (
              <Button variant="primary" size="lg" fullWidth disabled iconLeft={<MIcon name="LoaderCircle" size={18} style={{ animation: 'mspin 0.8s linear infinite' }} />}>Reading {url}…</Button>
            ) : (
              <Button variant="primary" size="lg" fullWidth onClick={() => connect('url')} iconRight={<MIcon name="ArrowRight" size={18} />}>Pull my brand</Button>
            )}

            {/* or — bring your own assets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            </div>

            <label
              style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-lg)', cursor: phase === 'loading' ? 'default' : 'pointer', background: 'var(--surface-card)' }}
              onClick={(e) => { e.preventDefault(); if (phase !== 'loading') connect('upload'); }}
            >
              <span style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                {phase === 'loading' && source === 'upload'
                  ? <MIcon name="LoaderCircle" size={18} style={{ animation: 'mspin 0.8s linear infinite' }} />
                  : <MIcon name="Upload" size={18} />}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)' }}>Upload your brand assets</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-subtle)' }}>Logo, fonts &amp; colors — drag in your own files</span>
              </span>
            </label>

            <p style={{ fontSize: 12.5, color: 'var(--text-subtle)', textAlign: 'center', margin: '16px 0 0' }}>
              Nothing to connect — Marlow only reads your logo, fonts, colors and products from your site or your uploads.
            </p>
          </Card>
        ) : (
          <Card padding="lg" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Badge tone="success" dot>{source === 'upload' ? 'Imported' : 'Pulled'}</Badge>
              <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{source === 'upload' ? "Here's what Marlow imported." : "Here's what Marlow found."}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 18, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: b.accent, color: b.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500 }}>N</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, color: 'var(--text-strong)' }}>{b.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>{b.url}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, padding: '18px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Palette</div>
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                  {palette.map((c) => (
                    <span key={c} style={{ position: 'relative', width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: c, border: '1px solid rgba(0,0,0,0.08)' }}>
                      <button onClick={() => setPalette(palette.filter((x) => x !== c))} title="Remove" style={{ position: 'absolute', top: -7, right: -7, width: 16, height: 16, borderRadius: '50%', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                        <MIcon name="X" size={10} stroke={2.4} />
                      </button>
                    </span>
                  ))}
                  <button onClick={() => setPalette([...palette, '#8a8279'])} title="Add color" style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1.5px dashed var(--border-default)', background: 'transparent', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                    <MIcon name="Plus" size={13} />
                  </button>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Fonts</div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {fonts.map((f) => (
                    <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 8px 4px 11px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', fontSize: 13, color: 'var(--text-body)' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500 }}>Aa</span>{f}
                      <button onClick={() => setFonts(fonts.filter((x) => x !== f))} title="Remove" style={{ width: 15, height: 15, borderRadius: '50%', border: 'none', background: 'var(--surface-sunken)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                        <MIcon name="X" size={9} stroke={2.4} />
                      </button>
                    </span>
                  ))}
                  <button onClick={() => setFonts([...fonts, 'Custom font'])} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 'var(--radius-pill)', border: '1.5px dashed var(--border-default)', background: 'transparent', fontSize: 12.5, color: 'var(--text-subtle)', cursor: 'pointer' }}>
                    <MIcon name="Plus" size={12} />Add
                  </button>
                </div>
              </div>
            </div>

            <div style={{ padding: '18px 0 4px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 12 }}>Products · {prods.length} pulled</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                {prods.map((p) => (
                  <div key={p.title} style={{ position: 'relative' }}>
                    <button onClick={() => setProds(prods.filter((x) => x !== p))} title="Remove" style={{ position: 'absolute', top: 5, right: 5, width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, zIndex: 2 }}>
                      <MIcon name="X" size={12} stroke={2.2} />
                    </button>
                    <div style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', background: p.bg, marginBottom: 6 }} />
                    <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-body)', lineHeight: 1.25 }}>{p.title}</div>
                  </div>
                ))}
                <button onClick={() => setProds([...prods, { title: 'New product', price: '$—', bg: 'linear-gradient(150deg,#cdbfa3,#9a8e7d)' }])} style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--border-default)', background: 'transparent', color: 'var(--text-subtle)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', fontSize: 11 }}>
                  <MIcon name="Plus" size={16} />Add
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 22 }}>
              <button onClick={() => setPhase('input')} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Start over</button>
              <Button variant="primary" onClick={onDone} iconRight={<MIcon name="ArrowRight" size={18} />}>Looks right</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- Create */

const CreateScreen = ({ onGenerate, showRecent = true }) => {
  const NS = window.MarlowDesignSystem_437815;
  const { Button, Textarea, SegmentedControl, Badge, Card } = NS;

  const [prompt, setPrompt] = React.useState('Winter candle restock — warm and cozy, 20% off through Sunday. Friendly, not pushy.');
  const [type, setType] = React.useState('promo');
  const [features, setFeatures] = React.useState([0]);
  const toggleFeature = (i) => setFeatures((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);

  const IDEAS = {
    promo: 'Weekend flash sale — 20% off the winter collection through Sunday. Warm and low-pressure, lead with the candles.',
    launch: 'Introduce the new linen throw — the story behind it, why it took a year to get right, and an early-access window.',
    holiday: 'A gift guide for the slow-living crowd — three picks under $50, cozy and unhurried, with a gentle shipping-deadline nudge.',
    newsletter: 'A monthly note from the studio — what we made, what we are reading, and one product worth a second look.',
  };

  const recents = [
    { name: 'Black Friday — early access', type: 'Promo', when: 'Exported · 3 weeks ago', tone: 'success' },
    { name: 'New: the linen throw', type: 'Launch', when: 'Draft · 4 weeks ago', tone: 'ember' },
  ];

  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)' }}>
      <AppHeader right={<button style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Drafts</button>} />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '52px 24px 80px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 12 }}>New campaign</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text-strong)', margin: '0 0 32px' }}>
          What are we sending?
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Your brief</div>
          <button onClick={() => setPrompt(IDEAS[type])} title="Marlow drafts a brief from your campaign type" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', color: 'var(--accent-text)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
            <MIcon name="Sparkles" size={14} />Suggest a {type} idea
          </button>
        </div>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          maxLength={280}
          style={{ marginBottom: 26 }}
        />

        <div style={{ marginBottom: 26 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Campaign type</div>
          <SegmentedControl
            fullWidth
            value={type}
            onChange={setType}
            options={[
              { value: 'promo', label: 'Promo' },
              { value: 'launch', label: 'Launch' },
              { value: 'holiday', label: 'Holiday' },
              { value: 'newsletter', label: 'Newsletter' },
            ]}
          />
        </div>

        <div style={{ marginBottom: 34 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Feature products</div>
            <span style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>{features.length ? features.length + ' selected' : 'Optional · none selected'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {DEMO.products.map((p, i) => (
              <Card key={p.title} padding="none" interactive selected={features.includes(i)} onClick={() => toggleFeature(i)} style={{ overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1', background: p.bg, position: 'relative' }}>
                  {features.includes(i) && (
                    <span style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: 'var(--ember-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MIcon name="Check" size={14} stroke={2.4} color="#fff" />
                    </span>
                  )}
                </div>
                <div style={{ padding: '8px 9px 10px' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.2, marginBottom: 2 }}>{p.title}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{p.price}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={() => onGenerate({ prompt, type, features })} iconLeft={<MIcon name="Sparkles" size={19} />}>
          Generate email
        </Button>

        {showRecent && (
          <div style={{ marginTop: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 14 }}>Recent</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recents.map((r) => (
                <Card key={r.name} interactive padding="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                    <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flex: 'none' }}>
                      <MIcon name="Mail" size={18} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>{r.when}</div>
                    </div>
                  </div>
                  <Badge tone={r.tone === 'success' ? 'success' : 'ember'}>{r.type}</Badge>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- Email view */

const EmailScreen = ({ onBack, payload }) => {
  const NS = window.MarlowDesignSystem_437815;
  const { Button, IconButton, Badge, Dialog, Spinner, Tooltip, Toast } = NS;
  const b = DEMO.brand;
  const fi = payload && payload.features && payload.features.length ? payload.features[0] : 0;
  const featured = DEMO.products[fi] || DEMO.products[0];

  const [subject, setSubject] = React.useState(DEMO.email.subject);
  const [preview, setPreview] = React.useState(DEMO.email.preview);
  const [regen, setRegen] = React.useState(null);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [thumb, setThumb] = React.useState(null);

  const doRegen = (id) => { setRegen(id); setTimeout(() => setRegen(null), 1300); };

  const Block = ({ id, children, pad = '0' }) => {
    const [hover, setHover] = React.useState(false);
    const busy = regen === id;
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: 'relative', borderRadius: 8, outline: hover && !busy ? '1.5px dashed var(--ember-300)' : '1.5px dashed transparent', outlineOffset: 4, transition: 'outline-color 120ms', padding: pad }}
      >
        {children}
        {hover && !busy && (
          <div style={{ position: 'absolute', top: -14, right: -6, display: 'flex', gap: 4, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', padding: 3, zIndex: 5 }}>
            <Tooltip content="Regenerate section"><IconButton size="sm" label="Regenerate" onClick={() => doRegen(id)}><MIcon name="RefreshCw" size={15} /></IconButton></Tooltip>
            <Tooltip content="Edit text"><IconButton size="sm" label="Edit"><MIcon name="PencilLine" size={15} /></IconButton></Tooltip>
          </div>
        )}
        {busy && (
          <div style={{ position: 'absolute', inset: -2, borderRadius: 10, background: 'color-mix(in srgb, var(--neutral-50) 72%, transparent)', backdropFilter: 'blur(1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, zIndex: 6 }}>
            <Spinner size={16} /><span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Rewriting…</span>
          </div>
        )}
      </div>
    );
  };

  const Editable = ({ value, onChange, style }) => (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent)}
      style={{ outline: 'none', borderRadius: 4, ...style }}
    >{value}</span>
  );

  return (
    <div style={{ minHeight: '100%', background: 'var(--surface-page)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <IconButton label="Back" onClick={onBack}><MIcon name="ArrowLeft" size={19} /></IconButton>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.1 }}>Winter candle restock</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Promo · {b.name}</div>
          </div>
          <Badge tone="ember" style={{ marginLeft: 4 }}>Draft</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button variant="secondary" iconLeft={<MIcon name="RotateCcw" size={16} />}>Regenerate</Button>
          <Button variant="primary" onClick={() => setExportOpen(true)} iconLeft={<MIcon name="Code2" size={17} />}>Export email</Button>
        </div>
      </header>

      <div style={{ flex: 1, overflow: 'auto', padding: '28px 24px 64px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto 18px', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: '14px 18px' }}>
          {[['Subject', subject, setSubject], ['Preview text', preview, setPreview]].map(([label, val, set]) => (
            <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '5px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)', width: 92, flex: 'none' }}>{label}</span>
              <Editable value={val} onChange={set} style={{ fontSize: 14.5, fontWeight: label === 'Subject' ? 600 : 400, color: label === 'Subject' ? 'var(--text-strong)' : 'var(--text-muted)', flex: 1 }} />
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 600, margin: '0 auto', background: b.paper, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ textAlign: 'center', padding: '22px 0 18px', borderBottom: `1px solid ${b.accent}22` }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, letterSpacing: '0.02em', color: b.accent }}>NORTHBOUND CO</span>
          </div>

          <div style={{ padding: '34px 44px 40px' }}>
            <Block id="hero">
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: b.accent2, marginBottom: 16, textAlign: 'center' }}>The candles are back</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em', color: b.ink, textAlign: 'center', margin: '0 0 16px' }}>A little warmth for the long nights.</h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, lineHeight: 1.6, color: b.ink, opacity: 0.82, textAlign: 'center', margin: '0 auto', maxWidth: 420 }}>
                Our small-batch winter candles are poured again — cedar, moss, and a little woodsmoke. For this week only, take 20% off the whole collection.
              </p>
            </Block>

            <div style={{ height: 30 }} />

            <Block id="feature">
              <div style={{ aspectRatio: '3/2', borderRadius: 10, background: featured.bg, marginBottom: 18 }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: b.ink, marginBottom: 4 }}>{featured.title}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: b.ink, opacity: 0.7, marginBottom: 18 }}>{featured.price} · burns 50+ hours</div>
                <a style={{ display: 'inline-block', background: b.accent, color: b.paper, fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, padding: '13px 30px', borderRadius: 6, textDecoration: 'none' }}>Shop the candle</a>
              </div>
            </Block>

            <div style={{ height: 30 }} />

            <Block id="code">
              <div style={{ border: `1.5px dashed ${b.accent2}`, borderRadius: 10, padding: '18px 20px', textAlign: 'center', background: '#fff8' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: b.ink, opacity: 0.7, marginBottom: 6 }}>Use code at checkout</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, letterSpacing: '0.12em', color: b.accent }}>WARMTH20</div>
              </div>
            </Block>
          </div>

          <div style={{ padding: '22px 44px 30px', borderTop: `1px solid ${b.accent}22`, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: b.ink, opacity: 0.55, lineHeight: 1.6 }}>
              Northbound Co · 114 Mill Road, Hudson NY<br />
              You're getting this because you bought something lovely once.<br />
              <span style={{ textDecoration: 'underline' }}>Unsubscribe</span> · <span style={{ textDecoration: 'underline' }}>View in browser</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12.5, color: 'var(--text-subtle)' }}>
          Hover any section to regenerate or edit it.
        </div>
      </div>

      <Dialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export this email"
        description="Marlow copies clean, tested HTML you can paste straight into Klaviyo, Shopify Email, or Mailchimp."
        footer={null}
        width={460}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 4 }}>
          <Button variant="primary" size="lg" fullWidth iconLeft={<MIcon name="Copy" size={18} />} onClick={() => { setExportOpen(false); setToast(true); setTimeout(() => setToast(false), 3500); }}>Copy HTML to clipboard</Button>
          <Button variant="secondary" size="lg" fullWidth iconLeft={<MIcon name="Download" size={18} />}>Download .html</Button>
        </div>
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 14, color: 'var(--text-body)', fontWeight: 500 }}>Would you send this?</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <IconButton variant={thumb === 'up' ? 'primary' : 'secondary'} label="Yes" onClick={() => setThumb('up')}><MIcon name="ThumbsUp" size={18} color={thumb === 'up' ? '#fff' : 'currentColor'} /></IconButton>
            <IconButton variant="secondary" label="No" onClick={() => setThumb('down')} style={thumb === 'down' ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : {}}><MIcon name="ThumbsDown" size={18} /></IconButton>
          </div>
        </div>
      </Dialog>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
          <Toast tone="success" icon={<MIcon name="Check" size={18} />} title="Copied. Looks ready to send." description="Paste it into your ESP and hit send." onClose={() => setToast(false)} />
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------- Generating */

const Generating = () => {
  const steps = ['Studying your brand…', 'Writing the subject line…', 'Designing the layout…', 'Placing your products…'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(x + 1, steps.length - 1)), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 300, background: 'var(--surface-inverse)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <svg width="52" height="52" viewBox="0 0 24 24" style={{ animation: 'mspin 0.8s linear infinite' }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="#ffffff" strokeWidth="2" style={{ opacity: 0.16 }} />
        <path d="M12 3 a9 9 0 0 1 9 9" fill="none" stroke="var(--ember-500)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, color: 'var(--neutral-50)', marginBottom: 8 }}>Writing your email</div>
        <div key={i} style={{ fontSize: 14.5, color: 'var(--neutral-400)', animation: 'mfade 300ms ease' }}>{steps[i]}</div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ root */

const MarlowApp = ({ startScreen = 'connect', showRecent = true }) => {
  const [screen, setScreen] = React.useState(startScreen);
  const [generating, setGenerating] = React.useState(false);
  const [payload, setPayload] = React.useState(null);
  // keep icons in sync once lucide's async CDN load finishes
  const [, force] = React.useState(0);
  React.useEffect(() => {
    if (window.lucide && window.lucide.icons) return;
    let n = 0;
    const t = setInterval(() => {
      if ((window.lucide && window.lucide.icons) || n++ > 40) { force((x) => x + 1); clearInterval(t); }
    }, 100);
    return () => clearInterval(t);
  }, []);
  React.useEffect(() => { setScreen(startScreen); }, [startScreen]);

  const generate = (p) => {
    setPayload(p);
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setScreen('email'); }, 2600);
  };

  return (
    <div style={{ position: 'relative', height: '100%', minHeight: 720, overflow: 'auto', background: 'var(--surface-page)' }}>
      <div key={screen} style={{ minHeight: '100%', animation: 'mfade 320ms ease' }}>
        {screen === 'connect' && <ConnectScreen onDone={() => setScreen('create')} />}
        {screen === 'create' && <CreateScreen onGenerate={generate} showRecent={showRecent} />}
        {screen === 'email' && <EmailScreen payload={payload} onBack={() => setScreen('create')} />}
      </div>
      {generating && <Generating />}
    </div>
  );
};

window.MIcon = MIcon;
window.DEMO = DEMO;
window.MarlowApp = MarlowApp;
