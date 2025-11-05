require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const { Resend } = require("resend");
const initializePassport = require("./model/passport");
const User = require("./model/User");
const safetyRoute = require("./routes/safetyRoute");
const passwordRoutes = require("./routes/passwordRoutes");
const app = express();
app.use(express.json());

// ================= ALLOWED FRONTEND URL =================
const allowedOrigins = [
  "https://saferoute-blze.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(200);
});

// Trust render proxy
app.set("trust proxy", 1);

// ================= SESSION =================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// ================= MONGODB =================
mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Load Safety Data (optional)
try {
  require("./loadSafetyData");
} catch (err) {
  console.log("⚠️ CSV loader missing. Skipping...");
}

// ✅ Password reset routes
app.use("/api/password", passwordRoutes);

// ================= PING ROUTE (Render Keep-Alive) =================
app.get("/ping", (req, res) => res.send("pong ✔️"));

// ================= ROOT =================
app.get("/", (req, res) => res.send("✅ Backend Running"));

// ================= API ROUTES =================
app.use("/api/safety", safetyRoute);

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Weak password! Must have 8+ chars, uppercase, lowercase, number & special character"
      });
    }

    const hash = await bcrypt.hash(password, 8); // increased rounds
    await User.create({ fullName, email, password: hash });

    res.status(201).json({ message: "Signup success ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed ❌" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty input
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    // Login the user using session
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login error 🤯" });
      }

      return res.json({
        message: "Login successful ✅",
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      });
    });

  } catch (error) {
    console.error("Login Error ➜", error);
    return res.status(500).json({ message: "Internal Server Error ❌" });
  }
});


// ================= GOOGLE LOGIN =================
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://saferoute-blze.onrender.com/login",
  }),
  (req, res) => {
    res.redirect("https://saferoute-blze.onrender.com/dashboard");

  }
);

// ================= LOGOUT =================
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://saferoute-blze.onrender.com/login");
  });
});

// ================= CONTACT (Resend) =================
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.MY_EMAIL,
      subject: subject || `New message from ${name}`,
      html: `
      <h3>New Contact Form Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Subject:</b> ${subject || "N/A"}</p>
      <p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
    `,
      reply_to: email,
    });
    return res.json({ success: "Message sent ✅" });
  } catch (err) {
    console.error("Resend Error:", err);
    return res.status(500).json({ error: "Email failed ❌" });
  }
});

// ================= 404 Handler =================
app.all("/*", (req, res) => res.status(404).json({ error: "Route not found ❌" }));

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server live on ${PORT}`)
);
