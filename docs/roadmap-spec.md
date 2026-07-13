# Tutorings Roadmap Section Specification

This document defines the roadmap section before implementation. It is documentation only. Do not build this section until the specification is approved.

## Section Role

The roadmap section immediately follows the "Tutorings fixes that." solution section.

Its role is to explain how Tutorings guides students through a structured learning journey. The previous sections show the pain of scattered learning and then introduce Tutorings as the organizing solution. This section answers the next natural question:

> How does Tutorings actually work?

## Section Purpose

Help visitors understand that learning with Tutorings is simple, structured, and personalized.

The section should not overwhelm users with features. It should present a clear sequence of steps that every student follows.

## Emotional Goal

The user should feel relief and clarity.

Desired reaction:

> Finally, someone has a clear process.

The section should feel calm, approachable, and confidence-building. It should make the learner feel guided rather than sold to.

## Narrative Position

The roadmap is the bridge between the emotional solution and the practical offer.

Flow:

1. Problem: learning feels scattered.
2. Solution: Tutorings brings everything together.
3. Roadmap: here is the clear process students follow.
4. Programs: choose the path that matches your goal.

## Section Label

Suggested label:

> HOW IT WORKS

Alternative directions:

- YOUR LEARNING PATH
- THE TUTORINGS METHOD
- FROM LEVEL TO PROGRESS

Current working label:

> HOW IT WORKS

## Headline Direction

The headline should communicate clarity and structure.

Working headline directions:

- A clear path from level check to real progress.
- Your English journey, organized step by step.
- From first assessment to measurable progress.

Current working headline:

> A clear path from level check to real progress.

## Supporting Copy

The supporting paragraph should briefly explain that Tutorings helps students understand their level, choose the right path, learn with a tutor, and track progress.

Working copy:

> Tutorings guides every student through a simple journey: understand your level, choose the right program, meet your tutor, and keep improving with clear feedback.

Keep the copy concise. The roadmap cards should do the explanation.

## Roadmap Milestones

The roadmap should contain four main milestones, with an optional fifth milestone if the section needs a stronger outcome ending.

### 1. Placement Test

Step number:

> 01

Title:

> Placement Test

Description:

> Start by understanding your current English level and what you need to improve next.

Icon suggestion:

- Clipboard check.
- Gauge.
- Target.

Source rationale:

The existing Tutorings content highlights a free placement test before registration, CEFR assessment, and level-based program choice.

### 2. Choose Program

Step number:

> 02

Title:

> Choose Program

Description:

> Pick the path that fits your goal: General English, IELTS preparation, or private tutoring.

Icon suggestion:

- Route.
- Layers.
- Book open.

Source rationale:

Tutorings offers English courses, IELTS preparation, and private tutors as the primary landing-page offers.

### 3. Meet Your Tutor

Step number:

> 03

Title:

> Meet Your Tutor

Description:

> Learn with a private bilingual tutor who understands your goals and follows your progress.

Icon suggestion:

- User check.
- Video.
- Message circle.

Source rationale:

Tutorings emphasizes private one-to-one sessions, bilingual Arabic/English teachers, fixed teacher continuity, and live lessons.

### 4. Track Progress

Step number:

> 04

Title:

> Track Progress

Description:

> Stay on track with homework, correction, progress reports, certificates, and clear next steps.

Icon suggestion:

- Chart line.
- File check.
- Badge check.

Source rationale:

Tutorings content mentions homework, correction, support, progress reports every 3 lessons, final reports, certificates, and advancement tests.

### Optional 5. Achieve Your Goal

Step number:

> 05

Title:

> Achieve Your Goal

Description:

> Build the confidence to use English for university, work, IELTS, and everyday communication.

Icon suggestion:

- Trophy.
- Graduation cap.
- Flag.

Usage note:

This milestone is optional. Use it only if the section needs an outcome-focused ending before the Programs section. If the page feels too long, keep the roadmap to four steps and let the Programs section carry the next decision.

## Recommended Layout

### Desktop

Use a vertical roadmap positioned in the center of the section.

Layout details:

- White background.
- Centered section label, headline, and supporting paragraph at the top.
- Thin vertical line running down the center.
- Blue circular milestone markers on the center line.
- Cards alternate left and right.
- Generous spacing between cards.
- Cards should not feel cramped or overly decorative.
- The section should have enough whitespace to feel premium and guided.

The roadmap should feel custom and editorial, not like a generic corporate timeline.

### Mobile

Use a single-column roadmap.

Layout details:

- Roadmap line moves to the left.
- Blue circular milestones sit on the left line.
- Cards align to the right.
- Maintain clear spacing between each step.
- Avoid alternating cards on mobile.
- Keep descriptions short enough to scan.

## Visual Style

The roadmap should feel:

- Premium.
- Minimal.
- Calm.
- Approachable.
- Structured.

Use:

- White background.
- Tutorings blue accents.
- Dark navy typography.
- Soft shadows.
- Subtle borders.
- Rounded cards.
- Generous spacing.

Avoid:

- Corporate timeline clichés.
- Heavy connector graphics.
- Overly large icons.
- Dense feature lists.
- Busy background decoration.
- Scattered visuals from the Problem section.

## Card Content Model

Each milestone card should include:

- Step number.
- Title.
- One short user-focused description.
- Optional icon.

Recommended hierarchy inside each card:

1. Small step number or badge.
2. Title.
3. One-line or two-line description.
4. Small icon, if it improves scanning.

The step number and title should carry the card. The description should explain the value without adding feature clutter.

## Interaction Direction

Do not implement yet. This defines intended behavior only.

On scroll:

- The vertical line can grow downward as the user moves through the section.
- Milestone circles can activate one by one.
- Cards can fade in with a small upward movement.
- The current step can become highlighted through a stronger blue marker, slightly brighter card border, or subtle shadow.

Motion constraints:

- Keep movement subtle.
- No large animations.
- No floating objects.
- No particles.
- No complex animation library required.
- Respect `prefers-reduced-motion`.

## Accessibility Notes

- Use semantic section markup.
- Use a proper heading after the Solution section heading.
- Roadmap steps should be readable in document order.
- Do not rely on animation to communicate step order.
- Decorative line and icons should be hidden from screen readers if they do not add meaning.
- Ensure text contrast remains strong.

## Transition From Solution

The transition from the Solution section should feel immediate and logical.

The Solution section says:

> Tutorings fixes that.

The Roadmap section answers:

> Here is how.

The design should maintain the white, calm, organized feeling introduced in the Solution section while becoming slightly more instructional.

## Transition To Programs

At the end of the roadmap, users should understand the process and be ready to choose the program that fits their goal.

The next section should answer:

> Which path should I choose?

The roadmap should not try to sell every program in detail. It should prepare the user for the Programs section.
