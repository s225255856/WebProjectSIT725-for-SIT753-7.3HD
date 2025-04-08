document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const errorDisplay = document.getElementById('error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const res = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // You can auto-login here or redirect to login page
                alert('Sign up successful! Please log in.');
                window.location.href = '/login';
            } else {
                errorDisplay.textContent = data.message || 'Sign up failed.';
            }
        } catch (err) {
            console.error(err);
            errorDisplay.textContent = 'Something went wrong. Please try again.';
        }
    });
});
