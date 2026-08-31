# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Workit serves two primary audiences with equal emphasis:

- Workers looking for clear, flexible opportunities that fit their availability and skills.
- Businesses that need a fast, understandable way to publish openings and reach reliable people.

The current product content and currency indicate an Albania launch-market hypothesis. This is not yet a confirmed public positioning claim.

## Product Purpose

Workit connects workers and businesses around permanent roles, focused projects, and short-term shifts. It helps workers discover and evaluate opportunities, and helps businesses create clearly specified openings. Success means both sides can move from interest to a well-informed next step with little friction.

## Positioning

Workit makes flexible work easier to trust by putting the practical facts—pay, schedule, location, role, and required capacity—up front before commitment. Public visitors can understand the product and preview a small number of opportunities; account access unlocks current job discovery, full details, applications, profiles, and business publishing tools.

## Operating Context

Workers browse open jobs near their saved city or area, filter them by job and shift type or date, inspect details, manage applications, and maintain a worker profile. Businesses create job openings with role, description, location, compensation, employment duration, shift pattern, dates, hours, and crew size. Authentication distinguishes worker, business, and administrative roles.

## Capabilities and Constraints

- Public home page with product explanation and illustrative job previews.
- Worker and business registration plus sign-in.
- Protected job listing and job-detail flows.
- Worker applications and profile surfaces.
- Worker registration captures a city or area. Authenticated job discovery matches that saved location against each opening's work location, and workers can change it from Profile to refresh both list and calendar results.
- Business job-opening creation for permanent, project, and short-term work.
- Jobs support hourly, daily, fixed, and monthly pay; morning, evening, and custom-hour shifts.
- Frontend behavior must follow the current Workit API contract. Client-side role checks improve UX but do not replace backend authorization.
- Job detail access and application actions require authentication.
- Launch-market scope remains an open product decision; repository content currently uses Albanian locations and ALL pricing.

## Brand Commitments

- Product name: Workit.
- Core promise: flexible work with clear pay, schedule, and location before applying.
- Workers and businesses receive equal product emphasis.
- Use the supplied Workit logo at `src/assets/logo.png`; its blue and warm orange/yellow forms are binding brand assets.
- The interface should be modern, sleek, welcoming, easy to understand, and easy to use.

## Evidence on Hand

- Brand logo: `src/assets/logo.png`.
- Current product workflows, API types, validation schemas, and UI copy in `src/`.
- No approved testimonials, customer logos, usage metrics, employer counts, or outcome benchmarks are available; future work must not fabricate them.

## Product Principles

1. Show practical job facts before asking either side to commit.
2. Give workers and businesses equally clear paths through the product.
3. Keep public discovery inviting while protecting account-only workflows.
4. Make complex job details feel quick to scan and straightforward to act on.
5. Prefer honest product proof and real interface behavior over invented claims.
6. Keep location matching transparent and worker-controlled: show the saved city or area, explain how it affects results, and refresh discovery after it changes.
