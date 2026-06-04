import type { TAlbum } from "../../../app/tableData";

export const columnLabels: Record<keyof TAlbum, string> = {
  albumName: "Название альбома",
  artist: "Исполнитель",
  genre: "Жанр",
  country: "Страна",
  yandexMusicPlays: "Прослушивания (Яндекс.Музыка)",
  soundcloudPlays: "Прослушивания (SoundCloud)",
  rhymesImages: "Рифмы/Образы",
  structureRhythm: "Структура/Ритм",
  styleImplementation: "Реализация стиля",
  individualityCharisma: "Индивидуальность/Харизма",
  atmosphereVibe: "Атмосфера/Вайб",
};
