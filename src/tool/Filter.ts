class Filter {
    static filterLevel = (level: number) => {
        const levels = new Array<number>()
        switch(level) {
            case 1:
                levels.push(100)
                break
            case 2:
                levels.push(150)
                break
            case 3:
                levels.push(200)
                break
            case 4:
                levels.push(250)
                break
            case 5:
                levels.push(300)
                break
            case 6:
                levels.push(350)
                break
            case 7:
                levels.push(400)
                break
            case 8:
                levels.push(450)
                break
            case 9:
                levels.push(500)
                break
            case 10:
                levels.push(550)
                break
            case 11:
                levels.push(600)
                break
            case 12:
                levels.push(650)
                break
            case 13:
                levels.push(700)
                break
            case 14:
                levels.push(750)
                break
            case 15:
                levels.push(800)
                break
            case 16:
                levels.push(850)
                break
            case 17:
                levels.push(900)
                break
            case 18:
                levels.push(950)
                break
        }
        return levels
    }

    static filterVersion = (verstr: string) => {
        // 2자리씩 끊어서 숫자로 변환
        const verarr = new Array<number>()
        for(let i = 0; i < verstr.length/2; i++) {
            verarr.push(parseInt(verstr.substr(i*2, 2)))
        }
        return verarr
    }

    static filterRank = (rank: number) => {
        const ranks = new Array<string>()
        switch(rank) {
            case 0:
                ranks.push("none")
                break
            case 1:
                ranks.push("F")
                break
            case 2:
                ranks.push("E")
                break
            case 3:
                ranks.push("D")
                break
            case 4:
                ranks.push("C")
                break
            case 5:
                ranks.push("B")
                break
            case 6:
                ranks.push("A")
                break
            case 7:
                ranks.push("S")
                break
            case 8:
                ranks.push("SS")
                break
            case 9:
                ranks.push("EXC")
                break
        }
        return ranks
    }
}

export default Filter