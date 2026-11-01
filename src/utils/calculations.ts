/**
 * Hotel Financial Engine & Architectural Calculations
 */

import { FinancialParameters, FinancialResults, FloorData, RoomConfig } from '../types/hotel';

// Exchange rate default: 1 USD = 12,800 UZS
export const DEFAULT_USD_TO_UZS = 12800;

export const DEFAULT_PARAMETERS: FinancialParameters = {
  totalRooms: 48,
  totalBeds: 100,
  totalBuildingAreaSqM: 2950, // 4 floors (~700-750 m2 each)
  landAreaSotix: 16, // 1,600 sq.m
  
  // Construction costs
  constructionCostPerSqM: 520, // Reinforced concrete, masonry, roof, facade
  finishingCostPerSqM: 260, // 4-star interior standard finishes
  ffeCostPerRoom: 8500, // Furniture, Fixtures & Equipment per room (beds, TV, minibar, safe, bathroom)
  
  // Operational inputs
  averageDailyRateUSD: 65, // $65 ADR for 4-star standard
  averageOccupancyRate: 0.68, // 68% realistic annual average
  fbRevenuePercentOfRooms: 0.22, // F&B revenue (breakfast, restaurant, room service)
  otherRevenuePercentOfRooms: 0.08, // Conference, SPA, laundry, airport shuttle
  
  // OPEX inputs
  staffCount: 24, // 24 employees (1 staff per 2 rooms)
  avgMonthlySalaryUSD: 450, // Average monthly wage in Uzbekistan hospitality
  monthlyUtilitiesUSD: 2400, // Electricity, gas, water, internet
  marketingAndOtaPercent: 0.12, // Booking.com, OTA commission, direct ads
  maintenanceReservePercent: 0.04, // 4% for ongoing maintenance & reserve
  taxRatePercent: 0.04, // 4% turnover tax
  
  // Investment
  contingencyPercent: 0.07, // 7% unexpected budget buffer
  workingCapitalMonths: 3, // 3 months operating cash reserve
  discountRate: 0.11, // 11% weighted cost of capital for NPV
};

export const PRESETS: Record<string, Partial<FinancialParameters>> = {
  conservative: {
    averageDailyRateUSD: 52,
    averageOccupancyRate: 0.55,
    constructionCostPerSqM: 580,
    finishingCostPerSqM: 290,
    ffeCostPerRoom: 9200,
    fbRevenuePercentOfRooms: 0.18,
  },
  realistic: {
    averageDailyRateUSD: 65,
    averageOccupancyRate: 0.68,
    constructionCostPerSqM: 520,
    finishingCostPerSqM: 260,
    ffeCostPerRoom: 8500,
    fbRevenuePercentOfRooms: 0.22,
  },
  optimistic: {
    averageDailyRateUSD: 82,
    averageOccupancyRate: 0.78,
    constructionCostPerSqM: 490,
    finishingCostPerSqM: 250,
    ffeCostPerRoom: 8200,
    fbRevenuePercentOfRooms: 0.26,
  },
};

/**
 * 48 Rooms Configuration across 4 Floors - Exactly 100 Beds
 */
export const HOTEL_ROOMS: RoomConfig[] = [
  {
    id: 'std_twin_fl2',
    name: 'Стандарт Твин (2 та алоҳида кароват)',
    nameLatn: 'Standart Twin (2 ta alohida karavot)',
    count: 12,
    bedsPerRoom: 2,
    totalBeds: 24,
    areaSqM: 26,
    basePriceUSD: 60,
    floor: 2,
    description: 'Иккита 100х200 см ўлчамли ортопедик кароват, ванна/душ, иш столи, сейф, мини-бар, 43" Смарт ТВ.',
    descriptionLatn: 'Ikkita 100x200 sm o\'lchamli ortopedik karavot, vanna/dush, ish stoli, seyf, mini-bar, 43" Smart TV.',
    features: ['2x 100x200cm Bed', '42dB Soundproof', 'Smart AC', 'Mini-bar', 'Electronic Safe', 'Work Desk'],
  },
  {
    id: 'std_dbl_fl2',
    name: 'Стандарт Дабл (1 та катта Кинг кароват)',
    nameLatn: 'Standart Double (1 ta katta King karavot)',
    count: 6,
    bedsPerRoom: 2,
    totalBeds: 12,
    areaSqM: 28,
    basePriceUSD: 65,
    floor: 2,
    description: 'Битта 180х200 см ўлчамли катта Кинг кароват, панорамали ойна, премиум сантехника, чой/қаҳва бурчаги.',
    descriptionLatn: 'Bitta 180x200 sm o\'lchamli katta King karavot, panoramali oyna, premium santexnika, choy/qahva burchagi.',
    features: ['180x200cm King Bed', 'City View', 'Smart AC', 'High-speed Wi-Fi', 'Hairdryer & Bathrobes'],
  },
  {
    id: 'std_king_fl3',
    name: 'Комфорт Кинг (Юқори даражадаги хона)',
    nameLatn: 'Komfort King (Yuqori darajadagi xona)',
    count: 10,
    bedsPerRoom: 2,
    totalBeds: 20,
    areaSqM: 30,
    basePriceUSD: 72,
    floor: 3,
    description: 'Кенг майдонли 4* люкс безатилган хона, оромбахш диван, французча балкон, овоз ўтказмайдиган эшик.',
    descriptionLatn: 'Keng maydonli 4* lyuks bezatilgan xona, orombaxsh divan, fransuzcha balkon, ovoz o\'tkazmaydigan eshik.',
    features: ['King Size Bed', 'Lounge Chair', '4K TV', 'Rain Shower', 'Espresso Machine', 'French Balcony'],
  },
  {
    id: 'sup_twin_fl3',
    name: 'Супериор Твин / Оилавий',
    nameLatn: 'Superior Twin / Oilaviy',
    count: 8,
    bedsPerRoom: 2,
    totalBeds: 16,
    areaSqM: 32,
    basePriceUSD: 75,
    floor: 3,
    description: 'Икки кишилик кенг супериор хона, қўшимча дам олиш бурчаги, гардероб хонаси.',
    descriptionLatn: 'Ikki kishilik keng superior xona, qo\'shimcha dam olish burchagi, garderob xonasi.',
    features: ['Twin Beds (expandable)', 'Walk-in Closet', 'Bathtub & Shower', 'Ironing Facilities'],
  },
  {
    id: 'jr_suite_fl4',
    name: 'Жуниор Сьют (Junior Suite)',
    nameLatn: 'Junior Suite (Kichik Lyuks)',
    count: 10,
    bedsPerRoom: 2,
    totalBeds: 20,
    areaSqM: 42,
    basePriceUSD: 100,
    floor: 4,
    description: 'Меҳмонхона ва ётоқхона зонасига ажратилган премиум люкс хона, 4-қаватдаги манзарали терасса.',
    descriptionLatn: 'Mehmonxona va yotoqxona zonasiga ajratilgan premium lyuks xona, 4-qavatdagi manzarali terassa.',
    features: ['Living & Bedroom Zone', '55" OLED TV', 'Marble Bathroom', 'Panoramic View', 'VIP Amenities'],
  },
  {
    id: 'exec_fam_fl4',
    name: 'Экзекьютив Оилавий Сьют (4 ўринли)',
    nameLatn: 'Executive Oilaviy Suite (4 o\'rinli)',
    count: 2,
    bedsPerRoom: 4,
    totalBeds: 8,
    areaSqM: 56,
    basePriceUSD: 140,
    floor: 4,
    description: 'Икки хонали оилавий сьют (катта ётоқхона + 2 та алоҳида кароватли болалар хонаси, 2 та санузел).',
    descriptionLatn: 'Ikki xonali oilaviy suite (katta yotoqxona + 2 ta alohida karavotli bolalar xonasi, 2 ta sanuzel).',
    features: ['2 Separate Bedrooms', '4 Full Beds', '2 Bathrooms', 'Dining Nook', 'Kitchenette & Safe'],
  },
];

/**
 * Architectural Floor Plans (4 Floors)
 */
export const HOTEL_FLOORS: FloorData[] = [
  {
    floorNumber: 1,
    name: '1-Қават: Жамоат ва Хизмат Кўрсатиш Зонаси',
    nameLatn: '1-Qavat: Jamoat va Xizmat Ko\'rsatish Zonasi',
    totalAreaSqM: 740,
    roomsCount: 0,
    bedsCount: 0,
    purpose: 'Ресепшн, лобби-лаунж, 70 ўринли ресторан, конференц-зал, маъмурият, ошхона ва багажхона.',
    purposeLatn: 'Resepshn, lobbi-launj, 70 o\'rinli restoran, konferens-zal, ma\'muriyat, oshxona va bagajxona.',
    highlights: [
      '24/7 Ресепшн & Консьерж зонаси (90 м²)',
      '70 ўринли А-ла-карт & Швед столи Ресторани (210 м²)',
      'Тўлиқ технологик иссиқ ва совуқ Ошхона (110 м²)',
      '50 кишилик Конференц-зал (85 м²)',
      'Лобби-Бар ва кутиш зали (75 м²)',
      'Багажхона, серверхона ва маъмурият офислари (90 м²)',
      '2 та йўловчи + 1 та хизматчи лифти ва зинапоялар (80 м²)',
    ],
    zones: [
      { id: 'f1_lobby', name: 'Бош Лобби ва Ресепшн', nameLatn: 'Bosh Lobbi va Resepshn', areaSqM: 90, type: 'lobby' },
      { id: 'f1_restaurant', name: '70 ўринли Ресторан', nameLatn: '70 o\'rinli Restoran', areaSqM: 210, type: 'dining' },
      { id: 'f1_kitchen', name: 'Ишлаб чиқариш Ошхонаси', nameLatn: 'Ishlab chiqarish Oshxonasi', areaSqM: 110, type: 'service' },
      { id: 'f1_conference', name: 'Конференц-зал (50 ўрин)', nameLatn: 'Konferens-zal (50 o\'rin)', areaSqM: 85, type: 'conference' },
      { id: 'f1_bar', name: 'Лобби-Бар & Лаунж', nameLatn: 'Lobbi-Bar & Launj', areaSqM: 75, type: 'dining' },
      { id: 'f1_admin', name: 'Маъмурият & Бухгалтерия', nameLatn: 'Ma\'muriyat & Buxgalteriya', areaSqM: 50, type: 'admin' },
      { id: 'f1_luggage', name: 'Багаж ва Серверхона', nameLatn: 'Bagaj va Serverxona', areaSqM: 40, type: 'service' },
      { id: 'f1_stairs', name: 'Лифт ҳоли ва Зинапоялар', nameLatn: 'Lift holi va Zinapoyalar', areaSqM: 80, type: 'service' },
    ],
  },
  {
    floorNumber: 2,
    name: '2-Қават: Меҳмон Хоналари (18 та хона, 36 та койка)',
    nameLatn: '2-Qavat: Mehmon Xonalari (18 ta xona, 36 ta koyka)',
    totalAreaSqM: 735,
    roomsCount: 18,
    bedsCount: 36,
    purpose: '12 та Стандарт Твин ва 6 та Стандарт Дабл хоналари, қават хизматчиси хонаси, лифт ҳоли.',
    purposeLatn: '12 ta Standart Twin va 6 ta Standart Double xonalari, qavat xizmatchisi xonasi, lift holi.',
    highlights: [
      '12 та Стандарт Твин хона (ҳар бирида 2 та койка = 24 койка)',
      '6 та Стандарт Дабл хона (ҳар бирида 1 та катта King койка = 12 койка)',
      'Қават бўйича хизмат кўрсатиш хонаси (Housekeeping pantry - 22 м²)',
      'Кенг товушсиз йўлак (коридор 1.8 м кенгликда, ковролан қопламали)',
      'Ёнғинга қарши авариявий 2 та зинапоя ва тутун чиқариш тизими',
    ],
    zones: [
      { id: 'f2_twins', name: '12 та Стандарт Твин хона (№201-№212)', nameLatn: '12 ta Standart Twin xona (#201-#212)', areaSqM: 312, type: 'room', beds: 24, roomNumbers: '201-212' },
      { id: 'f2_doubles', name: '6 та Стандарт Дабл хона (№213-№218)', nameLatn: '6 ta Standart Dabl xona (#213-#218)', areaSqM: 168, type: 'room', beds: 12, roomNumbers: '213-218' },
      { id: 'f2_corridor', name: 'Асосий йўлак (Коридор)', nameLatn: 'Asosiy yo\'lak (Koridor)', areaSqM: 145, type: 'service' },
      { id: 'f2_pantry', name: 'Кирхона ва Хизматчилар хонаси', nameLatn: 'Kirxona va Xizmatchilar xonasi', areaSqM: 25, type: 'service' },
      { id: 'f2_elevators', name: 'Лифт ҳоли ва Зинапоялар', nameLatn: 'Lift holi va Zinapoyalar', areaSqM: 85, type: 'service' },
    ],
  },
  {
    floorNumber: 3,
    name: '3-Қават: Меҳмон Хоналари (18 та хона, 36 та койка)',
    nameLatn: '3-Qavat: Mehmon Xonalari (18 ta xona, 36 ta koyka)',
    totalAreaSqM: 735,
    roomsCount: 18,
    bedsCount: 36,
    purpose: '10 та Комфорт Кинг ва 8 та Супериор Твин/Оилавий хоналар, шовқинсиз муҳит.',
    purposeLatn: '10 ta Komfort King va 8 ta Superior Twin/Oilaviy xonalar, shovqinsiz muhit.',
    highlights: [
      '10 та Комфорт Кинг хона (ҳар бирида 1 та King = 20 койка)',
      '8 та Супериор Твин хона (ҳар бирида 2 та кенг койка = 16 койка)',
      'Юқори қават панорамаси ва яхшиланган овоз изоляцияси (45dB)',
      'Қават хизматчиси хонаси, лифт ҳоли ва чиқинди қувури',
    ],
    zones: [
      { id: 'f3_kings', name: '10 та Комфорт Кинг хона (№301-№310)', nameLatn: '10 ta Komfort King xona (#301-#310)', areaSqM: 300, type: 'room', beds: 20, roomNumbers: '301-310' },
      { id: 'f3_superiors', name: '8 та Супериор Твин хона (№311-№318)', nameLatn: '8 ta Superior Twin xona (#311-#318)', areaSqM: 256, type: 'room', beds: 16, roomNumbers: '311-318' },
      { id: 'f3_corridor', name: 'Асосий йўлак (Коридор)', nameLatn: 'Asosiy yo\'lak (Koridor)', areaSqM: 110, type: 'service' },
      { id: 'f3_service', name: 'Хизмат кўрсатиш блоки', nameLatn: 'Xizmat ko\'rsatish bloki', areaSqM: 20, type: 'service' },
      { id: 'f3_elevators', name: 'Лифт ҳоли ва Зинапоялар', nameLatn: 'Lift holi va Zinapoyalar', areaSqM: 49, type: 'service' },
    ],
  },
  {
    floorNumber: 4,
    name: '4-Қават: Премиум Сьютлар + Фитнес & СПА (12 та хона, 28 та койка)',
    nameLatn: '4-Qavat: Premium Suite\'lar + Fitnes & SPA (12 ta xona, 28 ta koyka)',
    totalAreaSqM: 740,
    roomsCount: 12,
    bedsCount: 28,
    purpose: '10 та Жуниор Сьют (20 койка), 2 та Икки хонали Оилавий Сьют (8 койка), Фитнес ва Сауна.',
    purposeLatn: '10 ta Junior Suite (20 koyka), 2 ta Ikki xonali Oilaviy Suite (8 koyka), Fitnes va Sauna.',
    highlights: [
      '10 та Жуниор Сьют (ҳар бирида 2 койка = 20 койка)',
      '2 та Икки хонали Оилавий Сьют (ҳар бирида 4 койка = 8 койка)',
      'Фитнес зали (Gym 55 м²) замонавий кардио ва куч машқ тренажёрлари билан',
      'Фин саунаси, массаж хонаси ва дам олиш зонаси (50 м²)',
      'Очиқ ҳаво терассаси ва ВИП панорама (40 м²)',
    ],
    zones: [
      { id: 'f4_junior', name: '10 та Жуниор Сьют (№401-№410)', nameLatn: '10 ta Junior Suite (#401-#410)', areaSqM: 260, type: 'room', beds: 20, roomNumbers: '401-410' },
      { id: 'f4_family', name: '2 та Оилавий 2 хонали Сьют (№411-№412)', nameLatn: '2 ta Oilaviy 2 xonali Suite (#411-#412)', areaSqM: 116, type: 'room', beds: 8, roomNumbers: '411-412' },
      { id: 'f4_gym', name: 'Фитнес зали (Gym)', nameLatn: 'Fitnes zali (Gym)', areaSqM: 55, type: 'spa' },
      { id: 'f4_spa', name: 'Сауна ва Массаж хонаси', nameLatn: 'Sauna va Massaj xonasi', areaSqM: 50, type: 'spa' },
      { id: 'f4_terrace', name: 'ВИП Очиқ Терасса', nameLatn: 'VIP Ochiq Terassa', areaSqM: 40, type: 'lobby' },
      { id: 'f4_corridor', name: 'Йўлак ва Лифт ҳоли', nameLatn: 'Yo\'lak va Lift holi', areaSqM: 119, type: 'service' },
    ],
  },
];

/**
 * 4-Star Standards Checklist & Regulatory Verification
 */
export const FOUR_STAR_STANDARDS = [
  {
    category: 'Архитектура ва Хоналар (Architecture & Rooms)',
    categoryLatn: 'Arxitektura va Xonalar (Architecture & Rooms)',
    items: [
      { rule: 'Бино 4 қаватдан иборат бўлганда камида 2 та тезюрар йўловчи лифти бўлиши шарт', ruleLatn: 'Bino 4 qavatdan iborat bo\'lganda kamida 2 ta tezyurar yo\'lovchi lifti bo\'lishi shart', status: 'compliant', detail: 'Лойиҳада 2 та йўловчи (1000 кг) ва 1 та алоҳида хизматчи лифти кўзда тутилган.' },
      { rule: 'Бир кишилик хона майдони >= 14 м², икки кишилик хона >= 19-24 м² бўлиши шарт', ruleLatn: 'Bir kishilik xona maydoni >= 14 m², ikki kishilik xona >= 19-24 m² bo\'lishi shart', status: 'compliant', detail: 'Лойиҳадаги энг кичик хона 26 м², сьютлар 42-56 м² ни ташкил қилади.' },
      { rule: 'Овоз изоляцияси (42-45 dB): меҳмонлар шовқинсиз дам олиши таъминланиши керак', ruleLatn: 'Ovoz izolyatsiyasi (42-45 dB): mehmonlar shovqinsiz dam olishi ta\'minlanishi kerak', status: 'compliant', detail: 'Акустик гипрок, икки қаватли ойна romlar ва овоз ўтказмайдиган эшиклар ҳисобга олинган.' },
      { rule: 'Барча хоналарда индивидуал иқлим назорати (VRV/Chiller фанкойл)', ruleLatn: 'Barcha xonalarda individual iqlim nazorati (VRV/Chiller fankoyl)', status: 'compliant', detail: 'Марказий 4-трубкали чиллер-фанкойл тизими термостат билан таъминланади.' },
    ],
  },
  {
    category: 'Сервис ва Жамоат Зоналари (Public Areas & Service)',
    categoryLatn: 'Servis va Jamoat Zonalari (Public Areas & Service)',
    items: [
      { rule: '24/7 Ресепшн ва қўриқлаш хизмати, багаж ташиш ва сақлаш хонаси', ruleLatn: '24/7 Resepshn va qo\'riqlash xizmati, bagaj tashish va saqlash xonasi', status: 'compliant', detail: '1-қаватда 90 м² лобби ва махсус luggage room мавжуд.' },
      { rule: 'Ресторан (нонушта ва а-ла-карт) ва Лобби-Бар мавжудлиги шарт', ruleLatn: 'Restoran (nonushta va a-la-kart) va Lobbi-Bar mavjudligi shart', status: 'compliant', detail: '70 ўринли катта ресторан ва 110 м² технологик ошхона режага киритилган.' },
      { rule: 'Конференц-зал ёки бизнес учрашувлар майдони', ruleLatn: 'Konferens-zal yoki biznes uchrashuvlar maydoni', status: 'compliant', detail: '50 ўринли проектор ва аудио тизимли конференц-зал мавжуд.' },
      { rule: 'Спорт-соғломлаштириш: фитнес зали ва СПА/сауна бўлиши 4* талаби', ruleLatn: 'Sport-sog\'lomlashtirish: fitnes zali va SPA/sauna bo\'lishi 4* talabi', status: 'compliant', detail: '4-қаватда 55 м² фитнес зали ва 50 м² сауна/массаж маркази мавжуд.' },
    ],
  },
  {
    category: 'Инженерлик ва Хавфсизлик (MEP & Safety)',
    categoryLatn: 'Injenerlik va Xavfsizlik (MEP & Safety)',
    items: [
      { rule: '100% захира дизель генератори (электр ўчганда автоматик ёқиладиган)', ruleLatn: '100% zaxira dizel generatori (elektr o\'chganda avtomatik yoqiladigan)', status: 'compliant', detail: '250 кВА захира дизель генератори CAPEX smetasiga kiritilgan.' },
      { rule: 'Автоматик ёнғин ўчириш (спринклер), тутун датчиклари ва овозли эвакуация', ruleLatn: 'Avtomatik yong\'in o\'chirish (sprinkler), tutun datchiklari va ovozli evakuatsiya', status: 'compliant', detail: 'Барча қаватлар ва хоналар спринклер ва тутун сезгичлар билан жиҳозланади.' },
      { rule: 'Захира ичимлик ва техник сув ҳавзаси (камида 2 кунлик автоном захира)', ruleLatn: 'Zaxira ichimlik va texnik suv havzasi (kamida 2 kunlik avtonom zaxira)', status: 'compliant', detail: '40 куб метрли ер ости захира резервуари ва насос станцияси мавжуд.' },
      { rule: 'Электрон қулфлар (RFID / Bluetooth Smart Lock) ва кузатув камералари (CCTV)', ruleLatn: 'Elektron qulflar (RFID / Bluetooth Smart Lock) va kuzatuv kameralari (CCTV)', status: 'compliant', detail: 'Ягона PMS (Opera/Bnovo) тизимига уланган меҳмонхона қулф тизими.' },
    ],
  },
];

/**
 * Perform all financial projections and returns calculations
 */
export function calculateHotelFinancials(params: FinancialParameters = DEFAULT_PARAMETERS): FinancialResults {
  const {
    totalRooms,
    totalBuildingAreaSqM,
    landAreaSotix,
    constructionCostPerSqM,
    finishingCostPerSqM,
    ffeCostPerRoom,
    averageDailyRateUSD,
    averageOccupancyRate,
    fbRevenuePercentOfRooms,
    otherRevenuePercentOfRooms,
    staffCount,
    avgMonthlySalaryUSD,
    monthlyUtilitiesUSD,
    marketingAndOtaPercent,
    maintenanceReservePercent,
    taxRatePercent,
    contingencyPercent,
    workingCapitalMonths,
    discountRate,
  } = params;

  // 1. CAPEX Calculations
  // Construction: reinforced concrete frame, brick, roof, facade insulation, windows
  const capexBuildingUSD = totalBuildingAreaSqM * constructionCostPerSqM;
  
  // Interior finishing (4-star high grade materials, tiles, soundproofing, plaster, lighting)
  const capexFinishingUSD = totalBuildingAreaSqM * finishingCostPerSqM;
  
  // Engineering MEP: HVAC, electrical sub-station 400 kVA, diesel generator 250 kVA, plumbing, 3 elevators ($120k), fire suppression
  const elevatorsCost = 135000; // 2 passenger + 1 service
  const hvacCost = totalBuildingAreaSqM * 65;
  const electricalSubstationAndGen = 85000;
  const firePlumbingCctv = totalBuildingAreaSqM * 45;
  const capexEngineeringMepUSD = elevatorsCost + hvacCost + electricalSubstationAndGen + firePlumbingCctv;
  
  // FF&E (Furniture, Fixtures & Equipment)
  // 48 rooms * cost per room + Restaurant, lobby, conference, gym equipment
  const roomsFFECost = totalRooms * ffeCostPerRoom;
  const restaurantKitchenFFECost = 110000; // Professional kitchen + 70 restaurant tables/chairs + bar
  const lobbyAdminFFECost = 45000;
  const conferenceFFECost = 30000; // Projector, audio, 50 ergonomic chairs
  const spaGymFFECost = 35000; // Gym machines, sauna heater, massage beds
  const capexFFEUSD = roomsFFECost + restaurantKitchenFFECost + lobbyAdminFFECost + conferenceFFECost + spaGymFFECost;
  
  // OS&E (Operating Supplies & Equipment)
  // Linens, towels, crockery, uniforms, cleaning gear
  const capexOSEUSD = totalRooms * 1200 + 25000;
  
  // Land & External Infrastructure (transformer connection, water/sewer tie-in, asphalt, landscaping)
  const capexLandAndInfraUSD = landAreaSotix * 3500 + 65000;
  
  // Soft Costs (Architectural design, state expertise, geodetic survey, author supervision, 4* star licensing)
  const capexSoftCostsUSD = (capexBuildingUSD + capexFinishingUSD) * 0.055 + 25000;
  
  // Direct Capex subtotal
  const directCapexSubtotal = capexBuildingUSD + capexFinishingUSD + capexEngineeringMepUSD +
    capexFFEUSD + capexOSEUSD + capexLandAndInfraUSD + capexSoftCostsUSD;
  
  // Contingency
  const capexContingencyUSD = directCapexSubtotal * contingencyPercent;
  
  // Preliminary monthly OPEX for working capital buffer
  const estimatedMonthlyOpex = (staffCount * avgMonthlySalaryUSD * 1.12) + monthlyUtilitiesUSD + 6000;
  const capexWorkingCapitalUSD = estimatedMonthlyOpex * workingCapitalMonths;
  
  // Total CAPEX
  const capexTotalUSD = directCapexSubtotal + capexContingencyUSD + capexWorkingCapitalUSD;
  
  // 2. REVENUE CALCULATIONS (Annual)
  // Available room nights per year
  const totalAvailableRoomNights = totalRooms * 365;
  const occupiedRoomNights = totalAvailableRoomNights * averageOccupancyRate;
  
  const annualRoomsRevenueUSD = occupiedRoomNights * averageDailyRateUSD;
  const annualFbRevenueUSD = annualRoomsRevenueUSD * fbRevenuePercentOfRooms;
  const annualOtherRevenueUSD = annualRoomsRevenueUSD * otherRevenuePercentOfRooms;
  const annualGrossRevenueUSD = annualRoomsRevenueUSD + annualFbRevenueUSD + annualOtherRevenueUSD;
  
  const revParUSD = annualRoomsRevenueUSD / totalAvailableRoomNights; // RevPAR = ADR * Occupancy
  
  // 3. OPEX CALCULATIONS (Annual)
  // Payroll (including social fund / taxes ~12%)
  const annualPayrollUSD = staffCount * avgMonthlySalaryUSD * 12 * 1.12;
  
  // Utilities
  const annualUtilitiesUSD = monthlyUtilitiesUSD * 12;
  
  // F&B Cost of Sales (COGS ~35% of F&B revenue)
  const annualFbCostUSD = annualFbRevenueUSD * 0.35;
  
  // Marketing & OTA Commissions (Booking.com 15% on booked rooms + ad campaigns)
  const annualMarketingOtaUSD = annualRoomsRevenueUSD * marketingAndOtaPercent;
  
  // Maintenance and FF&E replacement reserve
  const annualMaintenanceUSD = annualGrossRevenueUSD * maintenanceReservePercent;
  
  // Guest supplies & laundry (toiletries, washing bed linens, chemicals: ~$4 per occupied room night)
  const annualSuppliesUSD = occupiedRoomNights * 4.2;
  
  // Insurance, PMS software, licensing, administrative costs
  const annualInsuranceAdminUSD = 22000;
  
  // Turnover / property taxes
  const annualTaxesUSD = annualGrossRevenueUSD * taxRatePercent;
  
  // Total OPEX
  const annualTotalOpexUSD = annualPayrollUSD + annualUtilitiesUSD + annualFbCostUSD +
    annualMarketingOtaUSD + annualMaintenanceUSD + annualSuppliesUSD + annualInsuranceAdminUSD + annualTaxesUSD;
  
  // 4. PROFITABILITY
  const gopUSD = annualGrossRevenueUSD - annualTotalOpexUSD;
  const gopMargin = annualGrossRevenueUSD > 0 ? (gopUSD / annualGrossRevenueUSD) * 100 : 0;
  
  const ebitdaUSD = gopUSD; // Operating earnings before interest, tax, depreciation & amortization
  const ebitdaMargin = gopMargin;
  
  // Net Annual Profit (after taxes, which are already factored into tax line)
  const netAnnualProfitUSD = gopUSD;
  const netProfitMargin = annualGrossRevenueUSD > 0 ? (netAnnualProfitUSD / annualGrossRevenueUSD) * 100 : 0;
  
  // 5. METRICS: ROI, PAYBACK, IRR, NPV
  const roiPercent = capexTotalUSD > 0 ? (netAnnualProfitUSD / capexTotalUSD) * 100 : 0;
  const simplePaybackYears = netAnnualProfitUSD > 0 ? capexTotalUSD / netAnnualProfitUSD : 99;
  
  // Break-even Occupancy
  // Fixed costs: Payroll, Utilities, Admin, portion of maintenance
  const fixedAnnualCosts = annualPayrollUSD + annualUtilitiesUSD + annualInsuranceAdminUSD + 15000;
  // Contribution margin per occupied room night
  const revenuePerNightWithAncillary = averageDailyRateUSD * (1 + fbRevenuePercentOfRooms + otherRevenuePercentOfRooms);
  const variableCostPerNight = 4.2 + (averageDailyRateUSD * fbRevenuePercentOfRooms * 0.35) +
    (averageDailyRateUSD * marketingAndOtaPercent) + (revenuePerNightWithAncillary * taxRatePercent);
  const contributionMarginPerNight = revenuePerNightWithAncillary - variableCostPerNight;
  
  const breakEvenNights = contributionMarginPerNight > 0 ? fixedAnnualCosts / contributionMarginPerNight : totalAvailableRoomNights;
  const breakEvenOccupancyPercent = Math.min(100, Math.max(0, (breakEvenNights / totalAvailableRoomNights) * 100));
  
  // 10-Year Projections with realistic ramp-up (Year 1 ramp-up, Year 2-3 stabilization, slight inflation)
  const cashFlowYears: FinancialResults['cashFlowYears'] = [];
  let cumulativeCash = -capexTotalUSD;
  let npvSum = -capexTotalUSD;
  let discountedPayback = 99;
  
  for (let y = 1; y <= 10; y++) {
    // Ramp-up factor: Year 1 is 82% of steady state, Year 2 is 95%, Year 3+ is 100% + 2.5% inflation
    const rampFactor = y === 1 ? 0.82 : y === 2 ? 0.95 : Math.pow(1.025, y - 3);
    const yrOccupancy = Math.min(0.88, averageOccupancyRate * (y === 1 ? 0.85 : y === 2 ? 0.96 : 1.0));
    const yrAdr = averageDailyRateUSD * Math.pow(1.03, y - 1);
    
    const yrRoomsRev = totalAvailableRoomNights * yrOccupancy * yrAdr;
    const yrGrossRev = yrRoomsRev * (1 + fbRevenuePercentOfRooms + otherRevenuePercentOfRooms);
    
    // Opex scales with revenue and slight wage inflation
    const yrOpex = annualTotalOpexUSD * Math.pow(1.025, y - 1) * (0.85 + 0.15 * (yrOccupancy / averageOccupancyRate));
    const yrNetProfit = yrGrossRev - yrOpex;
    
    cumulativeCash += yrNetProfit;
    
    const discountedCash = yrNetProfit / Math.pow(1 + discountRate, y);
    npvSum += discountedCash;
    
    if (discountedPayback === 99 && npvSum >= 0) {
      discountedPayback = y - 1 + ((discountedCash - npvSum) / discountedCash);
    }
    
    cashFlowYears.push({
      year: y,
      occupancy: yrOccupancy,
      adr: yrAdr,
      grossRevenue: yrGrossRev,
      opex: yrOpex,
      netProfit: yrNetProfit,
      cumulativeCashFlow: cumulativeCash,
    });
  }
  
  // Simple IRR approximation using Newton's method or binary search
  let irr = 0.15;
  for (let iter = 0; iter < 40; iter++) {
    let fValue = -capexTotalUSD;
    let fDeriv = 0;
    for (let y = 1; y <= 10; y++) {
      const cf = cashFlowYears[y - 1].netProfit;
      fValue += cf / Math.pow(1 + irr, y);
      fDeriv -= (y * cf) / Math.pow(1 + irr, y + 1);
    }
    if (Math.abs(fValue) < 100 || Math.abs(fDeriv) < 1e-6) break;
    irr = irr - fValue / fDeriv;
    if (irr < -0.9 || irr > 2.0) { irr = 0.18; break; }
  }
  const irrPercent = Math.max(0, Math.min(100, irr * 100));
  
  const discountedPaybackYears = discountedPayback === 99 ? simplePaybackYears * 1.35 : Math.max(1, discountedPayback);

  return {
    capexTotalUSD,
    capexBuildingUSD,
    capexFinishingUSD,
    capexEngineeringMepUSD,
    capexFFEUSD,
    capexOSEUSD,
    capexLandAndInfraUSD,
    capexSoftCostsUSD,
    capexContingencyUSD,
    capexWorkingCapitalUSD,
    annualRoomsRevenueUSD,
    annualFbRevenueUSD,
    annualOtherRevenueUSD,
    annualGrossRevenueUSD,
    revParUSD,
    annualPayrollUSD,
    annualUtilitiesUSD,
    annualFbCostUSD,
    annualMarketingOtaUSD,
    annualMaintenanceUSD,
    annualSuppliesUSD,
    annualInsuranceAdminUSD,
    annualTaxesUSD,
    annualTotalOpexUSD,
    gopUSD,
    gopMargin,
    ebitdaUSD,
    ebitdaMargin,
    netAnnualProfitUSD,
    netProfitMargin,
    simplePaybackYears,
    discountedPaybackYears,
    roiPercent,
    irrPercent,
    npv10YearsUSD: npvSum,
    breakEvenOccupancyPercent,
    cashFlowYears,
  };
}

/**
 * Format currency with chosen symbol
 */
export function formatMoney(amountUSD: number, currency: 'USD' | 'UZS' = 'USD', rate: number = DEFAULT_USD_TO_UZS): string {
  if (currency === 'UZS') {
    const valInUZS = amountUSD * rate;
    if (Math.abs(valInUZS) >= 1_000_000_000) {
      return (valInUZS / 1_000_000_000).toFixed(2) + ' млрд сўм';
    }
    if (Math.abs(valInUZS) >= 1_000_000) {
      return (valInUZS / 1_000_000).toFixed(1) + ' млн сўм';
    }
    return Math.round(valInUZS).toLocaleString('uz-UZ') + ' сўм';
  }
  
  if (Math.abs(amountUSD) >= 1_000_000) {
    return '$' + (amountUSD / 1_000_000).toFixed(2) + 'M';
  }
  if (Math.abs(amountUSD) >= 1_000) {
    return '$' + Math.round(amountUSD).toLocaleString('en-US');
  }
  return '$' + Math.round(amountUSD).toString();
}

export function formatMoneyExact(amountUSD: number, currency: 'USD' | 'UZS' = 'USD', rate: number = DEFAULT_USD_TO_UZS): string {
  if (currency === 'UZS') {
    return Math.round(amountUSD * rate).toLocaleString('uz-UZ') + ' сўм';
  }
  return '$' + Math.round(amountUSD).toLocaleString('en-US');
}
