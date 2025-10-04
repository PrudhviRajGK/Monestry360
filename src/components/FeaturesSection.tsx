import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📜',
      title: 'Digital Archives',
      description: 'Explore thousands of digitized manuscripts, murals, and historical documents preserved from centuries-old monasteries.',
      highlights: ['Scanned Manuscripts', 'Historical Murals', 'Sacred Texts', 'Ancient Documents']
    },
    {
      icon: '🔍',
      title: 'AI-Powered Search',
      description: 'Advanced AI technology helps tourists and researchers quickly find specific content across our vast digital collection.',
      highlights: ['Intelligent Search', 'Multi-language Support', 'Image Recognition', 'Contextual Results']
    },
    {
      icon: '📅',
      title: 'Cultural Calendar',
      description: 'Stay updated with monastery events, festivals, and spiritual rituals happening throughout the year.',
      highlights: ['Festival Dates', 'Ritual Schedules', 'Special Events', 'Seasonal Celebrations']
    },
    {
      icon: '🎫',
      title: 'Booking & Participation',
      description: 'Reserve your spot for monastery visits, meditation sessions, and cultural events with our easy booking system.',
      highlights: ['Visit Reservations', 'Event Participation', 'Guided Tours', 'Meditation Sessions']
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gradient-mountain">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preserving Sacred Heritage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform brings together centuries of monastic wisdom, 
            making it accessible to scholars, pilgrims, and cultural enthusiasts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full bg-card shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;