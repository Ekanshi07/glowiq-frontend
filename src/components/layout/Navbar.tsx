import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Heart, LogOut, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/i18n/useLanguage";
import { cn } from "@/lib/utils";
import EkanshiLogo from "@/components/ConsmiqLogo";
import BeautyThemeSwitcher from "@/components/BeautyThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navCategories = [
  { nameKey: "category.makeup", slug: "makeup" },
  { nameKey: "category.skincare", slug: "skincare" },
  { nameKey: "category.haircare", slug: "haircare" },
  { nameKey: "category.bathBody", slug: "bath-body" },
  { nameKey: "category.natural", slug: "natural" },
  { nameKey: "category.momBaby", slug: "mom-baby" },
  { nameKey: "category.fragrance", slug: "fragrance" },
  { nameKey: "category.appliances", slug: "appliances" },
];

const Navbar = () => {
  const { totalItems, wishlist } = useCart();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeSearch = searchParams.get("q") || "";
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(activeSearch);
  }, [activeSearch]);

  const productPathWithParams = (params: URLSearchParams) => {
    const query = params.toString();
    return `/products${query ? `?${query}` : ""}`;
  };

  const categoryHref = (slug: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("category", slug);
    return productPathWithParams(nextParams);
  };

  const updateProductSearch = (value: string) => {
    setSearchQuery(value);
    const trimmedValue = value.trim();
    const nextParams = new URLSearchParams(location.pathname === "/products" ? searchParams : undefined);

    if (trimmedValue) nextParams.set("q", trimmedValue);
    else nextParams.delete("q");

    if (location.pathname === "/products" || trimmedValue) {
      navigate(productPathWithParams(nextParams), { replace: true });
    }
  };

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      updateProductSearch(searchQuery);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="brand-gradient text-primary-foreground text-center py-2 text-sm font-medium tracking-wide">
        {t("nav.banner")}
      </div>

      <div className="section-padding !py-3 flex items-center justify-between gap-4">
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="flex-shrink-0">
          <EkanshiLogo textClassName="text-2xl md:text-3xl" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/products" className="nav-link-premium text-sm font-semibold text-foreground">{t("nav.categories")}</Link>
          <Link to="/brands" className="nav-link-premium text-sm font-semibold text-foreground">{t("nav.brands")}</Link>
          <Link to="/offers" className="nav-link-premium text-sm font-semibold text-foreground">{t("nav.luxe")}</Link>
          <Link to="/blog" className="nav-link-premium text-sm font-semibold text-foreground">{t("nav.beautyAdvice")}</Link>
          <Link to="/influencers" className="nav-link-premium text-sm font-semibold text-foreground">{t("nav.influencers")}</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className={`${searchOpen ? "flex" : "hidden md:flex"} items-center bg-card rounded-full border border-border px-4 py-2 flex-1 max-w-xs shadow-sm transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10`}>
            <Search size={18} className="text-muted-foreground mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder={'Ask Ekanshi AI...'}
              value={searchQuery}
              onChange={event => updateProductSearch(event.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="md:hidden" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <Search size={22} className="text-foreground" />
          </button>

          <LanguageSwitcher />
          <BeautyThemeSwitcher />

          <Link to="/wishlist" className="relative p-2 hover:text-primary transition-colors" aria-label="Wishlist">
            <Heart size={22} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile" className="p-2 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium text-foreground">
                <User size={22} />
                <span className="hidden lg:inline">{user.firstName}</span>
              </Link>
              <button onClick={logout} className="p-2 hover:text-destructive transition-colors" title={t("nav.signOut")}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:block p-2 hover:text-primary transition-colors" aria-label={t("nav.signIn")}>
              <User size={22} />
            </Link>
          )}

          <Link to="/cart" className="relative p-2 hover:text-primary transition-colors" aria-label="Cart">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="hidden lg:block border-t border-border/70">
        <div className="section-padding !py-2 flex items-center gap-2 overflow-x-auto">
          {navCategories.map(category => (
            <Link
              key={category.slug}
              to={categoryHref(category.slug)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:bg-brand-pink-light hover:text-primary whitespace-nowrap transition-all font-medium",
                activeCategory === category.slug && "text-primary bg-brand-pink-light"
              )}
            >
              {t(category.nameKey)}
            </Link>
          ))}
          <Link to="/offers" className="text-sm font-bold text-primary bg-brand-pink-light px-3 py-1 rounded-full whitespace-nowrap">
            {t("nav.offers")}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background p-4 space-y-3">
          {navCategories.map(category => (
            <Link
              key={category.slug}
              to={categoryHref(category.slug)}
              className={cn(
                "block text-sm font-medium text-foreground py-2 hover:text-primary",
                activeCategory === category.slug && "text-primary"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {t(category.nameKey)}
            </Link>
          ))}
          <Link to="/offers" className="block text-sm font-bold text-primary py-2" onClick={() => setMobileOpen(false)}>{t("nav.offers")}</Link>
          <Link to="/blog" className="block text-sm font-medium text-foreground py-2" onClick={() => setMobileOpen(false)}>{t("nav.beautyAdvice")}</Link>
          {user ? (
            <>
              <Link to="/profile" className="block text-sm font-medium text-foreground py-2" onClick={() => setMobileOpen(false)}>{t("nav.myAccount")}</Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block text-sm font-medium text-destructive py-2">{t("nav.signOut")}</button>
            </>
          ) : (
            <Link to="/auth" className="block text-sm font-medium text-foreground py-2" onClick={() => setMobileOpen(false)}>{t("nav.signIn")}</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
