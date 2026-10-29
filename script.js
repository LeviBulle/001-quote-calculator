'use strict';

const services = {
  basic: { label: 'Basic maintenance', price: 25 },
  full: { label: 'Full maintenance', price: 55 },
  ebike: { label: 'E-bike maintenance', price: 75 },
};
const extras = {
  tyre: { label: 'Tyre replacement', price: 12 },
  brakes: { label: 'Brake adjustment', price: 18 },
};
const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
const form = document.querySelector('#quote-form');
const summaryItems = document.querySelector('#summary-items');
const totalElement = document.querySelector('#total');

function updateEstimate() {
  const selected = form.querySelector('input[name="service"]:checked');
  summaryItems.replaceChildren();

  if (!selected) {
    const message = document.createElement('p');
    message.className = 'empty-state';
    message.textContent = 'Choose a main service to see your estimate here.';
    summaryItems.append(message);
    totalElement.textContent = '—';
    return;
  }

  const items = [services[selected.value], ...Array.from(
    form.querySelectorAll('input[name="extra"]:checked'),
    input => extras[input.value],
  )];

  for (const item of items) {
    const row = document.createElement('div');
    row.className = 'summary-item';
    const label = document.createElement('span');
    const price = document.createElement('span');
    label.textContent = item.label;
    price.textContent = currency.format(item.price);
    row.append(label, price);
    summaryItems.append(row);
  }

  totalElement.textContent = currency.format(items.reduce((total, item) => total + item.price, 0));
}

form.addEventListener('change', updateEstimate);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (form.reportValidity()) updateEstimate();
});
document.querySelector('#year').textContent = new Date().getFullYear();
updateEstimate();
