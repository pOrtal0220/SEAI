/**
 * AquaMind Auth Logic
 * Handles toggling between Login and Sign Up modes
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-auth');
    const form = document.getElementById('auth-form');
    const nameGroup = document.getElementById('name-group');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const forgotPass = document.getElementById('forgot-pass');

    let isLogin = true;

    toggleBtn.addEventListener('click', () => {
        isLogin = !isLogin;

        if (isLogin) {
            // Switch to Login UI
            formTitle.innerText = "Welcome Back";
            formSubtitle.innerText = "Enter your credentials to access your farm.";
            submitBtn.innerText = "Sign In";
            toggleText.innerText = "Don't have an account?";
            toggleBtn.innerText = "Create Account";
            nameGroup.classList.add('hidden');
            forgotPass.classList.remove('hidden');
        } else {
            // Switch to Sign Up UI
            formTitle.innerText = "Join AquaMind";
            formSubtitle.innerText = "Start optimizing your irrigation today.";
            submitBtn.innerText = "Get Started";
            toggleText.innerText = "Already have an account?";
            toggleBtn.innerText = "Sign In";
            nameGroup.classList.remove('hidden');
            forgotPass.classList.add('hidden');
        }
    });

    // Form Submission Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate a successful login/signup
        submitBtn.innerText = "Authenticating...";
        submitBtn.disabled = true;

        setTimeout(() => {
            // Redirect to the Dashboard
            window.location.href = "dashboard.html";
        }, 1500);
    });
});
