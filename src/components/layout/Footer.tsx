import { Link, NavLink } from "react-router-dom";
import EkanshiLogo from "@/components/ConsmiqLogo";
import { useLanguage } from "@/i18n/useLanguage";

const footerLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-block transition-colors hover:text-primary ${isActive ? "text-primary font-semibold" : "text-background/70"}`;

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="section-padding grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <EkanshiLogo inverted textClassName="text-xl" className="mb-4" markClassName="border border-background/20" />
          <p className="text-sm text-background/70 leading-relaxed">{t("footer.desc")}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">{t("footer.shop")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?category=makeup" className="text-background/70 hover:text-primary transition-colors">{t("category.makeup")}</Link></li>
            <li><Link to="/products?category=skincare" className="text-background/70 hover:text-primary transition-colors">{t("category.skincare")}</Link></li>
            <li><Link to="/products?category=haircare" className="text-background/70 hover:text-primary transition-colors">{t("category.haircare")}</Link></li>
            <li><Link to="/products?category=fragrance" className="text-background/70 hover:text-primary transition-colors">{t("category.fragrance")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">{t("footer.support")}</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/about" className={footerLinkClass}>{t("footer.about")}</NavLink></li>
            <li><NavLink to="/contact" className={footerLinkClass}>{t("footer.contact")}</NavLink></li>
            <li><NavLink to="/faq" className={footerLinkClass}>FAQ</NavLink></li>
            <li><NavLink to="/returns" className={footerLinkClass}>{t("footer.returns")}</NavLink></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">{t("footer.follow")}</h4>
          <div className="flex gap-3 text-sm font-semibold">
            <span className="cursor-pointer hover:text-primary transition-colors">IG</span>
            <span className="cursor-pointer hover:text-primary transition-colors">X</span>
            <span className="cursor-pointer hover:text-primary transition-colors">FB</span>
            <span className="cursor-pointer hover:text-primary transition-colors">YT</span>
          </div>
          <p className="text-sm text-background/70 mt-4">{t("footer.subscribe")}</p>
          <div className="flex mt-2 max-w-sm">
            <input
              type="email"
              placeholder={t("footer.email")}
              className="bg-background/10 border border-background/20 rounded-l-lg px-3 py-2 text-sm flex-1 min-w-0 outline-none focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              {t("footer.go")}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 text-center py-4 text-sm text-background/50">
        &copy; 2026 Ekanshi Beauty. {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
