chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillForm" && request.profile) {
        const profile = request.profile;
        const inputs = document.querySelectorAll("input, textarea");
        let filledCount = 0;

        inputs.forEach((field) => {
            // Skip hidden or disabled fields if necessary, but requirements say "Select all inputs"

            const name = field.name ? field.name.toLowerCase() : "";
            const id = field.id ? field.id.toLowerCase() : "";
            const placeholder = field.placeholder ? field.placeholder.toLowerCase() : "";
            const type = field.type ? field.type.toLowerCase() : "";

            // Combine attributes for matching
            const attributes = `${name} ${id} ${placeholder} ${type}`;

            let valueToSet = null;

            // Matching Rules
            if (attributes.includes("email")) {
                valueToSet = profile.email;
            } else if (
                attributes.includes("phone") ||
                attributes.includes("mobile") ||
                attributes.includes("tel")
            ) {
                valueToSet = profile.phone;
            } else if (
                attributes.includes("skill") ||
                (attributes.includes("keywords") && !attributes.includes("search"))
            ) {
                valueToSet = profile.skills;
            } else if (
                attributes.includes("bio") ||
                attributes.includes("about") ||
                attributes.includes("description")
            ) {
                valueToSet = profile.bio;
            } else if (
                attributes.includes("portfolio") ||
                attributes.includes("website") ||
                attributes.includes("link") ||
                attributes.includes("url")
            ) {
                valueToSet = profile.portfolio;
            } else if (attributes.includes("name") || attributes.includes("fullname")) {
                // Check if it is not username/filename
                if (!attributes.includes("user") && !attributes.includes("file")) {
                    valueToSet = profile.fullName;
                }
            }

            if (valueToSet !== null && valueToSet !== undefined) {
                field.value = valueToSet;
                field.dispatchEvent(new Event("input", { bubbles: true }));
                field.dispatchEvent(new Event("change", { bubbles: true }));
                filledCount++;
            }
        });

        showNotification();
        sendResponse({ status: "success", filled: filledCount });
    }
});

function showNotification() {
    // Remove existing notification if any
    const existing = document.getElementById("skillsync-notification");
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement("div");
    notification.id = "skillsync-notification";
    notification.textContent = "SkillSync Autofill Completed";

    // Styles
    Object.assign(notification.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#3498db",
        color: "#ffffff",
        padding: "15px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: "10000",
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: "14px",
        fontWeight: "600",
        opacity: "0",
        transition: "opacity 0.5s ease",
        pointerEvents: "none" // Let clicks pass through
    });

    document.body.appendChild(notification);

    // Fade in
    requestAnimationFrame(() => {
        notification.style.opacity = "1";
    });

    // Auto disappear
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}
