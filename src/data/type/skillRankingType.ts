export type SkillRankingItem = {
    id: number,
    titletower: string,
    name: string,
    gskill: number,
    dskill: number,
    opencount: string,
    uptimelong: number,
}

export type SkillRanking = {
    "allUserList": SkillRankingItem[]
}