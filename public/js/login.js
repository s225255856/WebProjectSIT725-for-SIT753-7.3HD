document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;

        try {
            const res = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);

                console.log('Login successful:', data);
                window.location.href = '/home';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong.');
        }
    });
});
