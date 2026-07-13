# Tutorings Testimonials Section Specification

This document defines the Testimonials section before implementation. It is documentation only. Do not build this section until the specification is approved.

## Section Role

The Testimonials section follows the Programs section.

Its role is to prove that Tutorings' structured learning paths create real outcomes for real students. After visitors understand the available programs, this section should reduce skepticism and make the next conversion step feel safer.

## Section Purpose

Build trust through verified learner outcomes from the existing content inventory.

The section should communicate:

- Students improve confidence and communication.
- IELTS students can reach meaningful exam outcomes.
- STEP students benefit from focused exam preparation.
- Tutorings' programs feel structured and practical.

## Section Label

Use:

> SUCCESS STORIES

## Headline

Use:

> Real students. Real results.

The headline should be centered and should follow the same heading scale used by the recent major sections.

## Background

Use a clean white background.

The transition from the blue Programs section should feel like moving from product choice into proof and reassurance.

## Verified Testimonials

Use only testimonials from the content inventory.

### Mohammad Al-Turki

Program:

> General English

Outcome theme:

> Speaking confidence and practical improvement.

Quote:

> I have now completed 3 months in the General English program with teacher Loay. In the first month, I did not know how to arrange words or speak quickly. I noticed the improvement when I started speaking English with my foreign clients. My next goal, God willing, is to take the IELTS test.

### Yaser Al Qahtani

Program:

> IELTS Preparation

Outcome theme:

> Scholarship preparation and IELTS score.

Result:

> IELTS 7/9

Quote:

> I joined the IELTS program because I wanted to take the exam for a scholarship. It was a one-month program. It was challenging, but it really paid off. I got 7 out of 9 in IELTS, which is above the minimum requirement for any position I apply for. I will definitely join the General English program too.

### Renad Al Ghamdi

Program:

> General English

Outcome theme:

> Level progress and speaking with colleagues.

Quote:

> I am a Business Administration student, and I learned a lot with Tutorings. I studied for 6 months and moved from level 1 to level 3. I also noticed a big improvement when speaking with my colleagues, which had always been my main issue.

### Faisal Al-Otaibi

Program:

> STEP Preparation

Result:

> STEP 92

Quote:

> I was lost with STEP and did not know where to start. The course organized everything for me. The questions were exactly like the test pattern. I entered the exam feeling confident and got 92.

### Noura Al-Qahtani

Program:

> STEP Preparation

Result:

> STEP 88

Quote:

> The explanation was very clear and smooth, especially grammar. It was the first time I understood it this way. What helped me most was the step-by-step method for solving questions.

### Abdulaziz Al-Shahrani

Program:

> STEP Preparation

Result:

> STEP 94

Quote:

> What I liked most is that they do not waste your time. Everything inside the course directly serves STEP, with no filler.

### Reem Al-Subaie

Program:

> STEP Preparation

Result:

> STEP 85

Quote:

> I was worried about reading, but after the course I knew how to read and find the answer quickly without stress.

## Recommended Content Per Card

Each testimonial card should include:

- Student name.
- Program name.
- Optional result badge if verified.
- Short quote.

Recommended card hierarchy:

1. Program/result label.
2. Quote.
3. Student name.

Do not invent avatars, photos, roles, universities, employers, or extra results.

## Layout

### Desktop

- White background.
- Centered label and headline.
- Carousel below the headline.
- Show 3 testimonial cards at a time.
- Cards should have equal height.
- Cards should be visually calm and premium.
- Use enough gap between cards so the carousel breathes.

### Mobile

- Show 1 to 1.2 cards at a time.
- Keep card width readable.
- Preserve horizontal carousel behavior.
- Keep controls easy to tap.

## Carousel Behavior

The carousel should move automatically in a smooth continuous loop.

Behavior requirements:

- Auto-moving loop by default.
- Pause on hover.
- Pause on focus within the carousel.
- Pause during user interaction such as dragging, touching, or using manual arrows.
- Resume after interaction ends, unless reduced motion is enabled.
- Include manual previous and next arrows.
- Include pagination indicators.

Motion style:

- Smooth and restrained.
- No bouncing.
- No elastic effects.
- No dramatic scaling.
- No parallax.

## Reduced Motion

Respect `prefers-reduced-motion`.

If reduced motion is enabled:

- Do not auto-scroll.
- Keep manual arrows and pagination available.
- Cards should remain readable and controllable.

## Visual Style

The section should feel:

- Minimal.
- Premium.
- Editorial.
- Trustworthy.
- Calm.

Use:

- White background.
- Dark navy text.
- Muted gray quote text.
- Tutorings blue accents for labels, result badges, arrows, and pagination.
- White cards with subtle border and soft shadow.

Avoid:

- Large decorative quote marks.
- Bright gradient cards.
- Heavy shadows.
- Avatar placeholders unless verified images are provided.
- Overly playful review widgets.
- Star ratings unless they are verified and sourced.

## Controls

Manual arrows:

- Place near the carousel, either beside the track or below it.
- Use simple arrow icons or text arrows.
- Buttons must be keyboard accessible.
- Provide clear accessible labels such as "Previous testimonial" and "Next testimonial".

Pagination:

- Use small dots or progress indicators.
- Indicate the active slide.
- Each indicator should be keyboard accessible if clickable.
- Do not rely on color alone; use size, opacity, or active state changes too.

## Accessibility Notes

- Use semantic section markup.
- Use a proper heading level.
- The carousel should be announced as a carousel or testimonial region.
- Cards should remain readable in DOM order.
- Auto-motion must pause on hover/focus/interactions.
- Manual controls must be keyboard accessible.
- Decorative elements should be hidden from screen readers.
- Do not communicate essential information only through motion.

## Transition To Final CTA

At the end of the Testimonials section, users should feel reassured that Tutorings has helped real students.

The next section should convert this trust into action:

> Start your own path.

Do not overload the Testimonials section with final conversion messaging. Keep it focused on proof.
