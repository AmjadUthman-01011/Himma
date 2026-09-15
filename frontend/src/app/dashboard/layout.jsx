import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthGaurd from "../../components/AuthGaurd"
export default function Layout({ children }) {
  return (
  <DashboardLayout>
    {/*<AuthGaurd>
    {children}
    </AuthGaurd>*/}
    {children}
    </DashboardLayout>);
}