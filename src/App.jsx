import React, { useState } from 'react';

const dictionary = {
  creole_to_english: {
    mo: 'I', pa: 'not', tro: 'too', konpran: 'understand', eski: 'is it that', to: 'you', kapav: 'can', explike: 'explain'
  },
  creole_to_french: {
    mo: 'je', pa: 'pas', tro: 'trop', konpran: 'comprendre', eski: 'est-ce que', to: 'tu', kapav: 'peux', explike: 'expliquer'
  },
  english_to_creole: {
    i: 'mo', "don't": 'pa', understand: 'konpran', can: 'kapav', you: 'to', explain: 'explike'
  },
  french_to_creole: {
    je: 'mo', pas: 'pa', trop: 'tro', comprendre: 'konpran', peux: 'kapav', tu: 'to', expliquer: 'explike'
  }
};

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [mode, setMode] = useState('creole_to_english');

  const translate = () => {
    const dict = dictionary[mode];
    const translated = inputText
      .toLowerCase()
      .split(/\s+/)
      .map(word => dict[word.replace(/[^\w]/g, '')] || `[${word}]`)
      .join(' ');
    setTranslatedText(translated);
  };

  const handleSuggestionSubmit = () => {
    if (suggestion.trim()) {
      console.log('User suggestion:', suggestion);
      alert('Thank you for your feedback! (Logged in console)');
      setSuggestion('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🗣️ Koze Kreol Translator</h1>

      <div style={{ marginBottom: '1rem' }}>
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        >
          <option value="creole_to_english">Creole → English</option>
          <option value="creole_to_french">Creole → French</option>
          <option value="english_to_creole">English → Creole</option>
          <option value="french_to_creole">French → Creole</option>
        </select>
      </div>

      <textarea
        placeholder="Type your sentence..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <button
        onClick={translate}
        style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Translate
      </button>

      <div style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '60px', marginBottom: '1rem', backgroundColor: '#f9f9f9' }}>
        {translatedText || 'Your translation will appear here...'}
      </div>

      <textarea
        placeholder="Suggest a better translation (optional)..."
        value={suggestion}
        onChange={e => setSuggestion(e.target.value)}
        rows={2}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      />
      <button
        onClick={handleSuggestionSubmit}
        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#eaeaea', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        Submit Suggestion
      </button>
    </div>
  );
}

export default App;
