import { useState, useEffect } from "react"
import siSlugs from "../../si-slugs.json"

const iconMap = siSlugs.iconMap

export const useIconSearch = () => {
  const [searchValue, setSearchValue] = useState<boolean>(false)
}
