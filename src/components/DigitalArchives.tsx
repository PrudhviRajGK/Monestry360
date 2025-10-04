import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import manuscript1 from '@/assets/manuscript1.jpg';
import mural1 from '@/assets/mural1.jpg';
import monastery1 from '@/assets/monastery1.jpg';
import monastery2 from '@/assets/monastery2.jpg';

const DigitalArchives = () => {
  const [selectedArchive, setSelectedArchive] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{text: string, sender: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Add your Gemini API key directly here (replace the empty string)
  const API_KEY = 'AIzaSyBcjqdLOLIRPEZy8_opFUSO7yPnVAaHCfA';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';


  const archiveItems = [
    {
      id: 1,
      title: 'Ancient Tibetan Manuscript',
      category: 'Manuscript',
      date: '15th Century',
      image: manuscript1,
      description: 'Sacred Buddhist text with gold illuminations',
      descriptionLong: 'This exquisite 15th-century Tibetan manuscript contains sacred Buddhist teachings with intricate gold illuminations. The text is written in traditional Tibetan script on handmade paper derived from the bark of the daphne tree. Each page features detailed illustrations of deities and mandalas, demonstrating the exceptional craftsmanship of Himalayan artisans. The manuscript was preserved for centuries in a monastery in eastern Sikkim before being digitized for this archive.'
    },
    {
      id: 2,
      title: 'Traditional Buddhist Mural',
      category: 'Mural',
      date: '17th Century',
      image: mural1,
      description: 'Intricate mandala and deity paintings',
      descriptionLong: 'This 17th-century mural depicts a complex mandala surrounded by various Buddhist deities. Created using natural pigments on prepared clay walls, the artwork has been carefully preserved despite centuries of exposure. The central mandala represents the celestial palace of a meditational deity, while the surrounding figures include protectors, bodhisattvas, and historical teachers. This mural was originally located in the prayer hall of a remote Sikkimese monastery and represents the unique artistic style of the region.'
    },
    {
      id: 3,
      title: 'Monastery Architecture',
      category: 'Photograph',
      date: 'Contemporary',
      image: monastery1,
      description: 'Himalayan monastery with traditional design',
      descriptionLong: 'This photograph captures the traditional architecture of a Himalayan monastery in Sikkim. The building features characteristic Tibetan Buddhist design elements: whitewashed walls, ornate wooden window frames, and a golden roof. The monastery is situated at an elevation of 2,500 meters, offering breathtaking views of the surrounding mountains. This architectural style has been developed over centuries to withstand the harsh Himalayan climate while providing spiritual spaces for meditation and learning.'
    },
    {
      id: 4,
      title: 'Courtyard Documentation',
      category: 'Photograph',
      date: 'Contemporary',
      image: monastery2,
      description: 'Prayer wheels and ceremonial spaces',
      descriptionLong: 'Documentation photograph showing the courtyard of a traditional Sikkimese monastery, featuring rows of prayer wheels and ceremonial spaces. The prayer wheels are inscribed with mantras and are traditionally spun by devotees to accumulate merit and spread blessings. The courtyard serves as a gathering space for religious ceremonies and festivals. The architectural details, including the painted woodwork and stone paving, demonstrate the skilled craftsmanship of local artisans.'
    },
    {
      id: 5,
      title: 'Prayer Book Collection',
      category: 'Manuscript',
      date: '16th Century',
      image: manuscript1,
      description: 'Daily prayer texts and rituals',
      descriptionLong: 'This 16th-century collection contains daily prayer texts and ritual instructions used in Sikkimese monasteries. The manuscripts are written in Tibetan using iron gall ink on handmade paper. The collection includes texts for various ceremonies, daily prayers, and special rituals performed during Buddhist festivals. These manuscripts were essential for preserving religious practices and were traditionally passed down from teacher to student over generations.'
    },
    {
      id: 6,
      title: 'Festival Documentation',
      category: 'Photograph',
      date: 'Contemporary',
      image: monastery1,
      description: 'Annual monastery celebrations',
      descriptionLong: 'Photographic documentation of the annual festival at a Sikkimese monastery, showing monks performing cham dances in elaborate costumes and masks. These religious dances depict stories from Buddhist mythology and are believed to bring blessings and ward off negative influences. The festival attracts devotees from surrounding villages and includes rituals, prayers, and community feasts. This documentation preserves the cultural heritage of these vibrant religious celebrations.'
    }
  ];

  const categories = ['All', 'Manuscript', 'Mural', 'Photograph'];

  const filteredItems = activeCategory === 'All' 
    ? archiveItems 
    : archiveItems.filter(item => item.category === activeCategory);

  const selectedItem = archiveItems.find(item => item.id === selectedArchive);

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !selectedItem) return;
    
    // Add user message to chat history
    const userMessage = { text: chatMessage, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    
    const currentMessage = chatMessage;
    setChatMessage('');
    setIsLoading(true);
    
    // Check if API key is provided
    if (!API_KEY) {
      // Simulate API response for demo purposes
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          text: "This is a simulated response. Please add your Gemini API key to enable real AI responses. You can get one from https://aistudio.google.com/", 
          sender: 'ai' 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }
    
    try {
      // Call Gemini API
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert on Himalayan art and culture. Answer this question about the artifact: "${selectedItem.title}" - ${selectedItem.descriptionLong}. 
              Question: ${currentMessage}. 
              Provide a helpful, accurate response based on the context.`
            }]
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setChatHistory(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting to the knowledge base. Please try again later.", 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (selectedArchive) {
    return (
      <section id="digital-archives" className="py-12 px-4 bg-background min-h-screen">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <button 
            onClick={() => {
              setSelectedArchive(null);
              setChatHistory([]);
            }}
            className="flex items-center text-primary hover:text-primary-hover font-medium mb-8 transition-colors duration-200"
          >
            ← Back to Archives
          </button>

          {/* Detail View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Side - Image */}
            <div className="rounded-lg overflow-hidden shadow-large">
              <img 
                src={selectedItem?.image} 
                alt={selectedItem?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {selectedItem?.category}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedItem?.title}
              </h2>
              <p className="text-muted-foreground text-lg mb-2">{selectedItem?.date}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedItem?.descriptionLong}
              </p>
            </div>
          </div>

          {/* Chatbot Section */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Ask about this artifact</h3>
            {!API_KEY && (
              <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                <p className="font-medium">Note: Gemini API key not configured</p>
                <p>To enable real AI responses, add your API key to the API_KEY variable in DigitalArchives.tsx</p>
                <p className="mt-1">Get a free API key from: https://aistudio.google.com/</p>
              </div>
            )}
            <div className="bg-card rounded-lg shadow-medium p-4">
              <div className="h-48 overflow-y-auto mb-4 p-3 bg-muted rounded">
                {chatHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-16">
                    Ask me anything about this artifact...
                  </p>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg max-w-[80%] ${
                          msg.sender === 'user' 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                        style={{ 
                          marginLeft: msg.sender === 'ai' ? '0' : 'auto',
                          marginRight: msg.sender === 'ai' ? 'auto' : '0'
                        }}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="p-3 rounded-lg bg-secondary text-secondary-foreground w-fit">
                        Thinking...
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !chatMessage.trim()}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="digital-archives" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Digital Archives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully preserved collection of manuscripts, murals, 
            and photographic documentation from Sikkim's most sacred monasteries.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="bg-card shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => setSelectedArchive(item.id)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{item.date}</p>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                <button className="mt-4 text-primary hover:text-primary-hover font-medium text-sm transition-colors duration-200">
                  View Details →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-lg shadow-medium transition-all duration-300 transform hover:scale-105">
            Load More Archives
          </button>
        </div>
      </div>
    </section>
  );
};

export default DigitalArchives;