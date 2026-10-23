import { useMemo, useState } from "react";
import { ITEMS_PER_PAGE } from "../constants/pagination";

function usePagination(items, itemsPerPage = ITEMS_PER_PAGE) {
  const [pagination, setPagination] = useState({ items, currentPage: 1 });

  if (pagination.items !== items) {
    setPagination({ items, currentPage: 1 });
  }

  const { currentPage } = pagination;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, items, itemsPerPage]);

  const goToPage = (page) => {
    setPagination({
      items,
      currentPage: Math.min(Math.max(page, 1), pageCount || 1),
    });
  };

  return { currentItems, currentPage, pageCount, goToPage };
}

export { usePagination };
