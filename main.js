document.addEventListener("DOMContentLoaded", () => {
	// Get elements
	const searchButton = document.querySelector(".menu-items .icon:nth-child(1)"); // Search button
	const menuButton = document.querySelector(".menu-items .icon:nth-child(3)"); // Menu button
	const searchDrawer = document.querySelector(".search-drawer");
	const navigationDrawer = document.querySelector(".navigation-drawer");
	const searchCloseButton = searchDrawer.querySelector(".drawer-close"); // Search close button
	const menuCloseButton = navigationDrawer.querySelector(".drawer-close"); // Menu close button

	// Function to toggle active class and trap focus
	function toggleDrawer(drawer, closeButton) {
		const isActive = drawer.classList.toggle("active");

		if (isActive) {
			trapFocus(drawer, closeButton); // Trap focus when the drawer is active
		} else {
			document.removeEventListener("keydown", handleKeydown);
		}
	}

	// Search Drawer Toggle
	searchButton.addEventListener("click", () => {
		toggleDrawer(searchDrawer, searchCloseButton);
	});

	// Navigation Drawer Toggle
	menuButton.addEventListener("click", () => {
		toggleDrawer(navigationDrawer, menuCloseButton);
	});

	// Close both drawers when their respective close buttons are clicked
	searchCloseButton.addEventListener("click", () => {
		searchDrawer.classList.remove("active");
		searchButton.focus();
	});

	menuCloseButton.addEventListener("click", () => {
		navigationDrawer.classList.remove("active");
		menuButton.focus();
	});

	// Focus trap function
	function trapFocus(drawer, closeButton) {
		const focusableElements = drawer.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');

		const focusable = [...focusableElements, closeButton]; // Include close button
		if (focusable.length === 0) return;

		const firstFocusableElement = focusable[0];
		const lastFocusableElement = focusable[focusable.length - 1];

		function handleKeydown(e) {
			if (e.key === "Tab") {
				if (e.shiftKey) {
					// Shift + Tab
					if (document.activeElement === firstFocusableElement) {
						e.preventDefault();
						lastFocusableElement.focus();
					}
				} else {
					// Tab
					if (document.activeElement === lastFocusableElement) {
						e.preventDefault();
						firstFocusableElement.focus();
					}
				}
			}

			// Close the drawer with Escape key
			if (e.key === "Escape") {
				drawer.classList.remove("active");
				closeButton.focus(); // Focus on the close button
				document.removeEventListener("keydown", handleKeydown);
			}
		}

		// Attach the keydown event to trap focus within the drawer
		document.addEventListener("keydown", handleKeydown);

		// Focus the first focusable element when the drawer is opened
		firstFocusableElement.focus();
	}
});
