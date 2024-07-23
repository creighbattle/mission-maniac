"use client";
import { useRouter } from "next/navigation";
import Header from "../global-components/Header";

const tiers = [
  {
    name: "Recon",
    id: "tier-recon",
    href: "#",
    priceMonthly: "$1",
    points: "58",
    description: "An ideal choice to explore and support your first mission.",
    features: [],
    featured: false,
    priceId: "price_1PeHksFpEHwNvH6Ho4AYFp5h",
  },
  {
    name: "Scout",
    id: "tier-scout",
    href: "#",
    priceMonthly: "$5",
    points: "410",
    description: "Great for backing small missions and getting more involved.",
    features: [],
    featured: false,
    priceId: "price_1PeHlFFpEHwNvH6HSw9J5Esq",
  },
  {
    name: "Operative",
    id: "tier-operative",
    href: "#",
    priceMonthly: "$10",
    points: "850",
    description: "Perfect for supporting creators and engaging in missions.",
    features: [],
    featured: false,
    priceId: "price_1PeHljFpEHwNvH6HZNF5wDma",
  },
  {
    name: "Agent",
    id: "tier-agent",
    href: "#",
    priceMonthly: "$20",
    points: "1730",
    description: "A strong option to make a noticeable impact on missions.",
    features: [],
    featured: false,
    priceId: "price_1PfN4UFpEHwNvH6HMja5CTA4",
  },
  {
    name: "Specialist",
    id: "tier-specialist",
    href: "#",
    priceMonthly: "$25",
    points: "2170",
    description: "Excellent for dedicated supporters aiming to help creators.",
    features: [],
    featured: true,
    priceId: "price_1PfN50FpEHwNvH6HOVNYZNuf",
  },
  {
    name: "Commander",
    id: "tier-commander",
    href: "#",
    priceMonthly: "$50",
    points: "4370",
    description: "Optimal for significant contributions to mission success.",
    features: [],
    featured: false,
    priceId: "price_1PfN5VFpEHwNvH6Hxg99dXSg",
  },
  {
    name: "Captain",
    id: "tier-captain",
    href: "#",
    priceMonthly: "$100",
    points: "8770",
    description: "Ideal for dedicated supporters with a passion for missions.",
    features: [],
    featured: false,
    priceId: "price_1PfN6RFpEHwNvH6HIm2GKESW",
  },
  {
    name: "General",
    id: "tier-general",
    href: "#",
    priceMonthly: "$250",
    points: "21970",
    description: "A premium choice for major backing and top-tier support.",
    features: [],
    featured: false,
    priceId: "price_1PfN79FpEHwNvH6HglFS1HIM",
  },
  {
    name: "Elite",
    id: "tier-elite",
    href: "#",
    priceMonthly: "$500",
    points: "43970",
    description: "The ultimate plan for elite support and maximum impact.",
    features: [],
    featured: false,
    priceId: "price_1PfN7eFpEHwNvH6HBwymlBva",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();

  const nav = (priceId) => {
    router.push(`/checkout?priceId=${priceId}`);
  };

  return (
    <>
      <Header />

      <div className="relative isolate bg-black px-6 py-24 sm:py-32 lg:px-8 min-h-svh">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#000] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl mt-4">
          <h2 className="text-base font-semibold leading-7 text-green-400">
            Shop
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            Empower Creators. Fuel Missions.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Purchase mission points to support your favorite creators and help
          bring their unique missions to life. Your contribution makes a
          difference, no matter the amount.
        </p>
        {/* <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2"> */}
        <div className="mx-auto lg:mt-8 overflow-x-auto max-w-7xl no-scrollbar">
          <div className="flex flex-nowrap space-x-8 px-4 py-8">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={classNames(
                  tierIdx % 2 == 0
                    ? "relative bg-gray-900 shadow-2xl border-2"
                    : "bg-gray-200 sm:mx-8 lg:mx-0 shadow-md shadow-green-400",
                  tierIdx % 2 == 0
                    ? ""
                    : tierIdx % 2 == 0
                    ? "rounded-t-3xl lg:rounded-bl-3xl"
                    : "lg:rounded-tr-3xl",
                  "rounded-3xl p-6 ring-1 ring-gray-900/10 sm:p-10 min-w-64"
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tierIdx % 2 == 0 ? "text-green-400" : "text-green-600",
                    "text-base font-semibold leading-7"
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={classNames(
                      tierIdx % 2 == 0 ? "text-white" : "text-gray-900",
                      "text-5xl font-bold tracking-tight"
                    )}
                  >
                    {tier.priceMonthly}
                  </span>
                  <span
                    className={classNames(
                      tierIdx % 2 == 0 ? "text-gray-400" : "text-gray-500",
                      "text-base"
                    )}
                  >
                    {tier.points} Points
                  </span>
                </p>
                <p
                  className={classNames(
                    tierIdx % 2 == 0 ? "text-gray-300" : "text-gray-600",
                    "mt-6 text-base leading-7"
                  )}
                >
                  {tier.description}
                </p>
                {/* <ul
                  role="list"
                  className={classNames(
                    tierIdx % 2 == 0 ? "text-gray-300" : "text-gray-600",
                    "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        aria-hidden="true"
                        className={classNames(
                          tierIdx % 2 == 0 ? "text-indigo-400" : "text-indigo-600",
                          "h-6 w-5 flex-none"
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul> */}
                <button
                  // href={tier.href}
                  // aria-describedby={tier.id}
                  onClick={() => nav(tier.priceId)}
                  className={classNames(
                    tierIdx % 2 == 0
                      ? "bg-green-700 text-white shadow-sm hover:bg-green-400 focus-visible:outline-green-500"
                      : "text-green-600 ring-1 ring-inset ring-green-500 hover:ring-green-300 focus-visible:outline-green-600 bg-gray-900",
                    "mt-8 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
                  )}
                >
                  Purchase Mission Points
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
