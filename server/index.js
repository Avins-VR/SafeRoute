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

// ================= ✅ ALLOWED FRONTEND URL =====================
const allowedOrigins = [
  "https://saferoute-blze.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ❌ REMOVE THIS (CAUSES ERROR)
// app.options("*", cors());

// ✅ FIX: Allow all preflight OPTIONS safely
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.set("trust proxy", 1);

// ================= ✅ SESSION =====================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

// ================= ✅ PASSPORT =====================
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// ================= ✅ MONGODB =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ================= ✅ Load CSV =====================
try {
  require("./loadSafetyData");
} catch (err) {
  console.log("⚠️ CSV loader missing. Skipping...");
}

// ================= ✅ ROUTES =====================
app.get("/", (req, res) => res.send("✅ Backend Running"));

app.use("/api/safety", safetyRoute);

// ================= ✅ SIGNUP =====================
app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hash });

    res.status(201).json({ message: "Signup success ✅" });
  } catch {
    res.status(500).json({ message: "Signup failed ❌" });
  }
});

// ================= ✅ LOGIN =====================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    req.login(user, () =>
      res.json({
        message: "Login success ✅",
        user: { fullName: user.fullName, email: user.email },
      })
    );
  } catch {
    res.status(500).json({ message: "Login failed ❌" });
  }
});

// ================= ✅ GOOGLE LOGIN =====================
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://saferoute-c4wm.onrender.com/login",
  }),
  (req, res) => {
    res.redirect("https://saferoute-c4wm.onrender.com/dashboard");
  }
);

// ================= ✅ LOGOUT =====================
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://saferoute-c4wm.onrender.com/login");
  });
});

// ================= ✅ CONTACT =====================
app.post("/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SafeRoute Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // receive mail
      replyTo: email,
      subject: subject || `Message from ${name}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return res.json({ success: "✅ Message sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    return res.status(500).json({ error: "Email Failed ❌" });
  }
});


// ================= ✅ 404 Handler =====================
app.all("/*", (req, res) => res.status(404).json({ error: "Route not found ❌" }));

// ================= ✅ SERVER =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on ${PORT}`));
