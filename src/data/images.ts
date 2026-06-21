// Photos: Unsplash & Pexels (unsplash.com/license, pexels.com/license)
export const images = {
  logo: "/Logo.png",
  hero: {
    sourcing: "/images/heroes/home-sourcing.jpg",
    refining: "/images/heroes/home-refining.jpg",
    export: "/images/heroes/home-export.jpg",
  },
  pageHero: {
    about: "/images/heroes/about.jpg",
    operations: "/images/heroes/operations.jpg",
    sustainability: "/images/heroes/sustainability.jpg",
    services: "/images/gold-hero.avif",
  },
  about: {
    corporate: "/images/about/corporate.jpg",
    goldNuggets: "/images/about/gold-nuggets.jpg",
  },
  services: {
    buying: "/images/services/gold-buying.jpg",
    refining: "/images/services/refining.jpg",
    assay: "/images/services/assay.jpg",
    export: "/images/services/export.jpg",
  } as const,
  operations: {
    refinery: "/images/operations/refinery.jpg", // assay laboratory
    centres: "/images/operations/collection-centres.jpg", // raw gold sourcing
    supplyChain: "/images/operations/supply-chain.jpg", // 999.9 fine gold bars
  },
  esg: {
    sourcing: "/images/esg/responsible-sourcing.jpg",
    environment: "/images/esg/environment.jpg",
    community: "/images/esg/community.jpg",
  },
  aboutGold: {
    hero: "/images/services/refining.jpg",
    scarcity: "/images/about/gold-nuggets.jpg",
    stability: "/images/services/gold-buying.jpg",
    symbolism: "/images/heroes/home-refining.jpg",
    sustainability: "/images/esg/environment.jpg",
    versatility: "/images/services/assay.jpg",
  },
} as const;