// Navigation Module for NFTfi Marketing Site
// Handles all navigation functionality including dropdowns and mobile menu

// Navigation functionality - Simple and effective
export function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Desktop dropdowns - Simple and working
    const dropdowns = document.querySelectorAll('.dropdown-container');
    console.log('Found dropdown containers:', dropdowns.length);
    
    dropdowns.forEach((dropdown, index) => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        console.log(`Dropdown ${index}:`, { trigger: Boolean(trigger), menu: Boolean(menu) });
        
        if (!trigger || !menu) {
            console.error('Missing trigger or menu element');
            return;
        }
        
        // Toggle dropdown on click
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = menu.classList.contains('open');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu.open').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('open');
                    const otherTrigger = otherMenu.parentElement.querySelector('.dropdown-trigger');
                    if (otherTrigger) {
                        otherTrigger.classList.remove('open');
                    }
                }
            });
            
            if (isOpen) {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            } else {
                menu.classList.add('open');
                trigger.classList.add('open');
            }
        });
        
        // Add click handlers to dropdown items
        const dropdownItems = menu.querySelectorAll('.dropdown-item');
        console.log(`Dropdown ${index} items:`, dropdownItems.length);
        
        dropdownItems.forEach((item, itemIndex) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Clicked dropdown item ${itemIndex}:`, item.textContent);
                // Close the dropdown after item click
                menu.classList.remove('open');
                trigger.classList.remove('open');
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            }
        });
    });
    
    // CTA Button functionality
    const ctaButtons = document.querySelectorAll('.nav-cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('CTA button clicked: Launch App');
            // Add your launch app logic here
            // For example: window.open('https://app.nftfi.com', '_blank');
        });
    });
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenuOverlay && mobileMenuClose) {
        // Open mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
        
        // Close mobile menu
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });
        
        // Close on overlay click
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Mobile dropdowns
        const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
        
        mobileDropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.mobile-dropdown-trigger');
            const menu = dropdown.querySelector('.mobile-dropdown-menu');
            
            if (trigger && menu) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isOpen = menu.classList.contains('active');
                    
                    // Close all other mobile dropdowns
                    document.querySelectorAll('.mobile-dropdown-menu.active').forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            otherMenu.classList.remove('active');
                            const otherTrigger = otherMenu.parentElement.querySelector('.mobile-dropdown-trigger');
                            if (otherTrigger) {
                                otherTrigger.classList.remove('active');
                            }
                        }
                    });
                    
                    if (isOpen) {
                        menu.classList.remove('active');
                        trigger.classList.remove('active');
                    } else {
                        menu.classList.add('active');
                        trigger.classList.add('active');
                    }
                });
            }
        });
    }
} 