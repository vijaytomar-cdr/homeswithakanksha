import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow eyebrow-light">404 · Page not found</p>
        <h1>Let&apos;s get you back to familiar ground.</h1>
        <p>The page may have moved, but your Greater Phoenix real-estate search can continue here.</p>
        <div className="not-found-actions">
          <Link className="button button-gold" href="/">Return home</Link>
          <Link className="text-link-light" href="/communities">Explore communities</Link>
        </div>
      </div>
    </section>
  );
}
