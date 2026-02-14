import type { Metadata } from "next";
import NotFound from "@/components/page/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Return to the homepage or browse projects and resources.",
  alternates: {
    canonical: "/not-found",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const page = () => {
  return (
    <NotFound />
  );
};

export default page;
