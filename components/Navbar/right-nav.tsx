import { FormSteps, RoutesA } from "@/lib/interface";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { DataTableDemo } from "../Data-Table/component/data-table";
import { ThemeToggle } from "../toggle-button";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type Props = {
  teacherArray?: User[] | null;
};

const RightNav = (props: Props) => {
  const pathname = usePathname();
  const data = useSession();

  const routes: RoutesA[] = [
    {
      href: "/",
      label: "Me",
      active: pathname === "/",
      role: data.data?.user?.role === "Student" ? "hidden" : "hidden",
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
      role: data.data?.user?.role === "HOD" ? "hidden" : "hidden",
    },
    {
      href: "/login",
      label: "Login",
      hide: data?.data?.user ? true : false,
      active: pathname === "/login",
      role: data.data?.user ? "hidden" : "",
    },
    {
      href: "/signUp",
      label: "signUp",
      hide: data?.data?.user ? true : false,
      active: pathname === "/signUp",
      role: data.data?.user ? "hidden" : "",
    },
    {
      href: "/teachers",
      label: "Teachers",
      active: pathname === "/teachers",
      role: data.data?.user?.role === "HOD" ? "" : "hidden",
    },
    {
      href: "/request",
      label: `Request ${
        (props.teacherArray?.length as number) > 0
          ? `(${props.teacherArray?.length})`
          : ""
      }`,
      active: pathname === "/request",
      role: data.data?.user?.role === "HOD" ? "" : "hidden",
    },
    {
      href: "/teacher-registration",
      label: "Register As Teacher",
      active: pathname === "/techer-registration",
      role: data.data?.user?.role !== "Teacher" ? "hidden" : "",
    },
    {
      href: "/student-registration",
      label: "Register As Student",
      active: pathname === "/student-registration",
      role: data.data?.user?.role === "Student" ? "" : "hidden",
    },
  ];
  const showHideNavbar = () => {
    const navabar = document.getElementById("navbarSupportedContent1");
    if (navabar?.classList.contains("hidden")) {
      navabar?.classList.remove("hidden");
    } else {
      navabar?.classList.add("hidden");
    }
  };

  return (
    <>
      {/* {routes.map((ele, i) => {
        return (
          <li key={i} className={`${ele.role}`}>
            {data?.data?.user?.role !== "Teacher" ? (
              <Link
                onClick={showHideNavbar}
                className={`hover:text-primary ${
                  ele.active ? "text-primary" : "text-foreground"
                }  font-sans`}
                href={ele.href}
              >
                {ele.label}
              </Link>
            ) : (
              <NavigationMenu
                className={`hover:text-primary ${
                  ele.active ? "text-primary" : "text-foreground"
                }  font-sans`}
              >
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {" "}
                      Hover for Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[200px] ">
                        <ListItem
                          href="/performance-evaluation"
                          title=" Performance Evaluation"
                        >
                          Here You can fill performance evaluation form of
                          Modern College Of Engineering MCA branch
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}           </li>
        );
      })}
      */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className=" text-primary hover:text-primary"
          >
            <GiHamburgerMenu className="text-xl cursor-pointer" />
          </Button>
        </SheetTrigger>
        <SheetContent className=" !max-w-2xl gap-4 flex flex-col">
          <SheetHeader>
            <SheetTitle>Monthly Evaluation Form</SheetTitle>
            <SheetDescription>
              Here you can update you monthly evaluation
            </SheetDescription>
          </SheetHeader>
          <DataTableDemo data={stepData} />

          <SheetFooter className="!justify-center">
            <ThemeToggle />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default RightNav;

const stepData: FormSteps[] = [
  {
    status: false,
    formStep: "Update form-details",
    href: "/performance-evaluation/form-details",
  },
  {
    status: false,
    formStep: "Academic appraisel-details",
    href: "/performance-evaluation/academics-appraisel",
  },
  {
    status: false,
    formStep: "Publication-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Organized program-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Attended program-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Sposored research-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Consultancy service-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Inteleactual property-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "examination duties-details",
    href: "/performance-evaluation/",
  },
  {
    status: false,
    formStep: "Extra activities-details",
    href: "/performance-evaluation/",
  },
];
