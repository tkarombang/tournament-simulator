export interface Team {
  team: string;
  MP: number;
  W: number;
  D: number;
  L: number;
  GF: number;
  GA: number;
  GD: number;
  PTS: number;
  last5: string[]; // "W", "D", "L"
  flag: string;
}

export interface Tournament {
  tournament: string;
  groups: { [key: string]: Team[] };
}

const initialData: Tournament = {
  tournament: "FIFA World Cup 2026",
  groups: {
    A: [
      { team: "Qatar", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-qa" },
      { team: "Ecuador", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-ec" },
      { team: "Senegal", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-sn" },
      { team: "Netherlands", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-nl" },
    ],
    B: [
      { team: "England", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-gb-eng" },
      { team: "Iran", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-ir" },
      { team: "USA", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-us" },
      { team: "Wales", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-gb-wls" },
    ],
    C: [
      { team: "Argentina", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-ar" },
      { team: "Poland", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-pl" },
      { team: "Mexico", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-mx" },
      { team: "Saudi Arabia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-sa" },
    ],
    D: [
      { team: "France", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-fr" },
      { team: "Australia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-au" },
      { team: "Tunisia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-tn" },
      { team: "Denmark", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-dk" },
    ],
    E: [
      { team: "Japan", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-jp" },
      { team: "Spain", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-es" },
      { team: "German", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-de" },
      { team: "Costa Rica", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-cr" },
    ],
    F: [
      { team: "Maroco", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-ma" },
      { team: "Croatia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-hr" },
      { team: "Belgium", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-be" },
      { team: "Canada", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-ca" },
    ],
    G: [
      { team: "Brazil", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-br" },
      { team: "Switzerland", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-ch" },
      { team: "Cameroon", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-cm" },
      { team: "Serbia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-rs" },
    ],
    H: [
      { team: "Portugal", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-pt" },
      { team: "South Korea", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-kr" },
      { team: "Uruguay", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-uy" },
      { team: "Ghana", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [], flag: "fi fi-gh" },
    ],
  },
};

export default initialData;

// A: [
//   { team: "Qatar", MP: 2, W: 1, D: 0, L: 1, GF: 3, GA: 2, GD: 1, PTS: 3, last5: ["W", "L"] },
//   { team: "Ekuador", MP: 2, W: 1, D: 1, L: 0, GF: 4, GA: 2, GD: 2, PTS: 4, last5: ["D", "W"] },
//   { team: "Senegal", MP: 2, W: 0, D: 1, L: 1, GF: 1, GA: 3, GD: -2, PTS: 1, last5: ["D", "L"] },
//   { team: "Belanda", MP: 2, W: 2, D: 0, L: 0, GF: 5, GA: 1, GD: 4, PTS: 6, last5: ["W", "W"] },
// ],
