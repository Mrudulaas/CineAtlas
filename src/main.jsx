import React,{useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Search,Home,Sparkles,ChevronDown,ChevronRight,User,Settings,LogOut,Menu,X,Film,Clock,ArrowLeft,CheckCircle2,Info,Star,Play,SlidersHorizontal,CalendarDays,Bookmark,BookmarkCheck} from 'lucide-react';
import './styles.css';

const titles=[
 {id:'iron-man',name:'Iron Man',year:2008,type:'Movie',runtime:'2h 6m',phase:'Phase One',importance:'useful',reason:'Introduces Tony Stark and the foundations of the modern MCU.',tags:['Tony Stark','Avengers']},
 {id:'avengers',name:'The Avengers',year:2012,type:'Movie',runtime:'2h 23m',phase:'Phase One',importance:'important',reason:'Establishes the original Avengers team and their shared history.',tags:['Avengers','Loki','Infinity Stones']},
 {id:'winter-soldier',name:'Captain America: The Winter Soldier',year:2014,type:'Movie',runtime:'2h 16m',phase:'Phase Two',importance:'recommended',reason:'Important context for Captain America, Bucky and the changing MCU landscape.',tags:['Steve Rogers','Bucky']},
 {id:'guardians',name:'Guardians of the Galaxy',year:2014,type:'Movie',runtime:'2h 1m',phase:'Phase Two',importance:'recommended',reason:'Introduces cosmic characters and the wider universe around the Infinity Stones.',tags:['Guardians','Infinity Stones']},
 {id:'infinity-war',name:'Avengers: Infinity War',year:2018,type:'Movie',runtime:'2h 29m',phase:'Phase Three',importance:'essential',reason:'A major turning point whose consequences shape everything that follows.',tags:['Avengers','Thanos','Infinity Stones']},
 {id:'endgame',name:'Avengers: Endgame',year:2019,type:'Movie',runtime:'3h 2m',phase:'Phase Three',importance:'essential',reason:'Resolves the Infinity Saga and creates the status quo for the next era.',tags:['Avengers','Time Travel','Infinity Saga']},
 {id:'wandavision',name:'WandaVision',year:2021,type:'Show',runtime:'5h 50m',phase:'Phase Four',importance:'important',reason:"Explores Wanda's evolution and introduces ideas that become important to the multiverse era.",tags:['Wanda','Multiverse']},
 {id:'loki-s1',name:'Loki — Season 1',year:2021,type:'Show',runtime:'4h 10m',phase:'Phase Four',importance:'essential',reason:'Introduces the TVA and lays crucial groundwork for Marvel’s multiverse story.',tags:['Loki','TVA','Multiverse']},
 {id:'no-way-home',name:'Spider-Man: No Way Home',year:2021,type:'Movie',runtime:'2h 28m',phase:'Phase Four',importance:'important',reason:'Makes the multiverse tangible through Spider-Man and variant characters.',tags:['Spider-Man','Multiverse']},
 {id:'multiverse-madness',name:'Doctor Strange in the Multiverse of Madness',year:2022,type:'Movie',runtime:'2h 6m',phase:'Phase Four',importance:'important',reason:'Expands the multiverse and establishes rules and dangers around incursions and variants.',tags:['Doctor Strange','Multiverse','Wanda']},
 {id:'loki-s2',name:'Loki — Season 2',year:2023,type:'Show',runtime:'4h 45m',phase:'Phase Five',importance:'essential',reason:'Builds directly on Loki’s multiverse storyline and the future of branching timelines.',tags:['Loki','TVA','Timelines']},
 {id:'deadpool-wolverine',name:'Deadpool & Wolverine',year:2024,type:'Movie',runtime:'2h 8m',phase:'Phase Five',importance:'recommended',reason:'Connects legacy Marvel characters with the MCU and plays heavily with multiverse concepts.',tags:['Deadpool','Wolverine','Multiverse']}
];

const targets=[
 {name:'Avengers: Secret Wars',desc:'A multiverse-scale event. Start with the essential multiverse foundations.',ids:['endgame','loki-s1','no-way-home','multiverse-madness','loki-s2','deadpool-wolverine']},
 {name:'Avengers: Doomsday',desc:'A major Avengers event. Refresh the core Avengers story and the newer multiverse era.',ids:['avengers','infinity-war','endgame','loki-s1','loki-s2','deadpool-wolverine']},
 {name:'Spider-Man: No Way Home',desc:'A Spider-Man + multiverse preparation path.',ids:['avengers','endgame','loki-s1','no-way-home']}
];

function Importance({level}){let m={essential:['Essential','red'],important:['Highly relevant','orange'],recommended:['Recommended','purple'],useful:['Useful','gray']}[level];return <span className={'importance '+m[1]}><span/> {m[0]}</span>}

function App(){
 const [page,setPage]=useState('home');
 const [target,setTarget]=useState(null);
 const [order,setOrder]=useState('release');
 const [filter,setFilter]=useState('all');
 const [query,setQuery]=useState('');
 const [profile,setProfile]=useState(false);
 const [open,setOpen]=useState('Watch');
 const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem('marvelSaved')||'[]'));
 const [completed,setCompleted]=useState(()=>JSON.parse(localStorage.getItem('marvelCompleted')||'[]'));

 const saveState=(key,val)=>{localStorage.setItem(key,JSON.stringify(val));};
 const selectTarget=(t)=>{setTarget(t);setPage('prep');window.scrollTo(0,0)}
 const targetTitles=useMemo(()=>target?target.ids.map(id=>titles.find(x=>x.id===id)).filter(Boolean):[],[target]);
 const sorted=useMemo(()=>{
   let arr=targetTitles.filter(x=>filter==='all'||x.type.toLowerCase()===filter);
   if(order==='chronological') arr=[...arr].sort((a,b)=>a.year-b.year);
   else arr=[...arr].sort((a,b)=>a.year-b.year); // seeded data is already release order
   return arr;
 },[targetTitles,order,filter]);
 const toggle=(id,kind)=>{
   let next=kind==='saved'?(saved.includes(id)?saved.filter(x=>x!==id):[...saved,id]):(completed.includes(id)?completed.filter(x=>x!==id):[...completed,id]);
   kind==='saved'?setSaved(next):setCompleted(next);saveState(kind==='saved'?'marvelSaved':'marvelCompleted',next)
 };
 const go=p=>{setPage(p);setProfile(false);window.scrollTo(0,0)}

 return <div className="app">
  <aside className="sidebar">
   <div className="brand"><div className="logo">M</div><div><b>MARVEL</b><small>PREP</small></div></div>
   <div className="sideNav">
    {[['Watch',['Preparation','Movies','Shows','Essential']],['Universe',['Timeline','Characters','Phases','Sagas']],['My Marvel',['Watchlist','Completed','Profile']]].map(([section,items])=><div className="acc" key={section}>
      <button className="accHead" onClick={()=>setOpen(open===section?'':section)}><span>{section}</span>{open===section?<ChevronDown size={16}/>:<ChevronRight size={16}/>}</button>
      {open===section&&<div className="accItems">{items.map(item=><button key={item} onClick={()=>go(item)}>{item==='Preparation'?<Play size={16}/>:item==='Watchlist'?<Bookmark size={16}/>:item==='Completed'?<CheckCircle2 size={16}/>:item==='Timeline'?<Clock size={16}/>:<Film size={16}/>} {item}</button>)}</div>}
    </div>)}
   </div>
   <div className="insider"><Sparkles size={16}/><div><b>Prep mode</b><small>Cut the irrelevant stuff.</small></div></div>
  </aside>

  <main className="main">
   <header className="topbar">
    <button className="mobileMenu" onClick={()=>document.querySelector('.sidebar').classList.toggle('show')}><Menu/></button>
    <nav><button className={page==='home'?'active':''} onClick={()=>go('home')}><Home size={16}/>Home</button><button className={page==='search'?'active':''} onClick={()=>go('search')}><Search size={16}/>Search</button><button onClick={()=>go('new')} className={page==='new'?'active':''}><Sparkles size={16}/>What's New</button></nav>
    <div className="profileWrap"><button className="avatar" onClick={()=>setProfile(!profile)}>MR</button>{profile&&<div className="profileMenu"><div className="identity"><div className="avatar">MR</div><div><b>Marvel Fan</b><small>@marvelfan</small></div></div><hr/><button onClick={()=>go('profile')}><User size={16}/>Profile settings</button><button onClick={()=>go('settings')}><Settings size={16}/>Settings</button><hr/><button className="logout" onClick={()=>alert('Logged out — demo only')}><LogOut size={16}/>Log out</button></div>}</div>
   </header>

   {page==='home'&&<section className="content">
    <div className="hero"><div className="heroCopy"><span className="eyebrow">MARVEL PREP</span><h1>DON'T WATCH<br/><em>EVERYTHING.</em></h1><p>Search for the movie you're preparing for. We'll build a focused watch path with the stories that actually matter.</p>
      <div className="heroSearch"><Search size={19}/><input placeholder="What are you preparing for?" onFocus={()=>go('search')} /></div>
      <div className="chips">{targets.map(t=><button key={t.name} onClick={()=>selectTarget(t)}>{t.name}</button>)}</div>
    </div><div className="orbit"><div className="ring r1"/><div className="ring r2"/><div className="core">M</div><div className="orbitLabel"><b>YOUR PREP PATH</b><small>Essential → Recommended → Optional</small></div></div></div>
    <div className="sectionHead"><div><span className="eyebrow">HOW IT WORKS</span><h2>Only watch what matters.</h2></div></div>
    <div className="steps"><div><strong>01</strong><b>Pick a target</b><p>Choose the movie or show you're getting ready for.</p></div><div><strong>02</strong><b>Get your path</b><p>See relevant movies and shows in release or chronological order.</p></div><div><strong>03</strong><b>Know why</b><p>Every title tells you how important it is and what it prepares you for.</p></div></div>
    <div className="sectionHead"><div><span className="eyebrow">POPULAR PREP</span><h2>Start a watch path</h2></div></div>
    <div className="targetGrid">{targets.map(t=><button className="targetCard" key={t.name} onClick={()=>selectTarget(t)}><span className="targetBadge">PREP</span><h3>{t.name}</h3><p>{t.desc}</p><div>{t.ids.length} titles <ChevronRight size={15}/></div></button>)}</div>
   </section>}

   {page==='search'&&<section className="content page"><span className="eyebrow">TARGET SEARCH</span><h1>What are you preparing for?</h1><div className="bigSearch"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search movies & shows..."/></div><div className="searchResults">{(query?targets.filter(t=>t.name.toLowerCase().includes(query.toLowerCase())):targets).map(t=><button className="resultCard" key={t.name} onClick={()=>selectTarget(t)}><div className="posterMini">M</div><div><b>{t.name}</b><p>{t.desc}</p><small>{t.ids.length} titles in recommended prep</small></div><ChevronRight/></button>)}</div></section>}

   {page==='prep'&&target&&<section className="content prepPage"><button className="back" onClick={()=>go('home')}><ArrowLeft size={16}/> Back</button><div className="prepHero"><div><span className="eyebrow">YOUR PREPARATION PATH</span><h1>{target.name}</h1><p>{target.desc}</p></div><div className="progress"><b>{completed.filter(x=>target.ids.includes(x)).length}/{target.ids.length}</b><small>completed</small></div></div>
    <div className="toolbar"><div className="toggle"><button className={order==='release'?'sel':''} onClick={()=>setOrder('release')}><CalendarDays size={15}/> Release order</button><button className={order==='chronological'?'sel':''} onClick={()=>setOrder('chronological')}><Clock size={15}/> Chronological</button></div><div className="filters"><SlidersHorizontal size={15}/><button className={filter==='all'?'sel':''} onClick={()=>setFilter('all')}>All</button><button className={filter==='movie'?'sel':''} onClick={()=>setFilter('movie')}>Movies</button><button className={filter==='show'?'sel':''} onClick={()=>setFilter('show')}>Shows</button></div></div>
    <div className="legend"><span><i className="dot red"/> Essential</span><span><i className="dot orange"/> Highly relevant</span><span><i className="dot purple"/> Recommended</span><span><i className="dot gray"/> Useful</span></div>
    <div className="watchlist">{sorted.map((x,i)=><article className={'watchItem '+(completed.includes(x.id)?'done':'')} key={x.id}><div className="number">{String(i+1).padStart(2,'0')}</div><div className="poster"><Film/></div><div className="watchInfo"><div className="titleLine"><h3>{x.name}</h3><Importance level={x.importance}/></div><div className="meta">{x.type} · {x.year} · {x.runtime} · {x.phase}</div><p><Info size={14}/>{x.reason}</p><div className="tags">{x.tags.map(t=><span key={t}>{t}</span>)}</div></div><div className="itemActions"><button title="Save" onClick={()=>toggle(x.id,'saved')}>{saved.includes(x.id)?<BookmarkCheck/>:<Bookmark/>}</button><button className={completed.includes(x.id)?'completedBtn':''} onClick={()=>toggle(x.id,'completed')}>{completed.includes(x.id)?<CheckCircle2/>:<CheckCircle2/>}</button></div></article>)}</div>
    <div className="tip"><Star size={17}/><div><b>Why not just watch everything?</b><p>That's the problem this app is designed to solve. The final relevance model can rank titles using character, event, location, artifact and storyline connections.</p></div></div>
   </section>}

   {page==='new'&&<section className="content page"><span className="eyebrow">WHAT'S NEW</span><h1>What's new</h1><div className="newsGrid"><div><Sparkles/><h3>Prep paths</h3><p>Build a focused route instead of a giant MCU checklist.</p></div><div><SlidersHorizontal/><h3>Two viewing orders</h3><p>Switch between release order and chronological order at any time.</p></div><div><Info/><h3>Relevance notes</h3><p>Every title explains why it belongs in your preparation.</p></div></div></section>}

   {['profile','settings','Watchlist','Completed','Movies','Shows','Essential','Timeline','Characters','Phases','Sagas','Profile'].includes(page)&&<section className="content page"><span className="eyebrow">MARVEL PREP</span><h1>{page==='profile'?'Profile settings':page}</h1><p className="lead">This section is wired into the navigation. Your saved watchlist and completion state are stored locally in this demo.</p>{page==='Watchlist'&&<div className="simpleList">{titles.filter(x=>saved.includes(x.id)).map(x=><div key={x.id}><BookmarkCheck/><b>{x.name}</b><span>{x.year}</span></div>)}</div>}{page==='Completed'&&<div className="simpleList">{titles.filter(x=>completed.includes(x.id)).map(x=><div key={x.id}><CheckCircle2/><b>{x.name}</b><span>{x.year}</span></div>)}</div>}</section>}
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
