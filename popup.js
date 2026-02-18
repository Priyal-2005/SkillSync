document.addEventListener('DOMContentLoaded', () => {
    // Load saved profile
    chrome.storage.local.get(['profile'], (result) => {
        if (result.profile) {
            document.getElementById('fullName').value = result.profile.fullName || '';
            document.getElementById('email').value = result.profile.email || '';
            document.getElementById('phone').value = result.profile.phone || '';
            document.getElementById('skills').value = result.profile.skills || '';
            document.getElementById('portfolio').value = result.profile.portfolio || '';
            document.getElementById('bio').value = result.profile.bio || '';
        }
    });

    // Save Profile
    document.getElementById('saveBtn').addEventListener('click', () => {
        const profile = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            skills: document.getElementById('skills').value,
            portfolio: document.getElementById('portfolio').value,
            bio: document.getElementById('bio').value
        };

        chrome.storage.local.set({ profile: profile }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Profile Saved!';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        });
    });

    // Auto Fill
    document.getElementById('autoFillBtn').addEventListener('click', () => {
        const status = document.getElementById('status');
        
        // Send message to background script
        chrome.runtime.sendMessage({ action: 'autoFill' }, (response) => {
             // Optional: Handle response if needed, for instance if background script sends back status
             if (chrome.runtime.lastError) {
                 status.textContent = 'Error: ' + chrome.runtime.lastError.message;
                 status.style.color = 'red';
             } else {
                 status.textContent = 'Auto-fill initiated!';
                 status.style.color = '#27ae60';
                 setTimeout(() => {
                    status.textContent = '';
                }, 2000);
             }
        });
    });
});
