interface SocialMedia {
  name: string;
  logo: string[];
  link: string;
}

const youtube: string[] = ['fab', 'youtube'];
const instagram: string[] = ['fab', 'instagram'];
const twitch: string[] = ['fab', 'twitch'];

export const youtubeRecomendations: SocialMedia[] = [
  {
    name: "dorian designs",
    logo: youtube,
    link: "https://www.youtube.com/@DorianDesigns"
  },
  {
    name: "bluuweb",
    logo: youtube,
    link: "https://www.youtube.com/@Bluuweb"
  },
  {
    name: "fazt",
    logo: youtube,
    link: "https://www.youtube.com/channel/@FaztTech"
  },
  {
    name: "fernando herrera",
    logo: youtube,
    link: "https://www.youtube.com/channel/@DevTalles"
  },
  {
    name: "leonidas esteban",
    logo: youtube,
    link: "https://www.youtube.com/@LeonidasEsteban"
  },
];

export const instagramRecomendations: SocialMedia[] = [
  {
    name: "melodikaktus",
    logo: instagram,
    link: "https://www.instagram.com/melodikaktus"
  },
  {
    name: "seyyahikaktus",
    logo: instagram,
    link: "https://www.instagram.com/seyyahikaktus"
  },
];

export const twitchRecomendations: SocialMedia[] = [
  {
    // next recomend npm version 1.0.9
    name: "lunanny",
    logo: twitch,
    link: "https://www.twitch.tv/lunanny"
  },
  {
    name: "dannyagii",
    logo: twitch,
    link: "https://www.twitch.tv/dannyagii"
  },
  {
    name: "japonHR",
    logo: twitch,
    link: "https://www.twitch.tv/japon_hr"
  },
];
