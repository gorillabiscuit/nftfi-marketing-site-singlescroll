// Section 3: Dashboard SVG embedding and setup (no animation here)
// Purpose: Load and inline images/dashboard.svg into #dashboard-svg-container with strict guards
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTION3 } from '../config.js';
import { SECTION3_SCROLL } from '../config.js';

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
    const selectorList = [
        '[id^="animate"]',
        '[class^="animate"]',
        '[class*=" animate"]',
        '[data-animate]'
    ];
    const nodeList = svgEl.querySelectorAll(selectorList.join(', '));
    const all = uniqueArray(Array.prototype.slice.call(nodeList));

    // Group by id prefix
    const byId = new Map();
    for (let i = 0; i < all.length; i += 1) {
        const el = all[i];
        const id = el.getAttribute('id');
        if (id && id.indexOf('animate') === 0) {
            byId.set(id, el);
        }
    }

    // Group by class token starting with animate
    const byClass = new Map();
    for (let i = 0; i < all.length; i += 1) {
        const el = all[i];
        const classAttr = el.getAttribute('class');
        if (classAttr) {
            const tokens = classAttr.split(/\s+/);
            for (let j = 0; j < tokens.length; j += 1) {
                const token = tokens[j];
                if (token.indexOf('animate') === 0) {
                    if (!byClass.has(token)) {
                        byClass.set(token, []);
                    }
                    byClass.get(token).push(el);
                }
            }
        }
    }

    const result = { all: all, byId: byId, byClass: byClass };
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
    const svgEl = getSvgRootStrict();
    const targets = getSection3Targets();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: () => '+=' + Math.round((tl ? tl.totalDuration() : 4) * (SECTION3_SCROLL && typeof SECTION3_SCROLL.pxPerSecond === 'number' ? SECTION3_SCROLL.pxPerSecond : 600)),
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: true
        }
    });

    // Placeholder labels for later sequencing
    tl.addLabel('intro', 0);
    tl.addLabel('highlight', '+=1');
    tl.addLabel('outro', '+=1');

    // Minimal no-op to give non-zero duration; real tweens added in 1.5
    tl.to({}, { duration: 3 });

    console.log('[Section3Dashboard] Section 3 timeline created with ScrollTrigger pin+scrub');
    try { ScrollTrigger.refresh(); } catch (e) {}
    return tl;
}


