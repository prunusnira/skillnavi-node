export const queryLvDiffGF = () =>
    `SELECT a.id, a.name, 1 AS ptcode, a.gbsc AS lv, b.gbsc AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.gbsc != b.gbsc union
SELECT a.id, a.name, 2 AS ptcode, a.gadv AS lv, b.gadv AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.gadv != b.gadv union
SELECT a.id, a.name, 3 AS ptcode, a.gext AS lv, b.gext AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.gext != b.gext union
SELECT a.id, a.name, 4 AS ptcode, a.gmas AS lv, b.gmas AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.gmas != b.gmas union
SELECT a.id, a.name, 5 AS ptcode, a.bbsc AS lv, b.bbsc AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.bbsc != b.bbsc union
SELECT a.id, a.name, 6 AS ptcode, a.badv AS lv, b.badv AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.badv != b.badv union
SELECT a.id, a.name, 7 AS ptcode, a.bext AS lv, b.bext AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.bext != b.bext union
SELECT a.id, a.name, 8 AS ptcode, a.bmas AS lv, b.bmas AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.bmas != b.bmas`;

export const queryLvDiffDM = () =>
    `SELECT a.id, a.name, 9 AS ptcode, a.dbsc AS lv, b.dbsc AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.dbsc != b.dbsc union
SELECT a.id, a.name, 10 AS ptcode, a.dadv AS lv, b.dadv AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.dadv != b.dadv union
SELECT a.id, a.name, 11 AS ptcode, a.dext AS lv, b.dext AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.dext != b.dext union
SELECT a.id, a.name, 12 AS ptcode, a.dmas AS lv, b.dmas AS lvold FROM music AS a, music_hv AS b WHERE a.id = b.id AND a.dmas != b.dmas`;
