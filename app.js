const rooms = [
  { id: 'deluxe', name: 'Deluxe Room', price: 2499, guests: 2, bed: 'King / Twin', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=85', description: 'A serene, well-appointed room for a restful stay.' },
  { id: 'executive', name: 'Executive Room', price: 3499, guests: 2, bed: 'King bed', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85', description: 'Thoughtfully designed comfort with room to unwind.' },
  { id: 'family', name: 'Family Suite', price: 4999, guests: 4, bed: 'Multiple beds', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85', description: 'Generous space for shared moments and easy stays.' }
];

const gallery = [
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85'
];

const $ = (selector) => document.querySelector(selector);
const today = new Date().toISOString().slice(0, 10);
const modal = $('#booking-modal');
const content = $('#booking-content');

function renderRooms(list = rooms) {
  const grid = $('#room-grid');
  if (!grid) return;
  grid.innerHTML = list.map((room) => `
    <article class="room-card">
      <div class="image-frame"><div class="room-image" style="background-image:url('${room.image}')"></div></div>
      <div class="room-card-content">
        <div class="room-meta"><span>UP TO ${room.guests} GUESTS</span><span>${room.bed}</span></div>
        <h3>${room.name}</h3><p>${room.description}</p>
        <div class="room-bottom"><span class="price">₹${room.price.toLocaleString('en-IN')} <small>/ NIGHT</small></span><button class="button" data-room="${room.id}">Book now</button></div>
      </div>
    </article>`).join('');
  document.querySelectorAll('[data-room]').forEach((button) => button.addEventListener('click', () => openBooking(button.dataset.room)));
}

function renderGallery() {
  const grid = $('#gallery-grid');
  if (!grid) return;
  const limit = grid.dataset.limit ? Number(grid.dataset.limit) : gallery.length;
  grid.innerHTML = gallery.slice(0, limit).map((src, index) => `<button aria-label="View palace photo ${index + 1}" style="background-image:url('${src}')" data-photo="${src}"></button>`).join('');
  document.querySelectorAll('[data-photo]').forEach((button) => button.addEventListener('click', () => openPhoto(button.dataset.photo)));
}

function openPhoto(src) {
  if (!modal || !content) return;
  content.innerHTML = `<img style="width:100%;display:block" src="${src}" alt="MVD Palace gallery preview">`;
  modal.showModal();
}

function openBooking(selected = 'deluxe') {
  if (!modal || !content) return;
  const options = rooms.map((room) => `<option value="${room.id}" ${room.id === selected ? 'selected' : ''}>${room.name} — ₹${room.price.toLocaleString('en-IN')} / night</option>`).join('');
  const checkIn = $('#check-in')?.value || '';
  const checkOut = $('#check-out')?.value || '';
  content.innerHTML = `<div class="modal-inner"><p class="eyebrow">RESERVE YOUR STAY</p><h2>Book a <i>room.</i></h2><p>Availability is confirmed securely before any booking is accepted.</p><form id="booking-form"><div class="form-grid"><label>CHECK-IN<input required type="date" min="${today}" value="${checkIn}"></label><label>CHECK-OUT<input required type="date" min="${today}" value="${checkOut}"></label><label>ROOM<select id="modal-room">${options}</select></label><label>GUESTS<select><option>2 Guests</option><option>1 Guest</option><option>3 Guests</option><option>4 Guests</option></select></label><label class="full">FULL NAME<input required placeholder="Your name"></label><label>MOBILE NUMBER<input required inputmode="tel" placeholder="Your number"></label><label>EMAIL<input required type="email" placeholder="you@example.com"></label><label class="full">SPECIAL REQUESTS<textarea rows="2" placeholder="Optional"></textarea></label></div><div class="submit-row"><small>Secure booking request</small><button class="button dark">Continue →</button></div></form></div>`;
  $('#booking-form').addEventListener('submit', submitBooking);
  modal.showModal();
}

function submitBooking(event) {
  event.preventDefault();
  const room = rooms.find((item) => item.id === $('#modal-room').value);
  content.innerHTML = `<div class="modal-inner confirmation"><div class="tick">✓</div><p class="eyebrow">BOOKING REQUEST CONFIRMED</p><h2>Thank you.</h2><p>Your request for the ${room.name} has been received. Reference ID: <b>MVD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}</b></p><p>Our team will confirm final availability and contact you shortly.</p><a class="button gold" href="https://wa.me/918266959909?text=Hello%20MVD%20Palace%2C%20I%20have%20made%20a%20booking%20request." target="_blank" rel="noreferrer">WhatsApp us ↗</a></div>`;
}

function openEvent() {
  if (!modal || !content) return;
  content.innerHTML = `<div class="modal-inner"><p class="eyebrow">WHOLE PALACE BOOKING</p><h2>Plan an <i>occasion.</i></h2><p>Tell us a little about your celebration and we’ll prepare a tailored response.</p><form id="event-form"><div class="form-grid"><label>EVENT TYPE<select><option>Wedding</option><option>Reception</option><option>Family function</option><option>Corporate event</option><option>Other</option></select></label><label>EVENT DATE<input required type="date" min="${today}"></label><label>EXPECTED GUESTS<input required type="number" min="1" placeholder="Number of guests"></label><label>ROOMS REQUIRED<input type="number" min="0" placeholder="Optional"></label><label>NAME<input required placeholder="Your name"></label><label>MOBILE<input required inputmode="tel" placeholder="Your number"></label><label class="full">SPECIAL REQUIREMENTS<textarea rows="3" placeholder="Tell us about your celebration"></textarea></label></div><div class="submit-row"><small>We’ll contact you shortly</small><button class="button dark">Request event quote →</button></div></form></div>`;
  $('#event-form').addEventListener('submit', (event) => {
    event.preventDefault();
    content.innerHTML = `<div class="modal-inner confirmation"><div class="tick">✓</div><p class="eyebrow">ENQUIRY RECEIVED</p><h2>We’ll be in touch.</h2><p>Your event enquiry reference is <b>MVD-EVENT-${String(Math.floor(Math.random() * 90000) + 10000)}</b>. Let’s create something memorable together.</p></div>`;
  });
  modal.showModal();
}

function initSearch() {
  const form = $('#search-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const checkIn = $('#check-in').value;
    const checkOut = $('#check-out').value;
    const type = $('#room-type').value;
    const status = $('#search-status');
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      status.textContent = 'Please select a check-out date after check-in.';
      return;
    }
    const result = type === 'all' ? rooms : rooms.filter((room) => room.id === type);
    renderRooms(result);
    status.textContent = `${result.length} room${result.length !== 1 ? 's' : ''} available for your selected dates. Choose a room to continue.`;
    $('#room-grid')?.scrollIntoView({ behavior: 'smooth' });
  });
}

function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = $('#contact-status');
    status.textContent = 'Thank you — your message has been received. Our team will respond shortly.';
    form.reset();
  });
}

function initOwnerDetails() {
  const details = $('.contact-details');
  if (!details) return;
  details.insertAdjacentHTML('beforeend', '<div class="owner-details"><p class="eyebrow">PROPERTY CONTACT</p><h3>Devesh Chaudhary</h3><p>Owner, Hotel MVD Palace<br>Mathura</p><a href="tel:+918938047573">+91 89380 47573</a></div>');
}

document.querySelectorAll('input[type="date"]').forEach((input) => { input.min = today; });
document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => openBooking()));
document.querySelectorAll('[data-open-event]').forEach((button) => button.addEventListener('click', openEvent));
document.querySelector('[data-close]')?.addEventListener('click', () => modal?.close());
$('#open-gallery')?.addEventListener('click', () => document.querySelector('[data-photo]')?.click());
$('.menu')?.addEventListener('click', () => $('.nav')?.classList.toggle('menu-open'));
renderRooms();
renderGallery();
initSearch();
initContactForm();
initOwnerDetails();
