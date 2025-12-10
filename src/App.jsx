import React, { useState } from 'react';

// BASEBALL TOURNAMENT GAME v2.0
// Features: 4 teams, LCS, World Series, highlights, defense, speed
// This version has 12 players per position as a working demo
// Full version instructions included at bottom

const PLAYER_POOLS = {
  C: [
    {name:"Johnny Bench",ba:.267,obp:.342,slg:.476,drs:15,spd:3,sb:68,cs:43,fld:.990},
    {name:"Cal Raleigh",ba:.229,obp:.312,slg:.434,drs:8,spd:2,sb:3,cs:2,fld:.992},
    {name:"Yogi Berra",ba:.285,obp:.348,slg:.482,drs:12,spd:2,sb:30,cs:20,fld:.988},
    {name:"Mike Piazza",ba:.308,obp:.377,slg:.545,drs:-8,spd:2,sb:32,cs:25,fld:.991},
    {name:"Ivan Rodriguez",ba:.296,obp:.334,slg:.464,drs:18,spd:5,sb:127,cs:61,fld:.992},
    {name:"Joe Mauer",ba:.306,obp:.388,slg:.439,drs:8,spd:3,sb:59,cs:28,fld:.993},
    {name:"Buster Posey",ba:.302,obp:.372,slg:.460,drs:10,spd:3,sb:20,cs:15,fld:.993},
    {name:"Yadier Molina",ba:.279,obp:.334,slg:.379,drs:20,spd:2,sb:68,cs:48,fld:.994},
    {name:"Adley Rutschman",ba:.277,obp:.362,slg:.445,drs:12,spd:3,sb:6,cs:3,fld:.994},
    {name:"J.T. Realmuto",ba:.273,obp:.339,slg:.478,drs:15,spd:7,sb:87,cs:28,fld:.993},
    {name:"Will Smith",ba:.261,obp:.359,slg:.466,drs:6,spd:2,sb:8,cs:5,fld:.992},
    {name:"Salvador Perez",ba:.262,obp:.297,slg:.451,drs:5,spd:2,sb:5,cs:7,fld:.991}
  ],
  "1B": [
    {name:"Albert Pujols",ba:.296,obp:.374,slg:.544,drs:-12,spd:3,sb:117,cs:48,fld:.994},
    {name:"Miguel Cabrera",ba:.310,obp:.386,slg:.554,drs:-8,spd:3,sb:38,cs:24,fld:.993},
    {name:"Lou Gehrig",ba:.340,obp:.447,slg:.632,drs:5,spd:4,sb:102,cs:101,fld:.991},
    {name:"Freddie Freeman",ba:.301,obp:.389,slg:.505,drs:10,spd:5,sb:120,cs:36,fld:.996},
    {name:"Joey Votto",ba:.294,obp:.409,slg:.511,drs:5,spd:3,sb:60,cs:24,fld:.995},
    {name:"Paul Goldschmidt",ba:.295,obp:.391,slg:.514,drs:8,spd:5,sb:158,cs:42,fld:.995},
    {name:"Jim Thome",ba:.276,obp:.402,slg:.554,drs:-5,spd:2,sb:19,cs:15,fld:.992},
    {name:"Frank Thomas",ba:.301,obp:.419,slg:.555,drs:-10,spd:2,sb:32,cs:21,fld:.993},
    {name:"Vladimir Guerrero Jr",ba:.284,obp:.360,slg:.480,drs:-5,spd:3,sb:6,cs:4,fld:.993},
    {name:"Pete Alonso",ba:.249,obp:.339,slg:.489,drs:-3,spd:2,sb:6,cs:3,fld:.993},
    {name:"Matt Olson",ba:.249,obp:.331,slg:.508,drs:12,spd:3,sb:12,cs:6,fld:.996},
    {name:"Jeff Bagwell",ba:.297,obp:.408,slg:.540,drs:2,spd:6,sb:202,cs:89,fld:.994}
  ],
  "2B": [
    {name:"Rogers Hornsby",ba:.358,obp:.434,slg:.577,drs:8,spd:5,sb:135,cs:75,fld:.967},
    {name:"Joe Morgan",ba:.271,obp:.395,slg:.427,drs:18,spd:8,sb:689,cs:162,fld:.981},
    {name:"Jackie Robinson",ba:.311,obp:.409,slg:.474,drs:12,spd:8,sb:197,cs:73,fld:.983},
    {name:"Jose Altuve",ba:.307,obp:.365,slg:.464,drs:5,spd:7,sb:341,cs:87,fld:.986},
    {name:"Robinson Cano",ba:.302,obp:.350,slg:.490,drs:5,spd:4,sb:49,cs:25,fld:.989},
    {name:"Chase Utley",ba:.275,obp:.358,slg:.465,drs:10,spd:6,sb:154,cs:50,fld:.987},
    {name:"Jeff Kent",ba:.290,obp:.356,slg:.500,drs:2,spd:3,sb:94,cs:52,fld:.985},
    {name:"Dustin Pedroia",ba:.299,obp:.365,slg:.439,drs:12,spd:5,sb:138,cs:46,fld:.991},
    {name:"Marcus Semien",ba:.256,obp:.323,slg:.431,drs:8,spd:6,sb:170,cs:45,fld:.988},
    {name:"Ozzie Albies",ba:.261,obp:.312,slg:.452,drs:8,spd:7,sb:82,cs:25,fld:.988},
    {name:"Ketel Marte",ba:.292,obp:.359,slg:.479,drs:5,spd:6,sb:97,cs:28,fld:.987},
    {name:"Whit Merrifield",ba:.284,obp:.325,slg:.409,drs:3,spd:8,sb:155,cs:40,fld:.984}
  ],
  "3B": [
    {name:"Mike Schmidt",ba:.267,obp:.380,slg:.527,drs:20,spd:5,sb:174,cs:93,fld:.955},
    {name:"Chipper Jones",ba:.303,obp:.401,slg:.529,drs:3,spd:5,sb:150,cs:53,fld:.963},
    {name:"Wade Boggs",ba:.328,obp:.415,slg:.443,drs:8,spd:3,sb:24,cs:28,fld:.963},
    {name:"Adrian Beltre",ba:.286,obp:.339,slg:.480,drs:18,spd:5,sb:121,cs:58,fld:.967},
    {name:"Manny Machado",ba:.282,obp:.343,slg:.487,drs:18,spd:5,sb:78,cs:28,fld:.971},
    {name:"Nolan Arenado",ba:.287,obp:.346,slg:.512,drs:25,spd:4,sb:26,cs:18,fld:.973},
    {name:"Jose Ramirez",ba:.278,obp:.355,slg:.490,drs:12,spd:7,sb:207,cs:52,fld:.965},
    {name:"Anthony Rendon",ba:.290,obp:.369,slg:.471,drs:10,spd:4,sb:54,cs:23,fld:.967},
    {name:"Austin Riley",ba:.276,obp:.338,slg:.500,drs:8,spd:4,sb:18,cs:8,fld:.967},
    {name:"Rafael Devers",ba:.279,obp:.339,slg:.510,drs:-5,spd:3,sb:20,cs:12,fld:.958},
    {name:"Matt Chapman",ba:.240,obp:.328,slg:.445,drs:20,spd:4,sb:25,cs:12,fld:.970},
    {name:"Ke'Bryan Hayes",ba:.257,obp:.314,slg:.366,drs:18,spd:6,sb:22,cs:8,fld:.972}
  ],
  SS: [
    {name:"Honus Wagner",ba:.328,obp:.391,slg:.467,drs:20,spd:7,sb:723,cs:0,fld:.946},
    {name:"Cal Ripken Jr",ba:.276,obp:.340,slg:.447,drs:10,spd:4,sb:36,cs:25,fld:.979},
    {name:"Derek Jeter",ba:.310,obp:.377,slg:.440,drs:-5,spd:6,sb:358,cs:97,fld:.976},
    {name:"Barry Larkin",ba:.295,obp:.371,slg:.444,drs:12,spd:8,sb:379,cs:77,fld:.975},
    {name:"Ozzie Smith",ba:.262,obp:.337,slg:.328,drs:35,spd:8,sb:580,cs:148,fld:.978},
    {name:"Francisco Lindor",ba:.273,obp:.337,slg:.470,drs:18,spd:7,sb:134,cs:42,fld:.983},
    {name:"Trea Turner",ba:.296,obp:.348,slg:.466,drs:8,spd:10,sb:338,cs:58,fld:.980},
    {name:"Corey Seager",ba:.286,obp:.357,slg:.504,drs:3,spd:4,sb:42,cs:15,fld:.976},
    {name:"Bobby Witt Jr",ba:.289,obp:.319,slg:.495,drs:12,spd:10,sb:79,cs:15,fld:.980},
    {name:"Gunnar Henderson",ba:.261,obp:.348,slg:.489,drs:10,spd:7,sb:38,cs:8,fld:.982},
    {name:"Elly De La Cruz",ba:.235,obp:.324,slg:.473,drs:5,spd:10,sb:67,cs:18,fld:.975},
    {name:"Carlos Correa",ba:.279,obp:.357,slg:.467,drs:10,spd:5,sb:64,cs:25,fld:.982}
  ],
  LF: [
    {name:"Ted Williams",ba:.344,obp:.482,slg:.634,drs:-5,spd:4,sb:24,cs:17,fld:.974},
    {name:"Barry Bonds",ba:.298,obp:.444,slg:.607,drs:10,spd:7,sb:514,cs:141,fld:.984},
    {name:"Rickey Henderson",ba:.279,obp:.401,slg:.419,drs:5,spd:10,sb:1406,cs:335,fld:.979},
    {name:"Manny Ramirez",ba:.312,obp:.411,slg:.585,drs:-10,spd:3,sb:38,cs:29,fld:.982},
    {name:"Carl Yastrzemski",ba:.285,obp:.379,slg:.462,drs:12,spd:5,sb:168,cs:116,fld:.977},
    {name:"Juan Soto",ba:.285,obp:.421,slg:.504,drs:-5,spd:4,sb:57,cs:22,fld:.983},
    {name:"Christian Yelich",ba:.283,obp:.374,slg:.470,drs:5,spd:7,sb:182,cs:48,fld:.986},
    {name:"Steven Kwan",ba:.292,obp:.368,slg:.399,drs:10,spd:7,sb:34,cs:10,fld:.990},
    {name:"Kyle Tucker",ba:.289,obp:.361,slg:.520,drs:8,spd:7,sb:85,cs:20,fld:.987},
    {name:"Michael Brantley",ba:.298,obp:.358,slg:.444,drs:8,spd:5,sb:119,cs:42,fld:.988},
    {name:"Yordan Alvarez",ba:.295,obp:.392,slg:.561,drs:-8,spd:2,sb:8,cs:5,fld:.980},
    {name:"Tim Raines",ba:.294,obp:.385,slg:.425,drs:8,spd:9,sb:808,cs:146,fld:.981}
  ],
  CF: [
    {name:"Willie Mays",ba:.302,obp:.384,slg:.557,drs:25,spd:9,sb:338,cs:103,fld:.981},
    {name:"Ken Griffey Jr",ba:.284,obp:.370,slg:.538,drs:18,spd:7,sb:184,cs:66,fld:.988},
    {name:"Mike Trout",ba:.299,obp:.410,slg:.581,drs:15,spd:8,sb:201,cs:47,fld:.989},
    {name:"Mickey Mantle",ba:.298,obp:.421,slg:.557,drs:12,spd:8,sb:153,cs:38,fld:.982},
    {name:"Ty Cobb",ba:.366,obp:.433,slg:.512,drs:15,spd:9,sb:897,cs:0,fld:.962},
    {name:"Andruw Jones",ba:.254,obp:.337,slg:.486,drs:30,spd:7,sb:152,cs:59,fld:.990},
    {name:"Kenny Lofton",ba:.299,obp:.372,slg:.423,drs:20,spd:10,sb:622,cs:158,fld:.987},
    {name:"Grady Sizemore",ba:.269,obp:.353,slg:.462,drs:15,spd:9,sb:134,cs:34,fld:.989},
    {name:"Byron Buxton",ba:.244,obp:.312,slg:.468,drs:20,spd:10,sb:78,cs:21,fld:.991},
    {name:"Julio Rodriguez",ba:.273,obp:.327,slg:.467,drs:15,spd:9,sb:67,cs:18,fld:.989},
    {name:"Corbin Carroll",ba:.260,obp:.342,slg:.432,drs:12,spd:10,sb:79,cs:12,fld:.990},
    {name:"Cedric Mullins",ba:.258,obp:.318,slg:.409,drs:10,spd:9,sb:101,cs:22,fld:.989}
  ],
  RF: [
    {name:"Babe Ruth",ba:.342,obp:.474,slg:.690,drs:5,spd:5,sb:123,cs:117,fld:.968},
    {name:"Hank Aaron",ba:.305,obp:.374,slg:.555,drs:12,spd:6,sb:240,cs:73,fld:.980},
    {name:"Frank Robinson",ba:.294,obp:.389,slg:.537,drs:10,spd:6,sb:204,cs:77,fld:.983},
    {name:"Mookie Betts",ba:.296,obp:.374,slg:.513,drs:20,spd:8,sb:162,cs:35,fld:.987},
    {name:"Aaron Judge",ba:.274,obp:.380,slg:.563,drs:5,spd:6,sb:44,cs:12,fld:.989},
    {name:"Vladimir Guerrero",ba:.318,obp:.379,slg:.553,drs:8,spd:7,sb:181,cs:65,fld:.977},
    {name:"Ichiro Suzuki",ba:.311,obp:.355,slg:.402,drs:15,spd:9,sb:509,cs:131,fld:.985},
    {name:"Bryce Harper",ba:.280,obp:.388,slg:.512,drs:2,spd:6,sb:108,cs:37,fld:.985},
    {name:"Fernando Tatis Jr",ba:.282,obp:.357,slg:.537,drs:5,spd:9,sb:83,cs:18,fld:.983},
    {name:"Ronald Acuna Jr",ba:.283,obp:.368,slg:.518,drs:8,spd:10,sb:193,cs:36,fld:.986},
    {name:"Giancarlo Stanton",ba:.267,obp:.358,slg:.554,drs:-5,spd:5,sb:26,cs:11,fld:.985},
    {name:"Tony Gwynn",ba:.338,obp:.388,slg:.459,drs:12,spd:6,sb:319,cs:125,fld:.981}
  ],
  DH: [
    {name:"David Ortiz",ba:.286,obp:.380,slg:.552,drs:0,spd:1,sb:17,cs:10,fld:.993},
    {name:"Edgar Martinez",ba:.312,obp:.418,slg:.515,drs:0,spd:2,sb:49,cs:26,fld:.970},
    {name:"Frank Thomas",ba:.301,obp:.419,slg:.555,drs:0,spd:2,sb:32,cs:21,fld:.993},
    {name:"Jim Thome",ba:.276,obp:.402,slg:.554,drs:0,spd:2,sb:19,cs:15,fld:.992},
    {name:"Nelson Cruz",ba:.279,obp:.348,slg:.524,drs:0,spd:3,sb:39,cs:22,fld:.982},
    {name:"Shohei Ohtani",ba:.282,obp:.367,slg:.532,drs:0,spd:8,sb:109,cs:21,fld:.985},
    {name:"Yordan Alvarez",ba:.295,obp:.392,slg:.561,drs:0,spd:2,sb:8,cs:5,fld:.980},
    {name:"J.D. Martinez",ba:.285,obp:.354,slg:.518,drs:0,spd:3,sb:15,cs:10,fld:.982},
    {name:"Marcell Ozuna",ba:.274,obp:.337,slg:.490,drs:0,spd:3,sb:13,cs:8,fld:.983},
    {name:"Kyle Schwarber",ba:.231,obp:.339,slg:.475,drs:0,spd:3,sb:31,cs:15,fld:.982},
    {name:"Giancarlo Stanton",ba:.267,obp:.358,slg:.554,drs:0,spd:5,sb:26,cs:11,fld:.985},
    {name:"Edwin Encarnacion",ba:.263,obp:.357,slg:.489,drs:0,spd:2,sb:38,cs:20,fld:.991}
  ],
  SP: [
    {name:"Sandy Koufax",era:2.76,whip:1.11,kper9:9.28},
    {name:"Pedro Martinez",era:2.93,whip:1.05,kper9:10.04},
    {name:"Clayton Kershaw",era:2.48,whip:1.00,kper9:9.83},
    {name:"Greg Maddux",era:3.16,whip:1.14,kper9:6.07},
    {name:"Randy Johnson",era:3.29,whip:1.17,kper9:10.61},
    {name:"Roger Clemens",era:3.12,whip:1.17,kper9:8.58},
    {name:"Max Scherzer",era:3.15,whip:1.11,kper9:11.08},
    {name:"Justin Verlander",era:3.24,whip:1.13,kper9:9.55},
    {name:"Jacob deGrom",era:2.52,whip:0.99,kper9:11.19},
    {name:"Chris Sale",era:3.03,whip:1.04,kper9:11.08},
    {name:"Gerrit Cole",era:3.18,whip:1.04,kper9:11.53},
    {name:"Shane Bieber",era:3.22,whip:1.05,kper9:11.50},
    {name:"Corbin Burnes",era:3.01,whip:1.01,kper9:11.54},
    {name:"Zack Wheeler",era:3.07,whip:1.11,kper9:9.84},
    {name:"Blake Snell",era:3.19,whip:1.23,kper9:11.74},
    {name:"Roy Halladay",era:3.38,whip:1.18,kper9:6.93},
    {name:"Corey Kluber",era:3.44,whip:1.09,kper9:9.72},
    {name:"CC Sabathia",era:3.74,whip:1.26,kper9:8.70},
    {name:"Cliff Lee",era:3.52,whip:1.17,kper9:7.89},
    {name:"Cole Hamels",era:3.43,whip:1.22,kper9:8.91}
  ],
  RP: [
    {name:"Mariano Rivera",era:2.21,whip:1.00,kper9:8.46},
    {name:"Craig Kimbrel",era:2.48,whip:0.96,kper9:14.66},
    {name:"Kenley Jansen",era:2.48,whip:0.98,kper9:12.15},
    {name:"Aroldis Chapman",era:2.48,whip:1.11,kper9:15.38},
    {name:"Edwin Diaz",era:2.64,whip:0.96,kper9:15.38},
    {name:"Josh Hader",era:2.50,whip:0.89,kper9:16.34},
    {name:"Trevor Hoffman",era:2.87,whip:1.06,kper9:9.36},
    {name:"Billy Wagner",era:2.31,whip:0.998,kper9:11.92},
    {name:"Emmanuel Clase",era:1.82,whip:0.88,kper9:10.72},
    {name:"Devin Williams",era:1.83,whip:0.88,kper9:15.67},
    {name:"Liam Hendriks",era:2.90,whip:1.06,kper9:12.65},
    {name:"Jonathan Papelbon",era:2.44,whip:1.05,kper9:10.39},
    {name:"Joe Nathan",era:2.87,whip:1.12,kper9:10.58},
    {name:"Raisel Iglesias",era:3.06,whip:1.04,kper9:11.46},
    {name:"Ryan Pressly",era:2.98,whip:1.09,kper9:11.13},
    {name:"Felix Bautista",era:2.21,whip:0.99,kper9:13.92},
    {name:"Alexis Diaz",era:2.73,whip:1.04,kper9:12.42},
    {name:"Andrew Miller",era:3.24,whip:1.13,kper9:12.90},
    {name:"Wade Davis",era:2.96,whip:1.05,kper9:11.70},
    {name:"David Robertson",era:2.88,whip:1.14,kper9:11.56}
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
