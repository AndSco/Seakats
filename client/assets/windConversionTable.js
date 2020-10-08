export const unitLimits = {
  beaufort: 12,
  knots: 71,
  "m/s": 50,
  "Km/h": 200
};

export const windConversionTable = [
  {
    bf: "0",
    kn: "1",
    mSec: "0 - 0.2",
    kmH: "1",
    mpH: "1",
    label: "Calm"
  },
  {
    bf: "1",
    kn: "1-3",
    mSec: "0.3-1.5",
    kmH: "1-5",
    mpH: "1-3",
    label: "Light Air"
  },
  {
    bf: "2",
    kn: "4-6",
    mSec: "1.6-3.3",
    kmH: "6-11",
    mpH: "4-7",
    label: "Light Breeze"
  },
  {
    bf: "3",
    kn: "7-10",
    mSec: "3.4-5.4",
    kmH: "12-19",
    mpH: "8-12",
    label: "Gentle Breeze"
  },
  {
    bf: "4",
    kn: "11-15",
    mSec: "5.5-7.9",
    kmH: "20-28",
    mpH: "13-17",
    label: "Moderate Breeze"
  },
  {
    bf: "5",
    kn: "16-21",
    mSec: "8.0-10.7",
    kmH: "29-38",
    mpH: "18-24",
    label: "Fresh Breeze"
  },
  {
    bf: "6",
    kn: "22-27",
    mSec: "10.8-13.8",
    kmH: "39-49",
    mpH: "25-30",
    label: "strong Breeze"
  },
  {
    bf: "7",
    kn: "28-33",
    mSec: "13.9-17.1",
    kmH: "50-61",
    mpH: "31-38",
    label: "Near Gale"
  },
  {
    bf: "8",
    kn: "34-40",
    mSec: "17.2-20.7",
    kmH: "62-74",
    mpH: "39-46",
    label: "Gale"
  },
  {
    bf: "9",
    kn: "41-47",
    mSec: "20.8-24.4",
    kmH: "75-88",
    mpH: "47-54",
    label: "Severe Gale"
  },
  {
    bf: "10",
    kn: "48-55",
    mSec: "24.5-28.4",
    kmH: "89-102",
    mpH: "55-63",
    label: "Strong storm"
  },
  {
    bf: "11",
    kn: "56-63",
    mSec: "28.5-32.6",
    kmH: "103-117",
    mpH: "64-73",
    label: "Violent Storm"
  },
  {
    bf: "12",
    kn: "64-71",
    mSec: "32.7-50",
    kmH: "118-200",
    mpH: ">74",
    label: "Hurricane"
  }
];

export const windDescriptionTable = [
  {
    windSpeed: "1",
    label: "Calm",
    effectsSea: "Sea like a mirror",
    effectLand: "Calm. Smoke rises vertically."
  },
  {
    windSpeed: "1-3",
    label: "Light Air",
    effectsSea:
      "Ripples with the appearance of scales are formed, but without foam crests",
    effectLand: "Wind motion visible in smoke."
  },
  {
    windSpeed: "4-6",
    label: "Light Breeze",
    effectsSea:
      "Small wavelets, still short, but more pronounced. Crests have a glassy appearance and do not break.",
    effectLand: "Wind felt on exposed skin. Leaves rustle."
  },
  {
    windSpeed: "7-10",
    label: "Gentle Breeze",
    effectsSea:
      "Large wavelets. Crests begin to break. Foam of glassy appearance. Perhaps scattered white horses.",
    effectLand: "Leaves and smaller twigs in constant motion."
  },
  {
    windSpeed: "11-15",
    label: "Moderate Breeze",
    effectsSea: "Small waves, becoming larger; fairly frequent white horses.",
    effectLand: "Dust and loose paper raised. Small branches begin to move."
  },
  {
    windSpeed: "16-21",
    label: "Fresh Breeze",
    effectsSea:
      "Moderate waves, taking a more pronounced long form; many white horses are formed. Chance of some spray.",
    effectLand: "Branches of a moderate size move. Small trees begin to sway."
  },
  {
    windSpeed: "22-27",
    label: "Strong Breeze",
    effectsSea:
      "Large waves begin to form; the white foam crests are more extensive everywhere. Probably some spray.",
    effectLand:
      "Large branches in motion. Whistling heard in overhead wires. Umbrella use becomes difficult. Empty plastic garbage cans tip over."
  },
  {
    windSpeed: "28-33",
    label: "Near Gale",
    effectsSea:
      "Sea heaps up and white foam from breaking waves begins to be blown in streaks along the direction of the wind.",
    effectLand:
      "Whole trees in motion. Effort needed to walk against the wind. Swaying of skyscrapers may be felt, especially by people on upper floors."
  },
  {
    windSpeed: "34-40",
    label: "Gale",
    effectsSea:
      "Moderately high waves of greater length; edges of crests begin to break into spindrift. The foam is blown in well-marked streaks along the direction of the wind.",
    effectLand: "Twigs broken from trees. Cars veer on road."
  },
  {
    windSpeed: "41-47",
    label: "Severe Gale",
    effectsSea:
      "High waves. Dense streaks of foam along the direction of the wind. Crests of waves begin to topple, tumble and roll over. Spray may affect visibility.",
    effectLand:
      "Larger branches break off trees, and some small trees blow over. Construction/temporary signs and barricades blow over. Damage to circus tents and canopies."
  },
  {
    windSpeed: "48-55",
    label: "Strong storm",
    effectsSea:
      "Very high waves with long over-hanging crests. The resulting foam, in great patches, is blown in dense white streaks along the direction of the wind. On the whole the surface of the sea takes on a white appearance. The 'tumbling' of the sea becomes heavy and shock-like. Visibility affected.",
    effectLand:
      "Trees are broken off or uprooted, saplings bent and deformed, poorly attached asphalt shingles and shingles in poor condition peel off roofs."
  },
  {
    windSpeed: "56-63",
    label: "Violent Storm",
    effectsSea:
      "Exceptionally high waves (small and medium-size ships might disappear behind the waves). The sea is completely covered with long white patches of foam flying along the direction of the wind. Everywhere the edges of the wave crests are blown into froth. Visibility affected.",
    effectLand:
      "Widespread vegetation damage. More damage to most roofing surfaces, asphalt tiles that have curled up and/or fractured due to age may break away completely."
  },
  {
    windSpeed: "64-71",
    label: "Hurricane",
    effectsSea:
      "The air is filled with foam and spray. Sea completely white with driving spray; visibility very seriously affected.",
    effectLand:
      "Considerable and widespread damage to vegetation, a few windows broken, structural damage to mobile homes and poorly constructed sheds and barns. Debris may be hurled about."
  }
];
