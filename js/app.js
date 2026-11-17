document.addEventListener('DOMContentLoaded',()=>{
 const hamb=document.querySelector('.hamb'),nav=document.querySelector('.topbar nav');
 if(hamb&&nav)hamb.addEventListener('click',()=>nav.classList.toggle('open'));
 const turfs=[
  {name:'Greenfield Arena',sport:'football',place:'Coimbatore',price:800,cls:'',desc:'5-a-side · Floodlights'},
  {name:'Boundary Box',sport:'cricket',place:'Coimbatore',price:600,cls:'cricket',desc:'Practice nets · Equipment'},
  {name:'Urban Play Courts',sport:'badminton',place:'Coimbatore',price:500,cls:'multi',desc:'Indoor courts · Changing room'}
 ];
 const card=t=>`<article class="turf-card"><div class="turf-art ${t.cls}">${t.sport.toUpperCase()}</div><div class="turf-info"><h3>${t.name}</h3><p>📍 ${t.place} · ${t.desc}</p><div class="turf-bottom"><b>₹${t.price} / hour</b><a class="link" href="turf-details.html">View details →</a></div></div></article>`;
 const featured=document.getElementById('featuredTurfs'),all=document.getElementById('allTurfs');
 if(featured)featured.innerHTML=turfs.map(card).join('');
 function filter(){if(!all)return;let q=(document.getElementById('searchTurfs').value||'').toLowerCase(),s=document.getElementById('filterSport').value;all.innerHTML=turfs.filter(t=>(t.name+' '+t.sport).toLowerCase().includes(q)&&(s==='all'||t.sport===s)).map(card).join('')||'<p>No matching venues found.</p>'}
 if(all){filter();document.getElementById('searchTurfs').addEventListener('input',filter);document.getElementById('filterSport').addEventListener('change',filter)}
 const date=document.getElementById('bookDate');if(date){let d=new Date();date.min=new Date(d-d.getTimezoneOffset()*60000).toISOString().slice(0,10)}
 const saveForm=(id,key,next)=>{const f=document.getElementById(id);if(!f)return;f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;let data=Object.fromEntries(new FormData(f));let arr=JSON.parse(localStorage.getItem(key)||'[]');arr.push({...data,created:new Date().toLocaleString(),status:'Pending demo'});localStorage.setItem(key,JSON.stringify(arr));if(next)location.href=next;else{f.innerHTML='<h2>Thanks!</h2><p>Your demo enquiry has been saved on this device.</p>'}})};
 saveForm('bookingForm','turfBookings','checkout.html');
 const sum=document.getElementById('checkoutSummary');if(sum){let a=JSON.parse(localStorage.getItem('turfBookings')||'[]').slice(-1)[0];sum.innerHTML=a?Object.entries(a).map(([k,v])=>`<div><b>${k}</b>: ${String(v).replace(/[<>]/g,'')}</div>`).join(''):'No booking details found. <a href="booking.html">Start a request</a>'}
 saveForm('paymentForm','turfPayment','confirmation.html');
 saveForm('teamForm','turfTeams',null);saveForm('contactForm','turfEnquiries',null);
 const bookings=JSON.parse(localStorage.getItem('turfBookings')||'[]');
 const mine=document.getElementById('myBookings'),admin=document.getElementById('adminBookings'),count=document.getElementById('adminCount');
 const rows=bookings.length?bookings.map(b=>`<div class="summary"><b>${b.turf||'Turf request'}</b><br>${b.date||''} · ${b.time||''}<br>Status: ${b.status||'Pending'}</div>`).join(''):'<p class="muted">No demo requests saved yet.</p>';
 if(mine)mine.innerHTML=rows;if(admin)admin.innerHTML=rows;if(count)count.textContent=bookings.length;
});