"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TopupOption = {
  name: string;
  price: string;
  diamonds: number;
  category: "pass" | "diamonds";
  note?: string;
};

// Reduced set of packages for a simpler UI
const TOPUP_OPTIONS: TopupOption[] = [
  // Passes
  {
    name: "WEEKLY PASS",
    price: "₹133",
    diamonds: 0,
    category: "pass",
    note: "💠❤",
  },
  {
    name: "TWILIGHT PASS",
    price: "₹700",
    diamonds: 0,
    category: "pass",
    note: "💠❤",
  },

  // Diamond bundles (amount -> price) with optional task notes
  {
    name: "86 💎",
    price: "₹105",
    diamonds: 86,
    category: "diamonds",
    note: "50💎 task",
  },
  {
    name: "112 💎",
    price: "₹155",
    diamonds: 112,
    category: "diamonds",
    note: "100💎 task",
  },
  {
    name: "172 💎",
    price: "₹210",
    diamonds: 172,
    category: "diamonds",
    note: "100💎 task",
  },
  { name: "257 💎", price: "₹315", diamonds: 257, category: "diamonds" },
  {
    name: "279 💎",
    price: "₹360",
    diamonds: 279,
    category: "diamonds",
    note: "250💎 task",
  },
  {
    name: "344 💎",
    price: "₹420",
    diamonds: 344,
    category: "diamonds",
    note: "250💎 task",
  },
  { name: "429 💎", price: "₹525", diamonds: 429, category: "diamonds" },
  { name: "514 💎", price: "₹630", diamonds: 514, category: "diamonds" },
  {
    name: "619 💎",
    price: "₹735",
    diamonds: 619,
    category: "diamonds",
    note: "500💎 task",
  },
  { name: "706 💎", price: "₹840", diamonds: 706, category: "diamonds" },
  { name: "1050 💎", price: "₹1300", diamonds: 1050, category: "diamonds" },
  { name: "1412 💎", price: "₹1650", diamonds: 1412, category: "diamonds" },
  { name: "1926 💎", price: "₹2280", diamonds: 1926, category: "diamonds" },
  { name: "2195 💎", price: "₹2500", diamonds: 2195, category: "diamonds" },
  { name: "3688 💎", price: "₹4100", diamonds: 3688, category: "diamonds" },
  { name: "5532 💎", price: "₹6100", diamonds: 5532, category: "diamonds" },
  { name: "6042 💎", price: "₹7400", diamonds: 6042, category: "diamonds" },
  { name: "9288 💎", price: "₹10000", diamonds: 9288, category: "diamonds" },
  { name: "20074 💎", price: "₹25000", diamonds: 20074, category: "diamonds" },
];

interface TopupSelectorProps {
  selectedTopup: { name: string; price: string; diamonds: number } | null;
  onSelect: (topup: { name: string; price: string; diamonds: number }) => void;
}

export default function TopupSelector({
  selectedTopup,
  onSelect,
}: TopupSelectorProps) {
  const passes = TOPUP_OPTIONS.filter((t) => t.category === "pass");
  const diamonds = TOPUP_OPTIONS.filter((t) => t.category === "diamonds");

  const renderTopupCard = (option: TopupOption) => {
    const isSelected = selectedTopup?.name === option.name;
    return (
      <Card
        key={option.name}
        className={`cursor-pointer transition-all duration-200 border-2 ${
          isSelected
            ? "border-cyan-400 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 ring-2 ring-cyan-400/50"
            : "border-slate-700/50 bg-slate-800/50 hover:border-secondary/50 hover:bg-slate-700/50"
        }`}
        onClick={() =>
          onSelect({
            name: option.name,
            price: option.price,
            diamonds: option.diamonds,
          })
        }
      >
        <CardContent className="p-4">
          {/* Diamond image only for diamond topups */}
          {option.category === "diamonds" && (
            // Make the diamond image cover a larger area of the card so it reads like a visual tile
            <div className="mb-3 h-36 w-full overflow-hidden rounded">
              <img
                src="/diamond-treasure.png"
                alt="Diamond treasure"
                className="w-full h-full object-cover drop-shadow-lg"
              />
            </div>
          )}

          <div className="text-center">
            <h3 className="text-white font-semibold text-sm mb-2">
              {option.name}
            </h3>
            {option.category === "pass" && (
              <Badge className="mb-2 bg-purple-600 hover:bg-purple-700 text-white">
                Special Pass
              </Badge>
            )}
            <div className="text-lg text-green-300 font-bold text-accent mb-1">
              {option.price}
            </div>
            {option.note && (
              <div className="text-xs text-slate-400 mb-2">{option.note}</div>
            )}
            {isSelected && (
              <div className="text-xs text-cyan-300 font-medium">
                ✓ Selected
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Special Passes Section */}
      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-3">
          Special Passes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {passes.map(renderTopupCard)}
        </div>
      </div>

      {/* Diamonds Section */}
      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-3">
          Diamond Packages
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {diamonds.map(renderTopupCard)}
        </div>
      </div>
    </div>
  );
}
