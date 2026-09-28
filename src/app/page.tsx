import { LandingNavbar }  from "@/components/landing/navbar";
import { HeroSection }    from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { StatsSection }   from "@/components/landing/stats-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTABanner }      from "@/components/landing/cta-banner";
import { Footer }         from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div style={{ background: "#F5F0E8" }}>
      <LandingNavbar />
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <PricingSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
