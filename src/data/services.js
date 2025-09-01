// Humne har service ko rewrite kiya hai taaki woh Railway ke saath-saath
// Nagar Nigam, Municipal, aur doosre Government Tenders ko bhi represent kare.

import { 
  TvIcon, MegaphoneIcon, BuildingStorefrontIcon, GlobeAltIcon,
  BuildingOfficeIcon, ArrowsRightLeftIcon, ClipboardDocumentIcon,
  CubeIcon, TicketIcon, QrCodeIcon
} from "@heroicons/react/24/outline"

export const services = [
  {
    slug: "public-space-media",
    title: "Public Space Media",
    description: "High-visibility hoardings, panels, and displays in high-traffic public areas like stations, bus terminals, and city squares.",
    icon: BuildingStorefrontIcon,
    details: {
      coverImage: "https://static.wixstatic.com/media/3b91cb_80ef9f7ee9e047d68b5e41add1eb7f1e~mv2.png/v1/fill/w_664,h_430,al_c,q_85,enc_auto/3b91cb_80ef9f7ee9e047d68b5e41add1eb7f1e~mv2.png",
      overview: "Public space media is the cornerstone of effective citizen outreach and brand visibility. We secure and manage prime advertising locations in the busiest public venues, including railway platforms, bus terminals, and Nagar Nigam complexes, ensuring your message is seen by millions.",
      keyFeatures: [
        "Strategic placement in high-footfall zones",
        "Hoardings, backlit panels, and digital displays",
        "Durable, all-weather materials for longevity",
        "Compliance with all local and national regulations",
      ],
      bestFor: "Mass-market brand campaigns, public service announcements, and local event promotions."
    }
  },
  {
    slug: "digital-out-of-home-dooh",
    title: "Digital Out-of-Home (DOOH)",
    description: "Dynamic video content on large-format LED screens in stations, city squares, and government complexes.",
    icon: TvIcon,
    details: {
      coverImage: "https://en.kinglight.com/wp-content/uploads/2024/01/DOOH-Advertising-1.jpg",
      overview: "Harness the power of digital with our state-of-the-art DOOH network. We install and manage high-resolution LED screens in prime public locations, allowing for dynamic, engaging content that can be updated in real-time for maximum relevance and impact.",
      keyFeatures: [
        "Full HD video and animation capabilities",
        "Centralized, real-time content management",
        "Placement in high dwell-time areas (e.g., waiting halls, concourses)",
        "Data-driven campaign scheduling and analytics",
      ],
      bestFor: "Modern brands, tech companies, and any campaign requiring flexibility and dynamic visuals."
    }
  },
  {
    slug: "transit-media-wrapping",
    title: "Transit Media Wrapping",
    description: "Transform public transport vehicles—trains, metro coaches, city buses—into powerful moving billboards.",
    icon: GlobeAltIcon,
    details: {
      coverImage: "https://www.signmedia.ca/wp-content/uploads/2023/02/CM_Metrolinx.jpg",
      overview: "Our transit media solutions turn public transport into unmissable, moving advertisements. By wrapping trains, metro coaches, or entire fleets of city buses, your brand travels across cities and states, generating unparalleled visibility and social media buzz.",
      keyFeatures: [
        "Full exterior high-quality vinyl wrapping",
        "Interior branding (panels, seats, handles)",
        "Coverage on high-visibility city and state routes",
        "Collaboration with Railway, Metro, and State Transport authorities",
      ],
      bestFor: "Nationwide product launches, creating viral marketing moments, and campaigns targeting a mobile audience."
    }
  },
  {
    slug: "concourse-lobby-branding",
    title: "Concourse & Lobby Branding",
    description: "Target a captive audience in waiting halls, government office lobbies, and public concourses.",
    icon: BuildingOfficeIcon,
    details: {
      coverImage: "https://alternativeadverts.com/wp-content/uploads/2025/04/Billboard-Branding-of-Concourse-Exit-B-and-C-Lobby-Marina-Station-Lagos.jpg",
      overview: "Engage with a captive audience that has significant dwell time. We place your brand messaging within the waiting areas of transport hubs, Nagar Palika service centers, and other public lobbies, ensuring deep and uninterrupted engagement.",
      keyFeatures: [
        "Large format wall displays and murals",
        "Branding on furniture and charging stations",
        "Digital screen networks for video content",
        "High-impact in a relatively low-clutter environment",
      ],
      bestFor: "Financial services, insurance, telecom, and any brand that benefits from detailed messaging."
    }
  },
  {
    slug: "infrastructure-branding",
    title: "Infrastructure Branding",
    description: "Large-scale branding on key city infrastructure like foot-over-bridges, pillars, and skywalks.",
    icon: ArrowsRightLeftIcon,
    details: {
      coverImage: "https://www.digitalsilk.com/wp-content/uploads/2023/12/900x550.jpg",
      overview: "Leverage city infrastructure as a powerful advertising medium. We secure rights for branding on high-traffic public structures such as foot-over-bridges, metro pillars, and underpasses, making your brand an integral part of the cityscape.",
      keyFeatures: [
        "Massive, unmissable panel displays",
        "Creative branding on pillars and staircases",
        "Guaranteed exposure to both pedestrian and vehicular traffic",
        "Long-term visibility and brand dominance",
      ],
      bestFor: "Real estate, automotive, and brands looking to establish a dominant local presence."
    }
  },
  {
    slug: "public-address-system-ads",
    title: "Public Address System Ads",
    description: "Sponsored audio jingles and messages broadcast across public transport hubs and venues.",
    icon: MegaphoneIcon,
    details: {
      coverImage: "https://lotgroup.eu/wp-content/uploads/2016/08/public_address_system.jpg",
      overview: "Cut through the visual noise and communicate directly through sound. We create and broadcast professional audio advertisements and jingles over PA systems in railway stations, bus terminals, and public markets.",
      keyFeatures: [
        "Professionally recorded audio spots",
        "High frequency and recall value",
        "Scheduled broadcasts for time-sensitive offers",
        "A cost-effective method for mass communication",
      ],
      bestFor: "Public service announcements, telecom offers, and brands with strong audio jingles."
    }
  },
  {
    slug: "large-format-hoardings",
    title: "Large-Format Hoardings",
    description: "Dominant hoardings and unipoles at key city entry points, major intersections, and outside public complexes.",
    icon: ClipboardDocumentIcon,
    details: {
      coverImage: "https://chitrapublicity.com/assets/img/large-formate-hoarding-services-in-ahmedabad-gujarat/large-format-hoarding-advertising-agency-in-gujarat-banner-1.jpg",
      overview: "Make a monumental statement with our large-format hoarding solutions. We secure prime locations that offer maximum visibility to a massive audience, including city traffic, pedestrians, and commuters entering major public hubs.",
      keyFeatures: [
        "Giant-scale hoardings for unmatched impact",
        "Premium unipole sites for a towering presence",
        "Lit and backlit options for 24/7 visibility",
        "Strategic placement based on traffic data",
      ],
      bestFor: "High-end retail, automotive, real estate, and major brand-building campaigns."
    }
  },
  {
    slug: "on-ground-activations-kiosks",
    title: "On-Ground Activations & Kiosks",
    description: "Branded kiosks and experiential setups in designated public spaces for direct citizen and consumer engagement.",
    icon: CubeIcon,
    details: {
      coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5efa69147539289.62c46af960def.jpg",
      overview: "Engage directly with your target audience through on-ground activations. We facilitate the setup of promotional kiosks, sampling stations, and experiential zones in approved public areas, allowing for meaningful one-on-one interactions.",
      keyFeatures: [
        "Custom-designed and branded kiosks",
        "Permissions and logistics management",
        "Ideal for lead generation and product sampling",
        "Creates memorable brand experiences",
      ],
      bestFor: "FMCG, telecom, banking, and tech brands seeking direct customer interaction."
    }
  },
  {
    slug: "point-of-service-branding",
    title: "Point-of-Service Branding",
    description: "Targeted branding at high-traffic service points like ticket counters, information desks, and utility bill centers.",
    icon: TicketIcon,
    details: {
      coverImage: "https://fabrikbrands.com/wp-content/uploads/Examples-Of-Corporate-Branding-01-scaled.jpg",
      overview: "Place your brand at the exact point of transaction or inquiry. This form of advertising ensures visibility to every person availing a service, offering highly focused exposure at a moment of high attention.",
      keyFeatures: [
        "Counter-top displays and panel branding",
        "Branded queue management systems",
        "Posters and digital screens in service areas",
        "Guaranteed footfall and visibility",
      ],
      bestFor: "Payment apps, fintech, insurance providers, and local service-based businesses."
    }
  },
  {
    slug: "digital-integration-qr-nfc",
    title: "Digital Integration (QR & NFC)",
    description: "Bridge the gap between physical ads and your digital platforms with interactive QR codes and NFC technology.",
    icon: QrCodeIcon,
    details: {
      coverImage: "https://www.manwinwin.com/wp-content/uploads/2024/04/Qr-Code-and-NFC-tag-for-maintenance.jpg",
      overview: "Make your static ads interactive. We embed smart QR codes and NFC chips into your physical media, allowing the public to scan or tap with their phones to instantly visit your website, download an app, or access exclusive content.",
      keyFeatures: [
        "Custom QR code and NFC campaign setup",
        "Deep linking to specific app pages or websites",
        "Trackable analytics to measure offline-to-online conversion",
        "Adds a modern, tech-forward element to any campaign",
      ],
      bestFor: "E-commerce, digital services, event registrations, and any brand looking to measure offline ROI."
    }
  }
];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Marketing Director",
      company: "Coca-Cola India",
      content:
        "Yaidehi Enterprises delivered exceptional results for our railway advertising campaign. Their professional approach and compliance with railway regulations made the entire process seamless.",
      rating: 5,
      color: "orange-500",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Sharma",
      position: "Brand Manager",
      company: "Samsung Electronics",
      content:
        "Outstanding service and execution! The train wrapping campaign exceeded our expectations and provided excellent brand visibility across multiple routes.",
      rating: 5,
      color: "pink-600",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Patel",
      position: "Advertising Head",
      company: "Flipkart",
      content:
        "Their expertise in railway tenders and strategic placement of our advertisements resulted in significant brand recall and customer engagement.",
      rating: 5,
      color: "amber-500",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Sunita Reddy",
      position: "Marketing Manager",
      company: "Tata Motors",
      content:
        "Professional team with deep understanding of railway advertising. They handled our digital display campaign with utmost precision and delivered great ROI.",
      rating: 5,
      color: "indigo-600",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];
  
  export { services, testimonials };