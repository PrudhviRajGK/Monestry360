import { useState } from 'react';

const AISearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock function to simulate API call - Replace with real API call
  const mockGeminiAPI = async (query: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses based on query
    const responses: Record<string, any> = {
      'rumtek monastery history': {
        title: "Rumtek Monastery History",
        content: "Rumtek Monastery, also known as the Dharma Chakra Centre, is one of the most significant monasteries in Sikkim. Established in the 16th century by Wangchuk Dorje, the 9th Karmapa Lama, it serves as the seat of the Karma Kagyu lineage outside Tibet. The monastery was rebuilt in the 1960s after the 16th Karmapa fled Tibet. It features traditional Tibetan architecture, sacred murals, and houses precious relics including the Golden Stupa containing the remains of the 16th Karmapa.",
        relevance: 'high',
        category: 'History'
      },
      'buddhist festivals in sikkim': {
        title: "Buddhist Festivals in Sikkim",
        content: "Sikkim celebrates several vibrant Buddhist festivals throughout the year. Losar (Tibetan New Year) features mask dances and prayers. Saga Dawa commemorates Buddha's enlightenment with processions around Gangtok. Pang Lhabsol unique to Sikkim honors Mount Kangchenjunga as the guardian deity. Tihar (Deepawali) includes worship of animals. These festivals showcase Cham dances, ritual music, and elaborate rituals that attract both devotees and tourists.",
        relevance: 'high',
        category: 'Culture'
      },
      'meditation practices': {
        title: "Meditation Practices in Sikkim Monasteries",
        content: "Sikkimese monasteries follow Tibetan Buddhist meditation practices. These include Samatha (calm abiding) for developing concentration, Vipassana (insight) for wisdom cultivation, and Deity Yoga for visualizing enlightened beings. Monks practice chanting, mandala creation, and ritual instruments. Retreats often last 3 years, 3 months, and 3 days in isolated hermitages. The practices aim to develop compassion, wisdom, and ultimately achieve enlightenment for the benefit of all beings.",
        relevance: 'medium',
        category: 'Practices'
      },
      'monastery architecture': {
        title: "Monastery Architecture in Sikkim",
        content: "Sikkimese monasteries feature distinct Tibetan Buddhist architecture. Key elements include: prayer halls with intricate murals, stupas (chortens) representing Buddha's mind, prayer wheels encircling structures, and colorful gateways. Buildings are often whitewashed with golden roofs. Interiors contain thangka paintings, statues of deities, and ceremonial objects. Rumtek Monastery exemplifies this style with its multi-level design, central courtyard, and detailed woodwork.",
        relevance: 'high',
        category: 'Architecture'
      },
      'prayer wheel significance': {
        title: "Prayer Wheel Significance",
        content: "Prayer wheels are cylindrical devices containing mantras, most commonly 'Om Mani Padme Hum'. Spinning them accumulates merit and wisdom, equivalent to reciting the prayers. Larger wheels line monastery paths while handheld versions are for personal use. The practice symbolizes turning the wheel of Dharma. Sikkim's monasteries feature both manual and water-powered prayer wheels. Devotees circumambulate clockwise while spinning wheels to purify negative karma and generate compassion.",
        relevance: 'medium',
        category: 'Symbolism'
      }
    };
    
    return responses[query.toLowerCase()] || {
      title: `Results for "${query}"`,
      content: "Sikkim's monasteries represent rich Buddhist heritage. They serve as spiritual centers, educational institutions, and cultural preservers. Most follow either the Nyingma or Kagyu traditions of Tibetan Buddhism. These sacred spaces feature intricate art, ancient manuscripts, and continue age-old rituals. Visitors can observe monks in debate, prayer ceremonies, and mandala creation. The peaceful ambiance provides respite from modern life and offers insight into Himalayan Buddhist culture.",
      relevance: 'medium',
      category: 'General'
    };
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');
    setSearchResults([]);
    
    try {
      // Use mock function for demonstration (comment out the real API call)
      const result = await mockGeminiAPI(searchQuery);
      setSearchResults([result]);
    } catch (err) {
      setError('Search failed. Please check your API key and try again. ' + 
               'If you don\'t have an API key, this demo uses mock data for these example queries: ' + 
               'Rumtek Monastery history, Buddhist festivals in Sikkim, Meditation practices, ' +
               'Monastery architecture, Prayer wheel significance');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exampleQueries = [
    'Rumtek Monastery history',
    'Buddhist festivals in Sikkim',
    'Meditation practices',
    'Monastery architecture',
    'Prayer wheel significance'
  ];

  return (
    <section id="ai-search" style={{
      padding: '5rem 1rem',
      background: 'linear-gradient(to bottom, #f0f9ff, #ffffff)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '56rem',
        margin: '0 auto'
      }}>
        <div style={{textAlign: 'center', marginBottom: '4rem'}}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            AI-Powered Monastery Search
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#4b5563',
            maxWidth: '36rem',
            margin: '0 auto'
          }}>
            Discover insights about Sikkim's monasteries using advanced AI. 
            Search for information about history, rituals, architecture, and cultural practices.
          </p>
        </div>

        {/* Search Interface */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          padding: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <input
              type="text"
              placeholder="Ask about monasteries, festivals, rituals, or Buddhist practices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                flex: 1,
                fontSize: '1.125rem',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none'
              }}
              className="focus-ring"
            />
            <button 
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                backgroundColor: isLoading || !searchQuery.trim() ? '#9ca3af' : '#2563eb',
                color: 'white',
                borderRadius: '0.5rem',
                cursor: isLoading || !searchQuery.trim() ? 'not-allowed' : 'pointer',
                border: 'none'
              }}
            >
              {isLoading ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <div style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>

          {/* Example Queries */}
          <div style={{marginBottom: '1rem'}}>
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem'}}>
              Try searching for:
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(query)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    fontSize: '0.875rem',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
            padding: '1.5rem'
          }}>
            <p style={{color: '#dc2626', fontWeight: '500'}}>{error}</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div style={{marginTop: '1.5rem'}}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Search Results
            </h3>
            {searchResults.map((result, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '1.5rem',
                padding: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  gap: '0.5rem'
                }}>
                  <h4 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1f2937'
                  }}>
                    {result.title}
                  </h4>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '9999px',
                      backgroundColor: result.relevance === 'high' ? '#dcfce7' : 
                                      result.relevance === 'medium' ? '#fef3c7' : 
                                      '#dbeafe',
                      color: result.relevance === 'high' ? '#166534' : 
                            result.relevance === 'medium' ? '#92400e' : 
                            '#1e40af'
                    }}>
                      {result.relevance} relevance
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '9999px'
                    }}>
                      {result.category}
                    </span>
                  </div>
                </div>
                <div>
                  <p style={{
                    color: '#374151',
                    lineHeight: '1.75'
                  }}>
                    {result.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          marginTop: '4rem'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#dbeafe',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <span style={{fontSize: '1.5rem'}}>🧠</span>
            </div>
            <h4 style={{
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Intelligent Analysis
            </h4>
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563'
            }}>
              AI understands context and provides relevant cultural insights
            </p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#dbeafe',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <span style={{fontSize: '1.5rem'}}>🌐</span>
            </div>
            <h4 style={{
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Cultural Expertise
            </h4>
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563'
            }}>
              Specialized knowledge about Sikkim's monastic traditions
            </p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#dbeafe',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <span style={{fontSize: '1.5rem'}}>⚡</span>
            </div>
            <h4 style={{
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Real-time Results
            </h4>
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563'
            }}>
              Get instant answers about monastery culture and practices
            </p>
          </div>
        </div>

        {/* API Instructions */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          backgroundColor: '#fffbeb',
          borderRadius: '0.5rem',
          border: '1px solid #fcd34d'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#92400e',
            marginBottom: '0.5rem'
          }}>
            
          </h3>
          <p style={{color: '#92400e', marginBottom: '0.5rem'}}>
            To use with the actual Gemini API:
          </p>
          <ol style={{color: '#92400e', paddingLeft: '1.5rem', listStyleType: 'decimal'}}>
            <li>Get a free API key from Google AI Studio</li>
            <li>Replace the mock API call with the real implementation (commented code in handleSearch)</li>
            <li>Use the correct endpoint: <code>https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY</code></li>
            <li>Make sure to enable the Gemini API in your Google Cloud Console</li>
          </ol>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        button:hover {
          opacity: 0.9;
        }
        .focus-ring:focus {
          ring: 2px solid #3b82f6;
          border-color: #3b82f6;
        }
        @media (min-width: 768px) {
          #ai-search > div > div:first-child {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          #ai-search > div > div:first-child > div {
            flex-direction: row;
          }
        }
      `}</style>
    </section>
  );
};

export default AISearchSection;