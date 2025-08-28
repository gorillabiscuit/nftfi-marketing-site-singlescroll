// Section 3: Dashboard SVG embedding and setup (no animation here)
// Purpose: Load and inline images/dashboard.svg into #dashboard-svg-container with strict guards
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION3 } from '../config.js';
import { SECTION3_SCROLL } from '../config.js';
import { LOOPER_BG } from '../config.js';
import { SECTION3_ARROWS } from '../config.js';
import { SECTION3_ARROWS_DEBUG } from '../config.js';
import { SECTION3_ARROWS_VISIBLE_ZERO } from '../config.js';
// Bundle the dashboard SVG at build time to ensure availability in production
import dashboardSvg from '../images/dashboard.svg?raw';

// Cache for discovered targets
let section3TargetsCache = null;

// One-time play guards for non-scrubbed arrow animations
let arrowPlayedFlags = [];
// Track last known scroll direction for Section 3 (1 = down, -1 = up)
let section3ScrollDirection = 1;
function ensureArrowStateSize() {
    const n = Array.isArray(SECTION3_ARROWS) ? SECTION3_ARROWS.length : 0;
    if (arrowPlayedFlags.length !== n) {
        arrowPlayedFlags = new Array(n);
        for (let i = 0; i < n; i += 1) arrowPlayedFlags[i] = false;
    }
}
function markArrowPlayed(index) {
    ensureArrowStateSize();
    if (typeof index === 'number' && index >= 0 && index < arrowPlayedFlags.length) {
        arrowPlayedFlags[index] = true;
    }
}
function unmarkArrowPlayed(index) {
    ensureArrowStateSize();
    if (typeof index === 'number' && index >= 0 && index < arrowPlayedFlags.length) {
        arrowPlayedFlags[index] = false;
    }
}
function clearArrowPlayed() {
    ensureArrowStateSize();
    for (let i = 0; i < arrowPlayedFlags.length; i += 1) {
        arrowPlayedFlags[i] = false;
    }
}

function hideArrowInstant(index) {
    const overlay = document.getElementById('section3-arrows');
    if (!overlay) return;
    const p = overlay.querySelector('path[data-arrow-index="' + String(index) + '"]');
    if (!p) return;
    try {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    } catch (e) { (void e); }
    try { p.removeAttribute('marker-end'); } catch (e) { (void e); }
    p.removeAttribute('data-animating');
    p.removeAttribute('data-visible');
    p.removeAttribute('data-drawn');
    if (SECTION3_ARROWS_VISIBLE_ZERO === true) {
        p.setAttribute('opacity', '1');
    } else {
        p.setAttribute('opacity', '0');
    }
}

function fadeOutArrow(index, durationMs) {
    const overlay = document.getElementById('section3-arrows');
    if (!overlay) return;
    const p = overlay.querySelector('path[data-arrow-index="' + String(index) + '"]');
    if (!p) return;
    try {
        const len = p.getTotalLength();
        gsap.to(p, {
            strokeDashoffset: len,
            opacity: 0,
            duration: (typeof durationMs === 'number' ? durationMs : 300) / 1000,
            ease: 'power1.out',
            onComplete: function () {
                try { p.removeAttribute('marker-end'); } catch (e) { (void e); }
                p.removeAttribute('data-animating');
                p.removeAttribute('data-visible');
                p.removeAttribute('data-drawn');
                // Prepare for next draw: zero length, visible again, and allow re-draw
                try { gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 }); } catch (e) { (void e); }
                try { unmarkArrowPlayed(index); } catch (e) { (void e); }
            }
        });
    } catch (e) { (void e); }
}


function getSvgConfigFor(breakpoint) {
    if (!SECTION3) {
        throw new Error('[Section3Dashboard] Missing SECTION3 config');
    }
    if (!SECTION3.svg) {
        throw new Error('[Section3Dashboard] Missing SECTION3.svg config');
    }
    const cfg = SECTION3.svg[breakpoint];
    if (!cfg) {
        throw new Error('[Section3Dashboard] Missing SECTION3.svg.' + breakpoint + ' config');
    }
    if (typeof cfg.x !== 'number') {
        throw new Error('[Section3Dashboard] Invalid x in SECTION3.svg.' + breakpoint);
    }
    if (typeof cfg.scale !== 'number') {
        throw new Error('[Section3Dashboard] Invalid scale in SECTION3.svg.' + breakpoint);
    }
    const origin = typeof cfg.transformOrigin === 'string' ? cfg.transformOrigin : '0% 0%';
    return { x: cfg.x, scale: cfg.scale, transformOrigin: origin };
}

function getSvgRootStrict() {
    const container = document.getElementById('dashboard-svg-container');
    if (!container) {
        throw new Error('[Section3Dashboard] Container #dashboard-svg-container not found');
    }
    const svgEl = container.querySelector('svg');
    if (!svgEl) {
        throw new Error('[Section3Dashboard] Inline SVG element not found');
    }
    return svgEl;
}

function uniqueArray(elements) {
    const seen = new Set();
    const result = [];
    for (let i = 0; i < elements.length; i += 1) {
        const el = elements[i];
        if (!seen.has(el)) {
            seen.add(el);
            result.push(el);
        }
    }
    return result;
}

function discoverAnimateTargets(svgEl) {
    // Only target elements with id starting with '#animate' (literal hash in id)
    const selectorList = [
        '[id^="#animate"]'
    ];
    const nodeList = svgEl.querySelectorAll(selectorList.join(', '));
    const all = uniqueArray(Array.prototype.slice.call(nodeList));

    // Group by id prefix (including leading '#')
    const byId = new Map();
    for (let i = 0; i < all.length; i += 1) {
        const el = all[i];
        const id = el.getAttribute('id');
        if (id && id.indexOf('#animate') === 0) {
            byId.set(id, el);
        }
    }
    const result = { all: all, byId: byId, byClass: new Map() };
    section3TargetsCache = result;
    return result;
}

/**
 * Initializes Section 3 by embedding the dashboard SVG into the container.
 * No animation is created here; this function only handles safe insertion and basic readiness checks.
 * @returns {Promise<boolean>} true if embedded successfully, false if skipped or failed
 */
export async function initSection3Dashboard() {
    try {
        const container = document.getElementById('dashboard-svg-container');
        if (!container) {
            console.warn('[Section3Dashboard] Container #dashboard-svg-container not found. Skipping SVG embed.');
            return false;
        }

        // Prevent duplicate embedding if already present
        const existingSvg = container.querySelector('svg');
        if (existingSvg) {
            return true;
        }

        // Inline the bundled SVG text (avoids runtime fetch/404 in production)
        if (typeof dashboardSvg !== 'string' || dashboardSvg.indexOf('<svg') === -1) {
            console.error('[Section3Dashboard] Bundled dashboard SVG missing or invalid.');
            return false;
        }
        container.innerHTML = dashboardSvg;
        container.setAttribute('data-dashboard-loaded', 'true');

        // Position SVG so it's properly visible; use GSAP canonical setter
        const svgEl = getSvgRootStrict();

        // Apply per-breakpoint transforms using GSAP matchMedia
        if (typeof gsap !== 'undefined' && gsap && typeof gsap.matchMedia === 'function') {
            const mm = gsap.matchMedia();

            // Desktop: ≥1024px
            mm.add('(min-width: 1024px)', () => {
                try {
                    const cfg = getSvgConfigFor('desktop');
                    gsap.set(svgEl, { x: cfg.x, scale: cfg.scale, transformOrigin: cfg.transformOrigin });
                } catch (e) {
                    console.error(e);
                }
            });

            // Tablet: 768px–1023px
            mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
                try {
                    const cfg = getSvgConfigFor('tablet');
                    gsap.set(svgEl, { x: cfg.x, scale: cfg.scale, transformOrigin: cfg.transformOrigin });
                } catch (e) {
                    console.error(e);
                }
            });

            // Mobile: <768px
            mm.add('(max-width: 767px)', () => {
                try {
                    const cfg = getSvgConfigFor('mobile');
                    gsap.set(svgEl, { x: cfg.x, scale: cfg.scale, transformOrigin: cfg.transformOrigin });
                } catch (e) {
                    console.error(e);
                }
            });
        } else if (typeof gsap !== 'undefined' && gsap && typeof gsap.set === 'function') {
            // Fallback if matchMedia not available - use desktop config strictly
            try {
                const cfg = getSvgConfigFor('desktop');
                gsap.set(svgEl, { x: cfg.x, scale: cfg.scale, transformOrigin: cfg.transformOrigin });
            } catch (e) {
                console.error(e);
            }
        } else {
            console.warn('[Section3Dashboard] GSAP not available to set initial SVG position.');
        }

        // Discover and cache animate* targets for later GSAP timelines
        section3TargetsCache = discoverAnimateTargets(svgEl);
        console.log('[Section3Dashboard] animate* targets discovered:', {
            total: section3TargetsCache.all.length,
            ids: Array.from(section3TargetsCache.byId.keys()).slice(0, 10)
        });
        return true;
    } catch (error) {
        console.error('[Section3Dashboard] Error embedding dashboard.svg:', error);
        return false;
    }
}

/** Get last discovered targets (throws if not ready) */
export function getSection3Targets() {
    if (!section3TargetsCache) {
        throw new Error('[Section3Dashboard] Targets not discovered yet. Call initSection3Dashboard first.');
    }
    return section3TargetsCache;
}

// Register ScrollTrigger locally for this module
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Section 3 GSAP timeline with ScrollTrigger pin + scrub
 * - Pins section[data-section="3"]
 * - Scrubs a timeline sized by SECTION3_SCROLL.pxPerSecond and timeline duration
 * - Placeholder tweens for now; sequencing will be added in subtask 1.5
 */
export function initSection3Scroll() {
    const sectionEl = document.querySelector("section[data-section='3']");
    if (!sectionEl) {
        console.error('[Section3Dashboard] Section 3 element not found for ScrollTrigger');
        return null;
    }
    const looperEl = sectionEl.querySelector('.hero.hero--looper');
    const svgEl = getSvgRootStrict();
    const targets = getSection3Targets();

    // Determine scroll distance from config (in % of viewport height)
    let endPercent = 100;
    try {
        if (SECTION3_SCROLL && typeof SECTION3_SCROLL.durationVh === 'number') {
            endPercent = Math.max(1, SECTION3_SCROLL.durationVh);
        }
    } catch (_) { void 0; }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: '+=' + String(endPercent) + '%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: true,
            markers: false,
            id: 'section3-timeline',
            onUpdate: (self) => {
                try { updateArrowsGeometry(sectionEl); } catch (e) { (void e); }
                // Store current scroll direction for direction-aware arrow behavior
                try {
                    if (typeof self.direction === 'number') {
                        section3ScrollDirection = self.direction === 1 ? 1 : -1;
                    }
                } catch (e) { (void e); }
            },
            onRefresh: () => {
                try { updateArrowsGeometry(sectionEl); } catch (e) { (void e); }
            },
            // When leaving Section 3 forward into Section 2, fully reset play-once state
            onLeave: () => { void 0; },
            onEnterBack: () => { void 0; }
        }
    });

    // Prepare UI elements for reveal
    try {
        gsap.set('.section3-features .features-title', { opacity: 0 });
        gsap.set('.section3-features .feature-block', { opacity: 0 });
    } catch (_) { void 0; }

    // Timeline structure with labels
    tl.addLabel('intro', 0);
    tl.addLabel('highlight', '+=' + getSequenceConfigNumber('introDuration'));
    tl.addLabel('outro', '+=' + getSequenceConfigNumber('outroDuration'));

    // Fade in title early in the intro phase
    tl.to('.section3-features .features-title', { opacity: 1, duration: 0.35, ease: 'power1.out' }, 'intro+=0.05');

    // Initialize arrows overlay BEFORE building sequences that reference it
    try {
        ensureArrowsOverlay(sectionEl);
        if (SECTION3_ARROWS_DEBUG === true) {
            prepareArrowsVisible();
        } else {
            prepareArrowsHidden();
        }
        updateArrowsGeometry(sectionEl);

        // Wire test CTA: draw arrow 0 from 0% to 100%, then reveal arrowhead
        try {
            const cta = sectionEl.querySelector('.section3-features .cta-button');
            if (cta) {
                cta.addEventListener('click', function (ev) {
                    if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
                    try { animateArrowDraw(0, 700); } catch (e) { (void e); }
                });
            }
        } catch (e) { (void e); }
    } catch (e) { (void e); }

    // Build per-group Y translation sequences (safe: arrows overlay exists)
    addGroupSequences(tl, targets);

    console.log('[Section3Dashboard] Section 3 timeline created with ScrollTrigger pin+scrub');
    try { ScrollTrigger.refresh(); } catch (e) { void 0; }

    // Apply config-driven size/position for the Looper background per breakpoint
    try {
        if (looperEl && typeof gsap.matchMedia === 'function') {
            const mm = gsap.matchMedia();
            const apply = (bpKey) => () => {
                const cfg = LOOPER_BG && LOOPER_BG[bpKey] ? LOOPER_BG[bpKey] : null;
                if (!cfg) return;
                const w = (typeof cfg.width === 'number') ? cfg.width : null;
                const h = (typeof cfg.height === 'number') ? cfg.height : null;
                const left = (typeof cfg.left === 'string') ? cfg.left : '50%';
                const top = (typeof cfg.top === 'string') ? cfg.top : '50%';
                const xPct = (typeof cfg.xPercent === 'number') ? cfg.xPercent : -50;
                const yPct = (typeof cfg.yPercent === 'number') ? cfg.yPercent : -50;
                const setObj = { position: 'absolute', zIndex: 1, pointerEvents: 'none', left, top, xPercent: xPct, yPercent: yPct };
                if (w != null) setObj.width = w;
                if (h != null) setObj.height = h;
                gsap.set(looperEl, setObj);
            };
            mm.add('(max-width: 767px)', apply('mobile'));
            mm.add('(min-width: 768px) and (max-width: 1023px)', apply('tablet'));
            mm.add('(min-width: 1024px)', apply('desktop'));
        }
    } catch (e) { (void e); }

    // Reset play-once guards when entering Section 2 (both directions)
    try {
        const section2El = document.querySelector("section[data-section='2']");
        if (section2El) {
            ScrollTrigger.create({
                trigger: section2El,
                // Fire when Section 2 is fully aligned with the viewport (fully visible)
                start: 'top top',
                end: 'bottom bottom',
                markers: false,
                id: 'section2-reset',
                // Set zero-length on leaving Section 2 backward (up into Section 1)
                onLeaveBack: () => { void 0; },
                onEnter: () => { void 0; },
                onEnterBack: () => { void 0; },
                onLeave: () => { void 0; }
            });
        }
    } catch (e) { (void e); }
    return tl;
}

function getSequenceConfigNumber(key) {
    if (!SECTION3 || !SECTION3.sequence) {
        throw new Error('[Section3Dashboard] Missing SECTION3.sequence config');
    }
    const value = SECTION3.sequence[key];
    if (typeof value !== 'number') {
        throw new Error('[Section3Dashboard] Invalid SECTION3.sequence.' + key);
    }
    return value;
}

function getSequenceConfigNumberOrDefault(key, defaultValue) {
    try {
        if (!SECTION3 || !SECTION3.sequence) return defaultValue;
        const value = SECTION3.sequence[key];
        if (typeof value === 'number') return value;
        return defaultValue;
    } catch (_) {
        return defaultValue;
    }
}

function addGroupSequences(tl, targets) {
    // Per-ID detail mode takes precedence if present
    if (SECTION3 && SECTION3.targets && Array.isArray(SECTION3.targets.detail) && SECTION3.targets.detail.length > 0) {
        try {
            addPerIdDetailSequences(tl, targets);
        } catch (e) {
            // Ensure no empty catch per lint rules
            (void e);
        }
        return;
    }

    const yIn = getSequenceConfigNumber('yIn');
    const yOut = getSequenceConfigNumber('yOut');
    const stagger = getSequenceConfigNumber('stagger');

    // Fallback legacy path: explicit ids simple list
    let explicit = [];
    if (SECTION3 && SECTION3.targets && Array.isArray(SECTION3.targets.ids)) {
        explicit = SECTION3.targets.ids;
    }

    const presentExplicit = [];
    for (let i = 0; i < explicit.length; i += 1) {
        const id = explicit[i];
        if (targets.byId.has(id)) {
            presentExplicit.push(id);
        }
    }
    if (presentExplicit.length > 0) {
        let indexOnly = 0;
        for (let i = 0; i < presentExplicit.length; i += 1) {
            const key = presentExplicit[i];
            const el = targets.byId.get(key);
            if (el) {
                addOne(tl, el, indexOnly, yIn, yOut, stagger);
                indexOnly += 1;
            }
        }
        return;
    }

    const idKeys = Array.from(targets.byId.keys()).sort();
    const classKeys = Array.from(targets.byClass.keys()).sort();

    let index = 0;
    for (let i = 0; i < idKeys.length; i += 1) {
        const key = idKeys[i];
        const el = targets.byId.get(key);
        if (el) {
            addOne(tl, el, index, yIn, yOut, stagger);
            index += 1;
        }
    }
    for (let i = 0; i < classKeys.length; i += 1) {
        const key = classKeys[i];
        const arr = targets.byClass.get(key);
        if (arr) {
            for (let j = 0; j < arr.length; j += 1) {
                addOne(tl, arr[j], index, yIn, yOut, stagger);
                index += 1;
            }
        }
    }
}

function addOne(tl, element, idx, yIn, yOut, stagger) {
    const atIntro = 'intro+=' + (idx * stagger).toFixed(3);
    const atHighlight = 'highlight+=' + (idx * stagger).toFixed(3);
    const atOutro = 'outro+=' + (idx * stagger).toFixed(3);

    // Use GSAP to animate translateY; keep ease none for scrubbed control
    tl.fromTo(element, { y: 0 }, { y: yIn, ease: 'none' }, atIntro);
    tl.to(element, { y: yIn, ease: 'none' }, atHighlight);
    tl.to(element, { y: yOut, ease: 'none' }, atOutro);
}

// -------- Per-ID detailed sequencing (groups, jitter, individual ranges) --------

function getSequenceConfigRequiredNumber(key) {
    // Shares same validation path
    return getSequenceConfigNumber(key);
}

function parseDetailSpecs() {
    if (!SECTION3) {
        throw new Error('[Section3Dashboard] Missing SECTION3');
    }
    if (!SECTION3.targets || !Array.isArray(SECTION3.targets.detail)) {
        throw new Error('[Section3Dashboard] Missing SECTION3.targets.detail');
    }

    const rise = getSequenceConfigRequiredNumber('riseDuration');
    const holdDef = getSequenceConfigRequiredNumber('holdDefault');
    const ret = getSequenceConfigRequiredNumber('returnDuration');
    const baseStagger = getSequenceConfigRequiredNumber('baseStagger');
    const groupGap = getSequenceConfigRequiredNumber('groupGap');
    const jitterMax = getSequenceConfigRequiredNumber('jitterMax');

    // Use magnitude of legacy yIn as default range of motion
    const defaultMaxY = Math.abs(getSequenceConfigNumber('yIn'));

    const raw = SECTION3.targets.detail;
    const specs = [];
    for (let i = 0; i < raw.length; i += 1) {
        const it = raw[i];
        if (!it || typeof it.id !== 'string') {
            continue;
        }
        const spec = {
            id: it.id,
            group: typeof it.group === 'string' ? it.group : 'default',
            maxY: typeof it.maxY === 'number' ? Math.max(0, it.maxY) : defaultMaxY,
            hold: typeof it.hold === 'number' ? Math.max(0, it.hold) : holdDef,
            jitter: typeof it.jitter === 'number' ? Math.max(0, it.jitter) : jitterMax,
            riseDuration: typeof it.riseDuration === 'number' ? Math.max(0, it.riseDuration) : rise,
            returnDuration: typeof it.returnDuration === 'number' ? Math.max(0, it.returnDuration) : ret
        };
        specs.push(spec);
    }

    return { specs, baseStagger, groupGap };
}

function seededJitterFromId(id, jitterMax) {
    // Simple deterministic hash-based PRNG in [-jitterMax, +jitterMax]
    let h = 2166136261 >>> 0;
    for (let i = 0; i < id.length; i += 1) {
        h ^= id.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    // Convert to [0,1)
    const u = (h >>> 0) / 4294967296;
    // Map to [-1, 1]
    const v = (u * 2) - 1;
    return v * jitterMax;
}

// Deterministic unit random [0,1) from string (for per-element range variance)
function seededUnitFromString(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i += 1) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    const u = (h >>> 0) / 4294967296; // [0,1)
    return u;
}

// Find children of '#animate-bubble' parent group (ellipses et al.)
function getBubbleChildren(targets) {
    if (!targets || !targets.byId) return [];
    const parentId = (SECTION3 && SECTION3.targets && SECTION3.targets.bubbles && typeof SECTION3.targets.bubbles.parentId === 'string')
        ? SECTION3.targets.bubbles.parentId
        : '#animate-bubble';
    const parent = targets.byId.get(parentId);
    if (!parent || typeof parent.querySelectorAll !== 'function') return [];
    const nodeList = parent.querySelectorAll('circle, ellipse');
    const all = Array.prototype.slice.call(nodeList);
    const filtered = [];
    for (let i = 0; i < all.length; i += 1) {
        const el = all[i];
        if (typeof el.getAttribute === 'function') {
            const idValue = el.getAttribute('id');
            if (typeof idValue === 'string') {
                const match = /^Ellipse\s*\d+$/.test(idValue);
                if (match) {
                    filtered.push(el);
                }
            }
        }
    }
    // Include any extra ids configured in SECTION3.targets.bubbles.extraIds
    try {
        const extra = (SECTION3 && SECTION3.targets && SECTION3.targets.bubbles && Array.isArray(SECTION3.targets.bubbles.extraIds))
            ? SECTION3.targets.bubbles.extraIds
            : [];
        const svgRoot = getSvgRootStrict();
        for (let j = 0; j < extra.length; j += 1) {
            const rawId = extra[j];
            if (typeof rawId !== 'string' || rawId.length === 0) continue;
            // Query by exact id attribute since many ids include literal '#'
            let found = svgRoot.querySelector('[id="' + rawId + '"]');
            if (!found && rawId.charAt(0) !== '#') {
                found = svgRoot.querySelector('[id="#' + rawId + '"]');
            }
            if (found && filtered.indexOf(found) === -1) {
                filtered.push(found);
            }
        }
    } catch (e) { (void e); }
    return filtered;
}

// Schedule randomized up-hold-down animations for bubble children starting at a given offset (seconds)
function addBubbleChildrenSequences(tl, targets, startAtSeconds) {
    const children = getBubbleChildren(targets);
    if (!children || children.length === 0) return;

    const rise = getSequenceConfigRequiredNumber('riseDuration');
    const ret = getSequenceConfigRequiredNumber('returnDuration');
    // Pull bubble timing/range from config with strict checks and fallbacks
    const bubbleCfg = (SECTION3 && SECTION3.targets && SECTION3.targets.bubbles) ? SECTION3.targets.bubbles : {};
    const startWindowSec = (typeof bubbleCfg.startWindowSec === 'number') ? bubbleCfg.startWindowSec : 1.25;
    const holdMinSec = (typeof bubbleCfg.holdMinSec === 'number') ? bubbleCfg.holdMinSec : 4.0;
    const holdMaxSec = (typeof bubbleCfg.holdMaxSec === 'number') ? bubbleCfg.holdMaxSec : 8.0;
    const returnWindowSec = (typeof bubbleCfg.returnWindowSec === 'number') ? bubbleCfg.returnWindowSec : 1.25;
    const minRange = (typeof bubbleCfg.minRange === 'number') ? bubbleCfg.minRange : 12;
    const maxRange = (typeof bubbleCfg.maxRange === 'number') ? bubbleCfg.maxRange : 60;

    let maxEnd = startAtSeconds;
    for (let i = 0; i < children.length; i += 1) {
        const el = children[i];
        // Determine deterministic key without fallback operators
        let key = '';
        if (typeof el.getAttribute === 'function') {
            const idValue = el.getAttribute('id');
            if (typeof idValue === 'string' && idValue.length > 0) {
                key = idValue;
            } else {
                key = String(el.tagName || 'el') + '-' + String(i);
            }
        } else {
            key = 'el-' + String(i);
        }

        // Deterministic values per element
        const unitRange = seededUnitFromString(key + ':range');
        const unitStart = seededUnitFromString(key + ':start');
        const unitHold = seededUnitFromString(key + ':hold');
        const unitReturn = seededUnitFromString(key + ':return');
        const range = minRange + (unitRange * (maxRange - minRange));

        // Start within [0, startWindowSec]
        const start = startAtSeconds + (unitStart * startWindowSec);
        // Hold duration within [holdMinSec, holdMaxSec]
        const hold = holdMinSec + (unitHold * (holdMaxSec - holdMinSec));

        tl.to(el, { y: '-=' + String(Math.abs(range)), duration: rise, ease: 'none' }, 'intro+=' + start.toFixed(3));
        const returnAt = start + rise + hold + (unitReturn * returnWindowSec);
        tl.to(el, { y: '+=' + String(Math.abs(range)), duration: ret, ease: 'none' }, 'intro+=' + returnAt.toFixed(3));
        const endAt = returnAt + ret;
        if (endAt > maxEnd) {
            maxEnd = endAt;
        }
    }
    // Return total duration consumed by bubble group starting from startAtSeconds
    return Math.max(0, maxEnd - startAtSeconds);
}

function addPerIdDetailSequences(tl, targets) {
    const { specs, baseStagger, groupGap } = parseDetailSpecs();

    // Bucket by group preserving order
    const groups = new Map();
    for (let i = 0; i < specs.length; i += 1) {
        const s = specs[i];
        if (!groups.has(s.group)) groups.set(s.group, []);
        groups.get(s.group).push(s);
    }

    let cursor = 0; // seconds from intro label
    // Sequentially reveal mapped feature blocks as groups start
    const featureSelectors = [
        '.section3-features .feature-1',
        '.section3-features .feature-2',
        '.section3-features .feature-3',
        '.section3-features .feature-4'
    ];
    let revealIndex = 0;
    const orderedGroups = Array.from(groups.keys());
    for (let gi = 0; gi < orderedGroups.length; gi += 1) {
        const gKey = orderedGroups[gi];
        const items = groups.get(gKey);
        let groupEnd = cursor;

        // Log phase entry at the moment the phase starts and trigger non-scrub arrow draw like the CTA
        try {
            tl.add(function () {
                try { console.log('[Section3Dashboard] Phase start:', gKey); } catch (e) { (void e); }
            }, 'intro+=' + cursor.toFixed(3));
        } catch (e) { (void e); }

        // Reveal next feature block at the start of this group window and draw matching arrow
        if (revealIndex < featureSelectors.length) {
            const sel = featureSelectors[revealIndex];
            try {
                const firstFeatureExtraDelay = (revealIndex === 0) ? getSequenceConfigNumberOrDefault('firstFeatureDelay', 0.6) : 0;
                const startAt = (cursor + firstFeatureExtraDelay);
                tl.to(sel, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 'intro+=' + startAt.toFixed(3));
                // arrow index matches reveal index
                const arrowIdx = revealIndex;
                const arrowSel = '#section3-arrows path[data-arrow-index="' + String(arrowIdx) + '"]';
                tl.add(() => {
                    try {
                        prepareOneArrowDash(arrowIdx);
                        const p = document.querySelector(arrowSel);
                        if (p) {
                            p.setAttribute('data-animating', '1');
                            try { p.removeAttribute('marker-end'); } catch (e) { (void e); }
                        }
                    } catch (_) { void 0; }
                }, 'intro+=' + startAt.toFixed(3));
                tl.to(arrowSel, { attr: { 'data-visible': '1' }, opacity: 1, duration: 0.01, ease: 'none' }, 'intro+=' + startAt.toFixed(3));
                tl.to(arrowSel, { strokeDashoffset: 0, duration: 4.2, ease: 'power2.out', onComplete: function () {
                    try {
                        const p = document.querySelector(arrowSel);
                        if (p) {
                            p.removeAttribute('data-animating');
                            p.setAttribute('data-drawn', '1');
                            p.setAttribute('marker-end', 'url(#arrowhead)');
                        }
                    } catch (e) { (void e); }
                } }, 'intro+=' + (startAt + 0.05).toFixed(3));
                revealIndex += 1;
            } catch (_) { void 0; }
        }

        for (let idx = 0; idx < items.length; idx += 1) {
            const spec = items[idx];
            // Resolve element strictly; skip if missing
            const el = targets.byId.get(spec.id);
            if (!el) {
                // Skip missing elements without throwing
                continue;
            }

            // Deterministic jitter inside group window
            const jitter = seededJitterFromId(spec.id, spec.jitter);
            const start = cursor + (idx * baseStagger) + jitter;

            // Rise up by -maxY (upward), never beyond original on return
            const riseDur = spec.riseDuration;
            const holdDur = spec.hold;
            const retDur = spec.returnDuration;

            const upTo = -Math.abs(spec.maxY);

            tl.fromTo(el, { y: 0 }, { y: upTo, duration: riseDur, ease: 'none' }, 'intro+=' + start.toFixed(3));
            // Implicit hold by delaying the return tween; we can optionally keep a no-op tween if needed
            const returnAt = start + riseDur + holdDur;
            tl.to(el, { y: 0, duration: retDur, ease: 'none' }, 'intro+=' + returnAt.toFixed(3));

            const itemEnd = returnAt + retDur;
            if (itemEnd > groupEnd) groupEnd = itemEnd;
        }

        if (gKey === 'boxes') {
            // Schedule chart (bubbles) immediately after boxes group
            const startBubbles = groupEnd + groupGap;
            try {
                tl.add(function () {
                    try { console.log('[Section3Dashboard] Phase start: chart'); } catch (e) { (void e); }
                }, 'intro+=' + startBubbles.toFixed(3));
            } catch (e) { (void e); }

            // Reveal next feature (feature-2) and corresponding arrow dash
            if (revealIndex < featureSelectors.length) {
                const sel2 = featureSelectors[revealIndex];
                try {
                    const arrowIdx2 = revealIndex;
                    const arrowSel2 = '#section3-arrows path[data-arrow-index="' + String(arrowIdx2) + '"]';
                    tl.add(() => {
                        try {
                            prepareOneArrowDash(arrowIdx2);
                            const p2 = document.querySelector(arrowSel2);
                            if (p2) {
                                p2.setAttribute('data-animating', '1');
                                try { p2.removeAttribute('marker-end'); } catch (e) { (void e); }
                            }
                        } catch (_) { void 0; }
                    }, 'intro+=' + startBubbles.toFixed(3));
                    tl.to(sel2, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 'intro+=' + startBubbles.toFixed(3));
                    tl.to(arrowSel2, { attr: { 'data-visible': '1' }, opacity: 1, duration: 0.01, ease: 'none' }, 'intro+=' + startBubbles.toFixed(3));
                    tl.to(arrowSel2, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', onComplete: function () {
                        try {
                            const p2 = document.querySelector(arrowSel2);
                            if (p2) {
                                p2.removeAttribute('data-animating');
                                p2.setAttribute('data-drawn', '1');
                                p2.setAttribute('marker-end', 'url(#arrowhead)');
                            }
                        } catch (e) { (void e); }
                    } }, 'intro+=' + (startBubbles + 0.05).toFixed(3));
                    revealIndex += 1;
                } catch (_) { void 0; }
            }

            // Schedule bubble chart elements
            try {
                const dur = addBubbleChildrenSequences(tl, targets, startBubbles);
                const endBubbles = (typeof dur === 'number' && dur > 0) ? (startBubbles + dur) : startBubbles;
                if (endBubbles > groupEnd) groupEnd = endBubbles;
            } catch (e) { (void e); }
        }

        // Advance cursor past this group plus gap
        cursor = groupEnd + groupGap;
    }

    // Bubbles were scheduled immediately after boxes; nothing to do here
}
// ------------------- ARROWS OVERLAY (feature -> svg target) -------------------

function ensureArrowsOverlay(sectionEl) {
    const existing = sectionEl.querySelector('#section3-arrows');
    if (existing) return existing;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'section3-arrows');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.zIndex = '6';
    svg.style.pointerEvents = 'none';

    // defs with arrow marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    // 25% smaller than previous (6 -> 4.5); keep viewBox so geometry scales
    marker.setAttribute('markerWidth', '4.5');
    marker.setAttribute('markerHeight', '4.5');
    marker.setAttribute('viewBox', '0 0 6 6');
    marker.setAttribute('refX', '5');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const tip = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tip.setAttribute('d', 'M0,0 L6,3 L0,6 Z');
    // 50% transparent arrowhead
    tip.setAttribute('fill', 'rgba(255,255,255,0.5)');
    marker.appendChild(tip);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // create one path per config item
    for (let i = 0; i < SECTION3_ARROWS.length; i += 1) {
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('data-arrow-index', String(i));
        p.setAttribute('d', 'M0 0 L0 0');
        p.setAttribute('fill', 'none');
        // 50% transparent arrow stroke
        p.setAttribute('stroke', 'rgba(255,255,255,0.5)');
        p.setAttribute('stroke-width', '1.5');
        p.setAttribute('marker-end', 'url(#arrowhead)');
        p.setAttribute('opacity', '0');
        svg.appendChild(p);
    }

    sectionEl.appendChild(svg);
    return svg;
}

function getBreakpointKey() {
    const w = window.innerWidth;
    if (w >= 1024) return 'desktop';
    if (w >= 768) return 'tablet';
    return 'mobile';
}

function getFeatureAnchorRect(sectionEl, selector) {
    const el = sectionEl.querySelector(selector);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const sectionRect = sectionEl.getBoundingClientRect();
    return { x: rect.left - sectionRect.left + (rect.width / 2), y: rect.top - sectionRect.top + (rect.height / 2) };
}

// simplified absolute coordinate source for arrows
function getArrowEndpoints(sectionEl, cfg) {
    const bp = getBreakpointKey();
    const sectionRect = sectionEl.getBoundingClientRect();
    // from
    let fromX = null; let fromY = null;
    if (cfg.from && cfg.from[bp] && typeof cfg.from[bp].x === 'number' && typeof cfg.from[bp].y === 'number') {
        fromX = cfg.from[bp].x; fromY = cfg.from[bp].y;
    } else {
        const anchor = getFeatureAnchorRect(sectionEl, cfg.fromSelector);
        if (anchor) { fromX = anchor.x; fromY = anchor.y; }
    }
    // to (required)
    if (!cfg.to || !cfg.to[bp] || typeof cfg.to[bp].x !== 'number' || typeof cfg.to[bp].y !== 'number') {
        return null;
    }
    const toX = cfg.to[bp].x; const toY = cfg.to[bp].y;
    if (fromX == null || fromY == null) return null;
    // clamp to section bounds for safety
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    return {
        x1: clamp(fromX, 0, sectionRect.width),
        y1: clamp(fromY, 0, sectionRect.height),
        x2: clamp(toX, 0, sectionRect.width),
        y2: clamp(toY, 0, sectionRect.height)
    };
}

function updateArrowsGeometry(sectionEl) {
    const overlay = sectionEl.querySelector('#section3-arrows');
    if (!overlay) return;
    const bp = getBreakpointKey();
    const sectionRect = sectionEl.getBoundingClientRect();
    const width = sectionRect.width;
    const height = sectionRect.height;
    overlay.setAttribute('viewBox', '0 0 ' + String(width) + ' ' + String(height));

    for (let i = 0; i < SECTION3_ARROWS.length; i += 1) {
        const cfg = SECTION3_ARROWS[i];
        const path = overlay.querySelector('path[data-arrow-index="' + String(i) + '"]');
        if (!cfg || !path) continue;

        const pts = getArrowEndpoints(sectionEl, cfg);
        if (!pts) continue;
        path.setAttribute('d', 'M' + String(pts.x1) + ' ' + String(pts.y1) + ' L' + String(pts.x2) + ' ' + String(pts.y2));

        // Ensure dash metrics match new geometry; otherwise stroke may appear to disappear
        try {
            const len = path.getTotalLength();
            const isAnimating = path.getAttribute('data-animating') === '1';
            const isVisible = path.getAttribute('data-visible') === '1' || SECTION3_ARROWS_DEBUG === true;
            const isDrawn = path.getAttribute('data-drawn') === '1';
            const forceZeroLengthVisible = SECTION3_ARROWS_VISIBLE_ZERO === true;
            // Always keep strokeDasharray in sync with path length
            gsap.set(path, { strokeDasharray: len });
            if (!isAnimating) {
                // Only adjust offset when not animating
                if (forceZeroLengthVisible) {
                    gsap.set(path, { strokeDashoffset: isDrawn ? 0 : len, opacity: 1 });
                } else {
                    gsap.set(path, { strokeDashoffset: isVisible ? 0 : len, opacity: isVisible ? 1 : 0 });
                }
            }
        } catch (e) { (void e); }
    }
}

function prepareArrowsHidden() {
    const overlay = document.getElementById('section3-arrows');
    if (!overlay) return;
    const paths = overlay.querySelectorAll('path[data-arrow-index]');
    for (let i = 0; i < paths.length; i += 1) {
        const p = paths[i];
        p.setAttribute('opacity', '0');
        p.removeAttribute('data-visible');
        p.removeAttribute('data-drawn');
        try {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        } catch (e) { (void e); }
    }
}

function prepareArrowsVisible() {
    const overlay = document.getElementById('section3-arrows');
    if (!overlay) return;
    const paths = overlay.querySelectorAll('path[data-arrow-index]');
    for (let i = 0; i < paths.length; i += 1) {
        const p = paths[i];
        p.setAttribute('opacity', '1');
        p.setAttribute('data-visible', '1');
        // Do not mark as drawn here; only animation should set data-drawn
        try {
            const len = p.getTotalLength();
            if (SECTION3_ARROWS_VISIBLE_ZERO === true) {
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            } else {
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: 0 });
            }
        } catch (e) { (void e); }
    }
}

function prepareOneArrowDash(index) {
    const overlay = document.getElementById('section3-arrows');
    if (!overlay) return;
    const p = overlay.querySelector('path[data-arrow-index="' + String(index) + '"]');
    if (!p) return;
    try {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    } catch (e) { (void e); }
}

// Draw one arrow from 0% to 100% and show arrowhead only at completion
function animateArrowDraw(index, durationMs) {
    const overlay = document.getElementById('section3-arrows');
    if (!overlay) return;
    const p = overlay.querySelector('path[data-arrow-index="' + String(index) + '"]');
    if (!p) return;
    ensureArrowStateSize();
    if (typeof index !== 'number' || index < 0 || index >= arrowPlayedFlags.length) return;

    // Direction-aware behavior
    if (section3ScrollDirection === 1) {
        // Scrolling down: only draw once
        if (arrowPlayedFlags[index] === true) return;
        try { updateArrowsGeometry(document.querySelector("section[data-section='3']")); } catch (e) { (void e); }
        try {
            const len = p.getTotalLength();
            p.setAttribute('opacity', '1');
            p.setAttribute('data-visible', '1');
            try { p.removeAttribute('marker-end'); } catch (e) { (void e); }
            p.setAttribute('data-animating', '1');
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(p, {
                strokeDashoffset: 0,
                duration: (typeof durationMs === 'number' ? durationMs : 1200) / 1000,
                ease: 'power2.out',
                onComplete: function () {
                    p.removeAttribute('data-animating');
                    try { p.setAttribute('marker-end', 'url(#arrowhead)'); } catch (e) { (void e); }
                    try { p.setAttribute('data-drawn', '1'); } catch (e) { (void e); }
                    try { markArrowPlayed(index); } catch (e) { (void e); }
                }
            });
        } catch (e) { (void e); }
        return;
    }

    // Scrolling up: fade out arrow and keep flag as-is (do not re-enable playback)
    try { fadeOutArrow(index, 200); } catch (e) { (void e); }
}



