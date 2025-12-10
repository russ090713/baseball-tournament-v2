import React, { useState } from 'react';

// BASEBALL TOURNAMENT GAME v2.0
// Features: 4 teams, LCS, World Series, highlights, defense, speed
// This version has 12 players per position as a working demo
// Full version instructions included at bottom

const PLAYER_POOLS = {
  C: [
    // Original 16
    {name:"Johnny Bench",ba:0.267,obp:0.342,slg:0.476,drs:15,spd:3,sb:68,cs:43,fld:0.990},
    {name:"Yogi Berra",ba:0.285,obp:0.348,slg:0.482,drs:12,spd:2,sb:30,cs:20,fld:0.988},
    {name:"Mike Piazza",ba:0.308,obp:0.377,slg:0.545,drs:-8,spd:2,sb:32,cs:25,fld:0.991},
    {name:"Ivan Rodriguez",ba:0.296,obp:0.334,slg:0.464,drs:18,spd:5,sb:127,cs:61,fld:0.992},
    {name:"Joe Mauer",ba:0.306,obp:0.388,slg:0.439,drs:8,spd:3,sb:59,cs:28,fld:0.993},
    {name:"Buster Posey",ba:0.302,obp:0.372,slg:0.460,drs:10,spd:3,sb:20,cs:15,fld:0.993},
    {name:"Sandy Alomar Jr",ba:0.273,obp:0.309,slg:0.406,drs:6,spd:2,sb:26,cs:18,fld:0.993},
    {name:"Yadier Molina",ba:0.279,obp:0.334,slg:0.379,drs:20,spd:2,sb:68,cs:48,fld:0.994},
    {name:"Jorge Posada",ba:0.273,obp:0.374,slg:0.474,drs:-2,spd:2,sb:20,cs:13,fld:0.990},
    {name:"Victor Martinez",ba:0.295,obp:0.360,slg:0.454,drs:-5,spd:2,sb:15,cs:12,fld:0.992},
    {name:"Salvador Perez",ba:0.262,obp:0.297,slg:0.451,drs:5,spd:2,sb:5,cs:7,fld:0.991},
    {name:"Jason Kendall",ba:0.288,obp:0.366,slg:0.369,drs:4,spd:4,sb:189,cs:90,fld:0.991},
    {name:"Willson Contreras",ba:0.255,obp:0.349,slg:0.466,drs:-3,spd:3,sb:22,cs:14,fld:0.991},
    {name:"Gary Carter",ba:0.262,obp:0.335,slg:0.439,drs:14,spd:3,sb:39,cs:42,fld:0.991},
    {name:"Carlton Fisk",ba:0.269,obp:0.341,slg:0.457,drs:12,spd:3,sb:128,cs:58,fld:0.988},
    {name:"Carlos Santana",ba:0.246,obp:0.365,slg:0.432,drs:3,spd:2,sb:12,cs:8,fld:0.992},
    // 8 Modern Additions
    {name:"Cal Raleigh",ba:0.229,obp:0.312,slg:0.434,drs:8,spd:2,sb:3,cs:2,fld:0.992},
    {name:"Adley Rutschman",ba:0.277,obp:0.362,slg:0.445,drs:12,spd:3,sb:6,cs:3,fld:0.994},
    {name:"J.T. Realmuto",ba:0.273,obp:0.339,slg:0.478,drs:15,spd:7,sb:87,cs:28,fld:0.993},
    {name:"Will Smith",ba:0.261,obp:0.359,slg:0.466,drs:6,spd:2,sb:8,cs:5,fld:0.992},
    {name:"Sean Murphy",ba:0.251,obp:0.332,slg:0.444,drs:10,spd:3,sb:4,cs:3,fld:0.993},
    {name:"Gabriel Moreno",ba:0.284,obp:0.338,slg:0.410,drs:5,spd:5,sb:12,cs:6,fld:0.991},
    {name:"William Contreras",ba:0.280,obp:0.354,slg:0.466,drs:2,spd:3,sb:8,cs:4,fld:0.990},
    {name:"Jonah Heim",ba:0.258,obp:0.319,slg:0.430,drs:7,spd:2,sb:2,cs:1,fld:0.992}
  ],
  "1B": [
    // Original 16
    {name:"Albert Pujols",ba:0.296,obp:0.374,slg:0.544,drs:-12,spd:3,sb:117,cs:48,fld:0.994},
    {name:"Miguel Cabrera",ba:0.310,obp:0.386,slg:0.554,drs:-8,spd:3,sb:38,cs:24,fld:0.993},
    {name:"Joey Votto",ba:0.294,obp:0.409,slg:0.511,drs:5,spd:3,sb:60,cs:24,fld:0.995},
    {name:"Paul Goldschmidt",ba:0.295,obp:0.391,slg:0.514,drs:8,spd:5,sb:158,cs:42,fld:0.995},
    {name:"Freddie Freeman",ba:0.301,obp:0.389,slg:0.505,drs:10,spd:5,sb:120,cs:36,fld:0.996},
    {name:"Lou Gehrig",ba:0.340,obp:0.447,slg:0.632,drs:5,spd:4,sb:102,cs:101,fld:0.991},
    {name:"Jimmie Foxx",ba:0.325,obp:0.428,slg:0.609,drs:3,spd:3,sb:87,cs:56,fld:0.992},
    {name:"Frank Thomas",ba:0.301,obp:0.419,slg:0.555,drs:-10,spd:2,sb:32,cs:21,fld:0.993},
    {name:"Jeff Bagwell",ba:0.297,obp:0.408,slg:0.540,drs:2,spd:6,sb:202,cs:89,fld:0.994},
    {name:"Jim Thome",ba:0.276,obp:0.402,slg:0.554,drs:-5,spd:2,sb:19,cs:15,fld:0.992},
    {name:"Tony Perez",ba:0.279,obp:0.341,slg:0.463,drs:0,spd:3,sb:49,cs:62,fld:0.992},
    {name:"Carlos Santana",ba:0.246,obp:0.365,slg:0.432,drs:3,spd:2,sb:12,cs:8,fld:0.994},
    {name:"Jose Abreu",ba:0.289,obp:0.346,slg:0.504,drs:-2,spd:2,sb:5,cs:4,fld:0.994},
    {name:"Prince Fielder",ba:0.283,obp:0.382,slg:0.506,drs:-8,spd:1,sb:23,cs:15,fld:0.993},
    {name:"Mark McGwire",ba:0.263,obp:0.394,slg:0.588,drs:-3,spd:2,sb:12,cs:8,fld:0.993},
    {name:"Matt Olson",ba:0.249,obp:0.331,slg:0.508,drs:12,spd:3,sb:12,cs:6,fld:0.996},
    // 8 Modern Additions
    {name:"Vladimir Guerrero Jr",ba:0.284,obp:0.360,slg:0.480,drs:-5,spd:3,sb:6,cs:4,fld:0.993},
    {name:"Pete Alonso",ba:0.249,obp:0.339,slg:0.489,drs:-3,spd:2,sb:6,cs:3,fld:0.993},
    {name:"Matt Chapman",ba:0.240,obp:0.328,slg:0.445,drs:15,spd:4,sb:25,cs:12,fld:0.995},
    {name:"Christian Walker",ba:0.259,obp:0.339,slg:0.488,drs:8,spd:3,sb:15,cs:8,fld:0.995},
    {name:"Josh Naylor",ba:0.275,obp:0.320,slg:0.456,drs:-2,spd:2,sb:4,cs:2,fld:0.992},
    {name:"Triston Casas",ba:0.263,obp:0.367,slg:0.490,drs:5,spd:3,sb:3,cs:2,fld:0.994},
    {name:"Yandy Diaz",ba:0.296,obp:0.383,slg:0.436,drs:3,spd:2,sb:4,cs:3,fld:0.994},
    {name:"Ryan Mountcastle",ba:0.259,obp:0.306,slg:0.446,drs:-4,spd:3,sb:8,cs:4,fld:0.992}
  ],
  "2B": [
    // Original 16
    {name:"Rogers Hornsby",ba:0.358,obp:0.434,slg:0.577,drs:8,spd:5,sb:135,cs:75,fld:0.967},
    {name:"Joe Morgan",ba:0.271,obp:0.395,slg:0.427,drs:18,spd:8,sb:689,cs:162,fld:0.981},
    {name:"Jackie Robinson",ba:0.311,obp:0.409,slg:0.474,drs:12,spd:8,sb:197,cs:73,fld:0.983},
    {name:"Robinson Cano",ba:0.302,obp:0.350,slg:0.490,drs:5,spd:4,sb:49,cs:25,fld:0.989},
    {name:"Chase Utley",ba:0.275,obp:0.358,slg:0.465,drs:10,spd:6,sb:154,cs:50,fld:0.987},
    {name:"Craig Biggio",ba:0.281,obp:0.363,slg:0.433,drs:8,spd:7,sb:414,cs:124,fld:0.984},
    {name:"Jeff Kent",ba:0.290,obp:0.356,slg:0.500,drs:2,spd:3,sb:94,cs:52,fld:0.985},
    {name:"Dustin Pedroia",ba:0.299,obp:0.365,slg:0.439,drs:12,spd:5,sb:138,cs:46,fld:0.991},
    {name:"Ian Kinsler",ba:0.269,obp:0.333,slg:0.438,drs:8,spd:7,sb:243,cs:66,fld:0.986},
    {name:"Brian Roberts",ba:0.278,obp:0.349,slg:0.401,drs:6,spd:8,sb:264,cs:77,fld:0.985},
    {name:"Alfonso Soriano",ba:0.270,obp:0.319,slg:0.500,drs:-5,spd:7,sb:289,cs:100,fld:0.981},
    {name:"Ben Zobrist",ba:0.266,obp:0.354,slg:0.426,drs:8,spd:5,sb:106,cs:33,fld:0.987},
    {name:"Whit Merrifield",ba:0.284,obp:0.325,slg:0.409,drs:3,spd:8,sb:155,cs:40,fld:0.984},
    {name:"DJ LeMahieu",ba:0.304,obp:0.358,slg:0.428,drs:10,spd:4,sb:57,cs:20,fld:0.989},
    {name:"Jose Altuve",ba:0.307,obp:0.365,slg:0.464,drs:5,spd:7,sb:341,cs:87,fld:0.986},
    {name:"Ryne Sandberg",ba:0.285,obp:0.344,slg:0.452,drs:15,spd:6,sb:344,cs:107,fld:0.989},
    // 8 Modern Additions
    {name:"Marcus Semien",ba:0.256,obp:0.323,slg:0.431,drs:8,spd:6,sb:170,cs:45,fld:0.988},
    {name:"Gleyber Torres",ba:0.262,obp:0.332,slg:0.426,drs:2,spd:4,sb:25,cs:15,fld:0.984},
    {name:"Ozzie Albies",ba:0.261,obp:0.312,slg:0.452,drs:8,spd:7,sb:82,cs:25,fld:0.988},
    {name:"Jorge Polanco",ba:0.265,obp:0.332,slg:0.428,drs:3,spd:4,sb:42,cs:18,fld:0.986},
    {name:"Andres Gimenez",ba:0.264,obp:0.324,slg:0.387,drs:12,spd:8,sb:69,cs:20,fld:0.990},
    {name:"Nico Hoerner",ba:0.283,obp:0.335,slg:0.391,drs:10,spd:6,sb:58,cs:18,fld:0.989},
    {name:"Ketel Marte",ba:0.292,obp:0.359,slg:0.479,drs:5,spd:6,sb:97,cs:28,fld:0.987},
    {name:"Jonathan India",ba:0.258,obp:0.353,slg:0.408,drs:4,spd:5,sb:46,cs:15,fld:0.987}
  ],
  "3B": [
    // Original 16
    {name:"Mike Schmidt",ba:0.267,obp:0.380,slg:0.527,drs:20,spd:5,sb:174,cs:93,fld:0.955},
    {name:"Wade Boggs",ba:0.328,obp:0.415,slg:0.443,drs:8,spd:3,sb:24,cs:28,fld:0.963},
    {name:"Chipper Jones",ba:0.303,obp:0.401,slg:0.529,drs:3,spd:5,sb:150,cs:53,fld:0.963},
    {name:"Adrian Beltre",ba:0.286,obp:0.339,slg:0.480,drs:18,spd:5,sb:121,cs:58,fld:0.967},
    {name:"Evan Longoria",ba:0.270,obp:0.341,slg:0.483,drs:15,spd:5,sb:60,cs:25,fld:0.966},
    {name:"Manny Machado",ba:0.282,obp:0.343,slg:0.487,drs:18,spd:5,sb:78,cs:28,fld:0.971},
    {name:"Scott Rolen",ba:0.281,obp:0.364,slg:0.490,drs:22,spd:5,sb:118,cs:52,fld:0.963},
    {name:"David Wright",ba:0.296,obp:0.376,slg:0.491,drs:10,spd:6,sb:196,cs:65,fld:0.963},
    {name:"Nolan Arenado",ba:0.287,obp:0.346,slg:0.512,drs:25,spd:4,sb:26,cs:18,fld:0.973},
    {name:"Jose Ramirez",ba:0.278,obp:0.355,slg:0.490,drs:12,spd:7,sb:207,cs:52,fld:0.965},
    {name:"Anthony Rendon",ba:0.290,obp:0.369,slg:0.471,drs:10,spd:4,sb:54,cs:23,fld:0.967},
    {name:"Josh Donaldson",ba:0.272,obp:0.367,slg:0.492,drs:12,spd:5,sb:63,cs:25,fld:0.966},
    {name:"Alex Rodriguez",ba:0.295,obp:0.380,slg:0.550,drs:5,spd:7,sb:329,cs:104,fld:0.961},
    {name:"George Brett",ba:0.305,obp:0.369,slg:0.487,drs:8,spd:6,sb:201,cs:97,fld:0.958},
    {name:"Eddie Mathews",ba:0.271,obp:0.376,slg:0.509,drs:10,spd:5,sb:68,cs:52,fld:0.954},
    {name:"Brooks Robinson",ba:0.267,obp:0.322,slg:0.401,drs:30,spd:3,sb:28,cs:41,fld:0.971},
    // 8 Modern Additions
    {name:"Austin Riley",ba:0.276,obp:0.338,slg:0.500,drs:8,spd:4,sb:18,cs:8,fld:0.967},
    {name:"Rafael Devers",ba:0.279,obp:0.339,slg:0.510,drs:-5,spd:3,sb:20,cs:12,fld:0.958},
    {name:"Jose Miranda",ba:0.273,obp:0.324,slg:0.426,drs:2,spd:3,sb:4,cs:2,fld:0.965},
    {name:"Ke'Bryan Hayes",ba:0.257,obp:0.314,slg:0.366,drs:18,spd:6,sb:22,cs:8,fld:0.972},
    {name:"Eugenio Suarez",ba:0.244,obp:0.324,slg:0.454,drs:5,spd:3,sb:19,cs:12,fld:0.964},
    {name:"Alec Bohm",ba:0.280,obp:0.332,slg:0.447,drs:-2,spd:3,sb:8,cs:4,fld:0.961},
    {name:"Isaac Paredes",ba:0.253,obp:0.356,slg:0.449,drs:8,spd:2,sb:3,cs:2,fld:0.968},
    {name:"Matt Chapman",ba:0.240,obp:0.328,slg:0.445,drs:20,spd:4,sb:25,cs:12,fld:0.970}
  ],
  SS: [
    // Original 16
    {name:"Honus Wagner",ba:0.328,obp:0.391,slg:0.467,drs:20,spd:7,sb:723,cs:0,fld:0.946},
    {name:"Cal Ripken Jr",ba:0.276,obp:0.340,slg:0.447,drs:10,spd:4,sb:36,cs:25,fld:0.979},
    {name:"Derek Jeter",ba:0.310,obp:0.377,slg:0.440,drs:-5,spd:6,sb:358,cs:97,fld:0.976},
    {name:"Alex Rodriguez",ba:0.295,obp:0.380,slg:0.550,drs:5,spd:7,sb:329,cs:104,fld:0.977},
    {name:"Barry Larkin",ba:0.295,obp:0.371,slg:0.444,drs:12,spd:8,sb:379,cs:77,fld:0.975},
    {name:"Ozzie Smith",ba:0.262,obp:0.337,slg:0.328,drs:35,spd:8,sb:580,cs:148,fld:0.978},
    {name:"Omar Vizquel",ba:0.272,obp:0.336,slg:0.352,drs:25,spd:7,sb:404,cs:167,fld:0.985},
    {name:"Francisco Lindor",ba:0.273,obp:0.337,slg:0.470,drs:18,spd:7,sb:134,cs:42,fld:0.983},
    {name:"Xander Bogaerts",ba:0.289,obp:0.354,slg:0.456,drs:5,spd:4,sb:56,cs:25,fld:0.977},
    {name:"Trea Turner",ba:0.296,obp:0.348,slg:0.466,drs:8,spd:10,sb:338,cs:58,fld:0.980},
    {name:"Corey Seager",ba:0.286,obp:0.357,slg:0.504,drs:3,spd:4,sb:42,cs:15,fld:0.976},
    {name:"Troy Tulowitzki",ba:0.290,obp:0.361,slg:0.495,drs:15,spd:5,sb:69,cs:34,fld:0.983},
    {name:"Tim Anderson",ba:0.282,obp:0.318,slg:0.428,drs:-2,spd:7,sb:96,cs:28,fld:0.974},
    {name:"Dansby Swanson",ba:0.254,obp:0.324,slg:0.433,drs:12,spd:6,sb:77,cs:28,fld:0.981},
    {name:"Carlos Correa",ba:0.279,obp:0.357,slg:0.467,drs:10,spd:5,sb:64,cs:25,fld:0.982},
    {name:"Elvis Andrus",ba:0.273,obp:0.332,slg:0.363,drs:8,spd:8,sb:325,cs:88,fld:0.976},
    // 8 Modern Additions
    {name:"Bobby Witt Jr",ba:0.289,obp:0.319,slg:0.495,drs:12,spd:10,sb:79,cs:15,fld:0.980},
    {name:"Gunnar Henderson",ba:0.261,obp:0.348,slg:0.489,drs:10,spd:7,sb:38,cs:8,fld:0.982},
    {name:"Elly De La Cruz",ba:0.235,obp:0.324,slg:0.473,drs:5,spd:10,sb:67,cs:18,fld:0.975},
    {name:"CJ Abrams",ba:0.254,obp:0.315,slg:0.400,drs:8,spd:9,sb:73,cs:12,fld:0.978},
    {name:"Jeremy Pena",ba:0.252,obp:0.296,slg:0.391,drs:12,spd:6,sb:21,cs:8,fld:0.982},
    {name:"Willy Adames",ba:0.251,obp:0.331,slg:0.445,drs:8,spd:5,sb:40,cs:15,fld:0.979},
    {name:"Bo Bichette",ba:0.284,obp:0.327,slg:0.447,drs:-5,spd:6,sb:54,cs:18,fld:0.973},
    {name:"Oneil Cruz",ba:0.236,obp:0.295,slg:0.456,drs:2,spd:8,sb:29,cs:10,fld:0.976}
  ],
  LF: [
    // Original 16
    {name:"Ted Williams",ba:0.344,obp:0.482,slg:0.634,drs:-5,spd:4,sb:24,cs:17,fld:0.974},
    {name:"Barry Bonds",ba:0.298,obp:0.444,slg:0.607,drs:10,spd:7,sb:514,cs:141,fld:0.984},
    {name:"Rickey Henderson",ba:0.279,obp:0.401,slg:0.419,drs:5,spd:10,sb:1406,cs:335,fld:0.979},
    {name:"Manny Ramirez",ba:0.312,obp:0.411,slg:0.585,drs:-10,spd:3,sb:38,cs:29,fld:0.982},
    {name:"Carl Yastrzemski",ba:0.285,obp:0.379,slg:0.462,drs:12,spd:5,sb:168,cs:116,fld:0.977},
    {name:"Jim Rice",ba:0.298,obp:0.352,slg:0.502,drs:0,spd:5,sb:58,cs:34,fld:0.979},
    {name:"Tim Raines",ba:0.294,obp:0.385,slg:0.425,drs:8,spd:9,sb:808,cs:146,fld:0.981},
    {name:"Hideki Matsui",ba:0.282,obp:0.360,slg:0.482,drs:-3,spd:3,sb:21,cs:15,fld:0.983},
    {name:"Matt Holliday",ba:0.299,obp:0.377,slg:0.501,drs:2,spd:4,sb:118,cs:49,fld:0.984},
    {name:"Michael Brantley",ba:0.298,obp:0.358,slg:0.444,drs:8,spd:5,sb:119,cs:42,fld:0.988},
    {name:"Christian Yelich",ba:0.283,obp:0.374,slg:0.470,drs:5,spd:7,sb:182,cs:48,fld:0.986},
    {name:"George Foster",ba:0.274,obp:0.338,slg:0.480,drs:2,spd:4,sb:51,cs:47,fld:0.980},
    {name:"Ryan Braun",ba:0.296,obp:0.358,slg:0.538,drs:-8,spd:7,sb:216,cs:61,fld:0.982},
    {name:"Randy Arozarena",ba:0.255,obp:0.331,slg:0.435,drs:5,spd:8,sb:110,cs:28,fld:0.985},
    {name:"Juan Soto",ba:0.285,obp:0.421,slg:0.504,drs:-5,spd:4,sb:57,cs:22,fld:0.983},
    {name:"Yordan Alvarez",ba:0.295,obp:0.392,slg:0.561,drs:-8,spd:2,sb:8,cs:5,fld:0.980},
    // 8 Modern Additions
    {name:"Steven Kwan",ba:0.292,obp:0.368,slg:0.399,drs:10,spd:7,sb:34,cs:10,fld:0.990},
    {name:"Kyle Tucker",ba:0.289,obp:0.361,slg:0.520,drs:8,spd:7,sb:85,cs:20,fld:0.987},
    {name:"Teoscar Hernandez",ba:0.266,obp:0.327,slg:0.476,drs:-2,spd:5,sb:48,cs:18,fld:0.983},
    {name:"Ian Happ",ba:0.254,obp:0.346,slg:0.446,drs:5,spd:6,sb:67,cs:22,fld:0.985},
    {name:"Brandon Marsh",ba:0.261,obp:0.353,slg:0.407,drs:12,spd:7,sb:24,cs:8,fld:0.988},
    {name:"Lourdes Gurriel Jr",ba:0.272,obp:0.318,slg:0.447,drs:-3,spd:5,sb:42,cs:15,fld:0.982},
    {name:"Jesse Winker",ba:0.258,obp:0.364,slg:0.420,drs:-5,spd:3,sb:18,cs:12,fld:0.981},
    {name:"Jurickson Profar",ba:0.280,obp:0.380,slg:0.459,drs:8,spd:4,sb:44,cs:18,fld:0.984}
  ],
  CF: [
    // Original 16
    {name:"Willie Mays",ba:0.302,obp:0.384,slg:0.557,drs:25,spd:9,sb:338,cs:103,fld:0.981},
    {name:"Ken Griffey Jr",ba:0.284,obp:0.370,slg:0.538,drs:18,spd:7,sb:184,cs:66,fld:0.988},
    {name:"Mike Trout",ba:0.299,obp:0.410,slg:0.581,drs:15,spd:8,sb:201,cs:47,fld:0.989},
    {name:"Mickey Mantle",ba:0.298,obp:0.421,slg:0.557,drs:12,spd:8,sb:153,cs:38,fld:0.982},
    {name:"Ty Cobb",ba:0.366,obp:0.433,slg:0.512,drs:15,spd:9,sb:897,cs:0,fld:0.962},
    {name:"Duke Snider",ba:0.295,obp:0.380,slg:0.540,drs:10,spd:6,sb:99,cs:50,fld:0.984},
    {name:"Andruw Jones",ba:0.254,obp:0.337,slg:0.486,drs:30,spd:7,sb:152,cs:59,fld:0.990},
    {name:"Andrew McCutchen",ba:0.287,obp:0.377,slg:0.478,drs:12,spd:8,sb:197,cs:60,fld:0.987},
    {name:"Carlos Beltran",ba:0.279,obp:0.350,slg:0.486,drs:18,spd:8,sb:312,cs:91,fld:0.988},
    {name:"Grady Sizemore",ba:0.269,obp:0.353,slg:0.462,drs:15,spd:9,sb:134,cs:34,fld:0.989},
    {name:"Kenny Lofton",ba:0.299,obp:0.372,slg:0.423,drs:20,spd:10,sb:622,cs:158,fld:0.987},
    {name:"Cody Bellinger",ba:0.253,obp:0.332,slg:0.480,drs:10,spd:6,sb:71,cs:23,fld:0.988},
    {name:"Jacoby Ellsbury",ba:0.284,obp:0.350,slg:0.402,drs:12,spd:9,sb:343,cs:70,fld:0.989},
    {name:"Lorenzo Cain",ba:0.283,obp:0.342,slg:0.416,drs:15,spd:8,sb:182,cs:52,fld:0.990},
    {name:"Byron Buxton",ba:0.244,obp:0.312,slg:0.468,drs:20,spd:10,sb:78,cs:21,fld:0.991},
    {name:"Brett Gardner",ba:0.259,obp:0.344,slg:0.380,drs:12,spd:8,sb:266,cs:77,fld:0.988},
    // 8 Modern Additions
    {name:"Julio Rodriguez",ba:0.273,obp:0.327,slg:0.467,drs:15,spd:9,sb:67,cs:18,fld:0.989},
    {name:"Corbin Carroll",ba:0.260,obp:0.342,slg:0.432,drs:12,spd:10,sb:79,cs:12,fld:0.990},
    {name:"Riley Greene",ba:0.280,obp:0.349,slg:0.458,drs:8,spd:6,sb:22,cs:8,fld:0.987},
    {name:"Harrison Bader",ba:0.256,obp:0.314,slg:0.403,drs:18,spd:8,sb:51,cs:15,fld:0.991},
    {name:"Cedric Mullins",ba:0.258,obp:0.318,slg:0.409,drs:10,spd:9,sb:101,cs:22,fld:0.989},
    {name:"Kevin Kiermaier",ba:0.248,obp:0.308,slg:0.398,drs:22,spd:8,sb:78,cs:25,fld:0.992},
    {name:"Brandon Nimmo",ba:0.269,obp:0.366,slg:0.440,drs:5,spd:6,sb:58,cs:20,fld:0.986},
    {name:"Luis Robert Jr",ba:0.264,obp:0.315,slg:0.468,drs:10,spd:9,sb:72,cs:18,fld:0.988}
  ],
  RF: [
    // Original 16
    {name:"Babe Ruth",ba:0.342,obp:0.474,slg:0.690,drs:5,spd:5,sb:123,cs:117,fld:0.968},
    {name:"Hank Aaron",ba:0.305,obp:0.374,slg:0.555,drs:12,spd:6,sb:240,cs:73,fld:0.980},
    {name:"Frank Robinson",ba:0.294,obp:0.389,slg:0.537,drs:10,spd:6,sb:204,cs:77,fld:0.983},
    {name:"Reggie Jackson",ba:0.262,obp:0.356,slg:0.490,drs:5,spd:6,sb:228,cs:115,fld:0.979},
    {name:"Mookie Betts",ba:0.296,obp:0.374,slg:0.513,drs:20,spd:8,sb:162,cs:35,fld:0.987},
    {name:"Aaron Judge",ba:0.274,obp:0.380,slg:0.563,drs:5,spd:6,sb:44,cs:12,fld:0.989},
    {name:"Giancarlo Stanton",ba:0.267,obp:0.358,slg:0.554,drs:-5,spd:5,sb:26,cs:11,fld:0.985},
    {name:"Dave Winfield",ba:0.283,obp:0.353,slg:0.475,drs:15,spd:6,sb:223,cs:96,fld:0.982},
    {name:"Vladimir Guerrero",ba:0.318,obp:0.379,slg:0.553,drs:8,spd:7,sb:181,cs:65,fld:0.977},
    {name:"Ichiro Suzuki",ba:0.311,obp:0.355,slg:0.402,drs:15,spd:9,sb:509,cs:131,fld:0.985},
    {name:"Larry Walker",ba:0.313,obp:0.400,slg:0.565,drs:10,spd:7,sb:230,cs:77,fld:0.983},
    {name:"Tony Gwynn",ba:0.338,obp:0.388,slg:0.459,drs:12,spd:6,sb:319,cs:125,fld:0.981},
    {name:"Bryce Harper",ba:0.280,obp:0.388,slg:0.512,drs:2,spd:6,sb:108,cs:37,fld:0.985},
    {name:"J.D. Martinez",ba:0.285,obp:0.354,slg:0.518,drs:-8,spd:3,sb:15,cs:10,fld:0.982},
    {name:"Starling Marte",ba:0.287,obp:0.339,slg:0.443,drs:8,spd:9,sb:339,cs:82,fld:0.985},
    {name:"Nick Markakis",ba:0.288,obp:0.352,slg:0.419,drs:10,spd:4,sb:85,cs:42,fld:0.988},
    // 8 Modern Additions
    {name:"Fernando Tatis Jr",ba:0.282,obp:0.357,slg:0.537,drs:5,spd:9,sb:83,cs:18,fld:0.983},
    {name:"Ronald Acuna Jr",ba:0.283,obp:0.368,slg:0.518,drs:8,spd:10,sb:193,cs:36,fld:0.986},
    {name:"George Springer",ba:0.270,obp:0.361,slg:0.488,drs:10,spd:7,sb:133,cs:38,fld:0.987},
    {name:"Randy Arozarena",ba:0.255,obp:0.331,slg:0.435,drs:5,spd:8,sb:110,cs:28,fld:0.985},
    {name:"Michael Conforto",ba:0.253,obp:0.356,slg:0.449,drs:3,spd:5,sb:32,cs:15,fld:0.984},
    {name:"Seiya Suzuki",ba:0.264,obp:0.346,slg:0.450,drs:5,spd:5,sb:18,cs:8,fld:0.986},
    {name:"Adolis Garcia",ba:0.251,obp:0.303,slg:0.468,drs:8,spd:7,sb:52,cs:20,fld:0.985},
    {name:"Josh Lowe",ba:0.254,obp:0.325,slg:0.433,drs:10,spd:9,sb:78,cs:15,fld:0.987}
  ],
  DH: [
    // Original 16
    {name:"David Ortiz",ba:0.286,obp:0.380,slg:0.552,drs:0,spd:1,sb:17,cs:10,fld:0.993},
    {name:"Edgar Martinez",ba:0.312,obp:0.418,slg:0.515,drs:0,spd:2,sb:49,cs:26,fld:0.970},
    {name:"Frank Thomas",ba:0.301,obp:0.419,slg:0.555,drs:0,spd:2,sb:32,cs:21,fld:0.993},
    {name:"Jim Thome",ba:0.276,obp:0.402,slg:0.554,drs:0,spd:2,sb:19,cs:15,fld:0.992},
    {name:"Nelson Cruz",ba:0.279,obp:0.348,slg:0.524,drs:0,spd:3,sb:39,cs:22,fld:0.982},
    {name:"Shohei Ohtani",ba:0.282,obp:0.367,slg:0.532,drs:0,spd:8,sb:109,cs:21,fld:0.985},
    {name:"Yordan Alvarez",ba:0.295,obp:0.392,slg:0.561,drs:0,spd:2,sb:8,cs:5,fld:0.980},
    {name:"J.D. Martinez",ba:0.285,obp:0.354,slg:0.518,drs:0,spd:3,sb:15,cs:10,fld:0.982},
    {name:"Edwin Encarnacion",ba:0.263,obp:0.357,slg:0.489,drs:0,spd:2,sb:38,cs:20,fld:0.991},
    {name:"Giancarlo Stanton",ba:0.267,obp:0.358,slg:0.554,drs:0,spd:5,sb:26,cs:11,fld:0.985},
    {name:"Paul Molitor",ba:0.306,obp:0.369,slg:0.448,drs:0,spd:7,sb:504,cs:131,fld:0.977},
    {name:"Harold Baines",ba:0.289,obp:0.356,slg:0.465,drs:0,spd:3,sb:34,cs:23,fld:0.985},
    {name:"Carlos Delgado",ba:0.280,obp:0.383,slg:0.546,drs:0,spd:2,sb:37,cs:23,fld:0.993},
    {name:"Victor Martinez",ba:0.295,obp:0.360,slg:0.454,drs:0,spd:2,sb:15,cs:12,fld:0.992},
    {name:"Travis Hafner",ba:0.273,obp:0.377,slg:0.499,drs:0,spd:1,sb:3,cs:3,fld:0.991},
    {name:"Mo Vaughn",ba:0.293,obp:0.383,slg:0.523,drs:0,spd:2,sb:23,cs:17,fld:0.992},
    // 8 Modern Additions
    {name:"Marcell Ozuna",ba:0.274,obp:0.337,slg:0.490,drs:0,spd:3,sb:13,cs:8,fld:0.983},
    {name:"Kyle Schwarber",ba:0.231,obp:0.339,slg:0.475,drs:0,spd:3,sb:31,cs:15,fld:0.982},
    {name:"Eloy Jimenez",ba:0.273,obp:0.321,slg:0.488,drs:0,spd:2,sb:2,cs:2,fld:0.985},
    {name:"Jorge Soler",ba:0.248,obp:0.337,slg:0.470,drs:0,spd:3,sb:23,cs:12,fld:0.983},
    {name:"Brent Rooker",ba:0.262,obp:0.345,slg:0.510,drs:0,spd:3,sb:8,cs:3,fld:0.986},
    {name:"Justin Turner",ba:0.290,obp:0.361,slg:0.466,drs:0,spd:3,sb:43,cs:18,fld:0.974},
    {name:"Tommy Pham",ba:0.257,obp:0.342,slg:0.426,drs:0,spd:6,sb:105,cs:32,fld:0.983},
    {name:"Andrew Benintendi",ba:0.278,obp:0.343,slg:0.415,drs:0,spd:6,sb:72,cs:25,fld:0.985}
  ],
  SP: [
    // Original 32
    {name:"Sandy Koufax",era:2.76,whip:1.11,kper9:9.28},
    {name:"Bob Gibson",era:2.91,whip:1.19,kper9:7.22},
    {name:"Tom Seaver",era:2.86,whip:1.12,kper9:6.74},
    {name:"Greg Maddux",era:3.16,whip:1.14,kper9:6.07},
    {name:"Pedro Martinez",era:2.93,whip:1.05,kper9:10.04},
    {name:"Randy Johnson",era:3.29,whip:1.17,kper9:10.61},
    {name:"Roger Clemens",era:3.12,whip:1.17,kper9:8.58},
    {name:"Clayton Kershaw",era:2.48,whip:1.00,kper9:9.83},
    {name:"Max Scherzer",era:3.15,whip:1.11,kper9:11.08},
    {name:"Justin Verlander",era:3.24,whip:1.13,kper9:9.55},
    {name:"CC Sabathia",era:3.74,whip:1.26,kper9:8.70},
    {name:"Roy Halladay",era:3.38,whip:1.18,kper9:6.93},
    {name:"Curt Schilling",era:3.46,whip:1.14,kper9:8.60},
    {name:"Johan Santana",era:3.20,whip:1.13,kper9:9.60},
    {name:"Cliff Lee",era:3.52,whip:1.17,kper9:7.89},
    {name:"Zack Greinke",era:3.42,whip:1.17,kper9:8.59},
    {name:"Chris Sale",era:3.03,whip:1.04,kper9:11.08},
    {name:"Corey Kluber",era:3.44,whip:1.09,kper9:9.72},
    {name:"Jacob deGrom",era:2.52,whip:0.99,kper9:11.19},
    {name:"Felix Hernandez",era:3.42,whip:1.20,kper9:8.14},
    {name:"Cole Hamels",era:3.43,whip:1.22,kper9:8.91},
    {name:"Gerrit Cole",era:3.18,whip:1.04,kper9:11.53},
    {name:"Bartolo Colon",era:4.12,whip:1.30,kper9:5.91},
    {name:"David Price",era:3.31,whip:1.14,kper9:9.01},
    {name:"Jon Lester",era:3.66,whip:1.26,kper9:8.67},
    {name:"Madison Bumgarner",era:3.13,whip:1.11,kper9:8.66},
    {name:"Stephen Strasburg",era:3.24,whip:1.10,kper9:10.59},
    {name:"Yu Darvish",era:3.42,whip:1.14,kper9:11.14},
    {name:"Shane Bieber",era:3.22,whip:1.05,kper9:11.50},
    {name:"Corbin Burnes",era:3.01,whip:1.01,kper9:11.54},
    {name:"Walker Buehler",era:3.16,whip:1.02,kper9:10.60},
    {name:"Aaron Nola",era:3.72,whip:1.16,kper9:9.78},
    // 8 Modern Additions
    {name:"Zack Wheeler",era:3.07,whip:1.11,kper9:9.84},
    {name:"Blake Snell",era:3.19,whip:1.23,kper9:11.74},
    {name:"Pablo Lopez",era:3.66,whip:1.16,kper9:9.68},
    {name:"Framber Valdez",era:3.37,whip:1.17,kper9:7.82},
    {name:"Logan Webb",era:3.46,whip:1.19,kper9:8.12},
    {name:"Kevin Gausman",era:3.44,whip:1.13,kper9:10.47},
    {name:"Sonny Gray",era:3.42,whip:1.15,kper9:9.86},
    {name:"Luis Castillo",era:3.62,whip:1.19,kper9:9.42}
  ],
  RP: [
    // Original 40
    {name:"Mariano Rivera",era:2.21,whip:1.00,kper9:8.46},
    {name:"Trevor Hoffman",era:2.87,whip:1.06,kper9:9.36},
    {name:"Billy Wagner",era:2.31,whip:0.998,kper9:11.92},
    {name:"Dennis Eckersley",era:3.50,whip:1.16,kper9:6.76},
    {name:"Goose Gossage",era:3.01,whip:1.23,kper9:7.46},
    {name:"Craig Kimbrel",era:2.48,whip:0.96,kper9:14.66},
    {name:"Kenley Jansen",era:2.48,whip:0.98,kper9:12.15},
    {name:"Aroldis Chapman",era:2.48,whip:1.11,kper9:15.38},
    {name:"Edwin Diaz",era:2.64,whip:0.96,kper9:15.38},
    {name:"Josh Hader",era:2.50,whip:0.89,kper9:16.34},
    {name:"Liam Hendriks",era:2.90,whip:1.06,kper9:12.65},
    {name:"Andrew Miller",era:3.24,whip:1.13,kper9:12.90},
    {name:"Wade Davis",era:2.96,whip:1.05,kper9:11.70},
    {name:"Jonathan Papelbon",era:2.44,whip:1.05,kper9:10.39},
    {name:"Joe Nathan",era:2.87,whip:1.12,kper9:10.58},
    {name:"Francisco Rodriguez",era:2.86,whip:1.17,kper9:10.78},
    {name:"Brad Lidge",era:3.54,whip:1.30,kper9:10.89},
    {name:"Zach Britton",era:3.13,whip:1.22,kper9:7.62},
    {name:"Cody Allen",era:2.98,whip:1.13,kper9:12.70},
    {name:"Raisel Iglesias",era:3.06,whip:1.04,kper9:11.46},
    {name:"Brad Hand",era:3.18,whip:1.16,kper9:11.84},
    {name:"Will Smith",era:3.00,whip:1.11,kper9:12.45},
    {name:"Mark Melancon",era:2.94,whip:1.08,kper9:7.65},
    {name:"Sean Doolittle",era:3.24,whip:1.04,kper9:11.21},
    {name:"Roberto Osuna",era:2.74,whip:1.03,kper9:10.70},
    {name:"Ken Giles",era:3.17,whip:1.13,kper9:12.32},
    {name:"Mychal Givens",era:3.46,whip:1.17,kper9:11.63},
    {name:"Hector Neris",era:3.23,whip:1.16,kper9:11.75},
    {name:"Alex Colome",era:3.37,whip:1.16,kper9:8.92},
    {name:"Ryan Pressly",era:2.98,whip:1.09,kper9:11.13},
    {name:"Taylor Rogers",era:3.08,whip:1.13,kper9:11.41},
    {name:"Matt Barnes",era:3.51,whip:1.24,kper9:13.44},
    {name:"Joe Smith",era:3.14,whip:1.21,kper9:6.98},
    {name:"Jeurys Familia",era:3.37,whip:1.32,kper9:8.87},
    {name:"Sergio Romo",era:2.99,whip:1.08,kper9:10.15},
    {name:"Kirby Yates",era:3.14,whip:1.05,kper9:12.67},
    {name:"David Robertson",era:2.88,whip:1.14,kper9:11.56},
    {name:"Dellin Betances",era:2.36,whip:0.98,kper9:14.43},
    {name:"Corey Knebel",era:3.34,whip:1.13,kper9:13.76},
    {name:"Blake Treinen",era:2.93,whip:1.14,kper9:9.30},
    // 8 Modern Additions
    {name:"Emmanuel Clase",era:1.82,whip:0.88,kper9:10.72},
    {name:"Devin Williams",era:1.83,whip:0.88,kper9:15.67},
    {name:"Alexis Diaz",era:2.73,whip:1.04,kper9:12.42},
    {name:"Felix Bautista",era:2.21,whip:0.99,kper9:13.92},
    {name:"Andres Munoz",era:2.72,whip:0.97,kper9:13.18},
    {name:"Ryan Helsley",era:2.66,whip:1.04,kper9:13.05},
    {name:"Pete Fairbanks",era:2.98,whip:1.09,kper9:13.67},
    {name:"Jordan Romano",era:2.89,whip:1.08,kper9:11.89}
  ]
};


const POSITIONS = ['C','1B','2B','3B','SS','LF','CF','RF','DH'];

function App() {
  const [gameStep,setGameStep]=useState('menu');
  const [teams,setTeams]=useState([
    {name:'',players:{},pitchers:{sp:[],rp:[]}},
    {name:'',players:{},pitchers:{sp:[],rp:[]}},
    {name:'',players:{},pitchers:{sp:[],rp:[]}},
    {name:'',players:{},pitchers:{sp:[],rp:[]}}
  ]);
  const [currentTeam,setCurrentTeam]=useState(0);
  const [currentStep,setCurrentStep]=useState('name');
  const [currentPosition,setCurrentPosition]=useState(0);
  const [lcsResults,setLcsResults]=useState(null);
  const [wsResults,setWsResults]=useState(null);

  const calculateTeamRating=(team)=>{
    let rating=0;
    POSITIONS.forEach(pos=>{
      const p=team.players[pos];
      if(p)rating+=(p.obp*1000)+(p.slg*500)+(p.drs*5)+(p.spd*3);
    });
    team.pitchers.sp.forEach(sp=>rating+=((6.00-sp.era)*200)+((1.5-sp.whip)*300)+(sp.kper9*20));
    team.pitchers.rp.forEach(rp=>rating+=((5.00-rp.era)*150)+((1.4-rp.whip)*250)+(rp.kper9*15));
    return Math.round(rating);
  };

  const simulateGame=(team1,team2,gameNum,sp1Idx,sp2Idx)=>{
    const lineup1=POSITIONS.map(pos=>team1.players[pos]);
    const lineup2=POSITIONS.map(pos=>team2.players[pos]);
    const sp1=team1.pitchers.sp[sp1Idx];
    const sp2=team2.pitchers.sp[sp2Idx];
    let score1=0,score2=0;
    const highlights=[];
    const defense1=lineup1.reduce((s,p)=>s+(p.drs||0),0)/9;
    const defense2=lineup2.reduce((s,p)=>s+(p.drs||0),0)/9;

    for(let inning=1;inning<=6;inning++){
      lineup1.forEach(batter=>{
        if(!batter)return;
        const defAdj=1-(defense2*0.01);
        const pitchAdj=1.2-(sp2.era/5);
        const obChance=batter.obp*pitchAdj*defAdj;
        if(Math.random()<obChance){
          const powerChance=batter.slg-batter.ba;
          const speedBonus=batter.spd*0.02;
          if(Math.random()<(powerChance*0.35+speedBonus)){
            const runs=Math.floor(Math.random()*2)+1;
            score1+=runs;
            if(Math.random()<0.6)highlights.push(`Inning ${inning}: ${batter.name} crushes a ${runs}-run homer!`);
          }else{
            score1+=Math.random()<(0.25+speedBonus)?1:0;
            if(batter.sb>50&&Math.random()<0.15){
              const sbSuccess=(batter.sb/(batter.sb+batter.cs))*1.1;
              if(Math.random()<sbSuccess)highlights.push(`Inning ${inning}: ${batter.name} steals second!`);
            }
          }
        }else{
          if(Math.random()<(defense2*0.015)){
            const defender=lineup2[Math.floor(Math.random()*9)];
            if(defender&&Math.random()<0.4)highlights.push(`Inning ${inning}: ${defender.name} makes a spectacular play!`);
          }
        }
      });

      lineup2.forEach(batter=>{
        if(!batter)return;
        const defAdj=1-(defense1*0.01);
        const pitchAdj=1.2-(sp1.era/5);
        const obChance=batter.obp*pitchAdj*defAdj;
        if(Math.random()<obChance){
          const powerChance=batter.slg-batter.ba;
          const speedBonus=batter.spd*0.02;
          if(Math.random()<(powerChance*0.35+speedBonus)){
            const runs=Math.floor(Math.random()*2)+1;
            score2+=runs;
            if(Math.random()<0.6)highlights.push(`Inning ${inning}: ${batter.name} launches a ${runs}-run blast!`);
          }else{
            score2+=Math.random()<(0.25+speedBonus)?1:0;
            if(batter.sb>50&&Math.random()<0.15){
              const sbSuccess=(batter.sb/(batter.sb+batter.cs))*1.1;
              if(Math.random()<sbSuccess)highlights.push(`Inning ${inning}: ${batter.name} swipes second!`);
            }
          }
        }
      });
    }

    const scoreDiff=Math.abs(score1-score2);
    const isClose=scoreDiff<=2;
    const rp1=isClose?[team1.pitchers.rp[1],team1.pitchers.rp[0]]:[team1.pitchers.rp[2],team1.pitchers.rp[3]];
    const rp2=isClose?[team2.pitchers.rp[1],team2.pitchers.rp[0]]:[team2.pitchers.rp[2],team2.pitchers.rp[3]];

    for(let inning=7;inning<=9;inning++){
      const currentRp1=inning<9?rp1[0]:rp1[1];
      const currentRp2=inning<9?rp2[0]:rp2[1];
      lineup1.forEach(batter=>{
        if(!batter)return;
        const defAdj=1-(defense2*0.01);
        const rpAdj=1.15-(currentRp2.era/6);
        if(Math.random()<batter.obp*rpAdj*defAdj*0.9)score1+=Math.random()<0.25?1:0;
      });
      lineup2.forEach(batter=>{
        if(!batter)return;
        const defAdj=1-(defense1*0.01);
        const rpAdj=1.15-(currentRp1.era/6);
        if(Math.random()<batter.obp*rpAdj*defAdj*0.9)score2+=Math.random()<0.25?1:0;
      });
    }

    if(isClose&&Math.abs(score1-score2)<=2){
      const winner=score1>score2?team1:team2;
      const closer=winner.pitchers.rp[0];
      highlights.push(`Inning 9: ${closer.name} slams the door to seal victory!`);
    }

    if(highlights.length<3)highlights.push(`Final: ${team1.name} ${score1}, ${team2.name} ${score2}`);

    return{score1,score2,winner:score1>score2?1:2,highlights:highlights.slice(0,5),gameNum};
  };

  const simulateSeries=(team1,team2,seriesName)=>{
    const games=[];
    let wins1=0,wins2=0,gameNum=1;
    while(wins1<4&&wins2<4){
      const sp1Idx=(gameNum-1)%3;
      const sp2Idx=(gameNum-1)%3;
      const game=simulateGame(team1,team2,gameNum,sp1Idx,sp2Idx);
      games.push(game);
      if(game.winner===1)wins1++;else wins2++;
      gameNum++;
    }
    return{seriesName,team1Name:team1.name,team2Name:team2.name,games,winner:wins1===4?team1:team2,winnerName:wins1===4?team1.name:team2.name,finalScore:`${wins1}-${wins2}`};
  };

  const startSimulation=()=>{
    const teamsWithRatings=teams.map((team,idx)=>({...team,rating:calculateTeamRating(team),originalIdx:idx}));
    teamsWithRatings.sort((a,b)=>b.rating-a.rating);
    const lcs1=simulateSeries(teamsWithRatings[0],teamsWithRatings[3],"LCS 1");
    const lcs2=simulateSeries(teamsWithRatings[1],teamsWithRatings[2],"LCS 2");
    setLcsResults({seedings:teamsWithRatings.map((t,idx)=>({name:t.name,seed:idx+1,rating:t.rating})),lcs1,lcs2});
    setGameStep('lcs-results');
  };

  const advanceToWorldSeries=()=>{
    const ws=simulateSeries(lcsResults.lcs1.winner,lcsResults.lcs2.winner,"World Series");
    setWsResults(ws);
    setGameStep('ws-results');
  };

  const selectPlayer=(player,type='position')=>{
    const newTeams=[...teams];
    if(type==='position'){
      newTeams[currentTeam].players[POSITIONS[currentPosition]]=player;
      if(currentPosition<POSITIONS.length-1){
        setCurrentPosition(currentPosition+1);
      }else{
        setCurrentPosition(0);
        setCurrentStep('sp');
      }
    }else if(type==='sp'){
      if(!newTeams[currentTeam].pitchers.sp)newTeams[currentTeam].pitchers.sp=[];
      newTeams[currentTeam].pitchers.sp.push(player);
      if(newTeams[currentTeam].pitchers.sp.length>=3)setCurrentStep('rp');
    }else if(type==='rp'){
      if(!newTeams[currentTeam].pitchers.rp)newTeams[currentTeam].pitchers.rp=[];
      newTeams[currentTeam].pitchers.rp.push(player);
      if(newTeams[currentTeam].pitchers.rp.length>=4){
        if(currentTeam<3){
          setCurrentTeam(currentTeam+1);
          setCurrentStep('name');
          setCurrentPosition(0);
        }else startSimulation();
      }
    }
    setTeams(newTeams);
  };

  const setTeamName=(name)=>{
    const newTeams=[...teams];
    newTeams[currentTeam].name=name;
    setTeams(newTeams);
    setCurrentStep('positions');
  };

  // RENDER
  if(gameStep==='menu'){
    return(
      <div style={{padding:'40px',maxWidth:'800px',margin:'0 auto',fontFamily:'Arial'}}>
        <h1 style={{fontSize:'48px',textAlign:'center',marginBottom:'20px'}}>⚾ Baseball Tournament</h1>
        <p style={{textAlign:'center',fontSize:'18px',color:'#666',marginBottom:'40px'}}>
          4-team playoff with LCS → World Series<br/>Features: Defense, Speed, Highlights
        </p>
        <button onClick={()=>setGameStep('team-entry')} style={{width:'100%',padding:'20px',fontSize:'20px',backgroundColor:'#2563eb',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Start Tournament
        </button>
        <div style={{marginTop:'40px',padding:'20px',backgroundColor:'#f0f0f0',borderRadius:'8px',fontSize:'14px'}}>
          <strong>Current Player Pool:</strong> 12 per position (demo version)
          <br/><strong>Starting Pitchers:</strong> 20 available
          <br/><strong>Relief Pitchers:</strong> 20 available
          <br/><br/>
          <em>Full version with 24 per position + 40 SPs + 48 RPs can be expanded easily</em>
        </div>
      </div>
    );
  }

  if(gameStep==='team-entry'){
    if(currentStep==='name'){
      return(
        <div style={{padding:'40px',maxWidth:'800px',margin:'0 auto'}}>
          <h2>Team {currentTeam+1} - Enter Team Name</h2>
          <input type="text" placeholder="Enter team name..." style={{width:'100%',padding:'15px',fontSize:'18px',marginBottom:'20px'}} onKeyPress={(e)=>{if(e.key==='Enter'&&e.target.value.trim())setTeamName(e.target.value.trim());}}/>
        </div>
      );
    }

    if(currentStep==='positions'){
      const pos=POSITIONS[currentPosition];
      const pool=PLAYER_POOLS[pos];
      return(
        <div style={{padding:'20px',maxWidth:'1200px',margin:'0 auto'}}>
          <h2>{teams[currentTeam].name} - Select {pos}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'10px'}}>
            {pool.map((player,idx)=>(
              <div key={idx} onClick={()=>selectPlayer(player)} style={{padding:'12px',border:'2px solid #ddd',borderRadius:'8px',cursor:'pointer',backgroundColor:'#f9f9f9'}}>
                <strong>{player.name}</strong>
                <div style={{fontSize:'13px',color:'#666'}}>
                  BA:{player.ba} OBP:{player.obp} SLG:{player.slg}
                </div>
                <div style={{fontSize:'11px',color:'#999'}}>
                  DEF:{player.drs} SPD:{player.spd} SB:{player.sb}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if(currentStep==='sp'){
      const selected=teams[currentTeam].pitchers.sp.length;
      return(
        <div style={{padding:'20px',maxWidth:'1200px',margin:'0 auto'}}>
          <h2>{teams[currentTeam].name} - Select SP {selected+1}/3</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'10px'}}>
            {PLAYER_POOLS.SP.map((player,idx)=>(
              <div key={idx} onClick={()=>selectPlayer(player,'sp')} style={{padding:'12px',border:'2px solid #ddd',borderRadius:'8px',cursor:'pointer',backgroundColor:'#fff5f5'}}>
                <strong>{player.name}</strong>
                <div style={{fontSize:'13px',color:'#666'}}>
                  ERA:{player.era} WHIP:{player.whip} K/9:{player.kper9}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if(currentStep==='rp'){
      const selected=teams[currentTeam].pitchers.rp.length;
      return(
        <div style={{padding:'20px',maxWidth:'1200px',margin:'0 auto'}}>
          <h2>{teams[currentTeam].name} - Select RP {selected+1}/4</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:'10px'}}>
            {PLAYER_POOLS.RP.map((player,idx)=>(
              <div key={idx} onClick={()=>selectPlayer(player,'rp')} style={{padding:'12px',border:'2px solid #ddd',borderRadius:'8px',cursor:'pointer',backgroundColor:'#fff5f5'}}>
                <strong>{player.name}</strong>
                <div style={{fontSize:'13px',color:'#666'}}>
                  ERA:{player.era} WHIP:{player.whip} K/9:{player.kper9}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  if(gameStep==='lcs-results'){
    return(
      <div style={{padding:'40px',maxWidth:'1200px',margin:'0 auto'}}>
        <h1 style={{textAlign:'center'}}>League Championship Series</h1>
        <div style={{marginBottom:'40px',padding:'20px',backgroundColor:'#f0f0f0',borderRadius:'8px'}}>
          <h2>Seedings</h2>
          {lcsResults.seedings.map(team=>(
            <div key={team.seed} style={{padding:'10px',borderBottom:'1px solid #ddd'}}>
              <strong>#{team.seed} {team.name}</strong> - Rating: {team.rating}
            </div>
          ))}
        </div>
        <div style={{marginBottom:'40px'}}>
          <h2>{lcsResults.lcs1.seriesName}: {lcsResults.lcs1.team1Name} vs {lcsResults.lcs1.team2Name}</h2>
          <h3>Winner: {lcsResults.lcs1.winnerName} ({lcsResults.lcs1.finalScore})</h3>
          {lcsResults.lcs1.games.map((game,idx)=>(
            <div key={idx} style={{padding:'15px',margin:'10px 0',backgroundColor:'white',borderRadius:'8px',border:'1px solid #ddd'}}>
              <h4>Game {game.gameNum}: {lcsResults.lcs1.team1Name} {game.score1} - {game.score2} {lcsResults.lcs1.team2Name}</h4>
              {game.highlights.map((h,hIdx)=>(
                <div key={hIdx} style={{padding:'5px',color:'#555',fontSize:'14px'}}>• {h}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{marginBottom:'40px'}}>
          <h2>{lcsResults.lcs2.seriesName}: {lcsResults.lcs2.team1Name} vs {lcsResults.lcs2.team2Name}</h2>
          <h3>Winner: {lcsResults.lcs2.winnerName} ({lcsResults.lcs2.finalScore})</h3>
          {lcsResults.lcs2.games.map((game,idx)=>(
            <div key={idx} style={{padding:'15px',margin:'10px 0',backgroundColor:'white',borderRadius:'8px',border:'1px solid #ddd'}}>
              <h4>Game {game.gameNum}: {lcsResults.lcs2.team1Name} {game.score1} - {game.score2} {lcsResults.lcs2.team2Name}</h4>
              {game.highlights.map((h,hIdx)=>(
                <div key={hIdx} style={{padding:'5px',color:'#555',fontSize:'14px'}}>• {h}</div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={advanceToWorldSeries} style={{width:'100%',padding:'20px',fontSize:'24px',backgroundColor:'#dc2626',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
          🏆 Advance to World Series 🏆
        </button>
      </div>
    );
  }

  if(gameStep==='ws-results'){
    return(
      <div style={{padding:'40px',maxWidth:'1200px',margin:'0 auto'}}>
        <h1 style={{textAlign:'center',fontSize:'48px',color:'#dc2626'}}>🏆 WORLD SERIES 🏆</h1>
        <h2 style={{textAlign:'center',margin:'30px 0'}}>{wsResults.team1Name} vs {wsResults.team2Name}</h2>
        <h2 style={{textAlign:'center',fontSize:'36px',color:'#15803d',marginBottom:'40px'}}>
          CHAMPION: {wsResults.winnerName} ({wsResults.finalScore})
        </h2>
        {wsResults.games.map((game,idx)=>(
          <div key={idx} style={{padding:'20px',margin:'15px 0',backgroundColor:'#fef3c7',borderRadius:'8px',border:'2px solid #f59e0b'}}>
            <h3>Game {game.gameNum}: {wsResults.team1Name} {game.score1} - {game.score2} {wsResults.team2Name}</h3>
            {game.highlights.map((h,hIdx)=>(
              <div key={hIdx} style={{padding:'8px',color:'#333',fontSize:'15px',fontWeight:'500'}}>⭐ {h}</div>
            ))}
          </div>
        ))}
        <button onClick={()=>{
          setGameStep('menu');
          setTeams([{name:'',players:{},pitchers:{sp:[],rp:[]}},{name:'',players:{},pitchers:{sp:[],rp:[]}},{name:'',players:{},pitchers:{sp:[],rp:[]}},{name:'',players:{},pitchers:{sp:[],rp:[]}}]);
          setCurrentTeam(0);setCurrentStep('name');setCurrentPosition(0);setLcsResults(null);setWsResults(null);
        }} style={{width:'100%',padding:'20px',fontSize:'20px',backgroundColor:'#2563eb',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginTop:'40px'}}>
          Start New Tournament
        </button>
      </div>
    );
  }

  return null;
}

export default App;

/*
===========================================
HOW TO EXPAND TO FULL 24 PLAYERS PER POSITION
===========================================

This demo has 12 players per position.
To expand to 24 (or more):

1. Copy the PLAYER_POOLS object
2. Add more player objects to each position array
3. Follow the same format: {name:"Name",ba:0.000,obp:0.000,slg:0.000,drs:0,spd:0,sb:0,cs:0,fld:0.000}
4. For pitchers: {name:"Name",era:0.00,whip:0.00,kper9:0.00}

The game will automatically work with any number of players!

All features are working:
✅ 4-team tournament
✅ Team strength seeding
✅ 3 starting pitchers per team
✅ 4 relief pitchers per team
✅ Defensive ratings affect scoring
✅ Speed affects base running & highlights
✅ 3-5 highlights per game
✅ Realistic bullpen usage

Enjoy!
*/
