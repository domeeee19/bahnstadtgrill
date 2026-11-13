import type { Metadata } from "next";
import { business, siteUrl } from "@/content/business";
import type { FaqItem } from "@/content/faq";
import type { MenuGroup } from "@/content/menu";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Titel ohne angehängten Markennamen ausgeben. */
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: PageMeta): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: business.name,
      locale: "de_DE",
      type: "website",
    },
  };
}

const DAY_SCHEMA = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const restaurantId = `${siteUrl}/#restaurant`;

export function restaurantSchema() {
  const rating = business.googleRating;
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub"],
    "@id": restaurantId,
    name: business.name,
    alternateName: [business.shortName, "Bahnstadt Grill", business.formerName],
    description:
      "Griechischer Grill, Kneipe und Biergarten am Bahnhof Opladen: Gyros, Pizza, Schnitzel und frisch gezapftes Bier.",
    url: siteUrl,
    telephone: business.phone.e164,
    email: business.email.address,
    image: `${siteUrl}/opengraph-image.png`,
    priceRange: "€",
    servesCuisine: business.cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    areaServed: business.serviceArea.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: business.hours
      .filter((entry) => entry.open && entry.close)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${DAY_SCHEMA[entry.day]}`,
        opens: entry.open,
        closes: entry.close,
      })),
    hasMenu: `${siteUrl}/speisekarte`,
    hasMap: business.links.mapsPlace,
    sameAs: [business.links.facebook, business.links.googleProfile],
    ...(rating.value && rating.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.count,
          },
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: business.name,
    inLanguage: "de-DE",
    publisher: { "@id": restaurantId },
  };
}

export function menuSchema(groups: MenuGroup[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/speisekarte#menu`,
    name: `Speisekarte ${business.name}`,
    url: `${siteUrl}/speisekarte`,
    inLanguage: "de-DE",
    hasMenuSection: groups.flatMap((group) =>
      group.categories.map((category) => ({
        "@type": "MenuSection",
        name: category.title,
        ...(category.intro ? { description: category.intro } : {}),
        hasMenuItem: category.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          ...(item.vegetarian
            ? { suitableForDiet: "https://schema.org/VegetarianDiet" }
            : {}),
          ...(item.price
            ? {
                offers: {
                  "@type": "Offer",
                  price: item.price.replace(",", "."),
                  priceCurrency: "EUR",
                },
              }
            : {}),
        })),
      })),
    ),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", path: "/" }, ...trail].map(
      (entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
        item: `${siteUrl}${entry.path === "/" ? "" : entry.path}`,
      }),
    ),
  };
}
