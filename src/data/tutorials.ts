export interface Tutorial {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  date: string;
  category?: string;
}

export const tutorials: Tutorial[] = [
  {
    id: "nestjs",
    title:
      "NestJS Full Course in Bangla | Build Real Projects & CRUD API | Beginner to Advanced",
    description:
     `Want to learn NestJS the right way? This complete NestJS course covers everything from basic concepts to building production-ready APIs using industry-standard architecture and best practices.    By the end of this course, you will be able to:
      • Understand NestJS architecture
      • Build scalable REST APIs
      • Use Dependency Injection effectively
      • Create CRUD APIs
      • Implement Validation Pipes and DTOs
      • Secure APIs with Guards and Middleware
      • Configure CORS and Global Prefix
      This course is designed for JavaScript, TypeScript, Express.js, and Node.js developers who want to become professional backend developers.`,
    youtubeId: "hn9KEItLMPc",
    duration: "1:45:00",
    date: "Jul 2026",
    category: "NestJS",
  },
  {
    id: "docker",
    title:
      "Docker Complete Tutorial in Bangla | Image, Container, Dockerfile, Docker Compose & Deploy",
    description:
      "In this beginner-friendly Docker tutorial, you'll learn: What is Docker?, Why Docker is used?, Docker Image, Docker Container, Dockerfile, .dockerignore, Docker Compose, Build Docker Image, Run Docker Container, Deploy Docker Application on Render. Whether you're a beginner or backend developer, this tutorial will help you understand Docker easily with practical examples.",
    youtubeId: "ZWtfwvtDv0I",
    duration: "58:07",
    date: "Jun 2026",
    category: "Docker",
  },
  {
    id: "redis",
    title:
      "Redis Tutorial in Bangla | Node.js Redis Package + Redis CLI for Beginner",
    description:
      "Learn Redis from scratch in Bangla. In this tutorial, you'll learn what Redis is, why Redis is used, Redis installation, Redis CLI commands, SET, GET, TTL, and the most important Redis data types: String, Hash, List, and Set. Topics Cover: What is Redis?, Why use Redis?, Redis Installation, Redis CLI, SET, GET & TTL, String, Hash, List & Set, Redis with Node.js",
    youtubeId: "TS-kr_tiFOg",
    duration: "40:50",
    date: "Jun 2026",
    category: "Redis",
  },
  {
    id: "postgresql",
    title:
      "PostgreSQL Full Course in Bangla | Beginner to Advanced | Complete SQL Database Tutorial",
    description:
      "Learn PostgreSQL from scratch in Bangla. In this tutorial, you'll learn what PostgreSQL is, why PostgreSQL is used, PostgreSQL installation",
    youtubeId: "ZEsOqIFvnmw",
    duration: "1:24:29",
    date: "Jul 2026",
    category: "PostgreSQL",
  },
  {
    id: "github-actions",
    title:
      "GitHub Actions CI/CD Tutorial Bangla | Automate Build & Deploy for Beginners",
    description:
      "In this tutorial, I explain GitHub Actions in a simple and beginner-friendly way. You will learn how CI/CD works, how to automate build and deployment processes, and how GitHub Actions can save time in real-world development projects.",
    youtubeId: "50C2E7-4xCU",
    duration: "24:27",
    date: "Jun 2026",
    category: "Github Actions",
  },
  {
    id: "swagger",
    title:
      "Swagger Tutorial for Beginners in Bangla | API Documentation Made Easy",
    description:
      "In this video, you'll learn Swagger from the scratch with simple explanations and practical examples. We will cover: What is API Documentation, What is Swagger?, API Documentation, Swagger UI Setup, Documenting API Endpoints, Request Response Body. Swagger helps developers create, maintain, and share API documentation efficiently.",
    youtubeId: "JIFwDMAzKBE",
    duration: "46:29",
    date: "Jun 2026",
    category: "Swagger",
  },
  {
    id: "bullmq",
    title:
      "BullMQ Tutorial in Bangla | Complete Beginner Guide with Node.js & Redis",
    description:
      "In this beginner-friendly BullMQ tutorial in Bangla, you'll learn everything about BullMQ from scratch with practical examples.",
    youtubeId: "tKQb3cSYq0E",
    duration: "25:30",
    date: "June 2026",
    category: "BullMQ",
  },
  {
    id: "typescript",
    title: "TypeScript Crash Course in Bangla 2026 | Beginner to Advanced",
    description:
      "A complete beginner-friendly TypeScript tutorial in Bangla.Learn TypeScript fundamentals, types, interfaces, functions, generics, and best practices with practical examples.",
    youtubeId: "f5r-3c9uaW8",
    duration: "39:51",
    date: "Jun 2026",
    category: "TypeScript",
  },
  {
    id: "oop",
    title:
      "OOP in JavaScript & TypeScript (Bangla) | Complete Beginner Tutorial",
    description:
      "In this video, you'll learn the fundamentals of Object-Oriented Programming with simple explanations, real-world examples, and practical code. 📚 Topics Covered: Programming Paradigm Functional vs OOP Object & Class Constructor this Keyword Instance & Methods Access Modifiers Encapsulation Inheritance Polymorphism Abstraction Static Getter & Setter Readonly",
    youtubeId: "0elAc23JTcE",
    duration: "53:05",
    date: "Jul 2026",
    category: "OOP in Javascript",
  },
  // {
  //   id: "zod",
  //   title: "Zod Tutorial for Beginners | Learn Validation in Zod | Naims Dev",
  //   description:
  //     "In this beginner-friendly Zod tutorial in Bangla, you'll learn everything about Zod from scratch with practical examples.",
  //   youtubeId: "tubCdiOlHJE",
  //   duration: "24:56",
  //   date: "Jun 2026",
  //   category: "Zod",
  // },
];
