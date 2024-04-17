"use client";

export default function ListDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main style={{ minHeight: "100vh" }}>{children}</main>;
}
