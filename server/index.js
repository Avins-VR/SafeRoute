require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const nodemailer = require("nodemailer");
const initializePassport = require("./model/passport");
const User = require("./model/User");
const safetyRoute = require("./routes/safetyRoute");

const app = express();
app.use(express.json());

// ================= ✅ CORS Config =====================
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_PROD
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌐 Request Origin:", origin);
      console.log("✅ Allowed Origins:", allowedOrigins);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// ================= ✅ Session Cookies =====================
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

// ================= ✅ Passport Init =====================
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// ================= ✅ MongoDB Connection =====================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ================= ✅ Load Safety CSV =====================
try {
  require("./loadSafetyData"); // file that loads your 5000 safety rows
} catch (err) {
  console.log("⚠️ CSV loader file not found. Skipping...");
}

// ================= ✅ Routes =====================
app.get("/", (req, res) => res.send("Server running ✅"));

app.use("/api/safety", safetyRoute);

// ========== ✅ Signup ==========
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hashedPassword });

    res.status(201).json({ message: "Signup successful ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed ❌" });
  }
});

// ========== ✅ Login ==========
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    req.login(user, () => {
      return res.status(200).json({
        message: "Login successful ✅",
        user: { fullName: user.fullName, email: user.email },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed ❌" });
  }
});

// ========== ✅ Google OAuth ==========
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL + "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL + "/dashboard");
  }
);

// ========== ✅ Logout ==========
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL + "/login");
  });
});

// ========== ✅ Contact Form ==========
app.post("/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "Please fill all fields" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SafeRoute Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject || "New Contact Message",
      html: `<h2>📩 New Message</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
    });

    res.json({ success: "Message sent ✅" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// ========== ✅ 404 Handler ==========
app.use((req, res) => res.status(404).send("Route not found ❌"));

// ========== ✅ Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
