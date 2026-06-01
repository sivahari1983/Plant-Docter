// Static plant nutritional database. Keywords matched against MobileNet ImageNet predictions.
const entries = [
  {
    id: 'tomato',
    keywords: ['tomato', 'tomatoes'],
    plantName: 'Tomato (Solanum lycopersicum)',
    description: 'A popular fruiting vegetable that is a heavy feeder, especially during fruit set.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'Reduce N at first flower – excess causes leafy growth, fewer fruits.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Apply bone meal or superphosphate to support root and flower development.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Add potassium sulfate or wood ash for firm, flavourful fruit.' },
      { name: 'Calcium (Ca)', status: 'deficient', recommendation: 'Crushed eggshells or gypsum prevents blossom-end rot – apply monthly.' },
      { name: 'Magnesium (Mg)', status: 'low', recommendation: 'Epsom salt foliar spray (1 tbsp/litre) every 2 weeks prevents yellowing.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Maintain soil pH 6.0–6.8 to keep iron available.' },
    ],
    careAdvice: 'Water deeply and consistently; mulch to retain moisture and prevent blossom-end rot.',
    fertilizerSuggestions: [
      'Use a 5-10-10 fertilizer at planting, switch to 8-32-16 at first flower.',
      'Side-dress with compost every 3–4 weeks.',
      'Foliar-feed with liquid seaweed for micronutrients.',
    ],
    deficiencySymptoms: 'Yellowing lower leaves indicate N or Mg deficiency; dark brown spots on fruit bottom signal calcium deficiency.',
  },
  {
    id: 'pepper',
    keywords: ['bell pepper', 'pepper', 'chili', 'capsicum', 'jalapeno'],
    plantName: 'Pepper (Capsicum annuum)',
    description: 'A warm-season vegetable that needs balanced nutrition for abundant fruiting.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'Moderate N throughout – too much delays fruiting.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Work bone meal into the soil at transplant time.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate improves fruit size and disease resistance.' },
      { name: 'Calcium (Ca)', status: 'low', recommendation: 'Add lime or gypsum to prevent blossom-end rot.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Monthly Epsom salt drench maintains healthy foliage.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Chelated iron if leaves show interveinal chlorosis.' },
    ],
    careAdvice: 'Peppers love heat; keep soil evenly moist and support heavy branches as fruit develops.',
    fertilizerSuggestions: [
      'Tomato fertilizer (balanced NPK) works well for peppers.',
      'Liquid fish emulsion every 2 weeks during fruiting.',
      'Kelp meal improves stress tolerance.',
    ],
    deficiencySymptoms: 'Yellowing young leaves and deformed fruit tips are early calcium deficiency signs.',
  },
  {
    id: 'cucumber',
    keywords: ['cucumber', 'zucchini', 'courgette', 'squash', 'marrow', 'gourd', 'melon'],
    plantName: 'Cucumber / Squash (Cucurbit family)',
    description: 'Fast-growing vining vegetables with high water and moderate nutrient requirements.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply nitrogen-rich fertilizer every 3 weeks; vines are heavy feeders.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Adequate phosphorus supports root health.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium-rich feed improves fruit quality and shelf life.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Consistent watering prevents calcium uptake issues.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Monitor for interveinal chlorosis on older leaves.' },
      { name: 'Boron (B)', status: 'low', recommendation: 'A tiny borax solution (1 tsp/4L) prevents hollow fruit.' },
    ],
    careAdvice: 'Keep soil consistently moist; dry spells cause bitterness. Train vines to a trellis to improve air circulation.',
    fertilizerSuggestions: [
      '10-10-10 balanced fertilizer at planting.',
      'Switch to a low-nitrogen, high-potassium feed at flowering.',
      'Compost side-dressing every 4 weeks.',
    ],
    deficiencySymptoms: 'Yellowing between leaf veins (Mg deficiency); bitter cucumbers indicate calcium/water stress.',
  },
  {
    id: 'broccoli',
    keywords: ['broccoli', 'cauliflower'],
    plantName: 'Broccoli / Cauliflower (Brassica oleracea)',
    description: 'Cool-season brassicas that require nitrogen-rich soil to produce large, dense heads.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'deficient', recommendation: 'Brassicas need heavy nitrogen – apply blood meal or fish meal monthly.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Rock phosphate at planting supports head formation.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Wood ash around the base keeps potassium levels up.' },
      { name: 'Boron (B)', status: 'low', recommendation: 'Hollow stems and browning indicate boron deficiency – use borax solution.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Epsom salt spray prevents premature yellowing of outer leaves.' },
      { name: 'Sulfur (S)', status: 'sufficient', recommendation: 'Sulfur contributes to the characteristic flavour compounds.' },
    ],
    careAdvice: 'Side-dress with nitrogen fertilizer 3 weeks after transplanting; blanch cauliflower by tying leaves over the head.',
    fertilizerSuggestions: [
      'High-nitrogen fertilizer such as 21-0-0 or blood meal.',
      'Compost-rich soil reduces fertilizer needs.',
      'Kelp or seaweed extract provides micronutrients.',
    ],
    deficiencySymptoms: 'Pale yellow-green leaves and stunted heads indicate severe nitrogen deficiency.',
  },
  {
    id: 'cabbage',
    keywords: ['cabbage', 'kale', 'lettuce', 'spinach', 'bok choy', 'chard', 'collard'],
    plantName: 'Leafy Greens (Brassica / Spinacia)',
    description: 'Nitrogen-hungry leafy vegetables that grow quickly in cool conditions.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply a balanced vegetable fertilizer or fish emulsion every 2–3 weeks.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Adequate phosphorus supports strong root systems.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Maintain potassium for disease resistance.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron corrects yellowing between veins on young leaves.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Tip-burn on lettuce signals calcium uptake issue – improve ventilation.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Older leaf yellowing may indicate magnesium depletion.' },
    ],
    careAdvice: 'Keep soil consistently moist; harvest outer leaves regularly to encourage continuous production.',
    fertilizerSuggestions: [
      'Liquid fish emulsion every 2 weeks.',
      'Blood meal side-dressing for fast nitrogen release.',
      'Compost mulch suppresses weeds and feeds slowly.',
    ],
    deficiencySymptoms: 'Pale, stunted growth is typical of nitrogen deficiency; brown leaf edges indicate tip-burn from calcium stress.',
  },
  {
    id: 'corn',
    keywords: ['corn', 'maize', 'corn cob'],
    plantName: 'Corn / Maize (Zea mays)',
    description: 'A tall grass crop that is one of the heaviest nitrogen feeders in the garden.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'deficient', recommendation: 'Side-dress with urea or blood meal when plants are knee-high and again at tasselling.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Incorporate superphosphate before planting to support root development.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate improves stalk strength and drought tolerance.' },
      { name: 'Zinc (Zn)', status: 'low', recommendation: 'Zinc sulfate spray corrects striping on young leaves.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic lime addresses both Mg deficiency and pH.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Ensure soil pH below 7 to keep iron available.' },
    ],
    careAdvice: 'Plant in blocks of 4+ rows for good wind pollination; water deeply during silking and tasselling stages.',
    fertilizerSuggestions: [
      'High-nitrogen fertilizer (30-0-0) at knee-height stage.',
      '10-10-10 balanced fertilizer at planting.',
      'Composted manure worked in before sowing.',
    ],
    deficiencySymptoms: 'Yellow striping on leaves is zinc deficiency; pale green lower leaves signal nitrogen shortage.',
  },
  {
    id: 'strawberry',
    keywords: ['strawberry', 'strawberries'],
    plantName: 'Strawberry (Fragaria × ananassa)',
    description: 'A low-growing berry that needs balanced nutrition for sweet, plentiful fruit.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply a slow-release balanced fertilizer in early spring as growth resumes.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Bone meal at planting supports root and fruit development.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate in summer improves sweetness and firmness.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Adequate calcium prevents tip-burn and crumbly fruit.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Maintain Mg for deep leaf colour and photosynthesis.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Acidify the soil slightly (pH 5.5–6.5) to improve iron availability.' },
    ],
    careAdvice: 'Mulch around plants to keep fruit clean and retain moisture; remove runners to direct energy into fruit.',
    fertilizerSuggestions: [
      'Balanced 10-10-10 fertilizer in early spring.',
      'Liquid seaweed feed every 2 weeks from flower to harvest.',
      'Avoid high-nitrogen feeds in summer – promotes leaves over fruit.',
    ],
    deficiencySymptoms: 'Yellow-green leaves with green veins in young foliage suggests iron or manganese deficiency.',
  },
  {
    id: 'lemon',
    keywords: ['lemon', 'lime', 'citrus', 'orange', 'grapefruit', 'mandarin'],
    plantName: 'Citrus (Citrus spp.)',
    description: 'Evergreen fruit trees that are heavy feeders with specific micronutrient requirements.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply specialised citrus fertilizer 3× per year (spring, summer, autumn).' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Established citrus rarely needs extra phosphorus.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium improves rind quality and disease resistance; use citrus food.' },
      { name: 'Iron (Fe)', status: 'deficient', recommendation: 'Chelated iron spray corrects common yellowing between veins (chlorosis).' },
      { name: 'Zinc (Zn)', status: 'low', recommendation: 'Zinc sulfate foliar spray prevents small, mottled leaves.' },
      { name: 'Manganese (Mn)', status: 'low', recommendation: 'Manganese sulfate spray corrects pale interveinal chlorosis.' },
    ],
    careAdvice: 'Citrus prefers slightly acid soil (pH 6.0–7.0); deep, infrequent watering is better than frequent shallow watering.',
    fertilizerSuggestions: [
      'Dedicated citrus & fruit tree fertilizer (5-2-6 or similar).',
      'Controlled-release granules in spring and late summer.',
      'Chelated micronutrient spray in spring for a quick green-up.',
    ],
    deficiencySymptoms: 'Yellow leaves with dark-green veins (Fe/Mn deficiency); pale overall colour (N deficiency); small fruit (K deficiency).',
  },
  {
    id: 'banana',
    keywords: ['banana', 'plantain', 'musa'],
    plantName: 'Banana (Musa spp.)',
    description: 'A fast-growing tropical plant with very high potassium and nitrogen requirements.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply high-nitrogen fertilizer monthly during the growing season.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Moderate phosphorus supports vigorous root growth.' },
      { name: 'Potassium (K)', status: 'deficient', recommendation: 'Bananas need huge amounts of potassium – apply potassium sulfate every 6 weeks.' },
      { name: 'Magnesium (Mg)', status: 'low', recommendation: 'Dolomitic lime or Epsom salts correct yellowing between leaf veins.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Ensure even watering to support calcium uptake.' },
      { name: 'Zinc (Zn)', status: 'low', recommendation: 'Zinc sulfate spray prevents "bunchy top" symptoms.' },
    ],
    careAdvice: 'Bananas are heavy feeders and heavy drinkers – water and fertilize generously during warm months.',
    fertilizerSuggestions: [
      '8-10-8 balanced fertilizer monthly.',
      'High-potassium fertilizer (muriate of potash) every 6 weeks.',
      'Compost mulch 15 cm deep around the base conserves moisture.',
    ],
    deficiencySymptoms: 'Pale yellow leaves with necrotic edges indicate potassium deficiency; yellowing veins suggest magnesium shortage.',
  },
  {
    id: 'pineapple',
    keywords: ['pineapple'],
    plantName: 'Pineapple (Ananas comosus)',
    description: 'A bromeliad grown for its sweet fruit; slow-growing with moderate nutrient needs.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Foliar nitrogen spray (urea solution) every 2 months speeds growth.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Good drainage is more critical than phosphorus levels.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate improves fruit size and sweetness.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron corrects yellowing in the heart of the plant.' },
      { name: 'Zinc (Zn)', status: 'sufficient', recommendation: 'Adequate zinc supports normal fruit development.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic lime maintains Mg and corrects soil pH.' },
    ],
    careAdvice: 'Pineapples tolerate drought but fruit better with consistent moisture; plant in full sun.',
    fertilizerSuggestions: [
      'Balanced liquid fertilizer (6-6-6) monthly.',
      'Foliar urea spray (2%) for fast nitrogen.',
      'Potassium sulfate side-dress when fruit begins to swell.',
    ],
    deficiencySymptoms: 'Red-purple leaf edges indicate phosphorus deficiency; yellow central leaves signal iron deficiency.',
  },
  {
    id: 'fig',
    keywords: ['fig', 'ficus', 'mulberry'],
    plantName: 'Fig (Ficus carica)',
    description: 'A hardy fruiting tree that thrives with moderate nutrients and good drainage.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply balanced fertilizer in early spring; over-feeding causes leafy growth at the expense of fruit.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Established figs rarely need extra phosphorus.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate in early summer improves fruit quality.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Lime application maintains soil pH and calcium.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Healthy figs rarely show magnesium deficiency.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Chelated iron if grown in alkaline soil above pH 7.' },
    ],
    careAdvice: 'Figs prefer slightly dry conditions; stop fertilizing after midsummer to encourage dormancy.',
    fertilizerSuggestions: [
      '8-8-8 balanced fertilizer in early spring.',
      'Compost mulch is often sufficient for established trees.',
      'Avoid high-nitrogen feeds after June.',
    ],
    deficiencySymptoms: 'Pale leaves with green veins signal iron deficiency; small, dry figs may indicate potassium shortage.',
  },
  {
    id: 'artichoke',
    keywords: ['artichoke'],
    plantName: 'Artichoke (Cynara cardunculus)',
    description: 'A large thistle-like perennial vegetable with high nitrogen and water requirements.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Side-dress with blood meal or fish meal monthly during active growth.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Bone meal at planting supports strong basal growth.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Potassium helps maintain disease resistance.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic limestone corrects both Mg and pH issues.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Iron levels are usually adequate in slightly acid soil.' },
      { name: 'Boron (B)', status: 'low', recommendation: 'A borax solution prevents hollow centres in artichoke heads.' },
    ],
    careAdvice: 'Artichokes need deep, rich soil and plenty of water; cut heads before they open for best flavour.',
    fertilizerSuggestions: [
      'High-nitrogen vegetable fertilizer monthly.',
      'Well-rotted manure dug in before planting.',
      'Liquid seaweed for micronutrients every 3–4 weeks.',
    ],
    deficiencySymptoms: 'Yellowing older leaves indicate nitrogen deficiency; browning head scales suggest boron deficiency.',
  },
  {
    id: 'mushroom',
    keywords: ['mushroom', 'agaric', 'fungus', 'toadstool', 'chanterelle'],
    plantName: 'Mushroom / Fungi',
    description: 'Fungi are not plants – they obtain nutrients from organic matter rather than the soil.',
    nutrients: [
      { name: 'Carbon (C)', status: 'sufficient', recommendation: 'Provide hardwood sawdust, straw, or logs as a growing substrate.' },
      { name: 'Nitrogen (C:N ratio)', status: 'low', recommendation: 'Mix substrate to a C:N ratio of 25:1–40:1 for best fruiting.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Trace minerals in natural substrate are usually adequate.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Balanced substrate provides sufficient potassium.' },
      { name: 'Moisture', status: 'low', recommendation: 'Maintain 60–80% substrate moisture; mist daily during fruiting.' },
      { name: 'pH', status: 'sufficient', recommendation: 'Most edible mushrooms prefer a slightly acid substrate (pH 6.0–7.0).' },
    ],
    careAdvice: 'Sterilise substrate before inoculation; keep fruiting area humid, shaded, and well-ventilated.',
    fertilizerSuggestions: [
      'Do not add fertilizers – they can promote contamination.',
      'Wheat bran or rice bran (5–10%) added to substrate boosts yields.',
      'Coffee grounds are a free nitrogen supplement for oyster mushrooms.',
    ],
    deficiencySymptoms: 'Thin, stunted fruiting bodies indicate inadequate substrate nutrition or low moisture.',
  },
  {
    id: 'rose',
    keywords: ['rose', 'roses'],
    plantName: 'Rose (Rosa spp.)',
    description: 'A classic flowering shrub that is a heavy feeder and especially responsive to balanced fertilization.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Apply high-nitrogen feed in early spring for lush foliage.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Bone meal in spring and autumn promotes abundant blooms.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate improves disease resistance and bloom colour.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron spray corrects yellow leaves with green veins (chlorosis).' },
      { name: 'Magnesium (Mg)', status: 'low', recommendation: 'Epsom salt (1 tbsp/litre) every 2 weeks deepens leaf colour.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Garden lime keeps pH optimal and calcium adequate.' },
    ],
    careAdvice: 'Feed roses every 4–6 weeks from spring to late summer; stop feeding 6 weeks before the first frost.',
    fertilizerSuggestions: [
      'Dedicated rose fertilizer (e.g. 5-10-5) in spring.',
      'Alfalfa meal or pellets as a natural slow-release booster.',
      'Liquid seaweed every 2 weeks during the growing season.',
    ],
    deficiencySymptoms: 'Yellow leaves with green veins (iron deficiency); pale overall growth (nitrogen); sparse blooms (phosphorus).',
  },
  {
    id: 'sunflower',
    keywords: ['sunflower', 'sunflowers'],
    plantName: 'Sunflower (Helianthus annuus)',
    description: 'A tall, fast-growing annual that needs high nitrogen in youth and potassium at flowering.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Side-dress with blood meal or ammonium sulfate at 30 and 60 days.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Triple superphosphate at planting supports root development.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Switch to a high-potassium feed as the bud develops.' },
      { name: 'Boron (B)', status: 'low', recommendation: 'Borax foliar spray prevents hollow stems and poor seed set.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic lime at soil prep keeps Mg levels adequate.' },
      { name: 'Zinc (Zn)', status: 'sufficient', recommendation: 'Zinc sulfate spray if young leaves show interveinal yellowing.' },
    ],
    careAdvice: 'Plant in full sun; stake tall varieties; water deeply but infrequently once established.',
    fertilizerSuggestions: [
      '10-10-10 balanced fertilizer at planting.',
      'High-nitrogen fertilizer at 4 and 8 weeks.',
      'Switch to 5-10-15 fertilizer at bud formation.',
    ],
    deficiencySymptoms: 'Pale lower leaves (N deficiency); hollow, brittle stems (boron); stunted growth with dark leaves (phosphorus).',
  },
  {
    id: 'daisy',
    keywords: ['daisy', 'daisies', 'chrysanthemum', 'aster', 'marigold', 'zinnia', 'cosmos', 'gerbera'],
    plantName: 'Daisy & Composite Flowers',
    description: 'Members of the Asteraceae family – low-maintenance flowers with moderate nutrient needs.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'A light balanced feed in spring is usually all that is needed.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Bone meal worked into the soil promotes prolific blooming.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium improves disease resistance and flower longevity.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Chelated iron if leaves yellow between veins.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Garden lime maintains appropriate pH.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Occasional Epsom salt foliar spray keeps leaves dark green.' },
    ],
    careAdvice: 'Deadhead spent flowers regularly to prolong the flowering season; divide perennial clumps every 2–3 years.',
    fertilizerSuggestions: [
      'Balanced flower fertilizer (5-10-5) in early spring.',
      'Liquid tomato feed every 2 weeks during flowering.',
      'Compost mulch provides slow-release nutrients.',
    ],
    deficiencySymptoms: 'Sparse blooms with lush green leaves indicate excess nitrogen; pale flowers may signal phosphorus deficiency.',
  },
  {
    id: 'tulip',
    keywords: ['tulip', 'tulips', 'daffodil', 'narcissus', 'hyacinth', 'crocus', 'lily', 'gladiolus'],
    plantName: 'Bulb Flowers (Tulip, Lily, etc.)',
    description: 'Spring or summer bulbs that store nutrients in the bulb; feeding after flowering is key.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'Avoid high N during flowering – it promotes leaf growth over blooms.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Bone meal or superphosphate at planting time builds strong bulbs.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate after flowering helps the bulb replenish stored energy.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Neutral to slightly alkaline soil suits most bulbs.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic lime maintains Mg in the soil.' },
      { name: 'Boron (B)', status: 'sufficient', recommendation: 'Boron supports pollen development and seed set.' },
    ],
    careAdvice: 'Allow foliage to die back naturally after flowering so the bulb can recharge for next year.',
    fertilizerSuggestions: [
      'Bulb-specific fertilizer (5-10-12) at planting.',
      'Low-nitrogen liquid feed after flowers fade.',
      'Compost top-dressing in autumn.',
    ],
    deficiencySymptoms: 'Stunted stems and poor flowering indicate bulbs did not receive adequate nutrition during the previous year.',
  },
  {
    id: 'orchid',
    keywords: ['orchid', 'orchids'],
    plantName: 'Orchid (Orchidaceae family)',
    description: 'Elegant flowering plants with very specific, minimal fertilizer needs and high humidity requirements.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Use a dilute balanced orchid fertilizer (20-20-20) weekly at ¼ strength.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Switch to a bloom-booster (10-30-20) when a flower spike appears.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'High potassium during bloom improves flower count and longevity.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Use rainwater or filtered water to avoid calcium salt build-up.' },
      { name: 'Magnesium (Mg)', status: 'low', recommendation: 'Monthly Epsom salt solution (1 tsp/4L) prevents yellowing leaves.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Orchid-specific fertilizer contains adequate chelated iron.' },
    ],
    careAdvice: '"Weekly, weakly" – water and fertilize lightly every week; flush with plain water monthly to remove salt build-up.',
    fertilizerSuggestions: [
      'Orchid-specific fertilizer at ¼ recommended strength.',
      'Bloom-booster fertilizer (10-30-20) when spike forms.',
      'Pure rainwater or reverse-osmosis water minimises salt accumulation.',
    ],
    deficiencySymptoms: 'Dark-green, floppy leaves with no blooms usually indicate too much nitrogen; yellowing suggests magnesium deficiency.',
  },
  {
    id: 'lotus',
    keywords: ['lotus', 'water lily', 'nymphaea', 'water hyacinth', 'water plant', 'aquatic'],
    plantName: 'Aquatic Plant (Lotus / Water Lily)',
    description: 'Aquatic flowering plants that draw nutrients from pond sediment and specialised fertiliser tablets.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Push slow-release aquatic fertilizer tabs into the growing medium every 4–6 weeks.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Aquatic plant tablets contain the phosphorus needed for blooming.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Potassium from pond sediment is usually sufficient.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Aquatic iron tabs prevent yellowing leaves and encourage vibrant colour.' },
      { name: 'Carbon (CO₂)', status: 'low', recommendation: 'Underwater plants benefit from CO₂ injection in clear water.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Hard water supplies calcium; soft water may need calcium tabs.' },
    ],
    careAdvice: 'Plant in heavy loam, not potting mix; never use organic matter that will rot and cloud the water.',
    fertilizerSuggestions: [
      'Aquatic plant fertilizer tabs pushed into the pot.',
      'Osmocote or Ozmocote aquatic slow-release pellets.',
      'Avoid liquid fertilizers in ponds – they promote algae.',
    ],
    deficiencySymptoms: 'Yellow leaves with dark veins signal iron deficiency; pale, undersized pads indicate nitrogen shortage.',
  },
  {
    id: 'hibiscus',
    keywords: ['hibiscus', 'mallow', 'hollyhock', 'bougainvillea', 'tropical flower'],
    plantName: 'Hibiscus (Hibiscus rosa-sinensis)',
    description: 'A tropical flowering shrub that blooms in response to consistent feeding and warm conditions.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Feed with high-nitrogen fertilizer monthly during spring and summer.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Moderate phosphorus supports healthy roots and flower production.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'High potassium feed triggers prolific flowering; use hibiscus fertilizer.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron spray corrects common interveinal yellowing.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Epsom salt spray every 4 weeks maintains deep foliage colour.' },
      { name: 'Manganese (Mn)', status: 'low', recommendation: 'Manganese sulfate spray corrects pale young leaves.' },
    ],
    careAdvice: 'Hibiscus blooms on new wood – prune lightly after each flush to encourage new growth and more flowers.',
    fertilizerSuggestions: [
      'Dedicated hibiscus fertilizer (17-5-24).',
      'Liquid seaweed every 2 weeks boosts micronutrients.',
      'Slow-release granules (Osmocote) for hassle-free feeding.',
    ],
    deficiencySymptoms: 'Bud drop and sparse flowers indicate potassium deficiency; yellow leaves with green veins signal iron or manganese shortage.',
  },
  {
    id: 'magnolia',
    keywords: ['magnolia'],
    plantName: 'Magnolia (Magnolia spp.)',
    description: 'A slow-growing ornamental tree with spectacular flowers and moderate nutrient requirements.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'Light application of slow-release fertilizer in spring is sufficient.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Bone meal at planting time supports root establishment.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Balanced fertilizer contains adequate potassium.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron corrects yellowing between veins, especially in alkaline soils.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Maintain soil pH 5.5–6.5 to keep Mg available.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Dolomitic lime corrects both pH and calcium.' },
    ],
    careAdvice: 'Magnolias dislike root disturbance – mulch deeply around the base and avoid digging.',
    fertilizerSuggestions: [
      'Ericaceous (acid-lover) slow-release fertilizer in early spring.',
      'Organic mulch (pine bark) acidifies and feeds slowly.',
      'Avoid over-fertilizing – magnolias are not heavy feeders.',
    ],
    deficiencySymptoms: 'Chlorotic (yellowing) leaves with green veins on alkaline soils indicate iron deficiency.',
  },
  {
    id: 'lavender',
    keywords: ['lavender', 'lavandula'],
    plantName: 'Lavender (Lavandula spp.)',
    description: 'A drought-tolerant aromatic herb that actually prefers poor, well-drained soil and minimal feeding.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'Avoid nitrogen-rich fertilizers – they cause lush, weak growth and reduce fragrance.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Bone meal at planting supports establishment, then no more is needed.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'A light potassium feed in spring improves flower yield and hardiness.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Lime or gravel mulch raises pH to the preferred 6.5–7.5 range.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Rarely deficient; ensure well-draining soil.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Over-feeding suppresses iron absorption; less is more.' },
    ],
    careAdvice: 'Lavender thrives on neglect – well-drained alkaline soil, full sun, and minimal water. Prune hard after flowering.',
    fertilizerSuggestions: [
      'A single application of bone meal in spring at planting.',
      'Gravel or grit mulch reflects heat and improves drainage.',
      'Do NOT apply nitrogen fertilizers.',
    ],
    deficiencySymptoms: 'Leggy growth with few flowers is almost always caused by over-fertilizing, not deficiency.',
  },
  {
    id: 'cactus',
    keywords: ['cactus', 'saguaro', 'barrel cactus', 'prickly pear', 'succulent', 'agave', 'aloe'],
    plantName: 'Cactus & Succulent',
    description: 'Drought-adapted plants with very low nutrient requirements that store water in their tissues.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'sufficient', recommendation: 'Use a very dilute cactus fertilizer (once a month in summer, not at all in winter).' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'A dilute bloom fertilizer in spring encourages flowering in mature plants.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Potassium in cactus fertilizer supports disease resistance.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Coarse gritty soil mix provides trace calcium.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Rarely deficient; ensure good drainage.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'A very dilute chelated iron supplement once a year is usually adequate.' },
    ],
    careAdvice: 'The most common cause of death in cacti and succulents is overwatering and over-feeding – less is always more.',
    fertilizerSuggestions: [
      'Cactus-specific dilute fertilizer (2-7-7) in summer only.',
      'Worm castings sprinkled on the soil surface in spring.',
      'Do NOT fertilize from October to February.',
    ],
    deficiencySymptoms: 'Pale, elongated growth (etiolation) indicates insufficient light, not nutrient deficiency. Mushy tissue means overwatering.',
  },
  {
    id: 'fern',
    keywords: ['fern', 'frond', 'boston fern', 'maidenhair'],
    plantName: 'Fern (Polypodiopsida)',
    description: 'Ancient non-flowering plants that prefer consistently moist, humus-rich soil and indirect light.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'A dilute balanced liquid fertilizer every 4 weeks in spring and summer.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Moderate phosphorus is present in organic potting mix.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Standard fertilizer ratios are adequate for potassium.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron corrects yellowing fronds; keep soil slightly acidic.' },
      { name: 'Humidity', status: 'deficient', recommendation: 'Mist fronds daily or place the pot on a pebble tray with water.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Avoid tap water with high calcium – use rainwater instead.' },
    ],
    careAdvice: 'Ferns hate dry air and direct sun; keep them in a humid bathroom or near a humidifier.',
    fertilizerSuggestions: [
      'Dilute balanced liquid fertilizer (5-5-5) at ½ strength every 4 weeks.',
      'Worm casting tea provides gentle nutrients.',
      'Never fertilize a stressed or drought-stressed fern.',
    ],
    deficiencySymptoms: 'Brown, crispy frond tips indicate low humidity or salt build-up; pale yellow fronds suggest nitrogen or iron deficiency.',
  },
  {
    id: 'bamboo',
    keywords: ['bamboo', 'bamboos', 'grass', 'reed'],
    plantName: 'Bamboo (Bambusoideae)',
    description: 'One of the fastest-growing plants in the world, requiring high nitrogen during the shooting season.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'deficient', recommendation: 'Apply high-nitrogen fertilizer (30-0-0 or blood meal) in spring at shoot emergence.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Balanced fertilizer provides adequate phosphorus.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate in summer improves cane strength and cold hardiness.' },
      { name: 'Silicon (Si)', status: 'low', recommendation: 'Diatomaceous earth or silica spray strengthens cane walls.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic lime provides magnesium in acidic soils.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Chelated iron if leaves show yellowing between veins.' },
    ],
    careAdvice: 'Bamboo is a hungry plant – feed every 4–6 weeks during the growing season and water generously.',
    fertilizerSuggestions: [
      'High-nitrogen granular fertilizer (30-3-4) in spring.',
      'Balanced slow-release fertilizer (14-14-14) in summer.',
      'Mulch heavily with wood chip or compost.',
    ],
    deficiencySymptoms: 'Yellow striping on leaves (magnesium or iron); thin, weak new canes (nitrogen deficiency).',
  },
  {
    id: 'houseplant',
    keywords: [
      'plant', 'pot', 'potted', 'flower', 'leaf', 'foliage', 'herb', 'shrub', 'bush',
      'monstera', 'philodendron', 'pothos', 'snake', 'peace lily', 'rubber', 'palm',
      'schefflera', 'dracaena', 'croton', 'calathea', 'spider', 'ivy', 'jade',
    ],
    plantName: 'Houseplant (tropical foliage)',
    description: 'A tropical foliage houseplant – likely a Pothos, Monstera, Philodendron, or similar popular species.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Use a balanced liquid houseplant fertilizer every 2–4 weeks in spring and summer.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Standard houseplant fertilizer contains adequate phosphorus.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Balanced fertilizer provides the potassium foliage plants need.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron corrects interveinal yellowing on young leaves.' },
      { name: 'Magnesium (Mg)', status: 'low', recommendation: 'Epsom salt solution (1 tsp/4L) as a monthly watering promotes dark-green leaves.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Avoid very soft water with extremely low calcium.' },
    ],
    careAdvice: 'Most tropical houseplants prefer bright indirect light, consistent moisture, and monthly fertilizing from spring to autumn.',
    fertilizerSuggestions: [
      'Balanced liquid fertilizer (10-10-10) every 2–4 weeks in growing season.',
      'Slow-release granules (Osmocote) for 6 months of hassle-free feeding.',
      'Worm casting top-dressing improves soil life and slow-releases nutrients.',
    ],
    deficiencySymptoms: 'Pale, small new leaves suggest nitrogen deficiency; yellow leaves with green veins indicate iron or magnesium deficiency.',
  },
  {
    id: 'tree',
    keywords: ['tree', 'pine', 'oak', 'maple', 'acorn', 'chestnut', 'conifer', 'evergreen', 'palm tree', 'willow'],
    plantName: 'Tree / Woody Plant',
    description: 'A mature woody plant – established trees generally have moderate, self-sufficient nutrient needs.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'Slow-release granular fertilizer around the drip line in early spring.' },
      { name: 'Phosphorus (P)', status: 'sufficient', recommendation: 'Established trees rarely need supplemental phosphorus.' },
      { name: 'Potassium (K)', status: 'sufficient', recommendation: 'Potassium from balanced fertilizer supports stress resistance.' },
      { name: 'Iron (Fe)', status: 'low', recommendation: 'Chelated iron spike or drench if leaves show interveinal chlorosis.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Ground lime every 3–5 years maintains pH and calcium.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Dolomitic lime supplies Mg in acidic soils.' },
    ],
    careAdvice: 'Fertilize around the drip line (edge of the canopy), not against the trunk; deep-root irrigation is most effective.',
    fertilizerSuggestions: [
      'Slow-release tree spikes in spring.',
      'Balanced granular fertilizer (10-10-10) broadcast under the canopy.',
      'Organic mulch 10 cm deep prevents soil compaction and feeds roots.',
    ],
    deficiencySymptoms: 'Yellowing leaves (N or Fe deficiency); early leaf drop (K or drought stress); die-back at branch tips (B or Ca).',
  },
  {
    id: 'unknown',
    keywords: [],
    plantName: 'Unidentified Plant',
    description: 'The plant could not be specifically identified, but here are general care recommendations.',
    nutrients: [
      { name: 'Nitrogen (N)', status: 'low', recommendation: 'A balanced fertilizer covers most plants – apply every 4 weeks during the growing season.' },
      { name: 'Phosphorus (P)', status: 'low', recommendation: 'Bone meal or superphosphate supports roots and flowers.' },
      { name: 'Potassium (K)', status: 'low', recommendation: 'Potassium sulfate improves overall health and disease resistance.' },
      { name: 'Iron (Fe)', status: 'sufficient', recommendation: 'Chelated iron if leaves turn yellow between the veins.' },
      { name: 'Magnesium (Mg)', status: 'sufficient', recommendation: 'Epsom salt solution if older leaves show interveinal yellowing.' },
      { name: 'Calcium (Ca)', status: 'sufficient', recommendation: 'Garden lime once a year maintains pH and calcium levels.' },
    ],
    careAdvice: 'Most plants thrive with well-draining soil, appropriate watering, and a balanced fertilizer every 4 weeks from spring to autumn.',
    fertilizerSuggestions: [
      'Balanced all-purpose fertilizer (10-10-10) every 4 weeks.',
      'Liquid seaweed or fish emulsion as a micronutrient boost.',
      'Slow-release granules (Osmocote) for convenience.',
    ],
    deficiencySymptoms: 'Pale or yellowing leaves often signal nitrogen or iron deficiency; weak growth suggests phosphorus shortage.',
  },
];

/**
 * Match MobileNet predictions against the plant database.
 * @param {Array<{className: string, probability: number}>} predictions
 * @returns {object} Plant data record
 */
export function lookupPlant(predictions) {
  if (!predictions || predictions.length === 0) return buildResult(entries.find(e => e.id === 'unknown'), 0);

  // Flatten all words from all prediction class names
  const allWords = new Set();
  predictions.forEach(p => {
    p.className.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).forEach(w => {
      if (w.length > 2) allWords.add(w);
    });
  });

  // Score each entry by how many keywords match
  let best = null;
  let bestScore = 0;
  for (const entry of entries) {
    if (entry.id === 'unknown') continue;
    let score = 0;
    for (const kw of entry.keywords) {
      const kwWords = kw.split(/\s+/);
      if (kwWords.every(w => allWords.has(w))) {
        score += kwWords.length; // multi-word matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const topConfidence = Math.round((predictions[0]?.probability || 0) * 100);

  if (best) return buildResult(best, topConfidence);

  // No specific match – check if it looks like any kind of plant
  const plantHints = ['plant', 'flower', 'leaf', 'herb', 'vegetable', 'tree', 'shrub', 'garden', 'fern', 'moss', 'grass', 'weed', 'bloom', 'blossom', 'petal', 'stem', 'root', 'pot', 'soil', 'green'];
  const looksLikePlant = plantHints.some(hint => allWords.has(hint));

  const fallback = entries.find(e => e.id === (looksLikePlant ? 'houseplant' : 'unknown'));
  const labelGuess = predictions[0]?.className?.split(',')[0]?.trim() || 'Unknown';
  return {
    ...buildResult(fallback, looksLikePlant ? Math.min(topConfidence, 40) : 10),
    plantName: looksLikePlant ? `${labelGuess} (general plant tips below)` : 'Unknown Plant',
  };
}

function buildResult(entry, confidence) {
  return { ...entry, confidence: Math.max(confidence, 5) };
}
