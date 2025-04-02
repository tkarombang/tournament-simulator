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
}

export interface Tournament {
  tournament: string;
  groups: { [key: string]: Team[] };
}

const initialData: Tournament = {
  tournament: "Piala Dunia 2022",
  groups: {
    A: [
      { team: "Qatar", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Ecuador", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Senegal", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Netherlands", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    B: [
      { team: "England", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Iran", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "USA", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Wales", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    C: [
      { team: "Argentina", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Poland", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Mexico", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Saudi Arabia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    D: [
      { team: "France", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Australia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Tunisia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Denmark", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    E: [
      { team: "Japan", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Spain", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "German", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Costa Rica", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    F: [
      { team: "Maroco", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Croatia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Belgium", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Canada", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    G: [
      { team: "Brazil", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Switzerland", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Cameroon", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Serbia", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
    ],
    H: [
      { team: "Portugal", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "South Korea", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Uruguay", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
      { team: "Ghana", MP: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, PTS: 0, last5: [] },
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
