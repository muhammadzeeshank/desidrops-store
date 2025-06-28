"use client";

// import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
// import { auth, currentUser } from "@clerk/nextjs/server";
import Container from "./Container";
// import { getAllCategories, getMyOrders } from "@/sanity/helpers";
// import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
import CartIcon from "./CartIcon";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

// import MobileMenu from "./new/MobileMenu";
// import SearchBar from "./new/SearchBar";

const Header = () => {
  // const user = await currentUser();
  //   const { userId } = await auth();
  //   let orders = null;
  //   if (userId) {
  //     orders = await getMyOrders(userId);
  //   }
  // //   const categories = await getAllCategories(3);

  return (
    <header className="bg-background z-50 border-b py-5">
      <Container className="flex items-center justify-between ">
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu items={["Shop"]} />
          <Logo>Desi Home</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          {/* <SearchBar /> */}
          <CartIcon />

          {/* <SignedIn>
            <Link href={"/orders"} className="group relative">
              <ListOrdered className="group-hover:text-darkColor hoverEffect" />
              <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {orders?.length ? orders?.length : 0}
              </span>
            </Link>
          </SignedIn> */}
          {/* <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>

  <SignedOut>
    <AuthDialog />
  </SignedOut>
          </ClerkLoaded> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
