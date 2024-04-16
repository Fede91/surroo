"use client";

import { useParams } from "next/navigation";

export default function ListDetails() {
  const params = useParams<{ listId: string }>();

  console.log(params);
  return <div>{params.listId}</div>;
}
