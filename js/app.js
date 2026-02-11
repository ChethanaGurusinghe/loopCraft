document.addEventListener("DOMContentLoaded", () => {
    // Language
    let lang = localStorage.getItem("lang") || "en";
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
        langSelect.value = lang;
        langSelect.addEventListener("change", () => {
            localStorage.setItem("lang", langSelect.value);
            location.reload();
        });
    }

    // Theme

    const themeBtn = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
        });
    }


    // Blog list (cards)
    const blogList = document.getElementById("blogList");
    if (blogList && typeof posts !== "undefined") {
        blogList.innerHTML = Object.keys(posts).map(id => {
            const p = posts[id];

            // card will open file if exists, else post.html?id=...
            const link = p.file ? p.file : `post.html?id=${id}`;

            return `
        <div class="card blog-card" data-link="${link}">
          <div class="card-image">
            <img src="${p.image}" alt="${p[lang].title}">
          </div>
          <div class="card-content">
            <h3>${p[lang].title}</h3>
            <p>${p[lang].excerpt}</p>
            <button class="card-btn" type="button">See more</button>
          </div>
        </div>
      `;
        }).join("");

        // full card clickable
        document.querySelectorAll(".blog-card").forEach(card => {
            card.addEventListener("click", () => {
                location.href = card.dataset.link;
            });
        });
    }
});

// Unique id per post/page (works even for posts/mysql-part-1.html)
const postKey = "comments_" + window.location.pathname;

// Show saved comments
function renderComments() {
    const list = document.getElementById("commentList");
    if (!list) return;

    const comments = JSON.parse(localStorage.getItem(postKey)) || [];

    list.innerHTML = comments.map(c => `
    <div class="card">
      <p><strong>${c.name}</strong> : ${c.comment}</p>
    </div>
  `).join("");
}

// Add new comment
function addComment() {
    const nameEl = document.getElementById("name");
    const commentEl = document.getElementById("comment");

    if (!nameEl || !commentEl) return;

    const name = nameEl.value.trim();
    const comment = commentEl.value.trim();

    if (!name || !comment) {
        alert("Please fill both fields!");
        return;
    }

    const comments = JSON.parse(localStorage.getItem(postKey)) || [];
    comments.push({ name, comment });

    localStorage.setItem(postKey, JSON.stringify(comments));

    nameEl.value = "";
    commentEl.value = "";

    renderComments();
    alert("Comment posted successfully!");
}

// Load comments when page opens
document.addEventListener("DOMContentLoaded", renderComments);
