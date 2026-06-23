import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getSalon, type Salon } from "@/lib/salons";
import { db, auth, logInWithGoogle } from "@/lib/firebase";
import { collection, query, where, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { Star, MapPin, Clock, Heart, Share2, Calendar, Sparkles, ChevronRight, Check, MessageSquare, Send } from "lucide-react";

export default function SalonPage() {
  const { id } = useParams<{ id: string }>();
  const salon = getSalon(id ?? "");

  if (!salon) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl text-gradient-gold">Salon not found</h1>
        <p className="text-muted-foreground mt-2">The salon you are looking for does not exist or has been removed.</p>
        <Link to="/explore" className="btn-luxe shine mt-6 text-sm">Return to explore</Link>
      </div>
    );
  }

  const [serviceIdx, setServiceIdx] = useState(0);
  const [stylistIdx, setStylistIdx] = useState(0);
  const [date, setDate] = useState(2);
  const [time, setTime] = useState("5:30 PM");

  // Firebase & Local guest state
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Helper to load reviews from LocalStorage
  const loadLocalStorageReviews = () => {
    const localData = localStorage.getItem(`reviews_${salon.id}`);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setReviewsList(parsed);
      } catch (e) {
        setReviewsList([]);
      }
    } else {
      setReviewsList([]);
    }
  };

  // Load reviews from Firestore
  useEffect(() => {
    let unsubscribeSnapshot = () => {};

    try {
      const q = query(
        collection(db, "reviews"),
        where("salonId", "==", salon.id)
      );

      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        list.sort((a: any, b: any) => {
          const timeA = a.createdAt?.seconds || (a.createdAt ? new Date(a.createdAt).getTime() / 1000 : 0);
          const timeB = b.createdAt?.seconds || (b.createdAt ? new Date(b.createdAt).getTime() / 1000 : 0);
          return timeB - timeA;
        });
        setReviewsList(list);
      }, (err) => {
        console.warn("Firestore reviews error, loading from LocalStorage:", err);
        loadLocalStorageReviews();
      });
    } catch (err) {
      console.warn("Firestore init error, loading from LocalStorage:", err);
      loadLocalStorageReviews();
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, [salon]);

  const handleGoogleSignIn = async () => {
    try {
      const loggedUser = await logInWithGoogle();
      setUser(loggedUser);
    } catch (err) {
      console.error("Google Sign-In failed:", err);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentAuthor = user ? (user.displayName || "Luxe Member") : (guestName.trim() || "Luxe Guest");
    const commentPhoto = user ? (user.photoURL || "") : "";

    if (!newComment.trim()) return;

    setSubmitting(true);
    const newReviewItem = {
      salonId: salon.id,
      userName: commentAuthor,
      userPhoto: commentPhoto,
      comment: newComment,
      rating: newRating,
      createdAt: { seconds: Date.now() / 1000 }
    };

    try {
      await addDoc(collection(db, "reviews"), {
        salonId: salon.id,
        userName: commentAuthor,
        userPhoto: commentPhoto,
        comment: newComment,
        rating: newRating,
        createdAt: serverTimestamp()
      });
      setNewComment("");
      setNewRating(5);
      setGuestName("");
    } catch (err) {
      console.warn("Firestore write error, saving to LocalStorage:", err);
      
      const localData = localStorage.getItem(`reviews_${salon.id}`);
      let currentReviews = [];
      if (localData) {
        try {
          currentReviews = JSON.parse(localData);
        } catch (e) {
          currentReviews = [];
        }
      }
      const updatedReviews = [
        { id: `local_${Date.now()}`, ...newReviewItem },
        ...currentReviews
      ];
      localStorage.setItem(`reviews_${salon.id}`, JSON.stringify(updatedReviews));
      setReviewsList(updatedReviews);
      setNewComment("");
      setNewRating(5);
      setGuestName("");
    } finally {
      setSubmitting(false);
    }
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  const times = ["11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:30 PM", "7:00 PM"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero gallery */}
      <section className="pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/explore" className="text-xs text-muted-foreground hover:text-foreground">← Back to atelier index</Link>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  {salon.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full glass">{t}</span>
                  ))}
                </div>
                <h1 className="font-display text-5xl md:text-7xl mt-4 leading-none">{salon.name}</h1>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {salon.area}, Mumbai</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {salon.rating} · {salon.reviews.toLocaleString("en-IN")} reviews</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Open until 9:00 PM</span>
                </div>
                <p className="mt-3 text-lg italic text-muted-foreground font-display">"{salon.tagline}"</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:ring-gold"><Heart className="h-4 w-4" /></button>
                <button className="h-10 w-10 rounded-full glass flex items-center justify-center hover:ring-gold"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-4 grid-rows-2 gap-3 h-[520px]">
            <motion.img layoutId="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={salon.image} alt="" className="col-span-2 row-span-2 rounded-3xl object-cover h-full w-full shadow-lg" />
            {[
              "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80",
              "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
            ].map((src, i) => (
              <motion.img key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} src={src} alt="" className="rounded-2xl object-cover h-full w-full shadow" />
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 mt-16 grid lg:grid-cols-[1.6fr_1fr] gap-12">
        <div className="space-y-16">
          {/* Signature */}
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Signature</div>
            <h2 className="font-display text-3xl mt-2">{salon.signature}</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              A bespoke luxury session designed exclusively for Mumbai Luxe members. Begins with a deep analysis of your skin/hair type, includes organic oils, and finishes with custom French-formulated treatments.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-2xl">Services</h3>
            <div className="mt-5 divide-y divide-border/40 glass rounded-2xl">
              {salon.services.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setServiceIdx(i)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-colors ${serviceIdx === i ? "bg-gold/5" : ""}`}
                >
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {serviceIdx === i && <Check className="h-4 w-4 text-gold" />}
                      {s.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{s.duration} · Master stylist included</div>
                  </div>
                  <div className="font-display text-lg text-gradient-gold">₹{s.price.toLocaleString("en-IN")}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stylists */}
          <div>
            <h3 className="font-display text-2xl">The team</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {salon.stylists.map((st, i) => (
                <button
                  key={st.name}
                  onClick={() => setStylistIdx(i)}
                  className={`rounded-2xl p-5 text-left border transition-all ${
                    stylistIdx === i ? "border-gold/60 ring-gold bg-gradient-card" : "border-border/60 glass"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img src={`https://i.pravatar.cc/80?img=${20 + i + serviceIdx}`} alt="" className="h-14 w-14 rounded-full object-cover" />
                    <div>
                      <div className="font-medium">{st.name}</div>
                      <div className="text-xs text-muted-foreground">{st.role} · {st.years} yrs</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-border/40 pt-12">
            <h3 className="font-display text-2xl mb-6">What members say</h3>
            
            {/* Review form */}
            <div className="glass-strong rounded-3xl p-6 mb-8 border border-gold/15 relative overflow-hidden">
              {user || isGuest ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-sm font-medium text-gradient-gold flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Share your experience {isGuest && !user && "(as Guest)"}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground mr-1">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`h-4 w-4 ${
                              star <= newRating ? "fill-gold text-gold" : "text-muted-foreground hover:text-gold"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {isGuest && !user && (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Your Name (e.g. Jane Doe)" 
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        className="bg-ink/30 border border-border/60 rounded-xl p-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none w-full max-w-xs focus:border-gold/50"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-end gap-2 bg-ink/30 border border-border/60 rounded-2xl p-3">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your review here..."
                      rows={3}
                      required
                      className="flex-1 bg-transparent outline-none text-sm resize-none text-foreground placeholder:text-muted-foreground"
                    />
                    <button 
                      type="submit" 
                      disabled={submitting} 
                      className="btn-luxe shine p-2 rounded-xl h-10 w-10 flex items-center justify-center shrink-0 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 text-ink" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">Sign in with Google to post verified reviews, or continue as a guest.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <button onClick={handleGoogleSignIn} className="btn-luxe shine text-xs py-2 px-4">
                      Sign in with Google
                    </button>
                    <button onClick={() => setIsGuest(true)} className="btn-ghost-luxe text-xs py-2.5 px-4">
                      Post as Guest
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* List reviews */}
            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {reviewsList.length > 0 ? (
                  reviewsList.map((r, i) => (
                    <motion.div 
                      key={r.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="glass rounded-2xl p-5 border border-border/20 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1 text-gold">
                            {[...Array(r.rating || 5)].map((_, idx) => (
                              <Star key={idx} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          {r.createdAt && (
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(r.createdAt.seconds * 1000).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            </span>
                          )}
                        </div>
                        <p className="text-sm italic leading-relaxed">"{r.comment}"</p>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/30">
                        {r.userPhoto ? (
                          <img src={r.userPhoto} alt="" className="h-6 w-6 rounded-full object-cover" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                            <Check className="h-3 w-3 text-gold" />
                          </div>
                        )}
                        <div className="text-xs font-medium text-muted-foreground">— {r.userName}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10 glass rounded-2xl border border-border/20">
                    <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sticky booking widget */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-6 border border-gold/30 ring-gold"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center gap-1"><Sparkles className="h-3 w-3" /> Reserve</div>
            <div className="mt-2 font-display text-2xl">{salon.services[serviceIdx].name}</div>
            <div className="text-xs text-muted-foreground">with {salon.stylists[stylistIdx].name}</div>

            <div className="mt-5">
              <div className="text-xs text-muted-foreground mb-2">Select date</div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setDate(i)}
                    className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 shrink-0 transition-all ${
                      date === i ? "bg-gold text-ink" : "glass hover:ring-gold"
                    }`}
                  >
                    <span className="text-[10px] uppercase">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                    <span className="text-base font-display">{d.getDate()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs text-muted-foreground mb-2">Select time</div>
              <div className="grid grid-cols-3 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`text-xs rounded-lg py-2 transition-all ${
                      time === t ? "bg-gold text-ink" : "glass hover:ring-gold"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-border/40 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="font-display text-2xl text-gradient-gold">₹{salon.services[serviceIdx].price.toLocaleString("en-IN")}</div>
              </div>
              <button className="btn-luxe shine"><Calendar className="h-4 w-4" /> Confirm</button>
            </div>

            <div className="mt-4 text-[11px] text-muted-foreground flex items-center gap-1">
              <Check className="h-3 w-3 text-gold" /> Free cancellation up to 4 hours prior
            </div>
          </motion.div>

          <Link to="/ai-advisor" className="mt-4 block glass rounded-2xl p-4 group hover:ring-gold transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gold">Luxe AI suggests</div>
                <div className="text-sm mt-0.5">Pair with a customized facial — save 15%</div>
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
