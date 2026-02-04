import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/portal/", "/api/"],
      },
    ],
    sitemap: "https://hlpfl.org/sitemap.xml",
    host: "https://hlpfl.org",
  };
}
