/**
 * WISE.JS — TravelWise24
 * AI assistant powered by Claude.
 * Handles chat, voice input, and voice output.
 */

const Wise = (() => {

  let isLoading = false;
  let recognition = null;
  let currentSpeech = null;

  // ============================
  // SYSTEM PROMPT
  // ============================

  const SYSTEM_PROMPT = `You are Wise — the friendly, knowledgeable personal travel and lifestyle advisor for TravelWise24.

WHO YOU'RE TALKING TO:
Your users are primarily Nigerians and Africans living in Ireland or the UK. They are busy professionals — nurses, healthcare workers, tech workers, finance professionals. They are not backpackers. They want quality and value. They send money home but they also invest in good experiences. They celebrate hard. They travel intentionally. Many are in relationships, some long-distance. They miss home.

YOUR PERSONALITY:
- Warm, genuine, and friendly — like a smart friend who happens to know a lot about travel
- Conversational and natural — not corporate, not stiff
- You understand the diaspora experience. You get it.
- Practical and specific. Don't waffle. Give real advice.
- The odd emoji is fine. Don't overdo it.
- Keep responses focused — 2–3 short paragraphs max.
- Always end with a follow-up question or next step.

WHAT YOU HELP WITH:
1. Going Home (Nigeria, Ghana, Kenya, and other African countries) — best times to fly, price advice, airlines, stopovers, what to expect
2. Weekend Escapes from Dublin or London — European city breaks, sun destinations, short flights
3. Weekend Vibes — nightlife, Afrobeats events, African restaurants, good bars, activities
4. General travel advice — visas, packing, booking strategy, timing

IMPORTANT KNOWLEDGE:
- From Dublin, good African routes go via Istanbul (Turkish Airlines), Addis Ababa (Ethiopian), Amsterdam (KLM), or Paris (Air France/Transavia)
- From London, direct flights to Lagos (LOS), Abuja (ABV), Accra (ACC) are available with British Airways, Virgin, and Air Peace
- December flights to Nigeria get expensive — people should book by September for Christmas travel
- Short European escapes from Dublin: Lisbon, Porto, Malaga, Barcelona, Rome, Amsterdam — all under 3 hours
- London escapes: Madrid, Lisbon, Paris, Barcelona, Dubai (popular with the African community there)
- Afrobeats scene in Dublin: Opium, District 8, The Academy
- Nigerian restaurants in London: Ikoyi, Chuku's, Akoko, 805 Restaurant
- Schengen visa: Irish residents need to check their visa status for European travel
- Budget advice: return flights to Nigeria typically €650–€950 from Dublin, £500–£780 from London

TONE EXAMPLES:
❌ "I'd be happy to assist you with your travel inquiry."
✅ "Okay so Lagos in December — you need to move on that now if you haven't booked already."

❌ "There are several options for your consideration."
✅ "Honestly? Turkish Airlines via Istanbul is usually your best bet from Dublin. Ethiopian is good too."

Remember: you're not a booking agent. You're that friend who's always on top of flight deals and knows where to go.`;

  // ============================
  // SEND MESSAGE TO CLAUDE
  // ============================

  async function send(userMessage) {
    if (!userMessage.trim() || isLoading) return;

    isLoading = true;
    document.getElementById('wiseSend').disabled = true;

    // Add user message to UI
    addMessageToUI(userMessage, 'user');

    // Add to state history
    State.addWiseMessage('user', userMessage);

    // Show typing
    showTyping();

    // Build conversation for Claude
    const history = State.get('wiseConversation').slice(-10); // last 10 messages
    const messages = history.map(m => ({ role: m.role, content: m.content }));
    // Make sure last message is the current one
    if (messages.length === 0 || messages[messages.length - 1].content !== userMessage) {
      // Already added above, so just use history
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: messages
        })
      });

      const data = await response.json();
      removeTyping();

      const reply = data.content?.[0]?.text || "Sorry, something went wrong on my end. Give me a second and try again!";

      addMessageToUI(reply, 'ai');
      State.addWiseMessage('assistant', reply);

      // Auto speak
      setTimeout(() => speakText(reply), 200);

    } catch (err) {
      removeTyping();
      addMessageToUI("Hmm, I couldn't connect right now. Check your connection and try again!", 'ai');
    }

    isLoading = false;
    document.getElementById('wiseSend').disabled = false;
  }

  // ============================
  // UI MESSAGE RENDERING
  // ============================

  function addMessageToUI(text, role) {
    const container = document.getElementById('wiseMessages');

    // Remove welcome screen on first real message
    const welcome = container.querySelector('.wise-welcome');
    if (welcome) welcome.remove();

    const msgEl = document.createElement('div');
    msgEl.className = `wise-msg ${role === 'user' ? 'user' : 'ai'}`;

    const avatar = `<div class="msg-av ${role === 'user' ? 'human' : 'ai'}">${role === 'user' ? '👤' : '✈️'}</div>`;

    let actionsHtml = '';
    if (role === 'ai') {
      actionsHtml = `
        <div class="msg-actions">
          <button class="msg-speak-btn" onclick="Wise.speakText(this.closest('.wise-msg').querySelector('.msg-bubble').textContent, this)">🔊 Hear this</button>
        </div>
      `;
    }

    msgEl.innerHTML = `
      ${avatar}
      <div class="msg-content">
        <div class="msg-bubble">${text}</div>
        ${actionsHtml}
      </div>
    `;

    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
  }

  function showTyping() {
    const container = document.getElementById('wiseMessages');
    const el = document.createElement('div');
    el.className = 'typing-msg';
    el.id = 'wiseTyping';
    el.innerHTML = `
      <div class="msg-av ai">✈️</div>
      <div class="typing-dots">
        <div class="td"></div><div class="td"></div><div class="td"></div>
      </div>
    `;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('wiseTyping');
    if (el) el.remove();
  }

  function renderWelcome() {
    const container = document.getElementById('wiseMessages');
    const location = State.get('locationDisplay');
    const hour = new Date().getHours();
    const greetings = [
      `Hey! What's on your mind today?`,
      `Long week? Let me help you plan something 🔥`,
      `Where do you want to escape to?`,
      `Looking for vibes in ${location} tonight?`,
      `Planning the trip home? Let's sort it.`
    ];

    const msg = greetings[Math.floor(Math.random() * greetings.length)];

    container.innerHTML = `
      <div class="wise-welcome">
        <div class="wise-welcome-emoji">✈️</div>
        <h3>I'm Wise</h3>
        <p>${msg}</p>
        <div class="wise-chips">
          <button class="wise-chip" onclick="Wise.sendChip('I want to go to Lagos — best time and price?')">🏠 Going to Lagos</button>
          <button class="wise-chip" onclick="Wise.sendChip('I need a weekend escape from ${location}')">✈️ Weekend escape</button>
          <button class="wise-chip" onclick="Wise.sendChip('What are the best Afrobeats spots in ${location}?')">🎵 Afrobeats tonight</button>
          <button class="wise-chip" onclick="Wise.sendChip('I need to relax — where should I go?')">😮‍💨 Need to unwind</button>
          <button class="wise-chip" onclick="Wise.sendChip('Best African restaurants in ${location}?')">🍽️ African food</button>
          <button class="wise-chip" onclick="Wise.sendChip('When should I book December flights to Nigeria?')">🎄 Christmas flights</button>
        </div>
      </div>
    `;
  }

  function sendChip(text) {
    document.getElementById('wiseInput').value = text;
    send(text);
    document.getElementById('wiseInput').value = '';
  }

  // ============================
  // VOICE OUTPUT (Text to Speech)
  // ============================

  function speakText(text, btn) {
    if (!window.speechSynthesis) return;

    // Stop current if playing
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.querySelectorAll('.msg-speak-btn').forEach(b => {
        b.classList.remove('speaking');
        b.textContent = '🔊 Hear this';
      });
      document.getElementById('wiseStatus').textContent = 'Your personal escape advisor';
      if (btn && btn._wasThis) { btn._wasThis = false; return; }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Pick a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Samantha') || v.name.includes('Karen') ||
      v.name.includes('Daniel') || v.name.includes('Google UK') ||
      v.name.includes('Moira')
    );
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      if (btn) { btn.classList.add('speaking'); btn.textContent = '⏹ Stop'; btn._wasThis = true; }
      document.getElementById('wiseStatus').textContent = '🔊 Speaking...';
    };

    utterance.onend = () => {
      if (btn) { btn.classList.remove('speaking'); btn.textContent = '🔊 Hear this'; btn._wasThis = false; }
      document.getElementById('wiseStatus').textContent = 'Your personal escape advisor';
    };

    window.speechSynthesis.speak(utterance);
  }

  // ============================
  // VOICE INPUT (Speech to Text)
  // ============================

  function toggleMic() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input works best in Chrome. Try typing instead!');
      return;
    }

    if (recognition) {
      recognition.stop();
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-GB';

    recognition.onstart = () => {
      document.getElementById('wiseMic').classList.add('listening');
      document.getElementById('wiseVoiceBar').classList.remove('hidden');
    };

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      document.getElementById('wiseInput').value = transcript;
      autoResize(document.getElementById('wiseInput'));
    };

    recognition.onend = () => {
      document.getElementById('wiseMic').classList.remove('listening');
      document.getElementById('wiseVoiceBar').classList.add('hidden');
      recognition = null;
      const val = document.getElementById('wiseInput').value.trim();
      if (val) {
        send(val);
        document.getElementById('wiseInput').value = '';
      }
    };

    recognition.onerror = () => {
      document.getElementById('wiseMic').classList.remove('listening');
      document.getElementById('wiseVoiceBar').classList.add('hidden');
      recognition = null;
    };

    recognition.start();
  }

  // ============================
  // INPUT HELPERS
  // ============================

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const val = document.getElementById('wiseInput').value.trim();
      if (val) {
        send(val);
        document.getElementById('wiseInput').value = '';
        autoResize(document.getElementById('wiseInput'));
      }
    }
  }

  // Load voices on init
  window.speechSynthesis && window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.speechSynthesis.getVoices();
  });

  return { send, sendChip, speakText, toggleMic, autoResize, handleKey, renderWelcome };

})();