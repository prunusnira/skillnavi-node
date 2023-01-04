class CommonTools {
    static getPagedList<T>(list: Array<T>, page: number, size: number) {
        const lsize = list.length;
        console.log(
            `${lsize} ${page} ${size} ${(page - 1) * size} ${page * size}`
        );
        if (lsize <= size) {
            return list;
        } else {
            if (page * size < lsize) {
                const data = list.filter(
                    (x, i) => i >= (page - 1) * size && i < page * size
                );
                console.log(JSON.stringify(data));
                console.log(`type1`);
                return data;
            } else {
                const data = list.filter(
                    (x, i) => i >= (page - 1) * size && i < lsize
                );
                console.log(JSON.stringify(data));
                console.log(`type2`);
                return data;
            }
        }
    }

    static getListPages<T>(list: Array<T>, pageSize: number) {
        return list.length % pageSize == 0
            ? list.length / pageSize
            : Math.floor(list.length / pageSize + 1);
    }
}
export default CommonTools;
