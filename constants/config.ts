export interface Artist {
  id: string;
  name: string;
  image?: string;
  bg: string;
  color: string;
}

export const Artist: Artist[] = [
  {
    id: "1",
    name: "Tyler the Creator",
    image:
      "https://www.nme.com/wp-content/uploads/2019/08/Tyler-the-Creator-at-NYC-Governors-Ball-696x442.jpg",
    bg: "#778943",
    color: "#3E4B1E",
  },
  {
    id: "2",
    name: "Jake Isaac",
    image:
      "https://best-fit.transforms.svdcdn.com/production/images/JakeIsaac_BENJAMIN_4000.jpg?w=768&q=95&auto=format&fit=crop&dm=1722000488&s=c8d711e81f7f2c89d9037a89ef8c4b41",
    bg: "#E3D7CA",
    color: "#776B5D",
  },
  {
    id: "3",
    name: "ALT-J",
    image: "https://i.ytimg.com/vi/FpowJkw-seQ/maxresdefault.jpg",
    bg: "#2C3251",
    color: "#FFABDC",
  },
  {
    id: "4",
    name: "Cigarettes After Sex",
    image:
      "https://npr.brightspotcdn.com/legacy/wp-content/uploads/20190715_CigarettesAfterSex_EbruYildiz_388-2.jpg",
    bg: "#2A3537",
    color: "#C9CBCE",
  },
  {
    id: "5",
    name: "Sigur Rós",
    image: require("../assets/images/sigurros.jpg"),
    bg: "#DA9160",
    color: "#232123",
  },
  {
    id: "6",
    name: "Tame Impala",
    image:
      "https://static.wikia.nocookie.net/music/images/0/00/011620-Tame-Impala-Chuff-Media-696x522.jpg/revision/latest?cb=20201018071033",
    bg: "#73B0FB",
    color: "#FBE1D9",
  },
  {
    id: "7",
    name: "Sampha",
    image: "https://i.imgur.com/43dOZCg.jpeg",
    bg: "#9E4C4C",
    color: "#FCDE77",
  },
  {
    id: "8",
    name: "Bon Iver",
    image:
      "https://musicfeeds.com.au/wp-content/uploads/sites/7/caed9e4e3f362747b7c54cd0a5440e4a.jpg?w=640",
    bg: "#D3D8C6",
    color: "#2B3D00",
  },
  {
    id: "9",
    name: "James Blake",
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b5/James_Blake_Cover.jpg",
    bg: "#203643",
    color: "#DEEDF2",
  },
  {
    id: "10",
    name: "King Krule",
    bg: "#E74C3C",
    color: "#1E272E",
    image:
      "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMjc4NjYwMy9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTc1NzA1OTczMn0.383tKP9k7trdJs41tNBzVnCvCCss9VHHJS3OFbsjlGE/img.jpg?width=1200&height=800&quality=100&coordinates=0%2C141%2C0%2C829",
  },
  {
    id: "11",
    name: "The xx",
    bg: "#2C3E50",
    color: "#ECF0F1",
    image:
      "https://vinyloteka.lt/wp-content/uploads/2022/01/R-3855300-1493768259-9273.jpg",
  },
  {
    id: "12",
    name: "Sufjan Stevens",
    bg: "#CCAA8F",
    color: "#161919",
    image:
      "https://static.wikia.nocookie.net/taylor-swift-fanon/images/4/4e/Sufjanstevens.jpg/revision/latest/scale-to-width-down/340?cb=20240803232828",
  },
  {
    id: "13",
    name: "Beach House",
    bg: "#3498DB",
    color: "#F5EEF8",
  },
  {
    id: "14",
    name: "José González",
    bg: "#795548",
    color: "#FFEAA7",
  },
  {
    id: "15",
    name: "Fleet Foxes",
    bg: "#27AE60",
    color: "#F0F3F4",
  },
];
