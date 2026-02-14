const courses = [
  {
    id: 1,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=500&auto=format&fit=crop",
  
    price: "$5.00",
    rating:"40",
    product:"Form Cambodia",
   
  },
  {
    id: 2,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1599639932525-213272ff954b?q=80&w=788&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$10.00",
    rating:"50",
    product:"Form china",
   
  },
  {
    id: 3,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1598483604448-fa50403fcd25?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$8.50",
    rating:"100",
    product:"Form Korean",
   
  },
  {
    id: 4,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1661668998444-7470e87e468c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$20.00",
    rating:"1K",
    product:"Form Cambodia ",
   
  },
  {
    id: 5,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1605711599412-775918dbe770?q=80&w=651&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$15.00",
    rating:"409",
    product:"Form USA",
   
  },
  {
    id: 6,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1583441012461-abcc0bd2400d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$8.20",
    rating:"50K",
    product:"Form Korean",
   
  },
  {
    id: 7,
    title: "Coffee beans",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://images.unsplash.com/photo-1658980356502-86abf6d5d5a8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$19.00",
    rating:"200",
    product:"Form China",
   
  },
  
  {
    id: 8,
    title: "Coffee latte",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/c4/73/7e/c4737e013a673e196416210867f9b1f8.jpg",
    price: "$5.00",
    rating:"40",
    
   
  },
  {
    id: 9,
    title: "Cappuccino",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg",
    price: "$10.00",
    rating:"100",
    
   
  },
  {
    id: 10,
    title: "Caramel Ice Cream Coffee",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/bd/c4/4b/bdc44b6700ece11ff713ee133803f371.jpg",
    price: "$10.00",
    rating:"50",
    
   
  },
  {
    id: 11,
    title: "Coffee Milkshake",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/81/de/70/81de70fd36f7dfad4e2fb71642863924.jpg",
    price: "$12.00",
    rating:"200",
    
   
  },
  {
    id: 12,
    title: "Chocolate milkshake",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/bc/ff/c0/bcffc047d62ea4b955da5695799737a8.jpg",
    price: "$8.00",
    rating:"990",
    
   
  },
  {
    id: 13,
    title: "Healthy Blueberry Smoothie",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/d3/32/d9/d332d9179ff7c342b1afda7b68502a36.jpg",
    price: "$10.00",
    rating:"500",
    
   
  },
  {
    id: 14,
    title: "Espresso Coffee",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/4c/28/e2/4c28e2420bf38c50120dba0cbaf42e8d.jpg",
    price: "$8.00",
    rating:"550",
    
   
  },
  {
    id: 15,
    title: "Americano Coffee",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/56/27/50/562750b2c8e0b7e680d90a97f0e56b4b.jpg",
    price: "$5.00",
    rating:"50k",
    
   
  },
  {
    id: 16,
    title: "Italian coffee",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/54/4c/05/544c05e2212a31de1158907f6f0fac0e.jpg",
    price: "$9.30",
    rating:"560",
    
   
  },
  {
    id: 18,
    title: "Hot matcha",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg",
    price: "$10.90",
    rating:"50",
    
   
  },
  {
    id: 19,
    title: "Hot coffee weather",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/474x/57/30/51/5730512538c6c2c357d239c7a55c3e45.jpg",
    price: "$10.30",
    rating:"500",
    
   
  },
  {
    id: 20,
    title: "Epic Chocolate Peanut",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/8f/dd/37/8fdd373d0627c75c51eabe85d6991f0d.jpg",
    price: "$7.00",
    rating:"50",
    
   
  },
  {
    id: 21,
    title: "Matcha Latte Recipe",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/e2/c0/91/e2c09146cb0ea1c44b205bb4a004ca84.jpg",
    price: "$10.00",
    rating:"200",
    
   
  },
  {
    id: 22,
    title: "Vanilla Cupcakes",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/1200x/95/0a/0a/950a0a62dcebd0b0d9721751c7367d0e.jpg",
    price: "$2.00",
    rating:"150",
    
   
  },
  {
    id: 23,
    title: "Palm cake",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/1c/c1/df/1cc1df0fcce77849fadcd01c7bb8d5da.jpg",
    price: "$2.80",
    rating:"300",
    
   
  },
  {
    id: 24,
    title: "Crispy Samosa Pinwheels",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and visualization libraries for data science projects.",
    image:
      "https://i.pinimg.com/736x/2d/4b/f6/2d4bf6cd6d4e5b7667b799de6615a837.jpg",
    price: "$3.00",
    rating:"505",
    
   
  },
  
  
  
    
];

export default courses;
