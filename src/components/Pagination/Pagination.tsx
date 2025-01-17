import { useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationNavType, PaginationType } from "./Pagination.type";

function Button2({ content, onClick, active, disabled }: PaginationType) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-10 h-10 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-base font-normal transition-colors rounded-lg
      ${active ? "bg-secondary-dark text-white" : "text-secondary"}
      ${
        !disabled
          ? "bg-white hover:bg-secondary hover:text-white"
          : "text-secondary bg-white cursor-not-allowed"
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

function PaginationNav({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}: PaginationNavType) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
          disabled={false}
        />
      </li>
    ));
  }, [gotoPage, pageCount, pageIndex]);
  return (
    <ul className="flex gap-6">
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          active={null}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          active={null}
        />
      </li>
    </ul>
  );
}

function PaginationNavPresentation() {
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = 10;
  return (
    // <div className="flex gap-3 flex-wrap p-6 py-12">
    //   <PaginationNav
    //     gotoPage={setPageIndex}
    //     canPreviousPage={pageIndex > 0}
    //     canNextPage={pageIndex < pageCount - 1}
    //     pageCount={pageCount}
    //     pageIndex={pageIndex}
    //   />
    // </div>

    <nav className="mb-4 flex justify-center space-x-4" aria-label="Pagination">

    <span className="rounded-lg border border-teal-500 px-2 py-2 text-gray-700">
        <span className="sr-only">Previous</span>
        <svg className="mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd">
            </path>
        </svg>
    </span>

    <span className="rounded-lg border border-teal-500 bg-teal-500 px-4 py-2 text-white">1</span>
    
    <a className="rounded-lg border border-teal-500 px-4 py-2 text-gray-700" href="/page/2">2
    </a>

    <a className="rounded-lg border border-teal-500 px-4 py-2 text-gray-700" href="/page/3">3
    </a>
    
    <a className="rounded-lg border border-teal-500 px-2 py-2 text-gray-700" href="/page/2">
        <span className="sr-only">Next</span>
        <svg className="mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd">
            </path>
        </svg>
    </a>

</nav>
  );
}

export { PaginationNavPresentation };
