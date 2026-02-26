/* eslint-disable */
import { useState, useRef, useEffect } from "react";

const RESTAURANTS = [
  // ── Turkish / Grills ──
  { id:1,  name:"Nusret Steakhouse",        cuisine:"Turkish",      rating:4.8, price:3, reviews:2341, address:"14 Park Lane, Mayfair",          certified:true,  tags:["Steak","Grill","Date Night","Special Occasion","Meat Lover"],    dishes:["Salt Bae Steak","Lamb Chops","Burger","Baklava","Ribeye"],              emoji:"🥩", x:46, y:37, instagram:"nusr_et",               igFollowers:"16.2M", lat:51.5074, lng:-0.1564 },
  { id:2,  name:"Tas Restaurant",           cuisine:"Turkish",      rating:4.3, price:1, reviews:1820, address:"33 The Cut, Southwark",          certified:true,  tags:["Turkish","Kebab","Casual","Meze","Budget"],                      dishes:["Iskender Kebab","Lamb Doner","Baklava","Sigara Borek","Adana"],         emoji:"🌮", x:68, y:55, instagram:"tasrestaurant",          igFollowers:"9.2K",  lat:51.5046, lng:-0.1055 },
  { id:3,  name:"Mangal 1",                 cuisine:"Turkish",      rating:4.6, price:2, reviews:3100, address:"10 Arcola St, Dalston",           certified:true,  tags:["Ocakbasi","Grill","Lamb","Authentic","Kebab"],                   dishes:["Lamb Shish","Chicken Adana","Pide","Mixed Grill","Kofte"],              emoji:"🔥", x:83, y:22, instagram:"mangal1dalston",         igFollowers:"18K",   lat:51.5492, lng:-0.0746 },
  // ── Indian / Pakistani ──
  { id:4,  name:"Dishoom Covent Garden",    cuisine:"Indian",       rating:4.7, price:2, reviews:5892, address:"12 Upper St Martin's Ln",        certified:true,  tags:["Brunch","Spicy","Curry","Naan","Casual"],                        dishes:["Bacon Naan Roll","Black Daal","Lamb Raan","Chicken Tikka","Chai"],      emoji:"🍛", x:63, y:44, instagram:"dishoom",               igFollowers:"432K",  lat:51.5116, lng:-0.1234 },
  { id:5,  name:"Tayyabs",                  cuisine:"Pakistani",    rating:4.6, price:1, reviews:6710, address:"83-89 Fieldgate St, Whitechapel", certified:true,  tags:["Pakistani","Grill","Lamb","Budget","Iconic"],                    dishes:["Lamb Chops","Karahi","Daal","Seekh Kebab","Paratha"],                   emoji:"🍖", x:80, y:43, instagram:"tayyabsrestaurant",      igFollowers:"24K",   lat:51.5154, lng:-0.0631 },
  { id:6,  name:"Gymkhana",                 cuisine:"Indian",       rating:4.8, price:4, reviews:2980, address:"42 Albemarle St, Mayfair",        certified:true,  tags:["Fine Dining","Curry","Special Occasion","Upscale","Award-Winning"],dishes:["Crab Koliwada","Kid Goat Methi","Masala Prawns","Venison Keema"],        emoji:"🏆", x:50, y:40, instagram:"gymkhanalondon",          igFollowers:"38K",   lat:51.5091, lng:-0.1445 },
  { id:7,  name:"Hankies",                  cuisine:"Indian",       rating:4.3, price:1, reviews:712,  address:"1 Marble Arch",                  certified:true,  tags:["Budget","Street Food","Wrap","Chicken","Quick Bite"],            dishes:["Kathi Rolls","Butter Chicken","Mango Lassi","Chicken Tikka Wrap"],      emoji:"🫓", x:47, y:35, instagram:"hankiesrestaurant",       igFollowers:"8.4K",  lat:51.5142, lng:-0.1574 },
  { id:8,  name:"Saloos",                   cuisine:"Pakistani",    rating:4.5, price:3, reviews:1450, address:"62-64 Kinnerton St, Belgravia",   certified:true,  tags:["Pakistani","Upscale","Biryani","Lamb","Elegant"],                dishes:["Chicken Biryani","Lamb Karahi","Seekh Kebab","Naan","Gulab Jamun"],     emoji:"🌿", x:44, y:52, instagram:"saloosrestaurant",        igFollowers:"5.1K",  lat:51.4990, lng:-0.1560 },
  { id:9,  name:"Brigadiers",               cuisine:"Indian BBQ",   rating:4.7, price:3, reviews:3341, address:"1 Bloomberg Arcade, City",        certified:true,  tags:["BBQ","Meat Lover","Date Night","Lamb","Tandoori"],               dishes:["Tandoori Lamb Chops","Dal Makhani","Lassi","Seekh Kebab","Naan"],       emoji:"🍢", x:72, y:46, instagram:"brigadierslondon",        igFollowers:"41K",   lat:51.5129, lng:-0.0906 },
  // ── Lebanese / Middle Eastern ──
  { id:10, name:"Maroush Gardens",          cuisine:"Lebanese",     rating:4.4, price:2, reviews:988,  address:"1-3 Connaught St, Marylebone",   certified:true,  tags:["Mezze","Family","Healthy","Shawarma","Grill"],                   dishes:["Hummus","Mixed Grill","Fattoush","Shawarma","Kibbeh"],                  emoji:"🧆", x:43, y:38, instagram:"maroush_restaurants",    igFollowers:"22K",   lat:51.5154, lng:-0.1628 },
  { id:11, name:"Yalla Yalla",              cuisine:"Lebanese",     rating:4.2, price:1, reviews:2230, address:"1 Green's Ct, Soho",             certified:true,  tags:["Budget","Quick Bite","Mezze","Falafel","Wrap"],                  dishes:["Shawarma Wrap","Falafel","Baklawa","Hummus","Tabbouleh"],               emoji:"🥙", x:60, y:47, instagram:"yallayallalondon",        igFollowers:"11K",   lat:51.5136, lng:-0.1321 },
  { id:12, name:"Zahter",                   cuisine:"Lebanese",     rating:4.5, price:2, reviews:1640, address:"6 Charlotte St, Fitzrovia",      certified:true,  tags:["Mezze","Modern","Brunch","Vegetarian Friendly","Lebanese"],      dishes:["Manakish","Fatteh","Shawarma Platter","Knafeh","Rose Lemonade"],        emoji:"🌹", x:57, y:39, instagram:"zahterrestaurant",        igFollowers:"14K",   lat:51.5199, lng:-0.1368 },
  { id:13, name:"Comptoir Libanais",        cuisine:"Lebanese",     rating:4.3, price:1, reviews:3870, address:"65 Wigmore St, Marylebone",      certified:true,  tags:["Budget","Casual","Takeaway","Veggie Friendly","Mezze"],          dishes:["Chicken Shawarma Box","Falafel Wrap","Mezze Platter","Baklawa"],        emoji:"🥗", x:49, y:36, instagram:"comptoirlibanais",        igFollowers:"62K",   lat:51.5158, lng:-0.1527 },
  { id:14, name:"Kenza",                    cuisine:"Moroccan",     rating:4.6, price:3, reviews:1120, address:"10 Devonshire Sq, City",          certified:true,  tags:["Moroccan","Tagine","Special Occasion","Couscous","Atmospheric"], dishes:["Lamb Tagine","Chicken Pastilla","Couscous Royale","Mint Tea"],           emoji:"🫖", x:76, y:44, instagram:"kenzalondon",             igFollowers:"7.8K",  lat:51.5167, lng:-0.0822 },
  { id:15, name:"Arabica Bar & Kitchen",    cuisine:"Middle Eastern",rating:4.5,price:2, reviews:2010, address:"3 Rochester Walk, Borough Mkt",  certified:true,  tags:["Middle Eastern","Mezze","Brunch","Market","Trendy"],             dishes:["Hummus Kawareh","Lamb Arayes","Fattoush","Knafeh","Shakshuka"],         emoji:"🫙", x:69, y:53, instagram:"arabicabk",               igFollowers:"31K",   lat:51.5052, lng:-0.0911 },
  // ── Burgers ──
  { id:16, name:"Byron Burger",             cuisine:"Burgers",      rating:4.3, price:1, reviews:4821, address:"97-99 Old Brompton Rd",          certified:true,  tags:["Burger","Casual","Fries","Milkshake","Takeaway"],                dishes:["Classic Burger","Cheese Burger","Chicken Burger","Onion Rings"],        emoji:"🍔", x:36, y:57, instagram:"byronburgers",            igFollowers:"52K",   lat:51.4908, lng:-0.1895 },
  { id:17, name:"Almost Famous",            cuisine:"Burgers",      rating:4.6, price:2, reviews:3102, address:"7 Curtain Rd, Shoreditch",        certified:true,  tags:["Burger","Loaded","Gourmet","Smash","Fries"],                     dishes:["The Famous Burger","Dirty Fries","Smash Burger","Hot Dog"],             emoji:"🍔", x:79, y:32, instagram:"almostfamousburgers",     igFollowers:"95K",   lat:51.5251, lng:-0.0798 },
  { id:18, name:"Shake Shack",              cuisine:"Burgers",      rating:4.4, price:2, reviews:6540, address:"24 The Market, Covent Garden",   certified:true,  tags:["Burger","Milkshake","Fries","Chicken","Fast Casual"],            dishes:["ShackBurger","Crispy Chicken","Crinkle Fries","Concrete Shake"],        emoji:"🍔", x:64, y:44, instagram:"shakeshack",              igFollowers:"1.2M",  lat:51.5115, lng:-0.1231 },
  { id:19, name:"Five Guys",                cuisine:"Burgers",      rating:4.5, price:2, reviews:9210, address:"1-3 Long Acre, Covent Garden",   certified:true,  tags:["Burger","Loaded","Fries","Peanuts","Customise"],                 dishes:["Little Burger","Cajun Fries","Hot Dog","BLT Burger"],                   emoji:"🍔", x:63, y:43, instagram:"fiveguys",                igFollowers:"678K",  lat:51.5121, lng:-0.1239 },
  { id:20, name:"Patty & Bun",              cuisine:"Burgers",      rating:4.7, price:2, reviews:4320, address:"54 James St, Marylebone",         certified:true,  tags:["Burger","Gourmet","Smash","Truffle","Trendy"],                   dishes:["Ari Gold Burger","Smoky Robinson","Sweet Potato Fries","Slaw"],         emoji:"🍔", x:48, y:37, instagram:"pattyandbun",             igFollowers:"128K",  lat:51.5154, lng:-0.1556 },
  { id:21, name:"Bleecker Burger",          cuisine:"Burgers",      rating:4.8, price:2, reviews:2890, address:"Spitalfields Mkt, E1",            certified:true,  tags:["Burger","Smash","Simple","Cheese","Street Food"],                dishes:["Bleecker Black","Cheeseburger","Double Burger","Cheese Fries"],         emoji:"🍔", x:80, y:40, instagram:"bleeckerburger",          igFollowers:"76K",   lat:51.5196, lng:-0.0756 },
  // ── Italian ──
  { id:23, name:"Pasta Evangelists",        cuisine:"Italian",      rating:4.6, price:2, reviews:2870, address:"62 Worship St, Shoreditch",       certified:true,  tags:["Pasta","Fresh","Takeaway","Vegetarian","Italian"],               dishes:["Cacio e Pepe","Lobster Pasta","Truffle Tagliatelle","Tiramisu"],        emoji:"🍝", x:79, y:35, instagram:"pastaevangelists",        igFollowers:"164K",  lat:51.5232, lng:-0.0844 },
  { id:24, name:"Bocca di Lupo",            cuisine:"Italian",      rating:4.7, price:3, reviews:3560, address:"12 Archer St, Soho",              certified:false, tags:["Italian","Regional","Wine","Date Night","Upscale"],              dishes:["Tagliolini Nero","Burrata","Tiramisu","Veal Chop","Risotto"],           emoji:"🐺", x:59, y:46, instagram:"boccadilupo",             igFollowers:"43K",   lat:51.5120, lng:-0.1310 },
  // ── Thai / Asian ──
  { id:25, name:"Kiln Soho",                cuisine:"Thai",         rating:4.6, price:2, reviews:1870, address:"58 Brewer St, Soho",              certified:true,  tags:["Spicy","Noodles","Street Food","BBQ","Thai"],                    dishes:["Baan Pla","Grilled Pork Collar","Clay Pot Crab","Pad Thai"],            emoji:"🍜", x:59, y:46, instagram:"kilnsoho",                igFollowers:"29K",   lat:51.5117, lng:-0.1328 },
  { id:26, name:"Smoking Goat",             cuisine:"Thai",         rating:4.5, price:2, reviews:2140, address:"64 Shoreditch High St",            certified:true,  tags:["Thai BBQ","Smoky","Trendy","Spicy","Noodles"],                   dishes:["BBQ Chicken Wings","Crying Tiger Steak","Papaya Salad","Khao Man Gai"], emoji:"🐐", x:80, y:33, instagram:"smokinggoatbar",          igFollowers:"34K",   lat:51.5250, lng:-0.0781 },
  { id:27, name:"Rosa's Thai",              cuisine:"Thai",         rating:4.4, price:1, reviews:3980, address:"48 Dean St, Soho",                certified:true,  tags:["Thai","Budget","Casual","Noodles","Curry"],                      dishes:["Pad Thai","Green Curry","Spring Rolls","Mango Sticky Rice"],            emoji:"🌺", x:58, y:45, instagram:"rosasthaicafe",           igFollowers:"47K",   lat:51.5133, lng:-0.1318 },
  // ── Japanese ──
  { id:28, name:"Zuma",                     cuisine:"Japanese",     rating:4.9, price:4, reviews:4102, address:"5 Raphael St, Knightsbridge",     certified:false, tags:["Fine Dining","Sushi","Wagyu","Special Occasion","Japanese"],     dishes:["Yellowtail Sashimi","Wagyu Beef","Miso Black Cod","Edamame"],           emoji:"🍣", x:41, y:53, instagram:"zumarestaurant",          igFollowers:"486K",  lat:51.5015, lng:-0.1632 },
  { id:29, name:"Roka Charlotte Street",    cuisine:"Japanese",     rating:4.6, price:3, reviews:2760, address:"37 Charlotte St, Fitzrovia",      certified:false, tags:["Robatayaki","Japanese","Date Night","Upscale","Sushi"],          dishes:["Black Cod Miso","Wagyu Tataki","Salmon Sashimi","Tuna Roll"],           emoji:"🎋", x:56, y:37, instagram:"rokarestaurant",          igFollowers:"112K",  lat:51.5191, lng:-0.1349 },
  // ── Seafood ──
  { id:30, name:"Claw",                     cuisine:"Seafood",      rating:4.5, price:2, reviews:1540, address:"2 Kingly St, Soho",               certified:true,  tags:["Seafood","Lobster","Crab","Casual","Lunch"],                     dishes:["Lobster Roll","Crab Mac & Cheese","Prawn Tacos","Fish & Chips"],        emoji:"🦞", x:60, y:48, instagram:"clawsoho",                igFollowers:"14K",   lat:51.5126, lng:-0.1351 },
  { id:31, name:"Sheekey's",                cuisine:"Seafood",      rating:4.7, price:4, reviews:3890, address:"28-34 St Martin's Ct, WC2",       certified:false, tags:["Seafood","Fine Dining","Fish","Classic","Special Occasion"],     dishes:["Fish Pie","Fruits de Mer","Dover Sole","Crab Salad"],                   emoji:"🐟", x:63, y:43, instagram:"jsheekeyrestaurant",      igFollowers:"29K",   lat:51.5115, lng:-0.1261 },
  // ── Chicken / Wings ──
  { id:32, name:"Butchies",                 cuisine:"Chicken",      rating:4.7, price:2, reviews:2670, address:"Old St Station, EC1",             certified:true,  tags:["Fried Chicken","Wings","Burger","Loaded","Street Food"],         dishes:["Nashville Chicken Burger","Hot Wings","Mac & Cheese","Waffles"],        emoji:"🍗", x:77, y:37, instagram:"butchies_uk",             igFollowers:"43K",   lat:51.5252, lng:-0.0878 },
  { id:33, name:"Thunderbird Chicken",      cuisine:"Chicken",      rating:4.6, price:2, reviews:1980, address:"62 Commercial St, Spitalfields",  certified:true,  tags:["Fried Chicken","Nashville","Spicy","Burger","Wings"],            dishes:["Thunderbird Sandwich","Hot Tenders","Loaded Fries","Slaw"],             emoji:"🌩️", x:81, y:41, instagram:"thunderbirdchicken",      igFollowers:"31K",   lat:51.5196, lng:-0.0745 },
  { id:34, name:"Absurd Bird",              cuisine:"Chicken",      rating:4.5, price:2, reviews:2340, address:"Murray St, Camden",               certified:true,  tags:["Southern Fried","Chicken","Waffles","Burger","Casual"],          dishes:["Classic Chicken & Waffles","Fried Chicken Burger","Loaded Fries"],     emoji:"🐦", x:53, y:18, instagram:"absurd_bird",             igFollowers:"19K",   lat:51.5390, lng:-0.1426 },
  // ── Pizza ──
  { id:35, name:"Yard Sale Pizza",          cuisine:"Pizza",        rating:4.6, price:1, reviews:3120, address:"105 Lower Clapton Rd, Hackney",   certified:true,  tags:["Pizza","Casual","Takeaway","Vegan Friendly","Hackney"],          dishes:["Margherita","Loaded Veggie","Meat Feast","Nduja","Garlic Bread"],       emoji:"🍕", x:86, y:18, instagram:"yardsalepizza",           igFollowers:"28K",   lat:51.5520, lng:-0.0524 },
  { id:36, name:"Pizza Pilgrims",           cuisine:"Pizza",        rating:4.5, price:2, reviews:4890, address:"11 Dean St, Soho",                certified:true,  tags:["Neapolitan","Pizza","Casual","Italian","Lunch"],                 dishes:["Marinara","Diavola","Nduja Calzone","Tiramisu","Campari Spritz"],       emoji:"🍕", x:58, y:45, instagram:"pizzapilgrims",           igFollowers:"186K",  lat:51.5133, lng:-0.1318 },
  // ── Korean ──
  { id:37, name:"Jinjuu",                   cuisine:"Korean",       rating:4.5, price:2, reviews:1780, address:"15 Kingly St, Soho",              certified:true,  tags:["Korean","BBQ","Fried Chicken","Trendy","Cocktails"],             dishes:["Korean Fried Chicken","Bibimbap","Japchae","Wagyu Bulgogi","Kimchi"],   emoji:"🇰🇷", x:60, y:46, instagram:"jinjuu",                 igFollowers:"22K",   lat:51.5126, lng:-0.1348 },
  { id:38, name:"Wingstop",                 cuisine:"Korean",       rating:4.4, price:1, reviews:5670, address:"170 Wardour St, Soho",            certified:true,  tags:["Wings","Korean","Fried Chicken","Budget","Casual"],              dishes:["Korean Q Wings","Lemon Pepper Wings","Cajun Fries","Ranch Dip"],        emoji:"🍗", x:58, y:44, instagram:"wingstopuk",              igFollowers:"95K",   lat:51.5138, lng:-0.1310 },
  // ── African / West African ──
  { id:39, name:"Akara",                    cuisine:"West African", rating:4.6, price:2, reviews:980,  address:"27 Coldharbour Ln, Brixton",      certified:true,  tags:["West African","Jollof","Suya","Family","Authentic"],             dishes:["Jollof Rice","Suya Skewers","Egusi Soup","Puff Puff","Fried Plantain"], emoji:"🌍", x:55, y:82, instagram:"akarabrixton",            igFollowers:"12K",   lat:51.4627, lng:-0.1146 },
  { id:40, name:"Ikoyi",                    cuisine:"West African", rating:4.8, price:4, reviews:1560, address:"1 St James's Market, SW1",        certified:true,  tags:["West African","Fine Dining","Award-Winning","Unique","Upscale"], dishes:["Smoked Jollof Rice","Suya Aged Beef","Chin Chin","Agege Bread"],        emoji:"⭐", x:53, y:48, instagram:"ikoyilondon",             igFollowers:"27K",   lat:51.5083, lng:-0.1368 },
  // ── Persian / Iranian ──
  { id:41, name:"Kateh",                    cuisine:"Persian",      rating:4.7, price:2, reviews:2110, address:"5 Warwick Pl, Little Venice",     certified:true,  tags:["Persian","Rice","Kebab","Romantic","Authentic"],                 dishes:["Lamb Shank","Saffron Rice","Koobideh Kebab","Fesenjan","Doogh"],        emoji:"🌸", x:30, y:28, instagram:"katerestaurant",          igFollowers:"8.9K",  lat:51.5232, lng:-0.1921 },
  { id:42, name:"Colbeh",                   cuisine:"Persian",      rating:4.5, price:2, reviews:1340, address:"43 Porchester Rd, Bayswater",     certified:true,  tags:["Persian","Kebab","Rice","Family","Authentic"],                   dishes:["Lamb Kebab","Chicken Joojeh","Ghormeh Sabzi","Saffron Ice Cream"],      emoji:"🫚", x:31, y:31, instagram:"colbehrestaurant",        igFollowers:"6.2K",  lat:51.5165, lng:-0.1878 },
  // ── Ethiopian / Eritrean ──
  { id:43, name:"Merkato",                  cuisine:"Ethiopian",    rating:4.5, price:1, reviews:1230, address:"196 Caledonian Rd, Islington",    certified:true,  tags:["Ethiopian","Injera","Vegetarian","Communal","Authentic"],        dishes:["Doro Wat","Injera","Tibs","Shiro","Vegetarian Combo"],                  emoji:"🫓", x:63, y:20, instagram:"merkatoethiopian",        igFollowers:"4.3K",  lat:51.5390, lng:-0.1100 },
  // ── Somali ──
  { id:44, name:"Bravanese Café",           cuisine:"Somali",       rating:4.4, price:1, reviews:870,  address:"8 Hoxton Market, N1",             certified:true,  tags:["Somali","Rice","Camel","Goat","Authentic"],                      dishes:["Bariis Iskukaris","Suqaar","Goat Stew","Sambuusa","Halwa"],             emoji:"🐪", x:74, y:27, instagram:"bravanescafe",            igFollowers:"3.1K",  lat:51.5296, lng:-0.0826 },
  // ── Chinese / Dim Sum ──
  { id:45, name:"Buns & Bao",               cuisine:"Chinese",      rating:4.5, price:1, reviews:2100, address:"29 Store St, Bloomsbury",         certified:true,  tags:["Chinese","Bao","Fried Chicken","Budget","Fusion"],               dishes:["Crispy Chicken Bao","Pork Belly Bao","Truffle Fries","Matcha Ice Cream"],emoji:"🥟", x:62, y:40, instagram:"bunsandbao",              igFollowers:"21K",   lat:51.5198, lng:-0.1302 },
  // ── Mexican ──
  { id:46, name:"Breddos Tacos",            cuisine:"Mexican",      rating:4.6, price:2, reviews:2560, address:"82 Goswell Rd, Clerkenwell",      certified:true,  tags:["Tacos","Mexican","Street Food","Spicy","Casual"],                dishes:["Birria Tacos","Habanero Chicken","Elotes","Al Pastor","Churros"],       emoji:"🌮", x:70, y:37, instagram:"breddostacos",            igFollowers:"55K",   lat:51.5225, lng:-0.1025 },
  // ── Breakfast / Brunch ──
  { id:47, name:"Ottolenghi Islington",     cuisine:"Mediterranean",rating:4.6, price:2, reviews:3870, address:"287 Upper St, Islington",         certified:false, tags:["Brunch","Vegetarian","Mediterranean","Salads","Bakery"],         dishes:["Eggs Shakshuka","Roasted Veg Salad","Knafeh","Cardamom Bun"],           emoji:"🥐", x:66, y:19, instagram:"ottolenghi",              igFollowers:"892K",  lat:51.5390, lng:-0.1025 },
  // ── Steakhouse ──
  { id:48, name:"Goodman Steakhouse",       cuisine:"Steakhouse",   rating:4.7, price:4, reviews:3210, address:"26 Maddox St, Mayfair",           certified:true,  tags:["Steak","Fine Dining","Wagyu","Special Occasion","Meat Lover"],   dishes:["USDA Ribeye","Wagyu Burger","Truffle Mac","Bone Marrow","Cheesecake"],  emoji:"🥩", x:51, y:41, instagram:"goodmanrestaurants",      igFollowers:"47K",   lat:51.5115, lng:-0.1434 },
  // ── Wraps / Fast Casual ──
  { id:49, name:"Wrap It Up!",              cuisine:"Wraps",        rating:4.2, price:1, reviews:1870, address:"Multiple Locations, London",      certified:true,  tags:["Wrap","Budget","Halal","Quick Bite","Takeaway"],                 dishes:["Chicken Tikka Wrap","Falafel Wrap","Doner Wrap","Shawarma Wrap"],       emoji:"🌯", x:55, y:44, instagram:"wrapitupuk",              igFollowers:"6.7K",  lat:51.5140, lng:-0.1278 },
  // ── Desserts / Sweets ──
  { id:50, name:"Comptoir du Chocolat",     cuisine:"Desserts",     rating:4.5, price:2, reviews:1430, address:"89-91 Turnham Green Terrace, W4", certified:true,  tags:["Dessert","Chocolate","Waffles","Crepes","Sweet"],                dishes:["Dark Chocolate Fondue","Belgian Waffles","Crêpes","Hot Chocolate"],     emoji:"🍫", x:18, y:44, instagram:"comptoirduchocoat",       igFollowers:"9.3K",  lat:51.4946, lng:-0.2580 },

  // ── Central London ──
  { id:51, name:"Noor Jahan",               cuisine:"Indian",       rating:4.5, price:2, reviews:2100, address:"2a Bina Gardens, South Kensington",certified:true,  tags:["Indian","Curry","Casual","Lamb","Chicken"],                      dishes:["Lamb Rogan Josh","Chicken Tikka","Naan","Pilau Rice","Mango Lassi"],    emoji:"🍛", x:38, y:52, instagram:"noorjahan_london",         igFollowers:"6.1K",  lat:51.4946, lng:-0.1810 },
  { id:52, name:"Roti King",                cuisine:"Malaysian",    rating:4.7, price:1, reviews:3870, address:"40 Doric Way, Euston",             certified:true,  tags:["Malaysian","Roti","Curry","Budget","Cult"],                      dishes:["Roti Canai","Dhal Curry","Beef Rendang","Teh Tarik","Satay"],           emoji:"🫓", x:59, y:36, instagram:"rotikinguk",               igFollowers:"22K",   lat:51.5266, lng:-0.1338 },
  { id:53, name:"Pilpel",                   cuisine:"Israeli",      rating:4.4, price:1, reviews:2540, address:"38 Brushfield St, Spitalfields",   certified:true,  tags:["Falafel","Israeli","Healthy","Budget","Wrap"],                   dishes:["Falafel Wrap","Hummus Bowl","Sabich","Shakshuka","Halloumi Wrap"],       emoji:"🧆", x:79, y:42, instagram:"pilpeluk",                 igFollowers:"14K",   lat:51.5196, lng:-0.0757 },
  { id:54, name:"Gunpowder",                cuisine:"Indian",       rating:4.6, price:2, reviews:1980, address:"11 White's Row, Spitalfields",     certified:true,  tags:["Indian","Small Plates","Spicy","Modern","Trendy"],               dishes:["Kashmiri Lamb Chops","Crispy Okra","Daal","Pav Bhaji","Kulfi"],         emoji:"💥", x:80, y:41, instagram:"gunpowderlondon",          igFollowers:"19K",   lat:51.5189, lng:-0.0764 },
  { id:55, name:"Berber & Q Shawarma Bar",  cuisine:"Middle Eastern",rating:4.6,price:2, reviews:2210, address:"338 Acton Mews, Haggerston",      certified:true,  tags:["Shawarma","Middle Eastern","Trendy","Grill","Casual"],           dishes:["Chicken Shawarma","Lamb Shawarma","Fattoush","Hummus","Baklava"],        emoji:"🥙", x:76, y:25, instagram:"berberandq",               igFollowers:"48K",   lat:51.5371, lng:-0.0741 },
  { id:56, name:"Wadadli Kitchen",          cuisine:"Caribbean",    rating:4.5, price:2, reviews:890,  address:"87 Exmouth Market, Clerkenwell",  certified:true,  tags:["Caribbean","Jerk","Rice","Casual","Authentic"],                  dishes:["Jerk Chicken","Rice & Peas","Curry Goat","Plantain","Festival"],        emoji:"🌴", x:67, y:36, instagram:"wadadlikitchen",            igFollowers:"7.2K",  lat:51.5244, lng:-0.1090 },
  { id:57, name:"Peckish",                  cuisine:"Pakistani",    rating:4.5, price:1, reviews:1540, address:"48 Whitechapel Rd, E1",            certified:true,  tags:["Pakistani","Karahi","Budget","Authentic","Grill"],               dishes:["Chicken Karahi","Seekh Kebab","Chapli Kebab","Lassi","Halwa Puri"],     emoji:"🍖", x:81, y:44, instagram:"peckishlondon",             igFollowers:"8.9K",  lat:51.5154, lng:-0.0631 },
  { id:58, name:"Lahore Kebab House",       cuisine:"Pakistani",    rating:4.5, price:1, reviews:4210, address:"2-10 Umberston St, Whitechapel",  certified:true,  tags:["Pakistani","Iconic","Budget","Grill","Lamb"],                    dishes:["Mixed Grill","Lamb Chops","Karahi","Naan","Lassi"],                     emoji:"🔥", x:82, y:45, instagram:"lahorekebabhouse",          igFollowers:"31K",   lat:51.5141, lng:-0.0590 },
  { id:59, name:"Needoo Grill",             cuisine:"Pakistani",    rating:4.6, price:1, reviews:3100, address:"87 New Rd, Whitechapel",           certified:true,  tags:["Pakistani","Grill","Budget","Lamb","Authentic"],                 dishes:["Lamb Chops","Seekh Kebab","Karahi","Paya","Nihari"],                    emoji:"🥩", x:82, y:43, instagram:"needoogrill",               igFollowers:"12K",   lat:51.5152, lng:-0.0617 },
  { id:60, name:"Cafe Spice Namaste",       cuisine:"Indian",       rating:4.6, price:3, reviews:1870, address:"16 Prescot St, Aldgate",           certified:true,  tags:["Indian","Parsee","Unique","Date Night","Upscale"],               dishes:["Dhansak","Lamb Farcha","Prawn Patio","Cardamom Kulfi"],                 emoji:"✨", x:78, y:46, instagram:"cafespicenamaste",          igFollowers:"9.3K",  lat:51.5108, lng:-0.0701 },

  // ── East London ──
  { id:61, name:"Ramen Yorokobi",           cuisine:"Japanese",     rating:4.5, price:2, reviews:1230, address:"74 Kingsland Rd, Shoreditch",      certified:true,  tags:["Ramen","Japanese","Noodles","Casual","Cosy"],                    dishes:["Tonkotsu Ramen","Gyoza","Karaage Chicken","Matcha Ice Cream"],          emoji:"🍜", x:77, y:28, instagram:"ramenyorokobi",             igFollowers:"11K",   lat:51.5299, lng:-0.0793 },
  { id:62, name:"Coqfighter",               cuisine:"Chicken",      rating:4.7, price:2, reviews:2100, address:"39 Brick Lane, E1",                certified:true,  tags:["Fried Chicken","Burger","Spicy","Trendy","Brick Lane"],          dishes:["Signature Fried Chicken","Nashville Sandwich","Loaded Fries","Slaw"],  emoji:"🍗", x:80, y:42, instagram:"coqfighter",               igFollowers:"28K",   lat:51.5212, lng:-0.0713 },
  { id:63, name:"Sweet Thursday",           cuisine:"Pizza",        rating:4.5, price:2, reviews:1650, address:"95 Southgate Rd, De Beauvoir",     certified:true,  tags:["Pizza","Casual","Neighbourhood","Italian","Relaxed"],            dishes:["Margherita","Nduja","Burrata","Tiramisu","House Red"],                  emoji:"🍕", x:74, y:23, instagram:"sweetthursdaypizza",        igFollowers:"8.7K",  lat:51.5390, lng:-0.0860 },
  { id:65, name:"Tayyabs East",             cuisine:"Pakistani",    rating:4.5, price:1, reviews:2100, address:"134 Whitechapel High St, E1",      certified:true,  tags:["Pakistani","Budget","Grill","Lamb","Quick Bite"],                dishes:["Lamb Chops","Karahi","Seekh Kebab","Paratha","Lassi"],                  emoji:"🍖", x:80, y:44, instagram:"tayyabseastlondon",        igFollowers:"8.1K",  lat:51.5153, lng:-0.0672 },
  { id:66, name:"Big Jo Bakery",            cuisine:"Bakery",       rating:4.6, price:1, reviews:980,  address:"162 Bethnal Green Rd, E2",         certified:true,  tags:["Bakery","Breakfast","Pastries","Coffee","Casual"],               dishes:["Croissant","Cardamom Bun","Egg Roll","Flat White","Cinnamon Roll"],     emoji:"🥐", x:78, y:36, instagram:"bigjobakery",               igFollowers:"14K",   lat:51.5255, lng:-0.0731 },
  { id:67, name:"Smokestak",                cuisine:"BBQ",          rating:4.7, price:3, reviews:2340, address:"35 Sclater St, Shoreditch",        certified:true,  tags:["BBQ","Smoked","Brisket","Trendy","Shoreditch"],                  dishes:["Beef Brisket","Smoked Ribs","Burnt Ends","Slaw","Cornbread"],           emoji:"🥩", x:79, y:37, instagram:"smokestak",                 igFollowers:"56K",   lat:51.5232, lng:-0.0741 },
  { id:68, name:"Dishoom Shoreditch",       cuisine:"Indian",       rating:4.7, price:2, reviews:6100, address:"7 Boundary St, Shoreditch",        certified:true,  tags:["Indian","Brunch","Curry","Naan","Trendy"],                       dishes:["Bacon Naan Roll","Black Daal","Lamb Raan","House Black Tea","Chai"],    emoji:"🍛", x:78, y:33, instagram:"dishoom",                   igFollowers:"432K",  lat:51.5264, lng:-0.0779 },
  { id:69, name:"Bleecker Burger Spitalfields",cuisine:"Burgers",   rating:4.8, price:2, reviews:3200, address:"Spitalfields Market, E1",          certified:true,  tags:["Burger","Smash","Cheese","Street Food","Market"],                dishes:["Bleecker Black","Double Cheeseburger","Cheese Fries","Shake"],         emoji:"🍔", x:79, y:41, instagram:"bleeckerburger",             igFollowers:"76K",   lat:51.5196, lng:-0.0756 },

  // ── More Central London ──
  { id:71, name:"Flat Iron",                cuisine:"Steakhouse",   rating:4.7, price:2, reviews:4200, address:"17 Beak St, Soho",               certified:true,  tags:["Steak","Casual","Budget","Flat Iron","Meat"],                    dishes:["Flat Iron Steak","Creamed Spinach","Beef Dripping Chips","Salted Caramel Ice Cream"], emoji:"🥩", x:59, y:46, instagram:"flatironsteak", igFollowers:"89K", lat:51.5124, lng:-0.1365 },
  { id:72, name:"Bao Soho",                 cuisine:"Taiwanese",    rating:4.6, price:2, reviews:3100, address:"53 Lexington St, Soho",           certified:true,  tags:["Bao","Taiwanese","Trendy","Small Plates","Queue"],               dishes:["Classic Bao","Daikon Bao","Fried Chicken","Horlicks Ice Cream"],        emoji:"🥟", x:59, y:47, instagram:"baolondon",     igFollowers:"142K", lat:51.5131, lng:-0.1338 },
  { id:73, name:"Cay Tre",                  cuisine:"Vietnamese",   rating:4.5, price:1, reviews:2870, address:"301 Old St, Shoreditch",          certified:true,  tags:["Vietnamese","Pho","Noodles","Budget","Casual"],                  dishes:["Pho Bo","Banh Mi","Spring Rolls","Bun Bo Hue","Cha Gio"],              emoji:"🍜", x:77, y:34, instagram:"caytresoho",    igFollowers:"12K",  lat:51.5263, lng:-0.0869 },
  { id:74, name:"Hawksmoor Spitalfields",   cuisine:"Steakhouse",   rating:4.8, price:4, reviews:5600, address:"157a Commercial St, E1",          certified:true,  tags:["Steak","Fine Dining","Wagyu","Special Occasion","Cocktails"],    dishes:["Longhorn Ribeye","Triple Cooked Chips","Sticky Toffee Pudding"],       emoji:"🥩", x:79, y:39, instagram:"hawksmooruk",   igFollowers:"98K",  lat:51.5204, lng:-0.0741 },
  { id:75, name:"Temper Soho",              cuisine:"BBQ",          rating:4.6, price:3, reviews:2340, address:"25 Broadwick St, Soho",           certified:true,  tags:["BBQ","Fire","Tacos","Craft Beer","Trendy"],                      dishes:["Tacos","Smoked Brisket","Short Rib","Lamb Shoulder","Churros"],        emoji:"🔥", x:58, y:46, instagram:"temperrestaurant", igFollowers:"44K", lat:51.5136, lng:-0.1341 },
  { id:77, name:"Darjeeling Express",       cuisine:"Indian",       rating:4.7, price:2, reviews:1870, address:"Kingly Court, Carnaby St",        certified:true,  tags:["Indian","Homestyle","Unique","Lunch","Curry"],                   dishes:["Kolkata Biryani","Fish Curry","Dal","Roti","Mishti Doi"],               emoji:"🍛", x:58, y:45, instagram:"darjeelingexpress", igFollowers:"28K", lat:51.5130, lng:-0.1378 },
  { id:78, name:"Hoppers",                  cuisine:"Sri Lankan",   rating:4.6, price:2, reviews:3200, address:"49 Frith St, Soho",               certified:true,  tags:["Sri Lankan","Hoppers","Curry","Trendy","Brunch"],                dishes:["Egg Hopper","Lamb Kothu","Jaffna Curry","Short Eats","Pol Sambol"],     emoji:"🫓", x:59, y:45, instagram:"hopperslondon", igFollowers:"53K",  lat:51.5130, lng:-0.1310 },
  { id:80, name:"Blacklock Soho",           cuisine:"Steakhouse",   rating:4.7, price:2, reviews:3800, address:"24 Great Windmill St, Soho",      certified:true,  tags:["Chops","Steak","Casual","Budget","Meat"],                        dishes:["Pre-Theatre Chops","Single Chop","All In","Burnt Ends","Bone Marrow"], emoji:"🥩", x:59, y:47, instagram:"blacklockchops", igFollowers:"52K",  lat:51.5117, lng:-0.1341 },

  // ── More East London ──
  { id:88, name:"Oklava",                   cuisine:"Turkish",      rating:4.6, price:2, reviews:1650, address:"74 Luke St, Shoreditch",          certified:true,  tags:["Turkish","Modern","Mezze","Date Night","Casual"],                dishes:["Lamb Flatbread","Halloumi","Baklava","Smoked Aubergine"],               emoji:"🌮", x:77, y:32, instagram:"oklavalnd",     igFollowers:"18K",  lat:51.5254, lng:-0.0822 },
  { id:89, name:"Som Saa",                  cuisine:"Thai",         rating:4.7, price:2, reviews:2340, address:"43a Commercial St, E1",           certified:true,  tags:["Thai","Spicy","Authentic","Trendy","East London"],               dishes:["Larb Gai","Pad Kra Pao","Mango Sticky Rice","Thai Whisky Sour"],       emoji:"🍜", x:80, y:42, instagram:"somsaa_london", igFollowers:"29K",  lat:51.5196, lng:-0.0745 },

  // ── North & Additional Central ──
  { id:96, name:"Kiln Soho (Upstairs)",     cuisine:"Thai",         rating:4.5, price:2, reviews:980,  address:"58 Brewer St, Soho",              certified:true,  tags:["Thai","BBQ","Spicy","Street Food","Counter"],                    dishes:["Baan Pla","Pork Jowl","Clay Pot Crab","Khao Tom"],                     emoji:"🍜", x:59, y:46, instagram:"kilnsoho",      igFollowers:"29K",  lat:51.5118, lng:-0.1341 },
  { id:97, name:"Murger Han",               cuisine:"Chinese",      rating:4.6, price:1, reviews:1540, address:"141 Old St, EC1",                 certified:true,  tags:["Chinese","Xi'an","Noodles","Budget","Spicy"],                    dishes:["Rou Jia Mo","Biang Biang Noodles","Pork Burger","Lamb Skewers"],       emoji:"🥟", x:75, y:36, instagram:"murgerhan",     igFollowers:"8.2K", lat:51.5263, lng:-0.0882 },
  { id:98, name:"Xu Tea House",             cuisine:"Taiwanese",    rating:4.6, price:3, reviews:1870, address:"30 Rupert St, Soho",              certified:false, tags:["Taiwanese","Tea","Dim Sum","Elegant","Date Night"],              dishes:["Scallion Pancake","Xiao Long Bao","Taiwanese Fried Chicken","Tea"],    emoji:"🫖", x:59, y:46, instagram:"xulondon",      igFollowers:"21K",  lat:51.5122, lng:-0.1331 },
  { id:99, name:"Plaza Khao Gaeng",         cuisine:"Thai",         rating:4.7, price:1, reviews:2100, address:"Kingly Court, Carnaby",           certified:true,  tags:["Thai","Cafeteria","Budget","Authentic","Lunch"],                 dishes:["Khao Gaeng","Duck Leg Rice","Green Curry","Pad Kra Pao"],              emoji:"🍛", x:58, y:45, instagram:"plazakhaogaeng", igFollowers:"14K", lat:51.5130, lng:-0.1375 },
  { id:102,name:"E1 Kitchen",               cuisine:"Lebanese",     rating:4.5, price:1, reviews:1870, address:"55 Whitechapel High St, E1",      certified:true,  tags:["Lebanese","Budget","Mezze","Quick Bite","Whitechapel"],          dishes:["Shawarma","Hummus","Falafel","Fattoush","Baklava"],                     emoji:"🥙", x:81, y:44, instagram:"e1kitchen",     igFollowers:"5.2K", lat:51.5153, lng:-0.0672 },
  { id:103,name:"Breddos Tacos Clerkenwell",cuisine:"Mexican",      rating:4.6, price:2, reviews:2100, address:"82 Goswell Rd, Clerkenwell",      certified:true,  tags:["Tacos","Mexican","Street Food","Spicy","Casual"],                dishes:["Birria Tacos","Al Pastor","Elotes","Churros","Habanero Hot Sauce"],     emoji:"🌮", x:70, y:37, instagram:"breddostacos",  igFollowers:"55K",  lat:51.5225, lng:-0.1025 },
  { id:104,name:"Leroy",                    cuisine:"French",       rating:4.7, price:3, reviews:1450, address:"18 Phipp St, Shoreditch",         certified:false, tags:["French","Wine","Neighbourhood","Seasonal","Relaxed"],            dishes:["Charcuterie","Duck","Crème Caramel","Natural Wine"],                   emoji:"🇫🇷", x:78, y:34, instagram:"leroyshoreditch", igFollowers:"8.7K", lat:51.5243, lng:-0.0822 },
  { id:105,name:"Bao Fitzrovia",            cuisine:"Taiwanese",    rating:4.5, price:2, reviews:1980, address:"31 Windmill St, Fitzrovia",       certified:true,  tags:["Bao","Taiwanese","Lunch","Casual","Small Plates"],               dishes:["Classic Bao","Confit Pork","Fried Chicken Bao","Horlicks Soft Serve"], emoji:"🥟", x:57, y:38, instagram:"baolondon",     igFollowers:"142K", lat:51.5189, lng:-0.1352 },

  // ── North London — Camden, Archway, Finsbury Park ──
  { id:106,name:"Afghan Kitchen",           cuisine:"Afghani",      rating:4.6, price:1, reviews:2100, address:"35 Islington Green, N1",           certified:true,  tags:["Afghani","Authentic","Budget","Lamb","Rice"],                    dishes:["Lamb Qorma","Mantu","Bolani","Kabuli Pulao","Shorwa"],                  emoji:"🍖", x:66, y:22, instagram:"afghankitchenlondon", igFollowers:"4.1K", lat:51.5390, lng:-0.1026 },
  { id:107,name:"Shish",                    cuisine:"Turkish",      rating:4.5, price:2, reviews:1870, address:"2-6 Station Parade, Willesden",    certified:true,  tags:["Turkish","Kebab","Grill","Family","Casual"],                     dishes:["Mixed Grill","Lamb Shish","Pide","Baklava","Adana"],                   emoji:"🌮", x:35, y:22, instagram:"shishrestaurant",    igFollowers:"8.2K", lat:51.5505, lng:-0.2214 },
  { id:108,name:"Roti Stop",                cuisine:"Pakistani",    rating:4.6, price:1, reviews:1540, address:"186 Blackstock Rd, Highbury",      certified:true,  tags:["Pakistani","Roti","Budget","Authentic","Karahi"],                dishes:["Chicken Karahi","Lamb Roti","Daal","Seekh Kebab","Lassi"],             emoji:"🫓", x:68, y:16, instagram:"rotistoplondon",     igFollowers:"5.3K", lat:51.5601, lng:-0.0986 },
  { id:109,name:"Gallipoli Bazaar",         cuisine:"Turkish",      rating:4.5, price:2, reviews:2340, address:"107 Upper St, Islington",          certified:true,  tags:["Turkish","Mezze","Date Night","Casual","Atmospheric"],           dishes:["Mezze Platter","Lamb Kofte","Pide","Turkish Tea","Baklava"],           emoji:"🌿", x:66, y:20, instagram:"gallipolirestaurant", igFollowers:"11K", lat:51.5406, lng:-0.1029 },
  { id:110,name:"Yildiz",                   cuisine:"Turkish",      rating:4.4, price:1, reviews:1230, address:"77 Caledonian Rd, Kings Cross",    certified:true,  tags:["Turkish","Budget","Kebab","Quick Bite","Grill"],                 dishes:["Doner Kebab","Chicken Shish","Pide","Salad","Ayran"],                  emoji:"⭐", x:62, y:27, instagram:"yildizrestaurant",   igFollowers:"3.2K", lat:51.5352, lng:-0.1198 },
  { id:111,name:"Gem Restaurant",           cuisine:"Turkish",      rating:4.6, price:2, reviews:1980, address:"265 Upper St, Islington",          certified:true,  tags:["Turkish","Ocakbasi","Grill","Casual","Family"],                  dishes:["Mixed Grill","Lamb Chops","Chicken Adana","Pide","Hummus"],            emoji:"💎", x:66, y:18, instagram:"gemrestaurantislington", igFollowers:"6.7K", lat:51.5443, lng:-0.1040 },
  { id:112,name:"Kervan",                   cuisine:"Turkish",      rating:4.5, price:2, reviews:1650, address:"47 Green Lanes, Stoke Newington",  certified:true,  tags:["Turkish","Ocakbasi","Authentic","Family","Grill"],               dishes:["Lamb Shish","Chicken Wings","Pide","Cacik","Baklava"],                 emoji:"🔥", x:73, y:14, instagram:"kervanrestaurant",   igFollowers:"4.8K", lat:51.5634, lng:-0.0820 },
  { id:113,name:"Diyarbakir Kitchen",       cuisine:"Kurdish",      rating:4.7, price:1, reviews:980,  address:"79 Green Lanes, N16",              certified:true,  tags:["Kurdish","Authentic","Budget","Lamb","Meze"],                    dishes:["Kurdish Lamb Stew","Stuffed Vine Leaves","Lahmacun","Ayran"],          emoji:"🌶️", x:73, y:13, instagram:"diyarbakirlondon",  igFollowers:"3.1K", lat:51.5645, lng:-0.0818 },
  { id:115,name:"Chutneys",                 cuisine:"Indian",       rating:4.5, price:1, reviews:3100, address:"124 Drummond St, Euston",          certified:true,  tags:["Indian","Vegetarian","Budget","Buffet","Curry"],                 dishes:["Thali","Dosa","Samosas","Chutney Platter","Mango Lassi"],              emoji:"🍛", x:60, y:31, instagram:"chutneyslondon",    igFollowers:"7.2K", lat:51.5281, lng:-0.1337 },
  { id:116,name:"Diwana",                   cuisine:"Indian",       rating:4.4, price:1, reviews:2540, address:"121 Drummond St, Euston",          certified:true,  tags:["Indian","Vegetarian","Budget","Gujarati","Buffet"],              dishes:["Bhel Puri","Pani Puri","Dosa","Thali","Kulfi"],                        emoji:"🌸", x:60, y:31, instagram:"diwanalondon",      igFollowers:"5.1K", lat:51.5282, lng:-0.1338 },
  { id:118,name:"Petek",                    cuisine:"Turkish",      rating:4.5, price:1, reviews:1230, address:"96 Stroud Green Rd, Finsbury Pk",  certified:true,  tags:["Turkish","Pastry","Baklava","Budget","Dessert"],                 dishes:["Baklava","Kadayif","Turkish Delight","Simit","Tea"],                   emoji:"🍯", x:65, y:14, instagram:"petekpastry",       igFollowers:"6.8K", lat:51.5643, lng:-0.1041 },
  { id:119,name:"Izgara",                   cuisine:"Turkish",      rating:4.5, price:2, reviews:1450, address:"56 Stroud Green Rd, N4",           certified:true,  tags:["Turkish","Grill","Casual","Family","Budget"],                    dishes:["Mixed Grill","Lamb Shish","Chicken Adana","Pide","Ayran"],             emoji:"🔥", x:65, y:14, instagram:"izgaralondon",      igFollowers:"2.8K", lat:51.5641, lng:-0.1042 },

  // ── West London — Ealing, Southall, Shepherd's Bush ──
  { id:121,name:"Brilliant Restaurant",     cuisine:"Indian",       rating:4.7, price:2, reviews:4200, address:"72-76 Western Rd, Southall",       certified:true,  tags:["Indian","Punjabi","Family","Iconic","Curry"],                    dishes:["Chicken Tikka","Lamb Karahi","Daal Makhani","Naan","Kulfi"],           emoji:"⭐", x:10, y:42, instagram:"brilliantrestaurant", igFollowers:"12K", lat:51.5107, lng:-0.3756 },
  { id:122,name:"Gifto's Lahori Karahi",    cuisine:"Pakistani",    rating:4.6, price:1, reviews:3100, address:"162-164 The Broadway, Southall",   certified:true,  tags:["Pakistani","Karahi","Budget","Authentic","Southall"],            dishes:["Lamb Karahi","Chicken Karahi","Seekh Kebab","Naan","Lassi"],           emoji:"🍖", x:10, y:43, instagram:"giftos_lahori",     igFollowers:"8.9K", lat:51.5118, lng:-0.3754 },
  { id:123,name:"Sheesh Mahal",             cuisine:"Indian",       rating:4.5, price:2, reviews:2100, address:"45 The Broadway, Southall",        certified:true,  tags:["Indian","Curry","Family","Southall","Biriyani"],                 dishes:["Chicken Biryani","Lamb Rogan Josh","Butter Chicken","Gulab Jamun"],    emoji:"🍛", x:10, y:43, instagram:"sheeshmahal",       igFollowers:"6.1K", lat:51.5123, lng:-0.3749 },
  { id:124,name:"Madhu's",                  cuisine:"Indian",       rating:4.7, price:3, reviews:3870, address:"39 South Rd, Southall",            certified:true,  tags:["Indian","Kenyan Asian","Upscale","Family","Special Occasion"],   dishes:["Madhu's Chicken","Lamb Chops","Prawn Puri","Kulfi"],                   emoji:"🌟", x:10, y:44, instagram:"madhusrestaurant",  igFollowers:"21K",  lat:51.5108, lng:-0.3741 },
  { id:125,name:"New Asian Tandoori",       cuisine:"Indian",       rating:4.5, price:1, reviews:1870, address:"114 The Green, Southall",          certified:true,  tags:["Indian","Budget","Tandoori","Family","Casual"],                  dishes:["Tandoori Chicken","Lamb Kebab","Naan","Daal","Raita"],                 emoji:"🔥", x:10, y:44, instagram:"newasiantandoori",  igFollowers:"3.2K", lat:51.5103, lng:-0.3752 },
  { id:126,name:"Agadir",                   cuisine:"Moroccan",     rating:4.6, price:2, reviews:1540, address:"98 Uxbridge Rd, Shepherd's Bush",  certified:true,  tags:["Moroccan","Tagine","Couscous","Casual","Authentic"],             dishes:["Lamb Tagine","Couscous","Pastilla","Mint Tea","Harira"],               emoji:"🫖", x:22, y:43, instagram:"agadirrestaurant",  igFollowers:"5.4K", lat:51.5047, lng:-0.2268 },
  { id:127,name:"Abu Zaad",                 cuisine:"Syrian",       rating:4.7, price:1, reviews:2870, address:"29 Uxbridge Rd, Shepherd's Bush",  certified:true,  tags:["Syrian","Budget","Mezze","Authentic","Family"],                  dishes:["Hummus","Mixed Grill","Fattoush","Falafel","Kibbeh"],                  emoji:"🧆", x:22, y:42, instagram:"abuzaadlondon",     igFollowers:"14K",  lat:51.5051, lng:-0.2278 },
  { id:128,name:"Hafez",                    cuisine:"Persian",      rating:4.6, price:2, reviews:1650, address:"5 Hereford Rd, Notting Hill",      certified:true,  tags:["Persian","Kebab","Rice","Authentic","Casual"],                   dishes:["Koobideh","Joojeh Kebab","Ghormeh Sabzi","Zereshk Polo"],              emoji:"🌸", x:28, y:40, instagram:"hafezrestaurant",   igFollowers:"7.3K", lat:51.5148, lng:-0.1950 },
  { id:129,name:"Khan's Restaurant",        cuisine:"Indian",       rating:4.5, price:1, reviews:4100, address:"13-15 Westbourne Grove, W2",       certified:true,  tags:["Indian","Iconic","Budget","Curry","Family"],                     dishes:["Chicken Tikka Masala","Lamb Saag","Naan","Samosas","Kulfi"],           emoji:"🍛", x:32, y:40, instagram:"khansrestaurant",   igFollowers:"9.8K", lat:51.5153, lng:-0.1934 },
  { id:130,name:"Mandola",                  cuisine:"Sudanese",     rating:4.6, price:1, reviews:980,  address:"139-141 Westbourne Grove, W11",    certified:true,  tags:["Sudanese","African","Budget","Authentic","Unique"],              dishes:["Sudanese Stew","Ful Medames","Kisra","Lamb Dishes","Shata"],           emoji:"🌍", x:28, y:39, instagram:"mandolalondon",     igFollowers:"3.7K", lat:51.5165, lng:-0.1984 },
  { id:131,name:"Alounak",                  cuisine:"Persian",      rating:4.5, price:1, reviews:2100, address:"44 Westbourne Grove, W2",          certified:true,  tags:["Persian","Budget","Kebab","BYOB","Casual"],                      dishes:["Koobideh","Barg Kebab","Chelo Rice","Shirazi Salad"],                  emoji:"🌿", x:30, y:40, instagram:"alounaklondon",     igFollowers:"5.1K", lat:51.5156, lng:-0.1931 },
  { id:132,name:"Mohsen",                   cuisine:"Persian",      rating:4.7, price:1, reviews:1870, address:"152 Warwick Rd, Earls Court",      certified:true,  tags:["Persian","BYOB","Budget","Authentic","Kebab"],                   dishes:["Koobideh","Joojeh","Ghormeh Sabzi","Chelo","Doogh"],                   emoji:"🌸", x:29, y:52, instagram:"mohsenrestaurant",  igFollowers:"6.2K", lat:51.4938, lng:-0.1950 },
  { id:133,name:"Tabure",                   cuisine:"Turkish",      rating:4.6, price:2, reviews:1540, address:"8 Hillgate St, Notting Hill",      certified:true,  tags:["Turkish","Mezze","Date Night","Casual","Neighbourhood"],         dishes:["Mixed Mezze","Lamb Chops","Pide","Hummus","Baklava"],                  emoji:"🌮", x:28, y:38, instagram:"taburerestaurant",  igFollowers:"7.8K", lat:51.5136, lng:-0.1977 },
  { id:134,name:"Ealing Tandoori",          cuisine:"Indian",       rating:4.4, price:1, reviews:1230, address:"39 The Mall, Ealing",              certified:true,  tags:["Indian","Tandoori","Budget","Local","Family"],                   dishes:["Chicken Tikka","Lamb Rogan Josh","Naan","Pilau Rice","Mango Lassi"],   emoji:"🍛", x:12, y:44, instagram:"ealingtandoori",    igFollowers:"2.1K", lat:51.5130, lng:-0.3089 },
  { id:135,name:"Makan",                    cuisine:"Malaysian",    rating:4.6, price:1, reviews:1450, address:"270 Portobello Rd, W10",           certified:true,  tags:["Malaysian","Budget","Noodles","Casual","Authentic"],             dishes:["Nasi Lemak","Laksa","Roti Canai","Char Kway Teow","Teh Tarik"],        emoji:"🍜", x:27, y:36, instagram:"makanlondon",       igFollowers:"4.3K", lat:51.5225, lng:-0.2045 },

  // ── Outer East London ──
  { id:136,name:"Tayyabs Ilford",           cuisine:"Pakistani",    rating:4.6, price:1, reviews:2870, address:"233 High Rd, Ilford",              certified:true,  tags:["Pakistani","Grill","Budget","Family","Authentic"],               dishes:["Lamb Chops","Karahi","Seekh Kebab","Paratha","Lassi"],                 emoji:"🍖", x:95, y:38, instagram:"tayyabsilford",     igFollowers:"6.1K", lat:51.5590, lng:0.0754 },
  { id:137,name:"Lahori Chaska",            cuisine:"Pakistani",    rating:4.7, price:1, reviews:1980, address:"745 Romford Rd, Manor Park",       certified:true,  tags:["Pakistani","Budget","Karahi","Authentic","Late Night"],          dishes:["Chicken Karahi","Lamb Nihari","Seekh Kebab","Halwa Puri"],             emoji:"🔥", x:93, y:40, instagram:"lahorichaska",      igFollowers:"4.2K", lat:51.5390, lng:0.0478 },
  { id:138,name:"Desi Dhabba",              cuisine:"Pakistani",    rating:4.5, price:1, reviews:1540, address:"512 Green St, Forest Gate",        certified:true,  tags:["Pakistani","Street Food","Budget","Authentic","Quick Bite"],     dishes:["Karahi","Chapli Kebab","Naan","Daal","Saag"],                          emoji:"🍖", x:92, y:41, instagram:"desidhabba",        igFollowers:"3.8K", lat:51.5363, lng:0.0332 },
  { id:139,name:"Tabaarak",                 cuisine:"Somali",       rating:4.7, price:1, reviews:870,  address:"318 Green St, Upton Park",         certified:true,  tags:["Somali","Authentic","Budget","Rice","Lamb"],                     dishes:["Bariis Iskukaris","Hilib Ari","Muqmad","Sambuus","Shaah"],             emoji:"🌍", x:91, y:43, instagram:"tabaarak_restaurant", igFollowers:"2.1K", lat:51.5327, lng:0.0298 },
  { id:140,name:"Somali Kitchen",           cuisine:"Somali",       rating:4.6, price:1, reviews:760,  address:"127 Green St, E7",                 certified:true,  tags:["Somali","Authentic","Budget","Family","Rice"],                   dishes:["Rice & Stew","Suqaar","Canjeero","Muqmad","Chai"],                     emoji:"🌍", x:91, y:43, instagram:"somalikitchenuk",    igFollowers:"1.8K", lat:51.5339, lng:0.0289 },
  { id:141,name:"Aroos",                    cuisine:"Somali",       rating:4.6, price:1, reviews:650,  address:"89 Katherine Rd, Forest Gate",     certified:true,  tags:["Somali","Family","Rice","Authentic","Budget"],                   dishes:["Bariis","Hilib","Sambuus","Canjeero","Shaah Cadays"],                  emoji:"🌿", x:92, y:41, instagram:"aroosrestaurant",    igFollowers:"1.4K", lat:51.5361, lng:0.0331 },
  { id:142,name:"Khyber Pass",              cuisine:"Afghani",      rating:4.6, price:1, reviews:1230, address:"56 Ilford Lane, Ilford",            certified:true,  tags:["Afghani","Budget","Lamb","Rice","Authentic"],                    dishes:["Kabuli Pulao","Mantu","Bolani","Lamb Qorma","Shorwa"],                 emoji:"🏔️", x:95, y:39, instagram:"khyberpassilford",   igFollowers:"2.3K", lat:51.5536, lng:0.0716 },
  { id:143,name:"Nando's Ilford",           cuisine:"Chicken",      rating:4.3, price:2, reviews:3200, address:"2 Clements Rd, Ilford",            certified:true,  tags:["Chicken","Peri Peri","Casual","Family","Quick Bite"],            dishes:["Peri Peri Chicken","Butterfly Chicken","Fino Pitta","Sides"],          emoji:"🍗", x:95, y:38, instagram:"nandosuk",          igFollowers:"312K", lat:51.5578, lng:0.0747 },
  { id:144,name:"Chamas Grill",             cuisine:"Caribbean",    rating:4.5, price:2, reviews:980,  address:"248 Romford Rd, Forest Gate",      certified:true,  tags:["Caribbean","Jerk","Grill","Casual","Authentic"],                 dishes:["Jerk Chicken","Oxtail","Curry Goat","Rice & Peas","Plantain"],         emoji:"🌴", x:92, y:41, instagram:"chamasgrilluk",     igFollowers:"3.4K", lat:51.5380, lng:0.0398 },
  { id:145,name:"Jerk City",                cuisine:"Caribbean",    rating:4.6, price:1, reviews:1450, address:"189 Whitechapel Rd, E1",            certified:true,  tags:["Caribbean","Jerk","Budget","Takeaway","Authentic"],              dishes:["Jerk Chicken","Jerk Pork","Festival","Bammy","Rum Punch"],             emoji:"🌴", x:81, y:44, instagram:"jerkcitylondon",     igFollowers:"5.6K", lat:51.5158, lng:-0.0622 },
  { id:146,name:"Island Social Club",       cuisine:"Caribbean",    rating:4.6, price:2, reviews:870,  address:"15 Westgate St, Hackney",          certified:true,  tags:["Caribbean","Brunch","Rum","Trendy","East London"],               dishes:["Ackee & Saltfish","Jerk Chicken","Rum Cocktails","Plantain"],          emoji:"🏝️", x:78, y:26, instagram:"islandsocialclub",   igFollowers:"9.2K", lat:51.5390, lng:-0.0525 },
  { id:147,name:"Mama's Jerk",              cuisine:"Caribbean",    rating:4.7, price:1, reviews:1230, address:"436 Kingsland Rd, Dalston",         certified:true,  tags:["Caribbean","Jerk","Budget","Authentic","Takeaway"],              dishes:["Jerk Chicken","Curry Goat","Rice & Peas","Plantain","Rum Cake"],       emoji:"🍗", x:76, y:22, instagram:"mamasjerk",         igFollowers:"7.1K", lat:51.5469, lng:-0.0739 },
  { id:148,name:"Green St Grill",           cuisine:"Pakistani",    rating:4.6, price:1, reviews:2100, address:"374 Green St, Upton Park",         certified:true,  tags:["Pakistani","Grill","Budget","Family","Authentic"],               dishes:["Mixed Grill","Lamb Chops","Karahi","Seekh Kebab","Naan"],              emoji:"🥩", x:91, y:43, instagram:"greenstgrill",      igFollowers:"4.7K", lat:51.5330, lng:0.0293 },
  { id:149,name:"Kabul Darbar",             cuisine:"Afghani",      rating:4.7, price:1, reviews:980,  address:"97 Green St, E7",                  certified:true,  tags:["Afghani","Authentic","Budget","Rice","Lamb"],                    dishes:["Kabuli Pulao","Mantu","Lamb Qorma","Bolani","Green Tea"],              emoji:"🏔️", x:91, y:43, instagram:"kabuldarbar",       igFollowers:"1.9K", lat:51.5338, lng:0.0291 },
  { id:150,name:"Manzil",                   cuisine:"Bangladeshi",  rating:4.5, price:1, reviews:1540, address:"98 Brick Lane, E1",                certified:true,  tags:["Bangladeshi","Curry","Budget","Brick Lane","Family"],            dishes:["Chicken Tikka Masala","Lamb Biryani","Prawn Bhuna","Naan","Kulfi"],    emoji:"🍛", x:80, y:42, instagram:"manzilbricklane",   igFollowers:"5.3K", lat:51.5212, lng:-0.0714 },

  // ── South London ──
  { id:152,name:"Baba G's Bhangra Burger",  cuisine:"Indian Fusion",rating:4.5, price:2, reviews:1230, address:"Flat Iron Square, SE1",            certified:true,  tags:["Indian Fusion","Burger","Street Food","Spicy","Casual"],         dishes:["Tikka Masala Burger","Bhangra Fries","Mango Slaw","Chai Shake"],       emoji:"🍔", x:68, y:52, instagram:"babagsburger",      igFollowers:"13K",  lat:51.5046, lng:-0.0944 },
  { id:154,name:"Lahore Karahi",            cuisine:"Pakistani",    rating:4.6, price:1, reviews:2100, address:"1 Tooting High St, SW17",          certified:true,  tags:["Pakistani","Karahi","Budget","Tooting","Authentic"],             dishes:["Chicken Karahi","Lamb Karahi","Naan","Lassi","Seekh Kebab"],           emoji:"🍖", x:50, y:85, instagram:"lahorekarahi",      igFollowers:"4.8K", lat:51.4276, lng:-0.1679 },
  { id:155,name:"Apollo Banana Leaf",       cuisine:"Sri Lankan",   rating:4.6, price:1, reviews:2870, address:"190 Tooting High St, SW17",        certified:true,  tags:["Sri Lankan","Budget","Curry","Authentic","Family"],              dishes:["Crab Curry","Kothu Roti","Hoppers","Fish Ambul Thiyal"],               emoji:"🍌", x:50, y:86, instagram:"apollobananaleaf",  igFollowers:"6.2K", lat:51.4272, lng:-0.1679 },
  { id:157,name:"Kaosarn",                  cuisine:"Thai",         rating:4.6, price:1, reviews:2100, address:"110 St John's Hill, Battersea",    certified:true,  tags:["Thai","Budget","Authentic","Street Food","Casual"],              dishes:["Pad Thai","Green Curry","Som Tam","Mango Sticky Rice"],                emoji:"🍜", x:48, y:72, instagram:"kaosarnlondon",     igFollowers:"8.9K", lat:51.4636, lng:-0.1654 },

  // ── More Pakistani/Indian Specialists ──
  { id:158,name:"Imran's",                  cuisine:"Pakistani",    rating:4.7, price:1, reviews:2340, address:"196 Ladypool Rd, Sparkbrook",      certified:true,  tags:["Pakistani","Authentic","Budget","Grill","Late Night"],           dishes:["Lamb Chops","Chicken Tikka","Seekh Kebab","Naan","Lassi"],             emoji:"🍖", x:82, y:44, instagram:"imranslondon",      igFollowers:"5.4K", lat:51.5154, lng:-0.0631 },
  { id:159,name:"Dastaan",                  cuisine:"Indian",       rating:4.8, price:3, reviews:1450, address:"447 Kingston Rd, Ewell",           certified:true,  tags:["Indian","Fine Dining","Modern","Special Occasion","Upscale"],    dishes:["Lamb Raan","Crab Bhel","Pork Vindaloo","Tasting Menu"],                emoji:"✨", x:35, y:90, instagram:"dastaanindian",     igFollowers:"17K",  lat:51.3750, lng:-0.2489 },
  { id:160,name:"Zaika",                    cuisine:"Indian",       rating:4.6, price:3, reviews:1870, address:"1 Kensington High St, W8",         certified:true,  tags:["Indian","Fine Dining","Upscale","Date Night","Modern"],          dishes:["Lamb Shank","Sea Bass","Tasting Menu","Cardamom Kulfi"],               emoji:"🌟", x:33, y:47, instagram:"zaikalondon",       igFollowers:"9.3K", lat:51.5008, lng:-0.1940 },
  { id:161,name:"Benares",                  cuisine:"Indian",       rating:4.7, price:4, reviews:2100, address:"12a Berkeley Square, Mayfair",     certified:true,  tags:["Indian","Michelin","Fine Dining","Mayfair","Special Occasion"],  dishes:["Duck Tikka","Sea Bass","Lamb Keema","Dessert Platter"],                emoji:"⭐", x:48, y:40, instagram:"benaresrestaurant", igFollowers:"28K",  lat:51.5093, lng:-0.1447 },
  { id:162,name:"Trishna",                  cuisine:"Indian",       rating:4.7, price:4, reviews:2340, address:"15-17 Blandford St, Marylebone",   certified:true,  tags:["Indian","Seafood","Fine Dining","Michelin","Modern"],            dishes:["Dorset Crab","Butter Pepper Garlic Crab","Lamb Keema"],                emoji:"🦞", x:49, y:37, instagram:"trishna_london",    igFollowers:"14K",  lat:51.5196, lng:-0.1571 },
  { id:163,name:"Quilon",                   cuisine:"Indian",       rating:4.8, price:4, reviews:1870, address:"41 Buckingham Gate, Westminster",  certified:true,  tags:["Indian","South Indian","Michelin","Fine Dining","Seafood"],      dishes:["Kerala Crab","Malabar Prawn","Lamb Biryani","Coconut Ice Cream"],      emoji:"🌴", x:54, y:49, instagram:"quilonrestaurant",  igFollowers:"11K",  lat:51.4989, lng:-0.1384 },
  { id:164,name:"Amaya",                    cuisine:"Indian",       rating:4.7, price:4, reviews:2100, address:"Halkin Arcade, Motcomb St",        certified:true,  tags:["Indian","Grill","Fine Dining","Knightsbridge","Special Occasion"],dishes:["Lamb Seekh Kebab","King Prawn","Lamb Chops","Spiced Duck"],            emoji:"🔥", x:46, y:50, instagram:"amayalondon",       igFollowers:"16K",  lat:51.4994, lng:-0.1568 },
  { id:165,name:"Veeraswamy",               cuisine:"Indian",       rating:4.7, price:4, reviews:2870, address:"101 Regent St, W1",                certified:true,  tags:["Indian","Historic","Fine Dining","Oldest","Special Occasion"],   dishes:["Chicken Tikka Masala","Lamb Rogan Josh","Prawn Moilee","Kulfi"],       emoji:"👑", x:54, y:44, instagram:"veeraswamy1926",    igFollowers:"19K",  lat:51.5107, lng:-0.1388 },

  // ── Somali & Afghani Specialists ──
  { id:166,name:"Bravanese Café",           cuisine:"Somali",       rating:4.5, price:1, reviews:650,  address:"298 Portobello Rd, W10",           certified:true,  tags:["Somali","Authentic","Budget","Community","Rice"],                dishes:["Bariis","Suqaar","Canjeero","Sambuus","Shaah"],                        emoji:"🌍", x:27, y:36, instagram:"bravanescafe",      igFollowers:"3.1K", lat:51.5225, lng:-0.2045 },
  { id:167,name:"Hidmo East African",       cuisine:"Eritrean",     rating:4.6, price:1, reviews:780,  address:"299 Coldharbour Lane, Brixton",    certified:true,  tags:["Eritrean","East African","Injera","Authentic","Budget"],         dishes:["Injera","Zigni","Tsebhi","Shiro","Tej"],                               emoji:"🌍", x:55, y:79, instagram:"hidmolondon",       igFollowers:"2.4K", lat:51.4619, lng:-0.1109 },
  { id:168,name:"Afghan Village",           cuisine:"Afghani",      rating:4.6, price:1, reviews:1120, address:"153 Hammersmith Rd, W6",           certified:true,  tags:["Afghani","Authentic","Budget","Family","Lamb"],                  dishes:["Kabuli Pulao","Mantu","Bolani","Lamb Qorma","Naan"],                   emoji:"🏔️", x:22, y:50, instagram:"afghanvillagelondon", igFollowers:"2.8K", lat:51.4924, lng:-0.2268 },
  { id:169,name:"Wazir Khan",               cuisine:"Afghani",      rating:4.7, price:1, reviews:870,  address:"221 Whitechapel Rd, E1",           certified:true,  tags:["Afghani","Authentic","Budget","Rice","Kebab"],                   dishes:["Kabuli Pulao","Seekh Kebab","Mantu","Bolani","Green Tea"],             emoji:"🏔️", x:81, y:44, instagram:"wazirkhanlondon",   igFollowers:"1.9K", lat:51.5156, lng:-0.0617 },
  { id:170,name:"Pamir",                    cuisine:"Afghani",      rating:4.5, price:1, reviews:760,  address:"67 Stoke Newington High St, N16",  certified:true,  tags:["Afghani","Authentic","Budget","Community","Rice"],               dishes:["Kabuli Pulao","Mantu","Lamb Qorma","Naan","Chai"],                     emoji:"🏔️", x:73, y:14, instagram:"pamirafghan",       igFollowers:"1.6K", lat:51.5634, lng:-0.0752 },

  // ── Halal Batch 4: More North & Northwest ──
  { id:171,name:"Meat & Shake",             cuisine:"Burgers",      rating:4.6, price:2, reviews:1870, address:"10 Highbury Corner, N5",           certified:true,  tags:["Burger","Smash","Casual","Islington","Milkshake"],               dishes:["Smash Burger","Double Cheese","Loaded Fries","Oreo Shake"],            emoji:"🍔", x:67, y:16, instagram:"meatandshake",      igFollowers:"12K",  lat:51.5501, lng:-0.1029 },
  { id:172,name:"Dishoom King's Cross",     cuisine:"Indian",       rating:4.7, price:2, reviews:7200, address:"5 Stable St, King's Cross",        certified:true,  tags:["Indian","Brunch","Curry","Naan","Trendy"],                       dishes:["Bacon Naan Roll","Black Daal","Lamb Raan","Chicken Tikka","Chai"],     emoji:"🍛", x:62, y:27, instagram:"dishoom",           igFollowers:"432K", lat:51.5356, lng:-0.1236 },
  { id:173,name:"Mangal 2",                 cuisine:"Turkish",      rating:4.7, price:2, reviews:2870, address:"4 Stoke Newington Rd, Dalston",    certified:true,  tags:["Turkish","Ocakbasi","Lamb","Authentic","Iconic"],                dishes:["Lamb Shish","Chicken Adana","Lamb Kofte","Pide","Cacik"],              emoji:"🔥", x:75, y:21, instagram:"mangal2london",     igFollowers:"31K",  lat:51.5469, lng:-0.0756 },
  { id:174,name:"Farang",                   cuisine:"Thai",         rating:4.7, price:2, reviews:1650, address:"72 Highbury Park, N5",             certified:true,  tags:["Thai","Modern","Trendy","Neighbourhood","Creative"],             dishes:["Crispy Chicken","Duck Laab","Betel Leaf","Mango Sorbet"],              emoji:"🍜", x:67, y:15, instagram:"faranglondon",      igFollowers:"23K",  lat:51.5552, lng:-0.0985 },
  { id:175,name:"Petek",                    cuisine:"Turkish",      rating:4.5, price:1, reviews:1230, address:"96 Stroud Green Rd, Finsbury Pk",  certified:true,  tags:["Turkish","Pastry","Baklava","Budget","Dessert"],                 dishes:["Baklava","Kadayif","Turkish Delight","Simit","Tea"],                   emoji:"🍯", x:65, y:14, instagram:"petekpastry",       igFollowers:"6.8K", lat:51.5643, lng:-0.1041 },
  { id:176,name:"Kervan",                   cuisine:"Turkish",      rating:4.5, price:2, reviews:1650, address:"47 Green Lanes, Stoke Newington",  certified:true,  tags:["Turkish","Ocakbasi","Authentic","Family","Grill"],               dishes:["Lamb Shish","Chicken Wings","Pide","Cacik","Baklava"],                 emoji:"🔥", x:73, y:14, instagram:"kervanrestaurant",  igFollowers:"4.8K", lat:51.5634, lng:-0.0820 },
  { id:177,name:"Diyarbakir Kitchen",       cuisine:"Kurdish",      rating:4.7, price:1, reviews:980,  address:"79 Green Lanes, N16",              certified:true,  tags:["Kurdish","Authentic","Budget","Lamb","Meze"],                    dishes:["Kurdish Lamb Stew","Stuffed Vine Leaves","Lahmacun","Ayran"],          emoji:"🌶️", x:73, y:13, instagram:"diyarbakirlondon",  igFollowers:"3.1K", lat:51.5645, lng:-0.0818 },
  { id:178,name:"Gallipoli Bazaar",         cuisine:"Turkish",      rating:4.5, price:2, reviews:2340, address:"107 Upper St, Islington",          certified:true,  tags:["Turkish","Mezze","Date Night","Casual","Atmospheric"],           dishes:["Mezze Platter","Lamb Kofte","Pide","Turkish Tea","Baklava"],           emoji:"🌿", x:66, y:20, instagram:"gallipolirestaurant",igFollowers:"11K",  lat:51.5406, lng:-0.1029 },
  { id:179,name:"Chutneys",                 cuisine:"Indian",       rating:4.5, price:1, reviews:3100, address:"124 Drummond St, Euston",          certified:true,  tags:["Indian","Vegetarian","Budget","Buffet","Curry"],                 dishes:["Thali","Dosa","Samosas","Chutney Platter","Mango Lassi"],              emoji:"🍛", x:60, y:31, instagram:"chutneyslondon",    igFollowers:"7.2K", lat:51.5281, lng:-0.1337 },
  { id:180,name:"Diwana",                   cuisine:"Indian",       rating:4.4, price:1, reviews:2540, address:"121 Drummond St, Euston",          certified:true,  tags:["Indian","Vegetarian","Budget","Gujarati","Buffet"],              dishes:["Bhel Puri","Pani Puri","Dosa","Thali","Kulfi"],                        emoji:"🌸", x:60, y:31, instagram:"diwanalondon",      igFollowers:"5.1K", lat:51.5282, lng:-0.1338 },
  { id:181,name:"Ambala Sweet Centre",      cuisine:"Indian",       rating:4.6, price:1, reviews:4200, address:"112 Drummond St, Euston",          certified:true,  tags:["Indian","Sweets","Budget","Mithai","Street Food"],               dishes:["Gulab Jamun","Barfi","Samosas","Jalebi","Lassi"],                      emoji:"🍬", x:60, y:31, instagram:"ambalasweets",      igFollowers:"14K",  lat:51.5280, lng:-0.1338 },
  { id:182,name:"Yum Bun",                  cuisine:"Taiwanese",    rating:4.5, price:1, reviews:980,  address:"Unit 18, Leather Lane Market",     certified:true,  tags:["Bao","Street Food","Budget","Taiwanese","Market"],               dishes:["Pork Bao","Chicken Bao","Tofu Bao","Chips","Soft Drink"],              emoji:"🥟", x:67, y:36, instagram:"yumbun",            igFollowers:"9.2K", lat:51.5208, lng:-0.1096 },
  { id:183,name:"Hala Restaurant",          cuisine:"Somali",       rating:4.6, price:1, reviews:870,  address:"7 Caledonian Rd, N1",              certified:true,  tags:["Somali","Authentic","Budget","Family","Rice"],                   dishes:["Bariis","Hilib Ari","Suqaar","Sambuus","Shaah"],                       emoji:"🌍", x:63, y:26, instagram:"halarestaurantlondon",igFollowers:"1.7K",lat:51.5318, lng:-0.1161 },

  // ── Halal Batch 5: West London Halal ──
  { id:184,name:"Brilliant Restaurant",     cuisine:"Indian",       rating:4.7, price:2, reviews:4200, address:"72-76 Western Rd, Southall",       certified:true,  tags:["Indian","Punjabi","Family","Iconic","Curry"],                    dishes:["Chicken Tikka","Lamb Karahi","Daal Makhani","Naan","Kulfi"],           emoji:"⭐", x:10, y:42, instagram:"brilliantrestaurant",igFollowers:"12K",  lat:51.5107, lng:-0.3756 },
  { id:185,name:"Gifto's Lahori Karahi",    cuisine:"Pakistani",    rating:4.6, price:1, reviews:3100, address:"162-164 The Broadway, Southall",   certified:true,  tags:["Pakistani","Karahi","Budget","Authentic","Southall"],            dishes:["Lamb Karahi","Chicken Karahi","Seekh Kebab","Naan","Lassi"],           emoji:"🍖", x:10, y:43, instagram:"giftos_lahori",     igFollowers:"8.9K", lat:51.5118, lng:-0.3754 },
  { id:186,name:"Madhu's",                  cuisine:"Indian",       rating:4.7, price:3, reviews:3870, address:"39 South Rd, Southall",            certified:true,  tags:["Indian","Kenyan Asian","Upscale","Family","Special Occasion"],   dishes:["Madhu's Chicken","Lamb Chops","Prawn Puri","Kulfi"],                   emoji:"🌟", x:10, y:44, instagram:"madhusrestaurant",  igFollowers:"21K",  lat:51.5108, lng:-0.3741 },
  { id:187,name:"Abu Zaad",                 cuisine:"Syrian",       rating:4.7, price:1, reviews:2870, address:"29 Uxbridge Rd, Shepherd's Bush",  certified:true,  tags:["Syrian","Budget","Mezze","Authentic","Family"],                  dishes:["Hummus","Mixed Grill","Fattoush","Falafel","Kibbeh"],                  emoji:"🧆", x:22, y:42, instagram:"abuzaadlondon",     igFollowers:"14K",  lat:51.5051, lng:-0.2278 },
  { id:188,name:"Agadir",                   cuisine:"Moroccan",     rating:4.6, price:2, reviews:1540, address:"98 Uxbridge Rd, Shepherd's Bush",  certified:true,  tags:["Moroccan","Tagine","Couscous","Casual","Authentic"],             dishes:["Lamb Tagine","Couscous","Pastilla","Mint Tea","Harira"],               emoji:"🫖", x:22, y:43, instagram:"agadirrestaurant",  igFollowers:"5.4K", lat:51.5047, lng:-0.2268 },
  { id:189,name:"Hafez",                    cuisine:"Persian",      rating:4.6, price:2, reviews:1650, address:"5 Hereford Rd, Notting Hill",      certified:true,  tags:["Persian","Kebab","Rice","Authentic","Casual"],                   dishes:["Koobideh","Joojeh Kebab","Ghormeh Sabzi","Zereshk Polo"],              emoji:"🌸", x:28, y:40, instagram:"hafezrestaurant",   igFollowers:"7.3K", lat:51.5148, lng:-0.1950 },
  { id:190,name:"Khan's Restaurant",        cuisine:"Indian",       rating:4.5, price:1, reviews:4100, address:"13-15 Westbourne Grove, W2",       certified:true,  tags:["Indian","Iconic","Budget","Curry","Family"],                     dishes:["Chicken Tikka Masala","Lamb Saag","Naan","Samosas","Kulfi"],           emoji:"🍛", x:32, y:40, instagram:"khansrestaurant",   igFollowers:"9.8K", lat:51.5153, lng:-0.1934 },
  { id:191,name:"Alounak",                  cuisine:"Persian",      rating:4.5, price:1, reviews:2100, address:"44 Westbourne Grove, W2",          certified:true,  tags:["Persian","Budget","Kebab","BYOB","Casual"],                      dishes:["Koobideh","Barg Kebab","Chelo Rice","Shirazi Salad"],                  emoji:"🌿", x:30, y:40, instagram:"alounaklondon",     igFollowers:"5.1K", lat:51.5156, lng:-0.1931 },
  { id:192,name:"Mohsen",                   cuisine:"Persian",      rating:4.7, price:1, reviews:1870, address:"152 Warwick Rd, Earls Court",      certified:true,  tags:["Persian","BYOB","Budget","Authentic","Kebab"],                   dishes:["Koobideh","Joojeh","Ghormeh Sabzi","Chelo","Doogh"],                   emoji:"🌸", x:29, y:52, instagram:"mohsenrestaurant",  igFollowers:"6.2K", lat:51.4938, lng:-0.1950 },
  { id:193,name:"Adams Cafe",               cuisine:"Moroccan",     rating:4.6, price:1, reviews:1120, address:"77 Askew Rd, Shepherd's Bush",     certified:true,  tags:["Moroccan","Budget","Authentic","Tagine","BYOB"],                 dishes:["Lamb Tagine","Chicken Tagine","Couscous","Harira","Mint Tea"],          emoji:"🫖", x:22, y:46, instagram:"adamscafelondon",   igFollowers:"3.4K", lat:51.5009, lng:-0.2301 },
  { id:194,name:"Esarn Khao",               cuisine:"Thai",         rating:4.6, price:2, reviews:1540, address:"314 Uxbridge Rd, Shepherd's Bush", certified:true,  tags:["Thai","Authentic","Isaan","Casual","Neighbourhood"],             dishes:["Larb Gai","Som Tam","Pad Kra Pao","Sticky Rice","Tom Yum"],            emoji:"🍜", x:22, y:44, instagram:"esarnkhaothai",     igFollowers:"4.1K", lat:51.5047, lng:-0.2271 },
  { id:195,name:"Sakonis",                  cuisine:"Indian",       rating:4.5, price:1, reviews:2100, address:"127-129 Ealing Rd, Wembley",       certified:true,  tags:["Indian","Vegetarian","Budget","Chaat","Street Food"],            dishes:["Pani Puri","Bhel Puri","Dahi Puri","Vada Pav","Kulfi"],               emoji:"🌸", x:20, y:32, instagram:"sakonisuk",         igFollowers:"8.4K", lat:51.5535, lng:-0.3003 },
  { id:196,name:"Kabhi B's",                cuisine:"Indian",       rating:4.7, price:1, reviews:3100, address:"16 Ealing Rd, Wembley",            certified:true,  tags:["Indian","Street Food","Chaat","Budget","Wembley"],              dishes:["Pani Puri","Bhel Puri","Dahi Puri","Samosas","Kulfi"],                 emoji:"🌸", x:20, y:32, instagram:"kabhib",            igFollowers:"28K",  lat:51.5526, lng:-0.2991 },
  { id:197,name:"Jashan",                   cuisine:"Indian",       rating:4.6, price:2, reviews:1870, address:"1-2 Coronet Parade, Ealing Rd",    certified:true,  tags:["Indian","Wembley","Family","Curry","Casual"],                    dishes:["Lamb Rogan Josh","Chicken Tikka Masala","Dal Makhani","Kulfi"],        emoji:"🌟", x:20, y:32, instagram:"jashanrestaurant",  igFollowers:"6.2K", lat:51.5529, lng:-0.2989 },
  { id:198,name:"Popeyes Westfield",        cuisine:"Chicken",      rating:4.4, price:1, reviews:4200, address:"Westfield London, W12",            certified:true,  tags:["Chicken","Fried","Casual","Fast Food","Burger"],                 dishes:["Chicken Sandwich","Tenders","Popcorn Chicken","Cajun Fries"],          emoji:"🍗", x:21, y:44, instagram:"popeyesuk",         igFollowers:"124K", lat:51.5072, lng:-0.2210 },

  // ── Halal Batch 6: Outer East & Ilford ──
  { id:199,name:"Tayyabs Ilford",           cuisine:"Pakistani",    rating:4.6, price:1, reviews:2870, address:"233 High Rd, Ilford",              certified:true,  tags:["Pakistani","Grill","Budget","Family","Authentic"],               dishes:["Lamb Chops","Karahi","Seekh Kebab","Paratha","Lassi"],                 emoji:"🍖", x:95, y:38, instagram:"tayyabsilford",     igFollowers:"6.1K", lat:51.5590, lng:0.0754 },
  { id:200,name:"Lahori Chaska",            cuisine:"Pakistani",    rating:4.7, price:1, reviews:1980, address:"745 Romford Rd, Manor Park",       certified:true,  tags:["Pakistani","Budget","Karahi","Authentic","Late Night"],          dishes:["Chicken Karahi","Lamb Nihari","Seekh Kebab","Halwa Puri"],             emoji:"🔥", x:93, y:40, instagram:"lahorichaska",      igFollowers:"4.2K", lat:51.5390, lng:0.0478 },
  { id:201,name:"Tabaarak",                 cuisine:"Somali",       rating:4.7, price:1, reviews:870,  address:"318 Green St, Upton Park",         certified:true,  tags:["Somali","Authentic","Budget","Rice","Lamb"],                     dishes:["Bariis Iskukaris","Hilib Ari","Muqmad","Sambuus","Shaah"],             emoji:"🌍", x:91, y:43, instagram:"tabaarak_restaurant",igFollowers:"2.1K", lat:51.5327, lng:0.0298 },
  { id:202,name:"Kabul Darbar",             cuisine:"Afghani",      rating:4.7, price:1, reviews:980,  address:"97 Green St, E7",                  certified:true,  tags:["Afghani","Authentic","Budget","Rice","Lamb"],                    dishes:["Kabuli Pulao","Mantu","Lamb Qorma","Bolani","Green Tea"],              emoji:"🏔️", x:91, y:43, instagram:"kabuldarbar",       igFollowers:"1.9K", lat:51.5338, lng:0.0291 },
  { id:203,name:"Green St Grill",           cuisine:"Pakistani",    rating:4.6, price:1, reviews:2100, address:"374 Green St, Upton Park",         certified:true,  tags:["Pakistani","Grill","Budget","Family","Authentic"],               dishes:["Mixed Grill","Lamb Chops","Karahi","Seekh Kebab","Naan"],              emoji:"🥩", x:91, y:43, instagram:"greenstgrill",      igFollowers:"4.7K", lat:51.5330, lng:0.0293 },
  { id:204,name:"Manzil",                   cuisine:"Bangladeshi",  rating:4.5, price:1, reviews:1540, address:"98 Brick Lane, E1",                certified:true,  tags:["Bangladeshi","Curry","Budget","Brick Lane","Family"],            dishes:["Chicken Tikka Masala","Lamb Biryani","Prawn Bhuna","Naan","Kulfi"],    emoji:"🍛", x:80, y:42, instagram:"manzilbricklane",   igFollowers:"5.3K", lat:51.5212, lng:-0.0714 },
  { id:205,name:"Aladin Brick Lane",        cuisine:"Bangladeshi",  rating:4.5, price:1, reviews:3400, address:"132 Brick Lane, E1",               certified:true,  tags:["Bangladeshi","Budget","Curry","Brick Lane","Classic"],           dishes:["Chicken Tikka Masala","Lamb Biryani","Garlic Naan","Mixed Grill"],     emoji:"🍛", x:80, y:42, instagram:"aladinbricklane",   igFollowers:"6.7K", lat:51.5218, lng:-0.0711 },
  { id:206,name:"Chamas Grill",             cuisine:"Caribbean",    rating:4.5, price:2, reviews:980,  address:"248 Romford Rd, Forest Gate",      certified:true,  tags:["Caribbean","Jerk","Grill","Casual","Authentic"],                 dishes:["Jerk Chicken","Oxtail","Curry Goat","Rice & Peas","Plantain"],         emoji:"🌴", x:92, y:41, instagram:"chamasgrilluk",     igFollowers:"3.4K", lat:51.5380, lng:0.0398 },
  { id:207,name:"Khyber Pass",              cuisine:"Afghani",      rating:4.6, price:1, reviews:1230, address:"56 Ilford Lane, Ilford",            certified:true,  tags:["Afghani","Budget","Lamb","Rice","Authentic"],                    dishes:["Kabuli Pulao","Mantu","Bolani","Lamb Qorma","Shorwa"],                 emoji:"🏔️", x:95, y:39, instagram:"khyberpassilford",  igFollowers:"2.3K", lat:51.5536, lng:0.0716 },
  { id:208,name:"Nando's Ilford",           cuisine:"Chicken",      rating:4.3, price:2, reviews:3200, address:"2 Clements Rd, Ilford",            certified:true,  tags:["Chicken","Peri Peri","Casual","Family","Quick Bite"],            dishes:["Peri Peri Chicken","Butterfly Chicken","Fino Pitta","Sides"],          emoji:"🍗", x:95, y:38, instagram:"nandosuk",          igFollowers:"312K", lat:51.5578, lng:0.0747 },

  // ── Halal Batch 7: More Halal Gems ──
  { id:209,name:"Benares",                  cuisine:"Indian",       rating:4.7, price:4, reviews:2100, address:"12a Berkeley Square, Mayfair",     certified:true,  tags:["Indian","Michelin","Fine Dining","Mayfair","Special Occasion"],  dishes:["Duck Tikka","Sea Bass","Lamb Keema","Dessert Platter"],                emoji:"⭐", x:48, y:40, instagram:"benaresrestaurant", igFollowers:"28K",  lat:51.5093, lng:-0.1447 },
  { id:210,name:"Trishna",                  cuisine:"Indian",       rating:4.7, price:4, reviews:2340, address:"15-17 Blandford St, Marylebone",   certified:true,  tags:["Indian","Seafood","Fine Dining","Michelin","Modern"],            dishes:["Dorset Crab","Butter Pepper Garlic Crab","Lamb Keema"],                emoji:"🦞", x:49, y:37, instagram:"trishna_london",    igFollowers:"14K",  lat:51.5196, lng:-0.1571 },
  { id:211,name:"Veeraswamy",               cuisine:"Indian",       rating:4.7, price:4, reviews:2870, address:"101 Regent St, W1",                certified:true,  tags:["Indian","Historic","Fine Dining","Oldest","Special Occasion"],   dishes:["Chicken Tikka Masala","Lamb Rogan Josh","Prawn Moilee","Kulfi"],       emoji:"👑", x:54, y:44, instagram:"veeraswamy1926",    igFollowers:"19K",  lat:51.5107, lng:-0.1388 },
  { id:212,name:"Amaya",                    cuisine:"Indian",       rating:4.7, price:4, reviews:2100, address:"Halkin Arcade, Motcomb St",        certified:true,  tags:["Indian","Grill","Fine Dining","Knightsbridge","Special Occasion"],dishes:["Lamb Seekh Kebab","King Prawn","Lamb Chops","Spiced Duck"],            emoji:"🔥", x:46, y:50, instagram:"amayalondon",       igFollowers:"16K",  lat:51.4994, lng:-0.1568 },
  { id:213,name:"Quilon",                   cuisine:"Indian",       rating:4.8, price:4, reviews:1870, address:"41 Buckingham Gate, Westminster",  certified:true,  tags:["Indian","South Indian","Michelin","Fine Dining","Seafood"],      dishes:["Kerala Crab","Malabar Prawn","Lamb Biryani","Coconut Ice Cream"],      emoji:"🌴", x:54, y:49, instagram:"quilonrestaurant",  igFollowers:"11K",  lat:51.4989, lng:-0.1384 },
  { id:214,name:"Zaika",                    cuisine:"Indian",       rating:4.6, price:3, reviews:1870, address:"1 Kensington High St, W8",         certified:true,  tags:["Indian","Fine Dining","Upscale","Date Night","Modern"],          dishes:["Lamb Shank","Sea Bass","Tasting Menu","Cardamom Kulfi"],               emoji:"🌟", x:33, y:47, instagram:"zaikalondon",       igFollowers:"9.3K", lat:51.5008, lng:-0.1940 },
  { id:215,name:"Yeni",                     cuisine:"Turkish",      rating:4.7, price:3, reviews:1230, address:"55 Beak St, Soho",                 certified:true,  tags:["Turkish","Modern","Wine","Date Night","Creative"],               dishes:["Lamb Shoulder","Manti","Borek","Baklava","Turkish Wine"],              emoji:"🌮", x:59, y:46, instagram:"yenisoho",          igFollowers:"14K",  lat:51.5124, lng:-0.1370 },
  { id:216,name:"Berber & Q Grill House",   cuisine:"Middle Eastern",rating:4.7,price:3, reviews:2100, address:"Exmouth Market, EC1",              certified:true,  tags:["Middle Eastern","Grill","Trendy","Casual","Charcoal"],           dishes:["Lamb Shoulder","Cauliflower Shawarma","Hummus","Flatbread"],           emoji:"🔥", x:67, y:36, instagram:"berberandq",        igFollowers:"48K",  lat:51.5244, lng:-0.1090 },
  { id:217,name:"Kati Roll Company",        cuisine:"Indian",       rating:4.6, price:1, reviews:1870, address:"24 Denman St, Soho",               certified:true,  tags:["Indian","Street Food","Wrap","Budget","Quick Bite"],             dishes:["Chicken Kati Roll","Lamb Roll","Paneer Roll","Egg Roll"],              emoji:"🫓", x:59, y:46, instagram:"katirollcompany",   igFollowers:"11K",  lat:51.5109, lng:-0.1349 },
  { id:218,name:"Plaza Khao Gaeng",         cuisine:"Thai",         rating:4.7, price:1, reviews:2100, address:"Kingly Court, Carnaby",            certified:true,  tags:["Thai","Cafeteria","Budget","Authentic","Lunch"],                 dishes:["Khao Gaeng","Duck Leg Rice","Green Curry","Pad Kra Pao"],              emoji:"🍛", x:58, y:45, instagram:"plazakhaogaeng",    igFollowers:"14K",  lat:51.5130, lng:-0.1375 },
  { id:219,name:"Darjeeling Express",       cuisine:"Indian",       rating:4.7, price:2, reviews:1870, address:"Kingly Court, Carnaby St",         certified:true,  tags:["Indian","Homestyle","Unique","Lunch","Curry"],                   dishes:["Kolkata Biryani","Fish Curry","Dal","Roti","Mishti Doi"],               emoji:"🍛", x:58, y:45, instagram:"darjeelingexpress",  igFollowers:"28K",  lat:51.5130, lng:-0.1378 },
  { id:220,name:"Hoppers",                  cuisine:"Sri Lankan",   rating:4.6, price:2, reviews:3200, address:"49 Frith St, Soho",               certified:true,  tags:["Sri Lankan","Hoppers","Curry","Trendy","Brunch"],                dishes:["Egg Hopper","Lamb Kothu","Jaffna Curry","Short Eats","Pol Sambol"],     emoji:"🫓", x:59, y:45, instagram:"hopperslondon",     igFollowers:"53K",  lat:51.5130, lng:-0.1310 },
  { id:221,name:"Oklava",                   cuisine:"Turkish",      rating:4.6, price:2, reviews:1650, address:"74 Luke St, Shoreditch",           certified:true,  tags:["Turkish","Modern","Mezze","Date Night","Casual"],                dishes:["Lamb Flatbread","Halloumi","Baklava","Smoked Aubergine"],               emoji:"🌮", x:77, y:32, instagram:"oklavalnd",         igFollowers:"18K",  lat:51.5254, lng:-0.0822 },
  { id:222,name:"Som Saa",                  cuisine:"Thai",         rating:4.7, price:2, reviews:2340, address:"43a Commercial St, E1",            certified:true,  tags:["Thai","Spicy","Authentic","Trendy","East London"],               dishes:["Larb Gai","Pad Kra Pao","Mango Sticky Rice","Thai Whisky Sour"],       emoji:"🍜", x:80, y:42, instagram:"somsaa_london",     igFollowers:"29K",  lat:51.5196, lng:-0.0745 },
  { id:223,name:"Ramen Yorokobi",           cuisine:"Japanese",     rating:4.5, price:2, reviews:1230, address:"74 Kingsland Rd, Shoreditch",      certified:true,  tags:["Ramen","Japanese","Noodles","Casual","Cosy"],                    dishes:["Tonkotsu Ramen","Gyoza","Karaage Chicken","Matcha Ice Cream"],          emoji:"🍜", x:77, y:28, instagram:"ramenyorokobi",     igFollowers:"11K",  lat:51.5299, lng:-0.0793 },
  { id:224,name:"Coqfighter",               cuisine:"Chicken",      rating:4.7, price:2, reviews:2100, address:"39 Brick Lane, E1",                certified:true,  tags:["Fried Chicken","Burger","Spicy","Trendy","Brick Lane"],          dishes:["Signature Fried Chicken","Nashville Sandwich","Loaded Fries","Slaw"],  emoji:"🍗", x:80, y:42, instagram:"coqfighter",        igFollowers:"28K",  lat:51.5212, lng:-0.0713 },
  { id:225,name:"Smokestak",                cuisine:"BBQ",          rating:4.7, price:3, reviews:2340, address:"35 Sclater St, Shoreditch",        certified:true,  tags:["BBQ","Smoked","Brisket","Trendy","Shoreditch"],                  dishes:["Beef Brisket","Smoked Ribs","Burnt Ends","Slaw","Cornbread"],           emoji:"🥩", x:79, y:37, instagram:"smokestak",         igFollowers:"56K",  lat:51.5232, lng:-0.0741 },

  // ── Halal Batch 8: Caribbean, African & More ──
  { id:226,name:"Jerk City",                cuisine:"Caribbean",    rating:4.6, price:1, reviews:1450, address:"189 Whitechapel Rd, E1",            certified:true,  tags:["Caribbean","Jerk","Budget","Takeaway","Authentic"],              dishes:["Jerk Chicken","Jerk Pork","Festival","Bammy","Rum Punch"],             emoji:"🌴", x:81, y:44, instagram:"jerkcitylondon",    igFollowers:"5.6K", lat:51.5158, lng:-0.0622 },
  { id:227,name:"Mama's Jerk",              cuisine:"Caribbean",    rating:4.7, price:1, reviews:1230, address:"436 Kingsland Rd, Dalston",         certified:true,  tags:["Caribbean","Jerk","Budget","Authentic","Takeaway"],              dishes:["Jerk Chicken","Curry Goat","Rice & Peas","Plantain","Rum Cake"],       emoji:"🍗", x:76, y:22, instagram:"mamasjerk",         igFollowers:"7.1K", lat:51.5469, lng:-0.0739 },
  { id:228,name:"Rudie's Jerk Shack",       cuisine:"Caribbean",    rating:4.6, price:2, reviews:1870, address:"50 Stoke Newington High St",        certified:true,  tags:["Caribbean","Jerk","Rum","Casual","Trendy"],                      dishes:["Jerk Chicken","Rum Punch","Rice & Peas","Plantain","Oxtail"],          emoji:"🌴", x:73, y:14, instagram:"rudieslondon",      igFollowers:"18K",  lat:51.5634, lng:-0.0752 },
  { id:229,name:"Island Social Club",       cuisine:"Caribbean",    rating:4.6, price:2, reviews:870,  address:"15 Westgate St, Hackney",           certified:true,  tags:["Caribbean","Brunch","Rum","Trendy","East London"],               dishes:["Ackee & Saltfish","Jerk Chicken","Rum Cocktails","Plantain"],          emoji:"🏝️", x:78, y:26, instagram:"islandsocialclub",  igFollowers:"9.2K", lat:51.5390, lng:-0.0525 },
  { id:230,name:"Cottons Notting Hill",     cuisine:"Caribbean",    rating:4.5, price:2, reviews:1540, address:"8 Pembridge Rd, Notting Hill",      certified:true,  tags:["Caribbean","Rum","Casual","Notting Hill","Brunch"],               dishes:["Jerk Chicken","Rum Cocktails","Ackee & Saltfish","Plantain"],          emoji:"🏝️", x:28, y:39, instagram:"cottonslondon",     igFollowers:"12K",  lat:51.5138, lng:-0.1987 },
  { id:231,name:"Ikoyi",                    cuisine:"West African", rating:4.8, price:4, reviews:1870, address:"1 St James's Market, SW1",          certified:true,  tags:["West African","Fine Dining","Michelin","Modern","Special Occasion"],dishes:["Jollof Rice","Suya","Chin Chin","Plantain","Afrofusion"],            emoji:"⭐", x:53, y:46, instagram:"ikoyilondon",       igFollowers:"27K",  lat:51.5083, lng:-0.1368 },
  { id:232,name:"Chuku's",                  cuisine:"West African", rating:4.6, price:2, reviews:1230, address:"274 High Rd, Tottenham",            certified:true,  tags:["Nigerian","Tapas","Casual","Creative","West African"],            dishes:["Suya Skewers","Puff Puff","Jollof Rice","Pepper Soup","Chin Chin"],    emoji:"🌍", x:68, y:8,  instagram:"chukus_",           igFollowers:"16K",  lat:51.6008, lng:-0.0694 },
  { id:233,name:"805 Bar Restaurant",       cuisine:"West African", rating:4.5, price:2, reviews:1540, address:"805 Old Kent Rd, SE15",             certified:true,  tags:["Nigerian","West African","Family","Casual","Party"],             dishes:["Egusi Soup","Jollof Rice","Pounded Yam","Suya","Pepper Soup"],         emoji:"🌍", x:70, y:72, instagram:"805restaurant",     igFollowers:"9.4K", lat:51.4819, lng:-0.0600 },
  { id:234,name:"Hidmo East African",       cuisine:"Eritrean",     rating:4.6, price:1, reviews:780,  address:"299 Coldharbour Lane, Brixton",     certified:true,  tags:["Eritrean","East African","Injera","Authentic","Budget"],         dishes:["Injera","Zigni","Tsebhi","Shiro","Tej"],                               emoji:"🌍", x:55, y:79, instagram:"hidmolondon",       igFollowers:"2.4K", lat:51.4619, lng:-0.1109 },
  { id:235,name:"Baba G's Bhangra Burger",  cuisine:"Indian Fusion",rating:4.5, price:2, reviews:1230, address:"Flat Iron Square, SE1",             certified:true,  tags:["Indian Fusion","Burger","Street Food","Spicy","Casual"],         dishes:["Tikka Masala Burger","Bhangra Fries","Mango Slaw","Chai Shake"],       emoji:"🍔", x:68, y:52, instagram:"babagsburger",      igFollowers:"13K",  lat:51.5046, lng:-0.0944 },
  { id:236,name:"Lahore Karahi Tooting",    cuisine:"Pakistani",    rating:4.6, price:1, reviews:2100, address:"1 Tooting High St, SW17",           certified:true,  tags:["Pakistani","Karahi","Budget","Tooting","Authentic"],             dishes:["Chicken Karahi","Lamb Karahi","Naan","Lassi","Seekh Kebab"],           emoji:"🍖", x:50, y:85, instagram:"lahorekarahi",      igFollowers:"4.8K", lat:51.4276, lng:-0.1679 },
  { id:237,name:"Apollo Banana Leaf",       cuisine:"Sri Lankan",   rating:4.6, price:1, reviews:2870, address:"190 Tooting High St, SW17",         certified:true,  tags:["Sri Lankan","Budget","Curry","Authentic","Family"],              dishes:["Crab Curry","Kothu Roti","Hoppers","Fish Ambul Thiyal"],               emoji:"🍌", x:50, y:86, instagram:"apollobananaleaf",  igFollowers:"6.2K", lat:51.4272, lng:-0.1679 },
  { id:238,name:"Kaosarn",                  cuisine:"Thai",         rating:4.6, price:1, reviews:2100, address:"110 St John's Hill, Battersea",     certified:true,  tags:["Thai","Budget","Authentic","Street Food","Casual"],              dishes:["Pad Thai","Green Curry","Som Tam","Mango Sticky Rice"],                emoji:"🍜", x:48, y:72, instagram:"kaosarnlondon",     igFollowers:"8.9K", lat:51.4636, lng:-0.1654 },
  { id:239,name:"Wazir Khan",               cuisine:"Afghani",      rating:4.7, price:1, reviews:870,  address:"221 Whitechapel Rd, E1",            certified:true,  tags:["Afghani","Authentic","Budget","Rice","Kebab"],                   dishes:["Kabuli Pulao","Seekh Kebab","Mantu","Bolani","Green Tea"],             emoji:"🏔️", x:81, y:44, instagram:"wazirkhanlondon",   igFollowers:"1.9K", lat:51.5156, lng:-0.0617 },
  { id:240,name:"Afghan Village",           cuisine:"Afghani",      rating:4.6, price:1, reviews:1120, address:"153 Hammersmith Rd, W6",            certified:true,  tags:["Afghani","Authentic","Budget","Family","Lamb"],                  dishes:["Kabuli Pulao","Mantu","Bolani","Lamb Qorma","Naan"],                   emoji:"🏔️", x:22, y:50, instagram:"afghanvillagelondon",igFollowers:"2.8K",lat:51.4924, lng:-0.2268 },
  { id:241,name:"Pasha",                    cuisine:"Moroccan",     rating:4.6, price:3, reviews:1650, address:"1 Gloucester Rd, South Kensington", certified:true,  tags:["Moroccan","Atmospheric","Date Night","Upscale","Tagine"],        dishes:["Lamb Tagine","Couscous Royale","Pastilla","Mint Tea","Baklava"],        emoji:"🫖", x:35, y:52, instagram:"pasharestaurant",   igFollowers:"8.7K", lat:51.4974, lng:-0.1831 },
  { id:242,name:"Tabure",                   cuisine:"Turkish",      rating:4.6, price:2, reviews:1540, address:"8 Hillgate St, Notting Hill",       certified:true,  tags:["Turkish","Mezze","Date Night","Casual","Neighbourhood"],         dishes:["Mixed Mezze","Lamb Chops","Pide","Hummus","Baklava"],                  emoji:"🌮", x:28, y:38, instagram:"taburerestaurant",  igFollowers:"7.8K", lat:51.5136, lng:-0.1977 },
  { id:243,name:"Noor Jahan Bayswater",     cuisine:"Indian",       rating:4.5, price:2, reviews:1870, address:"26 Sussex Pl, Bayswater",           certified:true,  tags:["Indian","Curry","Casual","Family","Budget"],                     dishes:["Butter Chicken","Lamb Rogan Josh","Naan","Pilau Rice","Kulfi"],        emoji:"🍛", x:33, y:41, instagram:"noorjahanlondon",   igFollowers:"4.2K", lat:51.5120, lng:-0.1874 },
  { id:244,name:"Roti King",                cuisine:"Malaysian",    rating:4.7, price:1, reviews:3870, address:"40 Doric Way, Euston",              certified:true,  tags:["Malaysian","Roti","Curry","Budget","Cult"],                      dishes:["Roti Canai","Dhal Curry","Beef Rendang","Teh Tarik","Satay"],          emoji:"🫓", x:59, y:36, instagram:"rotikinguk",        igFollowers:"22K",  lat:51.5266, lng:-0.1338 },
  { id:245,name:"Cafe Spice Namaste",       cuisine:"Indian",       rating:4.6, price:3, reviews:1870, address:"16 Prescot St, Aldgate",            certified:true,  tags:["Indian","Parsee","Unique","Date Night","Upscale"],               dishes:["Dhansak","Lamb Farcha","Prawn Patio","Cardamom Kulfi"],                emoji:"✨", x:78, y:46, instagram:"cafespicenamaste",  igFollowers:"9.3K", lat:51.5108, lng:-0.0701 },
  { id:246,name:"Gunpowder",                cuisine:"Indian",       rating:4.6, price:2, reviews:1980, address:"11 White's Row, Spitalfields",      certified:true,  tags:["Indian","Small Plates","Spicy","Modern","Trendy"],               dishes:["Kashmiri Lamb Chops","Crispy Okra","Daal","Pav Bhaji","Kulfi"],        emoji:"💥", x:80, y:41, instagram:"gunpowderlondon",   igFollowers:"19K",  lat:51.5189, lng:-0.0764 },
  { id:247,name:"Berber & Q Shawarma Bar",  cuisine:"Middle Eastern",rating:4.6,price:2, reviews:2210, address:"338 Acton Mews, Haggerston",       certified:true,  tags:["Shawarma","Middle Eastern","Trendy","Grill","Casual"],           dishes:["Chicken Shawarma","Lamb Shawarma","Fattoush","Hummus","Baklava"],       emoji:"🥙", x:76, y:25, instagram:"berberandq",        igFollowers:"48K",  lat:51.5371, lng:-0.0741 },
  { id:248,name:"Pilpel",                   cuisine:"Israeli",      rating:4.4, price:1, reviews:2540, address:"38 Brushfield St, Spitalfields",    certified:true,  tags:["Falafel","Israeli","Healthy","Budget","Wrap"],                   dishes:["Falafel Wrap","Hummus Bowl","Sabich","Shakshuka","Halloumi Wrap"],      emoji:"🧆", x:79, y:42, instagram:"pilpeluk",          igFollowers:"14K",  lat:51.5196, lng:-0.0757 },
  { id:249,name:"Brigadiers",               cuisine:"Indian BBQ",   rating:4.7, price:3, reviews:3341, address:"1 Bloomberg Arcade, City",          certified:true,  tags:["BBQ","Meat Lover","Date Night","Lamb","Tandoori"],               dishes:["Tandoori Lamb Chops","Dal Makhani","Lassi","Seekh Kebab","Naan"],      emoji:"🍢", x:72, y:46, instagram:"brigadierslondon",  igFollowers:"41K",  lat:51.5129, lng:-0.0906 },
  { id:250,name:"Dishoom Carnaby",          cuisine:"Indian",       rating:4.7, price:2, reviews:5400, address:"22 Kingly St, Carnaby",             certified:true,  tags:["Indian","Brunch","Curry","Naan","Carnaby"],                      dishes:["Bacon Naan Roll","Black Daal","Lamb Raan","House Black Tea","Chai"],    emoji:"🍛", x:58, y:45, instagram:"dishoom",           igFollowers:"432K", lat:51.5131, lng:-0.1375 },

  // ── Batch 9: More London Halal Spots ──
  { id:251,name:"Zayna",                    cuisine:"Pakistani",    rating:4.6, price:2, reviews:1870, address:"25 New Quebec St, Marylebone",      certified:true,  tags:["Pakistani","Fine Dining","Date Night","Upscale","Lamb"],         dishes:["Lamb Karahi","Seekh Kebab","Chicken Tikka","Naan","Gulab Jamun"],      emoji:"🌿", x:49, y:37, instagram:"zaynarestaurant",   igFollowers:"7.2K", lat:51.5160, lng:-0.1579 },
  { id:252,name:"Edwins",                   cuisine:"Caribbean",    rating:4.6, price:2, reviews:1120, address:"202-206 Borough High St, SE1",      certified:true,  tags:["Caribbean","Soul Food","Casual","Brunch","Borough"],             dishes:["Jerk Chicken","Oxtail","Ackee & Saltfish","Rum Punch","Plantain"],     emoji:"🌴", x:68, y:54, instagram:"edwinslondon",      igFollowers:"6.3K", lat:51.5018, lng:-0.0939 },
  { id:253,name:"Shawa",                    cuisine:"Lebanese",     rating:4.6, price:2, reviews:1540, address:"22 Connaught St, Marylebone",       certified:true,  tags:["Lebanese","Mezze","Casual","Healthy","Shawarma"],                dishes:["Shawarma","Hummus","Fattoush","Falafel","Knafeh"],                      emoji:"🥙", x:45, y:37, instagram:"shawalondon",       igFollowers:"5.8K", lat:51.5154, lng:-0.1636 },
  { id:254,name:"Nando's Brixton",          cuisine:"Chicken",      rating:4.4, price:2, reviews:3400, address:"426 Coldharbour Lane, Brixton",     certified:true,  tags:["Chicken","Peri Peri","Casual","Family","Quick Bite"],            dishes:["Peri Peri Chicken","Butterfly Chicken","Fino Pitta","Sides"],          emoji:"🍗", x:55, y:79, instagram:"nandosuk",          igFollowers:"312K", lat:51.4627, lng:-0.1146 },
  { id:255,name:"Murger Han",               cuisine:"Chinese",      rating:4.6, price:1, reviews:1540, address:"141 Old St, EC1",                   certified:true,  tags:["Chinese","Xi'an","Noodles","Budget","Spicy"],                    dishes:["Rou Jia Mo","Biang Biang Noodles","Pork Burger","Lamb Skewers"],       emoji:"🥟", x:75, y:36, instagram:"murgerhan",         igFollowers:"8.2K", lat:51.5263, lng:-0.0882 },
  { id:256,name:"Wadadli Kitchen",          cuisine:"Caribbean",    rating:4.5, price:2, reviews:890,  address:"87 Exmouth Market, Clerkenwell",    certified:true,  tags:["Caribbean","Jerk","Rice","Casual","Authentic"],                  dishes:["Jerk Chicken","Rice & Peas","Curry Goat","Plantain","Festival"],       emoji:"🌴", x:67, y:36, instagram:"wadadlikitchen",    igFollowers:"7.2K", lat:51.5244, lng:-0.1090 },
  { id:257,name:"Roti Joupa",               cuisine:"Caribbean",    rating:4.6, price:1, reviews:1230, address:"12 Clapham High St, SW4",           certified:true,  tags:["Caribbean","Trinidadian","Roti","Budget","Authentic"],           dishes:["Roti","Curry Goat","Doubles","Oxtail","Sorrel Drink"],                 emoji:"🫓", x:52, y:76, instagram:"rotijoupa",         igFollowers:"8.4K", lat:51.4614, lng:-0.1340 },
  { id:258,name:"Momo",                     cuisine:"Moroccan",     rating:4.6, price:3, reviews:2340, address:"25 Heddon St, Mayfair",             certified:true,  tags:["Moroccan","Atmospheric","Date Night","Upscale","Couscous"],      dishes:["Lamb Tagine","Couscous","Bastilla","Mint Tea","Baklava"],               emoji:"🫖", x:52, y:43, instagram:"momolondon",        igFollowers:"31K",  lat:51.5107, lng:-0.1398 },
  { id:259,name:"Kateh",                    cuisine:"Persian",      rating:4.7, price:3, reviews:2100, address:"5 Warwick Pl, Maida Vale",          certified:true,  tags:["Persian","Upscale","Date Night","Authentic","Kebab"],            dishes:["Koobideh","Barg Kebab","Ghormeh Sabzi","Zereshk Polo","Doogh"],        emoji:"🌸", x:40, y:30, instagram:"katerestaurant",    igFollowers:"8.9K", lat:51.5232, lng:-0.1921 },
  { id:260,name:"Colbeh",                   cuisine:"Persian",      rating:4.6, price:2, reviews:1450, address:"46 Porchester Rd, Bayswater",       certified:true,  tags:["Persian","Budget","Kebab","Authentic","BYOB"],                   dishes:["Koobideh","Joojeh","Ghormeh Sabzi","Chelo Rice","Shirazi Salad"],      emoji:"🌿", x:31, y:38, instagram:"colbehrestaurant",  igFollowers:"6.2K", lat:51.5165, lng:-0.1878 },
  { id:261,name:"Merkato",                  cuisine:"Ethiopian",    rating:4.6, price:2, reviews:1120, address:"196 Caledonian Rd, N1",             certified:true,  tags:["Ethiopian","Injera","Authentic","Vegetarian Friendly","Family"], dishes:["Injera","Doro Wot","Misir Wot","Tibs","Tej"],                          emoji:"🌍", x:63, y:24, instagram:"merkatoethiopian",  igFollowers:"4.3K", lat:51.5390, lng:-0.1100 },
  { id:262,name:"Queen of Sheba",           cuisine:"Ethiopian",    rating:4.6, price:2, reviews:1340, address:"12 Fortess Rd, Kentish Town",       certified:true,  tags:["Ethiopian","Injera","Authentic","Family","Cosy"],                dishes:["Injera","Lamb Tibs","Doro Wot","Shiro","Ethiopian Honey Wine"],        emoji:"👑", x:60, y:16, instagram:"queenofshebalondon", igFollowers:"3.8K", lat:51.5516, lng:-0.1393 },
  { id:263,name:"Desta Ethiopian Kitchen",  cuisine:"Ethiopian",    rating:4.7, price:1, reviews:870,  address:"148 Blackstock Rd, N4",             certified:true,  tags:["Ethiopian","Budget","Authentic","Injera","Community"],           dishes:["Doro Wot","Kitfo","Gored Gored","Injera","Tej"],                       emoji:"🌍", x:67, y:14, instagram:"desta_ethiopian",   igFollowers:"2.1K", lat:51.5601, lng:-0.0986 },
  { id:264,name:"Abesha",                   cuisine:"Ethiopian",    rating:4.5, price:1, reviews:760,  address:"131 Granville Rd, NW2",             certified:true,  tags:["Ethiopian","Eritrean","Budget","Authentic","Family"],            dishes:["Injera","Lamb Stew","Doro Wot","Shiro","Spiced Tea"],                  emoji:"🌍", x:42, y:18, instagram:"abesharestaurant",  igFollowers:"1.8K", lat:51.5590, lng:-0.2214 },
  { id:265,name:"Shish Mahal",              cuisine:"Turkish",      rating:4.5, price:2, reviews:1650, address:"66-68 Park Rd, NW1",               certified:true,  tags:["Turkish","Casual","Kebab","Family","Regent's Park"],             dishes:["Mixed Grill","Lamb Shish","Chicken Adana","Pide","Baklava"],           emoji:"🌮", x:52, y:28, instagram:"shishmahallondon",  igFollowers:"4.2K", lat:51.5319, lng:-0.1569 },
  { id:266,name:"Nando's Westfield",        cuisine:"Chicken",      rating:4.4, price:2, reviews:4100, address:"Westfield Stratford, E20",          certified:true,  tags:["Chicken","Peri Peri","Casual","Family","Stratford"],             dishes:["Peri Peri Chicken","Fino Pitta","Butterfly Chicken","Sides"],          emoji:"🍗", x:88, y:35, instagram:"nandosuk",          igFollowers:"312K", lat:51.5431, lng:0.0085 },
  { id:267,name:"Chicken Shop Tooting",     cuisine:"Chicken",      rating:4.5, price:1, reviews:2100, address:"82 Tooting High St, SW17",          certified:true,  tags:["Chicken","Rotisserie","Budget","Casual","Tooting"],              dishes:["Half Chicken","Whole Chicken","Fries","Slaw","Mac & Cheese"],          emoji:"🍗", x:50, y:85, instagram:"chickenshop",       igFollowers:"34K",  lat:51.4273, lng:-0.1680 },
  { id:268,name:"Lahori Dera",              cuisine:"Pakistani",    rating:4.6, price:1, reviews:1870, address:"182 Upper Tooting Rd, SW17",        certified:true,  tags:["Pakistani","Budget","Karahi","Late Night","Tooting"],            dishes:["Chicken Karahi","Lamb Nihari","Paya","Seekh Kebab","Halwa Puri"],      emoji:"🍖", x:50, y:86, instagram:"lahorideralooking",  igFollowers:"3.1K", lat:51.4253, lng:-0.1654 },
  { id:269,name:"Five Guys Stratford",      cuisine:"Burgers",      rating:4.5, price:2, reviews:5600, address:"Westfield Stratford City, E20",     certified:true,  tags:["Burger","Loaded","Fries","Peanuts","Customise"],                 dishes:["Little Burger","Cajun Fries","Hot Dog","BLT Burger"],                  emoji:"🍔", x:88, y:35, instagram:"fiveguys",          igFollowers:"678K", lat:51.5431, lng:0.0085 },
  { id:270,name:"Shake Shack Stratford",    cuisine:"Burgers",      rating:4.4, price:2, reviews:3200, address:"Westfield Stratford City, E20",     certified:true,  tags:["Burger","Milkshake","Fries","Chicken","Fast Casual"],            dishes:["ShackBurger","Crispy Chicken","Crinkle Fries","Concrete Shake"],       emoji:"🍔", x:88, y:35, instagram:"shakeshack",        igFollowers:"1.2M", lat:51.5432, lng:0.0086 },
  { id:271,name:"Dixy Chicken",             cuisine:"Chicken",      rating:4.3, price:1, reviews:2870, address:"73 Whitechapel High St, E1",        certified:true,  tags:["Chicken","Fried","Budget","Takeaway","Quick Bite"],              dishes:["Fried Chicken","Burger","Wrap","Wings","Chips"],                       emoji:"🍗", x:80, y:44, instagram:"dixychicken",       igFollowers:"22K",  lat:51.5153, lng:-0.0652 },
  { id:272,name:"Morley's",                 cuisine:"Chicken",      rating:4.2, price:1, reviews:3400, address:"Various South London Locations",    certified:true,  tags:["Chicken","Fried","Budget","South London","Iconic"],              dishes:["Fried Chicken","Burger","Chips","Wings","Pineapple Fritter"],          emoji:"🍗", x:60, y:75, instagram:"morleyschicken",    igFollowers:"15K",  lat:51.4627, lng:-0.1146 },
  { id:273,name:"Istanbul Restaurant",      cuisine:"Turkish",      rating:4.6, price:2, reviews:1980, address:"9 Green Lanes, Harringay",          certified:true,  tags:["Turkish","Ocakbasi","Family","Authentic","Grill"],               dishes:["Mixed Grill","Lamb Shish","Adana","Pide","Baklava"],                   emoji:"🌮", x:67, y:11, instagram:"istanbulrestaurantlondon",igFollowers:"5.1K",lat:51.5784, lng:-0.1001 },
  { id:274,name:"Mangal Ocakbasi",          cuisine:"Turkish",      rating:4.7, price:2, reviews:2340, address:"10 Arcola St, Dalston",             certified:true,  tags:["Turkish","Ocakbasi","Authentic","Grill","Dalston"],              dishes:["Lamb Shish","Chicken Adana","Mixed Grill","Pide","Hummus"],            emoji:"🔥", x:76, y:22, instagram:"mangalocakbasi",    igFollowers:"9.4K", lat:51.5492, lng:-0.0746 },
  { id:275,name:"Shalimar",                 cuisine:"Pakistani",    rating:4.5, price:1, reviews:1540, address:"206 King St, Hammersmith",          certified:true,  tags:["Pakistani","Curry","Budget","Family","Halal"],                   dishes:["Chicken Karahi","Lamb Biryani","Seekh Kebab","Naan","Lassi"],          emoji:"🍖", x:22, y:51, instagram:"shalimarlondon",    igFollowers:"3.4K", lat:51.4924, lng:-0.2268 },
];

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
  // Convert any id (string or number) to a stable integer for indexing
  const numId = typeof id === "number" ? id : String(id).split("").reduce((acc,c) => acc + c.charCodeAt(0), 0);
  const base = patterns[typeList[Math.abs(numId - 1) % typeList.length]];
  if (!base) return [0,1,2,3,4,5,6].map(() => new Array(24).fill(0));
  return [0,1,2,3,4,5,6].map(day => {
    const boost = (day===0||day===6)?15:(day===5)?10:0;
    return base.map((v,h) => Math.min(100, Math.max(0, Math.round(v + boost + ((numId*h*day)%11) - 5))));
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

// ── AI-Generated Restaurant Logo ─────────────────────────────────────────────
// Uses Anthropic API to generate a cartoon logo, caches in memory
const logoCache = {};

function RestaurantLogo({ name, cuisine, emoji, size=46 }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const cacheKey = name;

  useEffect(() => {
    if (logoCache[cacheKey]) { setImgUrl(logoCache[cacheKey]); return; }
    if (loading) return;
    setLoading(true);

    // Use DiceBear avatars — generates consistent cartoon logos from restaurant name
    // Free, no API key needed, always returns an image
    const style = getCuisineAvatarStyle(cuisine);
    const seed = encodeURIComponent(name);
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=1a2332&radius=10`;
    logoCache[cacheKey] = url;
    setImgUrl(url);
    setLoading(false);
  }, [name]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCuisineAvatarStyle = (cuisine) => {
    const c = (cuisine||"").toLowerCase();
    if (c.includes("burger") || c.includes("chicken")) return "bottts";
    if (c.includes("indian") || c.includes("pakistani") || c.includes("curry")) return "adventurer";
    if (c.includes("japanese") || c.includes("korean") || c.includes("thai")) return "pixel-art";
    if (c.includes("italian") || c.includes("pizza") || c.includes("pasta")) return "lorelei";
    if (c.includes("lebanese") || c.includes("middle eastern") || c.includes("moroccan")) return "thumbs";
    if (c.includes("turkish")) return "fun-emoji";
    if (c.includes("african")) return "adventurer-neutral";
    if (c.includes("persian")) return "lorelei";
    if (c.includes("steak") || c.includes("bbq") || c.includes("grill")) return "bottts-neutral";
    if (c.includes("seafood") || c.includes("fish")) return "pixel-art";
    if (c.includes("dessert") || c.includes("bakery")) return "croodles";
    return "shapes";
  };

  const borderR = size > 48 ? 12 : 10;

  if (imgUrl) {
    return (
      <div style={{ width:size, height:size, borderRadius:borderR, overflow:"hidden", flexShrink:0, background:"#1a2332", border:"1px solid #1F2937" }}>
        <img
          src={imgUrl}
          alt={name}
          style={{ width:"100%", height:"100%", objectFit:"cover" }}
          onError={() => setImgUrl(null)}
        />
      </div>
    );
  }

  // Fallback — emoji while loading
  return (
    <div style={{ fontSize:size*0.55, width:size, height:size, background:"#1a2332", borderRadius:borderR, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:"1px solid #1F2937" }}>
      {emoji || "🍽️"}
    </div>
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
        <RestaurantLogo name={r.name} cuisine={r.cuisine} emoji={r.emoji} size={46}/>
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
      <button onClick={onClose} style={{ position:"absolute",top:10,right:10,background:"#1F2937",border:"1px solid #374151",color:"#D1FAE5",cursor:"pointer",fontSize:13,lineHeight:1,width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,zIndex:10 }}>✕</button>

      {/* Header */}
      <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:12 }}>
        <RestaurantLogo name={r.name} cuisine={r.cuisine} emoji={r.emoji} size={52}/>
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
      {/* Instagram row — only show if handle exists */}
      {r.instagram && r.instagram.length > 0 && (
        <a href={igUrl} target="_blank" rel="noopener noreferrer" style={{ display:"flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",borderRadius:9,padding:"9px 14px",textDecoration:"none" }}>
          <IGIcon size={14}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12,fontWeight:700,color:"#fff" }}>@{r.instagram}</div>
            {r.igFollowers && <div style={{ fontSize:10,color:"rgba(255,255,255,0.75)" }}>{r.igFollowers} followers</div>}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>
      )}
    </div>
  );
}

// ── Location Button ──────────────────────────────────────────────────────────
function LocationButton({ onLocate }) {
  const [status, setStatus] = useState("idle"); // idle | locating | found | denied

  const locate = () => {
    if (!navigator.geolocation) { setStatus("denied"); return; }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setStatus("found");
        if (onLocate) onLocate(lat, lng);
        setTimeout(() => setStatus("idle"), 3000);
      },
      () => { setStatus("denied"); setTimeout(() => setStatus("idle"), 3000); },
      { timeout: 8000 }
    );
  };

  const colors = {
    idle:     { bg:"#1F2937", border:"#374151", color:"#9CA3AF", icon:"📍" },
    locating: { bg:"#0d2a1e", border:"#10B981", color:"#10B981", icon:"⟳"  },
    found:    { bg:"#0d2a1e", border:"#10B981", color:"#10B981", icon:"✓"  },
    denied:   { bg:"#2a0d0d", border:"#EF4444", color:"#EF4444", icon:"✕"  },
  };
  const c = colors[status];

  return (
    <div style={{ position:"absolute", bottom:64, right:12, zIndex:20 }}>
      <button
        onClick={locate}
        title="Find restaurants near me"
        style={{
          width:36, height:36, borderRadius:8,
          background:c.bg, border:`1px solid ${c.border}`,
          color:c.color, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          flexDirection:"column", gap:1,
          boxShadow: status==="found" ? `0 0 12px #10B98155` : "none",
          transition:"all 0.3s ease",
          animation: status==="locating" ? "spin 1s linear infinite" : "none",
        }}>
        <span style={{ fontSize:16, lineHeight:1 }}>{c.icon}</span>
      </button>
      {status === "found" && (
        <div style={{ position:"absolute", right:44, top:"50%", transform:"translateY(-50%)", background:"#0d2a1e", border:"1px solid #10B981", borderRadius:8, padding:"4px 10px", whiteSpace:"nowrap", fontSize:11, color:"#10B981", fontWeight:600 }}>
          Location found!
        </div>
      )}
      {status === "denied" && (
        <div style={{ position:"absolute", right:44, top:"50%", transform:"translateY(-50%)", background:"#2a0d0d", border:"1px solid #EF4444", borderRadius:8, padding:"4px 10px", whiteSpace:"nowrap", fontSize:11, color:"#EF4444", fontWeight:600 }}>
          Location denied
        </div>
      )}
    </div>
  );
}

// ── Google Map ───────────────────────────────────────────────────────────────
function GoogleMap({ restaurants, highlighted, activeId, onPin, userLocation }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const center = userLocation || { lat: 51.5074, lng: -0.1278 };

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      styles: [
        { elementType:"geometry", stylers:[{ color:"#0f1923" }] },
        { elementType:"labels.text.fill", stylers:[{ color:"#6B7280" }] },
        { elementType:"labels.text.stroke", stylers:[{ color:"#0f1923" }] },
        { featureType:"road", elementType:"geometry", stylers:[{ color:"#1a2d3d" }] },
        { featureType:"road", elementType:"geometry.stroke", stylers:[{ color:"#243545" }] },
        { featureType:"water", elementType:"geometry", stylers:[{ color:"#0a1f35" }] },
        { featureType:"poi", stylers:[{ visibility:"off" }] },
        { featureType:"transit", stylers:[{ visibility:"off" }] },
        { featureType:"landscape", elementType:"geometry", stylers:[{ color:"#141f2e" }] },
      ],
      disableDefaultUI: true,
      zoomControl: false,
    });
  }, [userLocation]);

  useEffect(() => {
    if (!window.google || !mapInstance.current) return;

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    restaurants.forEach(r => {
      if (!r.lat || !r.lng) return;
      const isHL = highlighted.includes(r.id);
      const isActive = activeId === r.id;

      const marker = new window.google.maps.Marker({
        position: { lat: r.lat, lng: r.lng },
        map: mapInstance.current,
        title: r.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: isActive ? 14 : isHL ? 11 : 8,
          fillColor: isActive ? "#10B981" : isHL ? "#34d399" : "#4ade80",
          fillOpacity: 1,
          strokeColor: isActive ? "#fff" : "transparent",
          strokeWeight: 2,
        },
        zIndex: isActive ? 100 : isHL ? 50 : 1,
        label: { text: r.emoji, fontSize: isActive ? "14px" : "11px" },
      });

      marker.addListener("click", () => onPin(r));
      markersRef.current.push(marker);
    });
  }, [restaurants, highlighted, activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pan to active pin
  useEffect(() => {
    if (!window.google || !mapInstance.current) return;
    const r = restaurants.find(r => r.id === activeId);
    if (r?.lat && r?.lng) {
      mapInstance.current.panTo({ lat: r.lat, lng: r.lng });
      mapInstance.current.setZoom(15);
    }
  }, [activeId, restaurants]);

  return (
    <div ref={mapRef} style={{ width:"100%", height:"100%", background:"#0f1923" }}>
      {!window.google && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", flexDirection:"column", gap:8 }}>
          <div style={{ fontSize:24 }}>🗺️</div>
          <div style={{ fontSize:12, color:"#6B7280" }}>Loading map...</div>
        </div>
      )}
    </div>
  );
}

// Keep MockMap as fallback
function MockMap({ restaurants, highlighted, activeId, onPin, onLocate }) {
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
      <LocationButton onLocate={onLocate}/>
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
      const res = await fetch("https://verifind-server.onrender.com/ai",{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ system:sys,
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
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"14px 16px 10px" }}>
        <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#10B981,#065f46)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <Logo size={18}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15,fontWeight:700,color:"#F9FAFB",fontFamily:"'Cormorant Garamond',serif" }}>AI Concierge <span style={{ fontSize:10,color:"#10B981",fontWeight:400 }}>● Verifind AI</span></div>
          <div style={{ fontSize:12,color:"#9CA3AF",fontWeight:500 }}>What you thinking? 🤔</div>
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
        <div style={{ maxHeight:220,overflowY:"auto",padding:"0 12px 10px",display:"flex",flexDirection:"column",gap:8,borderTop:"1px solid #1a2332",paddingTop:10 }}>
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


// ── Mobile Bottom Sheet ───────────────────────────────────────────────────────
function MobileBottomSheet({ children, expanded, onToggle }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "#080e1a",
      borderRadius: "20px 20px 0 0",
      borderTop: "1px solid #1a2332",
      boxShadow: "0 -8px 32px rgba(0,0,0,0.6)",
      transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
      height: expanded ? "75vh" : "52px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Drag handle */}
      <div onClick={onToggle} style={{ padding: "10px 0 6px", display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer", flexShrink:0 }}>
        <div style={{ width:36, height:4, background:"#2D3748", borderRadius:4 }}/>
      </div>
      <div style={{ flex:1, overflowY: expanded ? "auto" : "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [highlighted, setHighlighted] = useState([]);
  const [activePin, setActivePin] = useState(null);
  const [restaurants, setRestaurants] = useState(RESTAURANTS); // fallback to mock
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapsLoaded, setMapsLoaded] = useState(!!window.google);
  const [mobileTab, setMobileTab] = useState("map"); // "map" | "list" | "ai"
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load Google Maps JS SDK once
  useEffect(() => {
    if (window.google) { setMapsLoaded(true); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBOaU_ihS3RqNo3X5Strpp3OsD6RI7unQM&libraries=places`;
    script.async = true;
    script.onload = () => setMapsLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Fetch restaurants from our server
  const fetchRestaurants = (lat, lng) => {
    setLoadingRestaurants(true);
    fetch(`https://verifind-server.onrender.com/restaurants?lat=${lat}&lng=${lng}&radius=5000`)
      .then(r => r.json())
      .then(data => {
        if (data.restaurants?.length > 0) {
          // Merge Google Places data with mock data
          // For any restaurant name that matches a mock entry, keep its instagram/igFollowers
          const merged = data.restaurants.map((googleR, i) => {
            const mockMatch = RESTAURANTS.find(m =>
              m.name.toLowerCase().includes(googleR.name.toLowerCase().split(" ")[0]) ||
              googleR.name.toLowerCase().includes(m.name.toLowerCase().split(" ")[0])
            );
            return {
              ...googleR,
              instagram: mockMatch?.instagram || "",
              igFollowers: mockMatch?.igFollowers || "",
              emoji: mockMatch?.emoji || googleR.emoji,
              dishes: mockMatch?.dishes || googleR.dishes || [],
            };
          });
          // Add mock restaurants that have Instagram handles but aren't in Google results
          const googleNames = merged.map(r => r.name.toLowerCase());
          const mockWithIG = RESTAURANTS.filter(m =>
            m.instagram &&
            !googleNames.some(n => n.includes(m.name.toLowerCase().split(" ")[0]))
          );
          setRestaurants([...merged, ...mockWithIG]);
        }
        setLoadingRestaurants(false);
      })
      .catch(() => {
        // Server not running — keep mock data silently
        setLoadingRestaurants(false);
      });
  };

  // Auto-fetch on load with London centre
  useEffect(() => {
    fetchRestaurants(51.5074, -0.1278);
  }, []);

  const sorted = [...restaurants].sort((a,b)=>{
    const ah=highlighted.includes(a.id)?1:0, bh=highlighted.includes(b.id)?1:0;
    return bh-ah||b.rating-a.rating;
  });

  const handlePin = (r) => {
    setActivePin(prev=>prev?.id===r.id?null:r);
    if (isMobile) setSheetExpanded(false); // collapse sheet to show map pin
  };
  const handleLocate = (lat, lng) => {
    setUserLocation({ lat, lng });
    fetchRestaurants(lat, lng);
  };

  const RestaurantListContent = () => (
    <>
      {loadingRestaurants && (
        <div style={{ padding:"6px 12px", display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"bounce 0.9s 0s infinite" }}/>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"bounce 0.9s 0.2s infinite" }}/>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"bounce 0.9s 0.4s infinite" }}/>
          <span style={{ fontSize:10, color:"#6B7280" }}>Finding halal spots near you...</span>
        </div>
      )}
      {highlighted.length>0 && (
        <div style={{ padding:"8px 12px 0" }}>
          <button onClick={()=>setHighlighted([])} style={{ fontSize:11, padding:"4px 12px", borderRadius:20, border:"1px solid #065f46", background:"transparent", color:"#10B981", cursor:"pointer" }}>Clear AI picks ✕</button>
        </div>
      )}
      <div style={{ padding:"10px 10px", display:"flex", flexDirection:"column", gap:8 }}>
        {sorted.map((r,i)=>(
          <div key={r.id} style={{ animation:`fadeUp 0.3s ${i*0.03}s ease both` }}>
            <Card r={r} highlighted={highlighted.includes(r.id)} active={activePin?.id===r.id} onClick={handlePin}/>
          </div>
        ))}
        <div style={{ textAlign:"center", padding:"20px 0 10px", borderTop:"1px solid #1a2332", marginTop:4 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:"#374151" }}>
            <span style={{ color:"#F9FAFB", fontWeight:600 }}>Veri</span><span style={{ color:"#10B981" }}>find</span>
          </div>
          <div style={{ fontSize:10, color:"#374151", marginTop:2 }}>
            A <span style={{ color:"#6B7280" }}>Vita Industries</span> product · All restaurants independently verified حلال
          </div>
        </div>
      </div>
    </>
  );

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
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      <div style={{ height:"100vh", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <header style={{ background:"#0D1117", borderBottom:"1px solid #1a2332", padding:"0 16px", height:54, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <Wordmark size={isMobile ? "sm" : "lg"}/>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {!isMobile && <div style={{ fontSize:11, color:"#6B7280", background:"#1a2332", padding:"4px 10px", borderRadius:20 }}>📍 London, UK</div>}
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#10B981,#065f46)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>👤</div>
          </div>
        </header>

        {/* ── DESKTOP LAYOUT ── */}
        {!isMobile && (
          <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
            {/* LEFT COLUMN */}
            <div style={{ width:300, flexShrink:0, borderRight:"1px solid #1a2332", display:"flex", flexDirection:"column", overflow:"hidden", background:"#080e1a" }}>
              <div style={{ flexShrink:0, borderBottom:"1px solid #1a2332" }}>
                <AIChat restaurants={RESTAURANTS} onHighlight={ids=>setHighlighted(ids)}/>
              </div>
              <div style={{ flex:1, overflowY:"auto" }}>
                <RestaurantListContent/>
              </div>
            </div>

            {/* RIGHT: Map */}
            <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
              {mapsLoaded ? (
                <GoogleMap restaurants={restaurants} highlighted={highlighted} activeId={activePin?.id} onPin={handlePin} userLocation={userLocation}/>
              ) : (
                <MockMap restaurants={restaurants} highlighted={highlighted} activeId={activePin?.id} onPin={handlePin} onLocate={handleLocate}/>
              )}
              <div style={{ position:"absolute", top:12, left:12, display:"flex", alignItems:"center", gap:6, background:"rgba(8,14,26,0.85)", padding:"5px 12px", borderRadius:20, backdropFilter:"blur(4px)" }}>
                <Logo size={16}/>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#F9FAFB" }}>
                  Verifind <span style={{ color:"#10B981" }}>Map</span>
                  {highlighted.length>0 && <span style={{ color:"#10B981", marginLeft:6, fontSize:10 }}>· {highlighted.length} AI picks</span>}
                </span>
              </div>
              {activePin && <DetailCard r={activePin} onClose={()=>setActivePin(null)} floating={true}/>}
            </div>
          </div>
        )}

        {/* ── MOBILE LAYOUT ── */}
        {isMobile && (
          <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
            {/* Full-screen map */}
            <div style={{ position:"absolute", inset:0 }}>
              {mapsLoaded ? (
                <GoogleMap restaurants={restaurants} highlighted={highlighted} activeId={activePin?.id} onPin={handlePin} userLocation={userLocation}/>
              ) : (
                <MockMap restaurants={restaurants} highlighted={highlighted} activeId={activePin?.id} onPin={handlePin} onLocate={handleLocate}/>
              )}
            </div>

            {/* Map top label */}
            <div style={{ position:"absolute", top:10, left:10, display:"flex", alignItems:"center", gap:6, background:"rgba(8,14,26,0.85)", padding:"5px 12px", borderRadius:20, backdropFilter:"blur(4px)", zIndex:10 }}>
              <Logo size={14}/>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#F9FAFB" }}>
                Verifind <span style={{ color:"#10B981" }}>Map</span>
                {highlighted.length>0 && <span style={{ color:"#10B981", marginLeft:4, fontSize:9 }}>· {highlighted.length} AI picks</span>}
              </span>
            </div>

            {/* Mobile tab bar — floats over map */}
            <div style={{ position:"absolute", top:10, right:10, zIndex:20, display:"flex", flexDirection:"column", gap:6 }}>
              {[
                { id:"list", icon:"🍽️", label:"List" },
                { id:"ai",   icon:"✨", label:"AI" },
              ].map(tab => (
                <button key={tab.id} onClick={()=>{ setMobileTab(tab.id); setSheetExpanded(true); }}
                  style={{ background: mobileTab===tab.id&&sheetExpanded ? "#10B981" : "rgba(8,14,26,0.9)", border:`1px solid ${mobileTab===tab.id&&sheetExpanded?"#10B981":"#2D3748"}`, borderRadius:10, padding:"8px 10px", color: mobileTab===tab.id&&sheetExpanded?"#000":"#F9FAFB", fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, backdropFilter:"blur(4px)", minWidth:44 }}>
                  <span style={{ fontSize:16 }}>{tab.icon}</span>
                  <span style={{ fontSize:9 }}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Active pin detail card — floats above bottom sheet */}
            {activePin && (
              <div style={{ position:"absolute", bottom: sheetExpanded ? "77vh" : 64, left:12, right:12, zIndex:110, transition:"bottom 0.35s ease" }}>
                <DetailCard r={activePin} onClose={()=>setActivePin(null)} floating={false}/>
              </div>
            )}

            {/* Bottom Sheet */}
            <MobileBottomSheet expanded={sheetExpanded} onToggle={()=>setSheetExpanded(p=>!p)}>
              {/* Tab switcher inside sheet */}
              <div style={{ display:"flex", gap:0, padding:"0 12px 10px", borderBottom:"1px solid #1a2332" }}>
                {[
                  { id:"list", label:"🍽️ Restaurants" },
                  { id:"ai",   label:"✨ AI Chat" },
                ].map(tab => (
                  <button key={tab.id} onClick={()=>setMobileTab(tab.id)}
                    style={{ flex:1, padding:"7px 0", background:"transparent", border:"none", borderBottom: mobileTab===tab.id ? "2px solid #10B981" : "2px solid transparent", color: mobileTab===tab.id ? "#10B981" : "#6B7280", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {mobileTab === "ai" && (
                <AIChat restaurants={RESTAURANTS} onHighlight={ids=>setHighlighted(ids)}/>
              )}
              {mobileTab === "list" && (
                <RestaurantListContent/>
              )}
            </MobileBottomSheet>
          </div>
        )}

      </div>
    </>
  );
}

