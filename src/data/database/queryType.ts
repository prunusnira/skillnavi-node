const enum QueryType {
    // Profile
    UserByToken,
    UserById,
    UpdateDataOpen,
    UpdateComment,

    // Music
    TotalPatternCountGF,
    TotalPatternCountDM,

    // Skill
    PatternCount,
    MybestPattern,
    MybestPatternG,
    MybestPatternD,
    MybestMusic,

    Recent,
    UserCount,
    SkillRanking,
    PatternList,
}

export default QueryType;
