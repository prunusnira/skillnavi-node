class CommonTools {
    static getPagedList<T>(list: Array<T>, page: number, size: number) {
        const lsize = list.length;
        if (lsize <= size) {
            return list;
        } else {
            if (page * size < lsize) {
                return list.filter((x, i) => {
                    i >= (page - 1) * size && i < page * size;
                });
            } else {
                return list.filter((x, i) => {
                    i >= (page - 1) * size && i < lsize;
                });
            }
        }
    }

    static getListPages<T>(list: Array<T>, pageSize: number) {
        return list.length % pageSize == 0
            ? list.length / pageSize
            : list.length / pageSize + 1;
    }
}
export default CommonTools;
