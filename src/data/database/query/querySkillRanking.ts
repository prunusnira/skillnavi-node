export const querySkillRanking = (params: Array<string>) => {
    const [gtype, pagestr] = params
    const page = parseInt(pagestr)

    let query = 'SELECT * FROM profile '
    switch(gtype) {
        case 'gf':
            query += 'ORDER BY gskill DESC '
            break
        case 'dm':
            query += 'ORDER BY dskill DESC '
            break
        case 'all':
            query += 'ORDER BY gskill+dskill DESC '
            break
    }

    if(query.length > 0)
        query += `LIMIT ${(page-1)*30}, 30`

    return query
}