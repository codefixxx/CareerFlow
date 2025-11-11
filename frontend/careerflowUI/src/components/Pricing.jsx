
import { Check } from 'lucide-react';
function Pricing() {


  const tiers = [
    {
      name: 'Explorer',
      price: '$0',
      frequency: '/ month',
      description: 'Get started and explore basic career paths.',
      features: [
        'Access to 10 career maps',
        'Basic skill analysis',
        'Community support',
      ],
      cta: 'Start for free',
      popular: false,
    },
    {
      name: 'Navigator',
      price: '$12',
      frequency: '/ month',
      description: 'Unlock the full power of career navigation.',
      features: [
        'Unlimited career maps',
        'In-depth skill gap analysis',
        'Priority support',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      frequency: '',
      description: 'For teams and educational institutions.',
      features: [
        'All Navigator features',
        'Team dashboards',
        'Custom integrations',
        'Dedicated account manager',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gray-800 bg-opacity-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Choose the plan that's right for your journey.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-8 bg-gray-800 rounded-lg shadow-lg border ${
                tier.popular ? 'border-blue-500' : 'border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-white">
                  {tier.price}
                </span>
                <span className="text-base font-medium text-gray-400">
                  {tier.frequency}
                </span>
              </p>
              <p className="mt-4 text-base text-gray-400">
                {tier.description}
              </p>
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-blue-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">{feature}</p>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-10 block w-full px-6 py-3 rounded-md text-center font-medium ${
                  tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-600 bg-opacity-50 text-gray-200 hover:bg-opacity-100'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Pricing;