export const services = [
  {
    id: "basic",
    name: "Basic maintenance",
    price: 25,
    description: "A little tune-up. A whole lot of happy miles.",
    icon: "wrench",
    tag: "THE EVERYDAY ESSENTIAL",
  },
  {
    id: "full",
    name: "Full maintenance",
    price: 55,
    description: "Give your trusty ride the attention it deserves.",
    icon: "bike",
    tag: "THE COMPLETE REFRESH",
  },
  {
    id: "ebike",
    name: "E-bike maintenance",
    price: 75,
    description: "A little extra care for your electric adventures.",
    icon: "zap",
    tag: "FOR YOUR ELECTRIC RIDE",
  },
];

export const extras = [
  {
    id: "tyre",
    name: "Tyre replacement",
    price: 12,
    description: "Fresh rubber. Fresh possibilities.",
    icon: "circle",
  },
  {
    id: "brakes",
    name: "Brake adjustment",
    price: 18,
    description: "A little more confidence at every stop.",
    icon: "disc",
  },
];

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);

export function calculateQuote(serviceId, extraIds = []) {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return null;
  const items = [
    service,
    ...extras.filter((item) => extraIds.includes(item.id)),
  ];
  return { items, total: items.reduce((sum, item) => sum + item.price, 0) };
}
