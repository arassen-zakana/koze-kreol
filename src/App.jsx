
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const dictionary = {
  creole_to_english: {
    "mo": "I", "pa": "not", "tro": "too", "konpran": "understand", "eski": "is it that", "to": "you", "kapav": "can", "explike": "explain"
  },
  creole_to_french: {
    "mo": "je", "pa": "pas", "tro": "trop", "konpran": "comprendre", "eski": "est-ce que", "to": "tu", "kapav": "peux", "explike": "expliquer"
  },
  english_to_creole: {
    "i": "mo", "don't": "pa", "understand": "konpran", "can": "kapav", "you": "to", "explain": "explike"
  },
  french_to_creole: {
    "je": "mo", "pas": "pa", "trop": "tro", "comprendre": "konpran", "peux": "kapav", "tu": "to", "expliquer": "explike"
  }
};

export default function KozeKreolTranslator() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [mode, setMode] = useState("creole_to_english");

  const translate = () => {
    const dict = dictionary[mode];
    const translated = inputText
      .toLowerCase()
      .split(/\s+/)
      .map((word) => dict[word.replace(/[^\w]/g, "")] || `[${word}]`)
      .join(" ");
    setTranslatedText(translated);
  };

  const handleSuggestionSubmit = () => {
    if (suggestion.trim()) {
      console.log("User suggestion:", suggestion);
      alert("Thank you for your feedback! (Logged in console)");
      setSuggestion("");
    }
  };

  const getModeLabel = (m) => {
    switch (m) {
      case "creole_to_english": return "Creole → English";
      case "creole_to_french": return "Creole → French";
      case "english_to_creole": return "English → Creole";
      case "french_to_creole": return "French → Creole";
      default: return m;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Koze Kreol Translator</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            {getModeLabel(mode)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {Object.keys(dictionary).map((m) => (
            <DropdownMenuItem key={m} onSelect={() => setMode(m)}>
              {getModeLabel(m)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Textarea
        placeholder="Type your sentence..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <Button onClick={translate} className="w-full">
        Translate
      </Button>

      <Card>
        <CardContent className="p-4 whitespace-pre-wrap">
          {translatedText || "Your translation will appear here..."}
        </CardContent>
      </Card>

      <Textarea
        placeholder="Suggest a better translation (optional)..."
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        className="mt-4"
      />

      <Button onClick={handleSuggestionSubmit} className="w-full" variant="secondary">
        Submit Suggestion
      </Button>
    </div>
  );
}
