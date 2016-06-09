import { expect } from 'chai';
import paginationBuilder from '../src';

describe('paginationBuilder', () => {
    it('Should throw on non number "currentPage" param', () => {
        expect(() => paginationBuilder('1')).to.throw(/currentPage/);
    });

    it('Should throw on non number "totalPages" param', () => {
        expect(() => paginationBuilder(1, '20')).to.throw(/totalPages/);
    });

    it('Should add next && prev links by default', () => {
        const result = paginationBuilder(3, 10);
        expect(result[0]).to.have.property('text', 'Prev');
        expect(result[result.length - 1]).to.have.property('text', 'Next');
    });

    it('Should add dots', () => {
        const dotsItems = paginationBuilder(3, 10).filter(item => item.text === '...');

        expect(!!dotsItems.length).to.equal(true);
    });

    describe('custom options', () => {
        it('disable nextPrevLinks rendering', () => {
            const result = paginationBuilder(3, 10, { prevNextLinks: false });
            expect(result[0]).to.not.have.property('text', 'Prev');
            expect(result[result.length - 1]).to.not.have.property('text', 'Next');
        });

        it('Custom dots text', () => {
            const customDots = '_ _ _';
            const result = paginationBuilder(3, 10, { dots: customDots });
            expect(result[6]).to.have.property('text', customDots);
        });

        it('Disabled dots', () => {
            const dotsItems = paginationBuilder(3, 10, { dots: false }).filter(item => item.text === '...');

            expect(!!dotsItems.length).to.equal(false);
        });

        it('Custom "prevText" option', () => {
            const prevText = 'Previous text!';
            const result = paginationBuilder(3, 10, { prevText });
            expect(result[0]).to.have.property('text', prevText);
        });

        it('Custom "nextText" option', () => {
            const nextText = 'Next text!';
            const result = paginationBuilder(3, 10, { nextText });
            expect(result[result.length - 1]).to.have.property('text', nextText);
        });

        it('Custom "afterFirst" option', () => {
            const afterFirst = 1;
            const result = paginationBuilder(10, 20, { afterFirst });
            const firstPageIndex = result.findIndex(item => item.page === 1);
            const firstDotsIndex = result.findIndex(item => item.text === '...');

            expect(firstDotsIndex - firstPageIndex).to.equal(afterFirst + 1);
        });

        it('Custom "beforeLast" option', () => {
            const beforeLast = 5;
            const last = 40;
            const result = paginationBuilder(10, last, { beforeLast });
            const lastPageIndex = result.findIndex(item => item.page === last);
            const lastDotsIndex = result.findIndex(item => item === result.filter(fItem => fItem.text === '...')[1]);

            expect(lastPageIndex - lastDotsIndex).to.equal(beforeLast + 1);
        });


        it('Custom "beforeCurrent" option', () => {
            const beforeCurrent = 4;
            const result = paginationBuilder(15, 30, { beforeCurrent });
            const currentIndex = result.findIndex(item => item.isActive);
            const firstDotsIndex = result.findIndex(item => item.text === '...');

            expect(currentIndex - firstDotsIndex).to.equal(beforeCurrent + 1);
        });

        it('Custom "afterCurrent" option', () => {
            const afterCurrent = 10;
            const result = paginationBuilder(15, 40, { afterCurrent });
            const currentIndex = result.findIndex(item => item.isActive);
            const lastDotsIndex = result.findIndex(item => item === result.filter(fItem => fItem.text === '...')[1]);

            expect(lastDotsIndex - currentIndex).to.equal(afterCurrent + 1);
        });
    });
});
