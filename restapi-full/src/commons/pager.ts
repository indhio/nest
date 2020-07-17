export class Pager<T> {

    constructor(
        public page: number,
        public total: number,
        public list: Array<T>,
    ) { }

}