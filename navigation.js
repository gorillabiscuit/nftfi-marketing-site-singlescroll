import { computePosition, flip, offset, shift } from '@floating-ui/dom';

// Initialize dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        const dropdownId = trigger.getAttribute('data-dropdown');
        const dropdown = document.getElementById(`${dropdownId}-dropdown`);
        
        if (!dropdown) return;
        
        let isOpen = false;
        
        // Function to update dropdown position
        function updatePosition() {
            if (!isOpen) return;
            
            computePosition(trigger, dropdown, {
                placement: 'bottom-start',
                middleware: [
                    offset(8),
                    flip(),
                    shift({ padding: 8 })
                ]
            }).then(({ x, y }) => {
                Object.assign(dropdown.style, {
                    left: `${x}px`,
                    top: `${y}px`
                });
            });
        }
        
        // Toggle dropdown
        function toggleDropdown() {
            isOpen = !isOpen;
            
            if (isOpen) {
                dropdown.classList.add('show');
                trigger.setAttribute('aria-expanded', 'true');
                updatePosition();
            } else {
                dropdown.classList.remove('show');
                trigger.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Event listeners
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
                isOpen = false;
                dropdown.classList.remove('show');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                isOpen = false;
                dropdown.classList.remove('show');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Update position on window resize
        window.addEventListener('resize', updatePosition);
    });
}); 