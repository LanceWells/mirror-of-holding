"use client"

import { setBuilderBaseItemSearch } from "@/lib/store/treasure-haul";
import { useDebounce } from "@uidotdev/usehooks";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function BuilderSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const deboucedSearchTerm = useDebounce(searchTerm, 300);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBuilderBaseItemSearch(deboucedSearchTerm));
  }, [deboucedSearchTerm, dispatch])

  return (
    <TextInput
      onChange={(e) => setSearchTerm(e.target.value)}
      value={searchTerm}
      placeholder="Search for an existing item" />
  )
}