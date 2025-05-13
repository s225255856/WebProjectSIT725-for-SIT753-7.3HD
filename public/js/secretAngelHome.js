document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("createGameModal");
    const openBtn = document.querySelector(".create-game-btn");
    const closeBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("createGameForm");

    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const budget = form.elements["budget"].value;
        const password = form.elements["password"].value;

        try {
            const res = await fetch("/api/secretAngel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ budget, password })
            });

            if (res.ok) {
                window.location.reload();
            } else {
                alert("Error creating game.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error.");
        }
    });

    // Join Modal Logic
    document.getElementById('closeJoinModalBtn').addEventListener('click', () => {
        document.getElementById('joinGameModal').classList.add('hidden');
    });

    document.getElementById('joinGameForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const roomId = document.getElementById('joinRoomId').value;
        const password = document.getElementById('joinPassword').value;

        try {
            const res = await fetch(`/api/secretAngel/${roomId}/join`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = `/secretAngel/room/${roomId}/${data.game._id.toString()}`;
            } else {
                alert("Incorrect password.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error.");
        }
    });
});


function openJoinModal(roomId) {
    document.getElementById('joinRoomId').value = roomId;
    document.getElementById('joinGameModal').classList.remove('hidden');
}
