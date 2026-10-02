// All text + data for Melt Theory. Prices are samples (it's a concept site).
// Photos: `photo` is empty until the real image is in public/images/melt/; the <Photo> placeholder shows `tone` + `hint` meanwhile.

export const STUDIO = "Triozen Tech";

/** Flavour fills (never used for buttons: the UI accent is always the royal purple brand color). */
export const FLAVOUR = {
  pistachio: "#bfe3a6",
  mango: "#ffcf4d",
  strawberry: "#eed5ff",
  coffee: "#ecd3b4",
  cocoa: "#6b3a2a",
  meetha: "#ffe2ad",
  blueberry: "#a9bfff",
};

export type PhotoSlot = { photo?: string; tone: string; hint: string };

export const nav = {
  logo: "Cream Crust",
  links: [
    { label: "Home", href: "/" },
    { label: "Flavours", href: "/flavours" },
    { label: "About Us", href: "/about" },
    { label: "Parlours", href: "/#parlours" },
    { label: "Contact Us", href: "/#contact" },
  ],
  cta: { label: "Order", href: "/#build" },
};

export const hero = {
  word: "MELT",
  pill: { label: "Flavour of the week", value: "Alphonso Mango" },
  heading: ["Flavoured", "*With* emotions"],
  text: "Hand-churned in Anand every morning, never more than 20 litres at a time. Real fruit, real milk, no shortcuts.",
  ctas: [
    { label: "Pick your scoop", href: "/flavours" },
    { label: "Find a parlour", href: "/#parlours" },
  ],
  cone: "/images/melt/cone-hero.webp",
  toppings: [
    { src: "/images/melt/topping-strawberry.webp", alt: "", className: "left-[2%] top-[33%] w-[clamp(70px,10vw,170px)] rotate-[-12deg] md:left-[6%] md:top-[22%]", depth: 0.35 },
    { src: "/images/melt/topping-pistachio.webp", alt: "", className: "right-[4%] top-[30%] w-[clamp(56px,7vw,120px)] rotate-[10deg] md:right-[9%] md:top-[18%]", depth: 0.55 },
    { src: "/images/melt/topping-waffle.webp", alt: "", className: "right-[3%] top-[54%] w-[clamp(60px,8vw,140px)] rotate-[18deg] md:top-auto md:right-[4%] md:bottom-[30%]", depth: 0.25 },
    { src: "/images/melt/topping-chocolate.webp", alt: "", className: "left-[5%] top-[57%] w-[clamp(50px,6vw,110px)] rotate-[-20deg] md:top-auto md:left-[12%] md:bottom-[34%]", depth: 0.45 },
  ],
};

export const wave = {
  top: ["Pistachio Malai", "Alphonso Mango", "Filter Coffee", "Double ka Meetha", "Sitaphal", "Belgian Cocoa"],
  bottom: ["Hand-churned daily", "Small batch", "Made in Anand", "No shortcuts"],
};

export type Flavour = {
  id: string;
  name: string;
  note: string;
  price: number;
  tag?: string;
  fill: string;
  ink: string; // text colour on the fill
  image: string;
};

export const flavours: Flavour[] = [
  { id: "pistachio", name: "Pistachio Malai", note: "Roasted pistachios folded into slow-cooked malai", price: 140, tag: "Bestseller", fill: FLAVOUR.pistachio, ink: "#2b1233", image: "/images/melt/scoop-pistachio.webp" },
  { id: "mango", name: "Alphonso Mango", note: "Ratnagiri Alphonsos, only while the season lasts", price: 140, tag: "Seasonal", fill: FLAVOUR.mango, ink: "#2b1233", image: "/images/melt/scoop-mango.webp" },
  { id: "strawberry", name: "Strawberry Cream", note: "Fresh berries with a ripple of homemade jam", price: 140, tag: "Kids' pick", fill: FLAVOUR.strawberry, ink: "#2b1233", image: "/images/melt/scoop-strawberry.webp" },
  { id: "coffee", name: "Filter Coffee", note: "Real decoction, a little jaggery, classic taste", price: 150, tag: "New", fill: FLAVOUR.coffee, ink: "#2b1233", image: "/images/melt/scoop-coffee.webp" },
  { id: "cocoa", name: "Belgian Cocoa", note: "70% dark chocolate with fudgy chunks", price: 160, tag: "Vegan", fill: FLAVOUR.cocoa, ink: "#fff1e6", image: "/images/melt/scoop-cocoa.webp" },
  { id: "meetha", name: "Double ka Meetha", note: "Saffron cream, caramelised bread, toasted almonds", price: 160, tag: "Only here", fill: FLAVOUR.meetha, ink: "#2b1233", image: "/images/melt/scoop-meetha.webp" },
];

export const shelf = {
  eyebrow: "Today's counter",
  heading: ["Today's", "*scoops*"],
  text: "Six flavours on the counter today. Churned this morning, gone by tonight.",
  unit: "/ scoop",
};

const byId = (id: string) => flavours.find((f) => f.id === id)!;

export const builder = {
  eyebrow: "Build your cone",
  heading: ["Build your", "*cone*"],
  text: "Pick three scoops. We stack them on a waffle cone baked the same morning.",
  cone: "/images/melt/cone-empty.webp",
  coneLine: { name: "Waffle cone", price: "Free" },
  scoops: [byId("pistachio"), byId("mango"), byId("cocoa")],
  tints: ["#faf5ff", "#e9f5e0", "#fff2c9", "#f6e3d8"], // empty cone, then one per scoop
  cta: "Add to order",
};

export const slow = {
  eyebrow: "How it's made",
  heading: ["Made the", "*slow* way"],
  text: "",
  frames: "/frames/melt-pour",
  alt: "Warm chocolate poured over a vanilla scoop, topped with pistachios",
  panel: "linear-gradient(180deg, #e2c4c6, #ebd7dd)", // the video's own background, so the panel and the video blend
  // [scroll progress, scoop centre as a fraction of the frame width]: the crop follows the scoop as the camera pushes in
  focus: [
    [0, 0.74],
    [0.33, 0.66],
    [0.66, 0.57],
    [1, 0.52],
  ] as [number, number][],
  // stickers stay on the pink left side (desktop) / in a row above the video (phone), never over the scoop
  captions: [
    { title: "Fresh milk", text: "every single morning", at: 0.1, pos: "md:left-[4%] md:bottom-[24%]", fill: "#ffffff" },
    { title: "40 minutes", text: "of slow churning", at: 0.35, pos: "md:left-[13%] md:bottom-[6%]", fill: FLAVOUR.mango },
    { title: "20 litres", text: "max per batch", at: 0.6, pos: "md:left-[21%] md:bottom-[33%]", fill: FLAVOUR.pistachio },
  ],
};

export const treats = {
  eyebrow: "The menu",
  heading: ["Pick a", "*treat*"],
  items: [
    { id: "scoops", name: "Scoops", count: "12 flavours", tone: FLAVOUR.strawberry, hint: "Scoops in a cup", photo: "/images/melt/cat-scoops.webp" },
    { id: "sundaes", name: "Sundaes", count: "8 sundaes", tone: FLAVOUR.mango, hint: "Sundae glass", photo: "/images/melt/cat-sundae.webp" },
    { id: "tubs", name: "Family tubs", count: "500 ml · 1 L", tone: FLAVOUR.pistachio, hint: "Tub, top-down", photo: "/images/melt/cat-tub.webp" },
    { id: "shakes", name: "Thick shakes", count: "6 shakes", tone: FLAVOUR.coffee, hint: "Milkshake", photo: "/images/melt/cat-shake.webp" },
    { id: "cakes", name: "Ice-cream cakes", count: "Order 24 h ahead", tone: FLAVOUR.blueberry, hint: "Ice-cream cake", photo: "/images/melt/cat-cake.webp" },
    { id: "kulfi", name: "Kulfi", count: "4 kinds", tone: FLAVOUR.meetha, hint: "Kulfi sticks", photo: "/images/melt/cat-kulfi.webp" },
  ],
};

export const deals = {
  eyebrow: "Sweet deals",
  heading: ["Treat", "*everyone*"],
  text: "Something for the whole family, the date night and the 4 PM craving. At every parlour.",
  items: [
    { id: "family", title: "Family tub night", text: "4 tubs of 500 ml, any flavours. Enough for everyone (maybe).", price: "₹999", was: "₹1,240", badge: "Every Sunday", tone: FLAVOUR.pistachio, hint: "Family sharing tubs", photo: "/images/melt/deal-family.webp" },
    { id: "date", title: "Date-night sundae for two", text: "Two spoons, three scoops, warm brownie, hot fudge.", price: "₹449", badge: "After 7 PM", tone: FLAVOUR.strawberry, hint: "Sundae for two", photo: "/images/melt/deal-date.webp" },
    { id: "happy", title: "Second scoop free", text: "Every day between 4 and 6 PM.", price: "4–6 PM", badge: "Happy hour", tone: FLAVOUR.cocoa, hint: "" },
    { id: "cake", title: "Birthday cakes", text: "Any flavour as a cake. Order 24 hours ahead.", price: "from ₹1,199", badge: "Made to order", tone: FLAVOUR.blueberry, hint: "" },
  ],
};

export const notes = {
  eyebrow: "Love notes",
  heading: ["Sticky *fingers*,", "happy hearts"],
  items: [
    { name: "Ananya & friends", where: "AV Road", text: "We came for one scoop. We left with a tub each.", rating: 5, tone: FLAVOUR.mango, hint: "Friends with cones", photo: "/images/melt/note-friends.webp", tilt: -4 },
    { name: "Meher, age 7", where: "Amul Dairy Road", text: "Strawberry is the best colour AND the best flavour.", rating: 5, tone: FLAVOUR.strawberry, hint: "Kid with a scoop", photo: "/images/melt/note-kid.webp", tilt: 3 },
    { name: "Rahul & Sana", where: "Vallabh Vidyanagar", text: "Our Friday date is now a Cream Crust date.", rating: 5, tone: FLAVOUR.coffee, hint: "Couple at night", photo: "/images/melt/note-couple.webp", tilt: -2 },
    { name: "The Patels", where: "Amul Dairy Road", text: "Double ka meetha as ice cream. Nani approved.", rating: 5, tone: FLAVOUR.pistachio, hint: "Family on a bench", photo: "/images/melt/note-family.webp", tilt: 4 },
  ],
};

export const parlours = {
  eyebrow: "Our parlours",
  heading: ["Come say", "*hi*"],
  text: "Three pink parlours across Anand, Gujarat. Walk in, sample everything, take your time.",
  photo: { photo: "/images/melt/parlour.webp", tone: FLAVOUR.pistachio, hint: "Parlour interior" },
  items: [
    { name: "Amul Dairy Road", note: "The first one. Garden seating.", hours: "12 PM – 11 PM", late: "Till midnight Fri–Sun" },
    { name: "Vallabh Vidyanagar", note: "Near the colleges. Fast queue.", hours: "11 AM – 11 PM", late: "Happy hour 4–6 PM" },
    { name: "AV Road", note: "The big one. Cake counter inside.", hours: "12 PM – 12 AM", late: "Open late every day" },
  ],
};

export const footer = {
  word: "CREAM CRUST",
  newsletter: {
    title: "Get the new flavour first",
    text: "One email when a new flavour hits the counter. That's it.",
    placeholder: "you@email.com",
  },
  columns: [
    { title: "Eat", links: [{ label: "Flavours", href: "/flavours" }, { label: "Sundaes", href: "/flavours#sundaes" }, { label: "Family tubs", href: "/flavours#tubs" }, { label: "Cakes", href: "/flavours#cakes" }] },
    { title: "Visit", links: [{ label: "Amul Dairy Road", href: "/#parlours" }, { label: "Vallabh Vidyanagar", href: "/#parlours" }, { label: "AV Road", href: "/#parlours" }] },
    { title: "Hello", links: [{ label: "About Us", href: "/#about" }, { label: "Contact Us", href: "/#contact" }, { label: "Instagram", href: "#" }] },
  ],
  note: "Powered by Safvan Vohra, Saad Vohra",
};

/** The /flavours page: every product, grouped by category. Prices are samples. */
export type Product = { name: string; note: string; price: number; unit: string; tag?: string; image?: string };
export type Category = {
  id: string;
  name: string;
  blurb: string;
  fill: string; // band colour of the section
  photo: string; // category photo (from the home page "treats")
  products: Product[];
};

export const menuPage = {
  eyebrow: "The full menu",
  heading: ["Every *flavour*,", "every treat"],
  text: "Scoops, sundaes, tubs, shakes, cakes and kulfi. Everything churned by hand in Anand, sorted so you can find your favourite fast.",
  add: "Add",
  cta: { title: "Can't decide?", text: "Build your own three-scoop cone and watch it stack.", label: "Build a cone", href: "/#build" },
};

const S = (id: string) => `/images/melt/scoop-${id}.webp`;

export const categories: Category[] = [
  {
    id: "scoops",
    name: "Scoops",
    blurb: "Twelve flavours on the counter, churned this morning. Single, double or triple.",
    fill: FLAVOUR.strawberry,
    photo: "/images/melt/cat-scoops.webp",
    products: flavours.map((f) => ({ name: f.name, note: f.note, price: f.price, unit: "/ scoop", tag: f.tag, image: f.image })),
  },
  {
    id: "sundaes",
    name: "Sundaes",
    blurb: "Three scoops, warm sauces and crunchy toppings, built in a tall glass.",
    fill: FLAVOUR.mango,
    photo: "/images/melt/cat-sundae.webp",
    products: [
      { name: "Brownie Fudge Sundae", note: "Warm brownie, Belgian cocoa scoops, hot fudge", price: 289, unit: "/ glass", tag: "Bestseller", image: S("cocoa") },
      { name: "Date-night Sundae", note: "Two spoons, three scoops, brownie, hot fudge", price: 449, unit: "for two", tag: "After 7 PM", image: S("strawberry") },
      { name: "Mango Melba", note: "Alphonso mango, vanilla cream, berry coulis", price: 259, unit: "/ glass", tag: "Seasonal", image: S("mango") },
      { name: "Pista Crunch", note: "Pistachio malai, praline crumble, rose syrup", price: 279, unit: "/ glass", image: S("pistachio") },
    ],
  },
  {
    id: "tubs",
    name: "Family tubs",
    blurb: "Take the parlour home. Any flavour, sealed fresh, made to be shared (maybe).",
    fill: FLAVOUR.pistachio,
    photo: "/images/melt/cat-tub.webp",
    products: [
      { name: "Pistachio Malai Tub", note: "Our bestseller, by the litre", price: 549, unit: "/ 500 ml", tag: "Bestseller", image: S("pistachio") },
      { name: "Alphonso Mango Tub", note: "Ratnagiri Alphonsos, while the season lasts", price: 549, unit: "/ 500 ml", tag: "Seasonal", image: S("mango") },
      { name: "Double ka Meetha Tub", note: "Saffron cream, caramelised bread, almonds", price: 599, unit: "/ 500 ml", tag: "Only here", image: S("meetha") },
      { name: "Belgian Cocoa Tub", note: "70% dark chocolate, fudgy chunks", price: 599, unit: "/ 500 ml", tag: "Vegan", image: S("cocoa") },
      { name: "Family Tub Night Pack", note: "4 tubs of 500 ml, any flavours", price: 999, unit: "/ pack", tag: "Every Sunday", image: S("strawberry") },
    ],
  },
  {
    id: "shakes",
    name: "Thick shakes",
    blurb: "So thick the straw stands up. Blended with real scoops, never syrup.",
    fill: FLAVOUR.coffee,
    photo: "/images/melt/cat-shake.webp",
    products: [
      { name: "Filter Coffee Shake", note: "Real decoction, jaggery, a hint of cocoa", price: 219, unit: "/ 350 ml", tag: "New", image: S("coffee") },
      { name: "Strawberry Cream Shake", note: "Fresh berries and homemade jam ripple", price: 209, unit: "/ 350 ml", tag: "Kids' pick", image: S("strawberry") },
      { name: "Mango Malai Shake", note: "Alphonso pulp with a swirl of malai", price: 229, unit: "/ 350 ml", image: S("mango") },
      { name: "Choco Fudge Shake", note: "Dark cocoa, fudge, cocoa nib crunch", price: 229, unit: "/ 350 ml", image: S("cocoa") },
    ],
  },
  {
    id: "cakes",
    name: "Ice-cream cakes",
    blurb: "Any flavour as a cake. Please order 24 hours ahead so we can build it right.",
    fill: FLAVOUR.blueberry,
    photo: "/images/melt/cat-cake.webp",
    products: [
      { name: "Pistachio Dream Cake", note: "Pistachio malai, sponge base, crushed nuts", price: 1199, unit: "/ 500 g", tag: "Made to order", image: S("pistachio") },
      { name: "Strawberry Blush Cake", note: "Strawberry cream layers and fresh berries", price: 1299, unit: "/ 500 g", image: S("strawberry") },
      { name: "Double ka Meetha Cake", note: "Saffron cream layers with caramelised bread", price: 1499, unit: "/ 1 kg", tag: "Only here", image: S("meetha") },
    ],
  },
  {
    id: "kulfi",
    name: "Kulfi",
    blurb: "Dense, slow-cooked and served on a stick, the old-school way.",
    fill: FLAVOUR.meetha,
    photo: "/images/melt/cat-kulfi.webp",
    products: [
      { name: "Malai Kulfi", note: "Reduced milk, cardamom, slivered almonds", price: 90, unit: "/ stick", tag: "Classic", image: S("meetha") },
      { name: "Pista Kulfi", note: "Roasted pistachio and saffron", price: 110, unit: "/ stick", image: S("pistachio") },
      { name: "Mango Kulfi", note: "Alphonso pulp frozen dense", price: 110, unit: "/ stick", tag: "Seasonal", image: S("mango") },
      { name: "Rabri Falooda Kulfi", note: "Rabri, falooda and rose syrup", price: 130, unit: "/ stick", tag: "New", image: S("strawberry") },
    ],
  },
];

export const aboutPage = {
  eyebrow: "Our Story & Philosophy",
  heading: ["Crafted with *care.*", "Flavoured with emotions."],
  subtitle:
    "We believe ice cream should never be rushed, mass-produced, or compromised with artificial powders. Born from a love for pure, unadulterated malai and honest craft, Cream Crust churns small batches daily with fresh farm milk and real seasonal fruits.",
  stats: [
    { value: "100%", label: "Pure Dairy Fat", note: "No palm oil, no vegetable ghee" },
    { value: "20L", label: "Max Per Batch", note: "Small batches for intense flavor" },
    { value: "40 min", label: "Slow Churn Cycle", note: "Dense, velvety micro-texture" },
    { value: "0", label: "Artificial Colors", note: "Only natural fruits & spices" },
  ],
  pillars: [
    {
      title: "Single-Source Farm Milk",
      desc: "Every batch begins at 6:00 AM with fresh milk sourced directly from trusted local farmers in Anand, Gujarat. Never re-constituted milk powder or UHT concentrates.",
      tag: "Pure Dairy",
      icon: "milk",
      fill: "#ecd8f8",
    },
    {
      title: "The Artisanal Slow Churn",
      desc: "Mass-market ice cream is pumped with up to 50% air (overrun). We churn slowly for 40 minutes with minimum overrun, creating an ultra-dense, melt-in-mouth richness.",
      tag: "Slow Craft",
      icon: "churn",
      fill: "#ffedd5",
    },
    {
      title: "Real Seasonal Harvests",
      desc: "Ratnagiri Alphonsos picked at peak ripeness, Iranian pistachios roasted fresh in our parlour kitchens, hand-pulled filter coffee decoction, and single-origin Belgian cocoa.",
      tag: "Pure Ingredients",
      icon: "harvest",
      fill: "#dcfce7",
    },
    {
      title: "Flavoured with Emotions",
      desc: "Every recipe is rooted in a feeling: the excitement of the Sunday family tub, the comfort of warm brownie on a date night, and the timeless nostalgia of summer kulfi on a stick.",
      tag: "The Soul",
      icon: "heart",
      fill: "#ede9fe",
    },
  ],
  process: {
    eyebrow: "The Daily Rhythm",
    heading: ["How each scoop *comes* to life"],
    text: "From morning farm collection to the final swirl in your waffle cone — take a look inside our daily artisanal process.",
    steps: [
      {
        time: "06:00 AM",
        title: "Fresh Milk Arrives",
        desc: "Raw, rich milk arrives fresh from the morning milking. It is gently pasteurized and skimmed for that golden cream cap.",
        badge: "Farm Direct",
      },
      {
        time: "08:30 AM",
        title: "Slow Simmer & Infusions",
        desc: "Whole spices, roasted nuts, and hand-cut fruits are slowly steeped into the cream base to draw out deep, natural aromatics.",
        badge: "Real Flavour",
      },
      {
        time: "11:00 AM",
        title: "40-Minute Churn",
        desc: "In our Italian batch freezers, the mix is slowly churned at sub-zero temperatures, forming fine, silky ice crystals.",
        badge: "Small Batch",
      },
      {
        time: "01:00 PM",
        title: "Fresh onto the Counter",
        desc: "Freshly churned tubs are chilled to perfect scooping temperature, ready for our guests before the afternoon heat peaks.",
        badge: "Fresh Daily",
      },
    ],
  },
  promises: [
    {
      title: "Pure Malai, 0% Palm Oil",
      desc: "We stand strictly against synthetic vegetable fat (frozen dessert blends). We only serve authentic, 100% pure ice cream made with cow and buffalo malai.",
    },
    {
      title: "Fresh Baked Cones Hourly",
      desc: "Our waffle cones aren't shipped in cardboard boxes. They are pressed and hand-rolled fresh right in front of you every single hour.",
    },
    {
      title: "Honest Sweetness",
      desc: "We calibrate sugar levels lower than standard ice creams so that the genuine taste of slow-cooked milk, Alphonso mango, and roasted nuts shines through.",
    },
    {
      title: "No Leftovers, Ever",
      desc: "Because our batches are small (maximum 20 liters), what is made today is finished today. Tomorrow morning starts completely fresh.",
    },
  ],
  quote: {
    text: "We didn't set out to make the most ice cream. We set out to make ice cream that makes you pause, smile, and remember why life is sweet.",
    author: "Safvan Vohra & Saad Vohra",
    role: "Founders & Master Churners",
  },
};

