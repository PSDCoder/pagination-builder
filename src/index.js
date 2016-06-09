const DEFAULT_OPTIONS = {
    prevNextLinks: true,
    dots: '...',
    prevText: 'Prev',
    nextText: 'Next',
    afterFirst: 2,
    beforeLast: 2,
    beforeCurrent: 2,
    afterCurrent: 2
};

function isNumber(value) {
    return typeof value === 'number';
}

function createElement(text, page = null, isActive = false, isDisabled = false) {
    return { text, page, isActive, isDisabled };
}

export default function paginationBuilder(currentPage, totalPages, options = {}) {
    if (!isNumber(currentPage)) {
        throw new Error('"currentPage" param must be Number');
    }

    if (!isNumber(totalPages)) {
        throw new Error('"totalPages" param must be Number');
    }

    const result = [];
    const opts = Object.assign({}, DEFAULT_OPTIONS, options);
    let i;
    let ii;

    if (totalPages > 0) {
        // Calculate dots
        const currentRangeStart = currentPage - opts.beforeCurrent;
        const currentRangeEnd = currentPage + opts.afterCurrent;
        const leftDots = currentRangeStart - opts.afterFirst > 2 && opts.dots ? 1 : 0;
        const rightDots = currentRangeEnd + opts.beforeLast < totalPages && opts.dots ? 1 : 0;

        // Previous page item
        if (opts.prevNextLinks && currentPage > 1) {
            result.push(createElement(opts.prevText, currentPage - 1));
        }

        // First page
        result.push(createElement('1', 1, currentPage === 1));

        // Items after first page
        if (currentRangeStart - leftDots > 1) {
            for (i = 2, ii = i + opts.afterFirst; i < ii; i++) {
                if (i >= currentRangeStart + leftDots) {
                    break;
                }

                result.push(createElement(i.toString(), i));
            }
        }

        // Left dots
        if (leftDots) {
            result.push(createElement(opts.dots, null, false, true));
        }

        // Items between dots
        for (i = currentRangeStart; i <= currentRangeEnd; i++) {
            if (i > 1 + leftDots && i < totalPages - rightDots) {
                result.push(createElement(i.toString(), i, i === currentPage));
            }
        }

        // Right dots
        if (rightDots) {
            result.push(createElement(opts.dots, null, false, true));
        }

        // Items before last page
        if (currentRangeEnd + rightDots < totalPages) {
            for (i = totalPages - opts.beforeLast, ii = i + opts.beforeLast; i < ii; i++) {
                if (i <= currentRangeEnd + rightDots) {
                    break;
                }

                result.push(createElement(i.toString(), i));
            }
        }

        // Last page
        if (totalPages > 1) {
            result.push(createElement(totalPages.toString(), totalPages, currentPage === totalPages));
        }

        // Next page item
        if (opts.prevNextLinks && currentPage < totalPages) {
            result.push(createElement(opts.nextText, currentPage + 1));
        }
    }

    return result;
}
