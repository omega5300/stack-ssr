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
    link: "https://www.youtube.com/user/DorianDesigns"
  },
  {
    name: "bluuweb",
    logo: youtube,
    link: "https://www.youtube.com/user/Bluuweb"
  },
  {
    name: "fazt",
    logo: youtube,
    link: "https://www.youtube.com/channel/UCX9NJ471o7Wie1DQe94RVIg"
  },
  {
    name: "fernando herrera",
    logo: youtube,
    link: "https://www.youtube.com/channel/UCuaPTYj15JSkETGnEseaFFg"
  },
  {
    name: "leonidas esteban",
    logo: youtube,
    link: "https://www.youtube.com/user/LeonidasEsteban"
  },
];

export const instagramRecomendations: SocialMedia[] = [
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
];

export const webRecomendations: SocialMedia[] = [
  {
    name: "Doofy's Projects",
    logo: ['fas', 'globe'],
    link: "https://dprojects.org"
  },

]
