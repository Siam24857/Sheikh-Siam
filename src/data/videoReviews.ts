export type ReviewSource = "linkedin" | "youtube";

export interface VideoReview {
  id: string;
  name: string;
  avatar: string; // URL to user profile picture
  reviewText: string;
  source: ReviewSource;
  // For LinkedIn reviews
  linkedinId?: string; // e.g. "john-doe-123abc"
  // For YouTube reviews
  youtubeUsername?: string; // e.g. "@johndoe"
  youtubeProfileUrl?: string;
}

export const videoReviews: VideoReview[] = [
  {
    id: "review-1",
    name: "Gantabya Kumar Bayda",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783938670/1734641947822_sx18m3.jpg",
    reviewText:
      "Thanks Naim bhai, you are not only teaching backend development, you are also helping the interns build discipline, confidence, and real-world problem-solving skills. The effort and dedication from both you and the interns are clearly visible. Huge respect to you for guiding them with so much patience and passion.",
    source: "linkedin",
    linkedinId: "devgantabya",
  },
  {
    id: "review-2",
    name: "Abdul Mannan",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783938670/1741711149455_mpc2jb.jpg",
    reviewText:
      "Really enjoyed today’s session — productive discussion, great energy, and clear communication from everyone involved. These kinds of meetings make teamwork smooth and motivating. Looking forward to the next one!",
    source: "linkedin",
    linkedinId: "senpaioka",
  },
  {
    id: "review-3",
    name: "Md Abdullah",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783938671/1777990732026_othhbr.jpg",
    reviewText:
      "I’m very grateful for this learning experience. The explanations are simple, helpful, and beginner-friendly. I’ve learned many new things with confidence. Thank you for making learning easier and more enjoyable!",
    source: "linkedin",
    linkedinId: "ars-abdullah",
  },
  {
    id: "review-4",
    name: "Mehedi Hasan",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783938670/1777692823682_ojfbtu.jpg",
    reviewText:
      "The way you teach actually makes things click. You don't just cover the topics, you make sure everyone really understands it.Really grateful to learn under your guidance, vai. 🙌",
    source: "linkedin",
    linkedinId: "thisismahdihasan",
  },
  {
    id: "review-7",
    name: "learnwithshahariar",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783939950/channels4_profile_s7lwag.jpg",
    reviewText:
      "Redis শিখবো বলে ইউটিউবে খুজছিলাম কিন্ত ভালো কোনো রিসোর্চ খুজে পাচ্ছিলাম না। ধন্যবাদ ভাই টিউটোরিয়াল এর জন্য।",
    source: "youtube",
    youtubeUsername: "@learnwithshahariar",
    youtubeProfileUrl: "https://youtube.com/@learnwithshahariar",
  },
  {
    id: "review-6",
    name: "Md. Rayhan Islam Rabby",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783938670/1777800762761_u7kwxy.jpg",
    reviewText:
      "Alhamdulillah, I’m one of the students in this batch, and I’m learning a lot from these classes. The way you teach is very clear, practical, and easy to understand. Even difficult backend concepts feel much simpler because of your guidance. Every class is truly helpful and inspiring. Grateful to have such a supportive mentor ❤️🙌",
    source: "linkedin",
    linkedinId: "rayhanislamrabby",
  },
  {
    id: "review-5",
    name: "Al Shahariar Arafat Shawon",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783938670/1770736288626_vuwkp5.jpg",
    reviewText: `আমি রিসেন্টলি আমার ব্যাকেন্ড জার্নি শুরু করেছি Rise Together টিমের সাথে। সত্যি কথা বলতে, অনেকেই আনপেইড ইন্টার্নের কথা শুনলে নাক ছিটকান। কিন্তু Rise Together টিমের Mohammed Rakib Gazi এবং Naim Sorker ভাইয়ের থেকে যা যা শিখছি অকল্পনীয়।রিয়েল ওয়ার্ল্ড এর প্রোডাকশন লেভেলের স্কিল আমাদের শেখানো হচ্ছে, যেটা আমি কোনো বড় পেইড কোর্সেও হয়তো এভাবে পাবোনা।
আমার শেখার যাত্রার শুরু থেকেই ব্যাকেন্ডের উপর আলাদা একটা টান ছিলো আর এটা নিয়ে এখন আমি অনেকটুকু কনফিডেন্ট যে যেকোনো প্রডাকশন লেভেলের ব্যাকেন্ড আমি সামলাতে পারবো শুধু একজন টিম মেম্বার হিসেবে না, একজন টিম লিডার হিসেবেও।
যা যা শিখবো এখানে থেকে 
1. TypeScript
2. Zod validation
3. Nodejs, Expressjs
4. Backend Architecture (MVC, Modular)
5. Mongoose
6. PostgreSQL (ERD design, database design, sql language, RDBMS)
7. Prisma
8. Redis
9. Docker
10. Aws
11. Nestjs
12. Testing Expert with Postman, Remotely, Bruno, Thunderbolt
এছাড়াও প্রোডাকশন লেভেলের কাজ করতে আর যা যা দরকার পড়বে সবই শিখানো হচ্ছে।
A big thanks to Rise Together, Mohammed Rakib Gazi, Naim Sorker .`,
    source: "linkedin",
    linkedinId: "shahariar-dev",
  },
  {
    id: "review-8",
    name: "China Akhter",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1783941154/1767167837053_oftxsl.jpg",
    reviewText: `I recently attended 4 amazing backend development classes organized by Rise Together and conducted by Naim Sorker.

The sessions were incredibly helpful and beginner-friendly. I learned many important backend concepts including Express.js, TypeScript, routing, controllers, services, and professional project structure.

A big thanks to @Naim Sorkar for his clear explanations and supportive teaching style. Also grateful to Rise Together for creating such a valuable learning opportunity for aspiring developers like us. 

Excited to continue this backend learning journey and improve my development skills every day.`,
    source: "linkedin",
    linkedinId: "china-akther",
  },
  {
    id: "review-9",
    name: "@mrpiyalst8799",
    avatar:
      "https://res.cloudinary.com/dynxnpj21/image/upload/v1786467907/channels4_profile_ssmxsh.jpg",
    reviewText: `Learned something new today. ❤
It would have been even better if you had included the frontend UI along with the backend. Hope you'll upload a complete version with the UI in a future video. Thanks for the great content! 🙌`,
    source: "youtube",
    youtubeUsername: "@mrpiyalst8799",
    youtubeProfileUrl: "https://www.youtube.com/@mrpiyalst8799",
  },
];
