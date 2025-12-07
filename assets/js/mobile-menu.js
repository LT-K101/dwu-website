// Wait for the entire page to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuToggle = document.querySelector('.sidebar-toggle-btn');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const body = document.body;
    
    // Check if elements exist before adding event listeners
    if (mobileMenuToggle && mobileNavMenu) {
        // Toggle mobile menu
        function toggleMobileMenu() {
            mobileNavMenu.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
            
            // Toggle hamburger icon animation
            mobileMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileNavMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        // Close mobile menu when clicking outside
        function closeMobileMenu(e) {
            if (mobileNavMenu.classList.contains('active') && 
                !mobileNavMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        }
        
        // Toggle submenus
        function toggleSubmenu(e) {
            const menuItem = e.target.closest('li');
            if (menuItem && menuItem.classList.contains('has-submenu')) {
                e.preventDefault();
                const submenu = menuItem.querySelector('.sub-menu');
                const toggleBtn = menuItem.querySelector('.menu-toggle');
                
                // Toggle the clicked submenu
                if (submenu) {
                    // Close all other open submenus at this level
                    const parentMenu = menuItem.parentElement;
                    const openSubmenus = parentMenu.querySelectorAll('.sub-menu.active');
                    openSubmenus.forEach(openSubmenu => {
                        if (openSubmenu !== submenu) {
                            openSubmenu.classList.remove('active');
                            const otherToggle = openSubmenu.previousElementSibling;
                            if (otherToggle && otherToggle.classList.contains('menu-toggle')) {
                                otherToggle.classList.remove('active');
                                otherToggle.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                    
                    // Toggle current submenu
                    submenu.classList.toggle('active');
                    if (toggleBtn) {
                        toggleBtn.classList.toggle('active');
                        toggleBtn.setAttribute('aria-expanded', 
                            toggleBtn.classList.contains('active').toString());
                    }
                }
            }
        }
        
        // Event listeners
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking on a link
        mobileNavMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                toggleMobileMenu();
            }
        });
        
        // Handle submenu toggles
        mobileNavMenu.addEventListener('click', function(e) {
            // Handle clicks on menu items with submenus
            const menuItem = e.target.closest('li.menu-item-has-children');
            if (menuItem) {
                e.preventDefault();
                const submenu = menuItem.querySelector('.sub-menu');
                if (submenu) {
                    submenu.classList.toggle('active');
                    menuItem.classList.toggle('active');
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
            if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
        
        // Close menu when window is resized to desktop view
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 991) {
                    // Close mobile menu
                    if (mobileNavMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Close all open submenus
                    const openSubmenus = mobileNavMenu.querySelectorAll('.sub-menu.active');
                    openSubmenus.forEach(submenu => {
                        submenu.classList.remove('active');
                        const toggleBtn = submenu.previousElementSibling;
                        if (toggleBtn && toggleBtn.classList.contains('menu-toggle')) {
                            toggleBtn.classList.remove('active');
                            toggleBtn.setAttribute('aria-expanded', 'false');
                        }
                    });
                }
            }, 250);
        });
    } else {
        console.error('One or more mobile menu elements are missing from the page');
    }
});
