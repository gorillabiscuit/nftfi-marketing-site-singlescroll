// Grid Animation Module for NFTfi Marketing Site
// Creates an animated grid with lines and blocks in section 2

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Grid configuration
const N = 6;                // number of lines per stack (6 circles as requested)
const spacing = 20;         // spacing between lines in px (20px as requested)
const lineLen = 1200;       // long enough to cover diagonals
const cellSize = 22;        // size of grid blocks

// Grid elements
let gLines, gLines2, gBlocks;
let hLines = [];
let cells = [];

/**
 * Initialize the grid animation system
 */
export function initGridAnimation() {
    console.log('Initializing grid animation...');
    
    // Get SVG elements
    gLines = document.querySelector("#lines");
    gLines2 = document.querySelector("#lines2");
    gBlocks = document.querySelector("#blocks");
    
    if (!gLines || !gLines2 || !gBlocks) {
        console.warn('Grid SVG elements not found, grid animation disabled');
        return;
    }
    
    console.log('Grid SVG elements found, building structure...');

    // Build the grid structure
    buildGridStructure();
    
    // Create and start the animation timeline
    createGridTimeline();
    
    console.log('Grid animation initialized');
}

/**
 * Build the grid structure with lines and blocks
 */
function buildGridStructure() {
    // Clear existing content
    gLines.innerHTML = '';
    gLines2.innerHTML = '';
    gBlocks.innerHTML = '';
    hLines = [];
    cells = [];

    // Create a "stack" of horizontal lines centered at (0,0), initially collapsed
    for (let i = -N/2; i < N/2; i++) {
        const y = i * 0; // start collapsed at y=0 (all from center)
        const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l.setAttribute("x1", 0);
        l.setAttribute("y1", y);
        l.setAttribute("x2", 0);  // we'll grow to ±lineLen via scaleX
        l.setAttribute("y2", y);
        l.setAttribute("stroke", "#F2F2F2");
        l.setAttribute("stroke-width", "2");
        l.setAttribute("vector-effect", "non-scaling-stroke");
        
        // use a container <g> so we can scaleX from center
        const wrap = document.createElementNS("http://www.w3.org/2000/svg", "g");
        wrap.setAttribute("transform", `translate(0, ${y})`);
        wrap.appendChild(l);
        gLines.appendChild(wrap);
        hLines.push(wrap);
    }

    // Duplicate stack for the second diagonal (we'll rotate the original + clone)
    const gLines2Clone = gLines.cloneNode(true);
    gLines2Clone.id = "lines2";
    gLines2.appendChild(gLines2Clone);

    // Prepare grid "blocks" (small rects that will appear at cell centers)
    const gridSpan = 600;         // half-extent from center
    for (let y = -gridSpan; y <= gridSpan; y += spacing) {
        for (let x = -gridSpan; x <= gridSpan; x += spacing) {
            const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            r.setAttribute("x", x - cellSize/2);
            r.setAttribute("y", y - cellSize/2);
            r.setAttribute("width", cellSize);
            r.setAttribute("height", cellSize);
            r.setAttribute("fill", "#F2F2F2");
            r.setAttribute("opacity", "0"); // start hidden
            gBlocks.appendChild(r);
            cells.push(r);
        }
    }
}

/**
 * Create the grid animation timeline
 */
function createGridTimeline() {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Stage 1: Draw horizontal lines from center outward
    tl.to(gLines.querySelectorAll("g"), {
        transformOrigin: "50% 50%",
        onStart() {
            gLines.querySelectorAll("g").forEach(w => {
                w.style.transformOrigin = "0px 0px"; // SVG coords; we're at translate(0, y)
            });
        },
        scaleX: 1,
        duration: 0.6
    }, 0)
    .fromTo(gLines.querySelectorAll("line"),
        { x1: -0, x2: +0 },
        { attr: { x1: -lineLen/2, x2: lineLen/2 }, duration: 0.6 },
        0
    );

    // Stage 2: Separate (spread lines apart from center)
    tl.to(gLines.querySelectorAll("g"), {
        y: (i) => (i - (N/2 - 0.5)) * spacing,
        duration: 0.8
    });

    // Copy second stack's lines to match, then rotate stacks to make the grid
    tl.set(gLines2, {}, "<")
        .to(gLines,  { rotation: 45,  duration: 0.8, transformOrigin: "0px 0px" }, "<")
        .to(gLines2, { rotation: -45, duration: 0.8, transformOrigin: "0px 0px" }, "<");

    // Stage 3: Reveal blocks at intersections
    tl.to(cells, {
        opacity: 1,
        scale: 1,
        transformOrigin: "50% 50%",
        duration: 0.5,
        stagger: { each: 0.003, grid: "auto", from: "center" }
    });

    // Pin & scrub with ScrollTrigger
    console.log('Creating ScrollTrigger for grid stage...');
    const st = ScrollTrigger.create({
        trigger: "#grid-stage",
        start: "top top",
        end: "+=2000",     // scroll distance controlling the whole sequence
        pin: true,
        pinSpacing: true,  // Add spacing to prevent layout issues
        scrub: 1,          // tie progress to scroll
        onEnter() {
            console.log('Grid stage entered, pinning active');
        },
        onLeave() {
            // After completion, clean up
            console.log('Grid stage left, cleaning up pin');
            st.kill(true);
            ScrollTrigger.refresh();
        },
        onEnterBack() {
            // Ensure we can scroll back up
            console.log('Grid stage entered from bottom');
        }
    });
    
    tl.scrollTrigger = st;
    
    // Force ScrollTrigger refresh to ensure proper setup
    ScrollTrigger.refresh();
    console.log('Grid animation timeline created with ScrollTrigger');
}

/**
 * Clean up grid animation
 */
export function cleanupGridAnimation() {
    // Kill any active ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === "#grid-stage") {
            trigger.kill(true);
        }
    });
    
    console.log('Grid animation cleaned up');
}
