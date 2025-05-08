/**
 * Tab Manager Module
 * Handles tab switching functionality for the Indomaret Management System
 */

// Tab manager module
const TabManager = (() => {
    
    // Initialize tabs functionality
    function init() {
        // Add click event listeners to tabs
        document.addEventListener('click', function(e) {
            // Check if clicked element is a tab
            if (e.target.classList.contains('tab')) {
                switchTab(e.target);
            }
        });
    }
    
    // Switch to the selected tab
    function switchTab(selectedTab) {
        // Get parent container and all tabs in this container
        const tabContainer = selectedTab.parentElement;
        const tabs = tabContainer.querySelectorAll('.tab');
        
        // Remove active class from all tabs
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to selected tab
        selectedTab.classList.add('active');
        
        // Get the index of the selected tab
        let tabIndex = 0;
        tabs.forEach((tab, index) => {
            if (tab === selectedTab) {
                tabIndex = index;
            }
        });
        
        // Get the tab content container (parent of the tabs container)
        const tabContentContainer = tabContainer.parentElement;
        
        // Get all tab content elements
        const tabContents = tabContentContainer.querySelectorAll('.tab-content');
        
        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Show the corresponding tab content
        if (tabContents[tabIndex]) {
            tabContents[tabIndex].classList.add('active');
        }
    }
    
    // Programmatically activate a tab by index
    function activateTabByIndex(tabContainer, index) {
        const tabs = tabContainer.querySelectorAll('.tab');
        if (tabs[index]) {
            switchTab(tabs[index]);
        }
    }
    
    // Public methods
    return {
        init,
        switchTab,
        activateTabByIndex
    };
})();