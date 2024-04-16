"use client";

export default function ListDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto h-full">{children}</main>;
}
