/* @ds-bundle: {"format":3,"namespace":"MarlowDesignSystem_437815","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"022db36216cc","components/buttons/IconButton.jsx":"cc1dd1bf72b4","components/display/Avatar.jsx":"63a26c903292","components/display/Badge.jsx":"433a438782e2","components/display/Card.jsx":"268f88bcce9a","components/display/Tag.jsx":"7bb09ae2c1c0","components/feedback/Dialog.jsx":"4b20d769cb14","components/feedback/Spinner.jsx":"8525f8daed0f","components/feedback/Toast.jsx":"ae9924346cbe","components/feedback/Tooltip.jsx":"bb9e02629c7d","components/forms/Checkbox.jsx":"4d2aff972a81","components/forms/Input.jsx":"048c07ca2d4e","components/forms/Radio.jsx":"6c24afe6c3f4","components/forms/SegmentedControl.jsx":"313ffa3f32f3","components/forms/Select.jsx":"5c94965c8363","components/forms/Switch.jsx":"bf161538d4da","components/forms/Textarea.jsx":"eadcbf8bfc6a","components/navigation/Tabs.jsx":"985076331739","ui_kits/marlow-app/ConnectScreen.jsx":"264fd5b891d7","ui_kits/marlow-app/CreateScreen.jsx":"079093cfd883","ui_kits/marlow-app/EmailScreen.jsx":"859a474ebf14","ui_kits/marlow-app/shared.jsx":"9416593cec2f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MarlowDesignSystem_437815 = window.MarlowDesignSystem_437815 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    height: 'var(--control-sm)',
    padding: '0 12px',
    font: 'var(--text-sm)',
    gap: '6px',
    icon: 16
  },
  md: {
    height: 'var(--control-md)',
    padding: '0 18px',
    font: 'var(--text-base)',
    gap: '8px',
    icon: 18
  },
  lg: {
    height: 'var(--control-lg)',
    padding: '0 24px',
    font: 'var(--text-md)',
    gap: '9px',
    icon: 20
  }
};

/**
 * Marlow primary button. Sentence-case label, 1–2 words.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontSize: s.font,
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    letterSpacing: '-0.005em',
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
    transform: active && !disabled ? 'translateY(1px)' : 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: active ? 'var(--ember-700)' : hover ? 'var(--ember-600)' : 'var(--ember-500)',
      color: 'var(--text-on-ember)',
      boxShadow: hover && !disabled ? 'var(--shadow-ember)' : 'var(--shadow-xs)'
    },
    secondary: {
      background: active ? 'var(--surface-active)' : hover ? 'var(--surface-hover)' : 'var(--surface-card)',
      color: 'var(--text-strong)',
      borderColor: 'var(--border-default)',
      boxShadow: 'var(--shadow-xs)'
    },
    ghost: {
      background: active ? 'var(--surface-active)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--text-body)'
    },
    inverse: {
      background: active ? 'var(--neutral-700)' : hover ? 'var(--neutral-800)' : 'var(--neutral-900)',
      color: 'var(--text-inverse)'
    },
    danger: {
      background: active ? '#9c3024' : hover ? '#a8352a' : 'var(--danger)',
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 32,
  md: 40,
  lg: 48
};

/**
 * Square icon-only button. Pass a Lucide icon as children.
 */
function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label,
  onClick,
  style = {},
  ...rest
}) {
  const dim = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const variants = {
    ghost: {
      background: active ? 'var(--surface-active)' : hover ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    },
    secondary: {
      background: active ? 'var(--surface-active)' : hover ? 'var(--surface-hover)' : 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)'
    },
    primary: {
      background: active ? 'var(--ember-700)' : hover ? 'var(--ember-600)' : 'var(--ember-500)',
      color: 'var(--text-on-ember)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56
};

/** Avatar — image, or initials fallback on a warm tint. */
function Avatar({
  src,
  name = '',
  size = 'md',
  square = false,
  style = {}
}) {
  const dim = sizes[size] || sizes.md;
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      flex: 'none',
      borderRadius: square ? 'var(--radius-md)' : 'var(--radius-pill)',
      background: src ? 'var(--surface-sunken)' : 'var(--accent-soft)',
      color: 'var(--ember-700)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      fontSize: dim * 0.38,
      fontWeight: 'var(--weight-bold)',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    bg: 'var(--surface-sunken)',
    fg: 'var(--text-muted)',
    bd: 'var(--border-subtle)'
  },
  ember: {
    bg: 'var(--accent-soft)',
    fg: 'var(--ember-700)',
    bd: 'var(--ember-200)'
  },
  success: {
    bg: 'var(--success-bg)',
    fg: 'var(--success)',
    bd: 'transparent'
  },
  warning: {
    bg: 'var(--warning-bg)',
    fg: 'var(--warning)',
    bd: 'transparent'
  },
  danger: {
    bg: 'var(--danger-bg)',
    fg: 'var(--danger)',
    bd: 'transparent'
  },
  info: {
    bg: 'var(--info-bg)',
    fg: 'var(--info)',
    bd: 'transparent'
  },
  solid: {
    bg: 'var(--neutral-900)',
    fg: 'var(--neutral-50)',
    bd: 'transparent'
  }
};

/** Small status/label pill. */
function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  dot = false,
  icon = null,
  style = {}
}) {
  const t = tones[tone] || tones.neutral;
  const dims = size === 'sm' ? {
    padding: '1px 8px',
    font: 'var(--text-2xs)',
    h: 18
  } : {
    padding: '2px 10px',
    font: 'var(--text-xs)',
    h: 22
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: dims.h,
      padding: dims.padding,
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: dims.font,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. Paper card with hairline border; optional hover lift.
 */
function Card({
  children,
  padding = 'md',
  interactive = false,
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: `1px solid ${selected ? 'var(--border-ember)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: pads[padding],
      boxShadow: selected ? 'var(--ring)' : interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
/** Removable tag/chip. */
function Tag({
  children,
  onRemove,
  icon = null,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: onRemove ? '0 6px 0 12px' : '0 12px',
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      ...style
    }
  }, icon, children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      marginLeft: 1,
      padding: 0,
      border: 'none',
      borderRadius: '50%',
      background: hover ? 'var(--surface-active)' : 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** Modal dialog with scrim. Controlled via `open`/`onClose`. */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 480,
  style = {}
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'color-mix(in srgb, var(--neutral-950) 42%, transparent)',
      backdropFilter: 'blur(var(--blur-sm))',
      WebkitBackdropFilter: 'blur(var(--blur-sm))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 0'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)',
      marginTop: 8,
      lineHeight: 'var(--leading-normal)'
    }
  }, description)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 0'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: 24,
      marginTop: 8
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
/** Spinner. Ember by default; use `tone="inverse"` on dark surfaces. */
function Spinner({
  size = 20,
  tone = 'ember',
  style = {}
}) {
  const color = tone === 'inverse' ? 'var(--neutral-50)' : tone === 'muted' ? 'var(--text-subtle)' : 'var(--ember-500)';
  const id = 'spin-kf';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      ...style
    },
    role: "status",
    "aria-label": "Loading"
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes ${id}{to{transform:rotate(360deg)}}`), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    style: {
      animation: `${id} 0.7s linear infinite`
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    style: {
      color,
      opacity: 0.18
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3 a9 9 0 0 1 9 9",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const tones = {
  default: {
    accent: 'var(--neutral-900)',
    icon: null
  },
  success: {
    accent: 'var(--success)'
  },
  warning: {
    accent: 'var(--warning)'
  },
  danger: {
    accent: 'var(--danger)'
  }
};

/**
 * Toast notification. Render inside a fixed-position stack; controls its own
 * mount animation. Static (non-dismissing) here — wire timers at the app level.
 */
function Toast({
  title,
  description,
  tone = 'default',
  icon = null,
  action,
  onClose,
  style = {}
}) {
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 360,
      maxWidth: '100%',
      padding: '14px 14px 14px 16px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderLeft: `3px solid ${t.accent}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.accent,
      display: 'inline-flex',
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, action)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-subtle)',
      cursor: 'pointer',
      padding: 2,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Hover/focus tooltip. Wraps a single trigger child. */
function Tooltip({
  children,
  content,
  side = 'top',
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-8px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(8px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%) translateX(-8px)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%) translateX(8px)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos[side],
      zIndex: 50,
      padding: '6px 10px',
      background: 'var(--neutral-900)',
      color: 'var(--neutral-50)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      opacity: open ? 1 : 0,
      pointerEvents: 'none',
      transition: 'opacity var(--duration-fast) var(--ease-out)'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox with optional label. */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  indeterminate = false,
  id,
  style = {}
}) {
  const cbId = id || (label ? 'cb-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const on = checked || indeterminate;
  const box = /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      if (!disabled && onChange) onChange(!checked);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      flex: 'none',
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${on ? 'var(--ember-500)' : 'var(--border-strong)'}`,
      background: on ? 'var(--ember-500)' : 'var(--surface-card)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 2,
      background: '#fff',
      borderRadius: 1
    }
  }) : checked ? /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })) : null);
  if (!label) return box;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, box, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional leading/trailing adornments and label.
 */
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  size = 'md',
  label,
  hint,
  error,
  prefix = null,
  suffix = null,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: 'var(--control-sm)',
    md: 'var(--control-md)',
    lg: 'var(--control-lg)'
  };
  const fonts = {
    sm: 'var(--text-sm)',
    md: 'var(--text-base)',
    lg: 'var(--text-md)'
  };
  const inputId = id || (label ? 'in-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: heights[size],
      padding: '0 12px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--ring)' : 'var(--shadow-xs)',
      transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
      opacity: disabled ? 0.6 : 1
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: fonts[size],
      color: 'var(--text-strong)',
      height: '100%'
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-subtle)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio group. Pass options as strings or {value,label,hint}. */
function Radio({
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  style = {}
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const groupName = name || 'radio-' + Math.random().toString(36).slice(2, 7);
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, norm.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => {
        if (!disabled && onChange) onChange(o.value);
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        flex: 'none',
        marginTop: 1,
        borderRadius: 'var(--radius-pill)',
        border: `1.5px solid ${active ? 'var(--ember-500)' : 'var(--border-strong)'}`,
        background: 'var(--surface-card)',
        transition: 'border-color var(--duration-fast) var(--ease-out)'
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--ember-500)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-strong)'
      }
    }, o.label), o.hint && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-subtle)'
      }
    }, o.hint)), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      checked: active,
      onChange: () => {},
      style: {
        display: 'none'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/**
 * Segmented control — Marlow's campaign-type selector. 2–4 short options.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  style = {}
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const heights = {
    sm: 'var(--control-sm)',
    md: 'var(--control-md)'
  };
  const fonts = {
    sm: 'var(--text-sm)',
    md: 'var(--text-base)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: fullWidth ? 'grid' : 'inline-grid',
      gridAutoFlow: 'column',
      gridAutoColumns: '1fr',
      gap: 3,
      padding: 3,
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, norm.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: heights[size],
        padding: '0 14px',
        border: 'none',
        borderRadius: 'calc(var(--radius-md) - 3px)',
        background: active ? 'var(--surface-card)' : 'transparent',
        boxShadow: active ? 'var(--shadow-xs)' : 'none',
        color: active ? 'var(--text-strong)' : 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: fonts[size],
        fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        cursor: 'pointer',
        transition: 'background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
        whiteSpace: 'nowrap'
      }
    }, o.icon, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** Native select styled to match Marlow inputs. */
function Select({
  value,
  onChange,
  options = [],
  placeholder,
  label,
  size = 'md',
  disabled = false,
  id,
  style = {}
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: 'var(--control-sm)',
    md: 'var(--control-md)',
    lg: 'var(--control-lg)'
  };
  const selId = id || (label ? 'sel-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: selId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: heights[size],
      padding: '0 38px 0 12px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--ring)' : 'var(--shadow-xs)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: value ? 'var(--text-strong)' : 'var(--text-subtle)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)'
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), norm.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-subtle)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** On/off switch. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
  style = {}
}) {
  const switchId = id || (label ? 'sw-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  const control = /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    id: switchId,
    "aria-checked": checked,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: 'relative',
      width: 38,
      height: 22,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? 'var(--ember-500)' : 'var(--neutral-300)',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--duration-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-pill)',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-spring)'
    }
  }));
  if (!label) return control;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, control, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Multi-line text input. Used for the Marlow prompt box ("Describe the email").
 */
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  label,
  hint,
  error,
  disabled = false,
  maxLength,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? 'ta-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    maxLength: maxLength,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 14px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: focus ? 'var(--ring)' : 'var(--shadow-xs)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-strong)',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)'
    }
  }, rest)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-subtle)'
    }
  }, error || hint), maxLength != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-subtle)'
    }
  }, value ? value.length : 0, "/", maxLength)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Underline tabs. Options as strings or {value,label,count}. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  const norm = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, norm.map(t => {
    const active = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      type: "button",
      onClick: () => onChange && onChange(t.value),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '10px 14px',
        marginBottom: -1,
        border: 'none',
        background: 'transparent',
        borderBottom: `2px solid ${active ? 'var(--ember-500)' : 'transparent'}`,
        color: active ? 'var(--text-strong)' : 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        cursor: 'pointer',
        transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)'
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        padding: '1px 6px',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--accent-soft)' : 'var(--surface-sunken)',
        color: active ? 'var(--ember-700)' : 'var(--text-subtle)'
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marlow-app/ConnectScreen.jsx
try { (() => {
// Connect / Brand setup — first-run screen.
const ConnectScreen = ({
  onDone
}) => {
  const NS = window.MarlowDesignSystem_437815;
  const {
    Button,
    Input,
    Avatar,
    Spinner,
    Badge,
    Card
  } = NS;
  const {
    MIcon,
    DEMO
  } = window;
  const b = DEMO.brand;
  const [url, setUrl] = React.useState('northbound.co');
  const [phase, setPhase] = React.useState('input'); // input | loading | pulled

  const connect = () => {
    setPhase('loading');
    setTimeout(() => setPhase('pulled'), 1400);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: phase === 'pulled' ? 620 : 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "34",
    height: "34",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, "Marlow")), phase !== 'pulled' ? /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      fontWeight: 500,
      letterSpacing: '-0.015em',
      color: 'var(--text-strong)',
      margin: '0 0 8px'
    }
  }, "Connect your store"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      margin: '0 0 22px'
    }
  }, "Paste your store URL. Marlow pulls your logo, colors, fonts, and a few products \u2014 automatically."), /*#__PURE__*/React.createElement(Input, {
    value: url,
    onChange: e => setUrl(e.target.value),
    size: "lg",
    disabled: phase === 'loading',
    prefix: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-subtle)'
      }
    }, "https://")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  }), phase === 'loading' ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: true,
    iconLeft: /*#__PURE__*/React.createElement(Spinner, {
      size: 18,
      tone: "inverse"
    })
  }, "Reading ", url, "\u2026") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: connect,
    iconRight: /*#__PURE__*/React.createElement(MIcon, {
      name: "ArrowRight",
      size: 18
    })
  }, "Connect store"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-subtle)',
      textAlign: 'center',
      margin: '16px 0 0'
    }
  }, "Connected once, then saved. We never post or send on your behalf.")) : /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "Connected"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, "Here's what Marlow found.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      paddingBottom: 18,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-md)',
      background: b.accent,
      color: b.paper,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 500
    }
  }, "N"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, b.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, b.url))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 22,
      padding: '18px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginBottom: 10
    }
  }, "Palette"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7
    }
  }, b.palette.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-sm)',
      background: c,
      border: '1px solid rgba(0,0,0,0.08)'
    }
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginBottom: 10
    }
  }, "Fonts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      flexWrap: 'wrap'
    }
  }, b.fonts.map(f => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-default)',
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, f))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginBottom: 12
    }
  }, "Products \xB7 4 pulled"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10
    }
  }, DEMO.products.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '1',
      borderRadius: 'var(--radius-md)',
      background: p.bg,
      marginBottom: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      color: 'var(--text-body)',
      lineHeight: 1.25
    }
  }, p.title))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPhase('input'),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Not my store"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone,
    iconRight: /*#__PURE__*/React.createElement(MIcon, {
      name: "ArrowRight",
      size: 18
    })
  }, "Looks right")))));
};
window.ConnectScreen = ConnectScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marlow-app/ConnectScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marlow-app/CreateScreen.jsx
try { (() => {
// Create — the generator. Home screen on return.
const CreateScreen = ({
  onGenerate
}) => {
  const NS = window.MarlowDesignSystem_437815;
  const {
    Button,
    Textarea,
    SegmentedControl,
    Badge,
    Card
  } = NS;
  const {
    MIcon,
    DEMO,
    AppHeader
  } = window;
  const [prompt, setPrompt] = React.useState('Winter candle restock — warm and cozy, 20% off through Sunday. Friendly, not pushy.');
  const [type, setType] = React.useState('promo');
  const [feature, setFeature] = React.useState(0);
  const recents = [{
    name: 'Black Friday — early access',
    type: 'Promo',
    when: 'Exported · 3 weeks ago',
    tone: 'success'
  }, {
    name: 'New: the linen throw',
    type: 'Launch',
    when: 'Draft · 4 weeks ago',
    tone: 'ember'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    right: /*#__PURE__*/React.createElement("button", {
      style: {
        border: 'none',
        background: 'transparent',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer'
      }
    }, "Drafts")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: '0 auto',
      padding: '52px 24px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--accent-text)',
      marginBottom: 12
    }
  }, "New campaign"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
      color: 'var(--text-strong)',
      margin: '0 0 32px'
    }
  }, "What are we sending?"), /*#__PURE__*/React.createElement(Textarea, {
    value: prompt,
    onChange: e => setPrompt(e.target.value),
    rows: 3,
    maxLength: 280,
    style: {
      marginBottom: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginBottom: 10
    }
  }, "Campaign type"), /*#__PURE__*/React.createElement(SegmentedControl, {
    fullWidth: true,
    value: type,
    onChange: setType,
    options: [{
      value: 'promo',
      label: 'Promo'
    }, {
      value: 'launch',
      label: 'Launch'
    }, {
      value: 'holiday',
      label: 'Holiday'
    }, {
      value: 'newsletter',
      label: 'Newsletter'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, "Feature a product"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-subtle)'
    }
  }, "Optional")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 12
    }
  }, DEMO.products.map((p, i) => /*#__PURE__*/React.createElement(Card, {
    key: p.title,
    padding: "none",
    interactive: true,
    selected: feature === i,
    onClick: () => setFeature(i),
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '1',
      background: p.bg,
      position: 'relative'
    }
  }, feature === i && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--ember-500)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "Check",
    size: 14,
    stroke: 2.4,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 9px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: 'var(--text-strong)',
      lineHeight: 1.2,
      marginBottom: 2
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, p.price)))))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => onGenerate({
      prompt,
      type,
      feature
    }),
    iconLeft: /*#__PURE__*/React.createElement(MIcon, {
      name: "Sparkles",
      size: 19
    })
  }, "Generate email"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginBottom: 14
    }
  }, "Recent"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, recents.map(r => /*#__PURE__*/React.createElement(Card, {
    key: r.name,
    interactive: true,
    padding: "md",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "Mail",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-subtle)'
    }
  }, r.when))), /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone === 'success' ? 'success' : 'ember'
  }, r.type)))))));
};
window.CreateScreen = CreateScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marlow-app/CreateScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marlow-app/EmailScreen.jsx
try { (() => {
// Email view — review, inline-edit, regenerate, export.
const EmailScreen = ({
  onBack,
  payload
}) => {
  const NS = window.MarlowDesignSystem_437815;
  const {
    Button,
    IconButton,
    Badge,
    Dialog,
    Spinner,
    Tooltip,
    Toast
  } = NS;
  const {
    MIcon,
    DEMO
  } = window;
  const b = DEMO.brand;
  const featured = DEMO.products[payload && payload.feature || 0];
  const [subject, setSubject] = React.useState(DEMO.email.subject);
  const [preview, setPreview] = React.useState(DEMO.email.preview);
  const [regen, setRegen] = React.useState(null); // section id being regenerated
  const [exportOpen, setExportOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [thumb, setThumb] = React.useState(null);
  const doRegen = id => {
    setRegen(id);
    setTimeout(() => setRegen(null), 1300);
  };

  // Reusable editable/regenerable block
  const Block = ({
    id,
    children,
    pad = '0'
  }) => {
    const [hover, setHover] = React.useState(false);
    const busy = regen === id;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: 'relative',
        borderRadius: 8,
        outline: hover && !busy ? '1.5px dashed var(--ember-300)' : '1.5px dashed transparent',
        outlineOffset: 4,
        transition: 'outline-color 120ms',
        padding: pad
      }
    }, children, hover && !busy && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -14,
        right: -6,
        display: 'flex',
        gap: 4,
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        padding: 3,
        zIndex: 5
      }
    }, /*#__PURE__*/React.createElement(Tooltip, {
      content: "Regenerate section"
    }, /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      label: "Regenerate",
      onClick: () => doRegen(id)
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: "RefreshCw",
      size: 15
    }))), /*#__PURE__*/React.createElement(Tooltip, {
      content: "Edit text"
    }, /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      label: "Edit"
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: "PencilLine",
      size: 15
    })))), busy && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: -2,
        borderRadius: 10,
        background: 'color-mix(in srgb, var(--neutral-50) 72%, transparent)',
        backdropFilter: 'blur(1px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        zIndex: 6
      }
    }, /*#__PURE__*/React.createElement(Spinner, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-muted)'
      }
    }, "Rewriting\u2026")));
  };
  const Editable = ({
    value,
    onChange,
    style
  }) => /*#__PURE__*/React.createElement("span", {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: e => onChange(e.currentTarget.textContent),
    style: {
      outline: 'none',
      borderRadius: 4,
      ...style
    }
  }, value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--surface-page)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "ArrowLeft",
    size: 19
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--text-strong)',
      lineHeight: 1.1
    }
  }, "Winter candle restock"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "Promo \xB7 ", b.name)), /*#__PURE__*/React.createElement(Badge, {
    tone: "ember",
    style: {
      marginLeft: 4
    }
  }, "Draft")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(MIcon, {
      name: "RotateCcw",
      size: 16
    })
  }, "Regenerate"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setExportOpen(true),
    iconLeft: /*#__PURE__*/React.createElement(MIcon, {
      name: "Code2",
      size: 17
    })
  }, "Export email"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '28px 24px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 600,
      margin: '0 auto 18px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: '14px 18px'
    }
  }, [['Subject', subject, setSubject], ['Preview text', preview, setPreview]].map(([label, val, set]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'baseline',
      padding: '5px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: 'var(--text-subtle)',
      width: 92,
      flex: 'none'
    }
  }, label), /*#__PURE__*/React.createElement(Editable, {
    value: val,
    onChange: set,
    style: {
      fontSize: 14.5,
      fontWeight: label === 'Subject' ? 600 : 400,
      color: label === 'Subject' ? 'var(--text-strong)' : 'var(--text-muted)',
      flex: 1
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 600,
      margin: '0 auto',
      background: b.paper,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '22px 0 18px',
      borderBottom: `1px solid ${b.accent}22`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '0.02em',
      color: b.accent
    }
  }, "NORTHBOUND CO")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '34px 44px 40px'
    }
  }, /*#__PURE__*/React.createElement(Block, {
    id: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: b.accent2,
      marginBottom: 16,
      textAlign: 'center'
    }
  }, "The candles are back"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      fontWeight: 500,
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
      color: b.ink,
      textAlign: 'center',
      margin: '0 0 16px'
    }
  }, "A little warmth for the long nights."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15.5,
      lineHeight: 1.6,
      color: b.ink,
      opacity: 0.82,
      textAlign: 'center',
      margin: '0 auto',
      maxWidth: 420
    }
  }, "Our small-batch winter candles are poured again \u2014 cedar, moss, and a little woodsmoke. For this week only, take 20% off the whole collection.")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement(Block, {
    id: "feature"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '3/2',
      borderRadius: 10,
      background: featured.bg,
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 500,
      color: b.ink,
      marginBottom: 4
    }
  }, featured.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: b.ink,
      opacity: 0.7,
      marginBottom: 18
    }
  }, featured.price, " \xB7 burns 50+ hours"), /*#__PURE__*/React.createElement("a", {
    style: {
      display: 'inline-block',
      background: b.accent,
      color: b.paper,
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      fontWeight: 600,
      padding: '13px 30px',
      borderRadius: 6,
      textDecoration: 'none'
    }
  }, "Shop the candle"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement(Block, {
    id: "code"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1.5px dashed ${b.accent2}`,
      borderRadius: 10,
      padding: '18px 20px',
      textAlign: 'center',
      background: '#fff8'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: b.ink,
      opacity: 0.7,
      marginBottom: 6
    }
  }, "Use code at checkout"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '0.12em',
      color: b.accent
    }
  }, "WARMTH20")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 44px 30px',
      borderTop: `1px solid ${b.accent}22`,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: b.ink,
      opacity: 0.55,
      lineHeight: 1.6
    }
  }, "Northbound Co \xB7 114 Mill Road, Hudson NY", /*#__PURE__*/React.createElement("br", null), "You're getting this because you bought something lovely once.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: 'underline'
    }
  }, "Unsubscribe"), " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: 'underline'
    }
  }, "View in browser")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 16,
      fontSize: 12.5,
      color: 'var(--text-subtle)'
    }
  }, "Hover any section to regenerate or edit it.")), /*#__PURE__*/React.createElement(Dialog, {
    open: exportOpen,
    onClose: () => setExportOpen(false),
    title: "Export this email",
    description: "Marlow copies clean, tested HTML you can paste straight into Klaviyo, Shopify Email, or Mailchimp.",
    footer: null,
    width: 460
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(MIcon, {
      name: "Copy",
      size: 18
    }),
    onClick: () => {
      setExportOpen(false);
      setToast(true);
      setTimeout(() => setToast(false), 3500);
    }
  }, "Copy HTML to clipboard"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(MIcon, {
      name: "Download",
      size: 18
    })
  }, "Download .html")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      paddingTop: 18,
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-body)',
      fontWeight: 500
    }
  }, "Would you send this?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: thumb === 'up' ? 'primary' : 'secondary',
    label: "Yes",
    onClick: () => setThumb('up')
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "ThumbsUp",
    size: 18,
    color: thumb === 'up' ? '#fff' : 'currentColor'
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: thumb === 'down' ? 'secondary' : 'secondary',
    label: "No",
    onClick: () => setThumb('down'),
    style: thumb === 'down' ? {
      borderColor: 'var(--danger)',
      color: 'var(--danger)'
    } : {}
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "ThumbsDown",
    size: 18
  }))))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    icon: /*#__PURE__*/React.createElement(MIcon, {
      name: "Check",
      size: 18
    }),
    title: "Copied. Looks ready to send.",
    description: "Paste it into your ESP and hit send.",
    onClose: () => setToast(false)
  })));
};
window.EmailScreen = EmailScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marlow-app/EmailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marlow-app/shared.jsx
try { (() => {
// Shared helpers + demo data for the Marlow app UI kit.
// Exposes window.MIcon (Lucide icon component) and window.DEMO (sample brand/email).

const MIcon = ({
  name,
  size = 20,
  stroke = 1.75,
  color = 'currentColor',
  style
}) => {
  const data = window.lucide && window.lucide.icons && window.lucide.icons[name];
  // Lucide UMD: icons[name] is an array of [tag, attrs] child tuples.
  const children = Array.isArray(data) ? data.map((node, i) => {
    const [tag, attrs] = node;
    return React.createElement(tag, {
      key: i,
      ...attrs
    });
  }) : null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    }
  }, children);
};
const DEMO = {
  brand: {
    name: 'Northbound Co',
    url: 'northbound.co',
    tagline: 'Quiet goods for a slow home',
    accent: '#1F3A2E',
    // deep pine
    accent2: '#C19A53',
    // brass
    paper: '#F4EFE4',
    // their cream
    ink: '#22201C',
    palette: ['#1F3A2E', '#C19A53', '#F4EFE4', '#B5452F', '#22201C'],
    fonts: ['Canela', 'Söhne']
  },
  products: [{
    title: 'Cedar + Moss candle',
    price: '$28',
    bg: 'linear-gradient(150deg,#3a4a3a,#1f3a2e)'
  }, {
    title: 'Heavyweight linen throw',
    price: '$96',
    bg: 'linear-gradient(150deg,#cdbfa3,#a98f63)'
  }, {
    title: 'Stoneware mug, set of 2',
    price: '$34',
    bg: 'linear-gradient(150deg,#9a8e7d,#6c6256)'
  }, {
    title: 'Hand-knotted wool runner',
    price: '$180',
    bg: 'linear-gradient(150deg,#b5452f,#7e2f20)'
  }],
  email: {
    subject: 'A little warmth for the long nights',
    preview: 'Our winter candles are back — and 20% off through Sunday.',
    feature: 0 // product index
  }
};

// App top bar — used on Create and Email screens.
const AppHeader = ({
  right
}) => {
  const NS = window.MarlowDesignSystem_437815;
  const {
    Avatar
  } = NS;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "28",
    height: "28",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, "Marlow")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, right, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingLeft: 14,
      borderLeft: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 'var(--radius-sm)',
      background: DEMO.brand.accent,
      color: DEMO.brand.paper,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 500
    }
  }, "N"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, DEMO.brand.name)), /*#__PURE__*/React.createElement(Avatar, {
    name: "Ava Reyes",
    size: "sm"
  })));
};
window.MIcon = MIcon;
window.DEMO = DEMO;
window.AppHeader = AppHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marlow-app/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
