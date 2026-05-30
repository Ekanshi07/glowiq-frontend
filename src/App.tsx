import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import BeautyThemeProvider from "@/theme/BeautyThemeProvider";
import ProductDiscoveryProvider from "@/context/ProductDiscoveryProvider";
import ProductQuickViewDialog from "@/components/ProductQuickViewDialog";
import ProductCompareTray from "@/components/ProductCompareTray";
import MobileBottomNav from "@/components/MobileBottomNav";
import AiBeautyAssistant from "@/components/AiBeautyAssistant";
import LanguageProvider from "@/i18n/LanguageProvider";

import HomePage            from "./pages/HomePage";
import ProductListingPage  from "./pages/ProductListingPage";
import ProductDetailPage   from "./pages/ProductDetailPage";
import CartPage            from "./pages/CartPage";
import CheckoutPage        from "./pages/CheckoutPage";
import WishlistPage        from "./pages/WishlistPage";
import ProfilePage         from "./pages/ProfilePage";
import SearchPage          from "./pages/SearchPage";
import OffersPage          from "./pages/OffersPage";
import BrandsPage          from "./pages/BrandsPage";
import BlogPage            from "./pages/BlogPage";
import InfluencersPage     from "./pages/InfluencersPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import AboutPage           from "./pages/AboutPage";
import ContactPage         from "./pages/ContactPage";
import FaqPage             from "./pages/FaqPage";
import ReturnsPage         from "./pages/ReturnsPage";
import AuthPage            from "./pages/AuthPage";
import OrderSuccessPage    from "./pages/OrderSuccessPage";
import NotFound            from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000, // 1 min
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <BeautyThemeProvider>
        <AuthProvider>
          <CartProvider>
            <ProductDiscoveryProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                  <Route path="/"               element={<HomePage />}            />
                  <Route path="/products"       element={<ProductListingPage />}  />
                  <Route path="/product/:id"    element={<ProductDetailPage />}   />
                  <Route path="/cart"           element={<CartPage />}            />
                  <Route path="/checkout"       element={<CheckoutPage />}        />
                  <Route path="/wishlist"       element={<WishlistPage />}        />
                  <Route path="/profile"        element={<ProfilePage />}         />
                  <Route path="/search"         element={<SearchPage />}          />
                  <Route path="/offers"         element={<OffersPage />}          />
                  <Route path="/brands"         element={<BrandsPage />}          />
                  <Route path="/blog"           element={<BlogPage />}            />
                  <Route path="/influencers"    element={<InfluencersPage />}     />
                  <Route path="/recommendations" element={<RecommendationsPage />} />
                  <Route path="/about"          element={<AboutPage />}           />
                  <Route path="/contact"        element={<ContactPage />}         />
                  <Route path="/faq"            element={<FaqPage />}             />
                  <Route path="/returns"        element={<ReturnsPage />}         />
                  <Route path="/auth"           element={<AuthPage />}            />
                  <Route path="/order-success"  element={<OrderSuccessPage />}    />
                  <Route path="*"               element={<NotFound />}            />
                  </Routes>
                  <ProductQuickViewDialog />
                  <ProductCompareTray />
                  {/* <AiBeautyAssistant /> */}
                  <MobileBottomNav />
                </BrowserRouter>
              </TooltipProvider>
            </ProductDiscoveryProvider>
          </CartProvider>
        </AuthProvider>
      </BeautyThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
