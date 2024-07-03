export type PaginationType = {
    content: number | string | JSX.Element,
    onClick: () => void,
    disabled: boolean,
    active: boolean | null,
}

export type PaginationNavType = {
    gotoPage: (pageIndex: number) => void,
    canPreviousPage: boolean,
    canNextPage: boolean,
    pageCount: number,
    pageIndex: number,
}

