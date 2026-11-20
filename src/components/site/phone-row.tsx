/** Four fanned iPhones (pre-rendered at 2x) showing the dietitian client sites. */
export function PhoneRow() {
  return (
    <picture className="mockup mockup--fan">
      <img
        src="/work/mockups/_fan/dietitians-1000.webp"
        srcSet="/work/mockups/_fan/dietitians-1000.webp 1000w, /work/mockups/_fan/dietitians-2000.webp 2000w"
        sizes="(min-width: 960px) 45vw, 100vw"
        alt="Four dietitian websites shown on iPhones: GH Performance Nutrition, The Family Wellbeing Dietitian, Ask Your Dietitian and London Dietitian"
        width={2000}
        height={1640}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
