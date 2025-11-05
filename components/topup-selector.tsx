"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TopupOption = {
  name: string;
  price: string;
  diamonds: number;
  category: "pass" | "diamonds";
};

// Reduced set of packages for a simpler UI
const TOPUP_OPTIONS: TopupOption[] = [
  // Passes (kept minimal)
  { name: "Weekly Pass", price: "$4.99", diamonds: 0, category: "pass" },
  { name: "Twilight Pass", price: "$9.99", diamonds: 0, category: "pass" },

  // A trimmed list of diamond bundles (commonly used tiers)
  { name: "172 Diamonds", price: "$0.99", diamonds: 172, category: "diamonds" },
  { name: "275 Diamonds", price: "$1.99", diamonds: 275, category: "diamonds" },
  { name: "565 Diamonds", price: "$4.99", diamonds: 565, category: "diamonds" },
  {
    name: "1049 Diamonds",
    price: "$9.99",
    diamonds: 1049,
    category: "diamonds",
  },
  {
    name: "2195 Diamonds",
    price: "$19.99",
    diamonds: 2195,
    category: "diamonds",
  },
  {
    name: "3688 Diamonds",
    price: "$29.99",
    diamonds: 3688,
    category: "diamonds",
  },
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
            <div className="text-lg font-bold text-accent mb-3">
              {option.price}
            </div>
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
