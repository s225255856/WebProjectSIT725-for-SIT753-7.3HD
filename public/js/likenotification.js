document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('/login')) {
    const userId = document.body.getAttribute('data-user-id');
    if (!userId) return;

    const socket = io({
      query: { userId }
    });

    socket.on('like_notification', (data) => {
      const notif = document.createElement('div');
      notif.classList.add('like-notif-toast');
      notif.textContent = `💖Cool, ${data.likerName} liked your post!`;
      document.body.appendChild(notif);

      setTimeout(() => notif.remove(), 15000);
    });
  }
});
