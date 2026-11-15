const performer = document.getElementById('performer');
const fruit = document.getElementById('fruit');
const fruitName = document.getElementById('fruitName');
const statusEl = document.getElementById('status');
const actionText = document.getElementById('actionText');
const toast = document.getElementById('toast');
const feed = document.getElementById('feed');
const stage = document.getElementById('stage');

let currentRun = 0;
let toastTimer;
let resetTimer;

document.querySelectorAll('.character').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.character').forEach(b =>
      b.classList.remove('active')
    );

    btn.classList.add('active');
    fruit.textContent = btn.dataset.fruit;
    fruitName.textContent = btn.dataset.name;

    performer.classList.remove(
      'dancing', 'singing', 'special', 'spinning'
    );

    statusEl.textContent = 'ဖျော်ဖြေရန် အသင့်ဖြစ်နေသည်';
    actionText.textContent =
      btn.dataset.name + ' ကို ရွေးချယ်ထားသည်။ လက်ဆောင်ပို့ပါ!';
  });
});

function effects(symbol, count) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement('span');
    item.className = 'gift-particle';
    item.textContent = symbol;

    item.style.setProperty(
      '--x', (Math.random() * 300 - 150) + 'px'
    );
    item.style.setProperty(
      '--y', (Math.random() * 240 - 120) + 'px'
    );
    item.style.setProperty(
      '--delay', (Math.random() * 0.4) + 's'
    );

    stage.appendChild(item);
    setTimeout(() => item.remove(), 2300);
  }
}

function runGift(action, label) {
  currentRun++;
  const run = currentRun;

  performer.classList.remove(
    'dancing', 'singing', 'special', 'spinning'
  );

  void performer.offsetWidth;

  let message = '';
  let status = '';
  let symbol = '💖';

  if (action === 'sing') {
    performer.classList.add('singing');
    message = '🎤 ' + fruitName.textContent + ' သီချင်းဆိုနေပါပြီ!';
    status = '🎤 သီချင်းဆိုနေသည်';
    symbol = '🎵';
    effects('🎵', 18);
    effects('💖', 8);

  } else if (action === 'special') {
    performer.classList.add('special');
    message = '💎 ' + fruitName.textContent + ' ရဲ့ အထူးဖျော်ဖြေမှု!';
    status = '✨ အထူးဖျော်ဖြေနေသည်';
    symbol = '💎';
    effects('💎', 20);
    effects('⭐', 20);
    effects('✨', 15);

  } else if (action === 'spin') {
    performer.classList.add('spinning');
    message = '⭐ ' + fruitName.textContent + ' လှည့်ကနေပါပြီ!';
    status = '⭐ လှည့်ကနေသည်';
    symbol = '⭐';
    effects('⭐', 16);

  } else {
    performer.classList.add('dancing');
    message = '🌹 ' + fruitName.textContent + ' ပျော်ပျော်ရွှင်ရွှင် ကနေပါပြီ!';
    status = '💃 ကခုန်နေသည်';
    symbol = '🌹';
    effects('🌹', 18);
  }

  statusEl.textContent = status;
  actionText.textContent = message;

  toast.textContent = label + ' လက်ဆောင်ရရှိပါပြီ!';
  toast.classList.add('show');

  clearTimeout(toastTimer);
  clearTimeout(resetTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);

  resetTimer = setTimeout(() => {
    if (run === currentRun) {
      performer.classList.remove(
        'dancing', 'singing', 'special', 'spinning'
      );

      statusEl.textContent = 'ဖျော်ဖြေရန် အသင့်ဖြစ်နေသည်';
      actionText.textContent =
        'နောက်ထပ်လက်ဆောင်ပို့ပြီး ဖျော်ဖြေမှုကို ကြည့်ပါ!';
    }
  }, 5000);

  if (
    feed.children.length === 1 &&
    feed.children[0].textContent.includes('စနစ်စတင်')
  ) {
    feed.innerHTML = '';
  }

  const li = document.createElement('li');
  const activity = {
    dance: 'ကခုန်',
    spin: 'လှည့်က',
    sing: 'သီချင်းဆို',
    special: 'အထူးဖျော်ဖြေ'
  };

  li.textContent =
    new Date().toLocaleTimeString() +
    ' — ' + fruitName.textContent +
    ' — ' + label +
    ' → ' + activity[action];

  feed.prepend(li);

  while (feed.children.length > 10) {
    feed.lastChild.remove();
  }
}

document.querySelectorAll('.gift').forEach(btn => {
  btn.addEventListener('click', () => {
    runGift(
      btn.dataset.action,
      btn.querySelector('b').textContent
    );
  });
});
