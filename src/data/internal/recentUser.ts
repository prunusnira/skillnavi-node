export type RecentUserData = {
    id: number,
    titletower: string,
    name: string,
    gskill: number,
    dskill: number,
    updatetime: number,
    uptimelong: number,
    opencount: string,
}

export type Recent = {
    "recent": RecentUserData[]
}