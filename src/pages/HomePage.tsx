import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Percent, Play, ShieldCheck, WandSparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { useFeaturedProducts, useCategories, useBrands } from "@/hooks/useApi";
import { useCart } from "@/context/useCart";
import { useLanguage } from "@/i18n/useLanguage";

const videoTutorials = [
  { title: "5-Min Everyday Makeup", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=300&fit=crop" },
  { title: "Glass Skin Routine", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=300&fit=crop" },
  { title: "Hair Care Secrets", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=300&fit=crop" },
];

const editorialTiles = [
  {
    titleKey: "home.editorialGlowTitle",
    descKey: "home.editorialGlowDesc",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=950&fit=crop",
    to: "/products?category=skincare",
  },
  {
    titleKey: "home.editorialGlamTitle",
    descKey: "home.editorialGlamDesc",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=950&fit=crop",
    to: "/products?category=makeup",
  },
  {
    titleKey: "home.editorialHairTitle",
    descKey: "home.editorialHairDesc",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=950&fit=crop",
    to: "/products?category=haircare",
  },
];

const beautyBenefits = [
  { icon: ShieldCheck, titleKey: "home.benefitAuthenticTitle", descKey: "home.benefitAuthenticDesc" },
  { icon: WandSparkles, titleKey: "home.benefitSmartTitle", descKey: "home.benefitSmartDesc" },
  { icon: Heart, titleKey: "home.benefitSavedTitle", descKey: "home.benefitSavedDesc" },
];

const CategorySkeleton = () => (
  <div className="aspect-square rounded-xl bg-muted animate-pulse" />
);

const ProductSkeleton = () => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <div className="aspect-[4/5] bg-muted animate-pulse" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
      <div className="h-4 bg-muted animate-pulse rounded w-full" />
      <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
    </div>
  </div>
);

const HomePage = () => {
  const { recentlyViewed } = useCart();
  const { t } = useLanguage();
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedProducts();
  const { data: categoriesData, isLoading: catsLoading } = useCategories();
  const { data: brandsData, isLoading: brandsLoading } = useBrands();

  const featured = featuredData?.data;
  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative min-h-[78vh] overflow-hidden bg-foreground text-background">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1800&h=1100&fit=crop"
          alt="Premium beauty products"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/72 to-foreground/15" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

        <div className="relative section-padding mx-auto flex min-h-[78vh] max-w-7xl items-center pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex rounded-full border border-background/25 bg-background/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-background/80 backdrop-blur">
              {t("home.heroKicker")}
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t("home.heroTitle")}
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-medium text-background/90 md:text-2xl">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-3 font-bold text-primary transition-all hover:scale-105 hover:shadow-xl"
              >
                {t("common.shopTheEdit")} <ArrowRight size={18} />
              </Link>
              <Link
                to="/recommendations"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-8 py-3 font-bold text-background backdrop-blur transition-all hover:bg-background/20"
              >
                {t("home.findRoutine")} <Sparkles size={18} />
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["500+", t("home.statsBrands")],
                ["4.8", t("home.statsRating")],
                ["50K+", t("home.statsShoppers")],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-background/15 bg-background/10 p-4 backdrop-blur">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-background/70">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="section-padding !py-4 max-w-7xl mx-auto -mt-16 relative z-10">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex items-center justify-between gap-4 p-5 md:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Percent size={26} />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">{t("home.offerTitle")}</p>
                  <p className="text-sm text-muted-foreground">{t("home.offerCode")} <span className="font-bold text-primary">Ekanshi20</span></p>
                </div>
              </div>
              <Link to="/offers" className="hidden md:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                {t("common.viewOffers")} <ArrowRight size={14} />
              </Link>
            </div>
            <Link to="/offers" className="group relative min-h-36 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&h=360&fit=crop"
                alt="Skincare offer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-bold text-white">{t("home.festivalLive")}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefit Strip */}
      <section className="section-padding !py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {beautyBenefits.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-pink-light text-primary">
                <item.icon size={22} />
              </div>
              <div>
                <h2 className="font-bold text-foreground">{t(item.titleKey)}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t(item.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.categoryTitle")}</h2>
          <Link to="/products" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            {t("common.viewAll")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {catsLoading
            ? Array.from({ length: 8 }).map((_, i) => <CategorySkeleton key={i} />)
            : categories.slice(0, 8).map((cat, i) => (
              <motion.div key={cat._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/products?category=${cat.slug}`} className="group block relative rounded-xl overflow-hidden aspect-square card-hover">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-background font-bold text-lg">{cat.name}</p>
                    <p className="text-background/80 text-sm">{cat.discount}</p>
                  </div>
                </Link>
              </motion.div>
            ))
          }
        </div>
      </section>

      {/* Editorial Shopping */}
      <section className="section-padding max-w-7xl mx-auto !pt-2">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">{t("home.editorialKicker")}</p>
            <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t("home.editorialTitle")}
            </h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            {t("home.editorialExplore")} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {editorialTiles.map((tile, index) => (
            <motion.div
              key={tile.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link to={tile.to} className="group relative block min-h-[420px] overflow-hidden rounded-xl">
                <img
                  src={tile.image}
                  alt={t(tile.titleKey)}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                  <p className="text-sm font-semibold text-background/75">{t(tile.descKey)}</p>
                  <h3 className="mt-1 text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t(tile.titleKey)}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2 text-sm font-bold text-primary transition-transform group-hover:translate-x-1">
                    {t("common.shopNow")} <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.bestsellers")}</h2>
          </div>
          <Link to="/products?isBestseller=true" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            {t("common.viewAll")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredLoading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : (featured?.bestsellers || []).map(p => <ProductCard key={p._id} product={p} />)
          }
        </div>
      </section>

      {/* Trending */}
      <section className="section-padding max-w-7xl mx-auto bg-secondary/50 rounded-2xl my-4">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.trending")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredLoading
            ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            : (featured?.trending || []).slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)
          }
        </div>
      </section>

      {/* New Arrivals */}
      {(featured?.newArrivals?.length ?? 0) > 0 && (
        <section className="section-padding max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.newArrivals")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(featured?.newArrivals || []).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}

      {/* Video Tutorials */}
      <section className="section-padding max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.tutorials")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videoTutorials.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer card-hover">
              <img src={v.img} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={24} className="text-primary ml-1" />
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-background font-bold">{v.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="section-padding max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.topBrands")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brandsLoading
            ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />)
            : brands.map(b => (
              <Link key={b._id} to={`/products?brand=${b.slug}`} className="bg-card border border-border rounded-xl p-6 text-center card-hover">
                <img src={b.logo} alt={b.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" loading="lazy" />
                <p className="font-semibold text-foreground">{b.name}</p>
              </Link>
            ))
          }
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="section-padding max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("home.recentlyViewed")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}

      {/* AI Recommendation CTA */}
      <section className="section-padding max-w-7xl mx-auto mb-8">
        <div className="brand-gradient rounded-2xl p-8 md:p-12 text-center">
          <Sparkles className="text-primary-foreground mx-auto mb-4" size={40} />
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("home.personalizedTitle")}
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            {t("home.personalizedDesc")}
          </p>
          <Link to="/recommendations" className="inline-flex items-center gap-2 bg-background text-primary font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105">
            {t("home.getRecommendations")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
