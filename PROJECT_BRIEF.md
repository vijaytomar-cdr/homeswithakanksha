# Akanksha Tomar Realtor Website

## Objective

Build a premium, high-conversion, mobile-first real estate marketing website for:

Akanksha Tomar
REALTOR®
eXp Realty | Kumler Group

Primary market:
Greater Phoenix, Arizona.

The website is intended to:

- establish trust
- generate buyer leads
- generate seller leads
- support relocation clients
- attract first-time home buyers
- build local SEO authority
- support Google Ads
- support Meta/Facebook/Instagram Ads
- integrate with Google Business Profile
- eventually integrate MLS/IDX listings
- publish local community content
- publish short-form real estate content
- capture leads into a CRM

## Target Markets

Create community coverage for:

- Phoenix
- Peoria
- Surprise
- Glendale
- Sun City
- Sun City West
- El Mirage
- Goodyear
- Buckeye
- Avondale
- Scottsdale

## Target Clients

Primary:

- First-time home buyers
- Families relocating to Arizona
- Buyers upgrading homes
- Downsizers
- Investors

Secondary:

- Home sellers
- Retirees
- Snowbirds
- New construction buyers

## Brand Personality

Akanksha should feel:

- professional
- friendly
- knowledgeable
- trustworthy
- patient
- responsive
- honest
- never pushy
- relationship-focused

## Visual Direction

Premium real estate aesthetic inspired by high-end brokerage websites, but do not copy any existing website.

Use:

- white
- dark navy
- warm gold accents
- light warm gray
- large editorial typography
- generous whitespace
- premium local photography
- subtle animations
- modern cards
- clean iconography

The design should feel:

luxury + approachable

not:

corporate
generic
template-like
overly flashy

## Technology

Use:

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- reusable React components

Prepare architecture for:

- Sanity CMS
- IDX/MLS integration
- HubSpot or CRM integration
- Google Analytics 4
- Google Tag Manager
- Meta Pixel
- Google Ads conversion tracking
- Schema.org structured data

Do not integrate external paid services yet.

Build interfaces/adapters so they can be added later.

## Core Navigation

Desktop navigation:

- Home
- About
- Buy
- Sell
- Communities
- Search Homes
- Resources
- Blog
- Contact

Primary CTA:

Home Valuation

Mobile persistent actions:

- Call
- Text
- Search Homes
- Home Value

## Homepage

### Hero

Headline:

Helping You Find the Right Home in Arizona

Subheadline:

Whether you're buying your first home, upgrading, investing, or relocating, I'm here to guide you every step of the way.

Primary CTAs:

Search Homes
Home Valuation
Schedule a Consultation

Hero should prominently feature Akanksha.

Use a placeholder image until the real professional headshot is provided.

### Trust Strip

Do NOT invent statistics such as homes sold or review counts.

Use credibility statements instead:

Greater Phoenix Expertise
Buyer + Seller Representation
Responsive Communication
Relationship-First Service

### Services

Cards:

Buy a Home
Sell Your Home
Explore Communities
Home Valuation

### Meet Akanksha

Include:

Akanksha Tomar is a REALTOR® with eXp Realty | Kumler Group serving buyers and sellers throughout Greater Phoenix.

Her approach should be described as personal, patient, responsive and focused on helping clients make confident decisions without pressure.

Client categories:

First-time buyers
Relocation
Investors
Retirees
Snowbirds
New construction
Sellers

### Communities

Show rich visual cards for:

Peoria
Surprise
Glendale
Sun City
Sun City West
Scottsdale
Goodyear
Buckeye
Avondale

Each card should lead to its own route.

### Search Homes

Build a polished IDX placeholder search interface.

Fields:

City / neighborhood / ZIP
Minimum price
Maximum price
Beds
Baths

Buttons:

Search Homes
Map Search
New Construction

Do not claim listings are live yet.

Clearly label example listing data as demo content.

### Market Intelligence

Create section:

What's Happening Around Greater Phoenix?

Show demo market cards for:

Peoria
Surprise
Scottsdale

Each card can include placeholders for:

Median sale price
Inventory trend
Days on market
New listings

All market numbers must be labeled as demo data until connected to a real data source.

### Reviews

Create a Google Review style section.

Use sample reviews clearly marked as placeholders.

Architecture should support a future Google Reviews integration.

### Video / Social Section

Create:

Latest From Akanksha

Cards should support:

Instagram Reels
YouTube Shorts
Facebook videos
TikTok

Use placeholder thumbnails.

### Ask Akanksha

Create a floating CTA:

Ask Akanksha About Arizona Real Estate

Example prompts:

What areas near Peoria have new construction?

What can I buy around $550K?

I'm relocating to Arizona. Where should I start?

Initially this should open a lead/contact panel.

Do not build AI functionality yet.

## Buyer Page

Create:

/buy

Sections:

Buyer consultation
Financing preparation
Home search
New construction
Offer strategy
Inspection
Appraisal
Closing

Include categories:

First-time buyers
VA buyers
FHA buyers
Conventional buyers
Investors
Relocation clients

Strong CTA:

Start Your Home Search

## Seller Page

Create:

/sell

Sections:

Pricing strategy
Property preparation
Professional photography
Marketing plan
MLS exposure
Social media marketing
Open houses
Negotiation
Closing

CTA:

Get My Home Value

## Home Valuation

Route:

/home-value

Lead form fields:

Name
Phone
Email
Property address
Selling timeline

Include privacy disclosure.

Build form validation.

For now log submitted data locally or mock an API response.

## Communities

Route:

/communities

Each community needs a reusable page template.

Routes:

/communities/peoria
/communities/surprise
/communities/glendale
/communities/sun-city
/communities/sun-city-west
/communities/scottsdale
/communities/goodyear
/communities/buckeye
/communities/avondale

Each community page should contain:

Hero image
Introduction
Lifestyle
Housing overview
Neighborhood highlights
Parks and recreation
Shopping
Restaurants
New construction
Commute/location overview
Market snapshot placeholder
Homes search CTA
Relocation CTA
FAQ
Contact Akanksha

Avoid subjective or legally sensitive claims about demographics, crime, or what types of people should live in a neighborhood.

Do not rank schools.

External school information should eventually come from authoritative sources.

## Blog / SEO

Route:

/blog

Initial content placeholders:

Best Neighborhoods in Surprise AZ
Buying Your First Home in Arizona
Arizona Closing Costs Explained
Moving to Phoenix
Sun City Retirement Living
Things to Know Before Buying New Construction
Peoria vs Surprise
Goodyear vs Buckeye
What $500K Buys You in Peoria

Architecture should support:

category
author
publish date
featured image
SEO title
SEO description
canonical URL
Open Graph metadata
Article schema

## Content Growth Strategy

The site should visually support content series such as:

What $500K Buys You
Peoria vs Surprise
Moving to Arizona
New Construction Watch
Arizona Market Minute
Neighborhood Spotlight
Ask Akanksha
Client Success Stories
Weekend in Greater Phoenix

Create reusable content-card components.

## Contact

Route:

/contact

Fields:

Name
Phone
Email
I am interested in:
Buying
Selling
Relocation
Investment
New Construction

Message

Include:

Call
Text
Email
Instagram
Facebook
Google Business Profile

Use placeholder URLs until real ones are supplied.

## SEO

Implement:

Next.js metadata API
canonical structure
robots.ts
sitemap.ts
semantic HTML
OpenGraph defaults
Twitter metadata
Breadcrumb schema
RealEstateAgent schema placeholder
LocalBusiness schema placeholder
Article schema support
FAQ schema support

Do not keyword-stuff.

Community pages should have genuinely useful content.

## Accessibility

Use:

semantic landmarks
keyboard navigation
visible focus states
accessible labels
sufficient color contrast
alt text support
reduced motion support

## Performance

Optimize for Core Web Vitals.

Use:

next/image
responsive images
font optimization
lazy loading
minimal client JS
server components by default

## Compliance

Always visibly associate:

Akanksha Tomar
REALTOR®
eXp Realty
Kumler Group

Create footer placeholders for:

Fair Housing
Brokerage disclosures
Privacy Policy
Terms
Accessibility
IDX disclaimer

Do not invent:

sales volume
homes sold
awards
rankings
review counts
years of experience
production levels

unless provided later.

## Project Structure

Favor reusable components.

Suggested structure:

src/
  app/
  components/
  data/
  lib/
  types/

Create reusable components for:

Header
Footer
Hero
CTAButton
SectionHeading
TrustStrip
ServiceCard
CommunityCard
ListingCard
MarketCard
ReviewCard
VideoCard
LeadForm
HomeSearchBar
MobileActionBar
Breadcrumbs
FAQ
ContactPanel

## Development Philosophy

Build production-quality code.

Avoid giant page components.

Avoid duplicated markup.

Keep data separate from presentation.

Use TypeScript types.

Keep content configurable.

Use server components unless client state is required.

Use realistic placeholders where real content is missing.

Do not invent claims.

## First Deliverable

Build the initial production-quality version of:

Home page
Header
Footer
Mobile navigation
Communities section
Search homes placeholder
Market intelligence section
Reviews placeholder
Latest content
Ask Akanksha
responsive mobile experience

Then run lint/build and resolve all errors.