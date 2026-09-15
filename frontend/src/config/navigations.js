import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserRoundCog,
  BookOpen,
  ClipboardCheck,
  FileText,
  Bell,
  Settings,
  Award,
} from "lucide-react";

export const navigation = [

  // =========================
  // ADMIN
  // =========================

  {
    name: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
    roles: ["ADMIN"],
  },

  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },

  {
    name: "Students",
    href: "/dashboard/admin/students",
    icon: GraduationCap,
    roles: ["ADMIN"],
  },

  {
    name: "Teachers",
    href: "/dashboard/admin/teachers",
    icon: UserRoundCog,
    roles: ["ADMIN"],
  },

  {
    name: "Courses",
    href: "/dashboard/admin/courses",
    icon: BookOpen,
    roles: ["ADMIN"],
  },

  {
    name: "Tests",
    href: "/dashboard/admin/tests",
    icon: ClipboardCheck,
    roles: ["ADMIN"],
  },

  {
    name: "Notifications",
    href: "/dashboard/admin/notifications",
    icon: Bell,
    roles: ["ADMIN"],
  },

  {
    name: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
    roles: ["ADMIN"],
  },


  // =========================
  // TEACHER
  // =========================

  {
    name: "Dashboard",
    href: "/dashboard/teacher",
    icon: LayoutDashboard,
    roles: ["TEACHER"],
  },

  {
    name: "My Courses",
    href: "/dashboard/teacher/courses",
    icon: BookOpen,
    roles: ["TEACHER"],
  },

  {
    name: "Tests",
    href: "/dashboard/teacher/tests",
    icon: ClipboardCheck,
    roles: ["TEACHER"],
  },

  {
    name: "Submissions",
    href: "/dashboard/teacher/submissions",
    icon: FileText,
    roles: ["TEACHER"],
  },

  {
    name: "Notifications",
    href: "/dashboard/teacher/notifications",
    icon: Bell,
    roles: ["TEACHER"],
  },

  {
    name: "Settings",
    href: "/dashboard/teacher/settings",
    icon: Settings,
    roles: ["TEACHER"],
  },


  // =========================
  // STUDENT
  // =========================

  {
    name: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
    roles: ["STUDENT"],
  },

  {
    name: "My Courses",
    href: "/dashboard/student/courses",
    icon: BookOpen,
    roles: ["STUDENT"],
  },

  {
    name: "Tests",
    href: "/dashboard/student/tests",
    icon: ClipboardCheck,
    roles: ["STUDENT"],
  },

  {
    name: "Grades",
    href: "/dashboard/student/grades",
    icon: Award,
    roles: ["STUDENT"],
  },

  {
    name: "Notifications",
    href: "/dashboard/student/notifications",
    icon: Bell,
    roles: ["STUDENT"],
  },

  {
    name: "Settings",
    href: "/dashboard/student/settings",
    icon: Settings,
    roles: ["STUDENT"],
  },
];