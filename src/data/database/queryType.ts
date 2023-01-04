const enum QueryType {
    // Profile
    UserByToken,
    UserById,
    UpdateDataOpen,
    UpdateComment,
    ResetUser,
    UpdatePlayCount,

    // Music
    TotalPatternCountGF,
    TotalPatternCountDM,
    NonPlay,

    // Skill
    PatternCount,
    MybestPattern,
    MybestPatternG,
    MybestPatternD,
    MybestMusic,
    ResetSkill,
    SkillData,
    PlayCount,

    // Tower
    RemoveTowerFloor,
    RemoveTowerClear,
    TowerList,
    TowerInfo,
    TowerData,
    TowerFloorUpdate,
    TowerStatusUpdate,
    SelectTowerStatus,
    SelectFloorStatus,

    Recent,
    UserCount,
    SkillRanking,
    PatternList,
}

export default QueryType;
