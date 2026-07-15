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
const programCards = Array.from(document.querySelectorAll(".program-card"));
const programHeadlineWord = document.querySelector("[data-program-headline-word]");
const problemSection = document.querySelector(".problem-section");
const problemObjects = Array.from(document.querySelectorAll(".learning-object"));

if (problemSection && problemObjects.length > 0) {
  const edgePadding = 10;
  const pointerRadius = 96;
  const objects = [];
  let bounds = problemSection.getBoundingClientRect();
  let pointer = null;
  let lastTime = performance.now();
  let headlineBounds = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const updateHeadlineBounds = () => {
    const content = problemSection.querySelector(".problem-content");

    if (!content) {
      headlineBounds = null;
      return;
    }

    const rect = content.getBoundingClientRect();
    headlineBounds = {
      left: rect.left - bounds.left - 34,
      right: rect.right - bounds.left + 34,
      top: rect.top - bounds.top - 28,
      bottom: rect.bottom - bounds.top + 28,
      centerX: rect.left - bounds.left + rect.width / 2,
      centerY: rect.top - bounds.top + rect.height / 2,
    };
  };

  const getRotation = (element) => {
    const rawRotation = getComputedStyle(element).getPropertyValue("--rotate").trim();
    const parsedRotation = Number.parseFloat(rawRotation);
    return Number.isFinite(parsedRotation) ? parsedRotation : 0;
  };

  const measureProblemObjects = () => {
    bounds = problemSection.getBoundingClientRect();
    updateHeadlineBounds();

    if (objects.length > 0) {
      objects.forEach((object) => {
        const rect = object.element.getBoundingClientRect();
        object.width = rect.width;
        object.height = rect.height;
        object.x = clamp(object.x, edgePadding, Math.max(edgePadding, bounds.width - object.width - edgePadding));
        object.y = clamp(object.y, edgePadding, Math.max(edgePadding, bounds.height - object.height - edgePadding));
      });
      return;
    }

    objects.length = 0;

    problemObjects.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const maxX = Math.max(edgePadding, bounds.width - rect.width - edgePadding);
      const maxY = Math.max(edgePadding, bounds.height - rect.height - edgePadding);
      const x = clamp(rect.left - bounds.left, edgePadding, maxX);
      const y = clamp(rect.top - bounds.top, edgePadding, maxY);
      const direction = index % 2 === 0 ? 1 : -1;

      element.style.left = "0";
      element.style.top = "0";
      element.style.right = "auto";
      element.style.bottom = "auto";
      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${getRotation(element)}deg)`;

      objects.push({
        element,
        x,
        y,
        vx: 0,
        vy: 0,
        width: rect.width,
        height: rect.height,
        rotation: getRotation(element),
        baseRotation: getRotation(element),
        vr: 0,
      });
    });
  };

  const pushObjectFromPointer = (object, event, strength = 0.72) => {
    bounds = problemSection.getBoundingClientRect();

    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;
    const dx = centerX - pointerX;
    const dy = centerY - pointerY;
    const distance = Math.max(1, Math.hypot(dx, dy));

    object.vx += (dx / distance) * strength;
    object.vy += (dy / distance) * strength;
    object.vr += (dx / distance) * strength * 0.012;
  };

  const setPointer = (event) => {
    bounds = problemSection.getBoundingClientRect();
    pointer = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  const clearPointer = () => {
    pointer = null;
  };

  const animateProblemObjects = (time) => {
    const delta = Math.min(32, time - lastTime);
    lastTime = time;
    bounds = problemSection.getBoundingClientRect();
    updateHeadlineBounds();

    objects.forEach((object) => {
      const centerX = object.x + object.width / 2;
      const centerY = object.y + object.height / 2;

      if (pointer) {
        const dx = centerX - pointer.x;
        const dy = centerY - pointer.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const reach = pointerRadius + Math.max(object.width, object.height) * 0.45;

        if (distance < reach) {
          const force = (1 - distance / reach) * 0.12;
          object.vx += (dx / distance) * force;
          object.vy += (dy / distance) * force;
          object.vr += (dx / distance) * force * 0.006;
        }
      }

      if (
        headlineBounds &&
        centerX > headlineBounds.left &&
        centerX < headlineBounds.right &&
        centerY > headlineBounds.top &&
        centerY < headlineBounds.bottom
      ) {
        const dx = centerX - headlineBounds.centerX;
        const dy = centerY - headlineBounds.centerY;
        const distance = Math.max(1, Math.hypot(dx, dy));
        object.vx += (dx / distance) * 0.035;
        object.vy += (dy / distance) * 0.035;
      }

      object.x += object.vx * delta;
      object.y += object.vy * delta;
      object.rotation += object.vr * delta;

      const maxX = Math.max(edgePadding, bounds.width - object.width - edgePadding);
      const maxY = Math.max(edgePadding, bounds.height - object.height - edgePadding);

      if (object.x <= edgePadding || object.x >= maxX) {
        object.x = clamp(object.x, edgePadding, maxX);
        object.vx *= -0.86;
      }

      if (object.y <= edgePadding || object.y >= maxY) {
        object.y = clamp(object.y, edgePadding, maxY);
        object.vy *= -0.86;
      }

      object.vx = clamp(object.vx * 0.88, -0.85, 0.85);
      object.vy = clamp(object.vy * 0.88, -0.85, 0.85);
      object.vr = clamp(object.vr * 0.86, -0.025, 0.025);
      object.rotation += (object.baseRotation - object.rotation) * 0.025;

      object.element.style.transform = `translate3d(${object.x}px, ${object.y}px, 0) rotate(${object.rotation}deg)`;
      object.element.style.left = "0";
      object.element.style.top = "0";
    });

    window.requestAnimationFrame(animateProblemObjects);
  };

  measureProblemObjects();
  objects.forEach((object) => {
    object.element.addEventListener("pointerenter", (event) => {
      pushObjectFromPointer(object, event);
    });

    object.element.addEventListener("pointermove", (event) => {
      pushObjectFromPointer(object, event, 0.18);
    });
  });
  window.requestAnimationFrame(animateProblemObjects);
  problemSection.addEventListener("pointermove", setPointer);
  problemSection.addEventListener("pointerleave", clearPointer);
  window.addEventListener("resize", measureProblemObjects);
}

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

if (programCards.length > 0 && programHeadlineWord) {
  const setProgramHeadline = (card) => {
    programHeadlineWord.textContent = card.dataset.programHeadline || "English";
  };

  const resetProgramHeadline = () => {
    programHeadlineWord.textContent = "English";
  };

  programCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setProgramHeadline(card));
    card.addEventListener("focusin", () => setProgramHeadline(card));
    card.addEventListener("mouseleave", resetProgramHeadline);
    card.addEventListener("focusout", resetProgramHeadline);
  });
}

const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
const testimonialCta = document.querySelector("[data-testimonial-cta]");
const solutionCards = Array.from(document.querySelectorAll(".solution-card"));

if (solutionCards.length > 0) {
  const setActiveSolutionCard = (activeCard) => {
    solutionCards.forEach((card) => {
      card.classList.toggle("is-selected", card === activeCard);
    });
  };

  const resetSolutionCards = () => {
    solutionCards.forEach((card) => {
      card.classList.remove("is-selected");
    });
  };

  solutionCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("mouseenter", () => setActiveSolutionCard(card));
    card.addEventListener("focus", () => setActiveSolutionCard(card));
    card.addEventListener("mouseleave", resetSolutionCards);
    card.addEventListener("blur", resetSolutionCards);
  });
}

if (testimonialCards.length > 0 && testimonialCta) {
  const setActiveTestimonial = (activeCard) => {
    testimonialCards.forEach((card) => {
      card.classList.toggle("is-selected", card === activeCard);
    });

    const program = activeCard.dataset.testimonialProgram || "learning";
    const target = activeCard.dataset.testimonialTarget || "#programs";

    testimonialCta.textContent = `Start your ${program} path`;
    testimonialCta.setAttribute("href", target);
  };

  testimonialCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("mouseenter", () => setActiveTestimonial(card));
    card.addEventListener("focus", () => setActiveTestimonial(card));
  });
}
