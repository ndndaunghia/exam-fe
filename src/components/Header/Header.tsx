import { Fragment, useCallback, useEffect, useState } from "react";

import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

import { useTheme } from "../../hooks/useTheme";
import {
  fetchUserData,
  loginUser,
  registerUser,
} from "../../services/auth/authActions";
import { logout } from "../../services/auth/authSlice";
import {
  LoginCredentials,
  RegisterCredentials,
} from "../../services/auth/auth.type";
import { useForm } from "react-hook-form";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const [theme, setTheme] = useTheme();

  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginCredentials>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: signUpErrors },
    getValues,
  } = useForm<RegisterCredentials>();

  const userNavigation = [
    { name: "Trang cá nhân", href: "/profile" },
    { name: "Cài đặt", href: "/settings" },
    { name: "Đăng xuất", href: "#" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const openSignUpModal = useCallback(() => {
    setIsSignUpModalOpen(true);
  }, []);

  const closeSignUpModal = useCallback(() => {
    setIsSignUpModalOpen(false);
  }, []);

  const onLoginSubmit = handleSubmitLogin(async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(resultAction)) {
        localStorage.setItem("userId", resultAction.payload.data._id);
        console.log("Login success:", resultAction.payload);
        closeLoginModal();
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  });

  const onSignUpSubmit = handleSubmitSignUp(async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(resultAction)) {
        localStorage.setItem("userId", resultAction.payload.data._id);
        console.log("Register success:", resultAction.payload);
        closeSignUpModal();
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const fetchUser = async () => {
        try {
          const resultAction = await dispatch(fetchUserData(userId));
          if (fetchUserData.fulfilled.match(resultAction)) {
            // Successfully fetched user data
            console.log("User data:", resultAction.payload);
          } else {
            // Handle errors
            console.error("Failed to fetch user data:", resultAction.payload);
          }
        } catch (error) {
          console.error("Error during fetchUserData:", error);
        }
      };

      fetchUser();
    }
  }, [dispatch]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 dark:bg-dark">
      <nav
        className=" flex items-center justify-between p-4 xl:px-40"
        aria-label="Global"
      >
        <div className="flex xl:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex xl:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden xl:flex xl:gap-x-12">
          <Link
            to="/list-test"
            className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Luyện thi
          </Link>

          <Link
            to="/course"
            className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Khóa học online
          </Link>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Khóa học của tôi
          </a>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900 outline-none dark:text-white">
              Tài liệu ôn thi
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 
                      rounded-xl p-4 text-base leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>

        <div className="hidden xl:flex xl:flex-1 xl:justify-end xl:items-center gap-4">
          <button
            className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            <svg
              className="fill-violet-700 hidden dark:block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              className="fill-yellow-500 block dark:hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {user ? (
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900 outline-none dark:text-white">
                {user.username}
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-md font-semibold text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                      {...(item.name === "Đăng xuất" && {
                        onClick: () => dispatch(logout()),
                      })}
                    >
                      {item.name}
                    </Link>
                  ))}
                </Popover.Panel>
              </Transition>
            </Popover>
          ) : (
            <a
              onClick={openLoginModal}
              href="#"
              className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Đăng nhập
            </a>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="xl:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-xl py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-xl py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-xl px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-xl px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-xl px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                {false ? (
                  <Popover className="relative">
                    <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900 outline-none">
                      Nghĩa
                      <ChevronDownIcon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 "
                            // onClick={item.onClick}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                ) : (
                  <a
                    onClick={openLoginModal}
                    href="#"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Đăng nhập
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* login form */}
      {/* {isLoginModalOpen && ( */}
      <Transition appear show={isLoginModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeLoginModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-xl font-medium leading-6 text-gray-900"
                  >
                    Đăng nhập
                  </Dialog.Title>

                  <div className="py-6 px-6 mx-auto xl:py-0">
                    <div className="w-full bg-white  md:mt-0 xl:p-0">
                      <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                        {isLoading && (
                          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center">
                            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-primary animate-spin" />
                          </div>
                        )}
                        <form
                          className="space-y-4 md:space-y-6"
                          action="#"
                          onSubmit={onLoginSubmit}
                        >
                          <div>
                            <label
                              htmlFor="username"
                              className="block mb-2 text-sm font-medium  text-gray-900"
                            >
                              Tên đăng nhập
                            </label>
                            <input
                              type="text"
                              id="username"
                              className="bg-gray-50 border border-gray-300  sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="nguyenvana"
                              {...registerLogin("username", {
                                required: "Vui lòng nhập tên đăng nhập",
                                pattern: {
                                  value:
                                    /^[A-Za-z][A-Za-z0-9_]{6,29}$/i,
                                  message: "Tên đăng nhập không hợp lệ",
                                },
                              })}
                            />
                            <p className="text-sm text-grey italic mt-2 text-red-400">
                              {loginErrors?.username?.message}
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Mật khẩu
                            </label>
                            <input
                              type="password"
                              id="password"
                              placeholder="••••••••"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              {...registerLogin("password", {
                                required: "Vui lòng nhập mật khẩu",
                              })}
                            />
                            <p className="text-sm text-grey italic mt-2 text-red-400">
                              {loginErrors?.password?.message}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="remember"
                                  aria-describedby="remember"
                                  type="checkbox"
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="remember"
                                  className="text-gray-900 dark:text-gray-900"
                                >
                                  Ghi nhớ
                                </label>
                              </div>
                            </div>
                            <a
                              href="#"
                              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                              Quên mật khẩu?
                            </a>
                          </div>
                          <button
                            type="submit"
                            className="w-full  bg-primary hover:bg-primary-light :bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center text-white"
                          >
                            Đăng nhập
                          </button>
                          <p className="text-sm font-light text-gray-900 dark:text-gray-900">
                            Bạn chưa có tài khoản?{" "}
                            <a
                              onClick={openSignUpModal}
                              href="#"
                              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                              Đăng ký ngay
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* )} */}
      {/* signup form */}
      <Transition appear show={isSignUpModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSignUpModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-xl font-medium leading-6 text-gray-900"
                  >
                    Đăng ký
                  </Dialog.Title>

                  <div className="py-6 px-6 mx-auto xl:py-0">
                    <div className="w-full bg-white  md:mt-0 xl:p-0">
                      <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                        <form
                          className="space-y-4 md:space-y-6"
                          action="#"
                          onSubmit={onSignUpSubmit}
                        >
                          <div>
                            <label
                              htmlFor="username"
                              className="block mb-2 text-sm font-medium  text-gray-900"
                            >
                              Tên người dùng
                            </label>
                            <input
                              type="text"
                              id="username"
                              className="bg-gray-50 border border-gray-300  sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="nguyen van a"
                              {...registerSignUp("username", {
                                required: "Vui lòng nhập tên người dùng",
                                pattern: {
                                  value:
                                    /^[A-Za-z][A-Za-z0-9_]{6,29}$/i,
                                  message: "Tên đăng nhập không hợp lệ",
                                },
                              })}
                              autoFocus
                            />
                            <p className="text-sm text-grey italic mt-2 text-red-400">
                              {signUpErrors?.username?.message}
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium  text-gray-900"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="bg-gray-50 border border-gray-300  sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="nguyenvana@gmail.com"
                              {...registerSignUp("email", {
                                required: "Vui lòng nhập email",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Email không hợp lệ",
                                },
                              })}
                            />
                            <p className="text-sm text-grey italic mt-2 text-red-400">
                              {signUpErrors?.email?.message}
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Mật khẩu
                            </label>
                            <input
                              type="password"
                              id="password"
                              placeholder="••••••••"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              {...registerSignUp("password", {
                                required: "Vui lòng nhập mật khẩu",
                                minLength: {
                                  value: 6,
                                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                                },
                                validate: (value) => {
                                  if (!/[A-Z]/.test(value))
                                    return "Mật khẩu phải chứa ít nhất 1 ký tự hoa";
                                  if (!/[!@#$&*]/.test(value))
                                    return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
                                  if (!/[0-9]/.test(value))
                                    return "Mật khẩu phải chứa ít nhất 1 số";
                                  return true;
                                },
                              })}
                            />
                            <p className="text-sm text-grey italic mt-2 text-red-400">
                              {signUpErrors?.password?.message}
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="confirm-password"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Xác nhận mật khẩu
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              placeholder="••••••••"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              {...registerSignUp("confirmPassword", {
                                required: "Vui lòng nhập mật khẩu",
                                validate: (value) => {
                                  if (value === "")
                                    return "Vui lòng xác nhận mật khẩu";
                                  if (value !== getValues("password"))
                                    return "Mật khẩu không trùng khớp";
                                  return true;
                                },
                              })}
                            />
                            <p className="text-sm text-grey italic mt-2 text-red-400">
                              {signUpErrors?.confirmPassword?.message}
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-light :bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center text-white"
                          >
                            Đăng ký
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
