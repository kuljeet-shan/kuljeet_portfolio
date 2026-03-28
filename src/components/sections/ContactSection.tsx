import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { parseContacts } from "@/lib/cv";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    subject: "",
    message: "",
  });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
      const response = await fetch("https://formsubmit.co/ajax/kuljeet.singh@christuniversity.in,tharanthaver33@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Contact Form Submission: ${formData.subject}`
        })
      });

        if (response.ok) {
          toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you soon.",
          });
          setFormData({
            name: "",
            email: "",
            affiliation: "",
            subject: "",
            message: "",
          });
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again later.",
          variant: "destructive",
        });
      }
    };

  const parsed = parseContacts();
  const emails = parsed.filter((i) => i.label === "Email").map((i) => i.value);
    const phones = parsed.filter((i) => i.label === "Phone").map((i) => i.value).filter(v => v.includes("88036"));
    const contactInfo = [
      {
        icon: <Mail className="h-5 w-5" />,
        label: "Email",
        values: emails.length
          ? emails
          : [
              "kuljeet.singh@christuniversity.in",
            ],
      },
      {
        icon: <Phone className="h-5 w-5" />,
        label: "Phone",
        values: ["+91 88036 94182"],
      },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      values: ["Delhi-NCR, India", "Originally from Kishtwar, Jammu & Kashmir"],
    },
  ];

    return (
      <section id="contact" className="py-24 sm:py-32 md:py-40 relative">
      <div className="absolute inset-0 neural-pattern opacity-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center animate-fade-in">
          <AnimatedText 
            text={<>Get In <span className="text-gradient-accent">Touch</span></>}
            textClassName="text-3xl sm:text-4xl md:text-5xl font-bold mb-0"
            underlineClassName="text-accent"
          />
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 mt-8">
            For research collaborations, academic opportunities, student mentoring, or speaking engagements, 
            feel free to reach out.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6 animate-slide-in-left">
            <Card className="glass p-6 sm:p-8 shadow-medium">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-accent flex items-center justify-center text-primary-foreground flex-shrink-0">
                        {info.icon}
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg">{info.label}</h4>
                    </div>
                    <div className="pl-0 sm:pl-13 space-y-1">
                      {info.values.map((value, i) => (
                        <p key={i} className="text-sm sm:text-base text-muted-foreground break-words">
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Info Card */}
            <Card className="glass p-4 sm:p-6 shadow-medium">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <strong className="text-accent">Privacy Notice:</strong> Your contact details are used only 
                to respond to your enquiry. I respect your privacy and will never share your information 
                with third parties.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="glass p-6 sm:p-8 shadow-medium animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="affiliation" className="text-sm font-medium">
                  Affiliation / Organization
                </label>
                <Input
                  id="affiliation"
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  className="bg-background/50"
                  placeholder="Your institution or company"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background/50"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background/50 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-accent hover:opacity-90 transition-all shadow-glow gap-2 text-sm sm:text-base"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
