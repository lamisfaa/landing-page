const hero = document.querySelector(".hero");
const ctas = document.querySelectorAll(".button, .nav-cta");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

ctas.forEach((cta) => {
  cta.addEventListener("mouseenter", () => {
    hero?.classList.add("is-cta-hovered");
  });

  cta.addEventListener("mouseleave", () => {
    hero?.classList.remove("is-cta-hovered");
  });

  cta.addEventListener("focus", () => {
    hero?.classList.add("is-cta-hovered");
  });

  cta.addEventListener("blur", () => {
    hero?.classList.remove("is-cta-hovered");
  });
});

const roadmap = document.querySelector(".roadmap-section");
const roadmapList = document.querySelector(".roadmap-list");
const roadmapSteps = document.querySelectorAll(".roadmap-step");
const roadmapRibbonPath = document.querySelector(".roadmap-ribbon-path");

if (roadmap && roadmapList && roadmapSteps.length > 0) {
  let roadmapRibbonLength = 0;

  const measureRoadmapRibbon = () => {
    if (!roadmapRibbonPath) {
      return;
    }

    roadmapRibbonLength = roadmapRibbonPath.getTotalLength();
    roadmap.style.setProperty("--ribbon-length", roadmapRibbonLength);
    roadmap.style.setProperty("--ribbon-offset", roadmapRibbonLength);
  };

  const setRoadmapProgress = () => {
    const rect = roadmapList.getBoundingClientRect();
    const viewportAnchor = window.innerHeight * 0.58;
    const progress = (viewportAnchor - rect.top) / rect.height;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    roadmap.style.setProperty("--roadmap-progress", `${clampedProgress * 100}%`);

    if (roadmapRibbonLength > 0) {
      roadmap.style.setProperty("--ribbon-offset", roadmapRibbonLength * (1 - clampedProgress));
    }
  };

  const setActiveStep = () => {
    let activeStep = roadmapSteps[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    roadmapSteps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      const stepCenter = rect.top + rect.height / 2;
      const distance = Math.abs(window.innerHeight * 0.48 - stepCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeStep = step;
      }
    });

    roadmapSteps.forEach((step) => {
      step.classList.toggle("is-active", step === activeStep);
    });
  };

  const updateRoadmap = () => {
    setRoadmapProgress();
    setActiveStep();
  };

  if (reduceMotion.matches) {
    roadmap.style.setProperty("--roadmap-progress", "100%");
    measureRoadmapRibbon();
    roadmap.style.setProperty("--ribbon-offset", "0");
    roadmapSteps.forEach((step) => {
      step.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.2,
      }
    );

    roadmapSteps.forEach((step) => observer.observe(step));

    let ticking = false;

    const requestRoadmapUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateRoadmap();
          ticking = false;
        });
        ticking = true;
      }
    };

    measureRoadmapRibbon();
    updateRoadmap();
    window.addEventListener("scroll", requestRoadmapUpdate, { passive: true });
    window.addEventListener("resize", () => {
      measureRoadmapRibbon();
      requestRoadmapUpdate();
    });
  }
}

const testimonialsCarousel = document.querySelector(".testimonials-carousel");

if (testimonialsCarousel) {
  const viewport = testimonialsCarousel.querySelector(".testimonials-viewport");
  const track = testimonialsCarousel.querySelector(".testimonials-track");
  const cards = Array.from(testimonialsCarousel.querySelectorAll(".testimonial-card"));
  const originalCards = cards.filter((card) => !card.hasAttribute("aria-hidden"));
  const dots = Array.from(testimonialsCarousel.querySelectorAll("[data-testimonial-dot]"));
  const previousButton = testimonialsCarousel.querySelector("[data-testimonial-prev]");
  const nextButton = testimonialsCarousel.querySelector("[data-testimonial-next]");

  let offset = 0;
  let loopWidth = 0;
  let cardStep = 0;
  let activeIndex = 0;
  let lastTimestamp = 0;
  let isPaused = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let resumeTimer = 0;
  const speed = 26;

  const measureTestimonials = () => {
    const firstCard = originalCards[0];
    const lastOriginalCard = originalCards[originalCards.length - 1];

    if (!firstCard || !lastOriginalCard) {
      return;
    }

    const firstRect = firstCard.getBoundingClientRect();
    const lastRect = lastOriginalCard.getBoundingClientRect();

    loopWidth = lastRect.right - firstRect.left + parseFloat(getComputedStyle(track).gap || 0);
    cardStep = originalCards[1]
      ? originalCards[1].offsetLeft - originalCards[0].offsetLeft
      : firstRect.width;
  };

  const normalizeOffset = () => {
    if (loopWidth <= 0) {
      return;
    }

    while (offset >= loopWidth) {
      offset -= loopWidth;
    }

    while (offset < 0) {
      offset += loopWidth;
    }
  };

  const updateDots = () => {
    if (cardStep <= 0 || originalCards.length === 0) {
      return;
    }

    activeIndex = Math.round(offset / cardStep) % originalCards.length;

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  const renderTestimonials = () => {
    normalizeOffset();
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    updateDots();
  };

  const pauseTestimonials = () => {
    isPaused = true;
    window.clearTimeout(resumeTimer);
  };

  const resumeTestimonials = (delay = 0) => {
    window.clearTimeout(resumeTimer);

    if (reduceMotion.matches) {
      return;
    }

    resumeTimer = window.setTimeout(() => {
      isPaused = false;
      lastTimestamp = performance.now();
    }, delay);
  };

  const moveToSlide = (index) => {
    offset = index * cardStep;
    renderTestimonials();
  };

  const moveByCards = (direction) => {
    offset += direction * cardStep;
    renderTestimonials();
  };

  const animateTestimonials = (timestamp) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused && !reduceMotion.matches && !isDragging) {
      offset += (speed * delta) / 1000;
      renderTestimonials();
    }

    window.requestAnimationFrame(animateTestimonials);
  };

  testimonialsCarousel.addEventListener("mouseenter", pauseTestimonials);
  testimonialsCarousel.addEventListener("mouseleave", () => resumeTestimonials(350));
  testimonialsCarousel.addEventListener("focusin", pauseTestimonials);
  testimonialsCarousel.addEventListener("focusout", () => resumeTestimonials(350));

  viewport?.addEventListener("pointerdown", (event) => {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartOffset = offset;
    pauseTestimonials();
    viewport.setPointerCapture?.(event.pointerId);
  });

  viewport?.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    offset = dragStartOffset - (event.clientX - dragStartX);
    renderTestimonials();
  });

  const endDrag = () => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    resumeTestimonials(900);
  };

  viewport?.addEventListener("pointerup", endDrag);
  viewport?.addEventListener("pointercancel", endDrag);

  previousButton?.addEventListener("click", () => {
    pauseTestimonials();
    moveByCards(-1);
    resumeTestimonials(1200);
  });

  nextButton?.addEventListener("click", () => {
    pauseTestimonials();
    moveByCards(1);
    resumeTestimonials(1200);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      pauseTestimonials();
      moveToSlide(Number(dot.dataset.testimonialDot || 0));
      resumeTestimonials(1200);
    });
  });

  window.addEventListener("resize", () => {
    measureTestimonials();
    renderTestimonials();
  });

  measureTestimonials();
  renderTestimonials();

  if (reduceMotion.matches) {
    pauseTestimonials();
  } else {
    window.requestAnimationFrame(animateTestimonials);
  }
}
