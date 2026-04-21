import aakash from "../assets/aakash.jpg";


export const instituteInfo = {
  name: "Shekhar Kumar Coaching Classes",
  address: "1,2,3 Mayur Society, Surat",
  contact: ["918849233878", "918866238407"],
  whatsapp: "918849233878",
  email: "shekharkumarcoaching@gmail.com",
};

export const classes = [
  { id: 1, name: "Primary (1 To 8)", description: "Foundational learning with fun activities." },
  { id: 2, name: "Secondary (9 & 10)", description: "Building core skills in math and language." },
  { id: 3, name: "Higher Secondary (11 & 12 (Commerce & Arts) )", description: "Introducing basic science and social studies." },
  { id: 4, name: "Under Graduation (B.com (FY,SY,TY))", description: "Focusing on analytical and writing skills." }
];

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Admission", href: "/admission" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const staff = [
  {
    name: "Shekhar Kumar",
    role: "Founder & Mathematics Head",
    qualification: "M.Sc. Mathematics",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Aakash More",
    role: "English & Social Studies",
    qualification: "B.A. English Literature",
    image: aakash,
  },
  {
    name: "Rajesh Patel",
    role: "Science & Technology",
    qualification: "B.Sc. Physics",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Sneha Mehta",
    role: "Social Studies & Arts",
    qualification: "M.A. History",
    image: "https://images.unsplash.com/photo-1590650516494-23251a17dd0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Vikram Singh",
    role: "Physical Education & Hindi",
    qualification: "B.P.Ed",
    image: "https://images.unsplash.com/photo-1544717297-fa95b35c7685?q=80&w=2070&auto=format&fit=crop",
  },
];
