"use client"

import { TreasureHaulStorage, setBuilderBaseItemSearch } from "@/lib/store/treasure-haul";
import { BaseItemType, ItemTag } from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function BuilderSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const deboucedSearchTerm = useDebounce(searchTerm, 300);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchVals = deboucedSearchTerm.split(' ');
    const terms: TreasureHaulStorage['baseItemSearch'] = searchVals.map((val) => {
      const tagTerm = /tag:(\w+)/.exec(val);
      if (tagTerm && tagTerm[1] in ItemTag) {
        return {
          type: 'tag',
          tag: tagTerm[1] as ItemTag
        }
      }

      const typeTerm = /type:(\w+)/.exec(val);
      if (typeTerm && typeTerm[1] in BaseItemType) {
        return {
          type: 'itemType',
          itemType: typeTerm[1] as BaseItemType,
        };
      }

      return {
        type: 'name',
        name: val,
      };
    });

    dispatch(setBuilderBaseItemSearch(terms));
  }, [deboucedSearchTerm, dispatch])

  return (
    <TextInput
      onChange={(e) => setSearchTerm(e.target.value)}
      value={searchTerm}
      placeholder="Search for an existing item" />
  )
}