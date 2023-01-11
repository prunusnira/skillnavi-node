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

    static convertOrder(order: string) {
        switch (order) {
            case "titleasc":
                return "hurigana ASC";
            case "titledesc":
                return "hurigana DESC";
            case "verasc":
                return "version ASC";
            case "verdesc":
                return "version DESC";
        }
    }

    static getToday() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        return year + month + day;
    }
}
export default CommonTools;
