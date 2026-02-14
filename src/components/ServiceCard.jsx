import React from "react";
import {
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  ShieldCheck,
  Zap,
  Check,
} from "lucide-react";

/* =======================
   SERVICES DATA
======================= */
const allServices = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies and best practices.",
    icon: Code2,
    headerColor: "bg-cyan-500",
    buttonColor: "bg-cyan-500 hover:bg-cyan-600",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Performance",
      "Secure & Scalable",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android devices.",
    icon: Smartphone,
    headerColor: "bg-purple-600",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    features: [
      "iOS & Android",
      "Cross-Platform",
      "User-Friendly UI",
      "Cloud Integration",
    ],
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful and intuitive user interfaces that provide exceptional user experiences.",
    icon: Palette,
    headerColor: "bg-red-500",
    buttonColor: "bg-red-500 hover:bg-red-600",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Strategic marketing solutions to grow your online presence and reach your audience.",
    icon: TrendingUp,
    headerColor: "bg-[#00c853]",
    buttonColor: "bg-[#00c853] hover:bg-[#00a846]",
    features: [
      "SEO Strategy",
      "Content Marketing",
      "Social Media",
      "Analytics",
    ],
  },
  {
    title: "Cybersecurity",
    description:
      "Protect your business with comprehensive security solutions and risk management.",
    icon: ShieldCheck,
    headerColor: "bg-[#3d5afe]",
    buttonColor: "bg-[#3d5afe] hover:bg-[#2a45e2]",
    features: [
      "Security Audits",
      "Threat Detection",
      "Data Protection",
      "Compliance",
    ],
  },
  {
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and services for modern business needs.",
    icon: Zap,
    headerColor: "bg-gradient-to-r from-[#ffab00] to-[#ff6d00]",
    buttonColor:
      "bg-gradient-to-r from-[#ffab00] to-[#ff6d00] hover:opacity-90",
    features: [
      "Cloud Migration",
      "Infrastructure Setup",
      "Auto Scaling",
      "24/7 Support",
    ],
  },
];

/* =======================
   SERVICE CARD
======================= */
function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <div className="flex flex-col  rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
      {/* Header */}
      <div
        className={`${service.headerColor} p-8 h-48 flex flex-col items-center justify-center text-white text-center`}
      >
        <Icon size={40} className="mb-4 drop-shadow-md" />
        <h2 className="text-2xl font-bold">{service.title}</h2>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <p className="text-gray-600 mb-8 leading-relaxed min-h-[3rem]">
          {service.description}
        </p>

        <ul className="space-y-4 mb-10">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-700">
              <span className="bg-green-100 rounded-full p-1 mr-3">
                <Check size={14} strokeWidth={4} className="text-green-600" />
              </span>
              <span className="font-medium text-[15px]">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          aria-label={`Learn more about ${service.title}`}
          className={`mt-auto w-full py-4 px-6 text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95 ${service.buttonColor}`}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

/* =======================
   MAIN COMPONENT
======================= */
export default function OurServices() {
  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
       

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
          {allServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
