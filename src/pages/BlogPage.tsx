import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Clock, User } from "lucide-react";

const posts = [
  { id: 1, title: "10 Skincare Tips for Glowing Skin", excerpt: "Discover the secrets to radiant, healthy skin with these expert-approved tips.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop", author: "Dr. Priya", date: "Apr 28, 2026", readTime: "5 min" },
  { id: 2, title: "The Ultimate Guide to Contouring", excerpt: "Master the art of contouring with our step-by-step tutorial for all face shapes.", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop", author: "Makeup Maya", date: "Apr 25, 2026", readTime: "8 min" },
  { id: 3, title: "Hair Care Routine for Every Hair Type", excerpt: "Whether curly, straight, or wavy—find the perfect routine for your hair.", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop", author: "Ananya S.", date: "Apr 20, 2026", readTime: "6 min" },
  { id: 4, title: "Best Serums for Acne-Prone Skin", excerpt: "A dermatologist's guide to choosing the right serum for blemish-free skin.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop", author: "Dr. Sneha", date: "Apr 15, 2026", readTime: "7 min" },
  { id: 5, title: "Summer Fragrance Edit 2026", excerpt: "Fresh, floral, and fruity — the best perfumes to wear this summer.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop", author: "Meera K.", date: "Apr 10, 2026", readTime: "4 min" },
  { id: 6, title: "DIY Face Masks with Kitchen Ingredients", excerpt: "Pamper yourself at home with these easy, all-natural face masks.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop", author: "Divya R.", date: "Apr 5, 2026", readTime: "5 min" },
];

const BlogPage = () => (
  <Layout>
    <div className="section-padding max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Beauty Advice</h1>
      <p className="text-muted-foreground mb-8">Expert tips, tutorials, and beauty inspiration</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden card-hover cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <h2 className="font-bold text-foreground text-lg mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </Layout>
);

export default BlogPage;