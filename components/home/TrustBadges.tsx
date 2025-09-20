// components/home/TrustBadges.tsx
import { Users, Award, Star, Clock } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { 
      name: '500+', 
      description: 'Projects Completed',
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      name: '15+', 
      description: 'Years Experience',
      icon: Award,
      color: 'text-green-600' 
    },
    { 
      name: '4.9★', 
      description: 'Customer Rating',
      icon: Star,
      color: 'text-yellow-500'
    },
    { 
      name: '48hr', 
      description: 'Response Time',
      icon: Clock,
      color: 'text-purple-600'
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-0.5 bg-slate-400 mx-auto mb-6"></div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Trusted by Homeowners
          </h3>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div key={badge.name} className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300">
                    <IconComponent className={`w-7 h-7 ${badge.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900">
                    {badge.name}
                  </p>
                  <p className="text-slate-600 font-medium">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Fully insured • WSIB covered • Satisfaction guaranteed
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;