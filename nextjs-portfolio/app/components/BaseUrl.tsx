"use client";

import Link from "next/link";

export default function BaseUrl({ path, className, children }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const finalUrl = `${baseUrl}${path}`;

  return (
    <Link href={finalUrl} className={className}>
      {children}
    </Link>
  );
}
