import { useState, useRef } from 'react';

const TravelAudioBook = () => {
  const [location, setLocation] = useState('');
  const [narration, setNarration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // API Keys
  const GEMINI_API_KEY = "AIzaSyBcjqdLOLIRPEZy8_opFUSO7yPnVAaHCfA";
  const ELEVENLABS_API_KEY = "sk_120b191033939c45eae675642b8dae2bdfaf66451c24312d";
  
  // API Endpoints
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB/stream";

  const generateNarration = async () => {
    if (!location.trim()) {
      setError('Please enter a location or monastery name');
      return;
    }

    setIsLoading(true);
    setError('');
    setNarration('');
    setAudioUrl('');

    try {
      // Step 1: Get narration from Gemini API
      const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{
              text: `Write a detailed travel audiobook style narration about ${location} in Sikkim. 
              Describe its history, architecture, cultural significance, and visitor experience. 
              Make it engaging and descriptive, around 200-300 words.`
            }] 
          }]
        })
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json().catch(() => null);
        throw new Error(`Gemini API error: ${geminiResponse.status}${errorData ? ` - ${errorData.error?.message || JSON.stringify(errorData)}` : ''}`);
      }

      const geminiData = await geminiResponse.json();
      const generatedNarration = geminiData.candidates[0].content.parts[0].text;
      setNarration(generatedNarration);

      // Step 2: Convert to speech using ElevenLabs API
      // FIXED: Added required headers and parameters
      const elevenLabsResponse = await fetch(ELEVENLABS_API_URL, {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg' // This header is required
        },
        body: JSON.stringify({
          text: generatedNarration,
          model_id: "eleven_monolingual_v1", // Added model_id which is required
          voice_settings: { 
            stability: 0.4, 
            similarity_boost: 0.8 
          }
        })
      });

      if (!elevenLabsResponse.ok) {
        // Get more detailed error information
        let errorDetail = 'Unknown error';
        try {
          const errorData = await elevenLabsResponse.json();
          errorDetail = errorData.detail?.message || errorData.detail || JSON.stringify(errorData);
        } catch (e) {
          errorDetail = `Status: ${elevenLabsResponse.status} ${elevenLabsResponse.statusText}`;
        }
        throw new Error(`ElevenLabs API error: ${errorDetail}`);
      }

      // Create a blob URL from the audio stream
      const audioBlob = await elevenLabsResponse.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

    } catch (err: any) {
      console.error('Error generating audio book:', err);
      setError(err.message || 'Failed to generate audio book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `${location.replace(/\s+/g, '_')}_audiobook.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-xl shadow-large p-6 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Sikkim Travel Audio Book
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                Enter Monastery or Location Name
              </label>
              <div className="flex gap-2">
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Rumtek Monastery"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  disabled={isLoading}
                />
                <button
                  onClick={generateNarration}
                  disabled={isLoading || !location.trim()}
                  className="px-6 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive-foreground rounded-lg text-sm">
                {error}
              </div>
            )}

            {narration && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Narration</h3>
                <div className="bg-muted p-4 rounded-lg max-h-60 overflow-y-auto">
                  <p className="text-foreground leading-relaxed">{narration}</p>
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Audio Book</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={handleAudioEnd}
                    className="w-full mb-4"
                  />
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors duration-200"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-secondary hover:bg-secondary-hover text-secondary-foreground font-medium rounded-lg transition-colors duration-200"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!narration && !isLoading && (
              <div className="mt-8 text-center text-muted-foreground">
                <p>Enter a monastery or location name to generate a travel audio book narration.</p>
                <p className="text-sm mt-2">Examples: Rumtek Monastery, Pemayangtse Monastery, Tsomgo Lake</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Powered by Gemini AI and ElevenLabs Text-to-Speech</p>
        </div>
      </div>
    </div>
  );
};

export default TravelAudioBook;