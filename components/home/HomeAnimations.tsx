"use client";
import { useEffect } from "react";

export default function HomeAnimations() {
  useEffect(() => {
    const run = async () => {
      const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollToPlugin"),
      ]);
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      // ── Magnetic Buttons ──
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          gsap.to(el, {
            x: (e.clientX - cx) * 0.35,
            y: (e.clientY - cy) * 0.35,
            duration: 0.4,
            ease: "power3.out",
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
        });
      });

      // ── Nav scroll state ──
      const nav = document.getElementById("nav");
      if (nav) {
        window.addEventListener("scroll", () => {
          nav.classList.toggle("scrolled", window.scrollY > 60);
        });
      }

      // ── Mobile Menu ──
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
          const isOpen = mobileMenu.classList.toggle("open");
          hamburger.classList.toggle("active", isOpen);
        });
        mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            hamburger.classList.remove("active");
          });
        });
      }

      // ── Scroll reveal helper ──
      function onScrollEnter(
        targets: string,
        fromVars: object,
        staggerDelay?: number
      ) {
        gsap.utils.toArray<HTMLElement>(targets).forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.from(el, { ...fromVars, delay: (staggerDelay || 0) * i });
            },
          });
        });
      }

      // ── Hero entrance ──
      gsap.to(".name-line", { y: "0%", duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.1 });
      gsap.to(".reveal-up", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.5 });
      gsap.to(".reveal-right", { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.7 });

      // Counter animation
      document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.count || "0", 10);
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          delay: 1.2,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = String(Math.round((this as { targets: () => { val: number }[] }).targets()[0].val));
          },
        });
      });

      // ── Scroll-triggered section animations ──
      onScrollEnter(".section-tag", { opacity: 0, x: -20, duration: 0.7, ease: "power3.out" });
      onScrollEnter(".section-title", { opacity: 0, y: 40, duration: 1, ease: "power3.out" });
      onScrollEnter(".about-lead, .about-body", { opacity: 0, y: 28, duration: 0.8, ease: "power3.out" }, 0.08);
      onScrollEnter(".about-certs", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" });
      onScrollEnter(".about-card", { opacity: 0, x: 40, scale: 0.97, duration: 0.9, ease: "power3.out" });
      onScrollEnter(".skill-category", { opacity: 0, y: 36, duration: 0.7, ease: "power3.out" }, 0.07);
      onScrollEnter(".timeline-item", { opacity: 0, x: -28, duration: 0.8, ease: "power3.out" }, 0.05);

      // GoodAction case study
      ScrollTrigger.create({
        trigger: ".cs-card",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.from(".cs-card", { opacity: 0, y: 60, duration: 1, ease: "power3.out" });
          gsap.from(".cs-ss-1", { opacity: 0, y: 40, duration: 0.9, ease: "power3.out", delay: 0.3 });
          gsap.from(".cs-ss-4", { opacity: 0, y: -30, duration: 0.9, ease: "power3.out", delay: 0.45 });
          gsap.from(".cs-ss-2", { opacity: 0, x: 40, duration: 0.9, ease: "power3.out", delay: 0.55 });
          gsap.from(".cs-ss-3", { opacity: 0, y: 40, duration: 0.9, ease: "power3.out", delay: 0.65 });
        },
      });

      // Energy Marketplace
      ScrollTrigger.create({
        trigger: ".cs-card-energy",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.from(".cs-card-energy", { opacity: 0, y: 60, duration: 1, ease: "power3.out" });
          gsap.from(".ess-1", { opacity: 0, x: -40, duration: 0.9, ease: "power3.out", delay: 0.35 });
          gsap.from(".ess-2", { opacity: 0, x: 40, duration: 0.9, ease: "power3.out", delay: 0.55 });
          gsap.from(".ess-badge-float", { opacity: 0, y: -20, scale: 0.8, duration: 0.7, ease: "back.out(1.5)", delay: 0.75 });
        },
      });

      // UiLand
      ScrollTrigger.create({
        trigger: ".cs-card-uiland",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.from(".cs-card-uiland", { opacity: 0, y: 60, duration: 1, ease: "power3.out" });
          gsap.from(".uiland-mockup", { opacity: 0, x: -50, rotateY: 12, duration: 1.1, ease: "power3.out", delay: 0.3 });
        },
      });

      onScrollEnter(".op-card", { opacity: 0, y: 36, duration: 0.8, ease: "power3.out" }, 0.08);
      onScrollEnter(".contact-title, .contact-sub, .contact-links, .contact-socials", { opacity: 0, y: 36, duration: 0.8, ease: "power3.out" }, 0.1);

      // Parallax on hero grid
      gsap.to(".hero-grid", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
      });

      // Active nav highlight
      document.querySelectorAll<HTMLElement>("section[id]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveNav(section.id),
          onEnterBack: () => setActiveNav(section.id),
        });
      });

      // ── Screenshot lightbox ──
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightboxImg") as HTMLImageElement | null;
      const lightboxClose = document.getElementById("lightboxClose");

      document.querySelectorAll<HTMLElement>(".cs-ss, .sph, .sph-float").forEach((ss) => {
        ss.style.cursor = "pointer";
        ss.addEventListener("click", () => {
          const img = ss.querySelector("img");
          if (!img || !lightbox || !lightboxImg) return;
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add("open");
          document.body.style.overflow = "hidden";
        });
      });

      [lightboxClose, lightbox].forEach((el) => {
        el?.addEventListener("click", (e) => {
          if (e.target === lightbox || e.target === lightboxClose) {
            lightbox?.classList.remove("open");
            document.body.style.overflow = "";
          }
        });
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          lightbox?.classList.remove("open");
          document.body.style.overflow = "";
        }
      });

      // ── Smooth anchor scroll ──
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          if (!href) return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          gsap.to(window, { scrollTo: { y: target, offsetY: 72 }, duration: 1.2, ease: "power3.inOut" });
        });
      });

      ScrollTrigger.refresh();
    };

    // Wait for loader to finish, then run animations
    const onLoaderDone = () => run();
    window.addEventListener("loaderDone", onLoaderDone, { once: true });

    return () => {
      window.removeEventListener("loaderDone", onLoaderDone);
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return null;
}

function setActiveNav(id: string) {
  document.querySelectorAll<HTMLAnchorElement>(".nav-link").forEach((link) => {
    link.style.color = link.getAttribute("href") === `#${id}` ? "var(--dark)" : "";
  });
}
