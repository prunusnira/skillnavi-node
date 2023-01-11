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
    MusicInfo,
    MusicList,

    // Skill
    PatternCount,
    MybestPattern,
    MybestPatternG,
    MybestPatternD,
    MybestMusic,
    ResetSkill,
    SkillDataOne,
    SkillDataMid,
    SkillDataAll,
    SkillDataTarget,
    PlayCount,
    EXCSkill,

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
