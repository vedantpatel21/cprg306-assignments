import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>CPRG 306: Web Development 2 - Assignments</h1>
      <nav style={styles.nav}>
        <Link href="./week-2" style={styles.link}>Week-2</Link>
        <Link href="./week-3" style={styles.link}>Week-3</Link>
        <Link href="./week-4/" style={styles.link}>Week-4</Link>
        <Link href="./week-5/" style={styles.link}>Week-5</Link>
        <Link href="./week-6/" style={styles.link}>Week-6</Link>
        <Link href="./week-7/" style={styles.link}>Week-7</Link>
      
      </nav>
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "1.8rem", // Smaller font size for the heading
    color: "#1a237e",
    marginBottom: "20px",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "300px", // Adjusted width for a more compact layout
  },
  link: {
    display: "block",
    padding: "10px", // Reduced padding for smaller appearance
    backgroundColor: "#3949ab",
    color: "#ffffff",
    textDecoration: "none",
    textAlign: "center",
    borderRadius: "5px", // Adjusted for a more compact look
    transition: "all 0.3s ease",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
    fontSize: "0.9rem", // Smaller font size for links
    fontWeight: "500",
  },
  linkHover: {
    backgroundColor: "#283593",
    transform: "scale(1.03)", // Slightly smaller scale effect
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
  },
};

// Apply hover effects dynamically
if (typeof window !== "undefined") {
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.backgroundColor = styles.linkHover.backgroundColor;
      el.style.transform = styles.linkHover.transform;
      el.style.boxShadow = styles.linkHover.boxShadow;
    });
    el.addEventListener("mouseleave", () => {
      el.style.backgroundColor = styles.link.backgroundColor;
      el.style.transform = "scale(1)";
      el.style.boxShadow = styles.link.boxShadow;
    });
  });
}