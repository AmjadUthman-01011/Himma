import Providers from "../components/providers/Provider";
import AuthInitializers from "../components/providers/AuthInitializer"
import "./globals.css";

export const metadata = {
  title: "Student Portal",
  description: "Student Management Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <AuthInitializers>
              {children}
            </AuthInitializers>
        </Providers>
      </body>
    </html>
  );
}