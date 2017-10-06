import { FuuDatePipe } from './date.pipe';

describe('DatePipe', () =>
{
    it('create an instance', () =>
    {
        const pipe = new FuuDatePipe();
        expect(pipe).toBeTruthy();
    });
});
