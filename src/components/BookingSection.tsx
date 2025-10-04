import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    event: '',
    monastery: '',
    participants: '1',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const monasteries = [
    'Rumtek Monastery',
    'Pemayangtse Monastery',
    'Tashiding Monastery',
    'Enchey Monastery',
    'Dubdi Monastery',
    'Khecheopalri Monastery'
  ];

  const eventTypes = [
    'Monastery Visit',
    'Meditation Session',
    'Cultural Festival',
    'Prayer Ceremony',
    'Guided Tour',
    'Photography Session'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Replace these with your actual EmailJS credentials
      const serviceID = 'service_b46e71i';
      const templateID = 'template_vmmtf45';
      const publicKey = 'pIcOSv0oubn28HzAI';
      
      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, {
        to_name: 'Monastery Admin',
        from_name: formData.name,
        from_email: formData.email,
        date: formData.date,
        event: formData.event,
        monastery: formData.monastery,
        participants: formData.participants,
        message: formData.message,
        reply_to: formData.email
      }, publicKey);
      
      console.log('Booking form submitted and email sent:', formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          date: '',
          event: '',
          monastery: '',
          participants: '1',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Sorry, there was an error submitting your booking. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.date && formData.event && formData.monastery;

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 px-4 bg-gradient-mountain">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card shadow-large">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-6">🙏</div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Booking Request Submitted!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for your interest in visiting our monasteries. We will contact you soon to confirm your booking.
              </p>
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-mountain">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Booking & Participation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reserve your spiritual journey to Sikkim's sacred monasteries. 
            Join us for meditation sessions, cultural events, and guided tours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card shadow-large">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Book Your Visit
                </CardTitle>
                <p className="text-muted-foreground">
                  Please fill out this form to request a booking. We'll contact you to confirm details.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Date *
                      </label>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Participants
                      </label>
                      <select
                        name="participants"
                        value={formData.participants}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {[...Array(20)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'person' : 'people'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Event Type *
                      </label>
                      <select
                        name="event"
                        value={formData.event}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select an event type</option>
                        {eventTypes.map((event) => (
                          <option key={event} value={event}>
                            {event}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Monastery *
                      </label>
                      <select
                        name="monastery"
                        value={formData.monastery}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a monastery</option>
                        {monasteries.map((monastery) => (
                          <option key={monastery} value={monastery}>
                            {monastery}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any special requests or questions..."
                      rows={4}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full py-3 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Submit Booking Request'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-card shadow-medium">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@sikkimmonasteries.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 3592 123456</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">⏰</span>
                  <div>
                    <p className="font-semibold text-foreground">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-card shadow-medium">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Visit Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Dress modestly and respectfully</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Maintain silence in prayer halls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Photography may be restricted in certain areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Remove shoes before entering sacred spaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Follow the guidance of monastery staff</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pricing Info */}
            <Card className="bg-card shadow-medium">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Participation Fees
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monastery Visit</span>
                  <span className="font-semibold text-foreground">₹100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guided Tour</span>
                  <span className="font-semibold text-foreground">₹300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meditation Session</span>
                  <span className="font-semibold text-foreground">₹200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cultural Event</span>
                  <span className="font-semibold text-foreground">₹150</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    * Fees support monastery maintenance and cultural preservation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;