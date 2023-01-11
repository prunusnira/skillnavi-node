const enum QueryType {
    // Bonus
    LvDiffGF,
    LvDiffDM,

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
    TowerList,
    TowerInfo,
    TowerData,

    Recent,
    UserCount,
    SkillRanking,
    PatternList,
}

export default QueryType;
