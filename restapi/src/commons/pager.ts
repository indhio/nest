export class Pager {

    constructor(
        public page: number,
        public total: number,
        public list: Array<any>,
    ) { }

}