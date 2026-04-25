/**
 * HLPFL Stays — Embeddable Booking Widget
 * Usage: <script src="https://hlpfl.org/embed/booking.js" data-property="your-slug" defer></script>
 *
 * The widget renders a minimal availability calendar and booking form
 * inline wherever the script tag is placed. All styles are scoped.
 */
(function () {
  'use strict';

  const API_BASE = 'https://hlpfl.org/api/v1';

  // ─── Find the script tag ──────────────────────────────────────────────────
  const scriptTag = document.currentScript ||
    document.querySelector('script[data-property]');
  const slug = scriptTag?.getAttribute('data-property');
  const accentColor = scriptTag?.getAttribute('data-accent') || '#ab6c3d';

  if (!slug) {
    console.warn('[HLPFL Booking] No data-property slug set on script tag.');
    return;
  }

  // ─── Create mount point right after the script tag ───────────────────────
  const container = document.createElement('div');
  container.id = 'hlpfl-booking-widget';
  container.style.cssText = 'font-family: system-ui, sans-serif; max-width: 480px;';
  scriptTag?.parentNode?.insertBefore(container, scriptTag.nextSibling);

  // ─── Scoped styles ────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #hlpfl-booking-widget * { box-sizing: border-box; margin: 0; padding: 0; }
    #hlpfl-booking-widget .hbw-wrap { border: 1px solid rgba(0,0,0,0.12); padding: 20px; background: #fff; }
    #hlpfl-booking-widget .hbw-title { font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: ${accentColor}; margin-bottom: 12px; }
    #hlpfl-booking-widget .hbw-row { display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
    #hlpfl-booking-widget .hbw-field { flex: 1; min-width: 120px; }
    #hlpfl-booking-widget .hbw-field label { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 5px; }
    #hlpfl-booking-widget .hbw-field input, #hlpfl-booking-widget .hbw-field select { width: 100%; border: 1px solid #ddd; padding: 9px 12px; font-size: 14px; outline: none; transition: border-color .2s; }
    #hlpfl-booking-widget .hbw-field input:focus, #hlpfl-booking-widget .hbw-field select:focus { border-color: ${accentColor}; }
    #hlpfl-booking-widget .hbw-price { font-size: 13px; color: #555; margin-bottom: 14px; min-height: 18px; }
    #hlpfl-booking-widget .hbw-price strong { color: ${accentColor}; }
    #hlpfl-booking-widget .hbw-btn { width: 100%; background: ${accentColor}; color: #fff; font-weight: 600; font-size: 14px; letter-spacing: 0.05em; border: none; padding: 13px; cursor: pointer; transition: opacity .2s; }
    #hlpfl-booking-widget .hbw-btn:hover { opacity: .88; }
    #hlpfl-booking-widget .hbw-btn:disabled { opacity: .45; cursor: not-allowed; }
    #hlpfl-booking-widget .hbw-error { background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c; padding: 10px 12px; font-size: 13px; margin-bottom: 12px; }
    #hlpfl-booking-widget .hbw-unavail { color: #cc3333; text-decoration: line-through; }
    #hlpfl-booking-widget .hbw-powered { font-size: 10px; color: #bbb; text-align: right; margin-top: 8px; }
    #hlpfl-booking-widget .hbw-powered a { color: ${accentColor}; text-decoration: none; }
  `;
  document.head.appendChild(style);

  // ─── State ────────────────────────────────────────────────────────────────
  let property = null;
  let unavailableDates = [];

  function isUnavailable(checkIn, checkOut) {
    if (!checkIn || !checkOut) return false;
    return unavailableDates.some(r => checkIn < r.end && checkOut > r.start);
  }

  function nights(ci, co) {
    if (!ci || !co) return 0;
    return Math.round((new Date(co) - new Date(ci)) / 86400000);
  }

  function fmt(cents) {
    return '$' + (cents / 100).toFixed(0);
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  function render(loading, error) {
    if (loading) {
      container.innerHTML = '<div style="color:#aaa;font-size:13px;padding:16px;">Loading availability…</div>';
      return;
    }
    if (error) {
      container.innerHTML = `<div style="color:#cc3333;font-size:13px;padding:16px;">${error}</div>`;
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="hbw-wrap">
        <p class="hbw-title">Book ${property?.name ?? 'this property'}</p>

        <div class="hbw-row">
          <div class="hbw-field">
            <label>Check-in</label>
            <input type="date" id="hbw-ci" min="${today}" />
          </div>
          <div class="hbw-field">
            <label>Check-out</label>
            <input type="date" id="hbw-co" min="${today}" />
          </div>
        </div>

        <div class="hbw-row">
          <div class="hbw-field">
            <label>Guests</label>
            <select id="hbw-guests">
              ${Array.from({ length: property?.max_guests ?? 6 }, (_, i) =>
                `<option value="${i + 1}">${i + 1} guest${i > 0 ? 's' : ''}</option>`
              ).join('')}
            </select>
          </div>
        </div>

        <div id="hbw-pricing" class="hbw-price"></div>
        <div id="hbw-avail-error" style="display:none;font-size:13px;color:#cc3333;margin-bottom:12px;"></div>

        <div class="hbw-row">
          <div class="hbw-field" style="flex:2">
            <label>Full name</label>
            <input type="text" id="hbw-name" placeholder="Jane Smith" />
          </div>
        </div>
        <div class="hbw-row">
          <div class="hbw-field">
            <label>Email</label>
            <input type="email" id="hbw-email" placeholder="jane@example.com" />
          </div>
          <div class="hbw-field">
            <label>Phone / WhatsApp</label>
            <input type="tel" id="hbw-phone" placeholder="+1 555 0000" />
          </div>
        </div>

        <div id="hbw-error" class="hbw-error" style="display:none;"></div>

        <button class="hbw-btn" id="hbw-submit" disabled>Check Availability</button>
        <p class="hbw-powered">Powered by <a href="https://hlpfl.org/stays/" target="_blank">HLPFL Stays</a></p>
      </div>
    `;

    const ciEl = document.getElementById('hbw-ci');
    const coEl = document.getElementById('hbw-co');
    const priceEl = document.getElementById('hbw-pricing');
    const availErr = document.getElementById('hbw-avail-error');
    const submitBtn = document.getElementById('hbw-submit');

    function updatePricing() {
      const ci = ciEl.value, co = coEl.value;
      if (coEl.min !== ci) coEl.min = ci || today;

      if (!ci || !co) {
        priceEl.innerHTML = '';
        availErr.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Check Availability';
        return;
      }

      if (isUnavailable(ci, co)) {
        availErr.textContent = 'These dates are not available. Please choose different dates.';
        availErr.style.display = 'block';
        priceEl.innerHTML = '';
        submitBtn.disabled = true;
        return;
      }

      availErr.style.display = 'none';
      const n = nights(ci, co);
      if (n < 1) {
        priceEl.innerHTML = '';
        submitBtn.disabled = true;
        return;
      }
      const total = property.base_rate_cents * n + property.cleaning_fee_cents;
      priceEl.innerHTML =
        `<strong>${fmt(property.base_rate_cents)}</strong> × ${n} night${n !== 1 ? 's' : ''} + ${fmt(property.cleaning_fee_cents)} cleaning = <strong>${fmt(total)}</strong>`;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Continue to Booking →';
    }

    ciEl.addEventListener('change', updatePricing);
    coEl.addEventListener('change', updatePricing);

    document.getElementById('hbw-submit').addEventListener('click', async () => {
      const ci = document.getElementById('hbw-ci').value;
      const co = document.getElementById('hbw-co').value;
      const guests = document.getElementById('hbw-guests').value;
      const name = document.getElementById('hbw-name').value.trim();
      const email = document.getElementById('hbw-email').value.trim();
      const phone = document.getElementById('hbw-phone').value.trim();
      const errEl = document.getElementById('hbw-error');

      if (!name || !email || !phone) {
        errEl.textContent = 'Please fill in your name, email, and phone number.';
        errEl.style.display = 'block';
        return;
      }

      errEl.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating booking…';

      try {
        const res = await fetch(`${API_BASE}/${slug}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            check_in: ci, check_out: co, guest_count: Number(guests),
            guest_name: name, guest_email: email, guest_phone: phone,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          errEl.textContent = data.error || 'Something went wrong. Please try again.';
          errEl.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Continue to Booking →';
          return;
        }
        window.location.href = data.payment_url;
      } catch {
        errEl.textContent = 'Network error. Please try again.';
        errEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Continue to Booking →';
      }
    });
  }

  // ─── Init: fetch availability ─────────────────────────────────────────────
  render(true);
  fetch(`${API_BASE}/${slug}/availability`)
    .then(r => r.json())
    .then(data => {
      if (data.error) { render(false, data.error); return; }
      property = data.property;
      unavailableDates = data.unavailable ?? [];
      render(false);
    })
    .catch(() => render(false, 'Could not load booking widget. Please try again.'));
})();
