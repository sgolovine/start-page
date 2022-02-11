import { useState, useEffect } from "react"
import siSlugs from "../../si-slugs.json"

interface IconMapItem {
  label: string
  slug: string
}

const iconMap: IconMapItem[] = siSlugs.iconMap

export const useIconSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<IconMapItem[]>([])

  useEffect(() => {
    if (searchValue) {
      const results = iconMap.filter(item => {
        const upperCase = new RegExp(searchValue.toUpperCase())
        const lowerCase = new RegExp(searchValue.toLowerCase())
        const regularCase = new RegExp(searchValue, "g")

        return (
          regularCase.test(item.label) ||
          regularCase.test(item.slug) ||
          lowerCase.test(item.label) ||
          lowerCase.test(item.slug) ||
          upperCase.test(item.label) ||
          upperCase.test(item.slug)
        )
      })
      setSearchResults(results)
    }
  }, [searchValue])

  return [searchValue, setSearchValue, searchResults]
}
