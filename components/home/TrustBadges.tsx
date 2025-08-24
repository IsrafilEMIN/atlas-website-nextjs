// components/home/TrustBadges.tsx
const TrustBadges = () => {
  const badges = [
    { name: '5-Star Rated', description: 'On Google & HomeStars' },
    { name: '10+ Years', description: 'Of Professional Experience' },
    { name: 'Fully Insured', description: 'WSIB & Liability Coverage' },
    { name: 'Satisfaction', description: '100% Guaranteed' },
  ];

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.name} className="text-center">
              <p className="text-3xl font-extrabold text-blue-600">{badge.name}</p>
              <p className="mt-1 text-lg font-medium text-slate-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;