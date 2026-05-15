import { Box, Typography } from "@mui/material";
import ArtistCard from "./ArtistCard";

export default function ArtistsCenterBlock() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        alignItems: { xs: "center", sm: "flex-end" },
      }}
    >
      <Box sx={{ width: { xs: "70%", sm: "auto" }, flex: { sm: "0 0 auto" } }}>
        <ArtistCard
          coverSrc="/albums_covers/kai_angel/marilyn_manson.png"
          coverAlt="kai angel - marilyn manson"
          title="Kai Angel - MARILYN MANSON"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "stretch",
          flex: 1,
          width: { xs: "70%", sm: "auto" },
        }}
      >
        <Box
          component="img"
          src="/artists/kanye_west.jpg"
          alt="kanye west"
          sx={{
            height: "300px",
            width: "100%",
            objectFit: { xs: "contain", md: "fill" },
            display: "block",
          }}
        />
        <Typography
          sx={{
            color: "white",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "0.9em",
          }}
        >
          Kanye West
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "0.9em",
          }}
        >
          Ye - более известный под бывшим юридическим именем Канье Уэст, — американский рэпер, музыкальный продюсер, автор песен, звукорежиссёр, бывший долларовый миллиардер и дизайнер. Вырос в Чикаго, где с юных лет был связан с музыкой. В конце 1990-х — начале 2000-х годов он получил известность как продюсер, приняв участие в создании хитов для таких исполнителей, как Jay-Z, Ludacris, Талиб Квели и Алиша Киз. Бросив обучение в университете, чтобы сосредоточиться на музыке, он решил стать рэпером, выпустив дебютный альбом, The College Dropout, в 2004 году. За ним последовали альбомы Late Registration (2005), Graduation (2007), 808s & Heartbreak (2008), My Beautiful Dark Twisted Fantasy (2010), совместный с Jay-Z альбом Watch the Throne (2011), Yeezus (2013), The Life of Pablo (2016), Ye (2018), совместный с Kid Cudi альбом Kids See Ghosts (2018), Jesus is King (2019), Donda (2021) и его сиквел, выпущенный в 2022 году, совместные с Ty Dolla $ign альбомы Vultures 1 (2024), и Vultures 2 (2024).
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "0.9em",
          }}
        >
          Канье Уэст известен своими прямыми высказываниями на различных церемониях и в социальных медиа, что не раз
          приводило к скандалам. В качестве дизайнера он работал с такими компаниями, как Nike и Louis Vuitton, а в
          2013 году запустил совместно с Adidas линию одежды Yeezy. Он также основал лейбл GOOD Music и креативное
          агентство DONDA. В 2014 году женился на звезде реалити-шоу и модели Ким Кардашьян.
          Канье Уэст получил признание критиков и был неоднократно назван одним из величайших артистов XXI века. Он
          вошёл в число самых продаваемых артистов, суммарный объём продаж его альбомов и синглов в цифровом формате
          и на физических носителях превысил 121 миллион экземпляров. Уэст выиграл 24 премии «Грэмми», благодаря
          чему он является одним из рекордсменов по числу выигранных номинаций и рекордсменом среди
          хип-хоп-музыкантов, а также артистов своего возраста. Его альбомы были включены в различные списки лучших
          альбомов, в том числе в список 500 величайших альбомов всех времён по версии журнала Rolling Stone. Он
          несколько раз был представлен в различных списках журнала Forbes и дважды — в ежегодном списке 100 самых
          влиятельных людей мира по версии журнала Time. В 2019 году вошёл в список самых высокооплачиваемых
          музыкантов по версии журнала Forbes. Заработанная сумма составила $150 млн, это второе место в рейтинге. В
          2020 году Forbes поставил Канье Уэста с доходом $170 млн на второе место в рейтинге самых
          высокооплачиваемых знаменитостей. По сообщению Bloomberg, состояние Канье Уэста на 2021 год оценивалось в
          $6,6 млрд и большая часть капитала приходилась на бренд Yeezy.
        </Typography>
      </Box>

      <Box sx={{ width: { xs: "70%", sm: "auto" }, flex: { sm: "0 0 auto" } }}>
        <ArtistCard
          coverSrc="/albums_covers/2hollis/star.png"
          coverAlt="2hollis - star"
          title="2hollis - star"
        />
      </Box>
    </Box>
  );
}
