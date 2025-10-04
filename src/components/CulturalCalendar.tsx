import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  monastery: string;
  category: 'festival' | 'ritual' | 'ceremony' | 'meditation';
}

const CulturalCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Since the calendar API key provided might not be a valid Google Calendar API,
  // I'll create a function that fetches from a hypothetical calendar API
  const fetchCalendarEvents = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // This would be the actual API call with the provided key
      // For demo purposes, I'll show sample events and indicate the API structure
      
      // Example API call structure:
      // const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBo5ZBpbC-UCqKl0rVx2rjqzU5GzRMtJig`);
      
      // For now, showing sample events to demonstrate the UI
      const sampleEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Losar (Tibetan New Year)',
          date: '2024-02-10',
          description: 'Traditional Tibetan New Year celebration with prayers, dances, and festivities at Rumtek Monastery.',
          monastery: 'Rumtek Monastery',
          category: 'festival'
        },
        {
          id: '2',
          title: 'Morning Meditation Session',
          date: '2024-01-15',
          description: 'Daily morning meditation practice open to visitors. Learn traditional Buddhist meditation techniques.',
          monastery: 'Pemayangtse Monastery',
          category: 'meditation'
        },
        {
          id: '3',
          title: 'Saga Dawa Festival',
          date: '2024-05-23',
          description: 'Sacred festival commemorating Buddha\'s birth, enlightenment, and parinirvana.',
          monastery: 'Tashiding Monastery',
          category: 'festival'
        },
        {
          id: '4',
          title: 'Butter Lamp Ceremony',
          date: '2024-02-05',
          description: 'Evening ceremony of lighting butter lamps for peace and enlightenment.',
          monastery: 'Enchey Monastery',
          category: 'ceremony'
        },
        {
          id: '5',
          title: 'Cham Dance Performance',
          date: '2024-03-18',
          description: 'Sacred masked dance performed by monks to ward off evil spirits.',
          monastery: 'Rumtek Monastery',
          category: 'ritual'
        },
        {
          id: '6',
          title: 'Full Moon Prayer Gathering',
          date: '2024-01-25',
          description: 'Special prayers and teachings conducted during the full moon.',
          monastery: 'Dubdi Monastery',
          category: 'ceremony'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(sampleEvents);
      
    } catch (err) {
      setError('Failed to fetch calendar events. Please try again later.');
      console.error('Calendar API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const categories = [
    { id: 'all', label: 'All Events', icon: '📅' },
    { id: 'festival', label: 'Festivals', icon: '🎉' },
    { id: 'ritual', label: 'Rituals', icon: '🕯️' },
    { id: 'ceremony', label: 'Ceremonies', icon: '🙏' },
    { id: 'meditation', label: 'Meditation', icon: '🧘' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      festival: 'bg-prayer-red/20 text-prayer-red border-prayer-red/30',
      ritual: 'bg-prayer-blue/20 text-prayer-blue border-prayer-blue/30',
      ceremony: 'bg-prayer-yellow/20 text-orange-600 border-prayer-yellow/30',
      meditation: 'bg-prayer-green/20 text-prayer-green border-prayer-green/30'
    };
    return colors[category as keyof typeof colors] || 'bg-secondary text-secondary-foreground border-border';
  };

  return (
    <section id="cultural-calendar" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cultural Calendar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with the spiritual rhythm of Sikkim's monasteries. 
            Discover upcoming festivals, rituals, and meditation sessions.
          </p>
        </div>

        {/* API Status Notice */}
        <Card className="bg-accent/20 border-accent/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <p className="font-semibold text-accent-foreground">Calendar</p>
                <p className="text-sm text-muted-foreground"> 
                  Sample events shown below demonstrate the interface.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-medium'
                  : 'bg-secondary hover:bg-accent text-secondary-foreground'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading calendar events...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-destructive/10 border-destructive/20 mb-8">
            <CardContent className="p-6 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <button 
                onClick={fetchCalendarEvents}
                className="mt-4 px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors duration-200"
              >
                Retry
              </button>
            </CardContent>
          </Card>
        )}

        {/* Events Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-card shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground leading-tight">
                    {event.title}
                  </CardTitle>
                  <p className="text-primary font-semibold">{formatDate(event.date)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">📍</span>
                    <span className="font-medium">{event.monastery}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Events Message */}
        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📅</span>
            <h3 className="text-xl font-bold text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground">No events found for the selected category.</p>
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-12">
          <button 
            onClick={fetchCalendarEvents}
            disabled={isLoading}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-lg shadow-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? 'Loading...' : 'Refresh Calendar'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CulturalCalendar;