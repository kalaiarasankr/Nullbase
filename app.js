const state={layouts:[],favorites:JSON.parse(localStorage.getItem("nullbase-favs")||"[]"),current:null,favoritesOnly:false};
const $=s=>document.querySelector(s),grid=$("#grid"),search=$("#search"),level=$("#level"),type=$("#type"),empty=$("#empty"),resultCount=$("#resultCount");
function isFav(id){return state.favorites.includes(id)}
function saveFavorites(){localStorage.setItem("nullbase-favs",JSON.stringify(state.favorites));$("#favCount").textContent=state.favorites.length}
function toggleFav(id){state.favorites=isFav(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];saveFavorites();render()}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function filtered(){
  const q=search.value.toLowerCase().trim(),
        lv=level.value,
        tp=type.value,
        favoritesOnly=state.favoritesOnly;
  return state.layouts.filter(x=>
    (lv==="all"||x.level===lv)&&
    (tp==="all"||x.type===tp)&&
    (!q||`${x.name} ${x.tags.join(" ")}`.toLowerCase().includes(q))&&
    (!favoritesOnly||isFav(x.id))
  );
}
function render(){const data=filtered();grid.innerHTML=data.map(x=>`<article class="card"><div class="thumb" style="background-image:url('${x.image}')"><span class="tag">TH${x.level}</span><button class="heart ${isFav(x.id)?"active":""}" aria-label="Favorite ${esc(x.name)}" onclick="event.stopPropagation();toggleFav(${x.id})">${isFav(x.id)?"♥":"♡"}</button></div><div class="info"><div class="title">${esc(x.name)}</div><div class="meta"><span>${esc(x.type)}</span>${x.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div><button class="copy" onclick="openLayout(${x.id})">VIEW & COPY</button></div></article>`).join("");resultCount.textContent=`${data.length} layout${data.length===1?"":"s"}`;empty.style.display=data.length?"none":"block"}
function openLayout(id){state.current=state.layouts.find(x=>x.id===id);if(!state.current)return;const x=state.current;$("#modalTitle").textContent=x.name;$("#modalDescription").textContent=x.description;$("#modalPills").innerHTML=`<span>TH${esc(x.level)}</span><span>${esc(x.type)}</span>`+x.tags.map(t=>`<span>#${esc(t)}</span>`).join("");$("#modalPreview").style.backgroundImage=`url('${x.image}')`;$("#modalPreview").innerHTML='<span class="tag">BASE PREVIEW</span>';$("#modal").classList.remove("hidden")}
function closeModal(){$("#modal").classList.add("hidden");state.current=null}
$("#close").onclick=closeModal;$("#modal").onclick=e=>{if(e.target===$("#modal"))closeModal()};
$("#openGame").onclick=()=>{if(state.current?.link)window.location.href=state.current.link};
$("#copyLink").onclick=async()=>{if(!state.current?.link)return;try{await navigator.clipboard.writeText(state.current.link)}catch{window.prompt("Copy this Null's Clash link:",state.current.link)}$("#copyLink").textContent="COPIED ✓";setTimeout(()=>$("#copyLink").textContent="COPY LINK",1300)};
$("#favoritesBtn").onclick=()=>{
  state.favoritesOnly=!state.favoritesOnly;
  $("#favoritesBtn").classList.toggle("active",state.favoritesOnly);
  $("#favoritesBtn").innerHTML=(state.favoritesOnly?"♥ Show all":"♥ Favorites")+" <span id=\"favCount\">"+state.favorites.length+"</span>";
  search.value="";
  level.value="all";
  type.value="all";
  render();
  window.scrollTo({top:500,behavior:"smooth"});
};
[search,level,type].forEach(e=>{e.addEventListener("input",render);e.addEventListener("change",render)});
async function init(){saveFavorites();try{const r=await fetch("data/layouts.json");if(!r.ok)throw Error();state.layouts=await r.json();render()}catch{empty.textContent="Could not load layouts. Run the project through a local web server.";empty.style.display="block"}}init();
