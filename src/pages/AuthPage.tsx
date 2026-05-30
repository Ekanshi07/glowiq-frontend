import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const { login, register }     = useAuth();
  const navigate                = useNavigate();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register({
          firstName: form.firstName,
          lastName:  form.lastName,
          email:     form.email,
          password:  form.password,
          phone:     form.phone,
        });
      }
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <Layout>
      <div className="section-padding max-w-md mx-auto min-h-[60vh] flex items-center">
        <div className="w-full bg-card border border-border rounded-2xl p-8">
          <h1
            className="text-2xl font-bold text-foreground text-center mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">First Name</label>
                  <input name="firstName" type="text" required value={form.firstName}
                    onChange={handleChange} className={inputClass} placeholder="First name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Last Name</label>
                  <input name="lastName" type="text" required value={form.lastName}
                    onChange={handleChange} className={inputClass} placeholder="Last name" />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone (optional)</label>
                <input name="phone" type="tel" value={form.phone}
                  onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input name="email" type="email" required value={form.email}
                onChange={handleChange} className={inputClass} placeholder="Enter your email" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <input name="password" type="password" required minLength={6} value={form.password}
                onChange={handleChange} className={inputClass} placeholder="Min. 6 characters" />
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
