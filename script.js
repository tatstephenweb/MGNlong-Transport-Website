// =========================================================
// M.G NLONG — site interactions
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

	/* ---------- Sticky nav shrink on scroll ---------- */
	const nav = document.getElementById("siteNav");
	if (nav) {
		const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
	}

	/* ---------- Mobile menu ---------- */
	const menuBox = document.getElementById("mobile-menu-outer-box");
	const openBtn = document.getElementById("menuBtnBars");
	const closeBtn = document.getElementById("menuCloseBtn");

	function openMenu() {
		menuBox.classList.add("is-open");
		openBtn.setAttribute("aria-expanded", "true");
	}
	function closeMenu() {
		menuBox.classList.remove("is-open");
		openBtn.setAttribute("aria-expanded", "false");
	}

	if (openBtn) openBtn.addEventListener("click", openMenu);
	if (closeBtn) closeBtn.addEventListener("click", closeMenu);
	if (menuBox) {
		menuBox.addEventListener("click", (e) => {
			if (e.target === menuBox) closeMenu();
		});
		menuBox.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
	}

	// Keep old global function names working, in case they're referenced elsewhere
	window.displayMenuBox = openMenu;
	window.removeMenuBox = closeMenu;

	/* ---------- Scroll reveal ---------- */
	const revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, i) => {
					if (entry.isIntersecting) {
						setTimeout(() => entry.target.classList.add("is-visible"), i * 60);
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
		);
		revealEls.forEach((el) => io.observe(el));
	} else {
		revealEls.forEach((el) => el.classList.add("is-visible"));
	}

	/* ---------- Video play button ---------- */
	const video = document.getElementById("fleetVideo");
	const playBtn = document.getElementById("videoPlayBtn");
	if (video && playBtn) {
		playBtn.addEventListener("click", () => {
			video.play();
		});
		video.addEventListener("play", () => playBtn.classList.add("is-hidden"));
		video.addEventListener("pause", () => playBtn.classList.remove("is-hidden"));
		video.addEventListener("ended", () => playBtn.classList.remove("is-hidden"));
	}

	/* ---------- Smooth anchor scroll (fallback for older browsers) ---------- */
	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		link.addEventListener("click", (e) => {
			const id = link.getAttribute("href");
			if (id.length > 1) {
				const target = document.querySelector(id);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		});
	});
});
