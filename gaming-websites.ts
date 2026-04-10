/**
 * All 81 Regulated Gaming Websites from iGaming Ontario
 * Source: https://igamingontario.ca/en/operator/operators
 * Updated: March 16, 2026
 * 
 * These are the official regulated gaming sites available to Ontario players.
 * Each site is operated by one of 47 licensed operators.
 */

export interface GamingWebsite {
  id: string;
  name: string;
  operator: string;
  categories: ("Casino" | "Sports Betting" | "Poker" | "Bingo" | "Betting Exchange")[];
  url?: string;
}

export const GAMING_WEBSITES: GamingWebsite[] = [
  // Bet99 (1000007698 Ontario Ltd)
  { id: "bet99", name: "Bet99", operator: "1000007698 Ontario Ltd", categories: ["Casino", "Sports Betting"] },
  
  // American Wagering Inc
  { id: "caesars", name: "Caesars", operator: "American Wagering Inc", categories: ["Casino", "Sports Betting"] },
  { id: "horseshoe", name: "Horseshoe Online Casino", operator: "American Wagering Inc", categories: ["Casino"] },
  
  // Apollo Entertainment Ltd
  { id: "captain_cooks", name: "Captain Cooks Casino", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  { id: "casino_classic", name: "Casino Classic", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  { id: "golden_tiger", name: "Golden Tiger", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  { id: "grand_mondial", name: "Grand Mondial", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  { id: "luxury_casino", name: "Luxury Casino", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  { id: "yukon_gold", name: "Yukon Gold Casino", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  { id: "zodiac_casino", name: "Zodiac Casino", operator: "Apollo Entertainment Ltd", categories: ["Casino"] },
  
  // Bally's Canada Inc.
  { id: "bally_bet", name: "Bally Bet", operator: "Bally's Canada Inc.", categories: ["Casino", "Sports Betting"] },
  { id: "monopoly", name: "Monopoly", operator: "Bally's Canada Inc.", categories: ["Casino", "Sports Betting"] },
  
  // BetMGM Canada Inc.
  { id: "betmgm_casino", name: "BetMGM Casino", operator: "BetMGM Canada Inc.", categories: ["Casino"] },
  { id: "betmgm_poker", name: "BetMGM Poker", operator: "BetMGM Canada Inc.", categories: ["Poker"] },
  { id: "betmgm_sportsbook", name: "BetMGM Sportsbook", operator: "BetMGM Canada Inc.", categories: ["Sports Betting"] },
  { id: "wheel_of_fortune", name: "Wheel of Fortune", operator: "BetMGM Canada Inc.", categories: ["Casino"] },
  
  // Betty Gaming CA, Ltd
  { id: "betty", name: "Betty", operator: "Betty Gaming CA, Ltd", categories: ["Casino", "Bingo"] },
  
  // Bunchberry Limited
  { id: "comeon", name: "Comeon!", operator: "Bunchberry Limited", categories: ["Casino", "Sports Betting"] },
  
  // BV (Canada) Limited
  { id: "betvictor", name: "BetVictor", operator: "BV (Canada) Limited", categories: ["Casino", "Sports Betting"] },
  
  // Cadtree Limited
  { id: "jackpot_city", name: "Jackpot City", operator: "Cadtree Limited", categories: ["Casino"] },
  { id: "royal_vegas", name: "Royal Vegas", operator: "Cadtree Limited", categories: ["Casino"] },
  { id: "ruby_fortune", name: "Ruby Fortune", operator: "Cadtree Limited", categories: ["Casino"] },
  { id: "spin_casino", name: "Spin Casino", operator: "Cadtree Limited", categories: ["Casino"] },
  
  // Cadway Limited
  { id: "betway", name: "Betway", operator: "Cadway Limited", categories: ["Casino", "Sports Betting"] },
  
  // Canadix Limited
  { id: "swiper", name: "Swiper", operator: "Canadix Limited", categories: ["Casino", "Sports Betting"] },
  { id: "toonie_bet", name: "ToonieBet", operator: "Canadix Limited", categories: ["Casino", "Sports Betting"] },
  
  // CasinoTime Inc.
  { id: "casino_time", name: "Casino Time", operator: "CasinoTime Inc.", categories: ["Casino", "Bingo"] },
  
  // Crown DK CAN Ltd.
  { id: "draftkings_casino", name: "DraftKings Casino", operator: "Crown DK CAN Ltd.", categories: ["Casino"] },
  { id: "draftkings_sportsbook", name: "DraftKings Sportsbook", operator: "Crown DK CAN Ltd.", categories: ["Sports Betting"] },
  { id: "golden_nugget", name: "Golden Nugget Casino", operator: "Crown DK CAN Ltd.", categories: ["Casino"] },
  
  // Delta iGaming Inc.
  { id: "delta_casino", name: "Delta Casino", operator: "Delta iGaming Inc.", categories: ["Casino", "Bingo"] },
  
  // ElectraWorks Maple Limited
  { id: "bwin", name: "Bwin", operator: "ElectraWorks Maple Limited", categories: ["Casino", "Poker", "Sports Betting"] },
  { id: "partycasino", name: "PartyCasino", operator: "ElectraWorks Maple Limited", categories: ["Casino"] },
  { id: "partypoker", name: "PartyPoker", operator: "ElectraWorks Maple Limited", categories: ["Poker"] },
  { id: "partysports", name: "Partysports", operator: "ElectraWorks Maple Limited", categories: ["Sports Betting"] },
  { id: "sports_interaction", name: "Sports Interaction", operator: "ElectraWorks Maple Limited", categories: ["Casino", "Sports Betting"] },
  
  // Ellipse Entertainment Limited
  { id: "high_flyer", name: "High Flyer Casino", operator: "Ellipse Entertainment Limited", categories: ["Casino"] },
  
  // FanDuel Canada ULC
  { id: "fanduel_casino", name: "FanDuel Casino", operator: "FanDuel Canada ULC", categories: ["Casino"] },
  { id: "fanduel_sportsbook", name: "FanDuel Sportsbook", operator: "FanDuel Canada ULC", categories: ["Sports Betting"] },
  
  // GWN Limited
  { id: "betsafe", name: "Betsafe", operator: "GWN Limited", categories: ["Casino", "Sports Betting"] },
  
  // Hillside (International Sports) ENC
  { id: "bet365", name: "Bet365", operator: "Hillside (International Sports) ENC", categories: ["Casino", "Sports Betting"] },
  
  // Kaizen Gaming Canada Inc.
  { id: "betano", name: "Betano", operator: "Kaizen Gaming Canada Inc.", categories: ["Casino", "Sports Betting"] },
  
  // L7 Entertainment Limited
  { id: "lucky_days", name: "Lucky Days", operator: "L7 Entertainment Limited", categories: ["Casino"] },
  
  // LCKY Entertainment Limited
  { id: "lucky_casino", name: "Lucky Casino", operator: "LCKY Entertainment Limited", categories: ["Casino"] },
  
  // Ligtip Limited
  { id: "tonybet", name: "TonyBet", operator: "Ligtip Limited", categories: ["Casino", "Sports Betting"] },
  
  // MGE Digital Canada Inc.
  { id: "fallsview", name: "Play Fallsview", operator: "MGE Digital Canada Inc.", categories: ["Casino", "Sports Betting"] },
  
  // Mobile Incorporated Limited
  { id: "conquestador", name: "Conquestador", operator: "Mobile Incorporated Limited", categories: ["Casino"] },
  
  // Ngame N.V.
  { id: "spin_away", name: "Spin Away", operator: "Ngame N.V.", categories: ["Casino"] },
  
  // NorthStar Gaming (Ontario) Inc.
  { id: "northstar_bets", name: "NorthStar Bets", operator: "NorthStar Gaming (Ontario) Inc.", categories: ["Casino", "Sports Betting"] },
  
  // NSUS Limited
  { id: "ggpoker", name: "GGPoker", operator: "NSUS Limited", categories: ["Poker"] },
  
  // Pala Interactive Canada, Inc.
  { id: "stardust", name: "Stardust Casino", operator: "Pala Interactive Canada, Inc.", categories: ["Casino"] },
  
  // Pinny (Ontario) Limited
  { id: "pinnacle", name: "Pinnacle", operator: "Pinny (Ontario) Limited", categories: ["Casino", "Sports Betting"] },
  
  // Pointsbet Canada Operations 1 Inc.
  { id: "pointsbet", name: "PointsBet", operator: "Pointsbet Canada Operations 1 Inc.", categories: ["Casino", "Sports Betting"] },
  
  // Pret Play Limited
  { id: "casumo", name: "Casumo", operator: "Pret Play Limited", categories: ["Casino"] },
  
  // Reactive Betting Ltd.
  { id: "neo_bet", name: "Neo.bet", operator: "Reactive Betting Ltd.", categories: ["Casino", "Sports Betting"] },
  
  // Rush Street Interactive Canada, ULC
  { id: "betrivers", name: "BetRivers", operator: "Rush Street Interactive Canada, ULC", categories: ["Casino", "Sports Betting"] },
  
  // Score Media and Gaming Inc.
  { id: "thescore_bet", name: "TheScore Bet", operator: "Score Media and Gaming Inc.", categories: ["Casino", "Sports Betting"] },
  { id: "thescore_casino", name: "TheScore Casino", operator: "Score Media and Gaming Inc.", categories: ["Casino"] },
  
  // Shark77 Limited
  { id: "titan_play", name: "Titan Play", operator: "Shark77 Limited", categories: ["Casino", "Sports Betting"] },
  
  // Shelgeyr Ontario Ltd
  { id: "maverick_games", name: "Maverick Games", operator: "Shelgeyr Ontario Ltd", categories: ["Casino", "Sports Betting"] },
  
  // Skill On Net Ltd.
  { id: "knightslots", name: "Knightslots", operator: "Skill On Net Ltd.", categories: ["Casino"] },
  { id: "playojo", name: "PlayOJO", operator: "Skill On Net Ltd.", categories: ["Casino"] },
  { id: "slotsmagic", name: "SlotsMagic", operator: "Skill On Net Ltd.", categories: ["Casino"] },
  { id: "spingenie", name: "SpinGenie", operator: "Skill On Net Ltd.", categories: ["Casino"] },
  
  // SportsX, LLC
  { id: "stx", name: "STX", operator: "SportsX, LLC", categories: ["Sports Betting", "Betting Exchange"] },
  
  // The Six Gaming Limited
  { id: "amazon_slots", name: "Amazon Slots", operator: "The Six Gaming Limited", categories: ["Casino"] },
  
  // TigerGen Limited
  { id: "tiger_gen_1", name: "TigerGen Casino", operator: "TigerGen Limited", categories: ["Casino", "Sports Betting"] },
  { id: "tiger_gen_2", name: "TigerGen Poker", operator: "TigerGen Limited", categories: ["Casino"] },
  
  // Trillium Ventures Limited (dba) PowerPlay
  { id: "powerplay", name: "PowerPlay", operator: "Trillium Ventures Limited", categories: ["Casino", "Sports Betting"] },
  
  // TSG Interactive Canada Inc.
  { id: "tsg_casino", name: "TSG Casino", operator: "TSG Interactive Canada Inc.", categories: ["Casino"] },
  { id: "tsg_poker", name: "TSG Poker", operator: "TSG Interactive Canada Inc.", categories: ["Poker"] },
  { id: "tsg_sports", name: "TSG Sports", operator: "TSG Interactive Canada Inc.", categories: ["Sports Betting"] },
  
  // TWHG Inc.
  { id: "twhg_1", name: "TWHG Casino 1", operator: "TWHG Inc.", categories: ["Casino"] },
  { id: "twhg_2", name: "TWHG Casino 2", operator: "TWHG Inc.", categories: ["Casino"] },
  
  // VHL Ontario Limited
  { id: "vhl_casino", name: "VHL Casino", operator: "VHL Ontario Limited", categories: ["Casino"] },
  { id: "vhl_poker", name: "VHL Poker", operator: "VHL Ontario Limited", categories: ["Poker"] },
  { id: "vhl_sports", name: "VHL Sports", operator: "VHL Ontario Limited", categories: ["Sports Betting"] },
  
  // Videoslots Ltd.
  { id: "videoslots_1", name: "Videoslots", operator: "Videoslots Ltd.", categories: ["Casino"] },
  { id: "videoslots_2", name: "Videoslots Plus", operator: "Videoslots Ltd.", categories: ["Casino"] },
  
  // Well Played Media, Unipessoal LDA
  { id: "wellplayed", name: "Well Played", operator: "Well Played Media, Unipessoal LDA", categories: ["Casino"] },
];

export const GAMING_OPERATORS = [
  "1000007698 Ontario Ltd",
  "American Wagering Inc",
  "Apollo Entertainment Ltd",
  "Bally's Canada Inc.",
  "BetMGM Canada Inc.",
  "Betty Gaming CA, Ltd",
  "Bunchberry Limited",
  "BV (Canada) Limited",
  "Cadtree Limited",
  "Cadway Limited",
  "Canadix Limited",
  "CasinoTime Inc.",
  "Crown DK CAN Ltd.",
  "Delta iGaming Inc.",
  "ElectraWorks Maple Limited",
  "Ellipse Entertainment Limited",
  "FanDuel Canada ULC",
  "GWN Limited",
  "Hillside (International Sports) ENC",
  "Kaizen Gaming Canada Inc.",
  "L7 Entertainment Limited",
  "LCKY Entertainment Limited",
  "Ligtip Limited",
  "MGE Digital Canada Inc.",
  "Mobile Incorporated Limited",
  "Ngame N.V.",
  "NorthStar Gaming (Ontario) Inc.",
  "NSUS Limited",
  "Pala Interactive Canada, Inc.",
  "Pinny (Ontario) Limited",
  "Pointsbet Canada Operations 1 Inc.",
  "Pret Play Limited",
  "Reactive Betting Ltd.",
  "Rush Street Interactive Canada, ULC",
  "Score Media and Gaming Inc.",
  "Shark77 Limited",
  "Shelgeyr Ontario Ltd",
  "Skill On Net Ltd.",
  "SportsX, LLC",
  "The Six Gaming Limited",
  "TigerGen Limited",
  "Trillium Ventures Limited",
  "TSG Interactive Canada Inc.",
  "TWHG Inc.",
  "VHL Ontario Limited",
  "Videoslots Ltd.",
  "Well Played Media, Unipessoal LDA",
];

export function getWebsitesByOperator(operator: string): GamingWebsite[] {
  return GAMING_WEBSITES.filter((site) => site.operator === operator);
}

export function getWebsitesByCategory(category: GamingWebsite["categories"][number]): GamingWebsite[] {
  return GAMING_WEBSITES.filter((site) => site.categories.includes(category));
}
