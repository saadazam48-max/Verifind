import { useState, useRef, useEffect } from "react";

const RESTAURANTS = [
  // ── Turkish / Grills ──
  { id:1,  name:"Nusret Steakhouse",        cuisine:"Turkish",      rating:4.8, price:3, reviews:2341, address:"14 Park Lane, Mayfair",          certified:true,  tags:["Steak","Grill","Date Night","Special Occasion","Meat Lover"],    dishes:["Salt Bae Steak","Lamb Chops","Burger","Baklava","Ribeye"],              emoji:"🥩", x:46, y:37, instagram:"nusr_et",               igFollowers:"16.2M" },
  { id:2,  name:"Tas Restaurant",           cuisine:"Turkish",      rating:4.3, price:1, reviews:1820, address:"33 The Cut, Southwark",          certified:true,  tags:["Turkish","Kebab","Casual","Meze","Budget"],                      dishes:["Iskender Kebab","Lamb Doner","Baklava","Sigara Borek","Adana"],         emoji:"🌮", x:68, y:55, instagram:"tasrestaurant",          igFollowers:"9.2K"  },
  { id:3,  name:"Mangal 1",                 cuisine:"Turkish",      rating:4.6, price:2, reviews:3100, address:"10 Arcola St, Dalston",           certified:true,  tags:["Ocakbasi","Grill","Lamb","Authentic","Kebab"],                   dishes:["Lamb Shish","Chicken Adana","Pide","Mixed Grill","Kofte"],              emoji:"🔥", x:83, y:22, instagram:"mangal1dalston",         igFollowers:"18K"   },
  // ── Indian / Pakistani ──
  { id:4,  name:"Dishoom Covent Garden",    cuisine:"Indian",       rating:4.7, price:2, reviews:5892, address:"12 Upper St Martin's Ln",        certified:true,  tags:["Brunch","Spicy","Curry","Naan","Casual"],                        dishes:["Bacon Naan Roll","Black Daal","Lamb Raan","Chicken Tikka","Chai"],      emoji:"🍛", x:63, y:44, instagram:"dishoom",               igFollowers:"432K"  },
  { id:5,  name:"Tayyabs",                  cuisine:"Pakistani",    rating:4.6, price:1, reviews:6710, address:"83-89 Fieldgate St, Whitechapel", certified:true,  tags:["Pakistani","Grill","Lamb","Budget","Iconic"],                    dishes:["Lamb Chops","Karahi","Daal","Seekh Kebab","Paratha"],                   emoji:"🍖", x:80, y:43, instagram:"tayyabsrestaurant",      igFollowers:"24K"   },
  { id:6,  name:"Gymkhana",                 cuisine:"Indian",       rating:4.8, price:4, reviews:2980, address:"42 Albemarle St, Mayfair",        certified:true,  tags:["Fine Dining","Curry","Special Occasion","Upscale","Award-Winning"],dishes:["Crab Koliwada","Kid Goat Methi","Masala Prawns","Venison Keema"],        emoji:"🏆", x:50, y:40, instagram:"gymkhanalondon",          igFollowers:"38K"   },
  { id:7,  name:"Hankies",                  cuisine:"Indian",       rating:4.3, price:1, reviews:712,  address:"1 Marble Arch",                  certified:true,  tags:["Budget","Street Food","Wrap","Chicken","Quick Bite"],            dishes:["Kathi Rolls","Butter Chicken","Mango Lassi","Chicken Tikka Wrap"],      emoji:"🫓", x:47, y:35, instagram:"hankiesrestaurant",       igFollowers:"8.4K"  },
  { id:8,  name:"Saloos",                   cuisine:"Pakistani",    rating:4.5, price:3, reviews:1450, address:"62-64 Kinnerton St, Belgravia",   certified:true,  tags:["Pakistani","Upscale","Biryani","Lamb","Elegant"],                dishes:["Chicken Biryani","Lamb Karahi","Seekh Kebab","Naan","Gulab Jamun"],     emoji:"🌿", x:44, y:52, instagram:"saloosrestaurant",        igFollowers:"5.1K"  },
  { id:9,  name:"Brigadiers",               cuisine:"Indian BBQ",   rating:4.7, price:3, reviews:3341, address:"1 Bloomberg Arcade, City",        certified:true,  tags:["BBQ","Meat Lover","Date Night","Lamb","Tandoori"],               dishes:["Tandoori Lamb Chops","Dal Makhani","Lassi","Seekh Kebab","Naan"],       emoji:"🍢", x:72, y:46, instagram:"brigadierslondon",        igFollowers:"41K"   },
  // ── Lebanese / Middle Eastern ──
  { id:10, name:"Maroush Gardens",          cuisine:"Lebanese",     rating:4.4, price:2, reviews:988,  address:"1-3 Connaught St, Marylebone",   certified:true,  tags:["Mezze","Family","Healthy","Shawarma","Grill"],                   dishes:["Hummus","Mixed Grill","Fattoush","Shawarma","Kibbeh"],                  emoji:"🧆", x:43, y:38, instagram:"maroush_restaurants",    igFollowers:"22K"   },
  { id:11, name:"Yalla Yalla",              cuisine:"Lebanese",     rating:4.2, price:1, reviews:2230, address:"1 Green's Ct, Soho",             certified:true,  tags:["Budget","Quick Bite","Mezze","Falafel","Wrap"],                  dishes:["Shawarma Wrap","Falafel","Baklawa","Hummus","Tabbouleh"],               emoji:"🥙", x:60, y:47, instagram:"yallayallalondon",        igFollowers:"11K"   },
  { id:12, name:"Zahter",                   cuisine:"Lebanese",     rating:4.5, price:2, reviews:1640, address:"6 Charlotte St, Fitzrovia",      certified:true,  tags:["Mezze","Modern","Brunch","Vegetarian Friendly","Lebanese"],      dishes:["Manakish","Fatteh","Shawarma Platter","Knafeh","Rose Lemonade"],        emoji:"🌹", x:57, y:39, instagram:"zahterrestaurant",        igFollowers:"14K"   },
  { id:13, name:"Comptoir Libanais",        cuisine:"Lebanese",     rating:4.3, price:1, reviews:3870, address:"65 Wigmore St, Marylebone",      certified:true,  tags:["Budget","Casual","Takeaway","Veggie Friendly","Mezze"],          dishes:["Chicken Shawarma Box","Falafel Wrap","Mezze Platter","Baklawa"],        emoji:"🥗", x:49, y:36, instagram:"comptoirlibanais",        igFollowers:"62K"   },
  { id:14, name:"Kenza",                    cuisine:"Moroccan",     rating:4.6, price:3, reviews:1120, address:"10 Devonshire Sq, City",          certified:true,  tags:["Moroccan","Tagine","Special Occasion","Couscous","Atmospheric"], dishes:["Lamb Tagine","Chicken Pastilla","Couscous Royale","Mint Tea"],           emoji:"🫖", x:76, y:44, instagram:"kenzalondon",             igFollowers:"7.8K"  },
  { id:15, name:"Arabica Bar & Kitchen",    cuisine:"Middle Eastern",rating:4.5,price:2, reviews:2010, address:"3 Rochester Walk, Borough Mkt",  certified:true,  tags:["Middle Eastern","Mezze","Brunch","Market","Trendy"],             dishes:["Hummus Kawareh","Lamb Arayes","Fattoush","Knafeh","Shakshuka"],         emoji:"🫙", x:69, y:53, instagram:"arabicabk",               igFollowers:"31K"   },
  // ── Burgers ──
  { id:16, name:"Byron Burger",             cuisine:"Burgers",      rating:4.3, price:1, reviews:4821, address:"97-99 Old Brompton Rd",          certified:true,  tags:["Burger","Casual","Fries","Milkshake","Takeaway"],                dishes:["Classic Burger","Cheese Burger","Chicken Burger","Onion Rings"],        emoji:"🍔", x:36, y:57, instagram:"byronburgers",            igFollowers:"52K"   },
  { id:17, name:"Almost Famous",            cuisine:"Burgers",      rating:4.6, price:2, reviews:3102, address:"7 Curtain Rd, Shoreditch",        certified:true,  tags:["Burger","Loaded","Gourmet","Smash","Fries"],                     dishes:["The Famous Burger","Dirty Fries","Smash Burger","Hot Dog"],             emoji:"🍔", x:79, y:32, instagram:"almostfamousburgers",     igFollowers:"95K"   },
  { id:18, name:"Shake Shack",              cuisine:"Burgers",      rating:4.4, price:2, reviews:6540, address:"24 The Market, Covent Garden",   certified:true,  tags:["Burger","Milkshake","Fries","Chicken","Fast Casual"],            dishes:["ShackBurger","Crispy Chicken","Crinkle Fries","Concrete Shake"],        emoji:"🍔", x:64, y:44, instagram:"shakeshack",              igFollowers:"1.2M"  },
  { id:19, name:"Five Guys",                cuisine:"Burgers",      rating:4.5, price:2, reviews:9210, address:"1-3 Long Acre, Covent Garden",   certified:true,  tags:["Burger","Loaded","Fries","Peanuts","Customise"],                 dishes:["Little Burger","Cajun Fries","Hot Dog","BLT Burger"],                   emoji:"🍔", x:63, y:43, instagram:"fiveguys",                igFollowers:"678K"  },
  { id:20, name:"Patty & Bun",              cuisine:"Burgers",      rating:4.7, price:2, reviews:4320, address:"54 James St, Marylebone",         certified:true,  tags:["Burger","Gourmet","Smash","Truffle","Trendy"],                   dishes:["Ari Gold Burger","Smoky Robinson","Sweet Potato Fries","Slaw"],         emoji:"🍔", x:48, y:37, instagram:"pattyandbun",             igFollowers:"128K"  },
  { id:21, name:"Bleecker Burger",          cuisine:"Burgers",      rating:4.8, price:2, reviews:2890, address:"Spitalfields Mkt, E1",            certified:true,  tags:["Burger","Smash","Simple","Cheese","Street Food"],                dishes:["Bleecker Black","Cheeseburger","Double Burger","Cheese Fries"],         emoji:"🍔", x:80, y:40, instagram:"bleeckerburger",          igFollowers:"76K"   },
  // ── Italian ──
  { id:22, name:"Circolo Popolare",         cuisine:"Italian",      rating:4.5, price:2, reviews:3210, address:"40-41 Rathbone Pl, Fitzrovia",   certified:false, tags:["Pasta","Pizza","Romantic","Veggie Friendly","Italian"],          dishes:["Cacio e Pepe","Tiramisu","Burrata","Margherita Pizza","Arancini"],      emoji:"🍝", x:56, y:38, instagram:"circolopopolare_london",  igFollowers:"118K"  },
  { id:23, name:"Pasta Evangelists",        cuisine:"Italian",      rating:4.6, price:2, reviews:2870, address:"62 Worship St, Shoreditch",       certified:true,  tags:["Pasta","Fresh","Takeaway","Vegetarian","Italian"],               dishes:["Cacio e Pepe","Lobster Pasta","Truffle Tagliatelle","Tiramisu"],        emoji:"🍝", x:79, y:35, instagram:"pastaevangelists",        igFollowers:"164K"  },
  { id:24, name:"Bocca di Lupo",            cuisine:"Italian",      rating:4.7, price:3, reviews:3560, address:"12 Archer St, Soho",              certified:false, tags:["Italian","Regional","Wine","Date Night","Upscale"],              dishes:["Tagliolini Nero","Burrata","Tiramisu","Veal Chop","Risotto"],           emoji:"🐺", x:59, y:46, instagram:"boccadilupo",             igFollowers:"43K"   },
  // ── Thai / Asian ──
  { id:25, name:"Kiln Soho",                cuisine:"Thai",         rating:4.6, price:2, reviews:1870, address:"58 Brewer St, Soho",              certified:true,  tags:["Spicy","Noodles","Street Food","BBQ","Thai"],                    dishes:["Baan Pla","Grilled Pork Collar","Clay Pot Crab","Pad Thai"],            emoji:"🍜", x:59, y:46, instagram:"kilnsoho",                igFollowers:"29K"   },
  { id:26, name:"Smoking Goat",             cuisine:"Thai",         rating:4.5, price:2, reviews:2140, address:"64 Shoreditch High St",            certified:true,  tags:["Thai BBQ","Smoky","Trendy","Spicy","Noodles"],                   dishes:["BBQ Chicken Wings","Crying Tiger Steak","Papaya Salad","Khao Man Gai"], emoji:"🐐", x:80, y:33, instagram:"smokinggoatbar",          igFollowers:"34K"   },
  { id:27, name:"Rosa's Thai",              cuisine:"Thai",         rating:4.4, price:1, reviews:3980, address:"48 Dean St, Soho",                certified:true,  tags:["Thai","Budget","Casual","Noodles","Curry"],                      dishes:["Pad Thai","Green Curry","Spring Rolls","Mango Sticky Rice"],            emoji:"🌺", x:58, y:45, instagram:"rosasthaicafe",           igFollowers:"47K"   },
  // ── Japanese ──
  { id:28, name:"Zuma",                     cuisine:"Japanese",     rating:4.9, price:4, reviews:4102, address:"5 Raphael St, Knightsbridge",     certified:false, tags:["Fine Dining","Sushi","Wagyu","Special Occasion","Japanese"],     dishes:["Yellowtail Sashimi","Wagyu Beef","Miso Black Cod","Edamame"],           emoji:"🍣", x:41, y:53, instagram:"zumarestaurant",          igFollowers:"486K"  },
  { id:29, name:"Roka Charlotte Street",    cuisine:"Japanese",     rating:4.6, price:3, reviews:2760, address:"37 Charlotte St, Fitzrovia",      certified:false, tags:["Robatayaki","Japanese","Date Night","Upscale","Sushi"],          dishes:["Black Cod Miso","Wagyu Tataki","Salmon Sashimi","Tuna Roll"],           emoji:"🎋", x:56, y:37, instagram:"rokarestaurant",          igFollowers:"112K"  },
  // ── Seafood ──
  { id:30, name:"Claw",                     cuisine:"Seafood",      rating:4.5, price:2, reviews:1540, address:"2 Kingly St, Soho",               certified:true,  tags:["Seafood","Lobster","Crab","Casual","Lunch"],                     dishes:["Lobster Roll","Crab Mac & Cheese","Prawn Tacos","Fish & Chips"],        emoji:"🦞", x:60, y:48, instagram:"clawsoho",                igFollowers:"14K"   },
  { id:31, name:"Sheekey's",                cuisine:"Seafood",      rating:4.7, price:4, reviews:3890, address:"28-34 St Martin's Ct, WC2",       certified:false, tags:["Seafood","Fine Dining","Fish","Classic","Special Occasion"],     dishes:["Fish Pie","Fruits de Mer","Dover Sole","Crab Salad"],                   emoji:"🐟", x:63, y:43, instagram:"jsheekeyrestaurant",      igFollowers:"29K"   },
  // ── Chicken / Wings ──
  { id:32, name:"Butchies",                 cuisine:"Chicken",      rating:4.7, price:2, reviews:2670, address:"Old St Station, EC1",             certified:true,  tags:["Fried Chicken","Wings","Burger","Loaded","Street Food"],         dishes:["Nashville Chicken Burger","Hot Wings","Mac & Cheese","Waffles"],        emoji:"🍗", x:77, y:37, instagram:"butchies_uk",             igFollowers:"43K"   },
  { id:33, name:"Thunderbird Chicken",      cuisine:"Chicken",      rating:4.6, price:2, reviews:1980, address:"62 Commercial St, Spitalfields",  certified:true,  tags:["Fried Chicken","Nashville","Spicy","Burger","Wings"],            dishes:["Thunderbird Sandwich","Hot Tenders","Loaded Fries","Slaw"],             emoji:"🌩️", x:81, y:41, instagram:"thunderbirdchicken",      igFollowers:"31K"   },
  { id:34, name:"Absurd Bird",              cuisine:"Chicken",      rating:4.5, price:2, reviews:2340, address:"Murray St, Camden",               certified:true,  tags:["Southern Fried","Chicken","Waffles","Burger","Casual"],          dishes:["Classic Chicken & Waffles","Fried Chicken Burger","Loaded Fries"],     emoji:"🐦", x:53, y:18, instagram:"absurd_bird",             igFollowers:"19K"   },
  // ── Pizza ──
  { id:35, name:"Yard Sale Pizza",          cuisine:"Pizza",        rating:4.6, price:1, reviews:3120, address:"105 Lower Clapton Rd, Hackney",   certified:true,  tags:["Pizza","Casual","Takeaway","Vegan Friendly","Hackney"],          dishes:["Margherita","Loaded Veggie","Meat Feast","Nduja","Garlic Bread"],       emoji:"🍕", x:86, y:18, instagram:"yardsalepizza",           igFollowers:"28K"   },
  { id:36, name:"Pizza Pilgrims",           cuisine:"Pizza",        rating:4.5, price:2, reviews:4890, address:"11 Dean St, Soho",                certified:true,  tags:["Neapolitan","Pizza","Casual","Italian","Lunch"],                 dishes:["Marinara","Diavola","Nduja Calzone","Tiramisu","Campari Spritz"],       emoji:"🍕", x:58, y:45, instagram:"pizzapilgrims",           igFollowers:"186K"  },
  // ── Korean ──
  { id:37, name:"Jinjuu",                   cuisine:"Korean",       rating:4.5, price:2, reviews:1780, address:"15 Kingly St, Soho",              certified:true,  tags:["Korean","BBQ","Fried Chicken","Trendy","Cocktails"],             dishes:["Korean Fried Chicken","Bibimbap","Japchae","Wagyu Bulgogi","Kimchi"],   emoji:"🇰🇷", x:60, y:46, instagram:"jinjuu",                 igFollowers:"22K"   },
  { id:38, name:"Wingstop",                 cuisine:"Korean",       rating:4.4, price:1, reviews:5670, address:"170 Wardour St, Soho",            certified:true,  tags:["Wings","Korean","Fried Chicken","Budget","Casual"],              dishes:["Korean Q Wings","Lemon Pepper Wings","Cajun Fries","Ranch Dip"],        emoji:"🍗", x:58, y:44, instagram:"wingstopuk",              igFollowers:"95K"   },
  // ── African / West African ──
  { id:39, name:"Akara",                    cuisine:"West African", rating:4.6, price:2, reviews:980,  address:"27 Coldharbour Ln, Brixton",      certified:true,  tags:["West African","Jollof","Suya","Family","Authentic"],             dishes:["Jollof Rice","Suya Skewers","Egusi Soup","Puff Puff","Fried Plantain"], emoji:"🌍", x:55, y:82, instagram:"akarabrixton",            igFollowers:"12K"   },
  { id:40, name:"Ikoyi",                    cuisine:"West African", rating:4.8, price:4, reviews:1560, address:"1 St James's Market, SW1",        certified:true,  tags:["West African","Fine Dining","Award-Winning","Unique","Upscale"], dishes:["Smoked Jollof Rice","Suya Aged Beef","Chin Chin","Agege Bread"],        emoji:"⭐", x:53, y:48, instagram:"ikoyilondon",             igFollowers:"27K"   },
  // ── Persian / Iranian ──
  { id:41, name:"Kateh",                    cuisine:"Persian",      rating:4.7, price:2, reviews:2110, address:"5 Warwick Pl, Little Venice",     certified:true,  tags:["Persian","Rice","Kebab","Romantic","Authentic"],                 dishes:["Lamb Shank","Saffron Rice","Koobideh Kebab","Fesenjan","Doogh"],        emoji:"🌸", x:30, y:28, instagram:"katerestaurant",          igFollowers:"8.9K"  },
  { id:42, name:"Colbeh",                   cuisine:"Persian",      rating:4.5, price:2, reviews:1340, address:"43 Porchester Rd, Bayswater",     certified:true,  tags:["Persian","Kebab","Rice","Family","Authentic"],                   dishes:["Lamb Kebab","Chicken Joojeh","Ghormeh Sabzi","Saffron Ice Cream"],      emoji:"🫚", x:31, y:31, instagram:"colbehrestaurant",        igFollowers:"6.2K"  },
  // ── Ethiopian / Eritrean ──
  { id:43, name:"Merkato",                  cuisine:"Ethiopian",    rating:4.5, price:1, reviews:1230, address:"196 Caledonian Rd, Islington",    certified:true,  tags:["Ethiopian","Injera","Vegetarian","Communal","Authentic"],        dishes:["Doro Wat","Injera","Tibs","Shiro","Vegetarian Combo"],                  emoji:"🫓", x:63, y:20, instagram:"merkatoethiopian",        igFollowers:"4.3K"  },
  // ── Somali ──
  { id:44, name:"Bravanese Café",           cuisine:"Somali",       rating:4.4, price:1, reviews:870,  address:"8 Hoxton Market, N1",             certified:true,  tags:["Somali","Rice","Camel","Goat","Authentic"],                      dishes:["Bariis Iskukaris","Suqaar","Goat Stew","Sambuusa","Halwa"],             emoji:"🐪", x:74, y:27, instagram:"bravanescafe",            igFollowers:"3.1K"  },
  // ── Chinese / Dim Sum ──
  { id:45, name:"Buns & Bao",               cuisine:"Chinese",      rating:4.5, price:1, reviews:2100, address:"29 Store St, Bloomsbury",         certified:true,  tags:["Chinese","Bao","Fried Chicken","Budget","Fusion"],               dishes:["Crispy Chicken Bao","Pork Belly Bao","Truffle Fries","Matcha Ice Cream"],emoji:"🥟", x:62, y:40, instagram:"bunsandbao",              igFollowers:"21K"   },
  // ── Mexican ──
  { id:46, name:"Breddos Tacos",            cuisine:"Mexican",      rating:4.6, price:2, reviews:2560, address:"82 Goswell Rd, Clerkenwell",      certified:true,  tags:["Tacos","Mexican","Street Food","Spicy","Casual"],                dishes:["Birria Tacos","Habanero Chicken","Elotes","Al Pastor","Churros"],       emoji:"🌮", x:70, y:37, instagram:"breddostacos",            igFollowers:"55K"   },
  // ── Breakfast / Brunch ──
  { id:47, name:"Ottolenghi Islington",     cuisine:"Mediterranean",rating:4.6, price:2, reviews:3870, address:"287 Upper St, Islington",         certified:false, tags:["Brunch","Vegetarian","Mediterranean","Salads","Bakery"],         dishes:["Eggs Shakshuka","Roasted Veg Salad","Knafeh","Cardamom Bun"],           emoji:"🥐", x:66, y:19, instagram:"ottolenghi",              igFollowers:"892K"  },
  // ── Steakhouse ──
  { id:48, name:"Goodman Steakhouse",       cuisine:"Steakhouse",   rating:4.7, price:4, reviews:3210, address:"26 Maddox St, Mayfair",           certified:true,  tags:["Steak","Fine Dining","Wagyu","Special Occasion","Meat Lover"],   dishes:["USDA Ribeye","Wagyu Burger","Truffle Mac","Bone Marrow","Cheesecake"],  emoji:"🥩", x:51, y:41, instagram:"goodmanrestaurants",      igFollowers:"47K"   },
  // ── Wraps / Fast Casual ──
  { id:49, name:"Wrap It Up!",              cuisine:"Wraps",        rating:4.2, price:1, reviews:1870, address:"Multiple Locations, London",      certified:true,  tags:["Wrap","Budget","Halal","Quick Bite","Takeaway"],                 dishes:["Chicken Tikka Wrap","Falafel Wrap","Doner Wrap","Shawarma Wrap"],       emoji:"🌯", x:55, y:44, instagram:"wrapitupuk",              igFollowers:"6.7K"  },
  // ── Desserts / Sweets ──
  { id:50, name:"Comptoir du Chocolat",     cuisine:"Desserts",     rating:4.5, price:2, reviews:1430, address:"89-91 Turnham Green Terrace, W4", certified:true,  tags:["Dessert","Chocolate","Waffles","Crepes","Sweet"],                dishes:["Dark Chocolate Fondue","Belgian Waffles","Crêpes","Hot Chocolate"],     emoji:"🍫", x:18, y:44, instagram:"comptoirduchocoat",       igFollowers:"9.3K"  },
];

const CUISINES = ["All","Burgers","Indian","Pakistani","Turkish","Lebanese","Middle Eastern","Moroccan","Thai","Italian","Japanese","Seafood","Chicken","Pizza","Korean","West African","Persian","Ethiopian","Steakhouse","Mexican","Desserts"];
const P = {1:"£",2:"££",3:"£££",4:"££££"};

// ── Mock busyness data ────────────────────────────────────────────────────────
function getPopularTimes(id) {
  const patterns = {
    breakfast: [0,0,0,0,0,0,5,20,55,70,60,50,65,70,55,40,35,40,55,70,60,40,20,5],
    lunch:     [0,0,0,0,0,0,0, 5,10,25,55,80,90,75,50,35,30,40,60,75,65,45,20,5],
    dinner:    [0,0,0,0,0,0,0, 0, 5,10,20,35,50,60,50,40,45,60,80,95,90,70,40,10],
    allday:    [0,0,0,0,0,0,5,15,30,50,65,75,80,75,70,65,60,65,75,85,80,60,30,10],
    latenight: [0,0,0,0,0,0,0, 0, 5,15,25,40,55,65,60,55,55,65,80,90,95,90,70,30],
  };
  const typeList = ["dinner","dinner","allday","lunch","dinner","dinner","allday","latenight","dinner","lunch","dinner","allday","dinner","dinner","allday","dinner","latenight","dinner","breakfast","dinner","allday","lunch","dinner","latenight","dinner","allday","dinner","dinner","allday","dinner","allday","latenight","dinner","breakfast","allday","lunch","dinner","latenight","allday","dinner","dinner","dinner","dinner","latenight","allday","lunch","dinner","dinner","allday","breakfast"];
  const base = patterns[typeList[(id-1) % typeList.length]];
  return [0,1,2,3,4,5,6].map(day => {
    const boost = (day===0||day===6)?15:(day===5)?10:0;
    return base.map((v,h) => Math.min(100, Math.max(0, Math.round(v + boost + ((id*h*day)%11) - 5))));
  });
}

function getCurrentBusyness(id) {
  const now = new Date();
  return getPopularTimes(id)[now.getDay()][now.getHours()];
}

function getBusynessLabel(pct) {
  if (pct === 0) return { label:"No data",          color:"#4B5563" };
  if (pct < 20)  return { label:"Not busy",          color:"#10B981" };
  if (pct < 45)  return { label:"A little busy",     color:"#34d399" };
  if (pct < 65)  return { label:"Moderately busy",   color:"#F59E0B" };
  if (pct < 80)  return { label:"Busy",              color:"#F97316" };
  return              { label:"Very busy",          color:"#EF4444" };
}

function BusynessChart({ id }) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const todayData = getPopularTimes(id)[day];
  const hours = Array.from({length:16}, (_,i) => i+8);
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return (
    <div>
      <div style={{ fontSize:10, color:"#6B7280", letterSpacing:"1px", textTransform:"uppercase", marginBottom:8 }}>
        Popular Times · {days[day]}
      </div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:40 }}>
        {hours.map(h => {
          const val = todayData[h] || 0;
          const isCurrent = h === hour;
          const barH = Math.max(2, Math.round((val/100)*40));
          const { color } = getBusynessLabel(val);
          return (
            <div key={h} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{
                width:"100%", height:barH,
                background: isCurrent ? color : "#1F2937",
                borderRadius:3,
                border: isCurrent ? `1px solid ${color}` : "none",
                boxShadow: isCurrent ? `0 0 8px ${color}55` : "none",
              }}/>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
        <span style={{ fontSize:9, color:"#4B5563" }}>8am</span>
        <span style={{ fontSize:9, color:"#10B981", fontWeight:700 }}>↑ Now</span>
        <span style={{ fontSize:9, color:"#4B5563" }}>11pm</span>
      </div>
    </div>
  );
}


function Logo({ size=36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="14" fill="#10B981" opacity="0.12"/>
      <path d="M18 6 A12 12 0 1 1 6.8 24 A9 9 0 1 0 18 6Z" fill="#10B981"/>
      <polygon points="25,10 25.7,12.2 28,12.2 26.2,13.5 26.9,15.7 25,14.4 23.1,15.7 23.8,13.5 22,12.2 24.3,12.2" fill="#F9FAFB" opacity="0.95"/>
    </svg>
  );
}

function Wordmark({ size="lg" }) {
  const fs = size==="lg"?22:size==="sm"?14:18;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <Logo size={size==="lg"?36:28}/>
      <div>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:fs, fontWeight:700, color:"#F9FAFB", letterSpacing:"-0.5px" }}>Veri</span>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:fs, fontWeight:300, color:"#10B981", letterSpacing:"1px" }}>find</span>
        {size==="lg" && <div style={{ fontSize:9, color:"#6B7280", letterSpacing:"2px", textTransform:"uppercase", marginTop:-2 }}>حلال · Verified · Nearby</div>}
      </div>
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(i=>(
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i<=Math.round(rating)?"#F59E0B":"#2D3748"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontSize:11, color:"#6B7280", marginLeft:3 }}>{rating} ({r => r > 1000 ? (r/1000).toFixed(1)+"k" : r})</span>
    </div>
  );
}

function StarsSimple({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(i=>(
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i<=Math.round(rating)?"#F59E0B":"#2D3748"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span style={{ fontSize:11, color:"#6B7280", marginLeft:3 }}>{rating}</span>
    </div>
  );
}

// Instagram icon SVG
function IGIcon({ size=14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function Card({ r, highlighted, onClick, active }) {
  return (
    <div onClick={()=>onClick(r)} style={{
      background: active?"#0f2a1e":highlighted?"#0d1f18":"#111827",
      border: active?"1.5px solid #10B981":highlighted?"1px solid #065f46":"1px solid #1F2937",
      borderRadius:14, padding:"14px 16px", cursor:"pointer",
      transition:"all 0.2s", position:"relative", overflow:"hidden",
    }}
      onMouseEnter={e=>{ if(!active) e.currentTarget.style.borderColor="#374151"; }}
      onMouseLeave={e=>{ if(!active) e.currentTarget.style.borderColor=highlighted?"#065f46":"#1F2937"; }}
    >
      {highlighted&&!active&&<div style={{ position:"absolute",top:8,right:8,background:"#10B981",color:"#000",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:20,letterSpacing:1 }}>AI PICK</div>}
      {active&&<div style={{ position:"absolute",top:8,right:8,background:"#10B981",color:"#000",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:20,letterSpacing:1 }}>ON MAP</div>}
      <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
        <div style={{ fontSize:28,width:46,height:46,background:"#1a2332",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{r.emoji}</div>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ display:"flex",alignItems:"center",gap:5 }}>
            <h3 style={{ margin:0,fontWeight:700,color:"#F9FAFB",fontFamily:"'Cormorant Garamond',serif",fontSize:16,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{r.name}</h3>
            {r.certified&&<span style={{ fontSize:11 }} title="Halal Certified">✅</span>}
          </div>
          <div style={{ fontSize:11,color:"#6B7280",marginBottom:5 }}>{r.cuisine} · {P[r.price]}</div>
          <StarsSimple rating={r.rating}/>
        </div>
      </div>
      <div style={{ marginTop:10,display:"flex",gap:4,flexWrap:"wrap" }}>
        {r.tags.slice(0,3).map(t=>(
          <span key={t} style={{ fontSize:10,background:"#1a2332",color:"#9CA3AF",padding:"2px 8px",borderRadius:20 }}>{t}</span>
        ))}
      </div>
      {/* Busyness inline */}
      {(() => {
        const pct = getCurrentBusyness(r.id);
        const { label, color } = getBusynessLabel(pct);
        return (
          <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ flex:1, height:4, background:"#1F2937", borderRadius:4, overflow:"hidden" }}>
              <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:4, transition:"width 0.5s ease" }}/>
            </div>
            <span style={{ fontSize:10, color:color, fontWeight:600, whiteSpace:"nowrap" }}>
              <span style={{ fontSize:8, marginRight:3 }}>●</span>{label}
            </span>
          </div>
        );
      })()}
    </div>
  );
}

// ── Detail Panel (shown on pin click) ────────────────────────────────────────
function DetailCard({ r, onClose, floating=false }) {
  if (!r) return null;
  const igUrl = `https://instagram.com/${r.instagram}`;

  const style = floating ? {
    position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)",
    background:"#0D1117", border:"1px solid #10B981", borderRadius:16,
    padding:"18px 20px", minWidth:290, maxWidth:370,
    animation:"fadeUp 0.25s ease", zIndex:20, boxShadow:"0 8px 32px rgba(0,0,0,0.7)"
  } : {
    background:"#0d1f18", border:"1px solid #065f46",
    borderRadius:14, padding:"16px", margin:"0 12px 12px",
    animation:"fadeUp 0.2s ease"
  };

  return (
    <div style={style}>
      <button onClick={onClose} style={{ position:"absolute",top:10,right:12,background:"transparent",border:"none",color:"#6B7280",cursor:"pointer",fontSize:16,lineHeight:1 }}>✕</button>

      {/* Header */}
      <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:12 }}>
        <div style={{ fontSize:32,width:52,height:52,background:"#1a2332",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{r.emoji}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#F9FAFB",lineHeight:1.2 }}>
            {r.name} {r.certified&&"✅"}
          </div>
          <div style={{ fontSize:11,color:"#6B7280",margin:"3px 0" }}>{r.cuisine} · {P[r.price]} · {r.address}</div>
          <StarsSimple rating={r.rating}/>
        </div>
      </div>



      {/* Dishes */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:10,color:"#6B7280",letterSpacing:"1px",textTransform:"uppercase",marginBottom:5 }}>Popular Dishes</div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
          {r.dishes.map(d=>(
            <span key={d} style={{ fontSize:11,background:"#1a2332",color:"#D1FAE5",padding:"3px 10px",borderRadius:20 }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:14 }}>
        {r.tags.map(t=>(
          <span key={t} style={{ fontSize:10,background:"#111827",color:"#9CA3AF",padding:"2px 8px",borderRadius:20 }}>{t}</span>
        ))}
      </div>

      {/* Busyness */}
      {(() => {
        const pct = getCurrentBusyness(r.id);
        const { label, color } = getBusynessLabel(pct);
        return (
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ fontSize:10, color:"#6B7280", letterSpacing:"1px", textTransform:"uppercase" }}>How Busy Right Now</div>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:color, boxShadow:`0 0 6px ${color}` }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:color, animation:"busynessPulse 1.5s infinite" }}/>
                </div>
                <span style={{ fontSize:12, color:color, fontWeight:700 }}>{label}</span>
                <span style={{ fontSize:11, color:"#4B5563" }}>· {pct}%</span>
              </div>
            </div>
            <div style={{ height:6, background:"#1F2937", borderRadius:6, overflow:"hidden", marginBottom:12 }}>
              <div style={{ width:`${pct}%`, height:"100%", background:`linear-gradient(90deg, #10B981, ${color})`, borderRadius:6, transition:"width 0.6s ease" }}/>
            </div>
            <BusynessChart id={r.id}/>
          </div>
        );
      })()}

      {/* Actions */}
      {/* Navigation row */}
      <div style={{ display:"flex",gap:6,marginBottom:8 }}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + r.address)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ flex:1,padding:"9px 6px",background:"#1a2332",border:"1px solid #2D3748",borderRadius:9,color:"#F9FAFB",fontSize:11,fontWeight:600,cursor:"pointer",textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:5 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/></svg>
          Google Maps
        </a>
        <a
          href={`https://waze.com/ul?q=${encodeURIComponent(r.name + " " + r.address)}&navigate=yes`}
          target="_blank" rel="noopener noreferrer"
          style={{ flex:1,padding:"9px 6px",background:"#1a2332",border:"1px solid #2D3748",borderRadius:9,color:"#F9FAFB",fontSize:11,fontWeight:600,cursor:"pointer",textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:5 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#33CCFF"/><circle cx="12" cy="12" r="10" stroke="#33CCFF" strokeWidth="1.5" fill="none"/><path d="M8 13c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="#33CCFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="9.5" cy="10.5" r="1" fill="#33CCFF"/><circle cx="14.5" cy="10.5" r="1" fill="#33CCFF"/></svg>
          Waze
        </a>
        <a
          href={`https://maps.apple.com/?q=${encodeURIComponent(r.name + " " + r.address)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ flex:1,padding:"9px 6px",background:"#1a2332",border:"1px solid #2D3748",borderRadius:9,color:"#F9FAFB",fontSize:11,fontWeight:600,cursor:"pointer",textDecoration:"none",textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:5 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#fff"/></svg>
          Apple Maps
        </a>
      </div>
      {/* Instagram row */}
      <a href={igUrl} target="_blank" rel="noopener noreferrer" style={{ display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",borderRadius:9,padding:"9px 14px",textDecoration:"none" }}>
        <IGIcon size={14}/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12,fontWeight:700,color:"#fff" }}>@{r.instagram}</div>
          <div style={{ fontSize:10,color:"rgba(255,255,255,0.75)" }}>{r.igFollowers} followers</div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
      </a>
    </div>
  );
}

// ── Mock Map ─────────────────────────────────────────────────────────────────
function MockMap({ restaurants, highlighted, activeId, onPin }) {
  const [tooltip, setTooltip] = useState(null);
  const streets = [
    "M 10,50 Q 30,48 50,50 Q 70,52 90,50","M 10,35 Q 35,33 55,36 Q 75,38 90,36",
    "M 10,65 Q 40,63 60,65 Q 80,67 90,65","M 30,10 Q 32,30 30,50 Q 28,70 30,90",
    "M 50,10 Q 52,35 50,55 Q 48,75 50,90","M 70,10 Q 68,30 70,55 Q 72,70 70,90",
    "M 15,25 Q 40,24 65,26 Q 80,27 88,25","M 12,78 Q 38,76 62,78 Q 80,79 88,78",
    "M 20,10 Q 22,40 20,60 Q 18,75 22,90","M 82,15 Q 80,40 82,62 Q 84,78 82,88",
  ];
  const parks = [{x:14,y:14,w:16,h:12},{x:72,y:58,w:14,h:10},{x:34,y:70,w:18,h:14}];
  const blocks = [
    {x:32,y:16,w:16,h:8},{x:52,y:16,w:16,h:8},{x:32,y:28,w:16,h:6},{x:52,y:28,w:14,h:6},
    {x:72,y:16,w:14,h:8},{x:14,y:38,w:14,h:10},{x:32,y:38,w:16,h:10},{x:52,y:38,w:16,h:10},
    {x:14,y:52,w:14,h:10},{x:32,y:54,w:16,h:8},{x:52,y:56,w:16,h:8},{x:72,y:30,w:14,h:14},
    {x:14,y:66,w:14,h:10},{x:72,y:48,w:14,h:8},{x:34,y:84,w:14,h:8},{x:54,y:84,w:14,h:8},
  ];

  return (
    <div style={{ position:"relative",width:"100%",height:"100%",background:"#0f1923",overflow:"hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="100" fill="#0f1923"/>
        {blocks.map((b,i)=><rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="0.5" fill="#141f2e" opacity="0.9"/>)}
        {parks.map((p,i)=><rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx="1" fill="#0d2015" opacity="0.8"/>)}
        {streets.map((d,i)=><path key={i} d={d} stroke="#1a2d3d" strokeWidth="1.8" fill="none"/>)}
        {streets.map((d,i)=><path key={"c"+i} d={d} stroke="#243545" strokeWidth="0.6" fill="none"/>)}
        <path d="M 0,72 Q 25,69 45,71 Q 65,73 90,70 L 100,70 L 100,76 Q 75,79 50,77 Q 25,75 0,78 Z" fill="#0a1f35" opacity="0.9"/>
        <path d="M 0,73 Q 25,70 45,72 Q 65,74 90,71" stroke="#10B981" strokeWidth="0.4" fill="none" opacity="0.3"/>

        {restaurants.map(r=>{
          const isHL=highlighted.includes(r.id), isActive=activeId===r.id;
          const color=isActive?"#10B981":isHL?"#34d399":"#4ade80";
          const sz=isActive?3.5:isHL?2.8:2.2;
          return (
            <g key={r.id} onClick={()=>onPin(r)} style={{ cursor:"pointer" }}
              onMouseEnter={()=>setTooltip(r)} onMouseLeave={()=>setTooltip(null)}>
              {(isHL||isActive)&&(
                <circle cx={r.x} cy={r.y} r={sz+2} fill={color} opacity="0.15">
                  <animate attributeName="r" values={`${sz+1};${sz+4};${sz+1}`} dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle cx={r.x+0.3} cy={r.y+0.3} r={sz} fill="#000" opacity="0.4"/>
              <circle cx={r.x} cy={r.y} r={sz} fill={color} stroke={isActive?"#fff":"transparent"} strokeWidth="0.5"/>
              <text x={r.x} y={r.y+0.4} textAnchor="middle" dominantBaseline="middle" fontSize={sz*0.85}>{r.emoji}</text>
            </g>
          );
        })}
      </svg>

      {tooltip&&(
        <div style={{ position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",background:"#0D1117",border:"1px solid #10B981",borderRadius:10,padding:"8px 14px",pointerEvents:"none",whiteSpace:"nowrap",zIndex:10 }}>
          <div style={{ fontWeight:700,fontSize:13,color:"#F9FAFB",fontFamily:"'Cormorant Garamond',serif" }}>{tooltip.emoji} {tooltip.name}</div>
          <div style={{ fontSize:11,color:"#10B981" }}>{tooltip.cuisine} · {P[tooltip.price]} · ⭐ {tooltip.rating}</div>
        </div>
      )}

      <div style={{ position:"absolute",top:12,right:12,background:"rgba(13,17,23,0.9)",borderRadius:8,padding:"6px 10px",fontSize:10,color:"#6B7280",lineHeight:1.8 }}>
        <div><span style={{ color:"#10B981" }}>●</span> AI Pick</div>
        <div><span style={{ color:"#4ade80" }}>●</span> Restaurant</div>
      </div>
      <div style={{ position:"absolute",bottom:16,right:12,display:"flex",flexDirection:"column",gap:4 }}>
        {["+","−"].map(s=>(
          <button key={s} style={{ width:28,height:28,background:"#1F2937",border:"1px solid #374151",color:"#9CA3AF",borderRadius:6,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center" }}>{s}</button>
        ))}
      </div>
    </div>
  );
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
function AIChat({ restaurants, onHighlight }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  const send = async (overrideText) => {
    const txt = (overrideText || input).trim();
    if (!txt || loading) return;
    setInput("");
    setExpanded(true);
    setMsgs(p=>[...p,{ role:"user",content:txt }]);
    setLoading(true);

    const ctx = restaurants.map(r=>`ID:${r.id} | ${r.name} | Cuisine:${r.cuisine} | Rating:${r.rating} | Price:${P[r.price]} | Tags:${r.tags.join(",")} | Dishes:${r.dishes.join(",")}`).join("\n");

    const sys = `You are a halal restaurant concierge in London. Be casual, friendly and concise — like a knowledgeable mate recommending food.

RESTAURANT LIST:
${ctx}

RULES:
- Users may ask for specific FOODS (e.g. "burger", "shawarma", "pasta") OR cuisines OR moods
- Match food items against the Dishes and Tags fields
- Recommend 1-3 restaurants with specific dish mentions, keep it punchy
- Consider budget: £=cheap, ££=mid, £££=premium, ££££=luxury
- No long intros. Get straight to the recommendation.
- At the end output EXACTLY: <recommend>[id1,id2]</recommend> with the matching restaurant IDs`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
"x-api-key": "sk-ant-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",
"anthropic-version": "2023-06-01"        method:"POST", headers:{"
Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:sys,
          messages:[...msgs.map(m=>({role:m.role,content:m.content})),{role:"user",content:txt}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text||"Sorry, something went wrong.";
      const match = text.match(/<recommend>\[([^\]]*)\]<\/recommend>/);
      if (match) {
        const ids = match[1].split(",").map(n=>parseInt(n.trim())).filter(Boolean);
        onHighlight(ids);
      }
      setMsgs(p=>[...p,{ role:"assistant",content:text.replace(/<recommend>.*?<\/recommend>/s,"").trim() }]);
    } catch {
      setMsgs(p=>[...p,{ role:"assistant",content:"Oops! Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const chips = ["🍔 Burger","🥙 Shawarma","🍛 Curry","💸 Budget","💑 Date night","🌶️ Spicy"];

  return (
    <div style={{ display:"flex",flexDirection:"column",background:"#0a1628" }}>
      {/* Header row */}
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px 8px" }}>
        <div style={{ width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#10B981,#065f46)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <Logo size={18}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13,fontWeight:700,color:"#F9FAFB",fontFamily:"'Cormorant Garamond',serif" }}>AI Concierge <span style={{ fontSize:10,color:"#10B981",fontWeight:400 }}>● Verifind AI</span></div>
          <div style={{ fontSize:11,color:"#6B7280" }}>What you thinking? 🤔</div>
        </div>
        {msgs.length>0&&<button onClick={()=>{ setMsgs([]); setExpanded(false); onHighlight([]); }} style={{ fontSize:10,color:"#6B7280",background:"transparent",border:"none",cursor:"pointer" }}>Clear</button>}
      </div>

      {/* Input */}
      <div style={{ padding:"0 12px 10px",display:"flex",gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="burger, spicy lamb, date night..." style={{ flex:1,background:"#1a2332",border:"1px solid #2D3748",borderRadius:22,padding:"8px 14px",color:"#F9FAFB",fontSize:12.5,outline:"none",fontFamily:"inherit" }}/>
        <button onClick={()=>send()} disabled={loading} style={{ width:36,height:36,borderRadius:"50%",background:loading?"#2D3748":"linear-gradient(135deg,#10B981,#059669)",border:"none",cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" strokeWidth="2"/></svg>
        </button>
      </div>

      {/* Quick chips */}
      <div style={{ display:"flex",gap:5,flexWrap:"wrap",padding:"0 12px 10px" }}>
        {chips.map(c=>(
          <button key={c} onClick={()=>send(c.replace(/^[^\s]+\s/,""))} style={{ fontSize:10,background:"#1a2332",border:"1px solid #1F2937",color:"#9CA3AF",padding:"3px 9px",borderRadius:20,cursor:"pointer" }}>{c}</button>
        ))}
      </div>

      {/* Chat history — only shown after first message */}
      {expanded&&msgs.length>0&&(
        <div style={{ maxHeight:180,overflowY:"auto",padding:"0 12px 10px",display:"flex",flexDirection:"column",gap:8,borderTop:"1px solid #1a2332",paddingTop:10 }}>
          {msgs.map((m,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"90%",background:m.role==="user"?"linear-gradient(135deg,#10B981,#059669)":"#1a2332",color:m.role==="user"?"#000":"#E5E7EB",padding:"7px 12px",borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",fontSize:12,lineHeight:1.6,whiteSpace:"pre-wrap",fontWeight:m.role==="user"?600:400 }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading&&(
            <div style={{ display:"flex",gap:4,paddingLeft:4 }}>
              {[0,1,2].map(i=><div key={i} style={{ width:5,height:5,borderRadius:"50%",background:"#10B981",animation:`bounce 0.9s ${i*0.2}s infinite` }}/>)}
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      )}
    </div>
  );
}


// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [highlighted, setHighlighted] = useState([]);
  const [activePin, setActivePin] = useState(null);

  const sorted = [...RESTAURANTS].sort((a,b)=>{
    const ah=highlighted.includes(a.id)?1:0, bh=highlighted.includes(b.id)?1:0;
    return bh-ah||b.rating-a.rating;
  });

  const handlePin = (r) => setActivePin(prev=>prev?.id===r.id?null:r);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080C14;font-family:'DM Sans',sans-serif;color:#F9FAFB;overflow:hidden;}
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:#2D3748;border-radius:4px;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes busynessPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.8)}}
      `}</style>

      <div style={{ height:"100vh", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <header style={{ background:"#0D1117", borderBottom:"1px solid #1a2332", padding:"0 20px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <Wordmark size="lg"/>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ fontSize:11, color:"#6B7280", background:"#1a2332", padding:"4px 10px", borderRadius:20 }}>📍 London, UK</div>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#10B981,#065f46)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>👤</div>
          </div>
        </header>

        {/* Body */}
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

          {/* ── LEFT COLUMN: AI Chat top, Map centred below ── */}
          <div style={{ width:380, flexShrink:0, borderRight:"1px solid #1a2332", display:"flex", flexDirection:"column", overflow:"hidden", background:"#080e1a" }}>

            {/* AI Chat */}
            <div style={{ flexShrink:0, borderBottom:"1px solid #1a2332" }}>
              <AIChat restaurants={RESTAURANTS} onHighlight={ids=>setHighlighted(ids)}/>
            </div>

            {/* Map — centred, fills remaining space */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"16px 16px 0 16px", gap:8, minHeight:0 }}>
              <div style={{ fontSize:10, color:"#4B5563", letterSpacing:"2px", textTransform:"uppercase", alignSelf:"flex-start" }}>
                📍 Verifind Map · London
                {highlighted.length>0 && <span style={{ color:"#10B981", marginLeft:8 }}>{highlighted.length} AI picks highlighted</span>}
              </div>
              <div style={{ width:"100%", flex:1, borderRadius:14, overflow:"hidden", border:"1px solid #1a2332", minHeight:0 }}>
                <MockMap
                  restaurants={RESTAURANTS}
                  highlighted={highlighted}
                  activeId={activePin?.id}
                  onPin={handlePin}
                />
              </div>
            </div>

            {/* Pin detail card — slides in below map */}
            {activePin && (
              <div style={{ flexShrink:0, padding:"0 16px 16px", animation:"fadeUp 0.2s ease" }}>
                <DetailCard r={activePin} onClose={()=>setActivePin(null)} floating={false}/>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN: Restaurant list ── */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

            {/* Clear AI picks button — only shown when active */}
            {highlighted.length>0 && (
              <div style={{ padding:"10px 14px 0", flexShrink:0 }}>
                <button onClick={()=>setHighlighted([])} style={{ fontSize:11, padding:"5px 12px", borderRadius:20, border:"1px solid #065f46", background:"transparent", color:"#10B981", cursor:"pointer" }}>Clear AI picks ✕</button>
              </div>
            )}

            {/* Cards */}
            <div style={{ flex:1, overflowY:"auto", padding:"14px 10px", display:"flex", flexDirection:"column", gap:10 }}>
              {sorted.map((r,i)=>(
                <div key={r.id} style={{ animation:`fadeUp 0.3s ${i*0.03}s ease both` }}>
                  <Card r={r} highlighted={highlighted.includes(r.id)} active={activePin?.id===r.id} onClick={handlePin}/>
                </div>
              ))}
              {/* Footer */}
              <div style={{ textAlign:"center", padding:"20px 0 10px", borderTop:"1px solid #1a2332", marginTop:4 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:"#374151" }}>
                  <span style={{ color:"#F9FAFB", fontWeight:600 }}>Veri</span><span style={{ color:"#10B981" }}>find</span>
                </div>
                <div style={{ fontSize:10, color:"#374151", marginTop:2 }}>
                  A <span style={{ color:"#6B7280" }}>Vita Industries</span> product · All restaurants independently verified حلال
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
