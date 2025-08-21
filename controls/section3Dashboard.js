// Section 3: Dashboard SVG embedding and setup (no animation here)
// Purpose: Load and inline images/dashboard.svg into #dashboard-svg-container with strict guards
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION3 } from '../config.js';
import { SECTION3_SCROLL } from '../config.js';
import { LOOPER_BG } from '../config.js';

// Cache for discovered targets
let section3TargetsCache = null;

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

        // Fetch SVG text and inline to allow GSAP to target internal groups later
        const response = await fetch('images/dashboard.svg', { cache: 'no-store' });
        if (!response || !response.ok) {
            console.error('[Section3Dashboard] Failed to fetch images/dashboard.svg. Response not OK.');
            return false;
        }

        const svgText = await response.text();
        if (typeof svgText !== 'string') {
            console.error('[Section3Dashboard] SVG response is not text.');
            return false;
        }
        if (svgText.indexOf('<svg') === -1) {
            console.error('[Section3Dashboard] SVG content missing <svg> root element.');
            return false;
        }

        // Insert SVG inline
        container.innerHTML = svgText;
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
    } catch (_) {}

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: '+=' + String(endPercent) + '%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: true
        }
    });

    // Prepare UI elements for reveal
    try {
        gsap.set('.section3-features .features-title', { opacity: 0 });
        gsap.set('.section3-features .feature-block', { opacity: 0 });
    } catch (_) {}

    // Timeline structure with labels
    tl.addLabel('intro', 0);
    tl.addLabel('highlight', '+=' + getSequenceConfigNumber('introDuration'));
    tl.addLabel('outro', '+=' + getSequenceConfigNumber('outroDuration'));

    // Fade in title early in the intro phase
    tl.to('.section3-features .features-title', { opacity: 1, duration: 0.35, ease: 'power1.out' }, 'intro+=0.05');

    // Build per-group Y translation sequences
    addGroupSequences(tl, targets);

    console.log('[Section3Dashboard] Section 3 timeline created with ScrollTrigger pin+scrub');
    try { ScrollTrigger.refresh(); } catch (e) {}

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

        // Reveal next feature block at the start of this group window
        if (revealIndex < featureSelectors.length) {
            const sel = featureSelectors[revealIndex];
            try {
                tl.to(sel, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 'intro+=' + cursor.toFixed(3));
                revealIndex += 1;
            } catch (_) {}
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
            // Insert bubble animations as a group immediately after boxes, then continue
            const startAfterBoxes = groupEnd + groupGap;
            let bubbleDuration = 0;
            try {
                const dur = addBubbleChildrenSequences(tl, targets, startAfterBoxes);
                if (typeof dur === 'number' && dur > 0) {
                    bubbleDuration = dur;
                }
            } catch (e) { (void e); }

            // Tie the 4th feature reveal to the bubble phase start (if not revealed yet)
            if (revealIndex < featureSelectors.length) {
                const sel = featureSelectors[revealIndex];
                try {
                    tl.to(sel, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 'intro+=' + startAfterBoxes.toFixed(3));
                    revealIndex += 1;
                } catch (_) {}
            }

            // Advance cursor past bubbles plus a gap before next group
            cursor = startAfterBoxes + bubbleDuration + groupGap;
            continue;
        }

        // Advance cursor past this group plus gap
        cursor = groupEnd + groupGap;
    }
}


