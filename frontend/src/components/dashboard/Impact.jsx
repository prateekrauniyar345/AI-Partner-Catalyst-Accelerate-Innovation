import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Globe } from 'lucide-react';
import { Card, CardContent } from '../../UI/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const stats = [
  {
    icon: Users,
    value: '1B+',
    label: 'People with disabilities worldwide',
    color: 'text-purple-600',
  },
  {
    icon: BookOpen,
    value: '57M',
    label: 'Children out of school globally',
    color: 'text-pink-600',
  },
  {
    icon: Globe,
    value: 'SDG 4',
    label: 'Quality Education for All',
    color: 'text-indigo-600',
  },
  {
    icon: Heart,
    value: '24/7',
    label: 'Always accessible learning',
    color: 'text-red-600',
  },
];

const testimonials = [
  {
    quote: "For the first time, I can learn independently without needing assistance. VoiceEd Ally has given me the confidence to pursue my education on my own terms.",
    author: "Sarah M.",
    role: "Student with limited mobility",
    image: "https://images.unsplash.com/photo-1611926653670-e18689373857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwaW5jbHVzaXZlJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2NjA1MjUzMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote: "The adaptive pace and empathetic voice make learning feel personal. It's like having a patient tutor who truly understands when I need a break.",
    author: "Marcus J.",
    role: "Learner with visual impairment",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBoYXBweXxlbnwxfHx8fDE3NjU5ODE3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote: "This technology is revolutionary. Being able to learn complex subjects through conversation alone has opened doors I thought were closed.",
    author: "Priya K.",
    role: "Accessibility advocate",
    image: "https://images.unsplash.com/photo-1765623821768-179fde277d4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGFwdGl2ZSUyMHRlY2hub2xvZ3klMjBkaXNhYmlsaXR5fGVufDF8fHx8MTc2NjA1MjUzMnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Impact() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-gray-900">
            Making an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Impact</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Education should be accessible to everyone, regardless of physical ability. We're committed to UN Sustainable Development Goal 4: Quality Education for All.
          </p>
        </motion.div>

        <div className="row g-4 mb-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }}>
                <div className="col-12 col-md-6 col-lg-3">
                  <Card className="text-center border rounded-3 shadow-sm">
                    <CardContent className="py-3">
                      <Icon className={`mb-3`} />
                      <div className="h5 mb-1">{stat.value}</div>
                      <p className="small text-muted">{stat.label}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="mb-2 text-gray-900">Hear from Our Community</h3>
          <p className="text-gray-600">Real stories from learners who've found independence through VoiceEd Ally</p>
        </motion.div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.author} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.6 }}>
              <div className="col-12 col-md-6 col-lg-4">
                <Card className="h-100 border rounded-3 shadow-sm">
                  <CardContent className="p-3">
                    <div className="mb-3 text-center">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={`${testimonial.author} - ${testimonial.role}`}
                        className="rounded-circle me-auto ms-auto d-block" 
                        style={{width:80,height:80,objectFit:'cover'}}
                      />
                    </div>
                    <p className="text-muted fst-italic mb-3">
                      "{testimonial.quote}"
                    </p>
                    <div className="text-center">
                      <div className="fw-semibold">{testimonial.author}</div>
                      <div className="small text-muted">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
