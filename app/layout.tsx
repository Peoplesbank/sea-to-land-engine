
import "./globals.css";

export const metadata = {
  title: "Sea To Land Engine",
  description: "A Search Engine for Memory and Humanity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}